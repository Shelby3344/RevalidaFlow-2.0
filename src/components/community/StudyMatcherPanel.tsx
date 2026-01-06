import { useState } from 'react';
import { Users, Search, UserPlus, Target, Clock, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useStudyMatcher } from '@/hooks/useStudyMatcher';
import { StudyMatch } from '@/types/community';
import { LevelBadge } from './LevelBadge';
import { cn } from '@/lib/utils';

interface StudyMatcherPanelProps {
  onUserClick?: (userId: string) => void;
  onInviteSent?: () => void;
}

export function StudyMatcherPanel({ onUserClick, onInviteSent }: StudyMatcherPanelProps) {
  const { matches, loadingMatches, findMatches, sendInvite, sentInvites } = useStudyMatcher();
  const [sendingInvite, setSendingInvite] = useState<string | null>(null);

  const handleFindMatches = async () => {
    await findMatches();
  };

  const handleSendInvite = async (userId: string) => {
    setSendingInvite(userId);
    try {
      await sendInvite(userId, 'Oi! Gostaria de estudar junto?');
      onInviteSent?.();
    } catch (error) {
      console.error('Error sending invite:', error);
    } finally {
      setSendingInvite(null);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const hasAlreadyInvited = (userId: string) => {
    return sentInvites.some(inv => inv.receiver_id === userId && inv.status === 'pending');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold">Parceiros de Estudo</h3>
        </div>
      </div>

      <Button 
        onClick={handleFindMatches} 
        disabled={loadingMatches}
        className="w-full"
        variant="outline"
      >
        {loadingMatches ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
            Buscando...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Encontrar parceiros
          </>
        )}
      </Button>

      {matches.length > 0 ? (
        <div className="space-y-3">
          {matches.map((match) => (
            <MatchCard
              key={match.user_id}
              match={match}
              onUserClick={onUserClick}
              onInvite={handleSendInvite}
              getInitials={getInitials}
              isInviting={sendingInvite === match.user_id}
              alreadyInvited={hasAlreadyInvited(match.user_id)}
            />
          ))}
        </div>
      ) : !loadingMatches && (
        <div className="text-center py-6">
          <Sparkles className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Clique em "Encontrar parceiros" para descobrir pessoas compatíveis com seu perfil de estudo
          </p>
        </div>
      )}
    </div>
  );
}


interface MatchCardProps {
  match: StudyMatch;
  onUserClick?: (userId: string) => void;
  onInvite: (userId: string) => void;
  getInitials: (name: string | null) => string;
  isInviting: boolean;
  alreadyInvited: boolean;
}

function MatchCard({ match, onUserClick, onInvite, getInitials, isInviting, alreadyInvited }: MatchCardProps) {
  const { matching_criteria } = match;

  return (
    <div className="bg-secondary/30 rounded-lg p-3 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => onUserClick?.(match.user_id)}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={match.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/20">
              {getInitials(match.full_name)}
            </AvatarFallback>
          </Avatar>
        </button>
        <div className="flex-1 min-w-0">
          <button 
            onClick={() => onUserClick?.(match.user_id)}
            className="text-sm font-medium hover:underline truncate block"
          >
            {match.full_name || 'Usuário'}
          </button>
          <div className="flex items-center gap-2">
            <LevelBadge level={match.level} size="sm" showTooltip={false} />
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{match.compatibility_score}%</div>
          <div className="text-[10px] text-muted-foreground">compatível</div>
        </div>
      </div>

      {/* Info */}
      {(match.study_goal || match.main_module) && (
        <div className="flex flex-wrap gap-2 text-xs">
          {match.study_goal && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
              <Target className="w-3 h-3" />
              {match.study_goal}
            </span>
          )}
          {match.main_module && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
              <BookOpen className="w-3 h-3" />
              {match.main_module}
            </span>
          )}
        </div>
      )}

      {/* Compatibility Breakdown */}
      <div className="space-y-1.5">
        <CompatibilityBar 
          label="Dedicação" 
          value={matching_criteria.dedication_match} 
          max={40}
          color="bg-blue-500"
        />
        <CompatibilityBar 
          label="Objetivo" 
          value={matching_criteria.goal_match} 
          max={30}
          color="bg-green-500"
        />
        <CompatibilityBar 
          label="Horários" 
          value={matching_criteria.schedule_match} 
          max={20}
          color="bg-yellow-500"
        />
        <CompatibilityBar 
          label="Módulo" 
          value={matching_criteria.module_match} 
          max={10}
          color="bg-purple-500"
        />
      </div>

      {/* Invite Button */}
      <Button 
        size="sm" 
        className="w-full"
        onClick={() => onInvite(match.user_id)}
        disabled={isInviting || alreadyInvited}
      >
        {isInviting ? (
          <>
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2" />
            Enviando...
          </>
        ) : alreadyInvited ? (
          'Convite enviado'
        ) : (
          <>
            <UserPlus className="w-3 h-3 mr-2" />
            Convidar para estudar
          </>
        )}
      </Button>
    </div>
  );
}

interface CompatibilityBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

function CompatibilityBar({ label, value, max, color }: CompatibilityBarProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground w-16">{label}</span>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn('h-full rounded-full transition-all', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground w-8 text-right">{value}/{max}</span>
    </div>
  );
}
