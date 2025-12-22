import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  User,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MessageIA } from "@/types/treino-ia";
import { useVoiceChat } from "@/hooks/useVoiceChat";

interface ChatPacienteIAProps {
  pacienteName: string;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastSpokenMessageRef = useRef<string | null>(null);

  // Hook unificado para voz (gravação + reprodução)
  const {
    startRecording,
    stopRecording,
    isRecording,
    speak,
    stopSpeaking,
    isSpeaking,
    isProcessing,
    interimTranscript,
    error: voiceError,
  } = useVoiceChat({
    apiKey,
    voice: "nova",
    onTranscript: (text, isFinal) => {
      if (isFinal && text.trim()) {
        // Enviar mensagem automaticamente quando transcrição finalizar
        handleSendVoiceMessage(text.trim());
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Falar última mensagem do assistente automaticamente
  useEffect(() => {
    if (!voiceEnabled) return;
    
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === "assistant" &&
      lastMessage.id !== lastSpokenMessageRef.current
    ) {
      lastSpokenMessageRef.current = lastMessage.id;
      speak(lastMessage.content);
    }
  }, [messages, voiceEnabled, speak]);

  const handleSendVoiceMessage = useCallback(async (text: string) => {
    if (!text || isLoading || disabled) return;
    setInputValue("");
    await onSendMessage(text);
  }, [isLoading, disabled, onSendMessage]);

  const handleSendMessage = async () => {
    const messageToSend = inputValue.trim();
    if (!messageToSend || isLoading || disabled) return;

    // Parar gravação se estiver ativa
    if (isRecording) {
      await stopRecording();
    }

    setInputValue("");
    await onSendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Parar gravação e enviar
      const transcript = await stopRecording();
      if (transcript && transcript.trim()) {
        await handleSendVoiceMessage(transcript.trim());
      }
    } else {
      // Iniciar gravação
      await startRecording();
      if (apiKey) {
        toast.success("Gravando... Clique novamente para enviar");
      } else {
        toast.success("Microfone ativado");
      }
    }
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
    toast.info(voiceEnabled ? "Voz desativada" : "Voz ativada");
  };

  if (!isConnected) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-2xl">🧑‍🦱</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-500 rounded-full border-2 border-card" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {pacienteName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Paciente simulado por IA
            </p>
          </div>
          <Button
            onClick={onConnect}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <Phone className="w-4 h-4" />
            Conversar
          </Button>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>Clique em "Conversar" para iniciar a consulta</p>
          <p className="text-xs mt-2">
            {apiKey 
              ? "🎤 Fale pelo microfone ou digite - IA com voz de alta qualidade"
              : "🎤 Fale pelo microfone ou digite - Configure API Key para voz HD"
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-border p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center",
              isSpeaking && "ring-2 ring-green-500 ring-offset-2 ring-offset-card"
            )}>
              <span className="text-lg">🧑‍🦱</span>
            </div>
            <div className={cn(
              "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
              isSpeaking ? "bg-green-500 animate-pulse" : "bg-green-500"
            )} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">
              {pacienteName}
            </h3>
            <p className="text-xs text-green-400">
              {isSpeaking ? "Falando..." : isProcessing ? "Processando..." : "Em consulta"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            className="text-red-400 border-red-400/50 hover:bg-red-500/10"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages
          .filter((m) => m.role !== "system")
          .map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === "user"
                    ? "bg-primary"
                    : "bg-gradient-to-br from-blue-500 to-purple-600"
                )}
              >
                {message.role === "user" ? (
                  <User className="w-3 h-3 text-primary-foreground" />
                ) : (
                  <span className="text-xs">🧑‍🦱</span>
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3 py-2",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-secondary text-foreground rounded-tl-sm"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.metadata?.detectedItems &&
                  message.metadata.detectedItems.length > 0 && (
                    <p className="text-[10px] mt-1 text-green-400">
                      ✓ {message.metadata.detectedItems.length} item(s)
                      detectado(s)
                    </p>
                  )}
              </div>
            </div>
          ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xs">🧑‍🦱</span>
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-3 py-2">
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

        {/* Interim transcript while recording */}
        {isRecording && interimTranscript && (
          <div className="flex gap-2 flex-row-reverse">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="max-w-[80%] rounded-2xl px-3 py-2 bg-primary/50 text-primary-foreground rounded-tr-sm">
              <p className="text-sm whitespace-pre-wrap italic opacity-70">
                {interimTranscript}...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        {/* Recording indicator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 mb-2 text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium">
              {apiKey ? "Gravando... Clique no microfone para enviar" : "Ouvindo..."}
            </span>
          </div>
        )}

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center gap-2 mb-2 text-blue-500">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span className="text-xs font-medium">Transcrevendo áudio...</span>
          </div>
        )}

        <div className="flex gap-2">
          {/* Microphone button - prominent */}
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={toggleRecording}
            disabled={isProcessing || isLoading || disabled}
            className={cn(
              "h-9 w-9 transition-all",
              isRecording && "animate-pulse ring-2 ring-red-500 ring-offset-2"
            )}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>

          {/* Voice toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleVoice}
            className={cn(
              "h-9 w-9",
              !voiceEnabled && "bg-muted",
              isSpeaking && "animate-pulse bg-green-500/20 border-green-500"
            )}
          >
            {isSpeaking ? (
              <Volume2 className="w-4 h-4 text-green-500" />
            ) : voiceEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>

          {/* Text input */}
          <Input
            value={inputValue + (isRecording && !apiKey ? interimTranscript : "")}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? "Ouvindo..." : "Fale ou digite..."}
            disabled={isLoading || disabled || isRecording}
            className="flex-1 h-9"
          />

          {/* Send button */}
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim() || disabled || isRecording}
            className="h-9 w-9"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* API mode indicator */}
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          {apiKey 
            ? "🎤 OpenAI Whisper + TTS (alta qualidade)" 
            : "🎤 Web Speech API (básico)"
          }
        </p>
      </div>
    </div>
  );
}
