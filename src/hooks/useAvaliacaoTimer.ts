import { useState, useCallback, useRef, useEffect } from 'react';
import { DEFAULT_DURATION } from '@/lib/avaliacao-utils';

interface UseAvaliacaoTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
  setTime: (seconds: number) => void;
}

interface UseAvaliacaoTimerOptions {
  initialTime?: number;
  onTick?: (timeRemaining: number) => void;
  onFinish?: () => void;
}

export function useAvaliacaoTimer(options: UseAvaliacaoTimerOptions = {}): UseAvaliacaoTimerReturn {
  const { 
    initialTime = DEFAULT_DURATION, 
    onTick, 
    onFinish 
  } = options;

  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTickRef = useRef(onTick);
  const onFinishRef = useRef(onFinish);

  // Atualizar refs quando callbacks mudam
  useEffect(() => {
    onTickRef.current = onTick;
    onFinishRef.current = onFinish;
  }, [onTick, onFinish]);

  // Limpar intervalo ao desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (isRunning || isFinished) return;
    
    setIsRunning(true);
    setIsPaused(false);
    
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Notificar tick
        if (onTickRef.current) {
          onTickRef.current(newTime);
        }
        
        // Verificar se terminou
        if (newTime <= 0) {
          clearTimer();
          setIsRunning(false);
          setIsFinished(true);
          if (onFinishRef.current) {
            onFinishRef.current();
          }
          return 0;
        }
        
        return newTime;
      });
    }, 1000);
  }, [isRunning, isFinished, clearTimer]);

  const pause = useCallback(() => {
    if (!isRunning || isPaused) return;
    
    clearTimer();
    setIsPaused(true);
    setIsRunning(false);
  }, [isRunning, isPaused, clearTimer]);

  const resume = useCallback(() => {
    if (!isPaused || isFinished) return;
    
    setIsPaused(false);
    setIsRunning(true);
    
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        if (onTickRef.current) {
          onTickRef.current(newTime);
        }
        
        if (newTime <= 0) {
          clearTimer();
          setIsRunning(false);
          setIsFinished(true);
          if (onFinishRef.current) {
            onFinishRef.current();
          }
          return 0;
        }
        
        return newTime;
      });
    }, 1000);
  }, [isPaused, isFinished, clearTimer]);

  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(true);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setTimeRemaining(initialTime);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
  }, [clearTimer, initialTime]);

  const setTime = useCallback((seconds: number) => {
    setTimeRemaining(seconds);
  }, []);

  return {
    timeRemaining,
    isRunning,
    isPaused,
    isFinished,
    start,
    pause,
    resume,
    stop,
    reset,
    setTime,
  };
}
