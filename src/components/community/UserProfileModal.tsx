import { useState, useEffect } from 'react';
import { X, Clock, Target, Flame, BookOpen, TrendingUp, UserPlus, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { CommunityProfile, UserLevel, BadgeType, calculateLevelProgress, LEVEL_THRESHOLDS } from '@/types/community';
import { LevelBadge } from './LevelBadge';
import { BadgeGrid, StudyingNowBadge } from './AchievementBadge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserProfileModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onInvite?: (userId: string) => void;
  isStudying?: boolean;
}

export function UserProfileModal({ userId, isOpen, onClose, onInvite, isStudying }: UserProfileModalProps) {
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<CommunityProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !userId) return;
    
    const loadProfile = async () => {
      setLoading(true);
      try {
        // Get basic profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (!profileData) return;
        
        // Get community stats
        const { data: stats } = await supabase.rpc('get_user_community_stats', { p_user_id: userId });
        
        // Get last activity
        const { data: presence } = await supabase
          .from('user_presence')
          .select('last_seen')
          .eq('user_id', userId)
          .single();
        
        const communityProfile: CommunityProfile = {
          id: profileData.id,
          full_name: profileData.full_name,
          avatar_url: profileData.avatar_url,
          study_goal: profileData.study_goal,
          main_module: profileData.main_module,
          total_points: profileData.total_points || 0,
          level: (profileData.level as UserLevel) || 'bronze',
          is_profile_public: profileData.is_profile_public ?? true,
          show_in_rankings: profileData.show_in_rankings ?? true,
          allow_study_invites: profileData.allow_study_invites ?? true,
          total_study_hours: stats?.[0]?.total_study_hours || 0,
          daily_average_hours: stats?.[0]?.daily_average_hours || 0,
          weekly_average_hours: stats?.[0]?.weekly_average_hours || 0,
          checklist_completion_rate: stats?.[0]?.checklist_completion_rate || 0,
          current_streak: stats?.[0]?.current_streak || 0,
          badges: (stats?.[0]?.badges || []) as BadgeType[],
          last_activity: presence?.last_seen || null
        };
        
        setProfile(communityProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const isOwnProfile = currentUser?.id === userId;
  const isPrivate = profile && !profile.is_profile_public && !isOwnProfile;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Panel */}
      <div className="relative w-full max-w-sm h-full bg-card border-l border-border shadow-xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Perfil</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-60px)]">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : profile ? (
            <>
              {/* Avatar and Name */}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-2 border-border">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="text-xl bg-primary/20">
                      {getInitials(profile.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  {isStudying && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                      <StudyingNowBadge size="sm" />
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{profile.full_name || 'Usuário'}</h3>
                <div className="mt-1">
                  <LevelBadge level={profile.level} points={profile.total_points} showProgress />
                </div>
                {profile.badges.length > 0 && (
                  <div className="mt-2">
                    <BadgeGrid badges={profile.badges} size="md" maxDisplay={6} />
                  </div>
                )}
              </div>

              {isPrivate ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Lock className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Este perfil é privado</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Apenas informações básicas são visíveis
                  </p>
                </div>
              ) : (
                <>
                  {/* Goal and Module */}
                  {(profile.study_goal || profile.main_module) && (
                    <div className="space-y-2">
                      {profile.study_goal && (
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-cyan-500" />
                          <span className="text-muted-foreground">Objetivo:</span>
                          <span>{profile.study_goal}</span>
                        </div>
                      )}
                      {profile.main_module && (
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          <span className="text-muted-foreground">Módulo:</span>
                          <span>{profile.main_module}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard
                      icon={<Clock className="w-4 h-4 text-blue-500" />}
                      label="Total estudado"
                      value={`${profile.total_study_hours.toFixed(1)}h`}
                    />
                    <StatCard
                      icon={<TrendingUp className="w-4 h-4 text-green-500" />}
                      label="Média semanal"
                      value={`${profile.weekly_average_hours.toFixed(1)}h`}
                    />
                    <StatCard
                      icon={<Flame className="w-4 h-4 text-orange-500" />}
                      label="Streak atual"
                      value={`${profile.current_streak} dias`}
                    />
                    <StatCard
                      icon={<Target className="w-4 h-4 text-purple-500" />}
                      label="Checklists"
                      value={`${profile.checklist_completion_rate.toFixed(0)}%`}
                    />
                  </div>

                  {/* Level Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso do nível</span>
                      <span className="font-medium">{profile.total_points.toLocaleString()} pts</span>
                    </div>
                    <Progress 
                      value={calculateLevelProgress(profile.total_points)} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      {profile.level !== 'elite' 
                        ? `${(LEVEL_THRESHOLDS[profile.level].max - profile.total_points + 1).toLocaleString()} pts para o próximo nível`
                        : 'Nível máximo alcançado! 👑'
                      }
                    </p>
                  </div>

                  {/* Last Activity */}
                  {profile.last_activity && (
                    <p className="text-xs text-muted-foreground text-center">
                      Última atividade: {formatDistanceToNow(new Date(profile.last_activity), { addSuffix: true, locale: ptBR })}
                    </p>
                  )}
                </>
              )}

              {/* Invite Button */}
              {!isOwnProfile && profile.allow_study_invites && onInvite && (
                <Button 
                  className="w-full" 
                  onClick={() => onInvite(userId)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Convidar para estudar
                </Button>
              )}
            </>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Perfil não encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-secondary/50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
