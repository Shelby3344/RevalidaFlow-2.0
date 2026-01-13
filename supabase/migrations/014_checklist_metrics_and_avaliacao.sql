-- Migration: Métricas de Checklists e Sessões de Avaliação
-- Migra localStorage para Supabase

-- =============================================
-- TABELA: checklist_metrics (Métricas detalhadas por checklist)
-- =============================================
CREATE TABLE IF NOT EXISTS checklist_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checklist_id TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  scores DECIMAL[] DEFAULT '{}',
  average DECIMAL(5,2) DEFAULT 0,
  best_score DECIMAL(5,2) DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, checklist_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_checklist_metrics_user ON checklist_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_metrics_checklist ON checklist_metrics(checklist_id);

-- =============================================
-- TABELA: avaliacao_sessions (Sessões de avaliação entre usuários)
-- =============================================
CREATE TABLE IF NOT EXISTS avaliacao_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checklist_id TEXT NOT NULL,
  checklist_title TEXT,
  area_code TEXT,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed', 'cancelled')),
  
  -- Participantes
  avaliador_id UUID REFERENCES auth.users(id),
  avaliado_id UUID REFERENCES auth.users(id),
  avaliador_name TEXT,
  avaliado_name TEXT,
  
  -- Dados da avaliação
  current_item_index INTEGER DEFAULT 0,
  items_evaluated JSONB DEFAULT '[]',
  score DECIMAL(5,2),
  max_score DECIMAL(5,2),
  percentage DECIMAL(5,2),
  
  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_avaliacao_sessions_code ON avaliacao_sessions(code);
CREATE INDEX IF NOT EXISTS idx_avaliacao_sessions_creator ON avaliacao_sessions(creator_id);
CREATE INDEX IF NOT EXISTS idx_avaliacao_sessions_status ON avaliacao_sessions(status);
CREATE INDEX IF NOT EXISTS idx_avaliacao_sessions_avaliador ON avaliacao_sessions(avaliador_id);
CREATE INDEX IF NOT EXISTS idx_avaliacao_sessions_avaliado ON avaliacao_sessions(avaliado_id);

-- =============================================
-- RLS Policies
-- =============================================
ALTER TABLE checklist_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacao_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para checklist_metrics
CREATE POLICY "Users can view own metrics" ON checklist_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics" ON checklist_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics" ON checklist_metrics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own metrics" ON checklist_metrics
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para avaliacao_sessions (mais permissivas para permitir colaboração)
CREATE POLICY "Users can view sessions they participate in" ON avaliacao_sessions
  FOR SELECT USING (
    auth.uid() = creator_id OR 
    auth.uid() = avaliador_id OR 
    auth.uid() = avaliado_id OR
    status = 'waiting'
  );

CREATE POLICY "Users can create sessions" ON avaliacao_sessions
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Participants can update sessions" ON avaliacao_sessions
  FOR UPDATE USING (
    auth.uid() = creator_id OR 
    auth.uid() = avaliador_id OR 
    auth.uid() = avaliado_id
  );

CREATE POLICY "Creators can delete sessions" ON avaliacao_sessions
  FOR DELETE USING (auth.uid() = creator_id);

-- =============================================
-- Triggers para updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_metrics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS checklist_metrics_updated_at ON checklist_metrics;
CREATE TRIGGER checklist_metrics_updated_at
  BEFORE UPDATE ON checklist_metrics
  FOR EACH ROW EXECUTE FUNCTION update_metrics_updated_at();

DROP TRIGGER IF EXISTS avaliacao_sessions_updated_at ON avaliacao_sessions;
CREATE TRIGGER avaliacao_sessions_updated_at
  BEFORE UPDATE ON avaliacao_sessions
  FOR EACH ROW EXECUTE FUNCTION update_metrics_updated_at();

-- =============================================
-- Habilitar Realtime para avaliacao_sessions
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE avaliacao_sessions;
