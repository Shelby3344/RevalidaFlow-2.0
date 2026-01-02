import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, Send, Loader2, Sparkles, User, Bot, 
  TrendingUp, Target, Lightbulb,
  Zap, Crown, Star
} from "lucide-react";
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
  { icon: Target, text: "Onde preciso melhorar?", color: "text-red-400" },
  { icon: TrendingUp, text: "Como aumentar minha média?", color: "text-green-400" },
  { icon: Lightbulb, text: "Monte um plano de estudos", color: "text-yellow-400" },
  { icon: Star, text: "Quais meus pontos fortes?", color: "text-blue-400" },
];

// Função para converter markdown em HTML
function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/__(.+?)__/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

// Componente para renderizar mensagem formatada
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

  // Scroll to bottom when new messages arrive
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
    <div className="relative">
      <Card className="relative overflow-hidden border border-border/50 bg-card shadow-lg">
        {/* Premium Header */}
        <div className="relative px-6 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* AI Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center shadow-md">
                <Brain className="w-6 h-6 text-white" />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-foreground">Mentor IA</h2>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[10px] px-2">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Seu assistente pessoal de estudos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-green-500 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>


        <CardContent className="p-0">
          {/* Messages Area */}
          <ScrollArea className="h-[400px]" ref={scrollRef}>
            <div className="p-6 space-y-4">
              {messages.length === 0 ? (
                /* Welcome State */
                <div className="text-center py-8">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-border flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-purple-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Olá! Sou seu Mentor de Estudos 👋
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                    Analiso seus dados de desempenho e te ajudo a identificar onde focar seus estudos para maximizar sua aprovação no Revalida.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="flex justify-center gap-4 mb-8">
                    <div className="px-4 py-2 rounded-lg bg-secondary border border-border">
                      <p className="text-2xl font-bold text-foreground">{userStats.mediaGeral.toFixed(1)}</p>
                      <p className="text-xs text-muted-foreground">Média Geral</p>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-secondary border border-border">
                      <p className="text-2xl font-bold text-foreground">{userStats.totalEstacoes}</p>
                      <p className="text-xs text-muted-foreground">Estações</p>
                    </div>
                  </div>
                  
                  {/* Suggested Questions */}
                  <p className="text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" />
                    Perguntas sugeridas
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                    {suggestedQuestions.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(q.text)}
                        disabled={isLoading}
                        className="group flex items-center gap-2 p-3 rounded-xl bg-secondary border border-border hover:bg-accent hover:border-primary/50 transition-all duration-300 text-left"
                      >
                        <q.icon className={cn("w-4 h-4 flex-shrink-0", q.color)} />
                        <span className="text-xs text-foreground group-hover:text-foreground">{q.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    {/* Avatar */}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
                      message.role === "user" 
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500" 
                        : "bg-gradient-to-br from-purple-500 to-pink-500"
                    )}>
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary border border-border rounded-tl-sm"
                    )}>
                      <FormattedMessage 
                        content={message.content} 
                        className={message.role === "user" ? "text-primary-foreground" : "text-foreground"}
                      />
                      <p className={cn(
                        "text-[10px] mt-2 opacity-60",
                        message.role === "user" ? "text-primary-foreground" : "text-muted-foreground"
                      )}>
                        {message.timestamp.toLocaleTimeString("pt-BR", { 
                          hour: "2-digit", 
                          minute: "2-digit" 
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-secondary border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">Analisando seus dados...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>


          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Pergunte sobre seu desempenho..."
                  disabled={isLoading}
                  className="w-full pr-12 h-12 rounded-xl"
                />
              </div>
              <Button 
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            
            {/* Powered by */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-[10px] text-muted-foreground">Powered by</span>
              <span className="text-[10px] font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">GPT-4</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Fallback local response generator
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