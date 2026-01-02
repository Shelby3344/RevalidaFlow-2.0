-- =============================================
-- SALAS COLABORATIVAS - SCHEMA
-- =============================================

-- Tabela de salas
CREATE TABLE IF NOT EXISTS public.collaborative_rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(6) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  checklist_id TEXT NOT NULL,
  checklist_title TEXT,
  area_code TEXT,
  is_public BOOLEAN DEFAULT false,
  max_participants INTEGER DEFAULT 10,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'paused', 'finished')),
  current_item INTEGER DEFAULT 0,
  timer_seconds INTEGER DEFAULT 0,
  timer_running BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_rooms_code ON public.collaborative_rooms(code);
CREATE INDEX IF NOT EXISTS idx_rooms_host ON public.collaborative_rooms(host_id);
CREATE INDEX IF NOT EXISTS idx_rooms_public ON public.collaborative_rooms(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_rooms_status ON public.collaborative_rooms(status);

-- Tabela de participantes
CREATE TABLE IF NOT EXISTS public.room_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES public.collaborative_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'participant' CHECK (role IN ('host', 'evaluator', 'participant', 'observer')),
  is_ready BOOLEAN DEFAULT false,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  UNIQUE(room_id, user_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_participants_room ON public.room_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_participants_user ON public.room_participants(user_id);

-- Tabela de pontuações na sala
CREATE TABLE IF NOT EXISTS public.room_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES public.collaborative_rooms(id) ON DELETE CASCADE NOT NULL,
  evaluator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  evaluated_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_index INTEGER NOT NULL,
  score DECIMAL(3,1),
  score_type TEXT CHECK (score_type IN ('full', 'partial', 'zero', 'na')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, evaluator_id, item_index)
);

-- Tabela de mensagens do chat
CREATE TABLE IF NOT EXISTS public.room_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES public.collaborative_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'score')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_messages_room ON public.room_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON public.room_messages(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.collaborative_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_messages ENABLE ROW LEVEL SECURITY;

-- Políticas para salas
CREATE POLICY "Anyone can view public rooms" ON public.collaborative_rooms
  FOR SELECT USING (is_public = true OR host_id = auth.uid() OR id IN (
    SELECT room_id FROM public.room_participants WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create rooms" ON public.collaborative_rooms
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Host can update room" ON public.collaborative_rooms
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Host can delete room" ON public.collaborative_rooms
  FOR DELETE USING (auth.uid() = host_id);

-- Políticas para participantes
CREATE POLICY "Participants can view room members" ON public.room_participants
  FOR SELECT USING (
    room_id IN (SELECT id FROM public.collaborative_rooms WHERE is_public = true)
    OR room_id IN (SELECT room_id FROM public.room_participants WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can join rooms" ON public.room_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own participation" ON public.room_participants
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can leave rooms" ON public.room_participants
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para pontuações
CREATE POLICY "Participants can view scores" ON public.room_scores
  FOR SELECT USING (
    room_id IN (SELECT room_id FROM public.room_participants WHERE user_id = auth.uid())
  );

CREATE POLICY "Evaluators can insert scores" ON public.room_scores
  FOR INSERT WITH CHECK (auth.uid() = evaluator_id);

CREATE POLICY "Evaluators can update own scores" ON public.room_scores
  FOR UPDATE USING (auth.uid() = evaluator_id);

-- Políticas para mensagens
CREATE POLICY "Participants can view messages" ON public.room_messages
  FOR SELECT USING (
    room_id IN (SELECT room_id FROM public.room_participants WHERE user_id = auth.uid())
  );

CREATE POLICY "Participants can send messages" ON public.room_messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    room_id IN (SELECT room_id FROM public.room_participants WHERE user_id = auth.uid())
  );

-- =============================================
-- FUNÇÕES
-- =============================================

-- Função para gerar código único de sala
CREATE OR REPLACE FUNCTION generate_room_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar código automaticamente
CREATE OR REPLACE FUNCTION set_room_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  IF NEW.code IS NULL OR NEW.code = '' THEN
    LOOP
      new_code := generate_room_code();
      SELECT EXISTS(SELECT 1 FROM public.collaborative_rooms WHERE code = new_code) INTO code_exists;
      EXIT WHEN NOT code_exists;
    END LOOP;
    NEW.code := new_code;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_room_code_trigger ON public.collaborative_rooms;
CREATE TRIGGER set_room_code_trigger
  BEFORE INSERT ON public.collaborative_rooms
  FOR EACH ROW EXECUTE FUNCTION set_room_code();

-- Função para adicionar host como participante automaticamente
CREATE OR REPLACE FUNCTION add_host_as_participant()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.room_participants (room_id, user_id, role, is_ready)
  VALUES (NEW.id, NEW.host_id, 'host', true);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS add_host_participant ON public.collaborative_rooms;
CREATE TRIGGER add_host_participant
  AFTER INSERT ON public.collaborative_rooms
  FOR EACH ROW EXECUTE FUNCTION add_host_as_participant();

-- =============================================
-- HABILITAR REALTIME
-- =============================================

-- Habilitar publicação para realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.collaborative_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_scores;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_messages;
