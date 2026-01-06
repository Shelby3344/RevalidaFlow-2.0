import { BadgeType, BADGE_CONFIG } from '@/types/community';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AchievementBadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function AchievementBadge({ 
  badge, 
  size = 'md', 
  showLabel = false,
  animated = false,
  className 
}: AchievementBadgeProps) {
  const config = BADGE_CONFIG[badge];
  
  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-7 h-7 text-sm',
    lg: 'w-10 h-10 text-lg'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              'inline-flex items-center justify-center rounded-full',
              sizeClasses[size],
              animated && badge === 'studying_now' && 'animate-pulse',
              className
            )}
            style={{ 
              backgroundColor: `${config.color}20`,
              border: `1px solid ${config.color}40`
            }}
          >
            <span>{config.icon}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-center">
            <p className="font-semibold">{config.name}</p>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface BadgeGridProps {
  badges: BadgeType[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
  className?: string;
}

export function BadgeGrid({ badges, size = 'sm', maxDisplay = 5, className }: BadgeGridProps) {
  const displayBadges = badges.slice(0, maxDisplay);
  const remaining = badges.length - maxDisplay;

  if (badges.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {displayBadges.map((badge) => (
        <AchievementBadge 
          key={badge} 
          badge={badge} 
          size={size}
          animated={badge === 'studying_now'}
        />
      ))}
      {remaining > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={cn(
                  'inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground',
                  size === 'sm' && 'w-5 h-5 text-[10px]',
                  size === 'md' && 'w-7 h-7 text-xs',
                  size === 'lg' && 'w-10 h-10 text-sm'
                )}
              >
                +{remaining}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <div className="space-y-1">
                {badges.slice(maxDisplay).map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs">
                    <span>{BADGE_CONFIG[badge].icon}</span>
                    <span>{BADGE_CONFIG[badge].name}</span>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

interface StudyingNowBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StudyingNowBadge({ size = 'sm', className }: StudyingNowBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1'
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-green-500/20 text-green-500 font-medium animate-pulse',
        sizeClasses[size],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Estudando
    </span>
  );
}
