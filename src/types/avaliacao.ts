// Tipos para o sistema de avaliação em tempo real

export type SessionStatus = 'aguardando' | 'em_andamento' | 'pausado' | 'finalizado';

export interface ItemScore {
  itemId: number;
  score: number;
  type: 'adequate' | 'partial' | 'inadequate';
}

export interface AvaliacaoSession {
  code: string;                      // Código único da sessão (ex: "TE1766432825222C")
  checklistId: string;               // ID do checklist selecionado
  checklistTitle: string;            // Título do checklist
  areaCode: string;                  // Código da área (CM, CR, GO, PE, PR)
  avaliadorName: string;             // Nome do avaliador
  avaliadoName?: string;             // Nome do avaliado (quando conecta)
  status: SessionStatus;             // Status atual da sessão
  createdAt: number;                 // Timestamp de criação
  startedAt?: number;                // Timestamp de início
  finishedAt?: number;               // Timestamp de finalização
  timeRemaining: number;             // Tempo restante em segundos (600 = 10 min)
  totalDuration: number;             // Duração total em segundos (600)
  
  // Pontuações
  scores: Record<number, ItemScore>; // itemId -> pontuação
  totalScore: number;                // Pontuação total atual
  maxScore: number;                  // Pontuação máxima possível
  
  // Impressos liberados
  unlockedImpressos: number[];       // IDs dos impressos desbloqueados
  
  // Resultado compartilhado
  resultShared: boolean;             // Se o resultado foi compartilhado com avaliado
}

export interface SessionState {
  status: SessionStatus;
  timeRemaining: number;
  unlockedImpressos: number[];
  avaliadoConnected: boolean;
  resultShared: boolean;
}

// Mensagens do BroadcastChannel para sincronização
export type SyncMessage = 
  | { type: 'STATE_UPDATE'; sessionCode: string; state: SessionState }
  | { type: 'AVALIADO_CONNECTED'; sessionCode: string; name: string }
  | { type: 'IMPRESSO_UNLOCKED'; sessionCode: string; impressoId: number }
  | { type: 'IMPRESSO_LOCKED'; sessionCode: string; impressoId: number }
  | { type: 'TIMER_TICK'; sessionCode: string; timeRemaining: number }
  | { type: 'SESSION_STARTED'; sessionCode: string }
  | { type: 'SESSION_PAUSED'; sessionCode: string }
  | { type: 'SESSION_RESUMED'; sessionCode: string }
  | { type: 'SESSION_FINISHED'; sessionCode: string }
  | { type: 'RESULT_SHARED'; sessionCode: string };
