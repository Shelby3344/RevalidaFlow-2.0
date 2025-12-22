import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseVoiceChatOptions {
  apiKey?: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  silenceTimeout?: number; // ms de silêncio para enviar automaticamente
  onTranscript?: (text: string, isFinal: boolean) => void;
  onSilenceDetected?: () => void;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
  onError?: (error: string) => void;
}

export interface UseVoiceChatReturn {
  // Conversation mode (auto VAD)
  startConversation: () => Promise<void>;
  stopConversation: () => void;
  isConversationActive: boolean;
  
  // Manual recording
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  isRecording: boolean;
  
  // Playback
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  
  // State
  isProcessing: boolean;
  isListening: boolean;
  error: string | null;
  hasPermission: boolean;
  
  // Transcript
  interimTranscript: string;
  finalTranscript: string;
}

export function useVoiceChat({
  apiKey,
  voice = 'nova',
  silenceTimeout = 1500, // 1.5 segundos de silêncio para enviar
  onTranscript,
  onSilenceDetected,
  onAudioStart,
  onAudioEnd,
  onError,
}: UseVoiceChatOptions = {}): UseVoiceChatReturn {
  // State
  const [isRecording, setIsRecording] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTimeRef = useRef<number>(0);
  const accumulatedTranscriptRef = useRef<string>('');

  // Clear silence timer
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  // Reset silence timer (called when speech is detected)
  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    lastSpeechTimeRef.current = Date.now();
    
    silenceTimerRef.current = setTimeout(() => {
      // Silêncio detectado - enviar transcrição acumulada
      const transcript = accumulatedTranscriptRef.current.trim();
      if (transcript) {
        setFinalTranscript(transcript);
        onTranscript?.(transcript, true);
        onSilenceDetected?.();
        accumulatedTranscriptRef.current = '';
        setInterimTranscript('');
      }
    }, silenceTimeout);
  }, [silenceTimeout, clearSilenceTimer, onTranscript, onSilenceDetected]);

  // Check permission on mount
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  // Initialize Web Speech API for real-time recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'pt-BR';
        // @ts-expect-error - maxAlternatives exists but not in types
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }

          // Atualizar transcrição
          if (final) {
            accumulatedTranscriptRef.current += ' ' + final;
            setInterimTranscript('');
            onTranscript?.(final, false);
          }
          
          if (interim) {
            setInterimTranscript(interim);
          }

          // Reset timer de silêncio quando detecta fala
          if (final || interim) {
            resetSilenceTimer();
          }
        };

        // @ts-expect-error - onspeechstart exists but not in types
        recognition.onspeechstart = () => {
          setIsListening(true);
          resetSilenceTimer();
        };

        // @ts-expect-error - onspeechend exists but not in types
        recognition.onspeechend = () => {
          // Não parar imediatamente, deixar o timer de silêncio decidir
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            setError('Microfone não permitido');
            onError?.('Microfone não permitido');
            setIsConversationActive(false);
          } else if (event.error === 'no-speech') {
            // Ignorar erro de "no speech" - é normal
          } else if (event.error !== 'aborted') {
            // Tentar reiniciar se não foi abortado manualmente
            if (isConversationActive) {
              try {
                recognition.start();
              } catch {
                // Ignorar erro se já estiver rodando
              }
            }
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          // Reiniciar automaticamente se conversa ainda está ativa
          if (isConversationActive && !isSpeaking) {
            try {
              recognition.start();
              setIsListening(true);
            } catch {
              // Ignorar erro se já estiver rodando
            }
          }
        };

        recognitionRef.current = recognition;
      }

      synthRef.current = window.speechSynthesis;
    }

    return () => {
      clearSilenceTimer();
      recognitionRef.current?.abort();
      synthRef.current?.cancel();
    };
  }, [isConversationActive, isSpeaking, resetSilenceTimer, clearSilenceTimer, onTranscript, onError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearSilenceTimer]);

  // Start conversation mode (continuous listening with auto-send)
  const startConversation = useCallback(async () => {
    setError(null);
    accumulatedTranscriptRef.current = '';
    setInterimTranscript('');
    setFinalTranscript('');

    if (!recognitionRef.current) {
      setError('Reconhecimento de voz não suportado');
      onError?.('Reconhecimento de voz não suportado');
      return;
    }

    try {
      // Verificar permissão do microfone
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);

      recognitionRef.current.start();
      setIsConversationActive(true);
      setIsListening(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao acessar microfone';
      setError(errorMsg);
      onError?.(errorMsg);
      setHasPermission(false);
    }
  }, [onError]);

  // Stop conversation mode
  const stopConversation = useCallback(() => {
    clearSilenceTimer();
    recognitionRef.current?.stop();
    setIsConversationActive(false);
    setIsListening(false);
    
    // Enviar qualquer transcrição pendente
    const transcript = accumulatedTranscriptRef.current.trim();
    if (transcript) {
      setFinalTranscript(transcript);
      onTranscript?.(transcript, true);
    }
    accumulatedTranscriptRef.current = '';
    setInterimTranscript('');
  }, [clearSilenceTimer, onTranscript]);

  // Transcribe audio using OpenAI Whisper (for manual recording)
  const transcribeAudio = useCallback(async (audioBlob: Blob): Promise<string> => {
    if (!apiKey) {
      throw new Error('API Key não configurada');
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'pt');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Erro ${response.status}`);
    }

    const data = await response.json();
    return data.text;
  }, [apiKey]);

  // Start manual recording (for Whisper)
  const startRecording = useCallback(async () => {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });
      
      streamRef.current = stream;
      setHasPermission(true);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
          ? 'audio/webm;codecs=opus' 
          : 'audio/webm'
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao acessar microfone';
      setError(errorMsg);
      onError?.(errorMsg);
      setHasPermission(false);
    }
  }, [onError]);

  // Stop manual recording and get transcript
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

        if (audioBlob.size < 1000) {
          setIsRecording(false);
          resolve(null);
          return;
        }

        if (apiKey) {
          setIsProcessing(true);
          try {
            const transcript = await transcribeAudio(audioBlob);
            onTranscript?.(transcript, true);
            resolve(transcript);
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Erro na transcrição';
            setError(errorMsg);
            onError?.(errorMsg);
            resolve(null);
          } finally {
            setIsProcessing(false);
            setIsRecording(false);
          }
        } else {
          setIsRecording(false);
          resolve(null);
        }
      };

      mediaRecorder.stop();
    });
  }, [apiKey, transcribeAudio, onTranscript, onError]);

  // Speak text using TTS
  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const cleanText = text.replace(/\*[^*]+\*/g, '').trim();
    if (!cleanText) return;

    // Pausar reconhecimento enquanto fala (evitar feedback)
    if (isConversationActive && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    synthRef.current?.cancel();

    const resumeListening = () => {
      // Retomar reconhecimento após falar
      if (isConversationActive && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
            setIsListening(true);
          } catch {
            // Ignorar erro se já estiver rodando
          }
        }, 300);
      }
    };

    // If using OpenAI TTS (with API key)
    if (apiKey) {
      setIsProcessing(true);
      onAudioStart?.();

      try {
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
            speed: 1.0,
            response_format: 'mp3',
          }),
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        audioRef.current = new Audio(audioUrl);
        
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          onAudioEnd?.();
          URL.revokeObjectURL(audioUrl);
          resumeListening();
        };

        audioRef.current.onerror = () => {
          setIsSpeaking(false);
          onAudioEnd?.();
          URL.revokeObjectURL(audioUrl);
          resumeListening();
        };

        setIsProcessing(false);
        setIsSpeaking(true);
        await audioRef.current.play();
      } catch (err) {
        setIsProcessing(false);
        const errorMsg = err instanceof Error ? err.message : 'Erro ao sintetizar áudio';
        setError(errorMsg);
        onError?.(errorMsg);
        onAudioEnd?.();
        resumeListening();
      }
    } else {
      // Fallback to Web Speech API
      if (!synthRef.current) {
        resumeListening();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const voices = synthRef.current.getVoices();
      const ptVoice = voices.find(v => v.lang.startsWith('pt'));
      if (ptVoice) utterance.voice = ptVoice;

      utterance.onstart = () => {
        setIsSpeaking(true);
        onAudioStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onAudioEnd?.();
        resumeListening();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        onAudioEnd?.();
        resumeListening();
      };

      synthRef.current.speak(utterance);
    }
  }, [apiKey, voice, isConversationActive, onAudioStart, onAudioEnd, onError]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    synthRef.current?.cancel();
    setIsSpeaking(false);
    onAudioEnd?.();
  }, [onAudioEnd]);

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
