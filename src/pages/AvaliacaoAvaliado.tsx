import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { MessageSquare, ListChecks, Lock, Unlock } from "lucide-react";
import { AreaBadge } from "@/components/AreaBadge";
import { AreaCode } from "@/data/checklists";
import {
  getChecklistContentByIdAsync,
  defaultChecklistContent,
} from "@/data/checklistContents";
import { ChecklistContent } from "@/types/checklists";
import { ResultSummary } from "@/components/avaliacao/ResultSummary";
import { JoinSessionModal } from "@/components/avaliacao/JoinSessionModal";
import { useAvaliacaoSession } from "@/hooks/useAvaliacaoSession";
import { useAvaliacaoSync } from "@/hooks/useAvaliacaoSync";
import { formatTime, decodeSessionData } from "@/lib/avaliacao-utils";
import { toast } from "sonner";

export default function AvaliacaoAvaliado() {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<ChecklistContent>(
    defaultChecklistContent
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [unlockedImpressos, setUnlockedImpressos] = useState<number[]>([]);
  const [sessionStatus, setSessionStatus] = useState<
    "aguardando" | "em_andamento" | "pausado" | "finalizado"
  >("aguardando");
  const [resultShared, setResultShared] = useState(false);
  const [expandedImpressos, setExpandedImpressos] = useState<Set<number>>(new Set());

  const { session, loadSession, updateSession, createSessionFromData } = useAvaliacaoSession();

  const { broadcastAvaliadoConnected } = useAvaliacaoSync({
    sessionCode,
    onTimerTick: (time) => {
      setTimeRemaining(time);
    },
    onImpressoUnlocked: (impressoId) => {
      setUnlockedImpressos((prev) => [...prev, impressoId]);
      toast.success("Novo documento disponível!");
    },
    onImpressoLocked: (impressoId) => {
      setUnlockedImpressos((prev) => prev.filter((id) => id !== impressoId));
      setExpandedImpressos((prev) => {
        const next = new Set(prev);
        next.delete(impressoId);
        return next;
      });
    },
    onSessionStarted: () => {
      setSessionStatus("em_andamento");
      toast.success("Avaliação iniciada!", { description: "Boa sorte!" });
    },
    onSessionPaused: () => {
      setSessionStatus("pausado");
      toast.info("Avaliação pausada");
    },
    onSessionResumed: () => {
      setSessionStatus("em_andamento");
      toast.info("Avaliação retomada");
    },
    onSessionFinished: () => {
      setSessionStatus("finalizado");
      toast.success("Avaliação finalizada!");
    },
    onResultShared: () => {
      setResultShared(true);
      // Recarregar sessão para obter pontuações atualizadas
      if (sessionCode) {
        loadSession(sessionCode);
      }
      toast.success("Resultado disponível!");
    },
  });

  // Carregar sessão
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);

      if (!sessionCode) {
        toast.error("Código de sessão inválido");
        navigate("/");
        return;
      }

      // Primeiro tenta carregar do localStorage
      let loaded = loadSession(sessionCode);
      
      // Se não encontrou, tenta criar a partir dos dados da URL
      if (!loaded) {
        const encodedData = searchParams.get('data');
        if (encodedData) {
          const sessionData = decodeSessionData(encodedData);
          if (sessionData) {
            loaded = createSessionFromData(sessionCode, sessionData);
          }
        }
      }

      if (!loaded) {
        toast.error("Sessão não encontrada ou expirada");
        navigate("/");
        return;
      }

      // Atualizar estados locais
      setTimeRemaining(loaded.timeRemaining);
      setUnlockedImpressos(loaded.unlockedImpressos);
      setSessionStatus(loaded.status);
      setResultShared(loaded.resultShared);

      // Carregar conteúdo do checklist
      try {
        const checklistContent = await getChecklistContentByIdAsync(
          loaded.checklistId
        );
        setContent(checklistContent);
      } catch {
        setContent(defaultChecklistContent);
      }

      setIsLoading(false);
      
      // Mostrar modal de entrada se ainda não entrou
      if (!loaded.avaliadoName) {
        setShowJoinModal(true);
      } else {
        setHasJoined(true);
      }
    };

    initSession();
  }, [sessionCode, searchParams, loadSession, createSessionFromData, navigate]);

  const handleJoinSession = useCallback((name: string) => {
    if (!sessionCode) return;
    
    updateSession({ avaliadoName: name });
    broadcastAvaliadoConnected(sessionCode, name);
    setShowJoinModal(false);
    setHasJoined(true);
    toast.success("Conectado à sessão!");
  }, [sessionCode, updateSession, broadcastAvaliadoConnected]);

  const toggleImpresso = (impressoId: number) => {
    setExpandedImpressos((prev) => {
      const next = new Set(prev);
      if (next.has(impressoId)) {
        next.delete(impressoId);
      } else {
        next.add(impressoId);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Conectando à sessão...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!session) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Sessão não encontrada</p>
            <Button onClick={() => navigate("/")}>Voltar ao início</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Modal de entrada
  if (showJoinModal) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <JoinSessionModal
            open={showJoinModal}
            checklistTitle={session.checklistTitle}
            onJoin={handleJoinSession}
          />
        </div>
      </AppLayout>
    );
  }

  // Tela de resultado (quando compartilhado)
  if (sessionStatus === "finalizado" && resultShared) {
    return (
      <AppLayout>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AreaBadge areaCode={session.areaCode as AreaCode} />
              <h1 className="text-lg font-semibold text-foreground">
                {session.checklistTitle}
              </h1>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                Finalizado
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">
              Resultado da Avaliação
            </h2>
            <ResultSummary
              items={content.evaluationItems}
              scores={session.scores}
              totalScore={session.totalScore}
              maxScore={session.maxScore}
              mode="avaliado"
            />
          </div>
        </div>
      </AppLayout>
    );
  }

  // Tela de finalizado (sem resultado compartilhado)
  if (sessionStatus === "finalizado") {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Avaliação Finalizada
            </h2>
            <p className="text-muted-foreground mb-6">
              Aguarde o avaliador compartilhar o resultado.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Estação</p>
              <p className="font-medium text-foreground">
                {session.checklistTitle}
              </p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Impressos liberados
  const impressosLiberados = content.impressos.filter((imp) =>
    unlockedImpressos.includes(imp.id)
  );

  // Tela principal - Aguardando ou Em andamento
  return (
    <AppLayout>
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AreaBadge areaCode={session.areaCode as AreaCode} />
              </div>
              <span className="bg-primary/20 text-primary text-xs px-3 py-1.5 rounded">
                {session.code}
              </span>
            </div>

            {/* Cenário de atuação */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Cenário de atuação</span>
                </div>
              </div>

              {/* Se aguardando, mostra a porta */}
              {sessionStatus === "aguardando" ? (
                <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                  {/* Porta animada */}
                  <div className="relative mb-6">
                    <div className="w-32 h-48 bg-primary/80 rounded-t-3xl border-4 border-primary flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">1</div>
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        <div className="w-8 h-16 bg-primary/60 rounded-sm border border-primary/40"></div>
                        <div className="w-8 h-16 bg-primary/60 rounded-sm border border-primary/40"></div>
                      </div>
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        <div className="w-8 h-16 bg-primary/60 rounded-sm border border-primary/40 flex flex-col gap-1 p-1">
                          <div className="flex-1 bg-primary/40 rounded-sm"></div>
                          <div className="flex-1 bg-primary/40 rounded-sm"></div>
                        </div>
                        <div className="w-8 h-16 bg-primary/60 rounded-sm border border-primary/40 flex flex-col gap-1 p-1">
                          <div className="flex-1 bg-primary/40 rounded-sm"></div>
                          <div className="flex-1 bg-primary/40 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-center">
                    Aguardando o avaliador iniciar a estação...
                  </p>
                </div>
              ) : (
                <div className="p-5 space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p>
                      <span className="text-foreground font-medium">
                        Nível de atenção:
                      </span>{" "}
                      {content.scenario.nivel}.
                    </p>
                    <p>
                      <span className="text-foreground font-medium">
                        Tipo de atendimento:
                      </span>{" "}
                      {content.scenario.tipo}.
                    </p>
                  </div>

                  <div>
                    <p className="text-foreground mb-2">
                      A unidade possui a seguinte infraestrutura:
                    </p>
                    {content.scenario.situacao.map((item, idx) => (
                      <p key={idx}>-{item}</p>
                    ))}
                  </div>

                  <div className="pt-2">
                    <p className="text-foreground font-medium mb-2">
                      DESCRIÇÃO DO CASO:
                    </p>
                    {content.scenario.descricao.map((item, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nos 10 Min. minutos de duração da estação */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg mb-6 overflow-hidden">
              <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <ListChecks className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    ⏱ Nos 10 Min. minutos de duração da estação, você deverá
                    executar as seguintes tarefas:
                  </span>
                </div>
              </div>

              {sessionStatus !== "aguardando" && (
                <div className="p-5 space-y-1 text-sm text-muted-foreground">
                  {content.orientacoes.map((item, idx) => (
                    <p key={idx}>-{item}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Impressos Section - Apenas os liberados (quando em andamento) */}
            {sessionStatus !== "aguardando" && impressosLiberados.length > 0 && (
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  📄 Impressos Disponíveis
                </h3>
                {impressosLiberados.map((impresso) => {
                  const isExpanded = expandedImpressos.has(impresso.id);
                  return (
                    <div
                      key={impresso.id}
                      className="bg-card border border-green-500/30 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleImpresso(impresso.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                      >
                        <span className="text-sm text-foreground">
                          {impresso.title}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Unlock className="w-4 h-4 text-white" />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="p-4 border-t border-border/30 text-sm text-muted-foreground">
                          {impresso.content ? (
                            <div className="whitespace-pre-wrap">{impresso.content}</div>
                          ) : impresso.image ? (
                            <img
                              src={impresso.image}
                              alt={impresso.title}
                              className="max-w-full rounded-lg"
                            />
                          ) : (
                            <p className="italic">Conteúdo do {impresso.title}...</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-72 border-l border-border bg-card p-4 flex flex-col gap-4">
            {/* Timer */}
            <div className="text-center">
              <div
                className={`text-2xl font-mono py-3 px-6 rounded-lg ${
                  timeRemaining <= 60 && sessionStatus !== "aguardando"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center justify-between text-sm border-b border-border pb-3">
              <span className="text-muted-foreground">⏱ Relógio</span>
              <span className="text-foreground">10 Min.</span>
            </div>

            {/* Impressos */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Impressos
              </p>
              <Button variant="outline" className="w-full text-sm" disabled>
                {impressosLiberados.length > 0
                  ? `${impressosLiberados.length} Impresso(s)`
                  : "Nenhum Impresso"}
              </Button>
            </div>

            {/* Participantes */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Participantes
              </p>
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">▸</span>
                  <span className="text-foreground">
                    {session.avaliadoName || "Você"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
