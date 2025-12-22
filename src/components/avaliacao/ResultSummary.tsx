import { Button } from '@/components/ui/button';
import { ChecklistEvaluationItem } from '@/types/checklists';
import { ItemScore } from '@/types/avaliacao';
import { calculatePercentage } from '@/lib/avaliacao-utils';
import { Share2, Check, Minus, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultSummaryProps {
  items: ChecklistEvaluationItem[];
  scores: Record<number, ItemScore>;
  totalScore: number;
  maxScore: number;
  mode: 'avaliador' | 'avaliado';
  resultShared?: boolean;
  onShareResult?: () => void;
}

export function ResultSummary({
  items,
  scores,
  totalScore,
  maxScore,
  mode,
  resultShared = false,
  onShareResult,
}: ResultSummaryProps) {
  const percentage = calculatePercentage(totalScore, maxScore);
  const isApproved = percentage >= 60;

  const getScoreIcon = (type: ItemScore['type'] | null) => {
    switch (type) {
      case 'adequate':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'partial':
        return <Minus className="w-4 h-4 text-amber-500" />;
      case 'inadequate':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <span className="w-4 h-4 text-muted-foreground">-</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Resultado principal */}
      <div
        className={cn(
          'text-center p-6 rounded-lg',
          isApproved ? 'bg-green-500/10' : 'bg-red-500/10'
        )}
      >
        <Trophy
          className={cn(
            'w-12 h-12 mx-auto mb-3',
            isApproved ? 'text-green-500' : 'text-red-500'
          )}
        />
        <h3 className="text-2xl font-bold text-foreground mb-1">
          {totalScore.toFixed(2)} / {maxScore.toFixed(2)}
        </h3>
        <p
          className={cn(
            'text-3xl font-bold',
            isApproved ? 'text-green-500' : 'text-red-500'
          )}
        >
          {percentage.toFixed(1)}%
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {isApproved ? 'Aprovado' : 'Reprovado'}
        </p>
      </div>

      {/* Botão compartilhar (apenas avaliador) */}
      {mode === 'avaliador' && onShareResult && (
        <Button
          className="w-full"
          variant={resultShared ? 'outline' : 'default'}
          onClick={onShareResult}
          disabled={resultShared}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {resultShared ? 'Resultado Compartilhado' : 'Compartilhar com Avaliado'}
        </Button>
      )}

      {/* Lista de itens avaliados */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Pontuação por Item</h4>
        <div className="space-y-1">
          {items.map((item) => {
            const score = scores[item.id];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-secondary/30 rounded text-sm"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getScoreIcon(score?.type || null)}
                  <span className="truncate text-muted-foreground">
                    {item.title}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-mono text-xs ml-2',
                    score?.type === 'adequate' && 'text-green-500',
                    score?.type === 'partial' && 'text-amber-500',
                    score?.type === 'inadequate' && 'text-red-500',
                    !score && 'text-muted-foreground'
                  )}
                >
                  {score ? score.score.toFixed(1) : '-'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
