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
import { calculatePercentage } from '@/lib/avaliacao-utils';
import { toast } from 'sonner';

export default function AvaliacaoAvaliador() {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const navigate = useNavigate();
  
  const [content, setContent] = useState<ChecklistContent>(defaultChecklistContent);
  const [isLoading, setIsLoading] = useState(true);
  const [avaliadoConnectedBroadcast, setAvaliadoConnectedBroadcast] = useState(false);
  const [avaliadoNameBroadcast, setAvaliadoNameBroadcast] = useState<string>();
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  const {
    session,
    loadSession,
    updateSession,
    setScore,
    unlockImpresso,
    lockImpresso,
    getSessionLink,
  } = useAvaliacaoSession();

  // Derivar estado de conexão do avaliado tanto do broadcast quanto do DB
  const avaliadoConnected = avaliadoConnectedBroadcast || !!session?.avaliadoName;
  const avaliadoName = avaliadoNameBroadcast || session?.avaliadoName;

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
    broadcastResultData,
  } = useAvaliacaoSync({
    sessionCode: sessionCode,
    onAvaliadoConnected: (name) => {
      setAvaliadoConnectedBroadcast(true);
      setAvaliadoNameBroadcast(name);
      toast.success('Avaliado conectado!', { description: name });
    },
  });

  // Carregar sessão existente ou criar nova
  useEffect(() => {
    const initSession = async () => {
      setIsLoading(true);

      if (sessionCode) {
        // Tentar carregar sessão existente
        const loaded = await loadSession(sessionCode);
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
  const handleStart = useCallback(async () => {
    if (!session) return;
    
    start();
    const now = Date.now();
    setSessionStartTime(now);
    await updateSession({ status: 'em_andamento', startedAt: now });
    broadcastSessionStarted(session.code);
    toast.success('Avaliação iniciada!');
  }, [session, start, updateSession, broadcastSessionStarted]);

  const handlePause = useCallback(async () => {
    if (!session) return;
    
    pause();
    await updateSession({ status: 'pausado' });
    broadcastSessionPaused(session.code);
  }, [session, pause, updateSession, broadcastSessionPaused]);

  const handleResume = useCallback(async () => {
    if (!session) return;
    
    resume();
    await updateSession({ status: 'em_andamento' });
    broadcastSessionResumed(session.code);
  }, [session, resume, updateSession, broadcastSessionResumed]);

  const handleFinish = useCallback(async () => {
    if (!session) return;
    
    stop();
    await updateSession({ status: 'finalizado', finishedAt: Date.now() });
    broadcastSessionFinished(session.code);
    
    // NÃO salvamos métricas aqui - as estatísticas são do AVALIADO, não do avaliador
    // Os dados serão enviados para o avaliado quando o resultado for compartilhado
    
    toast.success('Avaliação finalizada!');
  }, [session, stop, updateSession, broadcastSessionFinished]);

  const handleToggleImpresso = useCallback(async (impressoId: number) => {
    if (!session) return;
    
    const isUnlocked = session.unlockedImpressos.includes(impressoId);
    
    if (isUnlocked) {
      await lockImpresso(impressoId);
      broadcastImpressoLocked(session.code, impressoId);
    } else {
      await unlockImpresso(impressoId);
      broadcastImpressoUnlocked(session.code, impressoId);
      toast.success('Impresso liberado para o avaliado');
    }
  }, [session, unlockImpresso, lockImpresso, broadcastImpressoUnlocked, broadcastImpressoLocked]);

  const handleShareResult = useCallback(async () => {
    if (!session) return;
    
    // Calcular duração da sessão
    const durationSeconds = sessionStartTime 
      ? Math.floor((Date.now() - sessionStartTime) / 1000)
      : 600 - session.timeRemaining;
    
    // Calcular porcentagem
    const percentage = session.maxScore > 0 
      ? (session.totalScore / session.maxScore) * 100 
      : 0;
    
    // Enviar dados do resultado para o avaliado salvar nas estatísticas dele
    broadcastResultData(session.code, {
      checklistId: session.checklistId,
      checklistTitle: session.checklistTitle,
      areaCode: session.areaCode,
      totalScore: session.totalScore,
      maxScore: session.maxScore,
      percentage: percentage,
      durationSeconds: durationSeconds,
      scores: session.scores,
    });
    
    await updateSession({ resultShared: true });
    broadcastResultShared(session.code);
    toast.success('Resultado compartilhado com o avaliado');
  }, [session, sessionStartTime, updateSession, broadcastResultShared, broadcastResultData]);

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
              <div className="p-5 space-y-4">
                {/* Info cards em grid */}
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
                
                {/* Infraestrutura */}
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

                {/* Descrição do caso */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-xs text-primary uppercase tracking-wide font-medium mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Descrição do caso
                  </p>
                  <div className="space-y-2">
                    {content.scenario.descricao.map((item, idx) => (
                      <p key={idx} className="text-sm text-foreground/90 leading-relaxed">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tarefas da Estação */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <ListChecks className="w-4 h-4" />
                  <span className="text-sm font-medium">Tarefas da Estação (10 minutos)</span>
                </div>
              </div>
              <div className="p-5">
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
