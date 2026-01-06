-- Migration: Global Chat System
-- Descrição: Sistema de chat global com mensagens públicas, privadas e presença online

-- ============================================
-- TABELA: global_chat_messages
-- Mensagens do chat global (público)
-- ============================================
CREATE TABLE IF NOT EXISTS public.global_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  reply_to_id UUID REFERENCES public.global_chat_messages(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_global_chat_created_at ON public.global_chat_messages(created_at DESC);
CREATE INDEX idx_global_chat_user_id ON public.global_chat_messages(user_id);
CREATE INDEX idx_global_chat_reply_to ON public.global_chat_messages(reply_to_id);

-- ============================================
-- TABELA: private_messages
-- Mensagens privadas entre usuários
-- ============================================
CREATE TABLE IF NOT EXISTS public.private_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_private_messages_sender ON public.private_messages(sender_id);
CREATE INDEX idx_private_messages_receiver ON public.private_messages(receiver_id);
CREATE INDEX idx_private_messages_created_at ON public.private_messages(created_at DESC);
CREATE INDEX idx_private_messages_conversation ON public.private_messages(
  LEAST(sender_id, receiver_id), 
  GREATEST(sender_id, receiver_id), 
  created_at DESC
);

-- ============================================
-- TABELA: user_presence
-- Status de presença online dos usuários
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_presence (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'away', 'offline')),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS (Row Level Security)
-- ============================================

-- Global Chat Messages
ALTER TABLE public.global_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários autenticados podem ver mensagens globais"
  ON public.global_chat_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem enviar mensagens globais"
  ON public.global_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprias mensagens globais"
  ON public.global_chat_messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Private Messages
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas mensagens privadas"
  ON public.private_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Usuários podem enviar mensagens privadas"
  ON public.private_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Destinatários podem marcar como lida"
  ON public.private_messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

-- User Presence
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver presença"
  ON public.user_presence FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários podem atualizar própria presença"
  ON public.user_presence FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar própria presença update"
  ON public.user_presence FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Função para contar mensagens não lidas
CREATE OR REPLACE FUNCTION get_unread_messages_count(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM public.private_messages
    WHERE receiver_id = p_user_id AND read_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter conversas com último mensagem
CREATE OR REPLACE FUNCTION get_conversations(p_user_id UUID)
RETURNS TABLE (
  other_user_id UUID,
  last_message TEXT,
  last_message_at TIMESTAMPTZ,
  unread_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH conversations AS (
    SELECT 
      CASE 
        WHEN sender_id = p_user_id THEN receiver_id 
        ELSE sender_id 
      END as other_user,
      content,
      created_at,
      CASE WHEN receiver_id = p_user_id AND read_at IS NULL THEN 1 ELSE 0 END as is_unread
    FROM public.private_messages
    WHERE sender_id = p_user_id OR receiver_id = p_user_id
  ),
  ranked AS (
    SELECT 
      other_user,
      content,
      created_at,
      is_unread,
      ROW_NUMBER() OVER (PARTITION BY other_user ORDER BY created_at DESC) as rn
    FROM conversations
  )
  SELECT 
    r.other_user as other_user_id,
    r.content as last_message,
    r.created_at as last_message_at,
    SUM(c.is_unread) as unread_count
  FROM ranked r
  JOIN conversations c ON c.other_user = r.other_user
  WHERE r.rn = 1
  GROUP BY r.other_user, r.content, r.created_at
  ORDER BY r.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- REALTIME
-- ============================================

-- Habilitar Realtime para as tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE public.global_chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.private_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_presence;

-- ============================================
-- COMENTÁRIOS
-- ============================================
COMMENT ON TABLE public.global_chat_messages IS 'Mensagens do chat global público';
COMMENT ON TABLE public.private_messages IS 'Mensagens privadas entre usuários';
COMMENT ON TABLE public.user_presence IS 'Status de presença online dos usuários';
