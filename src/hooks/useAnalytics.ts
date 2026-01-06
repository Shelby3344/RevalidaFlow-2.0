import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ChecklistAttempt, UserStats } from '@/types/database';
import { Scissors, Stethoscope, Heart, Baby, Shield } from 'lucide-react';

// Types
export interface AreaStats {
  area: string;
  areaCode: string;
  media: number;
  estacoes: number;
  color: string;
  icon: any;
  trend: number;
}

export interface WeakPoint {
  id: string;
  title: string;
  score: number;
  area: string;
  date: string;
}

export interface EvolutionData {
  date: string;
  score: number;
  media: number;
}

export interface GlobalStats {
  totalUsers: number;
  avgScore: number;
  topPerformers: number;
  activeToday: number;
}

// Mapeamento de áreas
const AREA_CONFIG: Record<string, { name: string; color: string; icon: any }> = {
  CR: { name: 'Cirurgia', color: '#3b82f6', icon: Scissors },
  CM: { name: 'Clínica Médica', color: '#8b5cf6', icon: Stethoscope },
  GO: { name: 'Ginecologia/Obstetrícia', color: '#ec4899', icon: Heart },
  PE: { name: 'Pediatria', color: '#10b981', icon: Baby },
  PR: { name: 'Preventiva', color: '#f59e0b', icon: Shield },
};

interface UseAnalyticsReturn {
  // Dados
  attempts: ChecklistAttempt[];
  stats: UserStats | null;
  areaStats: AreaStats[];
  weakPoints: WeakPoint[];
  evolutionData: EvolutionData[];
  globalStats: GlobalStats;
  
  // Estados
  loading: boolean;
  error: string | null;
  
  // Métricas calculadas
  totalEstacoes: number;
  mediaGeral: number;
  tempoTotalMinutos: number;
  
  // Ações
  refreshData: () => Promise<void>;
  resetAllStats: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsReturn {
  const { user } = useAuth();
  
  const [attempts, setAttempts] = useState<ChecklistAttempt[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalUsers: 0,
    avgScore: 0,
    topPerformers: 0,
    activeToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar tentativas do usuário
  const loadAttempts = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('checklist_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });
      
      if (error) throw error;
      setAttempts(data || []);
    } catch (err) {
      console.error('Erro ao carregar tentativas:', err);
      setError('Erro ao carregar dados');
    }
  }, [user]);

  // Carregar stats do usuário
  const loadStats = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setStats(data);
    } catch (err) {
      console.error('Erro ao carregar stats:', err);
    }
  }, [user]);

  // Carregar estatísticas globais da plataforma
  const loadGlobalStats = useCallback(async () => {
    try {
      // Contar total de usuários
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Calcular média geral de todos os usuários
      const { data: allStats } = await supabase
        .from('user_stats')
        .select('average_score');
      
      const avgScore = allStats && allStats.length > 0
        ? allStats.reduce((acc, s) => acc + (s.average_score || 0), 0) / allStats.length
        : 0;

      // Top performers (média > 7)
      const { count: topPerformers } = await supabase
        .from('user_stats')
        .select('*', { count: 'exact', head: true })
        .gte('average_score', 70);

      // Ativos hoje
      const today = new Date().toISOString().split('T')[0];
      const { count: activeToday } = await supabase
        .from('user_stats')
        .select('*', { count: 'exact', head: true })
        .gte('last_activity_at', today);

      setGlobalStats({
        totalUsers: totalUsers || 0,
        avgScore: Math.round(avgScore * 10) / 10,
        topPerformers: topPerformers || 0,
        activeToday: activeToday || 0,
      });
    } catch (err) {
      console.error('Erro ao carregar stats globais:', err);
    }
  }, []);

  // Refresh all data
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([loadAttempts(), loadStats(), loadGlobalStats()]);
    setLoading(false);
  }, [loadAttempts, loadStats, loadGlobalStats]);

  // Reset all stats
  const resetAllStats = useCallback(async () => {
    if (!user) return;
    
    try {
      // Deletar todas as tentativas do usuário
      const { error: attemptsError } = await supabase
        .from('checklist_attempts')
        .delete()
        .eq('user_id', user.id);
      
      if (attemptsError) throw attemptsError;

      // Resetar user_stats
      const { error: statsError } = await supabase
        .from('user_stats')
        .update({
          total_checklists: 0,
          total_study_time_minutes: 0,
          average_score: 0,
          best_score: 0,
          current_streak: 0,
          longest_streak: 0,
          last_activity_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
      
      if (statsError) throw statsError;

      // Limpar estado local
      setAttempts([]);
      setStats(prev => prev ? {
        ...prev,
        total_checklists: 0,
        total_study_time_minutes: 0,
        average_score: 0,
        best_score: 0,
        current_streak: 0,
        longest_streak: 0,
        last_activity_at: null,
      } : null);

    } catch (err) {
      console.error('Erro ao resetar estatísticas:', err);
      throw err;
    }
  }, [user]);

  // Calcular estatísticas por área
  const areaStats = useMemo((): AreaStats[] => {
    if (attempts.length === 0) {
      // Retornar áreas vazias
      return Object.entries(AREA_CONFIG).map(([code, config]) => ({
        area: config.name,
        areaCode: code,
        media: 0,
        estacoes: 0,
        color: config.color,
        icon: config.icon,
        trend: 0,
      }));
    }

    const areaMap: Record<string, { scores: number[]; recent: number[]; old: number[] }> = {};
    
    // Agrupar por área
    attempts.forEach(attempt => {
      const code = attempt.area_code || 'OTHER';
      if (!areaMap[code]) {
        areaMap[code] = { scores: [], recent: [], old: [] };
      }
      areaMap[code].scores.push(attempt.percentage);
      
      // Separar últimos 7 dias vs anteriores para calcular trend
      const attemptDate = new Date(attempt.completed_at);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      if (attemptDate >= sevenDaysAgo) {
        areaMap[code].recent.push(attempt.percentage);
      } else {
        areaMap[code].old.push(attempt.percentage);
      }
    });

    return Object.entries(AREA_CONFIG).map(([code, config]) => {
      const data = areaMap[code] || { scores: [], recent: [], old: [] };
      const media = data.scores.length > 0
        ? data.scores.reduce((a, b) => a + b, 0) / data.scores.length / 10
        : 0;
      
      // Calcular trend (diferença entre média recente e antiga)
      const recentAvg = data.recent.length > 0
        ? data.recent.reduce((a, b) => a + b, 0) / data.recent.length
        : 0;
      const oldAvg = data.old.length > 0
        ? data.old.reduce((a, b) => a + b, 0) / data.old.length
        : recentAvg;
      const trend = oldAvg > 0 ? Math.round(((recentAvg - oldAvg) / oldAvg) * 100) : 0;

      return {
        area: config.name,
        areaCode: code,
        media: Math.round(media * 10) / 10,
        estacoes: data.scores.length,
        color: config.color,
        icon: config.icon,
        trend,
      };
    });
  }, [attempts]);

  // Calcular pontos fracos (piores notas)
  const weakPoints = useMemo((): WeakPoint[] => {
    if (attempts.length === 0) return [];

    return attempts
      .filter(a => a.percentage < 60) // Notas abaixo de 60%
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        title: a.checklist_title || 'Checklist',
        score: Math.round(a.percentage) / 10,
        area: a.area_code || 'N/A',
        date: new Date(a.completed_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      }));
  }, [attempts]);

  // Calcular dados de evolução (últimos 30 dias)
  const evolutionData = useMemo((): EvolutionData[] => {
    if (attempts.length === 0) return [];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Agrupar por data
    const dateMap: Record<string, number[]> = {};
    
    attempts
      .filter(a => new Date(a.completed_at) >= thirtyDaysAgo)
      .forEach(a => {
        const date = new Date(a.completed_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        if (!dateMap[date]) dateMap[date] = [];
        dateMap[date].push(a.percentage / 10);
      });

    // Calcular média global para comparação
    const globalAvg = globalStats.avgScore || 6.5;

    return Object.entries(dateMap)
      .map(([date, scores]) => ({
        date,
        score: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
        media: globalAvg,
      }))
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);
        return monthA !== monthB ? monthA - monthB : dayA - dayB;
      });
  }, [attempts, globalStats.avgScore]);

  // Métricas calculadas
  const totalEstacoes = useMemo(() => attempts.length, [attempts]);
  
  const mediaGeral = useMemo(() => {
    if (attempts.length === 0) return 0;
    const sum = attempts.reduce((acc, a) => acc + a.percentage, 0);
    return Math.round((sum / attempts.length) / 10 * 10) / 10;
  }, [attempts]);

  const tempoTotalMinutos = useMemo(() => {
    return attempts.reduce((acc, a) => acc + (a.duration_seconds || 0), 0) / 60;
  }, [attempts]);

  // Carregar dados ao montar
  useEffect(() => {
    if (user) {
      refreshData();
    } else {
      setAttempts([]);
      setStats(null);
      setLoading(false);
    }
  }, [user, refreshData]);

  return {
    attempts,
    stats,
    areaStats,
    weakPoints,
    evolutionData,
    globalStats,
    loading,
    error,
    totalEstacoes,
    mediaGeral,
    tempoTotalMinutos,
    refreshData,
    resetAllStats,
  };
}
