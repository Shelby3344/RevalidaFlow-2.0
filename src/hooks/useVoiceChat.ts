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
    if (age < 30) return VOICE_PROFILES[`_young`];
    if (age >= 60) return VOICE_PROFILES[`_elderly`];
  }
  return VOICE_PROFILES[`_adult`];
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
