import { UserLevel, LEVEL_THRESHOLDS, calculateLevelProgress, getPointsToNextLevel } from '@/types/community';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LevelBadgeProps {
  level: UserLevel;
  points?: number;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const LEVEL_NAMES: Record<UserLevel, string> = {
  bronze: 'Bronze',
  prata: 'Prata',
  ouro: 'Ouro',
  diamante: 'Diamante',
  elite: 'Elite'
};

export function LevelBadge({ 
  level, 
  points, 
  size = 'md', 
  showProgress = false,
  showTooltip = true,
  className 
}: LevelBadgeProps) {
  const config = LEVEL_THRESHOLDS[level];
  const progress = points !== undefined ? calculateLevelProgress(points) : 0;
  const pointsToNext = points !== undefined ? getPointsToNextLevel(points) : 0;
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-0.5',
    md: 'text-sm px-2 py-1 gap-1',
    lg: 'text-base px-3 py-1.5 gap-1.5'
  };
  
  const iconSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const badge = (
    <div 
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        className
      )}
      style={{ 
        backgroundColor: `${config.color}20`,
        color: config.color,
        border: `1px solid ${config.color}40`
      }}
    >
      <span className={iconSizes[size]}>{config.icon}</span>
      <span>{LEVEL_NAMES[level]}</span>
    </div>
  );

  if (!showTooltip) return badge;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="font-semibold flex items-center gap-2">
              <span>{config.icon}</span>
              <span>Nível {LEVEL_NAMES[level]}</span>
            </div>
            {points !== undefined && (
              <>
                <p className="text-xs text-muted-foreground">
                  {points.toLocaleString()} pontos
                </p>
                {level !== 'elite' && (
                  <>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full transition-all"
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: config.color 
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Faltam {pointsToNext.toLocaleString()} pts para o próximo nível
                    </p>
                  </>
                )}
                {level === 'elite' && (
                  <p className="text-xs text-muted-foreground">
                    Nível máximo alcançado! 👑
                  </p>
                )}
              </>
            )}
            {showProgress && points !== undefined && level !== 'elite' && (
              <div className="text-xs">
                <span className="text-muted-foreground">Próximo: </span>
                <span style={{ color: LEVEL_THRESHOLDS[getNextLevelKey(level)].color }}>
                  {LEVEL_NAMES[getNextLevelKey(level)]}
                </span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function getNextLevelKey(level: UserLevel): UserLevel {
  const levels: UserLevel[] = ['bronze', 'prata', 'ouro', 'diamante', 'elite'];
  const index = levels.indexOf(level);
  return levels[Math.min(index + 1, levels.length - 1)];
}
