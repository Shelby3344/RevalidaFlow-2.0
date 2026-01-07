import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ActivityType, UserPresenceExtended, UserLevel, BadgeType } from '@/types/community';

interface UseAdvancedPresenceReturn {
  // Current user status
  currentStatus: ActivityType;
  
  // Online users
  onlineUsers: UserPresenceExtended[];
  studyingNowUsers: UserPresenceExtended[];
  onlineCount: number;
  studyingCount: number;
  
  // Actions
  setStudying: (module?: string) => Promise<void>;
  setOnline: () => Promise<void>;
  setAway: () => Promise<void>;
  setOffline: () => Promise<void>;
  
  // Loading
  loading: boolean;
}

const AWAY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const OFFLINE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export function useAdvancedPresence(): UseAdvancedPresenceReturn {
  const { user } = useAuth();
  const [currentStatus, setCurrentStatus] = useState<ActivityType>('offline');
  const [onlineUsers, setOnlineUsers] = useState<UserPresenceExtended[]>([]);
  const [loading, setLoading] = useState(true);
  
  const awayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const offlineTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Update presence in database
  const updatePresence = useCallback(async (status: ActivityType, module?: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_presence')
        .upsert({
          user_id: user.id,
          status: status === 'studying' ? 'online' : status,
          activity_type: status,
          current_module: module || null,
          last_seen: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      setCurrentStatus(status);
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  }, [user]);

  // Set studying status
  const setStudying = useCallback(async (module?: string) => {
    await updatePresence('studying', module);
    resetActivityTimers();
  }, [updatePresence]);

  // Set online status
  const setOnline = useCallback(async () => {
    await updatePresence('online');
    resetActivityTimers();
  }, [updatePresence]);

  // Set away status
  const setAway = useCallback(async () => {
    await updatePresence('away');
  }, [updatePresence]);

  // Set offline status
  const setOffline = useCallback(async () => {
    await updatePresence('offline');
  }, [updatePresence]);

  // Reset activity timers
  const resetActivityTimers = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (awayTimeoutRef.current) clearTimeout(awayTimeoutRef.current);
    if (offlineTimeoutRef.current) clearTimeout(offlineTimeoutRef.current);
    
    awayTimeoutRef.current = setTimeout(() => {
      if (currentStatus !== 'studying') {
        setAway();
      }
    }, AWAY_TIMEOUT);
    
    offlineTimeoutRef.current = setTimeout(() => {
      setOffline();
    }, OFFLINE_TIMEOUT);
  }, [currentStatus, setAway, setOffline]);


  // Load online users
  const loadOnlineUsers = useCallback(async () => {
    if (!user) return;
    
    try {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('user_presence')
        .select(`
          user_id,
          status,
          activity_type,
          current_module,
          last_seen
        `)
        .in('status', ['online'])
        .gte('last_seen', twoMinutesAgo)
        .neq('user_id', user.id); // Excluir o próprio usuário
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Get user profiles
        const userIds = data.map(p => p.user_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, level')
          .in('id', userIds);
        
        // Get badges for users
        const { data: badges } = await supabase
          .from('user_badges')
          .select('user_id, badge_type')
          .in('user_id', userIds);
        
        const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);
        const badgesMap = new Map<string, BadgeType[]>();
        badges?.forEach(b => {
          const existing = badgesMap.get(b.user_id) || [];
          badgesMap.set(b.user_id, [...existing, b.badge_type as BadgeType]);
        });
        
        const extendedUsers: UserPresenceExtended[] = data.map(p => {
          const profile = profilesMap.get(p.user_id);
          return {
            user_id: p.user_id,
            status: p.status as 'online' | 'away' | 'offline',
            activity_type: (p.activity_type as ActivityType) || 'online',
            current_module: p.current_module,
            last_seen: p.last_seen,
            user: {
              full_name: profile?.full_name || null,
              avatar_url: profile?.avatar_url || null,
              level: (profile?.level as UserLevel) || 'bronze',
              badges: badgesMap.get(p.user_id) || []
            }
          };
        });
        
        setOnlineUsers(extendedUsers);
      } else {
        setOnlineUsers([]);
      }
    } catch (error) {
      console.error('Error loading online users:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial setup
  useEffect(() => {
    if (!user) return;
    
    loadOnlineUsers();
    setOnline();
    
    // Subscribe to presence changes (only for other users)
    const channel = supabase
      .channel('presence-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_presence' },
        (payload) => {
          // Ignorar mudanças do próprio usuário
          const newRecord = payload.new as { user_id?: string } | null;
          const oldRecord = payload.old as { user_id?: string } | null;
          const changedUserId = newRecord?.user_id || oldRecord?.user_id;
          if (changedUserId !== user.id) {
            loadOnlineUsers();
          }
        }
      )
      .subscribe();
    
    // Update presence every 30 seconds
    const presenceInterval = setInterval(() => {
      if (currentStatus !== 'offline') {
        updatePresence(currentStatus);
      }
    }, 30000);
    
    // Track user activity
    const handleActivity = () => {
      if (currentStatus === 'away') {
        setOnline();
      }
      resetActivityTimers();
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    
    // Handle page unload
    const handleUnload = () => {
      setOffline();
    };
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      supabase.removeChannel(channel);
      clearInterval(presenceInterval);
      if (awayTimeoutRef.current) clearTimeout(awayTimeoutRef.current);
      if (offlineTimeoutRef.current) clearTimeout(offlineTimeoutRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('beforeunload', handleUnload);
      setOffline();
    };
  }, [user, loadOnlineUsers, setOnline, setOffline, currentStatus, updatePresence, resetActivityTimers]);

  // Filter studying users
  const studyingNowUsers = onlineUsers.filter(u => u.activity_type === 'studying');

  return {
    currentStatus,
    onlineUsers,
    studyingNowUsers,
    onlineCount: onlineUsers.length,
    studyingCount: studyingNowUsers.length,
    setStudying,
    setOnline,
    setAway,
    setOffline,
    loading
  };
}
