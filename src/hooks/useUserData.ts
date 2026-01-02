import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { 
  Profile, 
  ChecklistAttempt, 
  UserStats, 
  ProductivityTask,
  InsertChecklistAttempt,
  InsertProductivityTask
} from '@/types/database';

interface UseUserDataReturn {
  // Profile
  profile: Profile | null;
  loadingProfile: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  
  // Stats
  stats: UserStats | null;
  loadingStats: boolean;
  
  // Checklist Attempts
  attempts: ChecklistAttempt[];
  loadingAttempts: boolean;
  saveAttempt: (attempt: Omit<InsertChecklistAttempt, 'user_id'>) => Promise<void>;
  getAttemptsByChecklist: (checklistId: string) => ChecklistAttempt[];
  
  // Productivity Tasks
  tasks: ProductivityTask[];
  loadingTasks: boolean;
  addTask: (text: string, date: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTasksByDate: (date: string) => ProductivityTask[];
  
  // Refresh
  refreshAll: () => Promise<void>;
}

export function useUserData(): UseUserDataReturn {
  const { user } = useAuth();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [attempts, setAttempts] = useState<ChecklistAttempt[]>([]);
  const [tasks, setTasks] = useState<ProductivityTask[]>([]);
  
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Carregar perfil
  const loadProfile = useCallback(async () => {
    if (!user) return;
    
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoadingProfile(false);
    }
  }, [user]);

  // Carregar estatísticas
  const loadStats = useCallback(async () => {
    if (!user) return;
    
    setLoadingStats(true);
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar stats:', error);
    } finally {
      setLoadingStats(false);
    }
  }, [user]);

  // Carregar tentativas de checklist
  const loadAttempts = useCallback(async () => {
    if (!user) return;
    
    setLoadingAttempts(true);
    try {
      const { data, error } = await supabase
        .from('checklist_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      setAttempts(data || []);
    } catch (error) {
      console.error('Erro ao carregar tentativas:', error);
    } finally {
      setLoadingAttempts(false);
    }
  }, [user]);

  // Carregar tarefas de produtividade
  const loadTasks = useCallback(async () => {
    if (!user) return;
    
    setLoadingTasks(true);
    try {
      // Carregar tarefas dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data, error } = await supabase
        .from('productivity_tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: false });
      
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoadingTasks(false);
    }
  }, [user]);

  // Atualizar perfil
  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      
      if (error) throw error;
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }, [user]);

  // Salvar tentativa de checklist
  const saveAttempt = useCallback(async (attempt: Omit<InsertChecklistAttempt, 'user_id'>) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('checklist_attempts')
        .insert({
          ...attempt,
          user_id: user.id,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      setAttempts(prev => [data, ...prev]);
      
      // Recarregar stats (trigger atualiza automaticamente)
      await loadStats();
    } catch (error) {
      console.error('Erro ao salvar tentativa:', error);
      throw error;
    }
  }, [user, loadStats]);

  // Obter tentativas por checklist
  const getAttemptsByChecklist = useCallback((checklistId: string) => {
    return attempts.filter(a => a.checklist_id === checklistId);
  }, [attempts]);

  // Adicionar tarefa
  const addTask = useCallback(async (text: string, date: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('productivity_tasks')
        .insert({
          user_id: user.id,
          text,
          date,
          completed: false
        })
        .select()
        .single();
      
      if (error) throw error;
      setTasks(prev => [data, ...prev]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      throw error;
    }
  }, [user]);

  // Toggle tarefa
  const toggleTask = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    try {
      const { error } = await supabase
        .from('productivity_tasks')
        .update({ completed: !task.completed })
        .eq('id', taskId);
      
      if (error) throw error;
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  }, [tasks]);

  // Deletar tarefa
  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('productivity_tasks')
        .delete()
        .eq('id', taskId);
      
      if (error) throw error;
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  }, []);

  // Obter tarefas por data
  const getTasksByDate = useCallback((date: string) => {
    return tasks.filter(t => t.date === date);
  }, [tasks]);

  // Refresh all
  const refreshAll = useCallback(async () => {
    await Promise.all([
      loadProfile(),
      loadStats(),
      loadAttempts(),
      loadTasks()
    ]);
  }, [loadProfile, loadStats, loadAttempts, loadTasks]);

  // Carregar dados quando usuário mudar
  useEffect(() => {
    if (user) {
      refreshAll();
    } else {
      setProfile(null);
      setStats(null);
      setAttempts([]);
      setTasks([]);
    }
  }, [user, refreshAll]);

  return {
    profile,
    loadingProfile,
    updateProfile,
    stats,
    loadingStats,
    attempts,
    loadingAttempts,
    saveAttempt,
    getAttemptsByChecklist,
    tasks,
    loadingTasks,
    addTask,
    toggleTask,
    deleteTask,
    getTasksByDate,
    refreshAll
  };
}
