export interface ImpressoItem {
  id: number;
  title: string;
  isOpen: boolean;
  color: string;
  content?: string;
  image?: string | null;
}

export interface ChecklistEvaluationItem {
  id: number;
  title: string;
  subItems: string[];
  scoring: {
    adequate: string;
    partial: string;
    inadequate: string;
  };
  scores: {
    min: number;
    partial: number;
    max: number;
  };
  dica_teorica?: string;
}

export interface VideoData {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  description?: string;
  category: string;
  provider: 'youtube' | 'vimeo' | 'vturb' | 'direct' | 'other';
}

export interface AulaCard {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  videoData?: VideoData;
}

export interface ChecklistContent {
  scenario: {
    nivel: string;
    tipo: string;
    situacao: string[];
    descricao: string[];
  };
  orientacoes: string[];
  instrucoes: {
    titulo: string;
    itens: string[];
  };
  impressos: ImpressoItem[];
  evaluationItems: ChecklistEvaluationItem[];
  references: string[];
  // Campos extras dos JSONs
  definicao?: string;
  resumo?: {
    pct: string;
    star: number;
    time: number;
    count: number;
  };
  // Campos raw markdown - preservam formatação original do PEPE
  rawCenario?: string;      // cenário original com markdown (scene)
  rawDescricao?: string;    // descrição do caso com markdown
  rawTarefas?: string;      // tarefas com markdown
  rawScriptAtor?: string;   // script do ator com markdown completo
}

// ===== COLLABORATIVE TRAINING ROOMS TYPES =====

export type AreaCode = 'CM' | 'CR' | 'GO' | 'PE' | 'PR';

export interface RoomParticipant {
  userId: string;
  userName: string;
  role: 'host' | 'participant';
  joinedAt: Date;
  isActive: boolean;
  cursor?: CursorPosition;
}

export interface RoomSettings {
  allowChat: boolean;
  allowLateJoin: boolean;
  autoStart: boolean;
  sessionDuration?: number;
}

export interface TrainingRoom {
  id: string;
  code?: string; // Para salas privadas
  type: 'public' | 'private';
  hostId: string;
  hostName: string;
  checklistId: string;
  checklistTitle: string;
  areaCode: AreaCode;
  maxParticipants: number;
  currentParticipants: number;
  participants: RoomParticipant[];
  status: 'waiting' | 'active' | 'paused' | 'finished';
  createdAt: Date;
  startedAt?: Date;
  settings: RoomSettings;
}

export interface CreateRoomConfig {
  type: 'public' | 'private';
  checklistId: string;
  checklistTitle: string;
  areaCode: AreaCode;
  maxParticipants: number;
  settings: RoomSettings;
}

export interface SyncAction {
  id: string;
  roomId: string;
  userId: string;
  type: 'checklist_item' | 'annotation' | 'cursor_move' | 'chat_message';
  data: any;
  timestamp: Date;
}

export interface ChecklistSyncData {
  itemId: number;
  score: number;
  type: 'adequate' | 'partial' | 'inadequate';
  userId: string;
}

export interface CursorPosition {
  x: number;
  y: number;
  elementId?: string;
  userId: string;
  userName: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system' | 'action';
}

export interface ChatSettings {
  enabled: boolean;
  moderationEnabled: boolean;
  maxMessageLength: number;
  rateLimitPerMinute: number;
}

export interface SessionState {
  roomId: string;
  checklistProgress: Map<number, ChecklistSyncData>;
  annotations: Map<string, any>;
  participants: RoomParticipant[];
  lastUpdated: Date;
}
