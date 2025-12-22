import { useState, useCallback, useRef } from 'react';

interface UseOpenAIAudioOptions {
  apiKey?: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  speed?: number;
}

interface UseOpenAIAudioReturn {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useOpenAIAudio({
  apiKey,
  voice = 'nova', // Voz feminina natural
  speed = 1.0,
}: UseOpenAIAudioOptions = {}): UseOpenAIAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!apiKey) {
      setError('API Key não configurada');
      return;
    }

    // Limpar texto de expressões entre asteriscos
    const cleanText = text.replace(/\*[^*]+\*/g, '').trim();
    if (!cleanText) return;

    // Parar áudio anterior
    stop();

    setIsLoading(true);
    setError(null);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: cleanText,
          voice: voice,
          speed: speed,
          response_format: 'mp3',
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Erro ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audioRef.current.onerror = () => {
        setError('Erro ao reproduzir áudio');
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      setIsLoading(false);
      setIsPlaying(true);
      await audioRef.current.play();
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Cancelado pelo usuário
        return;
      }
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setIsLoading(false);
    }
  }, [apiKey, voice, speed, stop]);

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
    error,
  };
}
