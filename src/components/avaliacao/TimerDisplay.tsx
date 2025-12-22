import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Clock } from 'lucide-react';
import { formatTime } from '@/lib/avaliacao-utils';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  mode: 'avaliador' | 'avaliado';
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
}

export function TimerDisplay({
  timeRemaining,
  isRunning,
  isPaused,
  isFinished,
  mode,
  onStart,
  onPause,
  onResume,
  onStop,
}: TimerDisplayProps) {
  const isLowTime = timeRemaining <= 60 && timeRemaining > 0;
  const isVeryLowTime = timeRemaining <= 30 && timeRemaining > 0;

  return (
    <div className="space-y-3">
      {/* Display do tempo */}
      <div
        className={cn(
          'text-center py-4 px-6 rounded-lg font-mono text-3xl font-bold transition-colors',
          isFinished && 'bg-red-500/20 text-red-400',
          isVeryLowTime && !isFinished && 'bg-red-500/20 text-red-400 animate-pulse',
          isLowTime && !isVeryLowTime && !isFinished && 'bg-amber-500/20 text-amber-400',
          !isLowTime && !isFinished && 'bg-primary text-primary-foreground'
        )}
      >
        {formatTime(timeRemaining)}
      </div>

      {/* Controles (apenas para avaliador) */}
      {mode === 'avaliador' && (
        <div className="space-y-2">
          {/* Botão principal */}
          {!isRunning && !isPaused && !isFinished && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={onStart}
            >
              <Play className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
          )}

          {isRunning && (
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700"
              onClick={onPause}
            >
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
          )}

          {isPaused && !isFinished && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={onResume}
            >
              <Play className="w-4 h-4 mr-2" />
              Continuar
            </Button>
          )}

          {/* Botão terminar */}
          {(isRunning || isPaused) && !isFinished && (
            <Button
              variant="destructive"
              className="w-full"
              onClick={onStop}
            >
              <Square className="w-4 h-4 mr-2" />
              Terminar
            </Button>
          )}

          {isFinished && (
            <div className="text-center text-red-400 text-sm font-medium py-2">
              Avaliação Finalizada
            </div>
          )}
        </div>
      )}

      {/* Info para avaliado */}
      {mode === 'avaliado' && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Relógio</span>
          <span className="text-foreground font-medium">10 Min.</span>
        </div>
      )}
    </div>
  );
}
