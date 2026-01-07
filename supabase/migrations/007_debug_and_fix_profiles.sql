-- ============================================
-- DEBUG: Ver todos os perfis e seus dados
-- Execute isso primeiro para ver o estado atual
-- ============================================
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.avatar_url,
  u.raw_user_meta_data->>'full_name' as meta_full_name,
  u.raw_user_meta_data->>'name' as meta_name,
  u.raw_user_meta_data->>'avatar_url' as meta_avatar,
  u.raw_user_meta_data->>'picture' as meta_picture
FROM public.profiles p
JOIN auth.users u ON p.id = u.id;

-- ============================================
-- FIX: Atualizar TODOS os perfis com dados do auth.users
-- Isso força a atualização mesmo se já tiver algum valor
-- ============================================
UPDATE public.profiles p
SET 
  full_name = COALESCE(
    NULLIF(TRIM(u.raw_user_meta_data->>'full_name'), ''),
    NULLIF(TRIM(u.raw_user_meta_data->>'name'), ''),
    NULLIF(TRIM(u.raw_user_meta_data->>'user_name'), ''),
    NULLIF(TRIM(u.raw_user_meta_data->>'login'), ''),
    SPLIT_PART(u.email, '@', 1),
    p.full_name
  ),
  avatar_url = COALESCE(
    NULLIF(TRIM(u.raw_user_meta_data->>'avatar_url'), ''),
    NULLIF(TRIM(u.raw_user_meta_data->>'picture'), ''),
    p.avatar_url
  )
FROM auth.users u
WHERE p.id = u.id;

-- ============================================
-- VERIFICAR: Ver resultado após atualização
-- ============================================
SELECT id, email, full_name, avatar_url FROM public.profiles;
