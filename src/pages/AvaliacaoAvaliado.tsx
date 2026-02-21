import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { MessageSquare, ListChecks, Lock, Unlock, ClipboardList, Stethoscope, FileText } from "lucide-react";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
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
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { ResultData } from "@/types/avaliacao";
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
  const [resultSaved, setResultSaved] = useState(false);

  const { session, loadSession, updateSession, createSessionFromData } = useAvaliacaoSession();
  const { saveAttempt } = useUserData();
  const { user } = useAuth();

  // Sincronizar status da sessão a partir de mudanças no DB (fallback se broadcast falhar)
  useEffect(() => {
    if (!session) return;
    const dbStatus = session.status;
    if (dbStatus && dbStatus !== sessionStatus) {
      setSessionStatus(dbStatus);
      if (dbStatus === 'em_andamento' && sessionStatus === 'aguardando') {
        toast.success('Avaliação iniciada!', { description: 'Boa sorte!' });
      } else if (dbStatus === 'finalizado' && sessionStatus !== 'finalizado') {
        toast.success('Avaliação finalizada!');
      }
    }
    if (session.resultShared && !resultShared) {
      setResultShared(true);
    }
    if (session.avaliadoName && !hasJoined) {
      setHasJoined(true);
    }
  }, [session?.status, session?.resultShared, session?.avaliadoName]);

  // Função para salvar estatísticas do avaliado
  const saveAvaliadoStats = useCallback(async (resultData: ResultData) => {
    if (resultSaved) return; // Evitar salvar duplicado
    
    try {
      await saveAttempt({
        checklist_id: resultData.checklistId,
        checklist_title: resultData.checklistTitle,
        area_code: resultData.areaCode,
        score: resultData.totalScore,
        max_score: resultData.maxScore,
        percentage: resultData.percentage,
        duration_seconds: resultData.durationSeconds,
      });
      
      setResultSaved(true);
      toast.success('Seu resultado foi salvo no seu perfil!');
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error);
      toast.error('Erro ao salvar estatísticas');
    }
  }, [saveAttempt, resultSaved]);

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
      toast.success("Resultado disponível!");
    },
    onResultData: (resultData: ResultData) => {
      // Atualizar sessão local com os scores recebidos do avaliador
      if (session) {
        updateSession({
          scores: resultData.scores,
          totalScore: resultData.totalScore,
          maxScore: resultData.maxScore,
          resultShared: true,
        });
      }
      // Salvar estatísticas no perfil do avaliado
      saveAvaliadoStats(resultData);
    },
  });

  // Carregar sessão
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);

      try {
        if (!sessionCode) {
          toast.error("Código de sessão inválido");
          navigate("/");
          return;
        }

        // Primeiro tenta carregar do Supabase
        let loaded = await loadSession(sessionCode);
        
        // Se não encontrou, tenta criar a partir dos dados da URL
        if (!loaded) {
          const encodedData = searchParams.get('data');
          if (encodedData) {
            const sessionData = decodeSessionData(encodedData);
            if (sessionData) {
              loaded = await createSessionFromData(sessionCode, sessionData);
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

        // Mostrar modal de entrada se ainda não entrou
        if (!loaded.avaliadoName) {
          setShowJoinModal(true);
        } else {
          setHasJoined(true);
        }
      } catch (error) {
        console.error('Erro ao inicializar sessão:', error);
        toast.error("Erro ao conectar à sessão");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, [sessionCode, searchParams, loadSession, createSessionFromData, navigate]);

  const handleJoinSession = useCallback(async (name: string) => {
    if (!sessionCode) return;
    
    // Setar avaliado_id e avaliado_name para que a RLS permita acesso após mudança de status
    const updates: any = { avaliadoName: name };
    if (user?.id) {
      updates.avaliadoId = user.id;
    }
    await updateSession(updates);
    broadcastAvaliadoConnected(sessionCode, name);
    setShowJoinModal(false);
    setHasJoined(true);
    toast.success("Conectado à sessão!");
  }, [sessionCode, updateSession, broadcastAvaliadoConnected, user]);

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
            {/* === INSTRUÇÕES AO PARTICIPANTE === */}
            <div className="bg-[#1a2040] border border-primary/30 rounded-lg px-4 py-2 mb-3">
              <div className="flex items-center gap-2 text-primary">
                <ClipboardList className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">INSTRUÇÕES AO PARTICIPANTE</span>
              </div>
            </div>

            {/* Cenário */}
            <div className="bg-card border border-border rounded-lg mb-3 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-2">
                <div className="flex items-center gap-2 text-primary">
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-sm font-medium">Cenário de Atendimento</span>
                </div>
              </div>

              {/* Se aguardando, mostra a porta */}
              {sessionStatus === "aguardando" ? (
                <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="relative mb-6">
                    <div className="w-32 h-48 bg-primary/80 rounded-t-3xl border-4 border-primary flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">1</div>
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
                <div className="p-4 text-sm text-muted-foreground">
                  {content.rawCenario ? (
                    <MarkdownRenderer content={content.rawCenario} />
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-secondary/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Nível de atenção</p>
                          <p className="text-sm text-foreground font-medium">{content.scenario.nivel}</p>
                        </div>
                        <div className="bg-secondary/30 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tipo de atendimento</p>
                          <p className="text-sm text-foreground font-medium">{content.scenario.tipo}</p>
                        </div>
                      </div>
                      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                        <p className="text-xs text-cyan-400 uppercase tracking-wide font-medium mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                          Infraestrutura disponível
                        </p>
                        <div className="grid gap-1.5">
                          {content.scenario.situacao.map((item, idx) => (
                            <p key={idx} className="text-sm text-foreground/80 pl-3.5 flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              {item.replace(/^-+/, '').trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Descrição do Caso */}
            {sessionStatus !== "aguardando" && (
              <div className="bg-card border border-border rounded-lg mb-3 overflow-hidden">
                <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-2">
                  <div className="flex items-center gap-2 text-primary">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">Descrição do Caso</span>
                  </div>
                </div>
                <div className="p-4 text-sm text-muted-foreground">
                  {content.rawDescricao ? (
                    <MarkdownRenderer content={content.rawDescricao} />
                  ) : (
                    <div className="space-y-2">
                      {content.scenario.descricao.map((item, idx) => (
                        <p key={idx} className="text-sm text-foreground/90 leading-relaxed">{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tarefas */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-2">
                <div className="flex items-center gap-2 text-primary">
                  <ListChecks className="w-4 h-4" />
                  <span className="text-sm font-medium">Tarefas</span>
                </div>
              </div>

              {sessionStatus !== "aguardando" && (
                <div className="p-4 text-sm text-muted-foreground">
                  {content.rawTarefas ? (
                    <MarkdownRenderer content={content.rawTarefas} />
                  ) : (
                    <div className="grid gap-2">
                      {content.orientacoes
                        .filter(item => !item.toLowerCase().includes('nos 10 min') && !item.toLowerCase().includes('duração da estação'))
                        .map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-secondary/20 rounded-lg p-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-foreground/90 pt-0.5">{item.replace(/^-+/, '').trim()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* === IMPRESSOS === */}
            {sessionStatus !== "aguardando" && impressosLiberados.length > 0 && (
              <div className="space-y-3 mb-6">
                {impressosLiberados.map((impresso) => {
                  const isExpanded = expandedImpressos.has(impresso.id);
                  return (
                    <div key={impresso.id} className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="bg-[#1a2040] border-b border-primary/30 px-4 py-2 cursor-pointer hover:bg-[#1a2040]/80 transition-colors" onClick={() => toggleImpresso(impresso.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-primary">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-wide">IMPRESSO - {impresso.title.replace(/^Impresso \d+ – /, '')}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <Unlock className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="p-4 text-sm text-muted-foreground">
                          {impresso.content ? (
                            <MarkdownRenderer content={impresso.content} />
                          ) : impresso.image ? (
                            <img
                              src={impresso.image.startsWith('http') ? impresso.image : `https://storage.googleapis.com/flutterflow-prod-hosting/builds/W0O9Hpo7q2K52cAGr0p5/${impresso.image}`}
                              alt={impresso.title}
                              className="max-w-full rounded-lg border border-border"
                              loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                          ) : (
                            <p className="italic">Conteúdo do {impresso.title}...</p>
                          )}
                          {impresso.content && impresso.image && (
                            <img
                              src={impresso.image.startsWith('http') ? impresso.image : `https://storage.googleapis.com/flutterflow-prod-hosting/builds/W0O9Hpo7q2K52cAGr0p5/${impresso.image}`}
                              alt={impresso.title}
                              className="mt-3 max-w-full rounded-lg border border-border"
                              loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
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
