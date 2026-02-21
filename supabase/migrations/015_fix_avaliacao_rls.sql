-- =============================================
-- FIX: Corrigir RLS de avaliacao_sessions
-- O avaliado precisa poder atualizar a sessão quando status='waiting'
-- para setar seu avaliado_id, mas a policy antiga exigia que
-- avaliado_id já fosse o uid do user (chicken-and-egg problem)
-- =============================================

-- Remover policy antiga de UPDATE
DROP POLICY IF EXISTS "Participants can update sessions" ON avaliacao_sessions;

-- Nova policy: permite update se é participante OU se a sessão está em 'waiting' (para avaliado entrar)
CREATE POLICY "Participants can update sessions" ON avaliacao_sessions
  FOR UPDATE USING (
    auth.uid() = creator_id OR 
    auth.uid() = avaliador_id OR 
    auth.uid() = avaliado_id OR
    status = 'waiting'
  );

-- Remover policy antiga de SELECT (para recriar com mais permissividade)
DROP POLICY IF EXISTS "Users can view sessions they participate in" ON avaliacao_sessions;

-- Nova policy de SELECT: inclui sessões onde o user é participante ou status é 'waiting'
CREATE POLICY "Users can view sessions they participate in" ON avaliacao_sessions
  FOR SELECT USING (
    auth.uid() = creator_id OR 
    auth.uid() = avaliador_id OR 
    auth.uid() = avaliado_id OR
    status = 'waiting'
  );
