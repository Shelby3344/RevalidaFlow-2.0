// Utilitários para o sistema de avaliação em tempo real

import { ItemScore } from '@/types/avaliacao';

/**
 * Gera um código único de sessão no formato "TEXXXXXXXXXX"
 * Usa timestamp + caracteres aleatórios para garantir unicidade
 */
export function generateSessionCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TE${timestamp}${random}`;
}

/**
 * Codifica dados da sessão para incluir na URL
 */
export function encodeSessionData(data: {
  checklistId: string;
  checklistTitle: string;
  areaCode: string;
  avaliadorName: string;
  maxScore: number;
}): string {
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

/**
 * Decodifica dados da sessão da URL
 */
export function decodeSessionData(encoded: string): {
  checklistId: string;
  checklistTitle: string;
  areaCode: string;
  avaliadorName: string;
  maxScore: number;
} | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}

/**
 * Gera o link completo para compartilhar a sessão com o avaliado
 * Inclui os dados da sessão codificados na URL
 */
export function generateSessionLink(sessionCode: string, sessionData?: {
  checklistId: string;
  checklistTitle: string;
  areaCode: string;
  avaliadorName: string;
  maxScore: number;
}): string {
  const baseUrl = window.location.origin;
  if (sessionData) {
    const encoded = encodeSessionData(sessionData);
    return `${baseUrl}/avaliacao/participar/${sessionCode}?data=${encoded}`;
  }
  return `${baseUrl}/avaliacao/participar/${sessionCode}`;
}

/**
 * Gera o link para o avaliador acessar a sessão
 */
export function generateAvaliadorLink(sessionCode: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/avaliacao/${sessionCode}`;
}

/**
 * Calcula a pontuação total a partir das pontuações individuais
 */
export function calculateTotalScore(scores: Record<number, ItemScore>): number {
  return Object.values(scores).reduce((total, item) => total + item.score, 0);
}

/**
 * Calcula a porcentagem da pontuação
 */
export function calculatePercentage(totalScore: number, maxScore: number): number {
  if (maxScore === 0) return 0;
  return (totalScore / maxScore) * 100;
}

/**
 * Formata o tempo em segundos para o formato MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Duração padrão da estação em segundos (10 minutos)
 */
export const DEFAULT_DURATION = 600;

/**
 * Chave do localStorage para armazenar sessões
 */
export const STORAGE_KEY = 'avaliacao_sessions';

/**
 * Nome do canal de broadcast para sincronização
 */
export const BROADCAST_CHANNEL = 'avaliacao_sync';
