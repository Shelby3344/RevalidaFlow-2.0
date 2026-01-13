import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { AvaliacaoSession, ItemScore, SessionStatus } from '@/types/avaliacao';
import {
  generateSessionCode,
  generateSessionLink,
  generateAvaliadorLink,
  calculateTotalScore,
  DEFAULT_DURATION,
} from '@/lib/avaliacao-utils';

interface UseAvaliacaoSessionReturn {
  session: AvaliacaoSession | null;
  loading: boolean;
  createSession: (checklistId: string, checklistTitle: string, areaCode: string, avaliadorName: string, maxScore: number) => Promise<string>;
  loadSession: (sessionCode: string) => Promise<AvaliacaoSession | null>;
  createSessionFromData: (sessionCode: string, data: { checklistId: string; checklistTitle: string; areaCode: string; avaliadorName: string; maxScore: number }) => Promise<AvaliacaoSession>;
  updateSession: (updates: Partial<AvaliacaoSession>) => Promise<void>;
  setScore: (itemId: number, score: number, type: ItemScore['type']) => Promise<void>;
  unlockImpresso: (impressoId: number) => Promise<void>;
  lockImpresso: (impressoId: number) => Promise<void>;
  getSessionLink: (sessionCode: string) => string;
  getAvaliadorLink: (sessionCode: string) => string;
  deleteSession: (sessionCode: string) => Promise<void>;
}

// Converter status do banco para o tipo local
function dbStatusToLocal(status: string): SessionStatus {
  const map: Record<string, SessionStatus> = {
    'waiting': 'aguardando',
    'in_progress': 'em_andamento',
    'completed': 'finalizado',
    'cancelled': 'finalizado'
  };
  return map[status] || 'aguardando';
}

// Converter status local para o banco
function localStatusToDb(status: SessionStatus): string {
  const map: Record<SessionStatus, string> = {
    'aguardando': 'waiting',
    'em_andamento': 'in_progress',
    'pausado': 'in_progress',
    'finalizado': 'completed'
  };
  return map[status] || 'waiting';
}

// Converter dados do banco para o formato local
function dbToLocal(data: any): AvaliacaoSession {
  return {
    code: data.code,
    checklistId: data.checklist_id,
    checklistTitle: data.checklist_title || '',
    areaCode: data.area_code || '',
    avaliadorName: data.avaliador_name || '',
    avaliadoName: data.avaliado_name,
    status: dbStatusToLocal(data.status),
    createdAt: new Date(data.created_at).getTime(),
    startedAt: data.started_at ? new Date(data.started_at).getTime() : undefined,
    finishedAt: data.completed_at ? new Date(data.completed_at).getTime() : undefined,
    timeRemaining: DEFAULT_DURATION,
    totalDuration: DEFAULT_DURATION,
    scores: data.items_evaluated ? 
      (data.items_evaluated as any[]).reduce((acc: Record<number, ItemScore>, item: any) => {
        acc[item.itemId] = item;
        return acc;
      }, {}) : {},
    totalScore: data.score || 0,
    maxScore: data.max_score || 100,
    unlockedImpressos: [],
    resultShared: data.status === 'completed',
  };
}

export function useAvaliacaoSession(): UseAvaliacaoSessionReturn {
  const { user } = useAuth();
  const [session, setSession] = useState<AvaliacaoSession | null>(null);
  const [loading, setLoading] = useState(false);

  // Criar nova sessão
  const createSession = useCallback(async (
    checklistId: string,
    checklistTitle: string,
    areaCode: string,
    avaliadorName: string,
    maxScore: number
  ): Promise<string> => {
    const code = generateSessionCode();
    
    try {
      const { data, error } = await supabase
        .from('avaliacao_sessions')
        .insert({
          code,
          creator_id: user?.id,
          checklist_id: checklistId,
          checklist_title: checklistTitle,
          area_code: areaCode,
          avaliador_id: user?.id,
          avaliador_name: avaliadorName,
          status: 'waiting',
          max_score: maxScore,
          items_evaluated: []
        })
        .select()
        .single();

      if (error) throw error;

      const newSession: AvaliacaoSession = {
        code,
        checklistId,
        checklistTitle,
        areaCode,
        avaliadorName,
        status: 'aguardando',
        createdAt: Date.now(),
        timeRemaining: DEFAULT_DURATION,
        totalDuration: DEFAULT_DURATION,
        scores: {},
        totalScore: 0,
        maxScore,
        unlockedImpressos: [],
        resultShared: false,
      };

      setSession(newSession);
      return code;
    } catch (e) {
      console.error('Erro ao criar sessão:', e);
      throw e;
    }
  }, [user]);

  // Carregar sessão existente
  const loadSession = useCallback(async (sessionCode: string): Promise<AvaliacaoSession | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('avaliacao_sessions')
        .select('*')
        .eq('code', sessionCode)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      const loaded = dbToLocal(data);
      setSession(loaded);
      return loaded;
    } catch (e) {
      console.error('Erro ao carregar sessão:', e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar sessão a partir de dados (quando avaliado entra)
  const createSessionFromData = useCallback(async (
    sessionCode: string,
    data: { checklistId: string; checklistTitle: string; areaCode: string; avaliadorName: string; maxScore: number }
  ): Promise<AvaliacaoSession> => {
    // Primeiro tenta carregar a sessão existente
    const existing = await loadSession(sessionCode);
    if (existing) return existing;

    // Se não existe, cria uma nova (caso raro)
    const code = await createSession(
      data.checklistId,
      data.checklistTitle,
      data.areaCode,
      data.avaliadorName,
      data.maxScore
    );

    return session!;
  }, [loadSession, createSession, session]);

  // Atualizar sessão
  const updateSession = useCallback(async (updates: Partial<AvaliacaoSession>): Promise<void> => {
    if (!session) return;

    const dbUpdates: any = {};
    
    if (updates.status) dbUpdates.status = localStatusToDb(updates.status);
    if (updates.avaliadoName) dbUpdates.avaliado_name = updates.avaliadoName;
    if (updates.totalScore !== undefined) dbUpdates.score = updates.totalScore;
    if (updates.startedAt) dbUpdates.started_at = new Date(updates.startedAt).toISOString();
    if (updates.finishedAt) dbUpdates.completed_at = new Date(updates.finishedAt).toISOString();
    if (updates.scores) {
      dbUpdates.items_evaluated = Object.values(updates.scores);
      dbUpdates.score = calculateTotalScore(updates.scores);
    }

    try {
      const { error } = await supabase
        .from('avaliacao_sessions')
        .update(dbUpdates)
        .eq('code', session.code);

      if (error) throw error;

      setSession(prev => prev ? { ...prev, ...updates } : null);
    } catch (e) {
      console.error('Erro ao atualizar sessão:', e);
    }
  }, [session]);

  // Definir pontuação de um item
  const setScore = useCallback(async (itemId: number, score: number, type: ItemScore['type']): Promise<void> => {
    if (!session) return;

    const newScores = {
      ...session.scores,
      [itemId]: { itemId, score, type }
    };
    const totalScore = calculateTotalScore(newScores);

    try {
      const { error } = await supabase
        .from('avaliacao_sessions')
        .update({
          items_evaluated: Object.values(newScores),
          score: totalScore
        })
        .eq('code', session.code);

      if (error) throw error;

      setSession(prev => prev ? {
        ...prev,
        scores: newScores,
        totalScore
      } : null);
    } catch (e) {
      console.error('Erro ao salvar pontuação:', e);
    }
  }, [session]);

  // Desbloquear impresso
  const unlockImpresso = useCallback(async (impressoId: number): Promise<void> => {
    if (!session || session.unlockedImpressos.includes(impressoId)) return;

    setSession(prev => prev ? {
      ...prev,
      unlockedImpressos: [...prev.unlockedImpressos, impressoId]
    } : null);
  }, [session]);

  // Bloquear impresso
  const lockImpresso = useCallback(async (impressoId: number): Promise<void> => {
    if (!session) return;

    setSession(prev => prev ? {
      ...prev,
      unlockedImpressos: prev.unlockedImpressos.filter(id => id !== impressoId)
    } : null);
  }, [session]);

  // Gerar link da sessão
  const getSessionLink = useCallback((sessionCode: string): string => {
    if (session) {
      return generateSessionLink(sessionCode, {
        checklistId: session.checklistId,
        checklistTitle: session.checklistTitle,
        areaCode: session.areaCode,
        avaliadorName: session.avaliadorName,
        maxScore: session.maxScore,
      });
    }
    return generateSessionLink(sessionCode);
  }, [session]);

  // Gerar link do avaliador
  const getAvaliadorLink = useCallback((sessionCode: string): string => {
    return generateAvaliadorLink(sessionCode);
  }, []);

  // Deletar sessão
  const deleteSession = useCallback(async (sessionCode: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('avaliacao_sessions')
        .delete()
        .eq('code', sessionCode);

      if (error) throw error;

      setSession(null);
    } catch (e) {
      console.error('Erro ao deletar sessão:', e);
    }
  }, []);

  // Subscrever a mudanças em tempo real
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`avaliacao-${session.code}`)
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'avaliacao_sessions',
          filter: `code=eq.${session.code}`
        },
        (payload) => {
          const updated = dbToLocal(payload.new);
          setSession(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.code]);

  return {
    session,
    loading,
    createSession,
    loadSession,
    createSessionFromData,
    updateSession,
    setScore,
    unlockImpresso,
    lockImpresso,
    getSessionLink,
    getAvaliadorLink,
    deleteSession,
  };
}
