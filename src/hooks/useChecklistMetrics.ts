import { useState, useEffect, useCallback } from 'react';

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

const STORAGE_KEY = 'revalida-flow-checklist-metrics';

export function useChecklistMetrics() {
  const [metrics, setMetrics] = useState<MetricsStore>({});

  // Carregar métricas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMetrics(JSON.parse(stored));
      } catch (e) {
        console.error('Erro ao carregar métricas:', e);
        setMetrics({});
      }
    }
  }, []);

  // Salvar métricas no localStorage
  const saveMetrics = useCallback((newMetrics: MetricsStore) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMetrics));
    setMetrics(newMetrics);
  }, []);

  // Registrar uma nova tentativa com pontuação
  const recordAttempt = useCallback((checklistId: string, score: number) => {
    setMetrics(prev => {
      const existing = prev[checklistId];
      const newScores = existing ? [...existing.scores, score] : [score];
      const newAverage = newScores.reduce((a, b) => a + b, 0) / newScores.length;
      
      const newMetric: ChecklistMetric = {
        checklistId,
        attempts: (existing?.attempts || 0) + 1,
        scores: newScores,
        average: Math.round(newAverage * 100) / 100,
        lastAttempt: new Date().toISOString(),
        bestScore: Math.max(...newScores),
      };

      const newMetrics = { ...prev, [checklistId]: newMetric };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMetrics));
      return newMetrics;
    });
  }, []);

  // Obter métrica de um checklist específico
  const getMetric = useCallback((checklistId: string): ChecklistMetric | null => {
    return metrics[checklistId] || null;
  }, [metrics]);

  // Obter média de um checklist (retorna 0 se não houver tentativas)
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
  const resetMetric = useCallback((checklistId: string) => {
    setMetrics(prev => {
      const newMetrics = { ...prev };
      delete newMetrics[checklistId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMetrics));
      return newMetrics;
    });
  }, []);

  // Resetar todas as métricas
  const resetAllMetrics = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMetrics({});
  }, []);

  return {
    metrics,
    recordAttempt,
    getMetric,
    getAverage,
    getAttempts,
    resetMetric,
    resetAllMetrics,
  };
}
