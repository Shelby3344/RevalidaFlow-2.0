// Tipos do banco de dados Supabase

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan: 'free' | 'premium' | 'vip';
  plan_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChecklistAttempt {
  id: string;
  user_id: string;
  checklist_id: string;
  checklist_title: string | null;
  area_code: string | null;
  score: number;
  max_score: number;
  percentage: number;
  duration_seconds: number | null;
  completed_at: string;
  created_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_checklists: number;
  total_study_time_minutes: number;
  average_score: number;
  best_score: number;
  current_streak: number;
  longest_streak: number;
  last_activity_at: string | null;
  updated_at: string;
}

export interface ProductivityTask {
  id: string;
  user_id: string;
  text: string;
  completed: boolean;
  date: string;
  created_at: string;
}

export interface FlashcardProgress {
  id: string;
  user_id: string;
  flashcard_id: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string | null;
  last_reviewed_at: string | null;
  created_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  session_type: 'checklist' | 'flashcard' | 'resumo' | 'treino_ia' | 'colaborativo';
  duration_minutes: number;
  started_at: string;
  ended_at: string;
}

// Tipos para inserção (sem campos auto-gerados)
export type InsertChecklistAttempt = Omit<ChecklistAttempt, 'id' | 'created_at'>;
export type InsertProductivityTask = Omit<ProductivityTask, 'id' | 'created_at'>;
export type InsertStudySession = Omit<StudySession, 'id' | 'ended_at'>;

// Database schema type para Supabase
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      checklist_attempts: {
        Row: ChecklistAttempt;
        Insert: InsertChecklistAttempt;
        Update: Partial<ChecklistAttempt>;
      };
      user_stats: {
        Row: UserStats;
        Insert: Partial<UserStats> & { user_id: string };
        Update: Partial<UserStats>;
      };
      productivity_tasks: {
        Row: ProductivityTask;
        Insert: InsertProductivityTask;
        Update: Partial<ProductivityTask>;
      };
      flashcard_progress: {
        Row: FlashcardProgress;
        Insert: Partial<FlashcardProgress> & { user_id: string; flashcard_id: string };
        Update: Partial<FlashcardProgress>;
      };
      study_sessions: {
        Row: StudySession;
        Insert: InsertStudySession;
        Update: Partial<StudySession>;
      };
    };
  };
}
