// Detector de itens do checklist em mensagens do candidato

import { ChecklistItemForAI, ItemScoreIA } from '@/types/treino-ia';
import { ChecklistEvaluationItem } from '@/types/checklists';

/**
 * Converte itens do checklist para formato de detecção
 */
export function prepareChecklistForDetection(items: ChecklistEvaluationItem[]): ChecklistItemForAI[] {
  return items.map((item, index) => ({
    id: index + 1,
    description: item.title,
    keywords: extractKeywords(item.title),
    maxScore: item.scores.max,
  }));
}

/**
 * Extrai palavras-chave de uma descrição
 */
function extractKeywords(description: string): string[] {
  const stopWords = [
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'da', 'do', 'das', 'dos',
    'em', 'na', 'no', 'nas', 'nos', 'para', 'por', 'com', 'sem', 'sobre',
    'e', 'ou', 'que', 'se', 'ao', 'aos', 'à', 'às', 'pelo', 'pela',
    'este', 'esta', 'esse', 'essa', 'aquele', 'aquela', 'seu', 'sua',
  ];
  
  const words = description
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, ' ') // Remove pontuação
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  return [...new Set(words)];
}

/**
 * Detecta itens do checklist em uma mensagem (versão local/fallback)
 */
export function detectChecklistItemsLocal(
  message: string,
  checklistItems: ChecklistItemForAI[],
  existingScores: Record<number, ItemScoreIA>
): { detectedItems: number[]; scores: Record<number, { type: 'adequate' | 'partial' | 'inadequate'; reason: string }> } {
  const normalizedMessage = message
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  const detectedItems: number[] = [];
  const scores: Record<number, { type: 'adequate' | 'partial' | 'inadequate'; reason: string }> = {};
  
  for (const item of checklistItems) {
    // Pular itens já marcados com pontuação máxima
    if (existingScores[item.id]?.type === 'adequate') {
      continue;
    }
    
    const matchCount = item.keywords.filter(keyword => 
      normalizedMessage.includes(keyword)
    ).length;
    
    const matchRatio = matchCount / item.keywords.length;
    
    if (matchRatio >= 0.5) {
      detectedItems.push(item.id);
      
      if (matchRatio >= 0.8) {
        scores[item.id] = { type: 'adequate', reason: 'Abordou o item de forma completa' };
      } else if (matchRatio >= 0.5) {
        scores[item.id] = { type: 'partial', reason: 'Mencionou parcialmente o item' };
      }
    }
  }
  
  return { detectedItems, scores };
}

/**
 * Calcula pontuação baseada no tipo
 */
export function calculateItemScore(
  type: 'adequate' | 'partial' | 'inadequate',
  maxScore: number
): number {
  switch (type) {
    case 'adequate':
      return maxScore;
    case 'partial':
      return maxScore * 0.5;
    case 'inadequate':
      return 0;
    default:
      return 0;
  }
}

/**
 * Verifica se nova pontuação é melhor que a existente
 */
export function shouldUpdateScore(
  existingScore: ItemScoreIA | undefined,
  newType: 'adequate' | 'partial' | 'inadequate'
): boolean {
  if (!existingScore) return true;
  
  const typeOrder = { inadequate: 0, partial: 1, adequate: 2 };
  return typeOrder[newType] > typeOrder[existingScore.type];
}

/**
 * Mescla novas pontuações com existentes, mantendo a maior
 */
export function mergeScores(
  existingScores: Record<number, ItemScoreIA>,
  newScores: Record<number, { type: 'adequate' | 'partial' | 'inadequate'; reason: string }>,
  checklistItems: ChecklistItemForAI[],
  fromMessage: string
): Record<number, ItemScoreIA> {
  const merged = { ...existingScores };
  
  for (const [itemIdStr, newScore] of Object.entries(newScores)) {
    const itemId = parseInt(itemIdStr);
    const item = checklistItems.find(i => i.id === itemId);
    if (!item) continue;
    
    if (shouldUpdateScore(merged[itemId], newScore.type)) {
      merged[itemId] = {
        itemId,
        score: calculateItemScore(newScore.type, item.maxScore),
        type: newScore.type,
        detectedAt: Date.now(),
        fromMessage,
        reason: newScore.reason,
      };
    }
  }
  
  return merged;
}
