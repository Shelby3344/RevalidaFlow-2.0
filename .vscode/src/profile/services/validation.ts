import type { ValidationResult } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateDisplayName(name: string): ValidationResult {
  if (name.length < 2) {
    return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
  }
  if (name.length > 50) {
    return { isValid: false, error: 'Nome deve ter no máximo 50 caracteres' };
  }
  return { isValid: true, error: null };
}

export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email é obrigatório' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }
  return { isValid: true, error: null };
}

export function validatePassword(password: string): ValidationResult {
  if (password.length < 8) {
    return { isValid: false, error: 'Senha deve ter pelo menos 8 caracteres' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Senha deve conter pelo menos uma letra maiúscula' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Senha deve conter pelo menos uma letra minúscula' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Senha deve conter pelo menos um número' };
  }
  return { isValid: true, error: null };
}

export function validateBio(bio: string): ValidationResult {
  if (bio.length > 500) {
    return { isValid: false, error: 'Biografia deve ter no máximo 500 caracteres' };
  }
  return { isValid: true, error: null };
}

export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return { isValid: true, error: null };
  }
  if (!URL_REGEX.test(url)) {
    return { isValid: false, error: 'URL inválida' };
  }
  return { isValid: true, error: null };
}

export interface FileValidationInput {
  type: string;
  size: number;
}

export function validateImageFile(file: FileValidationInput): ValidationResult {
  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Formato inválido. Use JPG, PNG ou WebP' };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { isValid: false, error: 'Imagem deve ter no máximo 5MB' };
  }
  return { isValid: true, error: null };
}
