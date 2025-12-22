import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Clock,
  MessageSquare,
  ListChecks,
  Settings,
  Trophy,
} from "lucide-react";
import { AreaBadge } from "@/components/AreaBadge";
import { AreaCode, checklistsData } from "@/data/checklists";
import {
  getChecklistContentByIdAsync,
  defaultChecklistContent,
} from "@/data/checklistContents";
import { ChecklistContent } from "@/types/checklists";
import { AIPacienteChat } from "@/components/avaliacao/AIPacienteChat";
import { ChecklistEvaluator } from "@/components/avaliacao/ChecklistEvaluator";
import { ResultSummary } from "@/components/avaliacao/ResultSummary";
import { useAIPaciente } from "@/hooks/useAIPaciente";
import { useAvaliacaoTimer } from "@/hooks/useAvaliacaoTimer";
import { ItemScore } from "@/types/avaliacao";
import { formatTime, calculateTotalScore } from "@/lib/avaliacao-utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SessionPhase = "setup" | "running" | "finished";

export default function TreinoIA() {
  const { checklistId } = useParams<{ checklistId: string }>();
  const navigate = useNavigate();

  const [content, setContent] = useState<ChecklistContent>(defaultChecklistContent);
  const [checklistInfo, setChecklistInfo] = useState<typeof checklistsData[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<SessionPhase>("setup");
  const [isConnected, setIsConnected] = useState(false);
  const [scores, setScores] = useState<Record<number, ItemScore>>({});
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "checklist">("chat");

  // Timer
  const { timeRemaining, isRunning, start, pause, reset } = useAvaliacaoTimer({
    initialTime: 600,
    onFinish: () => {
      toast.warning("Tempo esgotado!");
      handleFinish();
    },
  });

  // IA do Paciente
  const { sendMessage, clearHistory } = useAIPaciente({
    checklistContent: content,
    apiKey: apiKey || undefined,
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

      // Encontrar info do checklist
      const info = checklistsData.find((c) => c.id === checklistId);
      if (!info) {
        toast.error("Checklist não encontrado");
        navigate("/checklists");
        return;
      }
      setChecklistInfo(info);

      // Carregar conteúdo
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

  // Gerar nome do paciente baseado no cenário
  const getPacienteName = () => {
    const instrucoes = content.instrucoes.itens.join(" ");
    const nomeMatch = instrucoes.match(/(?:me chamo|meu nome é|sou o|sou a)\s+(\w+)/i);
    if (nomeMatch) return nomeMatch[1];
    
    // Nomes aleatórios
    const nomes = ["Maria Silva", "João Santos", "Ana Oliveira", "Carlos Souza", "Lucia Ferreira"];
    return nomes[Math.floor(Math.random() * nomes.length)];
  };

  const handleStart = () => {
    setPhase("running");
    setIsConnected(true);
    start();
    toast.success("Consulta iniciada!", { description: "Boa sorte!" });
  };

  const handlePause = () => {
    if (isRunning) {
      pause();
      toast.info("Consulta pausada");
    } else {
      start();
      toast.info("Consulta retomada");
    }
  };

  const handleFinish = () => {
    pause();
    setPhase("finished");
    setIsConnected(false);
    toast.success("Consulta finalizada!");
  };

  const handleRestart = () => {
    reset();
    clearHistory();
    setScores({});
    setPhase("setup");
    setIsConnected(false);
    setActiveTab("chat");
    toast.info("Treino reiniciado");
  };

  const handleScoreChange = (itemId: number, score: number, type: ItemScore["type"]) => {
    setScores((prev) => ({
      ...prev,
      [itemId]: { itemId, score, type },
    }));
  };

  const totalScore = calculateTotalScore(scores);
  const maxScore = content.evaluationItems.reduce((sum, item) => sum + item.scores.max, 0);

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
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="icon" onClick={() => navigate("/checklists")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {checklistInfo && <AreaBadge areaCode={checklistInfo.areaCode as AreaCode} />}
              <h1 className="text-lg font-semibold text-foreground flex-1">
                {checklistInfo?.title}
              </h1>
              <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded flex items-center gap-1">
                <Bot className="w-3 h-3" />
                Treino IA
              </span>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Resultado do Treino
            </h2>

            <ResultSummary
              items={content.evaluationItems}
              scores={scores}
              totalScore={totalScore}
              maxScore={maxScore}
              mode="avaliador"
            />

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
                    <Bot className="w-3 h-3" />
                    Treino com Paciente IA
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

                {phase === "running" && (
                  <>
                    <Button variant="outline" onClick={handlePause}>
                      {isRunning ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button onClick={handleFinish}>
                      <Trophy className="w-4 h-4 mr-2" />
                      Finalizar
                    </Button>
                  </>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                >
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
                    placeholder="API Key OpenAI (opcional)"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => setShowSettings(false)}>
                    Salvar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Sem API Key, o paciente usa respostas pré-programadas baseadas no caso
                </p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex">
              <button
                onClick={() => setActiveTab("chat")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors",
                  activeTab === "chat"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <MessageSquare className="w-4 h-4" />
                Consulta
              </button>
              <button
                onClick={() => setActiveTab("checklist")}
                className={cn(
                  "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors",
                  activeTab === "checklist"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <ListChecks className="w-4 h-4" />
                Auto-Avaliação
                <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                  {totalScore.toFixed(1)}/{maxScore.toFixed(1)}
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === "chat" ? (
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Cenário */}
                {phase === "setup" && (
                  <div className="bg-card border border-border rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">Cenário de Atuação</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        <span className="text-foreground font-medium">Nível:</span>{" "}
                        {content.scenario.nivel}
                      </p>
                      <p>
                        <span className="text-foreground font-medium">Tipo:</span>{" "}
                        {content.scenario.tipo}
                      </p>
                      <div className="mt-3">
                        <p className="text-foreground font-medium mb-1">Descrição:</p>
                        {content.scenario.descricao.map((desc, idx) => (
                          <p key={idx} className="mt-1">{desc}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat com Paciente IA */}
                <AIPacienteChat
                  pacienteName={getPacienteName()}
                  scenarioContext={content.scenario.descricao.join("\n")}
                  patientInstructions={content.instrucoes.itens.join("\n")}
                  onSendMessage={sendMessage}
                  isConnected={isConnected}
                  onConnect={handleStart}
                  onDisconnect={handleFinish}
                />

                {/* Orientações */}
                {phase === "running" && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-amber-400 mb-2">
                      <ListChecks className="w-4 h-4" />
                      <span className="text-sm font-medium">Tarefas a Executar</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {content.orientacoes.map((item, idx) => (
                        <p key={idx}>• {item}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    📝 Auto-Avaliação
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Marque os itens que você realizou durante a consulta para calcular sua pontuação
                  </p>
                </div>

                <ChecklistEvaluator
                  items={content.evaluationItems}
                  scores={scores}
                  onScoreChange={handleScoreChange}
                  disabled={phase === "setup"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
