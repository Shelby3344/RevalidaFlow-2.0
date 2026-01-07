-- ============================================
-- FIX: Permitir que usuários autenticados vejam perfis de outros usuários
-- O problema é que a política atual só permite ver o próprio perfil
-- ============================================

-- Remover política antiga que só permite ver próprio perfil
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Criar nova política que permite ver todos os perfis (para comunidade funcionar)
CREATE POLICY "Authenticated users can view all profiles" ON public.profiles
  FOR SELECT 
  TO authenticated
  USING (true);

-- Manter política de update apenas para próprio perfil
-- (já deve existir, mas garantir)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
