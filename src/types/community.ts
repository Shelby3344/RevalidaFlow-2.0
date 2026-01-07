// Types for Community Hub

export type UserLevel = 'bronze' | 'prata' | 'ouro' | 'diamante' | 'elite';

export type BadgeType = 
  | 'studying_now' 
  | 'top_week' 
  | 'top_day'
  | '50h_studied'
  | '100h_studied' 
  | '200h_studied'
  | 'streak_7' 
  | 'streak_30' 
  | 'first_checklist';

export type ActivityType = 'online' | 'studying' | 'away' | 'offline';

export type InviteStatus = 'pending' | 'accepted' | 'declined';

export type RankingFilter = 'top_week' | 'top_day' | 'most_improved' | 'same_goal' | 'same_module';

// Level thresholds
export const LEVEL_THRESHOLDS: Record<UserLevel, { min: number; max: number; color: string; icon: string }> = {
  bronze: { min: 0, max: 500, color: '#CD7F32', icon: '🥉' },
  prata: { min: 501, max: 2000, color: '#C0C0C0', icon: '🥈' },
  ouro: { min: 2001, max: 5000, color: '#FFD700', icon: '🥇' },
  diamante: { min: 5001, max: 10000, color: '#B9F2FF', icon: '💎' },
  elite: { min: 10001, max: Infinity, color: '#9B59B6', icon: '👑' }
};

// Points configuration
export const POINTS_CONFIG = {
  per_study_hour: 10,
  per_checklist_completed: 50,
  per_streak_day: 20,
  per_flashcard_review: 2
};

// Badge definitions
export const BADGE_CONFIG: Record<BadgeType, { name: string; description: string; icon: string; color: string }> = {
  studying_now: { name: 'Estudando Agora', description: 'Usuário está estudando neste momento', icon: '📚', color: '#22C55E' },
  top_week: { name: 'Top da Semana', description: 'Top 3 em horas estudadas na semana', icon: '🏆', color: '#F59E0B' },
  top_day: { name: 'Top do Dia', description: 'Top 3 em horas estudadas hoje', icon: '⭐', color: '#EAB308' },
  '50h_studied': { name: '50h Estudadas', description: 'Mais de 50 horas de estudo', icon: '📖', color: '#3B82F6' },
  '100h_studied': { name: '100h Estudadas', description: 'Mais de 100 horas de estudo', icon: '🎯', color: '#8B5CF6' },
  '200h_studied': { name: '200h Estudadas', description: 'Mais de 200 horas de estudo', icon: '🚀', color: '#EC4899' },
  streak_7: { name: 'Streak 7 Dias', description: 'Estudou 7 dias consecutivos', icon: '🔥', color: '#EF4444' },
  streak_30: { name: 'Streak 30 Dias', description: 'Estudou 30 dias consecutivos', icon: '💪', color: '#F97316' },
  first_checklist: { name: 'Primeiro Checklist', description: 'Completou o primeiro checklist', icon: '✅', color: '#10B981' }
};


// Community Profile with all stats
export interface CommunityProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  study_goal: string | null;
  main_module: string | null;
  total_points: number;
  level: UserLevel;
  is_profile_public: boolean;
  show_in_rankings: boolean;
  allow_study_invites: boolean;
  // Computed stats
  total_study_hours: number;
  daily_average_hours: number;
  weekly_average_hours: number;
  checklist_completion_rate: number;
  current_streak: number;
  badges: BadgeType[];
  last_activity: string | null;
}

// Extended presence with user info
export interface UserPresenceExtended {
  user_id: string;
  status: 'online' | 'away' | 'offline';
  activity_type: ActivityType;
  current_module: string | null;
  last_seen: string | null;
  user: {
    full_name: string | null;
    avatar_url: string | null;
    level: UserLevel;
    badges: BadgeType[];
    role?: 'user' | 'admin' | 'moderator';
  };
}

// Study invite
export interface StudyInvite {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: InviteStatus;
  message: string | null;
  created_at: string;
  responded_at: string | null;
  sender?: {
    full_name: string | null;
    avatar_url: string | null;
    level: UserLevel;
  };
  receiver?: {
    full_name: string | null;
    avatar_url: string | null;
    level: UserLevel;
  };
}

// Study match result
export interface StudyMatch {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  level: UserLevel;
  study_goal: string | null;
  main_module: string | null;
  total_points: number;
  compatibility_score: number;
  matching_criteria: {
    dedication_match: number;  // 0-40
    goal_match: number;        // 0-30
    schedule_match: number;    // 0-20
    module_match: number;      // 0-10
  };
}

// Ranking entry
export interface RankingEntry {
  rank: number;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  level: UserLevel;
  total_points: number;
  metric_value: number;
  metric_label: string;
}

// Extended chat message with community info
export interface ChatMessageExtended {
  id: string;
  user_id: string;
  content: string;
  reply_to_id: string | null;
  created_at: string;
  user: {
    full_name: string | null;
    avatar_url: string | null;
    level: UserLevel;
    badges: BadgeType[];
    is_studying: boolean;
  };
}

// Privacy settings
export interface PrivacySettings {
  is_profile_public: boolean;
  show_in_rankings: boolean;
  allow_study_invites: boolean;
}

// Community stats for a user
export interface CommunityStats {
  total_study_hours: number;
  daily_average_hours: number;
  weekly_average_hours: number;
  checklist_completion_rate: number;
  current_streak: number;
  badges: BadgeType[];
}

// Helper functions
export function calculateLevel(points: number): UserLevel {
  if (points >= 10001) return 'elite';
  if (points >= 5001) return 'diamante';
  if (points >= 2001) return 'ouro';
  if (points >= 501) return 'prata';
  return 'bronze';
}

export function calculateLevelProgress(points: number): number {
  const level = calculateLevel(points);
  const { min, max } = LEVEL_THRESHOLDS[level];
  if (max === Infinity) return 100;
  return Math.min(100, ((points - min) / (max - min)) * 100);
}

export function getNextLevel(currentLevel: UserLevel): UserLevel | null {
  const levels: UserLevel[] = ['bronze', 'prata', 'ouro', 'diamante', 'elite'];
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === levels.length - 1) return null;
  return levels[currentIndex + 1];
}

export function getPointsToNextLevel(points: number): number {
  const level = calculateLevel(points);
  const { max } = LEVEL_THRESHOLDS[level];
  if (max === Infinity) return 0;
  return max - points + 1;
}
