import { Check, X, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StudyInvite } from '@/types/community';
import { LevelBadge } from './LevelBadge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface StudyInviteCardProps {
  invite: StudyInvite;
  onAccept: (inviteId: string) => void;
  onDecline: (inviteId: string) => void;
  onUserClick?: (userId: string) => void;
  loading?: boolean;
}

export function StudyInviteCard({ 
  invite, 
  onAccept, 
  onDecline, 
  onUserClick,
  loading 
}: StudyInviteCardProps) {
  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-secondary/30 rounded-lg p-3 space-y-3 animate-in slide-in-from-top duration-300">
      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => onUserClick?.(invite.sender_id)}>
            <Avatar className="w-10 h-10">
              <AvatarImage src={invite.sender?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/20">
                {getInitials(invite.sender?.full_name || null)}
              </AvatarFallback>
            </Avatar>
          </button>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
            <UserPlus className="w-3 h-3 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <button 
            onClick={() => onUserClick?.(invite.sender_id)}
            className="text-sm font-medium hover:underline truncate block"
          >
            {invite.sender?.full_name || 'Usuário'}
          </button>
          <p className="text-xs text-muted-foreground">
            quer estudar com você
          </p>
        </div>

        {invite.sender?.level && (
          <LevelBadge level={invite.sender.level} size="sm" showTooltip={false} />
        )}
      </div>

      {invite.message && (
        <p className="text-sm text-muted-foreground bg-secondary/50 rounded p-2">
          "{invite.message}"
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          {formatDistanceToNow(new Date(invite.created_at), { addSuffix: true, locale: ptBR })}
        </span>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onDecline(invite.id)}
            disabled={loading}
            className="h-8"
          >
            <X className="w-3 h-3 mr-1" />
            Recusar
          </Button>
          <Button 
            size="sm"
            onClick={() => onAccept(invite.id)}
            disabled={loading}
            className="h-8"
          >
            <Check className="w-3 h-3 mr-1" />
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}

interface StudyInviteListProps {
  invites: StudyInvite[];
  onAccept: (inviteId: string) => void;
  onDecline: (inviteId: string) => void;
  onUserClick?: (userId: string) => void;
  loading?: boolean;
}

export function StudyInviteList({ 
  invites, 
  onAccept, 
  onDecline, 
  onUserClick,
  loading 
}: StudyInviteListProps) {
  if (invites.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium flex items-center gap-2">
        <UserPlus className="w-4 h-4 text-purple-500" />
        Convites de estudo
        <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {invites.length}
        </span>
      </h4>
      <div className="space-y-2">
        {invites.map((invite) => (
          <StudyInviteCard
            key={invite.id}
            invite={invite}
            onAccept={onAccept}
            onDecline={onDecline}
            onUserClick={onUserClick}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}
