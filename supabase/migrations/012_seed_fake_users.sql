-- Migration: Seed fake ranking data
-- Tabela separada para usuários fictícios no ranking

-- Criar tabela de usuários fictícios
CREATE TABLE IF NOT EXISTS fake_ranking_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  total_points INTEGER DEFAULT 0,
  level TEXT DEFAULT 'bronze',
  checklists_completed INTEGER DEFAULT 0,
  study_hours INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permitir leitura pública
ALTER TABLE fake_ranking_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Fake users are viewable by everyone" ON fake_ranking_users;
CREATE POLICY "Fake users are viewable by everyone" ON fake_ranking_users FOR SELECT USING (true);

-- Limpar dados anteriores se existirem
DELETE FROM fake_ranking_users;

-- Inserir usuários fictícios com nomes brasileiros
-- Elite (5000+)
INSERT INTO fake_ranking_users (display_name, total_points, level, checklists_completed, study_hours) VALUES
('Yuri Fernandes', 5500, 'elite', 52, 140),
('Bianca Rezende', 5200, 'elite', 50, 130),
('Ana Carolina Silva', 4950, 'elite', 47, 125),
('João Victor Melo', 4850, 'elite', 45, 120),
('Everton Moraes', 4600, 'elite', 43, 115),
('Pedro Henrique Santos', 4400, 'elite', 42, 110),
('Sabrina Andrade', 4200, 'elite', 40, 100),
('Milena Soares', 4100, 'elite', 38, 102),
-- Diamante (3000-4999)
('Paloma Reis', 3950, 'diamante', 37, 98),
('Mariana Oliveira', 3800, 'diamante', 35, 95),
('Guilherme Barros', 3650, 'diamante', 34, 90),
('Danilo Vargas', 3600, 'diamante', 33, 92),
('Lucas Gabriel Costa', 3500, 'diamante', 32, 88),
('Jéssica Nogueira', 3350, 'diamante', 31, 85),
('Lorena Prado', 3300, 'diamante', 31, 82),
('Juliana Ferreira', 3200, 'diamante', 30, 80),
('Daniel Machado', 3050, 'diamante', 29, 78),
-- Ouro (2000-2999)
('Murilo Bastos', 2950, 'ouro', 28, 75),
('Rafael Almeida', 2900, 'ouro', 28, 72),
('Raquel Pires', 2800, 'ouro', 27, 70),
('Beatriz Rodrigues', 2700, 'ouro', 26, 68),
('Giovana Luz', 2650, 'ouro', 26, 66),
('Leandro Sampaio', 2600, 'ouro', 25, 65),
('Gustavo Lima', 2500, 'ouro', 24, 62),
('Michele Tavares', 2400, 'ouro', 23, 60),
('Caique Mendonça', 2350, 'ouro', 23, 59),
('Camila Souza', 2300, 'ouro', 22, 58),
('Paulo César Xavier', 2200, 'ouro', 21, 55),
('Bruna Lacerda', 2150, 'ouro', 21, 54),
('Thiago Martins', 2100, 'ouro', 20, 52),
('Cláudia Vasconcelos', 2050, 'ouro', 19, 50);


-- Prata (1000-1999)
INSERT INTO fake_ranking_users (display_name, total_points, level, checklists_completed, study_hours) VALUES
('Larissa Pereira', 1950, 'prata', 18, 48),
('Marcos Antônio', 1900, 'prata', 18, 47),
('Enzo Gabriel', 1850, 'prata', 18, 46),
('Bruno Carvalho', 1800, 'prata', 17, 45),
('Elaine Brito', 1750, 'prata', 17, 44),
('Heloísa Rangel', 1700, 'prata', 17, 43),
('Fernanda Gomes', 1650, 'prata', 16, 42),
('Sérgio Aguiar', 1600, 'prata', 16, 40),
('Nicolas Paiva', 1550, 'prata', 15, 39),
('Diego Nascimento', 1500, 'prata', 15, 38),
('Viviane Siqueira', 1480, 'prata', 15, 37),
('Lívia Cordeiro', 1420, 'prata', 14, 36),
('Amanda Ribeiro', 1400, 'prata', 14, 35),
('Roberto Farias', 1350, 'prata', 14, 34),
('Matheus Barbosa', 1300, 'prata', 13, 32),
('Arthur Henrique', 1280, 'prata', 13, 32),
('Simone Guimarães', 1250, 'prata', 13, 31),
('Isabela Cardoso', 1200, 'prata', 12, 30),
('Isadora Menezes', 1180, 'prata', 12, 30),
('Adriano Coelho', 1150, 'prata', 12, 29),
('Felipe Moreira', 1100, 'prata', 11, 28),
('Davi Lucas', 1080, 'prata', 11, 27),
('Luciana Pacheco', 1050, 'prata', 11, 26),
('Gabriela Araújo', 1000, 'prata', 10, 25);

-- Bronze (0-999)
INSERT INTO fake_ranking_users (display_name, total_points, level, checklists_completed, study_hours) VALUES
('Rogério Miranda', 980, 'bronze', 10, 24),
('Clara Monteiro', 960, 'bronze', 10, 24),
('Vinícius Teixeira', 950, 'bronze', 9, 23),
('Cristiane Alencar', 920, 'bronze', 9, 22),
('Carolina Mendes', 900, 'bronze', 9, 22),
('Wagner Santana', 870, 'bronze', 9, 21),
('André Campos', 850, 'bronze', 8, 20),
('Pietro Alves', 840, 'bronze', 8, 20),
('Mônica Valente', 820, 'bronze', 8, 19),
('Letícia Rocha', 800, 'bronze', 8, 18),
('Flávia Bezerra', 770, 'bronze', 8, 18),
('Helena Viana', 750, 'bronze', 7, 17),
('Ricardo Dias', 750, 'bronze', 7, 17),
('Márcio Queiroz', 720, 'bronze', 7, 16),
('Patrícia Nunes', 700, 'bronze', 7, 15),
('Carla Dantas', 680, 'bronze', 7, 15),
('Eduardo Freitas', 650, 'bronze', 6, 14),
('Antônio Neto', 630, 'bronze', 6, 13),
('Vanessa Correia', 600, 'bronze', 6, 12),
('Sandra Maia', 580, 'bronze', 6, 12),
('Marcelo Pinto', 550, 'bronze', 5, 11),
('José Carlos Filho', 530, 'bronze', 5, 10),
('Renata Azevedo', 500, 'bronze', 5, 10),
('Vera Lúcia Braga', 490, 'bronze', 5, 9),
('Fábio Monteiro', 480, 'bronze', 5, 9),
('Maurício Rios', 460, 'bronze', 5, 9),
('Aline Castro', 450, 'bronze', 4, 9),
('Débora Fontes', 430, 'bronze', 4, 8),
('Rodrigo Vieira', 420, 'bronze', 4, 8),
('Cássio Amaral', 400, 'bronze', 4, 8),
('Priscila Cunha', 395, 'bronze', 4, 8),
('Ingrid Barreto', 370, 'bronze', 4, 7),
('Leonardo Ramos', 380, 'bronze', 4, 7),
('Otávio Leal', 340, 'bronze', 3, 7),
('Daniela Lopes', 350, 'bronze', 3, 7),
('Karina Assis', 310, 'bronze', 3, 6),
('Caio Medeiros', 320, 'bronze', 3, 6),
('Natália Borges', 300, 'bronze', 3, 6),
('Renan Cavalcante', 290, 'bronze', 3, 6),
('Henrique Fonseca', 280, 'bronze', 3, 5),
('Thaís Magalhães', 260, 'bronze', 3, 5),
('Tatiana Moura', 250, 'bronze', 2, 5),
('Igor Batista', 230, 'bronze', 2, 5),
('Alexandre Duarte', 220, 'bronze', 2, 4),
('Luana Esteves', 200, 'bronze', 2, 4);


-- Função para ranking combinado (usuários reais + fictícios)
CREATE OR REPLACE FUNCTION get_weekly_ranking(p_limit INTEGER DEFAULT 50)
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
  -- Usuários reais
  SELECT 
    ROW_NUMBER() OVER (ORDER BY COALESCE(f.total_points, 0) DESC)::BIGINT as rank,
    f.id as user_id,
    f.display_name as full_name,
    f.avatar_url,
    f.level,
    f.total_points,
    f.study_hours::NUMERIC as weekly_hours
  FROM (
    -- Fake users
    SELECT 
      id,
      display_name,
      avatar_url,
      level,
      total_points,
      study_hours
    FROM fake_ranking_users
    UNION ALL
    -- Real users from profiles
    SELECT 
      p.id,
      COALESCE(p.full_name, 'Usuário') as display_name,
      p.avatar_url,
      'bronze' as level,
      0 as total_points,
      0 as study_hours
    FROM profiles p
  ) f
  ORDER BY f.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para ranking diário
CREATE OR REPLACE FUNCTION get_daily_ranking(p_limit INTEGER DEFAULT 50)
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
  SELECT 
    ROW_NUMBER() OVER (ORDER BY f.total_points DESC)::BIGINT as rank,
    f.id as user_id,
    f.display_name as full_name,
    f.avatar_url,
    f.level,
    f.total_points,
    (f.study_hours / 7.0)::NUMERIC as daily_hours
  FROM (
    SELECT id, display_name, avatar_url, level, total_points, study_hours
    FROM fake_ranking_users
    UNION ALL
    SELECT p.id, COALESCE(p.full_name, 'Usuário'), p.avatar_url, 'bronze', 0, 0
    FROM profiles p
  ) f
  ORDER BY f.total_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
