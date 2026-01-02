-- =============================================
-- REVALIDAFLOW - SCHEMA DO BANCO DE DADOS
-- =============================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABELA: profiles (Perfil do usuário)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium', 'vip')),
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- TABELA: checklist_attempts (Tentativas de checklist)
-- =============================================
CREATE TABLE IF NOT EXISTS public.checklist_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  checklist_id TEXT NOT NULL,
  checklist_title TEXT,
  area_code TEXT,
  score DECIMAL(5,2) NOT NULL,
  max_score DECIMAL(5,2) NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  duration_seconds INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_checklist_attempts_user_id ON public.checklist_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_attempts_checklist_id ON public.checklist_attempts(checklist_id);
CREATE INDEX IF NOT EXISTS idx_checklist_attempts_completed_at ON public.checklist_attempts(completed_at DESC);

-- =============================================
-- TABELA: user_stats (Estatísticas do usuário)
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_checklists INTEGER DEFAULT 0,
  total_study_time_minutes INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  best_score DECIMAL(5,2) DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABELA: productivity_tasks (Tarefas de produtividade)
-- =============================================
CREATE TABLE IF NOT EXISTS public.productivity_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_productivity_tasks_user_date ON public.productivity_tasks(user_id, date);

-- =============================================
-- TABELA: flashcard_progress (Progresso de flashcards)
-- =============================================
CREATE TABLE IF NOT EXISTS public.flashcard_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  flashcard_id TEXT NOT NULL,
  ease_factor DECIMAL(3,2) DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

-- =============================================
-- TABELA: study_sessions (Sessões de estudo)
-- =============================================
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('checklist', 'flashcard', 'resumo', 'treino_ia', 'colaborativo')),
  duration_minutes INTEGER NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON public.study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_started_at ON public.study_sessions(started_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productivity_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para checklist_attempts
CREATE POLICY "Users can view own attempts" ON public.checklist_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON public.checklist_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para user_stats
CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para productivity_tasks
CREATE POLICY "Users can view own tasks" ON public.productivity_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.productivity_tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.productivity_tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.productivity_tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para flashcard_progress
CREATE POLICY "Users can view own flashcard progress" ON public.flashcard_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own flashcard progress" ON public.flashcard_progress
  FOR ALL USING (auth.uid() = user_id);

-- Políticas para study_sessions
CREATE POLICY "Users can view own sessions" ON public.study_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.study_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- FUNÇÕES AUXILIARES
-- =============================================

-- Função para atualizar estatísticas do usuário após nova tentativa
CREATE OR REPLACE FUNCTION public.update_user_stats_on_attempt()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, total_checklists, average_score, best_score, last_activity_at)
  VALUES (
    NEW.user_id,
    1,
    NEW.percentage,
    NEW.percentage,
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_checklists = user_stats.total_checklists + 1,
    average_score = (
      SELECT AVG(percentage) FROM public.checklist_attempts WHERE user_id = NEW.user_id
    ),
    best_score = GREATEST(user_stats.best_score, NEW.percentage),
    last_activity_at = NOW(),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para atualizar stats
DROP TRIGGER IF EXISTS on_checklist_attempt ON public.checklist_attempts;
CREATE TRIGGER on_checklist_attempt
  AFTER INSERT ON public.checklist_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats_on_attempt();

-- =============================================
-- DADOS INICIAIS (opcional)
-- =============================================

-- Criar stats para usuários existentes que não têm
INSERT INTO public.user_stats (user_id)
SELECT id FROM public.profiles
WHERE id NOT IN (SELECT user_id FROM public.user_stats)
ON CONFLICT DO NOTHING;
