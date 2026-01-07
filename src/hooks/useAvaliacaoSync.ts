import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { SyncMessage, SessionState, ResultData } from '@/types/avaliacao';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseAvaliacaoSyncReturn {
  broadcast: (message: SyncMessage) => void;
  broadcastState: (sessionCode: string, state: SessionState) => void;
  broadcastTimerTick: (sessionCode: string, timeRemaining: number) => void;
  broadcastImpressoUnlocked: (sessionCode: string, impressoId: number) => void;
  broadcastImpressoLocked: (sessionCode: string, impressoId: number) => void;
  broadcastSessionStarted: (sessionCode: string) => void;
  broadcastSessionPaused: (sessionCode: string) => void;
  broadcastSessionResumed: (sessionCode: string) => void;
  broadcastSessionFinished: (sessionCode: string) => void;
  broadcastAvaliadoConnected: (sessionCode: string, name: string) => void;
  broadcastResultShared: (sessionCode: string) => void;
  broadcastResultData: (sessionCode: string, resultData: ResultData) => void;
}

interface UseAvaliacaoSyncOptions {
  sessionCode?: string;
  onMessage?: (message: SyncMessage) => void;
  onStateUpdate?: (state: SessionState) => void;
  onTimerTick?: (timeRemaining: number) => void;
  onImpressoUnlocked?: (impressoId: number) => void;
  onImpressoLocked?: (impressoId: number) => void;
  onSessionStarted?: () => void;
  onSessionPaused?: () => void;
  onSessionResumed?: () => void;
  onSessionFinished?: () => void;
  onAvaliadoConnected?: (name: string) => void;
  onResultShared?: () => void;
  onResultData?: (resultData: ResultData) => void;
}

export function useAvaliacaoSync(options: UseAvaliacaoSyncOptions = {}): UseAvaliacaoSyncReturn {
  const {
    sessionCode,
    onMessage,
    onStateUpdate,
    onTimerTick,
    onImpressoUnlocked,
    onImpressoLocked,
    onSessionStarted,
    onSessionPaused,
    onSessionResumed,
    onSessionFinished,
    onAvaliadoConnected,
    onResultShared,
    onResultData,
  } = options;

  const channelRef = useRef<RealtimeChannel | null>(null);
  
  // Refs para callbacks (evitar re-subscriptions)
  const callbacksRef = useRef({
    onMessage,
    onStateUpdate,
    onTimerTick,
    onImpressoUnlocked,
    onImpressoLocked,
    onSessionStarted,
    onSessionPaused,
    onSessionResumed,
    onSessionFinished,
    onAvaliadoConnected,
    onResultShared,
    onResultData,
  });

  useEffect(() => {
    callbacksRef.current = {
      onMessage,
      onStateUpdate,
      onTimerTick,
      onImpressoUnlocked,
      onImpressoLocked,
      onSessionStarted,
      onSessionPaused,
      onSessionResumed,
      onSessionFinished,
      onAvaliadoConnected,
      onResultShared,
      onResultData,
    };
  }, [onMessage, onStateUpdate, onTimerTick, onImpressoUnlocked, onImpressoLocked, onSessionStarted, onSessionPaused, onSessionResumed, onSessionFinished, onAvaliadoConnected, onResultShared, onResultData]);

  // Inicializar canal Supabase Realtime
  useEffect(() => {
    if (!sessionCode) return;

    // Criar canal único para esta sessão
    const channel = supabase.channel(`avaliacao-${sessionCode}`, {
      config: {
        broadcast: { self: false }, // Não receber próprias mensagens
      },
    });

    const handleMessage = (payload: { event: string; payload: SyncMessage }) => {
      const message = payload.payload;
      const callbacks = callbacksRef.current;

      // Callback genérico
      if (callbacks.onMessage) {
        callbacks.onMessage(message);
      }

      // Callbacks específicos por tipo
      switch (message.type) {
        case 'STATE_UPDATE':
          if (callbacks.onStateUpdate) {
            callbacks.onStateUpdate(message.state);
          }
          break;
        case 'TIMER_TICK':
          if (callbacks.onTimerTick) {
            callbacks.onTimerTick(message.timeRemaining);
          }
          break;
        case 'IMPRESSO_UNLOCKED':
          if (callbacks.onImpressoUnlocked) {
            callbacks.onImpressoUnlocked(message.impressoId);
          }
          break;
        case 'IMPRESSO_LOCKED':
          if (callbacks.onImpressoLocked) {
            callbacks.onImpressoLocked(message.impressoId);
          }
          break;
        case 'SESSION_STARTED':
          if (callbacks.onSessionStarted) {
            callbacks.onSessionStarted();
          }
          break;
        case 'SESSION_PAUSED':
          if (callbacks.onSessionPaused) {
            callbacks.onSessionPaused();
          }
          break;
        case 'SESSION_RESUMED':
          if (callbacks.onSessionResumed) {
            callbacks.onSessionResumed();
          }
          break;
        case 'SESSION_FINISHED':
          if (callbacks.onSessionFinished) {
            callbacks.onSessionFinished();
          }
          break;
        case 'AVALIADO_CONNECTED':
          if (callbacks.onAvaliadoConnected) {
            callbacks.onAvaliadoConnected(message.name);
          }
          break;
        case 'RESULT_SHARED':
          if (callbacks.onResultShared) {
            callbacks.onResultShared();
          }
          break;
        case 'RESULT_DATA':
          if (callbacks.onResultData) {
            callbacks.onResultData(message.resultData);
          }
          break;
      }
    };

    channel
      .on('broadcast', { event: 'sync' }, handleMessage)
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Conectado ao canal avaliacao-${sessionCode}`);
        }
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [sessionCode]);

  const broadcast = useCallback((message: SyncMessage) => {
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'sync',
        payload: message,
      });
    }
  }, []);

  const broadcastState = useCallback((sessionCode: string, state: SessionState) => {
    broadcast({ type: 'STATE_UPDATE', sessionCode, state });
  }, [broadcast]);

  const broadcastTimerTick = useCallback((sessionCode: string, timeRemaining: number) => {
    broadcast({ type: 'TIMER_TICK', sessionCode, timeRemaining });
  }, [broadcast]);

  const broadcastImpressoUnlocked = useCallback((sessionCode: string, impressoId: number) => {
    broadcast({ type: 'IMPRESSO_UNLOCKED', sessionCode, impressoId });
  }, [broadcast]);

  const broadcastImpressoLocked = useCallback((sessionCode: string, impressoId: number) => {
    broadcast({ type: 'IMPRESSO_LOCKED', sessionCode, impressoId });
  }, [broadcast]);

  const broadcastSessionStarted = useCallback((sessionCode: string) => {
    broadcast({ type: 'SESSION_STARTED', sessionCode });
  }, [broadcast]);

  const broadcastSessionPaused = useCallback((sessionCode: string) => {
    broadcast({ type: 'SESSION_PAUSED', sessionCode });
  }, [broadcast]);

  const broadcastSessionResumed = useCallback((sessionCode: string) => {
    broadcast({ type: 'SESSION_RESUMED', sessionCode });
  }, [broadcast]);

  const broadcastSessionFinished = useCallback((sessionCode: string) => {
    broadcast({ type: 'SESSION_FINISHED', sessionCode });
  }, [broadcast]);

  const broadcastAvaliadoConnected = useCallback((sessionCode: string, name: string) => {
    broadcast({ type: 'AVALIADO_CONNECTED', sessionCode, name });
  }, [broadcast]);

  const broadcastResultShared = useCallback((sessionCode: string) => {
    broadcast({ type: 'RESULT_SHARED', sessionCode });
  }, [broadcast]);

  const broadcastResultData = useCallback((sessionCode: string, resultData: ResultData) => {
    broadcast({ type: 'RESULT_DATA', sessionCode, resultData });
  }, [broadcast]);

  return {
    broadcast,
    broadcastState,
    broadcastTimerTick,
    broadcastImpressoUnlocked,
    broadcastImpressoLocked,
    broadcastSessionStarted,
    broadcastSessionPaused,
    broadcastSessionResumed,
    broadcastSessionFinished,
    broadcastAvaliadoConnected,
    broadcastResultShared,
    broadcastResultData,
  };
}
