-- Migration: PEPE Stations (Estações de Checklist)
-- Descrição: Tabelas para catálogo de estações PEPE e progresso do usuário

-- ============================================
-- TABELA: pepe_stations
-- Catálogo de estações/checklists PEPE
-- ============================================
CREATE TABLE IF NOT EXISTS public.pepe_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station_id INTEGER NOT NULL UNIQUE, -- ID original do sistema PEPE
  station_area TEXT NOT NULL, -- Área: Cirurgia, Clínica Médica, etc.
  station_name TEXT NOT NULL, -- Nome da estação
  station_edition TEXT, -- Edição: INEP 2023/2, etc.
  source TEXT DEFAULT 'PEPE', -- Fonte dos dados
  is_discursive BOOLEAN DEFAULT false, -- Se é estação discursiva
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pepe_stations_area ON public.pepe_stations(station_area);
CREATE INDEX IF NOT EXISTS idx_pepe_stations_station_id ON public.pepe_stations(station_id);
CREATE INDEX IF NOT EXISTS idx_pepe_stations_name ON public.pepe_stations(station_name);

-- ============================================
-- TABELA: user_station_progress
-- Progresso do usuário em cada estação
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_station_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  station_id INTEGER NOT NULL, -- Referência ao station_id da pepe_stations
  last_practice_date TIMESTAMPTZ,
  last_score DECIMAL(5,2), -- Última nota (0-100)
  best_score DECIMAL(5,2), -- Melhor nota
  attempts INTEGER DEFAULT 0, -- Número de tentativas
  total_time_seconds INTEGER DEFAULT 0, -- Tempo total de prática
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, station_id)
);

CREATE INDEX IF NOT EXISTS idx_user_station_progress_user ON public.user_station_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_station_progress_station ON public.user_station_progress(station_id);

-- ============================================
-- RLS (Row Level Security)
-- ============================================

-- PEPE Stations - todos podem ler
ALTER TABLE public.pepe_stations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Todos podem ver estações PEPE" ON public.pepe_stations;
CREATE POLICY "Todos podem ver estações PEPE" ON public.pepe_stations
  FOR SELECT TO authenticated USING (true);

-- User Station Progress - usuário vê apenas seu progresso
ALTER TABLE public.user_station_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuários podem ver próprio progresso" ON public.user_station_progress;
CREATE POLICY "Usuários podem ver próprio progresso" ON public.user_station_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem inserir próprio progresso" ON public.user_station_progress;
CREATE POLICY "Usuários podem inserir próprio progresso" ON public.user_station_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar próprio progresso" ON public.user_station_progress;
CREATE POLICY "Usuários podem atualizar próprio progresso" ON public.user_station_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Função para buscar estações com progresso do usuário
CREATE OR REPLACE FUNCTION get_stations_with_progress(
  p_user_id UUID,
  p_area TEXT DEFAULT NULL,
  p_search TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  station_id INTEGER,
  station_area TEXT,
  station_name TEXT,
  station_edition TEXT,
  is_discursive BOOLEAN,
  last_practice_date TIMESTAMPTZ,
  last_score DECIMAL,
  best_score DECIMAL,
  attempts INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.station_id,
    s.station_area,
    s.station_name,
    s.station_edition,
    s.is_discursive,
    p.last_practice_date,
    p.last_score,
    p.best_score,
    COALESCE(p.attempts, 0) as attempts
  FROM public.pepe_stations s
  LEFT JOIN public.user_station_progress p 
    ON p.station_id = s.station_id AND p.user_id = p_user_id
  WHERE 
    (p_area IS NULL OR s.station_area = p_area)
    AND (p_search IS NULL OR s.station_name ILIKE '%' || p_search || '%')
  ORDER BY s.station_area, s.station_name
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para contar estações
CREATE OR REPLACE FUNCTION count_stations(
  p_area TEXT DEFAULT NULL,
  p_search TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*)::INTEGER INTO v_count
  FROM public.pepe_stations s
  WHERE 
    (p_area IS NULL OR s.station_area = p_area)
    AND (p_search IS NULL OR s.station_name ILIKE '%' || p_search || '%');
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter áreas distintas
CREATE OR REPLACE FUNCTION get_station_areas()
RETURNS TABLE (
  area TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.station_area as area,
    COUNT(*) as count
  FROM public.pepe_stations s
  GROUP BY s.station_area
  ORDER BY s.station_area;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- COMENTÁRIOS
-- ============================================
COMMENT ON TABLE public.pepe_stations IS 'Catálogo de estações/checklists PEPE';
COMMENT ON TABLE public.user_station_progress IS 'Progresso do usuário em cada estação PEPE';
COMMENT ON FUNCTION get_stations_with_progress IS 'Busca estações com progresso do usuário';
COMMENT ON FUNCTION count_stations IS 'Conta estações com filtros';
COMMENT ON FUNCTION get_station_areas IS 'Lista áreas distintas com contagem';
