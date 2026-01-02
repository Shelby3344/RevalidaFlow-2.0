import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, Send, Loader2, Sparkles, User, Bot, 
  TrendingUp, Target, AlertTriangle, Lightbulb,
  ChevronDown, ChevronUp, MessageSquare
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
  "Onde preciso melhorar mais?",
  "Qual área devo focar essa semana?",
  "Como posso aumentar minha média?",
  "Analise meu desempenho geral",
  "Quais são meus pontos fortes?",
  "Monte um plano de estudos para mim",
];

// Função para converter markdown em HTML
function formatMessage(text: string): string {
  return text
    // Negrito: **texto** ou __texto__
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Itálico: *texto* ou _texto_
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Quebras de linha
    .replace(/\n/g, '<br/>');
}

// Componente para renderizar mensagem formatada
function FormattedMessage({ content, className }: { content: string; className?: string }) {
  return (
    <p 
      className={cn("text-sm", className)}
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
10. Se o estudante perguntar algo fora do contexto de estudos, redirecione educadamente`;
}

export function AIAnalystChat({ userStats }: AIAnalystChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0 && isExpanded) {
      const greeting: Message = {
        id: "greeting",
        role: "assistant",
        content: `Olá! 👋 Sou seu mentor de estudos para o Revalida. 

Analisei seus dados e vi que você tem uma média geral de **${userStats.mediaGeral.toFixed(1)}** com **${userStats.totalEstacoes} estações** realizadas.

Como posso te ajudar hoje? Posso analisar suas áreas de dificuldade, sugerir um plano de estudos ou responder dúvidas sobre sua preparação.`,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isExpanded, userStats]);

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
          max_tokens: 500,
        }),
      });

      let assistantContent: string;

      if (response.ok) {
        const data = await response.json();
        assistantContent = data.content;
      } else {
        // Fallback local response
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

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <Card className={cn(
      "border-primary/20 transition-all duration-300",
      isExpanded ? "bg-gradient-to-br from-primary/5 to-transparent" : ""
    )}>
      <CardHeader 
        className="pb-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            Mentor IA
            <Badge variant="secondary" className="ml-2">Chat</Badge>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CardTitle>
        {!isExpanded && (
          <p className="text-sm text-muted-foreground mt-1">
            Clique para conversar com seu mentor de estudos
          </p>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Messages Area */}
          <ScrollArea className="h-[350px] pr-4" ref={scrollRef}>
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
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                  )}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card border border-border rounded-tl-sm"
                  )}>
                    <FormattedMessage 
                      content={message.content} 
                      className={message.role === "user" ? "text-primary-foreground" : ""}
                    />
                    <p className={cn(
                      "text-[10px] mt-1",
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Analisando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Sugestões de perguntas:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => handleSuggestedQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pergunte sobre seu desempenho..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}


// Fallback local response generator
function generateLocalResponse(message: string, stats: UserStats): string {
  const lowerMsg = message.toLowerCase();
  
  // Find weakest area
  const weakestArea = stats.areaStats.reduce((min, area) => 
    area.media < min.media ? area : min
  );
  
  // Find strongest area
  const strongestArea = stats.areaStats.reduce((max, area) => 
    area.media > max.media ? area : max
  );
  
  // Find weakest category
  const weakestCategory = stats.categoryPerformance.reduce((min, cat) => 
    cat.percentage < min.percentage ? cat : min
  );

  if (lowerMsg.includes("melhorar") || lowerMsg.includes("dificuldade") || lowerMsg.includes("fraco")) {
    return `📊 **Análise dos seus pontos a melhorar:**

🔴 Sua área mais fraca é **${weakestArea.area}** com média **${weakestArea.media.toFixed(1)}**. Recomendo dedicar mais tempo a essa área.

📋 Na categoria de avaliação, você precisa focar em **${weakestCategory.category}** (${weakestCategory.percentage}%).

💡 **Sugestão:** Refaça as estações com nota abaixo de 5.0, especialmente:
${stats.weakPoints.slice(0, 3).map(w => `- ${w.title} (nota ${w.score.toFixed(1)})`).join("\n")}

Quer que eu monte um plano de estudos focado nessas áreas?`;
  }

  if (lowerMsg.includes("focar") || lowerMsg.includes("priorizar") || lowerMsg.includes("semana")) {
    return `🎯 **Prioridades para esta semana:**

1. **${weakestArea.area}** - Sua área mais fraca (média ${weakestArea.media.toFixed(1)})
   - Faça pelo menos 3 estações novas
   - Revise os conceitos teóricos

2. **${weakestCategory.category}** - Categoria com menor desempenho (${weakestCategory.percentage}%)
   - Pratique especificamente essa etapa nas estações

3. **Revisão das piores notas:**
   - ${stats.weakPoints[0]?.title || "Revise estações anteriores"}

📅 Meta: Aumentar sua média em ${weakestArea.area} para pelo menos 7.0!`;
  }

  if (lowerMsg.includes("média") || lowerMsg.includes("aumentar") || lowerMsg.includes("nota")) {
    const pontosParaAprovacao = Math.max(0, 6.0 - stats.mediaGeral);
    return `📈 **Como aumentar sua média:**

Sua média atual: **${stats.mediaGeral.toFixed(1)}/10**
${stats.mediaGeral >= 6 ? "✅ Você está acima da nota de corte!" : `⚠️ Faltam ${pontosParaAprovacao.toFixed(1)} pontos para a nota de corte (6.0)`}

**Estratégias:**
1. Foque em ${weakestArea.area} - cada ponto ganho aqui impacta mais sua média
2. Melhore ${weakestCategory.category} - está puxando sua nota para baixo
3. Refaça estações com nota < 5.0 até conseguir > 7.0

**Projeção:** Se você aumentar ${weakestArea.area} de ${weakestArea.media.toFixed(1)} para 7.5, sua média geral subiria para aproximadamente ${(stats.mediaGeral + 0.5).toFixed(1)}!`;
  }

  if (lowerMsg.includes("geral") || lowerMsg.includes("análise") || lowerMsg.includes("desempenho")) {
    return `📊 **Análise Geral do seu Desempenho:**

📈 **Média Geral:** ${stats.mediaGeral.toFixed(1)}/10
📚 **Estações Realizadas:** ${stats.totalEstacoes}
⏱️ **Tempo de Estudo:** ${Math.floor(stats.tempoEstudo / 60)}h ${stats.tempoEstudo % 60}min

**Pontos Fortes:**
✅ ${strongestArea.area} - Média ${strongestArea.media.toFixed(1)} (${strongestArea.estacoes} estações)

**Pontos a Melhorar:**
⚠️ ${weakestArea.area} - Média ${weakestArea.media.toFixed(1)}
⚠️ ${weakestCategory.category} - ${weakestCategory.percentage}%

**Recomendação:** ${stats.mediaGeral >= 7 ? "Você está no caminho certo! Mantenha a consistência." : "Foque nas áreas fracas para equilibrar seu desempenho."}`;
  }

  if (lowerMsg.includes("forte") || lowerMsg.includes("bom") || lowerMsg.includes("melhor")) {
    return `💪 **Seus Pontos Fortes:**

🏆 **Melhor área:** ${strongestArea.area}
   - Média: ${strongestArea.media.toFixed(1)}/10
   - Estações: ${strongestArea.estacoes}

📋 **Melhores categorias:**
${stats.categoryPerformance
  .filter(c => c.percentage >= 70)
  .map(c => `✅ ${c.category}: ${c.percentage}%`)
  .join("\n") || "Continue praticando para identificar seus pontos fortes!"}

💡 Use seus pontos fortes como base para melhorar as áreas mais fracas. A metodologia que funciona em ${strongestArea.area} pode ser aplicada em outras áreas!`;
  }

  if (lowerMsg.includes("plano") || lowerMsg.includes("cronograma") || lowerMsg.includes("estudos")) {
    return `📅 **Plano de Estudos Sugerido:**

**Segunda a Sexta:**
🔴 ${weakestArea.area} - 2 estações/dia (prioridade máxima)
🟡 ${stats.areaStats.find(a => a !== weakestArea && a !== strongestArea)?.area || "Clínica"} - 1 estação/dia

**Sábado:**
📝 Revisão das estações com nota < 6.0
📚 Estudo teórico de ${weakestCategory.category}

**Domingo:**
🎯 Simulado completo (1 estação de cada área)
📊 Análise do desempenho da semana

**Meta Semanal:**
- Mínimo 15 estações
- Aumentar média de ${weakestArea.area} em 0.5 pontos
- Melhorar ${weakestCategory.category} para > 70%`;
  }

  // Default response
  return `Entendi sua pergunta! 🤔

Com base nos seus dados:
- Média geral: ${stats.mediaGeral.toFixed(1)}
- ${stats.totalEstacoes} estações realizadas
- Área mais forte: ${strongestArea.area} (${strongestArea.media.toFixed(1)})
- Área para focar: ${weakestArea.area} (${weakestArea.media.toFixed(1)})

Posso te ajudar com:
• Análise detalhada do seu desempenho
• Sugestões de onde melhorar
• Plano de estudos personalizado
• Estratégias para aumentar sua média

O que você gostaria de saber?`;
}