import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIPacienteChatProps {
  pacienteName: string;
  pacienteAvatar?: string;
  scenarioContext: string;
  patientInstructions: string;
  onSendMessage: (message: string) => Promise<string>;
  isConnected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function AIPacienteChat({
  pacienteName,
  scenarioContext,
  patientInstructions,
  onSendMessage,
  isConnected = false,
  onConnect,
  onDisconnect,
}: AIPacienteChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensagem inicial do paciente quando conecta
  useEffect(() => {
    if (isConnected && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Olá doutor(a)... *parece desconfortável* Que bom que você chegou, estou me sentindo muito mal...`,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, [isConnected, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await onSendMessage(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "*O paciente parece confuso e não responde...*",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // TODO: Implementar reconhecimento de voz
  };

  if (!isConnected) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        {/* Header do paciente */}
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
            Iniciar Consulta
          </Button>
        </div>

        <div className="text-center py-8 text-muted-foreground">
          <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Clique em "Iniciar Consulta" para começar o atendimento</p>
          <p className="text-xs mt-2">
            O paciente IA irá responder baseado no caso clínico
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xl">🧑‍🦱</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{pacienteName}</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Em consulta
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            className="text-red-400 border-red-400/50 hover:bg-red-500/10"
          >
            <PhoneOff className="w-4 h-4 mr-1" />
            Encerrar
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === "user"
                  ? "bg-primary"
                  : "bg-gradient-to-br from-blue-500 to-purple-600"
              )}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-primary-foreground" />
              ) : (
                <span className="text-sm">🧑‍🦱</span>
              )}
            </div>
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-secondary text-foreground rounded-tl-sm"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p
                className={cn(
                  "text-[10px] mt-1",
                  message.role === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {message.timestamp.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm">🧑‍🦱</span>
            </div>
            <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
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

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={cn(isListening && "bg-red-500/20 border-red-500")}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 text-red-500" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta ao paciente..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          💡 Faça perguntas como faria em uma consulta real
        </p>
      </div>
    </div>
  );
}
