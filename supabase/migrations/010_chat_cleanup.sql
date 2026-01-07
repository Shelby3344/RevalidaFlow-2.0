-- Migration: Chat Cleanup - Deletar mensagens após 24 horas
-- Cria uma função e um cron job para limpar mensagens antigas

-- Função para deletar mensagens com mais de 24 horas
CREATE OR REPLACE FUNCTION delete_old_chat_messages()
RETURNS void AS $$
BEGIN
  DELETE FROM public.global_chat_messages
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Para executar manualmente (teste):
-- SELECT delete_old_chat_messages();

-- NOTA: Para automação, você precisa configurar um cron job no Supabase:
-- 1. Vá em Database > Extensions e habilite "pg_cron"
-- 2. Execute: SELECT cron.schedule('cleanup-chat', '0 * * * *', 'SELECT delete_old_chat_messages()');
-- Isso executa a cada hora

-- Alternativa: Criar uma Edge Function que roda periodicamente
-- Ou usar o Supabase Scheduled Functions
