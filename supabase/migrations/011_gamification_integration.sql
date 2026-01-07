-- =============================================
-- GAMIFICATION INTEGRATION
-- Integra pontuação automática ao completar checklists
-- =============================================

-- Configuração de pontos (deve corresponder ao frontend)
-- per_checklist_completed: 50 pontos
-- per_study_hour: 10 pontos

-- Função para dar pontos automaticamente quando checklist é completado
CREATE OR REPLACE FUNCTION public.award_points_on_checklist()
RETURNS TRIGGER AS $$
DECLARE
  points_to_add INTEGER := 50; -- Pontos por checklist
  study_hours NUMERIC;
  study_points INTEGER;
  current_points INTEGER;
  new_total INTEGER;
  new_level TEXT;
BEGIN
  -- Calcular pontos por tempo de estudo (10 pts por hora)
  IF NEW.duration_seconds IS NOT NULL AND NEW.duration_seconds > 0 THEN
    study_hours := NEW.duration_seconds::NUMERIC / 3600;
    study_points := FLOOR(study_hours * 10);
    points_to_add := points_to_add + study_points;
  END IF;
  
  -- Obter pontos atuais
  SELECT COALESCE(total_points, 0) INTO current_points
  FROM public.profiles
  WHERE id = NEW.user_id;
  
  new_total := current_points + points_to_add;
  
  -- Calcular novo nível
  new_level := CASE
    WHEN new_total >= 10001 THEN 'elite'
    WHEN new_total >= 5001 THEN 'diamante'
    WHEN new_total >= 2001 THEN 'ouro'
    WHEN new_total >= 501 THEN 'prata'
    ELSE 'bronze'
  END;
  
  -- Atualizar perfil com novos pontos e nível
  UPDATE public.profiles
  SET 
    total_points = new_total,
    level = new_level,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger antigo se existir
DROP TRIGGER IF EXISTS on_checklist_award_points ON public.checklist_attempts;

-- Criar trigger para dar pontos automaticamente
CREATE TRIGGER on_checklist_award_points
  AFTER INSERT ON public.checklist_attempts
  FOR EACH ROW EXECUTE FUNCTION public.award_points_on_checklist();

-- =============================================
-- TABELA: user_badges (se não existir)
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Habilitar RLS
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Políticas para user_badges
DROP POLICY IF EXISTS "Users can view own badges" ON public.user_badges;
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own badges" ON public.user_badges;
CREATE POLICY "Users can insert own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Permitir que todos vejam badges de outros usuários (para rankings)
DROP POLICY IF EXISTS "Anyone can view badges" ON public.user_badges;
CREATE POLICY "Anyone can view badges" ON public.user_badges
  FOR SELECT USING (true);

-- Índice para performance
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);

-- =============================================
-- Função para verificar e dar badges automaticamente
-- =============================================
CREATE OR REPLACE FUNCTION public.check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  total_hours NUMERIC;
  streak INTEGER;
  total_checklists INTEGER;
BEGIN
  -- Obter estatísticas do usuário
  SELECT 
    COALESCE(total_study_time_minutes, 0) / 60.0,
    COALESCE(current_streak, 0),
    COALESCE(total_checklists, 0)
  INTO total_hours, streak, total_checklists
  FROM public.user_stats
  WHERE user_id = NEW.user_id;
  
  -- Badge: Primeiro Checklist
  IF total_checklists >= 1 THEN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.user_id, 'first_checklist')
    ON CONFLICT (user_id, badge_type) DO NOTHING;
  END IF;
  
  -- Badge: 50h estudadas
  IF total_hours >= 50 THEN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.user_id, '50h_studied')
    ON CONFLICT (user_id, badge_type) DO NOTHING;
  END IF;
  
  -- Badge: 100h estudadas
  IF total_hours >= 100 THEN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.user_id, '100h_studied')
    ON CONFLICT (user_id, badge_type) DO NOTHING;
  END IF;
  
  -- Badge: 200h estudadas
  IF total_hours >= 200 THEN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.user_id, '200h_studied')
    ON CONFLICT (user_id, badge_type) DO NOTHING;
  END IF;
  
  -- Badge: Streak 7 dias
  IF streak >= 7 THEN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.user_id, 'streak_7')
    ON CONFLICT (user_id, badge_type) DO NOTHING;
  END IF;
  
  -- Badge: Streak 30 dias
  IF streak >= 30 THEN
    INSERT INTO public.user_badges (user_id, badge_type)
    VALUES (NEW.user_id, 'streak_30')
    ON CONFLICT (user_id, badge_type) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para verificar badges após atualização de stats
DROP TRIGGER IF EXISTS on_stats_check_badges ON public.user_stats;
CREATE TRIGGER on_stats_check_badges
  AFTER INSERT OR UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.check_and_award_badges();
