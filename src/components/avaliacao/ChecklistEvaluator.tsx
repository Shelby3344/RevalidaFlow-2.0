import { ChecklistEvaluationItem } from '@/types/checklists';
import { ItemScore } from '@/types/avaliacao';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Minus, X } from 'lucide-react';

interface ChecklistEvaluatorProps {
  items: ChecklistEvaluationItem[];
  scores: Record<number, ItemScore>;
  onScoreChange: (itemId: number, score: number, type: ItemScore['type']) => void;
  disabled?: boolean;
}

export function ChecklistEvaluator({
  items,
  scores,
  onScoreChange,
  disabled = false,
}: ChecklistEvaluatorProps) {
  const getSelectedType = (itemId: number): ItemScore['type'] | null => {
    return scores[itemId]?.type || null;
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const selectedType = getSelectedType(item.id);
        const hasPartial = item.scoring.partial && item.scoring.partial !== '—';

        return (
          <div
            key={item.id}
            className="bg-card border border-border rounded-lg p-4 space-y-3"
          >
            {/* Título e subitens */}
            <div>
              <p className="text-foreground font-medium">{item.title}</p>
              {item.subItems.length > 0 && (
                <div className="mt-2 space-y-1">
                  {item.subItems.map((subItem, idx) => (
                    <p key={idx} className="text-muted-foreground text-xs">
                      {subItem}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Critérios de avaliação */}
            <div className="text-xs space-y-1 border-t border-border/30 pt-2">
              <p>
                <span className="text-green-400 font-semibold">Adequado:</span>{' '}
                <span className="text-muted-foreground">{item.scoring.adequate}</span>
              </p>
              {hasPartial && (
                <p>
                  <span className="text-amber-400 font-semibold">Parcial:</span>{' '}
                  <span className="text-muted-foreground">{item.scoring.partial}</span>
                </p>
              )}
              <p>
                <span className="text-red-400 font-semibold">Inadequado:</span>{' '}
                <span className="text-muted-foreground">{item.scoring.inadequate}</span>
              </p>
            </div>

            {/* Botões de pontuação */}
            <div className="flex gap-2 pt-2">
              {/* Adequado */}
              <Button
                size="sm"
                variant={selectedType === 'adequate' ? 'default' : 'outline'}
                className={cn(
                  'flex-1 gap-1',
                  selectedType === 'adequate' && 'bg-green-600 hover:bg-green-700'
                )}
                onClick={() => onScoreChange(item.id, item.scores.max, 'adequate')}
                disabled={disabled}
              >
                <Check className="w-3 h-3" />
                <span className="text-xs">{item.scores.max.toFixed(1)}</span>
              </Button>

              {/* Parcial */}
              {hasPartial && (
                <Button
                  size="sm"
                  variant={selectedType === 'partial' ? 'default' : 'outline'}
                  className={cn(
                    'flex-1 gap-1',
                    selectedType === 'partial' && 'bg-amber-600 hover:bg-amber-700'
                  )}
                  onClick={() => onScoreChange(item.id, item.scores.partial, 'partial')}
                  disabled={disabled}
                >
                  <Minus className="w-3 h-3" />
                  <span className="text-xs">{item.scores.partial.toFixed(1)}</span>
                </Button>
              )}

              {/* Inadequado */}
              <Button
                size="sm"
                variant={selectedType === 'inadequate' ? 'default' : 'outline'}
                className={cn(
                  'flex-1 gap-1',
                  selectedType === 'inadequate' && 'bg-red-600 hover:bg-red-700'
                )}
                onClick={() => onScoreChange(item.id, item.scores.min, 'inadequate')}
                disabled={disabled}
              >
                <X className="w-3 h-3" />
                <span className="text-xs">{item.scores.min.toFixed(1)}</span>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
