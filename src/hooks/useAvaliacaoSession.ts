import { useState, useCallback } from 'react';
import { AvaliacaoSession, ItemScore, SessionStatus } from '@/types/avaliacao';
import {
  generateSessionCode,
  generateSessionLink,
  generateAvaliadorLink,
  calculateTotalScore,
  STORAGE_KEY,
  DEFAULT_DURATION,
} from '@/lib/avaliacao-utils';

interface UseAvaliacaoSessionReturn {
  session: AvaliacaoSession | null;
  createSession: (checklistId: string, checklistTitle: string, areaCode: string, avaliadorName: string, maxScore: number) => string;
  loadSession: (sessionCode: string) => AvaliacaoSession | null;
  updateSession: (updates: Partial<AvaliacaoSession>) => void;
  setScore: (itemId: number, score: number, type: ItemScore['type']) => void;
  unlockImpresso: (impressoId: number) => void;
  lockImpresso: (impressoId: number) => void;
  getSessionLink: (sessionCode: string) => string;
  getAvaliadorLink: (sessionCode: string) => string;
  deleteSession: (sessionCode: string) => void;
}

// Funções auxiliares para localStorage
function getSessions(): Record<string, AvaliacaoSession> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveSessions(sessions: Record<string, AvaliacaoSession>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function useAvaliacaoSession(): UseAvaliacaoSessionReturn {
  const [session, setSession] = useState<AvaliacaoSession | null>(null);

  const createSession = useCallback((
    checklistId: string,
    checklistTitle: string,
    areaCode: string,
    avaliadorName: string,
    maxScore: number
  ): string => {
    const code = generateSessionCode();
    
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

    const sessions = getSessions();
    sessions[code] = newSession;
    saveSessions(sessions);
    
    setSession(newSession);
    return code;
  }, []);

  const loadSession = useCallback((sessionCode: string): AvaliacaoSession | null => {
    const sessions = getSessions();
    const loaded = sessions[sessionCode] || null;
    setSession(loaded);
    return loaded;
  }, []);

  const updateSession = useCallback((updates: Partial<AvaliacaoSession>): void => {
    setSession(prev => {
      if (!prev) return null;
      
      const updated = { ...prev, ...updates };
      
      // Salvar no localStorage
      const sessions = getSessions();
      sessions[prev.code] = updated;
      saveSessions(sessions);
      
      return updated;
    });
  }, []);

  const setScore = useCallback((itemId: number, score: number, type: ItemScore['type']): void => {
    setSession(prev => {
      if (!prev) return null;
      
      const newScores = {
        ...prev.scores,
        [itemId]: { itemId, score, type }
      };
      
      const totalScore = calculateTotalScore(newScores);
      
      const updated = {
        ...prev,
        scores: newScores,
        totalScore
      };
      
      // Salvar no localStorage
      const sessions = getSessions();
      sessions[prev.code] = updated;
      saveSessions(sessions);
      
      return updated;
    });
  }, []);

  const unlockImpresso = useCallback((impressoId: number): void => {
    setSession(prev => {
      if (!prev) return null;
      if (prev.unlockedImpressos.includes(impressoId)) return prev;
      
      const updated = {
        ...prev,
        unlockedImpressos: [...prev.unlockedImpressos, impressoId]
      };
      
      const sessions = getSessions();
      sessions[prev.code] = updated;
      saveSessions(sessions);
      
      return updated;
    });
  }, []);

  const lockImpresso = useCallback((impressoId: number): void => {
    setSession(prev => {
      if (!prev) return null;
      
      const updated = {
        ...prev,
        unlockedImpressos: prev.unlockedImpressos.filter(id => id !== impressoId)
      };
      
      const sessions = getSessions();
      sessions[prev.code] = updated;
      saveSessions(sessions);
      
      return updated;
    });
  }, []);

  const getSessionLink = useCallback((sessionCode: string): string => {
    return generateSessionLink(sessionCode);
  }, []);

  const getAvaliadorLink = useCallback((sessionCode: string): string => {
    return generateAvaliadorLink(sessionCode);
  }, []);

  const deleteSession = useCallback((sessionCode: string): void => {
    const sessions = getSessions();
    delete sessions[sessionCode];
    saveSessions(sessions);
    setSession(null);
  }, []);

  return {
    session,
    createSession,
    loadSession,
    updateSession,
    setScore,
    unlockImpresso,
    lockImpresso,
    getSessionLink,
    getAvaliadorLink,
    deleteSession,
  };
}
