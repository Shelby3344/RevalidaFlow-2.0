import { useState, useCallback, useRef, useEffect } from 'react';

export type OpenAIVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

export interface VoiceProfile {
  voice: OpenAIVoice;
  speed: number;
  description: string;
}

export const VOICE_PROFILES: Record<string, VoiceProfile> = {
  'female_young': { voice: 'nova', speed: 1.0, description: 'Mulher jovem' },
  'female_adult': { voice: 'nova', speed: 1.0, description: 'Mulher adulta' },
  'female_elderly': { voice: 'shimmer', speed: 0.95, description: 'Mulher idosa' },
  'male_young': { voice: 'echo', speed: 1.0, description: 'Homem jovem' },
  'male_adult': { voice: 'onyx', speed: 1.0, description: 'Homem adulto' },
  'male_elderly': { voice: 'onyx', speed: 0.95, description: 'Homem idoso' },
};

export function getVoiceProfileForPatient(gender?: 'male' | 'female', age?: number): VoiceProfile {
  const g = gender === 'male' ? 'male' : 'female';
  if (age !== undefined) {
    if (age < 30) return VOICE_PROFILES[g + '_young'];
    if (age >= 60) return VOICE_PROFILES[g + '_elderly'];
  }
  return VOICE_PROFILES[g + '_adult'];
}

function cleanTextForSpeech(text: string): string {
  return text.replace(/\*[^*]+\*/g, '').replace(/\[[^\]]+\]/g, '').replace(/\s+/g, ' ').trim();
}

export interface UseVoiceChatOptions {
  apiKey?: string;
  voice?: OpenAIVoice;
  speed?: number;
  onTranscript?: (text: string, isFinal: boolean) => void;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
  onError?: (error: string) => void;
}

export interface UseVoiceChatReturn {
  startConversation: () => Promise<void>;
  stopConversation: () => void;
  isConversationActive: boolean;
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isProcessing: boolean;
  isListening: boolean;
  error: string | null;
  hasPermission: boolean;
  interimTranscript: string;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  isRecording: boolean;
  finalTranscript: string;
}

export function useVoiceChat({
  voice = 'nova',
  onTranscript,
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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);

  const stopAllMedia = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') { mediaRecorderRef.current.stop(); }
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => { setHasPermission(true); stream.getTracks().forEach(t => t.stop()); })
      .catch(() => setHasPermission(false));
    return () => { stopAllMedia(); };
  }, [stopAllMedia]);

  const transcribeAudio = useCallback(async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');
    const response = await fetch('/api/transcribe', { method: 'POST', body: formData });
    if (!response.ok) throw new Error('Erro na transcricao');
    const data = await response.json();
    return data.text || '';
  }, []);

  const speak = useCallback(async (text: string) => {
    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setIsProcessing(true);
    isSpeakingRef.current = true;
    try {
      console.log('[TTS] Gerando audio para:', cleanText.substring(0, 50) + '...');
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voice }),
      });
      console.log('[TTS] Response status:', response.status);
      if (!response.ok) { const errorText = await response.text(); console.error('[TTS] Erro:', errorText); throw new Error('Erro TTS: ' + response.status); }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onplay = () => { setIsSpeaking(true); setIsProcessing(false); onAudioStart?.(); };
      audio.onended = () => { setIsSpeaking(false); isSpeakingRef.current = false; URL.revokeObjectURL(audioUrl); onAudioEnd?.(); };
      audio.onerror = () => { setIsSpeaking(false); isSpeakingRef.current = false; setIsProcessing(false); };
      await audio.play();
    } catch (err) {
      console.error('[TTS] Erro:', err);
      setIsProcessing(false);
      isSpeakingRef.current = false;
      onError?.('Erro ao reproduzir audio');
    }
  }, [voice, onAudioStart, onAudioEnd, onError]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setIsSpeaking(false);
    isSpeakingRef.current = false;
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorderRef.current = recorder;
      recorder.start(100);
      setIsRecording(true);
      setIsListening(true);
      setInterimTranscript('Gravando...');
    } catch (err) {
      onError?.('Erro ao acessar microfone');
    }
  }, [onError]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        setIsRecording(false); setIsListening(false); setInterimTranscript(''); resolve(null); return;
      }
      mediaRecorderRef.current.onstop = async () => {
        if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];
        if (audioBlob.size < 1000) { setIsRecording(false); setIsListening(false); setInterimTranscript(''); resolve(null); return; }
        setInterimTranscript('Transcrevendo...');
        setIsProcessing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          setIsRecording(false); setIsListening(false); setIsProcessing(false); setInterimTranscript('');
          if (text && text.trim().length > 2) { setFinalTranscript(text); onTranscript?.(text, true); resolve(text); }
          else { resolve(null); }
        } catch (err) {
          setIsRecording(false); setIsListening(false); setIsProcessing(false); setInterimTranscript('');
          onError?.('Erro na transcricao'); resolve(null);
        }
      };
      mediaRecorderRef.current.stop();
    });
  }, [transcribeAudio, onTranscript, onError]);

  const startConversation = useCallback(async () => {
    setError(null); isActiveRef.current = true; setIsConversationActive(true); await startRecording();
  }, [startRecording]);

  const stopConversation = useCallback(() => {
    isActiveRef.current = false; setIsConversationActive(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') { mediaRecorderRef.current.stop(); }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setIsListening(false); setIsRecording(false); setInterimTranscript('');
  }, []);

  return {
    startConversation, stopConversation, isConversationActive, speak, stopSpeaking, isSpeaking,
    isProcessing, isListening, error, hasPermission, interimTranscript, startRecording, stopRecording, isRecording, finalTranscript,
  };
}

