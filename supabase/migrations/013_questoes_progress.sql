-- Migration: Progresso de Questões Teóricas
-- Salva o progresso do usuário nas questões teóricas no Supabase

-- Tabela de progresso das questões
CREATE TABLE IF NOT EXISTS questoes_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  questao_id INTEGER NOT NULL,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Cada usuário só pode ter um progresso por questão
  UNIQUE(user_id, questao_id)
);

-- Tabela de configurações avançadas do usuário para questões
CREATE TABLE IF NOT EXISTS questoes_user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  hide_correct BOOLEAN DEFAULT FALSE,
  hide_reviewed BOOLEAN DEFAULT FALSE,
  only_last_5_years BOOLEAN DEFAULT FALSE,
  last_filter_key TEXT,
  last_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para salvar o último índice por combinação de filtros
CREATE TABLE IF NOT EXISTS questoes_last_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  filter_key TEXT NOT NULL,
  last_index INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, filter_key)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_questoes_progress_user ON questoes_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_questoes_progress_questao ON questoes_progress(questao_id);
CREATE INDEX IF NOT EXISTS idx_questoes_progress_user_questao ON questoes_progress(user_id, questao_id);
CREATE INDEX IF NOT EXISTS idx_questoes_last_index_user ON questoes_last_index(user_id);

-- RLS Policies
ALTER TABLE questoes_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE questoes_user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE questoes_last_index ENABLE ROW LEVEL SECURITY;

-- Políticas para questoes_progress
CREATE POLICY "Users can view own progress" ON questoes_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON questoes_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON questoes_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON questoes_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para questoes_user_settings
CREATE POLICY "Users can view own settings" ON questoes_user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON questoes_user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON questoes_user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para questoes_last_index
CREATE POLICY "Users can view own last index" ON questoes_last_index
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own last index" ON questoes_last_index
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own last index" ON questoes_last_index
  FOR UPDATE USING (auth.uid() = user_id);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_questoes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
DROP TRIGGER IF EXISTS questoes_progress_updated_at ON questoes_progress;
CREATE TRIGGER questoes_progress_updated_at
  BEFORE UPDATE ON questoes_progress
  FOR EACH ROW EXECUTE FUNCTION update_questoes_updated_at();

DROP TRIGGER IF EXISTS questoes_user_settings_updated_at ON questoes_user_settings;
CREATE TRIGGER questoes_user_settings_updated_at
  BEFORE UPDATE ON questoes_user_settings
  FOR EACH ROW EXECUTE FUNCTION update_questoes_updated_at();

DROP TRIGGER IF EXISTS questoes_last_index_updated_at ON questoes_last_index;
CREATE TRIGGER questoes_last_index_updated_at
  BEFORE UPDATE ON questoes_last_index
  FOR EACH ROW EXECUTE FUNCTION update_questoes_updated_at();
