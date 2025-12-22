// Tipos para o sistema de Treino com IA Completo

export type TreinoStatus = 'setup' | 'running' | 'paused' | 'finished';

export interface TreinoIASession {
  id: string;
  checklistId: string;
  checklistTitle: string;
  areaCode: string;
  startedAt: number;
  finishedAt?: number;
  timeRemaining: number;
  status: TreinoStatus;
  
  // Avaliação
  completedItems: Record<number, ItemScoreIA>;
  totalScore: number;
  maxScore: number;
  
  // Exames
  liberatedExames: number[];
  
  // Histórico
  conversationHistory: MessageIA[];
}

export interface MessageIA {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    detectedItems?: number[];
    detectedExames?: number[];
    itemScores?: Record<number, ItemScoreIA>;
  };
}

export interface ItemScoreIA {
  itemId: number;
  score: number;
  type: 'adequate' | 'partial' | 'inadequate';
  detectedAt: number;
  fromMessage: string;
  reason?: string;
}

export interface AIResponse {
  pacienteResponse: string;
  detectedChecklistItems: number[];
  detectedExames: number[];
  itemScores: Record<number, { type: 'adequate' | 'partial' | 'inadequate'; reason: string }>;
  evaluationFeedback?: string;
}

export interface AIPromptContext {
  scenario: string;
  patientScript: string;
  checklistItems: ChecklistItemForAI[];
  availableExames: ExameForAI[];
  conversationHistory: MessageIA[];
}

export interface ChecklistItemForAI {
  id: number;
  description: string;
  keywords: string[];
  maxScore: number;
}

export interface ExameForAI {
  id: number;
  title: string;
  keywords: string[];
  content: string;
}

// Resultado do treino
export interface TreinoResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  completedItems: ItemScoreIA[];
  pendingItems: number[];
  liberatedExames: number[];
  duration: number; // em segundos
  conversationCount: number;
}

// Callbacks para o hook
export interface TreinoIACallbacks {
  onChecklistItemCompleted?: (itemId: number, score: ItemScoreIA) => void;
  onExameLiberated?: (exameId: number) => void;
  onProgressUpdate?: (completed: number, total: number) => void;
}
