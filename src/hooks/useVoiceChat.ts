import { useState, useCallback, useRef, useEffect } from 'react';

// API Key hardcoded como fallback
const FALLBACK_API_KEY = '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';

// Tipos de voz disponíveis na OpenAI
export type OpenAIVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

// Perfil de voz baseado no paciente
export interface VoiceProfile {
  voice: OpenAIVoice;
  speed: number;
  description: string;
}

// Perfis de voz para diferentes tipos de pacientes
export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  'female_young': { voice: 'nova', speed: 1.0, description: 'Mulher jovem' },
  'female_adult': { voice: 'nova', speed: 1.0, description: 'Mulher adulta' },
  'female_elderly': { voice: 'shimmer', speed: 0.95, description: 'Mulher idosa' },
  'male_young': { voice: 'echo', speed: 1.0, description: 'Homem jovem' },
  'male_adult': { voice: 'onyx', speed: 1.0, description: 'Homem adulto' },
  'male_elderly': { voice: 'onyx', speed: 0.95, description: 'Homem idoso' },
  'neutral': { voice: 'alloy', speed: 1.0, description: 'Voz neutra' },
};

export function getVoiceProfileForPatient(
  gender?: 'male' | 'female',
  age?: number
): VoiceProfile {
  const genderPrefix = gender === 'male' ? 'male' : 'female';
  
  if (age !== undefined) {
    if (age < 30) return VOICE_PROFILES[`${genderPrefix}_young`];
    if (age >= 60) return VOICE_PROFILES[`${genderPrefix}_elderly`];
    return VOICE_PROFILES[`${genderPrefix}_adult`];
  }
  
  return VOICE_PROFILES[`${genderPrefix}_adult`];
}

export interface UseVoiceChatOptions {
  apiKey?: string;
  voice?: OpenAIVoice;
  speed?: number;
  silenceTimeout?: number;
  onTranscript?: (text: string, isFinal: boolean) => void;
  onSilenceDetected?: () => void;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
  onError?: (error: string) => void;
}

export interface UseVoiceChatReturn {
  startConversation: () => Promise<void>;
  stopConversation: () => void;
  isConversationActive: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  isRecording: boolean;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isProcessing: boolean;
  isListening: boolean;
  error: string | null;
  hasPermission: boolean;
  interimTranscript: string;
  finalTranscript: string;
}

function getEffectiveApiKey(apiKey?: string): string {
  return apiKey || import.meta.env.VITE_OPENAI_API_KEY || FALLBACK_API_KEY;
}

export function useVoiceChat({
  apiKey,
  voice = 'nova',
  speed = 1.0,
  silenceTimeout = 1200, // Reduzido para 1.2 segundos (mais rápido)
  onTranscript,
  onSilenceDetected,
  onAudioStart,
  onAudioEnd,
  onError,
}: UseVoiceChatOptions = {}): UseVoiceChatReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');

  // Refs para controle de estado
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const isConversationActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceStartRef = useRef<number>(0);
  
  // Controle de fila de áudio para evitar sobreposição
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const currentAudioIdRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAll();
    };
  }, []);

  const cleanupAll = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.src = '';
      audioElementRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    // Limpar fila de áudio
    audioQueueRef.current.forEach(url => URL.revokeObjectURL(url));
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  // Check permission
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  // Transcrição com Whisper
  const transcribeAudio = useCallback(async (audioBlob: Blob): Promise<string> => {
    const effectiveApiKey = getEffectiveApiKey(apiKey);
    
    if (!effectiveApiKey) {
      throw new Error('API Key não configurada');
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'pt');
    formData.append('response_format', 'json');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${effectiveApiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Erro na transcrição: ${response.status}`);
    }

    const data = await response.json();
    return data.text || '';
  }, [apiKey]);

  // Reproduzir próximo áudio da fila (sequencial, sem sobreposição)
  const playNextAudio = useCallback(async () => {
    // Se já está tocando ou fila vazia, não faz nada
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isPlayingRef.current = true;
    const audioUrl = audioQueueRef.current.shift()!;
    const audioId = Date.now().toString();
    currentAudioIdRef.current = audioId;

    try {
      // Criar novo elemento de áudio
      const audio = new Audio();
      audioElementRef.current = audio;
      
      // Configurar para melhor qualidade
      audio.preload = 'auto';
      audio.volume = 1.0;

      await new Promise<void>((resolve, reject) => {
        const cleanup = () => {
          audio.oncanplaythrough = null;
          audio.onended = null;
          audio.onerror = null;
          audio.onpause = null;
        };

        audio.oncanplaythrough = async () => {
          // Verificar se ainda é o áudio atual
          if (currentAudioIdRef.current !== audioId) {
            cleanup();
            URL.revokeObjectURL(audioUrl);
            resolve();
            return;
          }

          try {
            setIsSpeaking(true);
            isSpeakingRef.current = true;
            onAudioStart?.();
            await audio.play();
          } catch (err) {
            cleanup();
            reject(err);
          }
        };

        audio.onended = () => {
          cleanup();
          URL.revokeObjectURL(audioUrl);
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          isPlayingRef.current = false;
          onAudioEnd?.();
          resolve();
          
          // Próximo áudio mais rápido
          setTimeout(() => {
            playNextAudio();
          }, 100); // Reduzido de 200ms para 100ms
        };

        audio.onerror = () => {
          cleanup();
          URL.revokeObjectURL(audioUrl);
          isPlayingRef.current = false;
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          reject(new Error('Erro ao reproduzir áudio'));
        };

        audio.src = audioUrl;
        audio.load();
      });
    } catch (err) {
      console.error('[TTS] Erro na reprodução:', err);
      isPlayingRef.current = false;
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      onAudioEnd?.();
      
      // Tentar próximo áudio
      setTimeout(() => playNextAudio(), 100);
    }
  }, [onAudioStart, onAudioEnd]);

  // Síntese de voz com OpenAI TTS
  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Limpar expressões entre asteriscos (ações do paciente)
    const cleanText = text.replace(/\*[^*]+\*/g, '').trim();
    if (!cleanText) return;

    // Se já está processando este texto, ignorar
    if (isProcessingRef.current) {
      console.log('[TTS] Já processando, aguardando...');
      return;
    }

    const effectiveApiKey = getEffectiveApiKey(apiKey);
    
    if (!effectiveApiKey || !effectiveApiKey.startsWith('sk-')) {
      console.error('[TTS] API Key inválida');
      onError?.('API Key inválida');
      return;
    }

    console.log('[TTS] Gerando áudio para:', cleanText.substring(0, 40) + '...');
    
    isProcessingRef.current = true;
    setIsProcessing(true);

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveApiKey}`,
        },
        body: JSON.stringify({
          model: 'tts-1-hd',
          input: cleanText,
          voice: voice,
          speed: speed,
          response_format: 'mp3',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Erro TTS: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Adicionar à fila
      audioQueueRef.current.push(audioUrl);
      
      console.log('[TTS] ✅ Áudio adicionado à fila');
      
      setIsProcessing(false);
      isProcessingRef.current = false;
      
      // Iniciar reprodução se não estiver tocando
      if (!isPlayingRef.current) {
        playNextAudio();
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao sintetizar áudio';
      console.error('[TTS] ❌ Erro:', errorMsg);
      setError(errorMsg);
      onError?.(errorMsg);
      setIsProcessing(false);
      isProcessingRef.current = false;
    }
  }, [apiKey, voice, speed, playNextAudio, onError]);

  // Parar toda reprodução
  const stopSpeaking = useCallback(() => {
    currentAudioIdRef.current = null;
    
    // Limpar fila
    audioQueueRef.current.forEach(url => URL.revokeObjectURL(url));
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    
    // Parar áudio atual
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.src = '';
      audioElementRef.current = null;
    }
    
    setIsSpeaking(false);
    isSpeakingRef.current = false;
    onAudioEnd?.();
  }, [onAudioEnd]);


  // Verificar nível de áudio para detecção de silêncio
  const checkAudioLevel = useCallback(() => {
    if (!analyserRef.current || !isConversationActiveRef.current || isSpeakingRef.current) {
      return;
    }
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const silenceThreshold = 12; // Threshold mais sensível
    
    if (average < silenceThreshold) {
      if (silenceStartRef.current === 0) {
        silenceStartRef.current = Date.now();
      } else if (Date.now() - silenceStartRef.current > silenceTimeout) {
        if (audioChunksRef.current.length > 0 && !isProcessingRef.current) {
          processRecording();
        }
      }
    } else {
      silenceStartRef.current = 0;
      setInterimTranscript('🎤 Ouvindo...');
    }
  }, [silenceTimeout]);

  // Processar gravação e transcrever
  const processRecording = useCallback(async () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
      return;
    }

    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    return new Promise<void>((resolve) => {
      const mediaRecorder = mediaRecorderRef.current!;

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];

        if (audioBlob.size < 2000) {
          isProcessingRef.current = false;
          if (isConversationActiveRef.current && !isSpeakingRef.current) {
            startRecordingInternal();
          }
          resolve();
          return;
        }

        setIsListening(false);
        setInterimTranscript('📝 Transcrevendo...');
        setIsProcessing(true);

        try {
          const transcript = await transcribeAudio(audioBlob);
          
          if (transcript && transcript.trim()) {
            const cleanTranscript = transcript.trim();
            
            // Filtrar transcrições inválidas
            const invalidPhrases = [
              'legendas pela comunidade',
              'amara.org',
              'subscribed',
              'subscribe',
              'obrigado por assistir',
              'thanks for watching'
            ];
            
            const isInvalid = invalidPhrases.some(phrase => 
              cleanTranscript.toLowerCase().includes(phrase)
            );
            
            if (!isInvalid && cleanTranscript.length > 2) {
              setFinalTranscript(cleanTranscript);
              setInterimTranscript('');
              onTranscript?.(cleanTranscript, true);
              onSilenceDetected?.();
            }
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Erro na transcrição';
          console.error('[Whisper] Erro:', errorMsg);
          setError(errorMsg);
          onError?.(errorMsg);
        } finally {
          setIsProcessing(false);
          isProcessingRef.current = false;
          setInterimTranscript('');
          
          // Reiniciar gravação rapidamente após processar
          if (isConversationActiveRef.current && !isSpeakingRef.current && !isPlayingRef.current) {
            setTimeout(() => {
              if (isConversationActiveRef.current && !isSpeakingRef.current && !isPlayingRef.current) {
                startRecordingInternal();
              }
            }, 150); // Reduzido de 500ms para 150ms
          }
        }
        resolve();
      };

      mediaRecorder.stop();
    });
  }, [transcribeAudio, onTranscript, onSilenceDetected, onError]);

  // Iniciar gravação interna
  const startRecordingInternal = useCallback(async () => {
    // Não iniciar se estiver falando ou processando
    if (isSpeakingRef.current || isProcessingRef.current || isPlayingRef.current) {
      return;
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      
      streamRef.current = stream;
      setHasPermission(true);

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
      }
      
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512;
      source.connect(analyserRef.current);

      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      audioChunksRef.current = [];
      silenceStartRef.current = 0;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(200);
      setIsListening(true);
      setInterimTranscript('🎤 Ouvindo...');

      const checkLoop = () => {
        if (isConversationActiveRef.current && 
            mediaRecorderRef.current?.state === 'recording' &&
            !isSpeakingRef.current &&
            !isPlayingRef.current) {
          checkAudioLevel();
          silenceTimerRef.current = setTimeout(checkLoop, 80); // Verificação mais frequente (80ms)
        }
      };
      checkLoop();

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao acessar microfone';
      setError(errorMsg);
      onError?.(errorMsg);
      setHasPermission(false);
    }
  }, [checkAudioLevel, onError]);

  // Iniciar modo conversa
  const startConversation = useCallback(async () => {
    setError(null);
    setInterimTranscript('');
    setFinalTranscript('');

    const effectiveApiKey = getEffectiveApiKey(apiKey);
    
    if (!effectiveApiKey) {
      setError('API Key necessária');
      onError?.('Configure a API Key da OpenAI.');
      return;
    }

    isConversationActiveRef.current = true;
    setIsConversationActive(true);
    
    await startRecordingInternal();
  }, [apiKey, startRecordingInternal, onError]);

  // Parar modo conversa
  const stopConversation = useCallback(() => {
    isConversationActiveRef.current = false;
    setIsConversationActive(false);
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  // Gravação manual
  const startRecording = useCallback(async () => {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      
      streamRef.current = stream;
      setHasPermission(true);

      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(200);
      setIsRecording(true);
      setInterimTranscript('🎤 Gravando...');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao acessar microfone';
      setError(errorMsg);
      onError?.(errorMsg);
      setHasPermission(false);
    }
  }, [onError]);

  // Parar gravação manual
  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
      setIsRecording(false);
      return null;
    }

    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current!;

      mediaRecorder.onstop = async () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];

        if (audioBlob.size < 2000) {
          setIsRecording(false);
          setInterimTranscript('');
          resolve(null);
          return;
        }

        setIsProcessing(true);
        setInterimTranscript('📝 Transcrevendo...');
        
        try {
          const transcript = await transcribeAudio(audioBlob);
          setInterimTranscript('');
          
          if (transcript && transcript.trim()) {
            onTranscript?.(transcript, true);
            resolve(transcript);
          } else {
            resolve(null);
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Erro na transcrição';
          setError(errorMsg);
          onError?.(errorMsg);
          resolve(null);
        } finally {
          setIsProcessing(false);
          setIsRecording(false);
          setInterimTranscript('');
        }
      };

      mediaRecorder.stop();
    });
  }, [transcribeAudio, onTranscript, onError]);

  return {
    startConversation,
    stopConversation,
    isConversationActive,
    startRecording,
    stopRecording,
    isRecording,
    speak,
    stopSpeaking,
    isSpeaking,
    isProcessing,
    isListening,
    error,
    hasPermission,
    interimTranscript,
    finalTranscript,
  };
}
