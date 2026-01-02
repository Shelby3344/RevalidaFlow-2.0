import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, Loader2, User, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UserStats {
  mediaGeral: number;
  totalEstacoes: number;
  tempoEstudo: number;
  areaStats: {
    area: string;
    media: number;
    estacoes: number;
  }[];
  categoryPerformance: {
    category: string;
    percentage: number;
  }[];
  weakPoints: {
    title: string;
    score: number;
    area: string;
  }[];
}

interface AIAnalystChatProps {
  userStats: UserStats;
}

const suggestedQuestions = [
  "Onde preciso melhorar?",
  "Monte um plano de estudos",
  "Como aumentar minha média?",
  "Quais meus pontos fortes?",
];

function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-purple-400 font-semibold">$1</strong>')
    .replace(/__(.+?)__/g, '<strong class="text-purple-400 font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

function FormattedMessage({ content, className }: { content: string; className?: string }) {
  return (
    <div 
      className={cn("text-sm leading-relaxed", className)}
      dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
    />
  );
}

function generateSystemPrompt(stats: UserStats): string {
  const areasText = stats.areaStats
    .map(a => `- ${a.area}: Média ${a.media.toFixed(1)}, ${a.estacoes} estações realizadas`)
    .join("\n");
  
  const categoriesText = stats.categoryPerformance
    .map(c => `- ${c.category}: ${c.percentage}%`)
    .join("\n");
  
  const weakPointsText = stats.weakPoints
    .slice(0, 5)
    .map(w => `- ${w.title} (${w.area}): nota ${w.score.toFixed(1)}`)
    .join("\n");

  return `Você é um mentor especializado em preparação para o Revalida (exame de revalidação de diplomas médicos no Brasil). 
Seu papel é analisar os dados de desempenho do estudante e fornecer orientações personalizadas.

DADOS DO ESTUDANTE:
- Média Geral: ${stats.mediaGeral.toFixed(1)}/10
- Total de Estações Realizadas: ${stats.totalEstacoes}
- Tempo Total de Estudo: ${Math.floor(stats.tempoEstudo / 60)}h ${stats.tempoEstudo % 60}min

DESEMPENHO POR ÁREA:
${areasText}

DESEMPENHO POR CATEGORIA DE AVALIAÇÃO:
${categoriesText}

ESTAÇÕES COM PIOR DESEMPENHO (pontos a melhorar):
${weakPointsText}

REGRAS:
1. Seja direto e objetivo nas respostas
2. Use emojis para tornar a comunicação mais amigável
3. Baseie suas análises APENAS nos dados fornecidos acima
4. Dê sugestões práticas e acionáveis
5. Seja encorajador mas realista
6. Quando sugerir áreas de foco, priorize as com menor média
7. Considere que a nota de aprovação no Revalida é geralmente 6.0
8. Responda em português brasileiro
9. Mantenha respostas concisas (máximo 3-4 parágrafos)
10. Use **negrito** para destacar informações importantes
11. Se o estudante perguntar algo fora do contexto de estudos, redirecione educadamente`;
}

export function AIAnalystChat({ userStats }: AIAnalystChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = generateSystemPrompt(userStats);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          model: "gpt-4o-mini",
          temperature: 0.7,
          max_tokens: 600,
        }),
      });

      let assistantContent: string;

      if (response.ok) {
        const data = await response.json();
        assistantContent = data.content;
      } else {
        assistantContent = generateLocalResponse(messageText, userStats);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateLocalResponse(messageText, userStats),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0d0d1a] border border-[#1a1a2e] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1a1a2e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Mentor IA</h2>
            <p className="text-xs text-gray-500">Análise personalizada</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-emerald-500 font-medium">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="h-[380px]" ref={scrollRef}>
        <div className="p-6">
          {messages.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              
              <h3 className="text-white font-medium mb-1">
                Olá! Sou seu Mentor 👋
              </h3>
              <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                Analiso seus dados e te ajudo a focar no que importa para sua aprovação.
              </p>

              {/* Stats Preview */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{userStats.mediaGeral.toFixed(1)}</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider">Média</p>
                </div>
                <div className="w-px bg-[#1a1a2e]" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{userStats.totalEstacoes}</p>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider">Estações</p>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-2">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(q)}
                    disabled={isLoading}
                    className="w-full p-3 rounded-xl bg-[#12121f] border border-[#1a1a2e] hover:border-purple-500/30 hover:bg-[#15152a] transition-all text-sm text-gray-400 hover:text-gray-300 text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    message.role === "user" 
                      ? "bg-purple-500/20" 
                      : "bg-[#1a1a2e]"
                  )}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-purple-500 text-white rounded-tr-md"
                      : "bg-[#12121f] border border-[#1a1a2e] rounded-tl-md"
                  )}>
                    <FormattedMessage 
                      content={message.content} 
                      className={message.role === "user" ? "text-white" : "text-gray-300"}
                    />
                    <p className={cn(
                      "text-[10px] mt-2",
                      message.role === "user" ? "text-purple-200" : "text-gray-600"
                    )}>
                      {message.timestamp.toLocaleTimeString("pt-BR", { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-[#12121f] border border-[#1a1a2e] rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-[#1a1a2e]">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Pergunte algo..."
            disabled={isLoading}
            className="flex-1 bg-[#12121f] border-[#1a1a2e] text-white placeholder:text-gray-600 focus:border-purple-500/50 h-11 rounded-xl"
          />
          <Button 
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="h-11 w-11 rounded-xl bg-purple-500 hover:bg-purple-600 border-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function generateLocalResponse(message: string, stats: UserStats): string {
  const lowerMsg = message.toLowerCase();
  
  const weakestArea = stats.areaStats.reduce((min, area) => 
    area.media < min.media ? area : min
  );
  
  const strongestArea = stats.areaStats.reduce((max, area) => 
    area.media > max.media ? area : max
  );
  
  const weakestCategory = stats.categoryPerformance.reduce((min, cat) => 
    cat.percentage < min.percentage ? cat : min
  );

  if (lowerMsg.includes("melhorar") || lowerMsg.includes("dificuldade") || lowerMsg.includes("fraco")) {
    return `📊 **Análise dos seus pontos a melhorar:**

🔴 Sua área mais fraca é **${weakestArea.area}** com média **${weakestArea.media.toFixed(1)}**. Recomendo dedicar mais tempo a essa área.

📋 Na categoria de avaliação, você precisa focar em **${weakestCategory.category}** (${weakestCategory.percentage}%).

💡 **Sugestão:** Refaça as estações com nota abaixo de 5.0, especialmente:
${stats.weakPoints.slice(0, 3).map(w => `• ${w.title} (nota ${w.score.toFixed(1)})`).join("\n")}

Quer que eu monte um plano de estudos focado nessas áreas?`;
  }

  if (lowerMsg.includes("plano") || lowerMsg.includes("cronograma") || lowerMsg.includes("estudos")) {
    return `📅 **Plano de Estudos Personalizado:**

**Segunda a Sexta:**
🔴 **${weakestArea.area}** - 2 estações/dia (prioridade máxima)
🟡 Outras áreas - 1 estação/dia

**Sábado:**
📝 Revisão das estações com nota < 6.0
📚 Estudo teórico de **${weakestCategory.category}**

**Domingo:**
🎯 Simulado completo (1 estação de cada área)
📊 Análise do desempenho da semana

**Meta Semanal:**
• Mínimo 15 estações
• Aumentar média de ${weakestArea.area} em 0.5 pontos
• Melhorar ${weakestCategory.category} para > 70%`;
  }

  if (lowerMsg.includes("média") || lowerMsg.includes("aumentar") || lowerMsg.includes("nota")) {
    const pontosParaAprovacao = Math.max(0, 6.0 - stats.mediaGeral);
    return `📈 **Como aumentar sua média:**

Sua média atual: **${stats.mediaGeral.toFixed(1)}/10**
${stats.mediaGeral >= 6 ? "✅ Você está acima da nota de corte!" : `⚠️ Faltam **${pontosParaAprovacao.toFixed(1)} pontos** para a nota de corte (6.0)`}

**Estratégias:**
1. Foque em **${weakestArea.area}** - cada ponto ganho aqui impacta mais sua média
2. Melhore **${weakestCategory.category}** - está puxando sua nota para baixo
3. Refaça estações com nota < 5.0 até conseguir > 7.0

**Projeção:** Se você aumentar ${weakestArea.area} de ${weakestArea.media.toFixed(1)} para 7.5, sua média geral subiria para aproximadamente **${(stats.mediaGeral + 0.5).toFixed(1)}**!`;
  }

  if (lowerMsg.includes("forte") || lowerMsg.includes("bom") || lowerMsg.includes("melhor")) {
    return `💪 **Seus Pontos Fortes:**

🏆 **Melhor área:** ${strongestArea.area}
• Média: **${strongestArea.media.toFixed(1)}/10**
• Estações: ${strongestArea.estacoes}

📋 **Melhores categorias:**
${stats.categoryPerformance
  .filter(c => c.percentage >= 70)
  .map(c => `✅ ${c.category}: **${c.percentage}%**`)
  .join("\n") || "Continue praticando para identificar seus pontos fortes!"}

💡 Use seus pontos fortes como base para melhorar as áreas mais fracas!`;
  }

  return `Entendi sua pergunta! 🤔

Com base nos seus dados:
• Média geral: **${stats.mediaGeral.toFixed(1)}**
• ${stats.totalEstacoes} estações realizadas
• Área mais forte: **${strongestArea.area}** (${strongestArea.media.toFixed(1)})
• Área para focar: **${weakestArea.area}** (${weakestArea.media.toFixed(1)})

Posso te ajudar com:
• Análise detalhada do seu desempenho
• Sugestões de onde melhorar
• Plano de estudos personalizado
• Estratégias para aumentar sua média

O que você gostaria de saber?`;
}
