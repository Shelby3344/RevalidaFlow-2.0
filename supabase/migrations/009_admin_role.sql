-- Migration: Admin Role
-- Adiciona campo de role para diferenciar admins no chat

-- Adicionar coluna role na tabela profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator'));

-- Definir Filipe Erick como admin
UPDATE public.profiles SET role = 'admin' WHERE email = 'felipeinew@gmail.com';

-- Atualizar nome também
UPDATE public.profiles SET full_name = 'Filipe Erick' WHERE email = 'felipeinew@gmail.com';
