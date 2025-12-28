import { useState } from 'react';
import { ChecklistEvaluationItem } from '@/types/checklists';
import { ItemScore } from '@/types/avaliacao';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

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
  console.log('ChecklistEvaluator renderizado com:', { items: items.length, disabled }); // Debug
  
  // Estado para controlar quais subitens foram marcados como realizados
  const [checkedSubItems, setCheckedSubItems] = useState<Record<string, boolean>>({});

  const getSelectedType = (itemId: number): ItemScore['type'] | null => {
    return scores[itemId]?.type || null;
  };

  const toggleSubItem = (itemId: number, subItemIdx: number) => {
    const key = `${itemId}-${subItemIdx}`;
    setCheckedSubItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSubItemChecked = (itemId: number, subItemIdx: number): boolean => {
    return checkedSubItems[`${itemId}-${subItemIdx}`] || false;
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
                <div className="mt-2 space-y-2">
                  {item.subItems.map((subItem, idx) => {
                    const isChecked = isSubItemChecked(item.id, idx);
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => toggleSubItem(item.id, idx)}
                      >
                        {/* Bolinha de checklist */}
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                            isChecked
                              ? "bg-red-500 border-red-500"
                              : "border-muted-foreground/50 group-hover:border-red-400"
                          )}
                        >
                          {isChecked && (
                            <Check className="w-2.5 h-2.5 text-white" />
                          )}
                        </div>
                        {/* Texto do subitem */}
                        <p
                          className={cn(
                            "text-xs transition-colors",
                            isChecked
                              ? "text-red-500 font-medium"
                              : "text-muted-foreground"
                          )}
                        >
                          {subItem}
                        </p>
                      </div>
                    );
                  })}
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

            {/* Botões de pontuação - Formato horizontal */}
            <div className="flex justify-center gap-1 pt-2">
              {/* Inadequado - 0 */}
              <Button
                size="sm"
                variant={selectedType === 'inadequate' ? 'default' : 'outline'}
                className={cn(
                  'w-20 h-12 text-lg font-bold border-2',
                  selectedType === 'inadequate' 
                    ? 'bg-blue-600 hover:bg-blue-700 border-blue-500 text-white' 
                    : 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950'
                )}
                onClick={() => onScoreChange(item.id, item.scores.min, 'inadequate')}
                disabled={disabled}
              >
                {item.scores.min}
              </Button>

              {/* Parcial - 0.5 */}
              {hasPartial && (
                <Button
                  size="sm"
                  variant={selectedType === 'partial' ? 'default' : 'outline'}
                  className={cn(
                    'w-20 h-12 text-lg font-bold border-2',
                    selectedType === 'partial' 
                      ? 'bg-blue-600 hover:bg-blue-700 border-blue-500 text-white' 
                      : 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950'
                  )}
                  onClick={() => onScoreChange(item.id, item.scores.partial, 'partial')}
                  disabled={disabled}
                >
                  {item.scores.partial}
                </Button>
              )}

              {/* Adequado - 1 */}
              <Button
                size="sm"
                variant={selectedType === 'adequate' ? 'default' : 'outline'}
                className={cn(
                  'w-20 h-12 text-lg font-bold border-2',
                  selectedType === 'adequate' 
                    ? 'bg-blue-600 hover:bg-blue-700 border-blue-500 text-white' 
                    : 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950'
                )}
                onClick={() => onScoreChange(item.id, item.scores.max, 'adequate')}
                disabled={disabled}
              >
                {item.scores.max}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
