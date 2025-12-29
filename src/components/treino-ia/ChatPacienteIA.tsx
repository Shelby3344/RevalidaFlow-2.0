import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mic,
  MicOff,
  MessageSquare,
  Volume2,
  VolumeX,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MessageIA } from "@/types/treino-ia";
import { useVoiceChat, getVoiceProfileForPatient } from "@/hooks/useVoiceChat";

interface ChatPacienteIAProps {
  pacienteName: string;
  pacienteGender?: 'male' | 'female';
  pacienteAge?: number;
  messages: MessageIA[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  isConnected: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  disabled?: boolean;
  apiKey?: string;
}

export function ChatPacienteIA({
  pacienteName,
  pacienteGender,
  pacienteAge,
  messages,
  onSendMessage,
  isLoading,
  isConnected,
  onConnect,
  onDisconnect,
  disabled = false,
  apiKey,
}: ChatPacienteIAProps) {
  const [inputValue, setInputValue] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastSpokenMessageRef = useRef<string | null>(null);

  // Perfil de voz calculado uma única vez (consistente durante toda a sessão)
  const voiceProfile = useMemo(() => {
    const profile = getVoiceProfileForPatient(pacienteGender, pacienteAge);
    console.log('[ChatPacienteIA] Perfil de voz fixado:', profile.description, '- Voz:', profile.voice);
    return profile;
  }, [pacienteGender, pacienteAge]);

  // Emoji do paciente baseado no gênero e idade
  const pacienteEmoji = useMemo(() => {
    if (pacienteGender === 'female') {
      if (pacienteAge && pacienteAge >= 60) return '👵'; // Mulher idosa
      if (pacienteAge && pacienteAge < 18) return '👧'; // Menina
      return '👩'; // Mulher adulta
    } else {
      if (pacienteAge && pacienteAge >= 60) return '👴'; // Homem idoso
      if (pacienteAge && pacienteAge < 18) return '👦'; // Menino
      return '👨'; // Homem adulto
    }
  }, [pacienteGender, pacienteAge]);

  const {
    startRecording,
    stopRecording,
    isRecording,
    speak,
    stopSpeaking,
    isSpeaking,
    isProcessing,
    isListening,
    interimTranscript,
  } = useVoiceChat({
    apiKey,
    voice: voiceProfile.voice,
    speed: voiceProfile.speed,
    onTranscript: (text, isFinal) => {
      if (isFinal && text.trim()) {
        setPendingMessage(text.trim());
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // Enviar mensagem pendente quando não estiver ocupado
  useEffect(() => {
    if (pendingMessage && !isLoading && !disabled && !isSpeaking && !isProcessing) {
      const msg = pendingMessage;
      setPendingMessage(null);
      onSendMessage(msg);
    }
  }, [pendingMessage, isLoading, disabled, isSpeaking, isProcessing, onSendMessage]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, interimTranscript]);

  // Reproduzir áudio da última mensagem do assistente (sem duplicação)
  const lastMessageIdRef = useRef<string | null>(null);
  const speakingMessageIdRef = useRef<string | null>(null);
  
  useEffect(() => {
    // Não reproduzir se voz desabilitada, carregando, ou já falando
    if (!voiceEnabled || isLoading) return;
    
    const lastMessage = messages[messages.length - 1];
    
    // Verificar se é uma nova mensagem do assistente que ainda não foi falada
    if (
      lastMessage?.role === "assistant" &&
      lastMessage.id !== lastMessageIdRef.current &&
      lastMessage.id !== speakingMessageIdRef.current
    ) {
      // Marcar como processada para evitar duplicação
      lastMessageIdRef.current = lastMessage.id;
      speakingMessageIdRef.current = lastMessage.id;
      
      // Iniciar fala imediatamente
      const timer = setTimeout(() => {
        if (!isSpeaking && !isProcessing) {
          speak(lastMessage.content);
        }
      }, 50); // Reduzido de 300ms para 50ms
      
      return () => clearTimeout(timer);
    }
  }, [messages, voiceEnabled, speak, isLoading, isSpeaking, isProcessing]);

  const handleSendMessage = async () => {
    const messageToSend = inputValue.trim();
    if (!messageToSend || isLoading || disabled) return;
    setInputValue("");
    await onSendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleConversation = async () => {
    if (isRecording) {
      // Parar gravação e transcrever
      const text = await stopRecording();
      if (text) {
        toast.success("Mensagem transcrita!");
      }
    } else {
      // Iniciar gravação
      try {
        await startRecording();
        toast.info("🎤 Gravando... Clique novamente para enviar");
      } catch (err) {
        toast.error("Erro ao iniciar gravação. Verifique permissão do microfone.");
      }
    }
  };

  const toggleVoice = () => {
    if (isSpeaking) stopSpeaking();
    setVoiceEnabled(!voiceEnabled);
    toast.info(voiceEnabled ? "Voz desativada" : "Voz ativada");
  };

  const formatTime = (timestamp?: number | Date) => {
    const date = timestamp 
      ? (timestamp instanceof Date ? timestamp : new Date(timestamp))
      : new Date();
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isConnected) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-2xl">{pacienteEmoji}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {pacienteName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Paciente simulado por IA
            </p>
          </div>
        </div>
        <div className="text-center py-6">
          <Button
            onClick={onConnect}
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8"
          >
            Iniciar Consulta
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            🎤 Fale com o paciente - sua voz vira texto
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-[#1a1f2e] border border-border rounded-xl overflow-hidden flex flex-col h-full">
      {/* Header com paciente */}
      <div className="bg-[#252b3b] p-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-xl">{pacienteEmoji}</span>
            </div>
            {isRecording && (
              <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <Mic className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{pacienteName}</h3>
            <div className="flex items-center gap-2">
              {isRecording && (
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  Gravando sua voz
                </span>
              )}
              {isProcessing && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                  📝 Transcrevendo...
                </span>
              )}
              {isSpeaking && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                  🔊 Falando...
                </span>
              )}
              {!isRecording && !isSpeaking && !isProcessing && (
                <span className="text-xs text-muted-foreground">Em consulta</span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDisconnect}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Área de mensagens */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages
          .filter((m) => m.role !== "system")
          .map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === "user"
                    ? "bg-cyan-500"
                    : "bg-gradient-to-br from-amber-400 to-orange-500"
                )}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-sm">{pacienteEmoji}</span>
                )}
              </div>

              {/* Mensagem */}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-cyan-500 text-white rounded-tr-md"
                    : "bg-[#2a3142] text-foreground rounded-tl-md"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={cn(
                    "text-[10px] mt-1",
                    message.role === "user"
                      ? "text-cyan-100"
                      : "text-muted-foreground"
                  )}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

        {/* Loading */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-sm">{pacienteEmoji}</span>
            </div>
            <div className="bg-[#2a3142] rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Transcrição em tempo real */}
        {(isRecording || isProcessing) && (
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-cyan-500/50 text-white rounded-tr-md border border-cyan-400/30">
              <p className="text-sm leading-relaxed">
                {interimTranscript || (
                  <span className="text-cyan-200 italic">
                    {isRecording ? "🎤 Gravando..." : "📝 Transcrevendo..."}
                  </span>
                )}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input e controles */}
      <div className="border-t border-border p-4 bg-[#252b3b]">
        {/* Campo de texto com botão enviar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              disabled={isLoading || disabled}
              className="bg-[#1a1f2e] border-border h-11 pr-12 rounded-xl"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim() || disabled}
            className="h-11 px-6 bg-cyan-500 hover:bg-cyan-600 rounded-xl"
          >
            Enviar
          </Button>
        </div>

        {/* Botões de controle */}
        <div className="flex items-center justify-center gap-4">
          {/* Botão de chat/texto */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#1a1f2e] hover:bg-[#2a3142]"
          >
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
          </Button>

          {/* Botão grande de microfone - Push to Talk */}
          <Button
            onClick={toggleConversation}
            disabled={isProcessing || isLoading || disabled}
            className={cn(
              "w-16 h-16 rounded-full transition-all",
              isRecording
                ? "bg-red-500 hover:bg-red-600 ring-4 ring-red-500/30 animate-pulse"
                : "bg-cyan-500 hover:bg-cyan-600"
            )}
          >
            {isProcessing ? (
              <Loader2 className="w-7 h-7 text-white animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-7 h-7 text-white" />
            ) : (
              <Mic className="w-7 h-7 text-white" />
            )}
          </Button>

          {/* Botão de voz/mudo */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoice}
            className={cn(
              "w-12 h-12 rounded-full bg-[#1a1f2e] hover:bg-[#2a3142]",
              isSpeaking && "ring-2 ring-green-500"
            )}
          >
            {voiceEnabled ? (
              <Volume2
                className={cn(
                  "w-5 h-5",
                  isSpeaking ? "text-green-500" : "text-muted-foreground"
                )}
              />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
