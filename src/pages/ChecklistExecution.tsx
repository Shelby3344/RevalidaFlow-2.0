import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Lock, MessageSquare, Clock, ListChecks, AlignLeft, Users, 
  Play, Pause, RotateCcw, Save, CheckCircle2, Loader2, 
  XCircle, AlertCircle, TrendingUp, BarChart3
} from "lucide-react";
import { checklistsData } from "@/data/checklists";
import { getChecklistContentById, getChecklistContentByIdAsync, defaultChecklistContent } from "@/data/checklistContents";
import { AreaBadge } from "@/components/AreaBadge";
import { ChecklistContent, ChecklistEvaluationItem } from "@/types/checklists";
import { CreateSessionModal } from "@/components/avaliacao/CreateSessionModal";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Tipo para armazenar a resposta de cada item
interface ItemResponse {
  itemId: number;
  itemTitle: string;
  selectedScore: number | null;
  maxScore: number;
  scoreType: 'adequate' | 'partial' | 'inadequate' | null;
}


export default function ChecklistExecution() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { saveAttempt } = useUserData();
  
  // Timer state - 10 minutos = 600 segundos
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [content, setContent] = useState<ChecklistContent>(defaultChecklistContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Estado para respostas do usuário
  const [responses, setResponses] = useState<Record<number, ItemResponse>>({});
  
  // Estado para modal de resultado
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);

  const checklist = checklistsData.find(c => c.id === id);
  const checklistTitle = checklist ? checklist.title : "Checklist não encontrado";
  
  // Estado para modal de criar sessão de avaliação
  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);

  // Calcular pontuação atual
  const { currentScore, maxScore, percentage, answeredCount, totalItems } = useMemo(() => {
    const items = content.evaluationItems;
    const totalItems = items.length;
    let currentScore = 0;
    let maxScore = 0;
    let answeredCount = 0;

    items.forEach(item => {
      maxScore += item.scores.max;
      const response = responses[item.id];
      if (response && response.selectedScore !== null) {
        currentScore += response.selectedScore;
        answeredCount++;
      }
    });

    const percentage = maxScore > 0 ? (currentScore / maxScore) * 100 : 0;
    return { currentScore, maxScore, percentage, answeredCount, totalItems };
  }, [responses, content.evaluationItems]);

  // Análise detalhada dos erros
  const errorAnalysis = useMemo(() => {
    const inadequate: ItemResponse[] = [];
    const partial: ItemResponse[] = [];
    const adequate: ItemResponse[] = [];

    Object.values(responses).forEach(response => {
      if (response.scoreType === 'inadequate') {
        inadequate.push(response);
      } else if (response.scoreType === 'partial') {
        partial.push(response);
      } else if (response.scoreType === 'adequate') {
        adequate.push(response);
      }
    });

    return { inadequate, partial, adequate };
  }, [responses]);


  // Formatar tempo em MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && !isTimerPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isTimerPaused]);

  // Controles do timer
  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setIsTimerPaused(false);
    if (!startTime) setStartTime(new Date());
  };

  const handlePauseTimer = () => {
    setIsTimerPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleResumeTimer = () => {
    setIsTimerPaused(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setIsTimerPaused(false);
    setTimeRemaining(600);
    setStartTime(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };
  
  // Carrega o conteúdo do checklist
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      const syncContent = getChecklistContentById(id || "");
      if (syncContent !== defaultChecklistContent) {
        setContent(syncContent);
        setIsLoading(false);
        return;
      }
      
      try {
        const asyncContent = await getChecklistContentByIdAsync(id || "");
        setContent(asyncContent);
      } catch (error) {
        console.error("Erro ao carregar checklist:", error);
        setContent(defaultChecklistContent);
      }
      
      setIsLoading(false);
    };
    
    loadContent();
  }, [id]);

  const [impressosState, setImpressosState] = useState(content.impressos);
  
  useEffect(() => {
    setImpressosState(content.impressos);
  }, [content]);

  const toggleImpresso = (impressoId: number) => {
    setImpressosState(prev => prev.map(imp => 
      imp.id === impressoId ? { ...imp, isOpen: !imp.isOpen } : imp
    ));
  };

  // Handler para selecionar pontuação de um item
  const handleSelectScore = (item: ChecklistEvaluationItem, score: number, type: 'adequate' | 'partial' | 'inadequate') => {
    setResponses(prev => ({
      ...prev,
      [item.id]: {
        itemId: item.id,
        itemTitle: item.title,
        selectedScore: score,
        maxScore: item.scores.max,
        scoreType: type,
      }
    }));
  };

  // Salvar resultado no Supabase
  const handleSaveResult = async () => {
    if (!checklist || answeredCount === 0) {
      toast.error("Responda pelo menos um item antes de salvar");
      return;
    }

    setIsSaving(true);
    try {
      const durationSeconds = startTime 
        ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
        : 600 - timeRemaining;

      await saveAttempt({
        checklist_id: checklist.id,
        checklist_title: checklist.title,
        area_code: checklist.areaCode,
        score: currentScore,
        max_score: maxScore,
        percentage: percentage,
        duration_seconds: durationSeconds,
      });

      // Pontos são dados automaticamente pelo trigger do banco de dados
      // 50 pts por checklist + 10 pts por hora de estudo

      setResultSaved(true);
      toast.success("Resultado salvo! +50 pontos de experiência!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar resultado");
    } finally {
      setIsSaving(false);
    }
  };

  // Finalizar e mostrar resultado
  const handleFinish = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    setShowResultModal(true);
  };


  // Componente de botão de pontuação
  const ScoreButton = ({ 
    item, 
    score, 
    type, 
    label 
  }: { 
    item: ChecklistEvaluationItem; 
    score: number; 
    type: 'adequate' | 'partial' | 'inadequate';
    label: string;
  }) => {
    const response = responses[item.id];
    const isSelected = response?.scoreType === type;
    
    const colors = {
      adequate: isSelected ? 'bg-green-500 border-green-500 text-white' : 'border-green-500 text-green-500 hover:bg-green-500/10',
      partial: isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-amber-500 text-amber-500 hover:bg-amber-500/10',
      inadequate: isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-red-500 text-red-500 hover:bg-red-500/10',
    };

    return (
      <button
        onClick={() => handleSelectScore(item, score, type)}
        className={cn(
          "w-16 h-10 border-2 rounded flex items-center justify-center font-bold text-sm transition-all",
          colors[type]
        )}
        title={label}
      >
        {score}
      </button>
    );
  };

  // Modal de Resultado
  const ResultModal = () => (
    <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Resultado da Avaliação
          </DialogTitle>
          <DialogDescription>
            {checklist?.title} - {checklist?.areaCode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Score Principal */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20">
            <div className="text-5xl font-bold text-primary mb-2">
              {(percentage / 10).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentScore} de {maxScore} pontos ({percentage.toFixed(1)}%)
            </div>
            <Progress value={percentage} className="mt-4 h-3" />
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-500">{errorAnalysis.adequate.length}</div>
              <div className="text-xs text-muted-foreground">Adequados</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-500">{errorAnalysis.partial.length}</div>
              <div className="text-xs text-muted-foreground">Parciais</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-500">{errorAnalysis.inadequate.length}</div>
              <div className="text-xs text-muted-foreground">Inadequados</div>
            </div>
          </div>

          {/* Pontos a Melhorar */}
          {(errorAnalysis.inadequate.length > 0 || errorAnalysis.partial.length > 0) && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                Pontos a Melhorar
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {errorAnalysis.inadequate.map((item) => (
                  <div key={item.itemId} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.itemTitle}</p>
                      <p className="text-xs text-red-400">Inadequado - {item.selectedScore}/{item.maxScore} pts</p>
                    </div>
                  </div>
                ))}
                {errorAnalysis.partial.map((item) => (
                  <div key={item.itemId} className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.itemTitle}</p>
                      <p className="text-xs text-amber-400">Parcial - {item.selectedScore}/{item.maxScore} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {!resultSaved ? (
              <Button 
                onClick={handleSaveResult} 
                disabled={isSaving || answeredCount === 0}
                className="flex-1 btn-primary-gradient"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Resultado
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/desempenhos')}
                className="flex-1 btn-primary-gradient"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Meus Desempenhos
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setShowResultModal(false);
                if (resultSaved) {
                  setResponses({});
                  setResultSaved(false);
                  handleResetTimer();
                }
              }}
            >
              {resultSaved ? "Refazer" : "Continuar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );


  return (
    <AppLayout>
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando checklist...</p>
          </div>
        </div>
      ) : (
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AreaBadge areaCode={checklist?.areaCode || "CM"} />
                <h1 className="text-lg font-semibold text-foreground">{checklistTitle}</h1>
              </div>
            </div>

            {/* Cenário de atuação */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Cenário de atuação</span>
                </div>
              </div>

              <div className="p-5 space-y-4 text-sm text-muted-foreground">
                <div>
                  <p><span className="text-foreground italic">Nível de atenção:</span> {content.scenario.nivel}.</p>
                  <p><span className="text-foreground italic">Tipo de atendimento:</span> {content.scenario.tipo}.</p>
                </div>
                
                <div>
                  <p className="text-foreground mb-2">A unidade possui a seguinte infraestrutura:</p>
                  {content.scenario.situacao.map((item, idx) => (
                    <p key={idx}>-{item}</p>
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-foreground font-medium mb-2">DESCRIÇÃO DO CASO:</p>
                  {content.scenario.descricao.map((item, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-2" : ""}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Tarefas */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <ListChecks className="w-4 h-4" />
                  <span className="text-sm font-medium">Nos 10 minutos de duração da estação, você deverá executar as seguintes tarefas:</span>
                </div>
              </div>

              <div className="p-5 space-y-1 text-sm text-muted-foreground">
                {content.orientacoes.map((item, idx) => (
                  <p key={idx}>-{item}</p>
                ))}
              </div>
            </div>

            {/* Orientações do Ator/Atriz */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Orientações do Ator/Atriz</span>
                </div>
              </div>

              <div className="p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-4">Você será o enfermeiro que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.</p>
                <p className="italic text-muted-foreground mb-6">-Olá eu me chamo Matheus, enfermeiro que o auxiliará durante todo o atendimento.</p>

                {content.instrucoes.itens.length > 0 && (
                  <div className="space-y-4">
                    {content.instrucoes.itens.map((item, idx) => {
                      const colonIndex = item.indexOf(":");
                      if (colonIndex > -1) {
                        const titulo = item.substring(0, colonIndex);
                        const resto = item.substring(colonIndex + 1).trim();
                        return (
                          <div key={idx}>
                            <p className="text-amber-400/90 font-semibold uppercase">{titulo}:</p>
                            <p className="text-amber-400/70">-{resto}</p>
                          </div>
                        );
                      }
                      return <p key={idx}>{item}</p>;
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Impressos Section */}
            <div className="space-y-2 mb-6">
              {impressosState.map((impresso) => (
                <div key={impresso.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleImpresso(impresso.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm text-foreground">{impresso.title}</span>
                    <div className={`w-8 h-8 rounded-full ${impresso.color} flex items-center justify-center`}>
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  </button>
                  {impresso.isOpen && (
                    <div className="p-4 border-t border-border/30 text-sm text-muted-foreground">
                      Conteúdo do {impresso.title}...
                    </div>
                  )}
                </div>
              ))}
            </div>


            {/* CHECKLIST (PEP) - Com botões interativos */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <AlignLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">CHECKLIST ( PEP ) - Clique para avaliar cada item</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{answeredCount}/{totalItems} respondidos</span>
                </div>
              </div>

              <div className="p-5">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase py-2">ITEM</th>
                      <th className="text-right text-xs font-semibold text-muted-foreground uppercase py-2">AVALIAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {content.evaluationItems.map((item) => {
                      const response = responses[item.id];
                      const hasPartial = item.scoring.partial && item.scoring.partial !== "—";
                      
                      return (
                        <tr key={item.id} className={cn(
                          "border-b border-border/20 transition-colors",
                          response?.scoreType === 'adequate' && "bg-green-500/5",
                          response?.scoreType === 'partial' && "bg-amber-500/5",
                          response?.scoreType === 'inadequate' && "bg-red-500/5"
                        )}>
                          <td className="py-4 pr-4">
                            <p className="text-foreground font-medium mb-2">{item.title}</p>
                            {item.subItems.length > 0 && (
                              <div className="space-y-1 mb-3">
                                {item.subItems.map((subItem, idx) => (
                                  <p key={idx} className="text-muted-foreground text-xs">{subItem}</p>
                                ))}
                              </div>
                            )}
                            <div className="space-y-1">
                              <p className="text-xs">
                                <span className="text-green-400 font-semibold">Adequado:</span>{" "}
                                <span className="text-muted-foreground">{item.scoring.adequate}</span>
                              </p>
                              {hasPartial && (
                                <p className="text-xs">
                                  <span className="text-amber-400 font-semibold">Parcialmente adequado:</span>{" "}
                                  <span className="text-muted-foreground">{item.scoring.partial}</span>
                                </p>
                              )}
                              <p className="text-xs">
                                <span className="text-red-400 font-semibold">Inadequado:</span>{" "}
                                <span className="text-muted-foreground">{item.scoring.inadequate}</span>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 text-right align-top">
                            <div className="flex justify-end">
                              <div className="flex gap-1 justify-end" style={{ minWidth: '200px' }}>
                                {/* Botão Inadequado */}
                                <ScoreButton 
                                  item={item} 
                                  score={item.scores.min} 
                                  type="inadequate"
                                  label="Inadequado"
                                />
                                
                                {/* Botão Parcial (se existir) */}
                                {hasPartial && (
                                  <ScoreButton 
                                    item={item} 
                                    score={item.scores.partial || 0} 
                                    type="partial"
                                    label="Parcialmente adequado"
                                  />
                                )}
                                
                                {/* Botão Adequado */}
                                <ScoreButton 
                                  item={item} 
                                  score={item.scores.max} 
                                  type="adequate"
                                  label="Adequado"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Botão Finalizar */}
            <Button 
              onClick={handleFinish}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg mb-6"
              disabled={answeredCount === 0}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Finalizar e Ver Resultado ({answeredCount}/{totalItems} respondidos)
            </Button>

            {/* References */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Referências bibliográficas:</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                {content.references.map((ref, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-primary">📎</span>
                    {ref}
                  </p>
                ))}
              </div>
            </div>

            {/* Feedback Button */}
            <div className="flex justify-center">
              <Button className="btn-primary-gradient flex items-center gap-2 px-8 py-6 rounded-full">
                <MessageSquare className="w-4 h-4" />
                Feedback | Erros, Dúvidas ou Sugestões
              </Button>
            </div>
          </div>


          {/* Right Sidebar */}
          <div className="w-72 border-l border-border bg-card p-4 flex flex-col gap-4">
            {/* Timer */}
            <div className="text-center">
              <div className={`text-2xl font-mono py-3 px-6 rounded-lg ${
                timeRemaining <= 60 && isTimerRunning 
                  ? 'bg-red-500/20 text-red-400 animate-pulse' 
                  : 'bg-primary text-primary-foreground'
              }`}>
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Timer Controls */}
            {!isTimerRunning ? (
              <Button 
                onClick={handleStartTimer}
                className="btn-primary-gradient w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </Button>
            ) : isTimerPaused ? (
              <div className="flex gap-2">
                <Button 
                  onClick={handleResumeTimer}
                  className="btn-primary-gradient flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continuar
                </Button>
                <Button 
                  onClick={handleResetTimer}
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={handlePauseTimer}
                  className="btn-primary-gradient flex-1"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </Button>
                <Button 
                  onClick={handleResetTimer}
                  variant="outline"
                  className="flex-shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Progress - Pontuação atual */}
            <div className="space-y-2 p-3 rounded-lg bg-secondary/30">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pontuação</span>
                <span className="font-bold text-primary">{(percentage / 10).toFixed(2)}</span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{currentScore} pts</span>
                <span>{maxScore} pts</span>
              </div>
            </div>

            {/* Resumo rápido */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-green-500/10">
                <div className="text-lg font-bold text-green-500">{errorAnalysis.adequate.length}</div>
                <div className="text-[10px] text-muted-foreground">Adequados</div>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10">
                <div className="text-lg font-bold text-amber-500">{errorAnalysis.partial.length}</div>
                <div className="text-[10px] text-muted-foreground">Parciais</div>
              </div>
              <div className="p-2 rounded-lg bg-red-500/10">
                <div className="text-lg font-bold text-red-500">{errorAnalysis.inadequate.length}</div>
                <div className="text-[10px] text-muted-foreground">Inadequados</div>
              </div>
            </div>

            {/* Botão Resultado */}
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10"
              onClick={handleFinish}
              disabled={answeredCount === 0}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Resultado
            </Button>

            {/* Avaliação em Dupla */}
            <div className="border-t border-border pt-4 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Avaliação em Dupla</p>
              <p className="text-xs text-muted-foreground">
                Crie uma sessão para treinar com um colega.
              </p>
              <Button 
                onClick={() => setShowCreateSessionModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-sm"
              >
                <Users className="w-4 h-4 mr-2" />
                Criar Sessão
              </Button>
            </div>

            {/* Legenda */}
            <div className="mt-auto pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Legenda:</p>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-muted-foreground">Adequado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-muted-foreground">Parcial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-muted-foreground">Inadequado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      
      {/* Modal de Resultado */}
      <ResultModal />
      
      {/* Modal para criar sessão de avaliação */}
      {checklist && (
        <CreateSessionModal
          open={showCreateSessionModal}
          onOpenChange={setShowCreateSessionModal}
          checklistId={checklist.id}
          checklistTitle={checklist.title}
          areaCode={checklist.areaCode}
          evaluationItems={content.evaluationItems}
        />
      )}
    </AppLayout>
  );
}
