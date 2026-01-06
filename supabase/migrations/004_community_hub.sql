-- Migration: Community Hub Extensions
-- Descrição: Extensões para transformar o Chat Global em um Hub de Comunidade com gamificação, rankings e matchmaking

-- ============================================
-- EXTENSÃO: profiles
-- Adicionar campos para gamificação e preferências
-- ============================================
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS study_goal TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS main_module TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_points INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'bronze' CHECK (level IN ('bronze', 'prata', 'ouro', 'diamante', 'elite'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_profile_public BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS show_in_rankings BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS allow_study_invites BOOLEAN DEFAULT true;

-- ============================================
-- EXTENSÃO: user_presence
-- Adicionar campos para presença avançada
-- ============================================
ALTER TABLE public.user_presence ADD COLUMN IF NOT EXISTS activity_type TEXT DEFAULT 'online' CHECK (activity_type IN ('online', 'studying', 'away', 'offline'));
ALTER TABLE public.user_presence ADD COLUMN IF NOT EXISTS current_module TEXT;

-- ============================================
-- TABELA: user_badges
-- Badges conquistados pelos usuários
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL CHECK (badge_type IN ('studying_now', 'top_week', '100h_studied', 'streak_7', 'streak_30', 'first_checklist', 'top_day', '50h_studied', '200h_studied')),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_type ON public.user_badges(badge_type);

-- ============================================
-- TABELA: study_invites
-- Convites de estudo entre usuários
-- ============================================
CREATE TABLE IF NOT EXISTS public.study_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  CONSTRAINT different_users CHECK (sender_id != receiver_id)
);

CREATE INDEX IF NOT EXISTS idx_study_invites_sender ON public.study_invites(sender_id);
CREATE INDEX IF NOT EXISTS idx_study_invites_receiver ON public.study_invites(receiver_id);
CREATE INDEX IF NOT EXISTS idx_study_invites_status ON public.study_invites(status);


-- ============================================
-- TABELA: study_sessions_log
-- Log de sessões de estudo para tracking de horários
-- ============================================
CREATE TABLE IF NOT EXISTS public.study_sessions_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  session_type TEXT CHECK (session_type IN ('checklist', 'flashcard', 'resumo', 'treino_ia', 'colaborativo')),
  module TEXT
);

CREATE INDEX IF NOT EXISTS idx_study_sessions_log_user ON public.study_sessions_log(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_log_started ON public.study_sessions_log(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_sessions_log_user_time ON public.study_sessions_log(user_id, started_at);

-- ============================================
-- TABELA: community_metrics
-- Métricas de engajamento da comunidade
-- ============================================
CREATE TABLE IF NOT EXISTS public.community_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  chat_time_seconds INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  invites_sent INTEGER DEFAULT 0,
  invites_accepted INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_community_metrics_user ON public.community_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_community_metrics_date ON public.community_metrics(date DESC);

-- ============================================
-- RLS (Row Level Security)
-- ============================================

-- User Badges
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Todos podem ver badges" ON public.user_badges;
CREATE POLICY "Todos podem ver badges" ON public.user_badges
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Sistema pode inserir badges" ON public.user_badges;
CREATE POLICY "Sistema pode inserir badges" ON public.user_badges
  FOR INSERT TO authenticated WITH CHECK (true);

-- Study Invites
ALTER TABLE public.study_invites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem ver seus convites" ON public.study_invites;
CREATE POLICY "Usuários podem ver seus convites" ON public.study_invites
  FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Usuários podem enviar convites" ON public.study_invites;
CREATE POLICY "Usuários podem enviar convites" ON public.study_invites
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Destinatários podem responder convites" ON public.study_invites;
CREATE POLICY "Destinatários podem responder convites" ON public.study_invites
  FOR UPDATE TO authenticated
  USING (auth.uid() = receiver_id);

-- Study Sessions Log
ALTER TABLE public.study_sessions_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem ver próprias sessões" ON public.study_sessions_log;
CREATE POLICY "Usuários podem ver próprias sessões" ON public.study_sessions_log
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem inserir próprias sessões" ON public.study_sessions_log;
CREATE POLICY "Usuários podem inserir próprias sessões" ON public.study_sessions_log
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar próprias sessões" ON public.study_sessions_log;
CREATE POLICY "Usuários podem atualizar próprias sessões" ON public.study_sessions_log
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Community Metrics
ALTER TABLE public.community_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem ver próprias métricas" ON public.community_metrics;
CREATE POLICY "Usuários podem ver próprias métricas" ON public.community_metrics
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Sistema pode gerenciar métricas" ON public.community_metrics;
CREATE POLICY "Sistema pode gerenciar métricas" ON public.community_metrics
  FOR ALL TO authenticated USING (auth.uid() = user_id);


-- ============================================
-- FUNCTIONS
-- ============================================

-- Função para calcular nível baseado em pontos
CREATE OR REPLACE FUNCTION calculate_user_level(points INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF points >= 10001 THEN RETURN 'elite';
  ELSIF points >= 5001 THEN RETURN 'diamante';
  ELSIF points >= 2001 THEN RETURN 'ouro';
  ELSIF points >= 501 THEN RETURN 'prata';
  ELSE RETURN 'bronze';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Função para atualizar nível automaticamente quando pontos mudam
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level := calculate_user_level(NEW.total_points);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar nível
DROP TRIGGER IF EXISTS trigger_update_user_level ON public.profiles;
CREATE TRIGGER trigger_update_user_level
  BEFORE UPDATE OF total_points ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();

-- Função para obter ranking semanal
CREATE OR REPLACE FUNCTION get_weekly_ranking(p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  level TEXT,
  total_points INTEGER,
  weekly_hours NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH weekly_study AS (
    SELECT 
      ss.user_id,
      COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600), 0) as hours
    FROM public.study_sessions_log ss
    WHERE ss.started_at >= NOW() - INTERVAL '7 days'
    GROUP BY ss.user_id
  )
  SELECT 
    ROW_NUMBER() OVER (ORDER BY COALESCE(ws.hours, 0) DESC, p.total_points DESC) as rank,
    p.id as user_id,
    p.full_name,
    p.avatar_url,
    p.level,
    p.total_points,
    COALESCE(ws.hours, 0)::NUMERIC as weekly_hours
  FROM public.profiles p
  LEFT JOIN weekly_study ws ON ws.user_id = p.id
  WHERE p.show_in_rankings = true
  ORDER BY COALESCE(ws.hours, 0) DESC, p.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter ranking diário
CREATE OR REPLACE FUNCTION get_daily_ranking(p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  level TEXT,
  total_points INTEGER,
  daily_hours NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH daily_study AS (
    SELECT 
      ss.user_id,
      COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600), 0) as hours
    FROM public.study_sessions_log ss
    WHERE ss.started_at >= CURRENT_DATE
    GROUP BY ss.user_id
  )
  SELECT 
    ROW_NUMBER() OVER (ORDER BY COALESCE(ds.hours, 0) DESC, p.total_points DESC) as rank,
    p.id as user_id,
    p.full_name,
    p.avatar_url,
    p.level,
    p.total_points,
    COALESCE(ds.hours, 0)::NUMERIC as daily_hours
  FROM public.profiles p
  LEFT JOIN daily_study ds ON ds.user_id = p.id
  WHERE p.show_in_rankings = true
  ORDER BY COALESCE(ds.hours, 0) DESC, p.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter ranking por objetivo
CREATE OR REPLACE FUNCTION get_ranking_by_goal(p_goal TEXT, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  level TEXT,
  total_points INTEGER,
  study_goal TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.total_points DESC) as rank,
    p.id as user_id,
    p.full_name,
    p.avatar_url,
    p.level,
    p.total_points,
    p.study_goal
  FROM public.profiles p
  WHERE p.show_in_rankings = true 
    AND p.study_goal IS NOT NULL 
    AND p.study_goal ILIKE '%' || p_goal || '%'
  ORDER BY p.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter ranking por módulo
CREATE OR REPLACE FUNCTION get_ranking_by_module(p_module TEXT, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  rank BIGINT,
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  level TEXT,
  total_points INTEGER,
  main_module TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROW_NUMBER() OVER (ORDER BY p.total_points DESC) as rank,
    p.id as user_id,
    p.full_name,
    p.avatar_url,
    p.level,
    p.total_points,
    p.main_module
  FROM public.profiles p
  WHERE p.show_in_rankings = true 
    AND p.main_module IS NOT NULL 
    AND p.main_module ILIKE '%' || p_module || '%'
  ORDER BY p.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Função para encontrar parceiros de estudo compatíveis
CREATE OR REPLACE FUNCTION find_study_matches(p_user_id UUID, p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  user_id UUID,
  full_name TEXT,
  avatar_url TEXT,
  level TEXT,
  study_goal TEXT,
  main_module TEXT,
  total_points INTEGER,
  compatibility_score INTEGER,
  dedication_match INTEGER,
  goal_match INTEGER,
  schedule_match INTEGER,
  module_match INTEGER
) AS $$
DECLARE
  v_user RECORD;
  v_user_hours NUMERIC;
BEGIN
  -- Obter dados do usuário atual
  SELECT p.*, 
    COALESCE((
      SELECT SUM(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600)
      FROM public.study_sessions_log ss 
      WHERE ss.user_id = p.id AND ss.started_at >= NOW() - INTERVAL '30 days'
    ), 0) as study_hours
  INTO v_user
  FROM public.profiles p
  WHERE p.id = p_user_id;
  
  v_user_hours := COALESCE(v_user.study_hours, 0);
  
  RETURN QUERY
  WITH candidate_hours AS (
    SELECT 
      ss.user_id,
      COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600), 0) as hours
    FROM public.study_sessions_log ss
    WHERE ss.started_at >= NOW() - INTERVAL '30 days'
    GROUP BY ss.user_id
  )
  SELECT 
    p.id as user_id,
    p.full_name,
    p.avatar_url,
    p.level,
    p.study_goal,
    p.main_module,
    p.total_points,
    -- Score total (0-100)
    (
      -- Dedicação (40 pontos max)
      CASE 
        WHEN v_user_hours = 0 AND COALESCE(ch.hours, 0) = 0 THEN 20
        WHEN GREATEST(v_user_hours, COALESCE(ch.hours, 0)) = 0 THEN 0
        ELSE LEAST(40, ROUND(40 * (1 - ABS(v_user_hours - COALESCE(ch.hours, 0)) / GREATEST(v_user_hours, COALESCE(ch.hours, 0), 1))))::INTEGER
      END +
      -- Objetivo (30 pontos max)
      CASE 
        WHEN v_user.study_goal IS NOT NULL AND p.study_goal = v_user.study_goal THEN 30
        WHEN v_user.study_goal IS NOT NULL AND p.study_goal ILIKE '%Revalida%' AND v_user.study_goal ILIKE '%Revalida%' THEN 15
        ELSE 0
      END +
      -- Horários (20 pontos max) - simplificado
      10 +
      -- Módulo (10 pontos max)
      CASE WHEN v_user.main_module IS NOT NULL AND p.main_module = v_user.main_module THEN 10 ELSE 0 END
    )::INTEGER as compatibility_score,
    -- Breakdown
    CASE 
      WHEN v_user_hours = 0 AND COALESCE(ch.hours, 0) = 0 THEN 20
      WHEN GREATEST(v_user_hours, COALESCE(ch.hours, 0)) = 0 THEN 0
      ELSE LEAST(40, ROUND(40 * (1 - ABS(v_user_hours - COALESCE(ch.hours, 0)) / GREATEST(v_user_hours, COALESCE(ch.hours, 0), 1))))::INTEGER
    END as dedication_match,
    CASE 
      WHEN v_user.study_goal IS NOT NULL AND p.study_goal = v_user.study_goal THEN 30
      WHEN v_user.study_goal IS NOT NULL AND p.study_goal ILIKE '%Revalida%' AND v_user.study_goal ILIKE '%Revalida%' THEN 15
      ELSE 0
    END as goal_match,
    10 as schedule_match,
    CASE WHEN v_user.main_module IS NOT NULL AND p.main_module = v_user.main_module THEN 10 ELSE 0 END as module_match
  FROM public.profiles p
  LEFT JOIN candidate_hours ch ON ch.user_id = p.id
  WHERE p.id != p_user_id
    AND p.allow_study_invites = true
    AND p.is_profile_public = true
  ORDER BY compatibility_score DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter estatísticas do usuário para o perfil
CREATE OR REPLACE FUNCTION get_user_community_stats(p_user_id UUID)
RETURNS TABLE (
  total_study_hours NUMERIC,
  daily_average_hours NUMERIC,
  weekly_average_hours NUMERIC,
  checklist_completion_rate NUMERIC,
  current_streak INTEGER,
  badges TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  WITH study_stats AS (
    SELECT 
      COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600), 0) as total_hours,
      COALESCE(AVG(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600), 0) as avg_hours
    FROM public.study_sessions_log ss
    WHERE ss.user_id = p_user_id
  ),
  weekly_stats AS (
    SELECT 
      COALESCE(SUM(EXTRACT(EPOCH FROM (COALESCE(ss.ended_at, NOW()) - ss.started_at)) / 3600), 0) / 7 as weekly_avg
    FROM public.study_sessions_log ss
    WHERE ss.user_id = p_user_id AND ss.started_at >= NOW() - INTERVAL '7 days'
  ),
  checklist_stats AS (
    SELECT 
      COALESCE(AVG(ca.percentage), 0) as completion_rate
    FROM public.checklist_attempts ca
    WHERE ca.user_id = p_user_id
  ),
  user_badges AS (
    SELECT ARRAY_AGG(ub.badge_type) as badges
    FROM public.user_badges ub
    WHERE ub.user_id = p_user_id
  )
  SELECT 
    ss.total_hours::NUMERIC,
    ss.avg_hours::NUMERIC,
    ws.weekly_avg::NUMERIC,
    cs.completion_rate::NUMERIC,
    COALESCE((SELECT us.current_streak FROM public.user_stats us WHERE us.user_id = p_user_id), 0)::INTEGER,
    COALESCE(ub.badges, ARRAY[]::TEXT[])
  FROM study_stats ss
  CROSS JOIN weekly_stats ws
  CROSS JOIN checklist_stats cs
  CROSS JOIN user_badges ub;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- REALTIME (ignorar se já existir)
-- ============================================
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_badges;
  EXCEPTION WHEN duplicate_object THEN
    NULL; -- tabela já está na publication
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.study_invites;
  EXCEPTION WHEN duplicate_object THEN
    NULL; -- tabela já está na publication
  END;
END $$;

-- ============================================
-- COMENTÁRIOS
-- ============================================
COMMENT ON TABLE public.user_badges IS 'Badges de conquistas dos usuários';
COMMENT ON TABLE public.study_invites IS 'Convites de estudo entre usuários';
COMMENT ON TABLE public.study_sessions_log IS 'Log de sessões de estudo para tracking de horários';
COMMENT ON TABLE public.community_metrics IS 'Métricas de engajamento da comunidade';
COMMENT ON FUNCTION calculate_user_level IS 'Calcula o nível do usuário baseado em pontos';
COMMENT ON FUNCTION get_weekly_ranking IS 'Retorna ranking semanal de horas estudadas';
COMMENT ON FUNCTION get_daily_ranking IS 'Retorna ranking diário de horas estudadas';
COMMENT ON FUNCTION find_study_matches IS 'Encontra parceiros de estudo compatíveis';
COMMENT ON FUNCTION get_user_community_stats IS 'Retorna estatísticas do usuário para o perfil da comunidade';
