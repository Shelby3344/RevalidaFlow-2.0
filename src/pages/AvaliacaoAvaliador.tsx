import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { MessageSquare, ListChecks, AlignLeft } from 'lucide-react';
import { AreaBadge } from '@/components/AreaBadge';
import { AreaCode } from '@/data/checklists';
import { getChecklistContentByIdAsync, defaultChecklistContent } from '@/data/checklistContents';
import { ChecklistContent } from '@/types/checklists';
import { SessionLinkPanel } from '@/components/avaliacao/SessionLinkPanel';
import { TimerDisplay } from '@/components/avaliacao/TimerDisplay';
import { ChecklistEvaluator } from '@/components/avaliacao/ChecklistEvaluator';
import { ImpressoItem } from '@/components/avaliacao/ImpressoItem';
import { ResultSummary } from '@/components/avaliacao/ResultSummary';
import { AnaliseResultadosLocal } from '@/components/avaliacao/AnaliseResultadosLocal';
import { useAvaliacaoSession } from '@/hooks/useAvaliacaoSession';
import { useAvaliacaoTimer } from '@/hooks/useAvaliacaoTimer';
import { useAvaliacaoSync } from '@/hooks/useAvaliacaoSync';
import { useChecklistMetrics } from '@/hooks/useChecklistMetrics';
import { calculatePercentage } from '@/lib/avaliacao-utils';
import { toast } from 'sonner';

export default function AvaliacaoAvaliador() {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const navigate = useNavigate();
  
  const [content, setContent] = useState<ChecklistContent>(defaultChecklistContent);
  const [isLoading, setIsLoading] = useState(true);
  const [avaliadoConnected, setAvaliadoConnected] = useState(false);
  const [avaliadoName, setAvaliadoName] = useState<string>();

  // Hook para métricas do usuário
  const { recordAttempt } = useChecklistMetrics();

  const {
    session,
    loadSession,
    updateSession,
    setScore,
    unlockImpresso,
    lockImpresso,
    getSessionLink,
  } = useAvaliacaoSession();

  const {
    timeRemaining,
    isRunning,
    isPaused,
    isFinished,
    start,
    pause,
    resume,
    stop,
    setTime,
  } = useAvaliacaoTimer({
    initialTime: session?.timeRemaining || 600,
    onTick: (time) => {
      if (session) {
        updateSession({ timeRemaining: time });
        broadcastTimerTick(session.code, time);
      }
    },
    onFinish: () => {
      if (session) {
        handleFinish();
      }
    },
  });

  const {
    broadcastTimerTick,
    broadcastImpressoUnlocked,
    broadcastImpressoLocked,
    broadcastSessionStarted,
    broadcastSessionPaused,
    broadcastSessionResumed,
    broadcastSessionFinished,
    broadcastResultShared,
  } = useAvaliacaoSync({
    sessionCode: session?.code,
    onAvaliadoConnected: (name) => {
      setAvaliadoConnected(true);
      setAvaliadoName(name);
      toast.success('Avaliado conectado!', { description: name });
    },
  });

  // Carregar sessão existente ou criar nova
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);

      if (sessionCode) {
        // Tentar carregar sessão existente
        const loaded = loadSession(sessionCode);
        if (loaded) {
          setTime(loaded.timeRemaining);
          // Carregar conteúdo do checklist
          try {
            const checklistContent = await getChecklistContentByIdAsync(loaded.checklistId);
            setContent(checklistContent);
          } catch {
            setContent(defaultChecklistContent);
          }
        } else {
          toast.error('Sessão não encontrada');
          navigate('/checklists');
          return;
        }
      }

      setIsLoading(false);
    };

    initSession();
  }, [sessionCode, loadSession, navigate, setTime]);

  // Handlers
  const handleStart = useCallback(() => {
    if (!session) return;
    
    start();
    updateSession({ status: 'em_andamento', startedAt: Date.now() });
    broadcastSessionStarted(session.code);
    toast.success('Avaliação iniciada!');
  }, [session, start, updateSession, broadcastSessionStarted]);

  const handlePause = useCallback(() => {
    if (!session) return;
    
    pause();
    updateSession({ status: 'pausado' });
    broadcastSessionPaused(session.code);
  }, [session, pause, updateSession, broadcastSessionPaused]);

  const handleResume = useCallback(() => {
    if (!session) return;
    
    resume();
    updateSession({ status: 'em_andamento' });
    broadcastSessionResumed(session.code);
  }, [session, resume, updateSession, broadcastSessionResumed]);

  const handleFinish = useCallback(() => {
    if (!session) return;
    
    stop();
    updateSession({ status: 'finalizado', finishedAt: Date.now() });
    broadcastSessionFinished(session.code);
    
    // Salvar métrica do usuário
    if (session.checklistId) {
      const totalScore = Object.values(session.scores).reduce((sum, s) => sum + s.score, 0);
      const maxScore = content.evaluationItems.reduce((sum, item) => sum + item.scores.max, 0);
      if (maxScore > 0) {
        const scorePercentage = (totalScore / maxScore) * 10; // Converte para escala de 0-10
        recordAttempt(session.checklistId, Math.round(scorePercentage * 100) / 100);
      }
    }
    
    toast.success('Avaliação finalizada!');
  }, [session, stop, updateSession, broadcastSessionFinished, content.evaluationItems, recordAttempt]);

  const handleToggleImpresso = useCallback((impressoId: number) => {
    if (!session) return;
    
    const isUnlocked = session.unlockedImpressos.includes(impressoId);
    
    if (isUnlocked) {
      lockImpresso(impressoId);
      broadcastImpressoLocked(session.code, impressoId);
    } else {
      unlockImpresso(impressoId);
      broadcastImpressoUnlocked(session.code, impressoId);
      toast.success('Impresso liberado para o avaliado');
    }
  }, [session, unlockImpresso, lockImpresso, broadcastImpressoUnlocked, broadcastImpressoLocked]);

  const handleShareResult = useCallback(() => {
    if (!session) return;
    
    updateSession({ resultShared: true });
    broadcastResultShared(session.code);
    toast.success('Resultado compartilhado com o avaliado');
  }, [session, updateSession, broadcastResultShared]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando sessão...</p>
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
            <Button onClick={() => navigate('/checklists')}>Voltar</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const isSessionFinished = session.status === 'finalizado' || isFinished;

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
                <h1 className="text-lg font-semibold text-foreground">
                  {session.checklistTitle}
                </h1>
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
                  <p><span className="text-foreground italic">Nível de atenção:</span> {content.scenario.nivel}</p>
                  <p><span className="text-foreground italic">Tipo de atendimento:</span> {content.scenario.tipo}</p>
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
                    <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Instruções dos 10 min */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <ListChecks className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Nos 10 Min. de duração da estação, você deverá executar as seguintes tarefas:
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1 text-sm text-muted-foreground">
                {content.orientacoes.map((item, idx) => (
                  <p key={idx}>-{item}</p>
                ))}
              </div>
            </div>

            {/* Impressos */}
            {content.impressos.length > 0 && (
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Impressos</h3>
                {content.impressos.map((impresso) => (
                  <ImpressoItem
                    key={impresso.id}
                    impresso={impresso}
                    mode="avaliador"
                    isUnlocked={session.unlockedImpressos.includes(impresso.id)}
                    onToggleLock={handleToggleImpresso}
                  />
                ))}
              </div>
            )}

            {/* Checklist ou Resultado */}
            {isSessionFinished ? (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Resultado da Avaliação</h3>
                <ResultSummary
                  items={content.evaluationItems}
                  scores={session.scores}
                  totalScore={session.totalScore}
                  maxScore={session.maxScore}
                  mode="avaliador"
                  resultShared={session.resultShared}
                  onShareResult={handleShareResult}
                />
                
                {/* Botão de Análise de Resultados */}
                <div className="mt-6">
                  <AnaliseResultadosLocal
                    items={content.evaluationItems}
                    scores={session.scores}
                    totalScore={session.totalScore}
                    maxScore={session.maxScore}
                    checklistTitle={session.checklistTitle}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
                <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                  <div className="flex items-center gap-2 text-primary">
                    <AlignLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">CHECKLIST (PEP)</span>
                  </div>
                </div>
                <div className="p-5">
                  <ChecklistEvaluator
                    items={content.evaluationItems}
                    scores={session.scores}
                    onScoreChange={setScore}
                    disabled={session.status === 'aguardando'}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-border bg-card p-4 flex flex-col gap-4 overflow-auto">
            {/* Timer */}
            <TimerDisplay
              timeRemaining={timeRemaining}
              isRunning={isRunning}
              isPaused={isPaused}
              isFinished={isSessionFinished}
              mode="avaliador"
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleFinish}
            />

            {/* Link Panel */}
            <SessionLinkPanel
              sessionCode={session.code}
              sessionLink={getSessionLink(session.code)}
              avaliadoConnected={avaliadoConnected}
              avaliadoName={avaliadoName}
            />

            {/* Resultado parcial */}
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Resultado</p>
              <p className="text-lg font-bold text-foreground">
                {session.totalScore.toFixed(2)} / {session.maxScore.toFixed(2)}
              </p>
              <p className="text-sm text-primary">
                {calculatePercentage(session.totalScore, session.maxScore).toFixed(1)}%
              </p>
            </div>

            {/* Participantes */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2">Participantes</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-foreground">{session.avaliadorName}</span>
                  <span className="text-xs text-muted-foreground">(Avaliador)</span>
                </div>
                {avaliadoConnected && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-foreground">{avaliadoName || 'Avaliado'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
