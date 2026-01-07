import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ActivityType, UserPresenceExtended, UserLevel, BadgeType } from '@/types/community';

interface UseAdvancedPresenceReturn {
  currentStatus: ActivityType;
  onlineUsers: UserPresenceExtended[];
  studyingNowUsers: UserPresenceExtended[];
  onlineCount: number;
  studyingCount: number;
  setStudying: (module?: string) => Promise<void>;
  setOnline: () => Promise<void>;
  setAway: () => Promise<void>;
  setOffline: () => Promise<void>;
  loading: boolean;
}

const AWAY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function useAdvancedPresence(): UseAdvancedPresenceReturn {
  const { user } = useAuth();
  const [currentStatus, setCurrentStatus] = useState<ActivityType>('offline');
  const [onlineUsers, setOnlineUsers] = useState<UserPresenceExtended[]>([]);
  const [loading, setLoading] = useState(true);
  
  const awayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const statusRef = useRef<ActivityType>('offline');
  const isInitializedRef = useRef(false);

  // Update presence in database (stable reference)
  const updatePresence = useCallback(async (status: ActivityType, module?: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('user_presence')
        .upsert({
          user_id: user.id,
          status: status === 'studying' ? 'online' : status,
          activity_type: status,
          current_module: module || null,
          last_seen: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      statusRef.current = status;
      setCurrentStatus(status);
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  }, [user]);

  const setStudying = useCallback(async (module?: string) => {
    await updatePresence('studying', module);
  }, [updatePresence]);

  const setOnline = useCallback(async () => {
    await updatePresence('online');
  }, [updatePresence]);

  const setAway = useCallback(async () => {
    await updatePresence('away');
  }, [updatePresence]);

  const setOffline = useCallback(async () => {
    await updatePresence('offline');
  }, [updatePresence]);

  // Load online users (stable, doesn't trigger re-renders in loop)
  const loadOnlineUsers = useCallback(async () => {
    if (!user) return;
    
    try {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('user_presence')
        .select('user_id, status, activity_type, current_module, last_seen')
        .in('status', ['online'])
        .gte('last_seen', twoMinutesAgo)
        .neq('user_id', user.id);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const userIds = data.map(p => p.user_id);
        
        const [profilesRes, badgesRes] = await Promise.all([
          supabase.from('profiles').select('id, full_name, avatar_url, level').in('id', userIds),
          supabase.from('user_badges').select('user_id, badge_type').in('user_id', userIds)
        ]);
        
        const profilesMap = new Map(profilesRes.data?.map(p => [p.id, p]) || []);
        const badgesMap = new Map<string, BadgeType[]>();
        badgesRes.data?.forEach(b => {
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

  // Initialize presence and subscriptions (runs once)
  useEffect(() => {
    if (!user || isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    // Initial load
    loadOnlineUsers();
    updatePresence('online');
    
    // Subscribe to presence changes from OTHER users only
    const channel = supabase
      .channel('presence-changes-' + user.id)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_presence' },
        (payload) => {
          const newRecord = payload.new as { user_id?: string } | null;
          const oldRecord = payload.old as { user_id?: string } | null;
          const changedUserId = newRecord?.user_id || oldRecord?.user_id;
          // Only reload if it's NOT our own change
          if (changedUserId && changedUserId !== user.id) {
            loadOnlineUsers();
          }
        }
      )
      .subscribe();
    
    // Heartbeat every 30 seconds
    const presenceInterval = setInterval(() => {
      if (statusRef.current !== 'offline') {
        updatePresence(statusRef.current);
      }
    }, 30000);
    
    // Away timeout on inactivity
    const resetAwayTimer = () => {
      if (awayTimeoutRef.current) clearTimeout(awayTimeoutRef.current);
      awayTimeoutRef.current = setTimeout(() => {
        if (statusRef.current === 'online') {
          updatePresence('away');
        }
      }, AWAY_TIMEOUT);
    };
    
    const handleActivity = () => {
      if (statusRef.current === 'away') {
        updatePresence('online');
      }
      resetAwayTimer();
    };
    
    resetAwayTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    
    // Cleanup
    return () => {
      supabase.removeChannel(channel);
      clearInterval(presenceInterval);
      if (awayTimeoutRef.current) clearTimeout(awayTimeoutRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      // Mark offline on unmount
      updatePresence('offline');
      isInitializedRef.current = false;
    };
  }, [user, loadOnlineUsers, updatePresence]);

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
