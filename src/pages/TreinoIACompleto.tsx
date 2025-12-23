import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Clock,
  Settings,
  Trophy,
  Brain,
  MessageSquare,
  ListChecks,
  User,
} from "lucide-react";
import { AreaBadge } from "@/components/AreaBadge";
import { AreaCode, checklistsData } from "@/data/checklists";
import {
  getChecklistContentByIdAsync,
  defaultChecklistContent,
} from "@/data/checklistContents";
import { ChecklistContent } from "@/types/checklists";
import { ChatPacienteIA } from "@/components/treino-ia/ChatPacienteIA";
import { ChecklistCompletoIA } from "@/components/treino-ia/ChecklistCompletoIA";
import { ChecklistBloqueado } from "@/components/treino-ia/ChecklistBloqueado";
import { ImpressosComCadeado } from "@/components/treino-ia/ImpressosComCadeado";
import { FeedbackItem } from "@/components/treino-ia/FeedbackItem";
import { AnaliseResultados } from "@/components/treino-ia/AnaliseResultados";
import { ResultSummary } from "@/components/avaliacao/ResultSummary";
import { useAIPacienteAvaliador } from "@/hooks/useAIPacienteAvaliador";
import { useAvaliacaoTimer } from "@/hooks/useAvaliacaoTimer";
import { useChecklistMetrics } from "@/hooks/useChecklistMetrics";
import { ItemScoreIA } from "@/types/treino-ia";
import { ItemScore } from "@/types/avaliacao";
import { formatTime } from "@/lib/avaliacao-utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SessionPhase = "setup" | "running" | "paused" | "finished" | "choosing" | "reviewing";
type EvaluationMode = "auto" | "ia" | null;

interface FeedbackNotification {
  item: ItemScoreIA;
  description: string;
}

export default function TreinoIACompleto() {
  const { checklistId } = useParams<{ checklistId: string }>();
  const navigate = useNavigate();

  const [content, setContent] = useState<ChecklistContent>(defaultChecklistContent);
  const [checklistInfo, setChecklistInfo] = useState<typeof checklistsData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<SessionPhase>("setup");
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    // Carregar API Key do localStorage
    return localStorage.getItem("openai_api_key") || "";
  });
  const [showSettings, setShowSettings] = useState(false);
  const [feedbackNotifications, setFeedbackNotifications] = useState<FeedbackNotification[]>([]);
  const [evaluationMode, setEvaluationMode] = useState<EvaluationMode>(null);
  const [checklistUnlocked, setChecklistUnlocked] = useState(false);

  // Hook para métricas do usuário
  const { recordAttempt } = useChecklistMetrics();

  // Timer
  const { timeRemaining, isRunning, start, pause, reset } = useAvaliacaoTimer({
    initialTime: 600,
    onFinish: () => {
      toast.warning("Tempo esgotado!");
      handleFinish();
    },
  });

  // Callbacks para o hook
  const handleChecklistItemCompleted = useCallback((itemId: number, score: ItemScoreIA) => {
    const item = content.evaluationItems[itemId - 1];
    if (item) {
      setFeedbackNotifications(prev => [
        ...prev,
        { item: score, description: item.title }
      ]);
    }
  }, [content.evaluationItems]);

  const handleExameLiberated = useCallback((exameId: number) => {
    const impresso = content.impressos?.[exameId - 1];
    if (impresso) {
      toast.success(`Exame liberado: ${impresso.title}`, {
        description: "Clique em Impressos para visualizar"
      });
    }
  }, [content.impressos]);


  // IA do Paciente e Avaliador
  const {
    sendMessage,
    sendInitialGreeting,
    isLoading: isAILoading,
    conversationHistory,
    completedItems,
    liberatedExames,
    totalScore,
    maxScore,
    clearHistory,
  } = useAIPacienteAvaliador({
    checklistContent: content,
    apiKey: apiKey || undefined,
    callbacks: {
      onChecklistItemCompleted: handleChecklistItemCompleted,
      onExameLiberated: handleExameLiberated,
    },
  });

  // Carregar checklist
  useEffect(() => {
    const loadChecklist = async () => {
      setIsLoading(true);

      if (!checklistId) {
        toast.error("Checklist não especificado");
        navigate("/checklists");
        return;
      }

      const info = checklistsData.find((c) => c.id === checklistId);
      if (!info) {
        toast.error("Checklist não encontrado");
        navigate("/checklists");
        return;
      }
      setChecklistInfo(info);

      try {
        const checklistContent = await getChecklistContentByIdAsync(checklistId);
        setContent(checklistContent);
      } catch {
        setContent(defaultChecklistContent);
      }

      setIsLoading(false);
    };

    loadChecklist();
  }, [checklistId, navigate]);

  // Gerar nome do paciente e detectar gênero
  const getPacienteInfo = () => {
    const instrucoes = content.instrucoes.itens.join(" ");
    const descricao = content.scenario.descricao.join(" ");
    const fullText = instrucoes + " " + descricao;
    
    // Tentar extrair nome dos dados pessoais (formato: "Nome, idade anos" ou "- Nome, idade anos")
    // Exemplos: "Isadora, 35 anos", "- Lays, 28 anos", "Mariana, 31 anos", "Joaquim, 66 anos"
    const dadosPessoaisMatch = fullText.match(/(?:DADOS PESSOAIS[:\s]*[-\s]*|^[-\s]*)([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)(?:,|\s+\d)/m);
    if (dadosPessoaisMatch) {
      return dadosPessoaisMatch[1];
    }
    
    // Tentar extrair nome de "Meu nome é X" ou "Me chamo X"
    const nomeMatch = fullText.match(/(?:meu nome é|me chamo|sou o|sou a)\s+([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)/i);
    if (nomeMatch) {
      return nomeMatch[1];
    }
    
    // Se não encontrou nome, usar nome padrão baseado em gênero
    const isFemale = fullText.toLowerCase().includes("sou a ") || 
                     fullText.toLowerCase().includes("paciente feminina") ||
                     fullText.toLowerCase().includes("mulher") ||
                     fullText.toLowerCase().includes("gestante") ||
                     fullText.toLowerCase().includes("grávida") ||
                     fullText.toLowerCase().includes("menstruação") ||
                     fullText.toLowerCase().includes("mama") ||
                     fullText.toLowerCase().includes("útero") ||
                     fullText.toLowerCase().includes("vaginal");
    
    const nomesFemininos = ["Maria Silva", "Ana Oliveira", "Carla Santos", "Juliana Costa"];
    const nomesMasculinos = ["João Santos", "Carlos Souza", "Pedro Lima", "Roberto Alves"];
    
    const nomes = isFemale ? nomesFemininos : nomesMasculinos;
    return nomes[Math.floor(Math.random() * nomes.length)];
  };

  // Detectar gênero do paciente para voz
  const getPacienteGender = (): 'male' | 'female' => {
    const instrucoes = content.instrucoes.itens.join(" ");
    const descricao = content.scenario.descricao.join(" ");
    const fullText = (instrucoes + " " + descricao).toLowerCase();
    
    // Indicadores de gênero feminino
    const femaleIndicators = [
      "sou a ", "paciente feminina", "mulher", "gestante", "grávida",
      "menstruação", "mama", "útero", "vaginal", "ela ", " ela",
      "senhora", "dona ", "mãe ", "filha", "esposa", "feminino"
    ];
    
    // Indicadores de gênero masculino
    const maleIndicators = [
      "sou o ", "paciente masculino", "homem", "ele ", " ele",
      "senhor", "pai ", "filho", "esposo", "masculino", "próstata",
      "testículo", "pênis"
    ];
    
    let femaleScore = 0;
    let maleScore = 0;
    
    for (const indicator of femaleIndicators) {
      if (fullText.includes(indicator)) femaleScore++;
    }
    
    for (const indicator of maleIndicators) {
      if (fullText.includes(indicator)) maleScore++;
    }
    
    // Se não conseguiu determinar, usar feminino como padrão (mais comum em OSCE)
    return maleScore > femaleScore ? 'male' : 'female';
  };

  const getPacienteName = () => getPacienteInfo();

  const handleStart = async () => {
    setPhase("running");
    setIsConnected(true);
    start();
    toast.success("Consulta iniciada!", { description: "A IA irá avaliar seu desempenho" });
    
    // Enviar saudação inicial do paciente
    await sendInitialGreeting();
  };

  const handlePause = () => {
    if (isRunning) {
      pause();
      setPhase("paused");
      toast.info("Consulta pausada");
    } else {
      start();
      setPhase("running");
      toast.info("Consulta retomada");
    }
  };

  const handleFinish = () => {
    pause();
    setPhase("choosing"); // Vai para tela de escolha antes de mostrar resultado
    setIsConnected(false);
    toast.success("Consulta finalizada! Escolha como deseja ver sua avaliação.");
  };

  // Função para escolher auto-avaliação
  const handleAutoAvaliar = () => {
    setEvaluationMode("auto");
    setChecklistUnlocked(true);
    setPhase("reviewing");
    toast.info("Revise a conversa e avalie seu desempenho no checklist.");
  };

  // Função para escolher avaliação pela IA
  const handleAvaliacaoIA = () => {
    setEvaluationMode("ia");
    setChecklistUnlocked(true);
    setPhase("finished");
    
    // Salvar métrica do usuário
    if (checklistId && maxScore > 0) {
      const scorePercentage = (totalScore / maxScore) * 10;
      recordAttempt(checklistId, Math.round(scorePercentage * 100) / 100);
    }
    
    toast.success("Avaliação pela IA concluída!");
  };

  // Função para finalizar auto-avaliação
  const handleFinishAutoAvaliar = () => {
    setPhase("finished");
    
    // Salvar métrica do usuário
    if (checklistId && maxScore > 0) {
      const scorePercentage = (totalScore / maxScore) * 10;
      recordAttempt(checklistId, Math.round(scorePercentage * 100) / 100);
    }
    
    toast.success("Auto-avaliação concluída!");
  };

  const handleRestart = () => {
    reset();
    clearHistory();
    setPhase("setup");
    setIsConnected(false);
    setFeedbackNotifications([]);
    setEvaluationMode(null);
    setChecklistUnlocked(false);
    toast.info("Treino reiniciado");
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  const dismissFeedback = (itemId: number) => {
    setFeedbackNotifications(prev => prev.filter(f => f.item.itemId !== itemId));
  };

  // Converter completedItems para formato do ResultSummary
  const scoresForResult: Record<number, ItemScore> = {};
  for (const [id, score] of Object.entries(completedItems)) {
    scoresForResult[parseInt(id)] = {
      itemId: score.itemId,
      score: score.score,
      type: score.type,
    };
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando treino...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Tela de resultado
  if (phase === "finished") {
    return (
      <AppLayout>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate("/checklists")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {checklistInfo && <AreaBadge areaCode={checklistInfo.areaCode as AreaCode} />}
              <h1 className="text-lg font-semibold text-foreground flex-1">
                {checklistInfo?.title}
              </h1>
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Treino IA
              </span>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Resultado do Treino
            </h2>

            <ResultSummary
              items={content.evaluationItems}
              scores={scoresForResult}
              totalScore={totalScore}
              maxScore={maxScore}
              mode="avaliador"
            />

            {/* Botão de Análise de Resultados */}
            <div className="mt-6">
              <AnaliseResultados
                items={content.evaluationItems}
                scores={scoresForResult}
                totalScore={totalScore}
                maxScore={maxScore}
                checklistTitle={checklistInfo?.title || ""}
                conversationHistory={conversationHistory.map(m => ({ role: m.role, content: m.content }))}
                apiKey={apiKey || undefined}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Treinar Novamente
              </Button>
              <Button className="flex-1" onClick={() => navigate("/checklists")}>
                Voltar aos Checklists
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }


  return (
    <AppLayout>
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => navigate("/checklists")}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                {checklistInfo && <AreaBadge areaCode={checklistInfo.areaCode as AreaCode} />}
                <div>
                  <h1 className="text-sm font-semibold text-foreground">
                    {checklistInfo?.title}
                  </h1>
                  <p className="text-xs text-purple-400 flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    Treino com IA (Paciente + Avaliador)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Timer */}
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg",
                    timeRemaining <= 60 && phase === "running"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-primary/20 text-primary"
                  )}
                >
                  <Clock className="w-4 h-4" />
                  {formatTime(timeRemaining)}
                </div>

                {/* Controles */}
                {phase === "setup" && (
                  <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Treino
                  </Button>
                )}

                {(phase === "running" || phase === "paused") && (
                  <>
                    <Button variant="outline" onClick={handlePause}>
                      {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button onClick={handleFinish}>
                      <Trophy className="w-4 h-4 mr-2" />
                      Finalizar
                    </Button>
                  </>
                )}

                {/* Botão para finalizar auto-avaliação */}
                {phase === "reviewing" && (
                  <Button onClick={handleFinishAutoAvaliar} className="bg-green-600 hover:bg-green-700">
                    <Trophy className="w-4 h-4 mr-2" />
                    Concluir Auto-avaliação
                  </Button>
                )}

                {/* Botão para escolher modo na fase choosing */}
                {phase === "choosing" && (
                  <span className="text-xs text-amber-400 px-3 py-2 bg-amber-500/10 rounded-lg">
                    Escolha como deseja ver sua avaliação →
                  </span>
                )}

                <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Configurações da IA</h3>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="API Key OpenAI (obrigatória para voz)"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => {
                    localStorage.setItem("openai_api_key", apiKey);
                    setShowSettings(false);
                    if (apiKey) {
                      toast.success("API Key salva! Voz da OpenAI ativada.");
                    }
                  }}>
                    Salvar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Com API Key: Voz natural da OpenAI + GPT-4o. Sem API Key: voz do navegador.
                </p>
                {!apiKey && (
                  <p className="text-xs text-amber-400 mt-1">
                    ⚠️ Configure a API Key para usar a voz da OpenAI
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
              {/* Coluna esquerda - Chat (2/5 = 40%) */}
              <div className="lg:col-span-2 flex flex-col min-h-0">
                {/* Chat - altura maior para melhor visualização */}
                <div className="h-[500px]">
                  <ChatPacienteIA
                    pacienteName={getPacienteName()}
                    pacienteGender={getPacienteGender()}
                    messages={conversationHistory}
                    onSendMessage={handleSendMessage}
                    isLoading={isAILoading}
                    isConnected={isConnected}
                    onConnect={handleStart}
                    onDisconnect={handleFinish}
                    disabled={phase === "paused"}
                    apiKey={apiKey || undefined}
                  />
                </div>
              </div>

              {/* Coluna direita - Cenário + Orientações + Ator + Impressos + Checklist (3/5 = 60%) */}
              <div className="lg:col-span-3 flex flex-col min-h-0 gap-3 overflow-y-auto">
                {/* Cenário de atuação */}
                <div className="bg-card border border-border rounded-lg overflow-hidden flex-shrink-0">
                  <div className="bg-[#2a2f4a] border-b border-primary/30 px-3 py-2">
                    <div className="flex items-center gap-2 text-primary">
                      <MessageSquare className="w-3 h-3" />
                      <span className="text-xs font-medium">Cenário de atuação</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-2 text-xs text-muted-foreground">
                    <div>
                      <p><span className="text-foreground italic">Nível:</span> {content.scenario.nivel}</p>
                      <p><span className="text-foreground italic">Tipo:</span> {content.scenario.tipo}</p>
                    </div>
                    <div className="pt-1">
                      <p className="text-foreground font-medium mb-1">DESCRIÇÃO DO CASO:</p>
                      {content.scenario.descricao.map((item, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-1' : ''}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Orientações dos 10 min */}
                <div className="bg-card border border-border rounded-lg overflow-hidden flex-shrink-0">
                  <div className="bg-[#2a2f4a] border-b border-primary/30 px-3 py-2">
                    <div className="flex items-center gap-2 text-primary">
                      <ListChecks className="w-3 h-3" />
                      <span className="text-xs font-medium">
                        Nos 10 Min. de duração da estação, você deverá executar as seguintes tarefas:
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {content.orientacoes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Orientações do Ator/Atriz */}
                {content.instrucoes.itens.length > 0 && (
                  <div className="bg-card border border-border rounded-lg overflow-hidden flex-shrink-0">
                    <div className="bg-[#2a2f4a] border-b border-primary/30 px-3 py-2">
                      <div className="flex items-center gap-2 text-primary">
                        <User className="w-3 h-3" />
                        <span className="text-xs font-medium">{content.instrucoes.titulo || "Orientações do Ator/Atriz"}</span>
                      </div>
                    </div>
                    <div className="p-3 max-h-[300px] overflow-y-auto">
                      <div className="space-y-3 text-xs">
                        {content.instrucoes.itens.map((item, idx) => {
                          // Detectar se é um título de categoria (começa com letra maiúscula e termina com :)
                          const isCategory = /^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ\s]+:/.test(item);
                          // Detectar se é um item com label (ex: "DADOS PESSOAIS: valor")
                          const hasLabel = item.includes(':') && !isCategory;
                          
                          if (isCategory) {
                            return (
                              <div key={idx} className="pt-2 first:pt-0">
                                <p className="text-primary font-semibold text-[11px] uppercase tracking-wide border-b border-primary/20 pb-1 mb-2">
                                  {item}
                                </p>
                              </div>
                            );
                          }
                          
                          if (hasLabel) {
                            const [label, ...rest] = item.split(':');
                            const value = rest.join(':').trim();
                            return (
                              <div key={idx} className="flex flex-col gap-0.5 pl-2 border-l-2 border-primary/20">
                                <span className="text-foreground font-medium text-[11px]">{label}:</span>
                                <span className="text-muted-foreground leading-relaxed">{value}</span>
                              </div>
                            );
                          }
                          
                          return (
                            <p key={idx} className="text-muted-foreground pl-2 border-l-2 border-primary/20 leading-relaxed">
                              {item}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Impressos com cadeado */}
                <div className="flex-shrink-0">
                  <ImpressosComCadeado
                    impressos={content.impressos || []}
                    liberatedExames={liberatedExames}
                  />
                </div>

                {/* Checklist - Bloqueado ou Desbloqueado */}
                <div className="flex-1 min-h-0">
                  {checklistUnlocked ? (
                    <ChecklistCompletoIA
                      items={content.evaluationItems}
                      completedItems={completedItems}
                      totalScore={totalScore}
                      maxScore={maxScore}
                    />
                  ) : (
                    <ChecklistBloqueado
                      totalItems={content.evaluationItems.length}
                      onAutoAvaliar={handleAutoAvaliar}
                      onAvaliacaoIA={handleAvaliacaoIA}
                      isFinished={phase === "choosing"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Notifications */}
      {feedbackNotifications.length > 0 && (
        <FeedbackItem
          item={feedbackNotifications[feedbackNotifications.length - 1].item}
          itemDescription={feedbackNotifications[feedbackNotifications.length - 1].description}
          onDismiss={() => dismissFeedback(feedbackNotifications[feedbackNotifications.length - 1].item.itemId)}
        />
      )}
    </AppLayout>
  );
}
