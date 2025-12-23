import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseVoiceChatOptions {
  apiKey?: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  silenceTimeout?: number;
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
  
  // Manual recording (push-to-talk)
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
  silenceTimeout = 2000,
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
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isConversationActiveRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceStartRef = useRef<number>(0);

  // Check permission on mount
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
    
    synthRef.current = window.speechSynthesis;
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Transcribe audio using OpenAI Whisper
  const transcribeWithWhisper = useCallback(async (audioBlob: Blob): Promise<string> => {
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

  // Detect silence using audio levels
  const checkAudioLevel = useCallback(() => {
    if (!analyserRef.current || !isConversationActiveRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    
    // Threshold for silence (adjust as needed)
    const silenceThreshold = 10;
    
    if (average < silenceThreshold) {
      // Silence detected
      if (silenceStartRef.current === 0) {
        silenceStartRef.current = Date.now();
      } else if (Date.now() - silenceStartRef.current > silenceTimeout) {
        // Silence for too long - stop and transcribe
        if (audioChunksRef.current.length > 0) {
          stopConversationAndTranscribe();
        }
      }
    } else {
      // Sound detected - reset silence timer
      silenceStartRef.current = 0;
      setInterimTranscript('Ouvindo...');
    }
  }, [silenceTimeout]);

  // Stop conversation and transcribe
  const stopConversationAndTranscribe = useCallback(async () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
      return;
    }

    return new Promise<void>((resolve) => {
      const mediaRecorder = mediaRecorderRef.current!;

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];

        if (audioBlob.size < 1000) {
          // Too short, restart listening
          if (isConversationActiveRef.current && !isSpeakingRef.current) {
            startRecordingInternal();
          }
          resolve();
          return;
        }

        setIsListening(false);
        setInterimTranscript('Transcrevendo...');
        setIsProcessing(true);

        try {
          if (apiKey) {
            const transcript = await transcribeWithWhisper(audioBlob);
            if (transcript.trim()) {
              setFinalTranscript(transcript);
              setInterimTranscript('');
              onTranscript?.(transcript, true);
              onSilenceDetected?.();
            }
          }
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Erro na transcrição';
          setError(errorMsg);
          onError?.(errorMsg);
        } finally {
          setIsProcessing(false);
          setInterimTranscript('');
          
          // Restart listening after transcription (if not speaking)
          if (isConversationActiveRef.current && !isSpeakingRef.current) {
            setTimeout(() => {
              if (isConversationActiveRef.current && !isSpeakingRef.current) {
                startRecordingInternal();
              }
            }, 500);
          }
        }
        resolve();
      };

      mediaRecorder.stop();
    });
  }, [apiKey, transcribeWithWhisper, onTranscript, onSilenceDetected, onError]);

  // Internal start recording
  const startRecordingInternal = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      
      streamRef.current = stream;
      setHasPermission(true);

      // Setup audio analysis for silence detection
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
          ? 'audio/webm;codecs=opus' 
          : 'audio/webm'
      });

      audioChunksRef.current = [];
      silenceStartRef.current = 0;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100);
      setIsListening(true);
      setInterimTranscript('Ouvindo...');

      // Start silence detection loop
      const checkLoop = () => {
        if (isConversationActiveRef.current && mediaRecorderRef.current?.state === 'recording') {
          checkAudioLevel();
          silenceTimerRef.current = setTimeout(checkLoop, 100);
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

  // Start conversation mode
  const startConversation = useCallback(async () => {
    setError(null);
    setInterimTranscript('');
    setFinalTranscript('');

    if (!apiKey) {
      setError('API Key necessária para transcrição');
      onError?.('Configure a API Key da OpenAI nas configurações para usar o reconhecimento de voz.');
      return;
    }

    isConversationActiveRef.current = true;
    setIsConversationActive(true);
    
    await startRecordingInternal();
  }, [apiKey, startRecordingInternal, onError]);

  // Stop conversation mode
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
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  // Manual recording (push-to-talk)
  const startRecording = useCallback(async () => {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
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
      setInterimTranscript('Gravando...');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao acessar microfone';
      setError(errorMsg);
      onError?.(errorMsg);
      setHasPermission(false);
    }
  }, [onError]);

  // Stop manual recording
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
          setInterimTranscript('');
          resolve(null);
          return;
        }

        if (apiKey) {
          setIsProcessing(true);
          setInterimTranscript('Transcrevendo...');
          try {
            const transcript = await transcribeWithWhisper(audioBlob);
            setInterimTranscript('');
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
            setInterimTranscript('');
          }
        } else {
          setIsRecording(false);
          setInterimTranscript('');
          resolve(null);
        }
      };

      mediaRecorder.stop();
    });
  }, [apiKey, transcribeWithWhisper, onTranscript, onError]);

  // Speak text using TTS
  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const cleanText = text.replace(/\*[^*]+\*/g, '').trim();
    if (!cleanText) return;

    // Pause recording while speaking
    if (isConversationActiveRef.current) {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setIsListening(false);
    }

    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    synthRef.current?.cancel();

    isSpeakingRef.current = true;

    const resumeListening = () => {
      isSpeakingRef.current = false;
      if (isConversationActiveRef.current) {
        setTimeout(() => {
          if (isConversationActiveRef.current && !isSpeakingRef.current) {
            startRecordingInternal();
          }
        }, 500);
      }
    };

    // Use OpenAI TTS if API key available
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
        isSpeakingRef.current = false;
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
  }, [apiKey, voice, startRecordingInternal, onAudioStart, onAudioEnd, onError]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    synthRef.current?.cancel();
    setIsSpeaking(false);
    isSpeakingRef.current = false;
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
