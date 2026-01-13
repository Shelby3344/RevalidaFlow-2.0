import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export interface ChecklistMetric {
  checklistId: string;
  attempts: number;
  scores: number[];
  average: number;
  lastAttempt: string;
  bestScore: number;
}

interface MetricsStore {
  [checklistId: string]: ChecklistMetric;
}

export function useChecklistMetrics() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<MetricsStore>({});
  const [loading, setLoading] = useState(true);

  // Carregar métricas do Supabase
  useEffect(() => {
    if (!user) {
      setMetrics({});
      setLoading(false);
      return;
    }

    const loadMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from('checklist_metrics')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        const metricsMap: MetricsStore = {};
        data?.forEach((m: any) => {
          metricsMap[m.checklist_id] = {
            checklistId: m.checklist_id,
            attempts: m.attempts || 0,
            scores: m.scores || [],
            average: m.average || 0,
            lastAttempt: m.last_attempt_at || '',
            bestScore: m.best_score || 0,
          };
        });
        setMetrics(metricsMap);
      } catch (e) {
        console.error('Erro ao carregar métricas:', e);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [user]);

  // Registrar uma nova tentativa com pontuação
  const recordAttempt = useCallback(async (checklistId: string, score: number) => {
    if (!user) return;

    const existing = metrics[checklistId];
    const newScores = existing ? [...existing.scores, score] : [score];
    const newAverage = newScores.reduce((a, b) => a + b, 0) / newScores.length;
    const newBestScore = Math.max(...newScores);
    const newAttempts = (existing?.attempts || 0) + 1;

    try {
      const { error } = await supabase
        .from('checklist_metrics')
        .upsert({
          user_id: user.id,
          checklist_id: checklistId,
          attempts: newAttempts,
          scores: newScores,
          average: Math.round(newAverage * 100) / 100,
          best_score: newBestScore,
          last_attempt_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,checklist_id'
        });

      if (error) throw error;

      // Atualizar estado local
      setMetrics(prev => ({
        ...prev,
        [checklistId]: {
          checklistId,
          attempts: newAttempts,
          scores: newScores,
          average: Math.round(newAverage * 100) / 100,
          lastAttempt: new Date().toISOString(),
          bestScore: newBestScore,
        }
      }));
    } catch (e) {
      console.error('Erro ao salvar métrica:', e);
    }
  }, [user, metrics]);

  // Obter métrica de um checklist específico
  const getMetric = useCallback((checklistId: string): ChecklistMetric | null => {
    return metrics[checklistId] || null;
  }, [metrics]);

  // Obter média de um checklist
  const getAverage = useCallback((checklistId: string): number => {
    const metric = metrics[checklistId];
    return metric?.average || 0;
  }, [metrics]);

  // Obter número de tentativas
  const getAttempts = useCallback((checklistId: string): number => {
    const metric = metrics[checklistId];
    return metric?.attempts || 0;
  }, [metrics]);

  // Resetar métricas de um checklist
  const resetMetric = useCallback(async (checklistId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('checklist_metrics')
        .delete()
        .eq('user_id', user.id)
        .eq('checklist_id', checklistId);

      if (error) throw error;

      setMetrics(prev => {
        const newMetrics = { ...prev };
        delete newMetrics[checklistId];
        return newMetrics;
      });
    } catch (e) {
      console.error('Erro ao resetar métrica:', e);
    }
  }, [user]);

  // Resetar todas as métricas
  const resetAllMetrics = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('checklist_metrics')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setMetrics({});
    } catch (e) {
      console.error('Erro ao resetar todas as métricas:', e);
    }
  }, [user]);

  return {
    metrics,
    loading,
    recordAttempt,
    getMetric,
    getAverage,
    getAttempts,
    resetMetric,
    resetAllMetrics,
  };
}
