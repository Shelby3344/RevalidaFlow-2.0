-- Migration: Fix Profile Full Name
-- Descrição: Corrige o trigger de criação de perfil para pegar o nome de múltiplas fontes OAuth

-- ============================================
-- ATUALIZAR TRIGGER handle_new_user
-- Agora pega nome de mais fontes (Google, GitHub, etc)
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data->>'user_name'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data->>'login'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data->>'preferred_username'), ''),
      SPLIT_PART(NEW.email, '@', 1)
    ),
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'avatar_url'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data->>'picture'), ''),
      ''
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ATUALIZAR PERFIS EXISTENTES SEM NOME
-- Preenche full_name para usuários que já existem
-- ============================================
UPDATE public.profiles p
SET full_name = COALESCE(
  NULLIF(TRIM(u.raw_user_meta_data->>'full_name'), ''),
  NULLIF(TRIM(u.raw_user_meta_data->>'name'), ''),
  NULLIF(TRIM(u.raw_user_meta_data->>'user_name'), ''),
  NULLIF(TRIM(u.raw_user_meta_data->>'login'), ''),
  NULLIF(TRIM(u.raw_user_meta_data->>'preferred_username'), ''),
  SPLIT_PART(u.email, '@', 1)
)
FROM auth.users u
WHERE p.id = u.id
  AND (p.full_name IS NULL OR TRIM(p.full_name) = '');

-- ============================================
-- ATUALIZAR AVATAR PARA USUÁRIOS SEM AVATAR
-- ============================================
UPDATE public.profiles p
SET avatar_url = COALESCE(
  NULLIF(TRIM(u.raw_user_meta_data->>'avatar_url'), ''),
  NULLIF(TRIM(u.raw_user_meta_data->>'picture'), '')
)
FROM auth.users u
WHERE p.id = u.id
  AND (p.avatar_url IS NULL OR TRIM(p.avatar_url) = '');

-- ============================================
-- COMENTÁRIOS
-- ============================================
COMMENT ON FUNCTION public.handle_new_user IS 'Cria perfil automaticamente quando usuário se registra, pegando nome de múltiplas fontes OAuth';
