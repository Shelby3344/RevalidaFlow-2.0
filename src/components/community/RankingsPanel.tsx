import { useEffect } from 'react';
import { Trophy, TrendingUp, Target, BookOpen, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRankings } from '@/hooks/useRankings';
import { useAuth } from '@/hooks/useAuth';
import { RankingFilter } from '@/types/community';
import { LevelBadge } from './LevelBadge';
import { cn } from '@/lib/utils';

interface RankingsPanelProps {
  userGoal?: string;
  userModule?: string;
  onUserClick?: (userId: string) => void;
}

export function RankingsPanel({ userGoal, userModule, onUserClick }: RankingsPanelProps) {
  const { user } = useAuth();
  const { rankings, currentUserRank, loadRanking, activeFilter, loading } = useRankings();

  useEffect(() => {
    loadRanking('top_week');
  }, [loadRanking]);

  const handleFilterChange = (filter: string) => {
    const rankingFilter = filter as RankingFilter;
    if (rankingFilter === 'same_goal' && userGoal) {
      loadRanking(rankingFilter, userGoal);
    } else if (rankingFilter === 'same_module' && userModule) {
      loadRanking(rankingFilter, userModule);
    } else {
      loadRanking(rankingFilter);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold">Rankings</h3>
      </div>

      <Tabs defaultValue="top_week" onValueChange={handleFilterChange}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="top_week" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            Semana
          </TabsTrigger>
          <TabsTrigger value="top_day" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            Hoje
          </TabsTrigger>
          <TabsTrigger value="same_goal" className="text-xs" disabled={!userGoal}>
            <Target className="w-3 h-3 mr-1" />
            Objetivo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="top_week" className="mt-3">
          <RankingList 
            rankings={rankings} 
            loading={loading}
            currentUserId={user?.id}
            onUserClick={onUserClick}
            getInitials={getInitials}
            getRankIcon={getRankIcon}
          />
        </TabsContent>

        <TabsContent value="top_day" className="mt-3">
          <RankingList 
            rankings={rankings} 
            loading={loading}
            currentUserId={user?.id}
            onUserClick={onUserClick}
            getInitials={getInitials}
            getRankIcon={getRankIcon}
          />
        </TabsContent>

        <TabsContent value="same_goal" className="mt-3">
          <RankingList 
            rankings={rankings} 
            loading={loading}
            currentUserId={user?.id}
            onUserClick={onUserClick}
            getInitials={getInitials}
            getRankIcon={getRankIcon}
          />
        </TabsContent>
      </Tabs>

      {currentUserRank && currentUserRank > 10 && (
        <div className="text-center text-sm text-muted-foreground pt-2 border-t border-border">
          Sua posição: <span className="font-semibold text-foreground">#{currentUserRank}</span>
        </div>
      )}
    </div>
  );
}


interface RankingListProps {
  rankings: any[];
  loading: boolean;
  currentUserId?: string;
  onUserClick?: (userId: string) => void;
  getInitials: (name: string | null) => string;
  getRankIcon: (rank: number) => string;
}

function RankingList({ 
  rankings, 
  loading, 
  currentUserId, 
  onUserClick,
  getInitials,
  getRankIcon 
}: RankingListProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 animate-pulse">
            <div className="w-6 h-6 rounded bg-secondary" />
            <div className="w-8 h-8 rounded-full bg-secondary" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-24 bg-secondary rounded" />
              <div className="h-2 w-16 bg-secondary rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-6">
        Nenhum dado disponível
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {rankings.map((entry) => {
        const isCurrentUser = entry.user_id === currentUserId;
        
        return (
          <button
            key={entry.user_id}
            onClick={() => onUserClick?.(entry.user_id)}
            className={cn(
              'w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left',
              isCurrentUser 
                ? 'bg-primary/10 border border-primary/30' 
                : 'hover:bg-secondary/50'
            )}
          >
            {/* Rank */}
            <div className={cn(
              'w-7 text-center font-bold',
              entry.rank <= 3 ? 'text-lg' : 'text-sm text-muted-foreground'
            )}>
              {getRankIcon(entry.rank)}
            </div>

            {/* Avatar */}
            <Avatar className="w-8 h-8">
              <AvatarImage src={entry.avatar_url || undefined} />
              <AvatarFallback className="text-xs bg-primary/20">
                {getInitials(entry.full_name)}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'text-sm font-medium truncate',
                  isCurrentUser && 'text-primary'
                )}>
                  {entry.full_name || 'Usuário'}
                </span>
                <LevelBadge level={entry.level} size="sm" showTooltip={false} />
              </div>
              <p className="text-xs text-muted-foreground">
                {typeof entry.metric_value === 'number' 
                  ? `${entry.metric_value.toFixed(1)} ${entry.metric_label}`
                  : entry.metric_label
                }
              </p>
            </div>

            {/* Points */}
            <div className="text-right">
              <p className="text-xs font-medium">{entry.total_points.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">pts</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
