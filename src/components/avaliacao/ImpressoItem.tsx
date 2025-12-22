import { useState } from 'react';
import { ImpressoItem as ImpressoItemType } from '@/types/checklists';
import { Lock, Unlock, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImpressoItemProps {
  impresso: ImpressoItemType;
  mode: 'avaliador' | 'avaliado';
  isUnlocked: boolean;
  onToggleLock?: (impressoId: number) => void;
}

export function ImpressoItem({
  impresso,
  mode,
  isUnlocked,
  onToggleLock,
}: ImpressoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Para avaliado: só mostrar se desbloqueado
  if (mode === 'avaliado' && !isUnlocked) {
    return null;
  }

  const handleLockClick = () => {
    if (mode === 'avaliador' && onToggleLock) {
      onToggleLock(impresso.id);
    }
  };

  const handleExpandClick = () => {
    if (isUnlocked) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg overflow-hidden transition-all',
        isUnlocked && 'border-green-500/30'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors',
          !isUnlocked && mode === 'avaliador' && 'opacity-60'
        )}
        onClick={handleExpandClick}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground">{impresso.title}</span>
          {isUnlocked && mode === 'avaliado' && (
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
              Novo
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Botão de expandir (quando desbloqueado) */}
          {isUnlocked && (
            <button className="p-1 hover:bg-secondary rounded">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          )}

          {/* Cadeado (apenas para avaliador) */}
          {mode === 'avaliador' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLockClick();
              }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                isUnlocked
                  ? 'bg-green-500 hover:bg-green-600'
                  : `${impresso.color} hover:opacity-80`
              )}
            >
              {isUnlocked ? (
                <Unlock className="w-4 h-4 text-white" />
              ) : (
                <Lock className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Conteúdo expandido */}
      {isExpanded && isUnlocked && (
        <div className="p-4 border-t border-border/30 bg-secondary/20">
          {impresso.content ? (
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">
              {impresso.content}
            </div>
          ) : impresso.image ? (
            <img
              src={impresso.image}
              alt={impresso.title}
              className="max-w-full rounded-lg"
            />
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Conteúdo do {impresso.title}...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
