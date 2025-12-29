import { createClient } from '@supabase/supabase-js';

// Hardcode as fallback since .env might not load properly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://faazmzqbsnppmbymqtco.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhYXptenFic25wcG1ieW1xdGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzEwMjgsImV4cCI6MjA4MjYwNzAyOH0.62x50lU8BTHkuJkSUuLRAmssqLZGK92y5W0Vtg6Y8K0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas do banco
export type Database = {
  public: {
    Tables: {
      // Adicionar tipos das tabelas aqui conforme necessário
    };
  };
};
