import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ActivityType, UserPresenceExtended, UserLevel, BadgeType } from '@/types/community';

interface UseAdvancedPresenceReturn {
  currentStatus: ActivityType;
  allUsers: UserPresenceExtended[];
  onlineUsers: UserPresenceExtended[];
  offlineUsers: UserPresenceExtended[];
  studyingNowUsers: UserPresenceExtended[];
  onlineCount: number;
  offlineCount: number;
  studyingCount: number;
  totalUsers: number;
  setStudying: (module?: string) => Promise<void>;
  setOnline: () => Promise<void>;
  setAway: () => Promise<void>;
  setOffline: () => Promise<void>;
  loading: boolean;
}

const AWAY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const ONLINE_THRESHOLD = 2 * 60 * 1000; // 2 minutes - considera online se visto nos últimos 2 min

export function useAdvancedPresence(): UseAdvancedPresenceReturn {
  const { user } = useAuth();
  const [currentStatus, setCurrentStatus] = useState<ActivityType>('offline');
  const [allUsers, setAllUsers] = useState<UserPresenceExtended[]>([]);
  const [loading, setLoading] = useState(true);
  
  const awayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const statusRef = useRef<ActivityType>('offline');
  const isInitializedRef = useRef(false);

  // Update presence in database
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

  // Load ALL users with their presence status
  const loadAllUsers = useCallback(async () => {
    if (!user) return;
    
    try {
      const twoMinutesAgo = new Date(Date.now() - ONLINE_THRESHOLD).toISOString();
      
      // Buscar todos os perfis (exceto o próprio usuário)
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, level, role')
        .neq('id', user.id);
      
      if (profilesError) throw profilesError;
      
      if (!profiles || profiles.length === 0) {
        setAllUsers([]);
        setLoading(false);
        return;
      }
      
      // Buscar presença de todos os usuários
      const userIds = profiles.map(p => p.id);
      const { data: presenceData } = await supabase
        .from('user_presence')
        .select('user_id, status, activity_type, current_module, last_seen')
        .in('user_id', userIds);
      
      // Buscar badges
      const { data: badges } = await supabase
        .from('user_badges')
        .select('user_id, badge_type')
        .in('user_id', userIds);
      
      const presenceMap = new Map(presenceData?.map(p => [p.user_id, p]) || []);
      const badgesMap = new Map<string, BadgeType[]>();
      badges?.forEach(b => {
        const existing = badgesMap.get(b.user_id) || [];
        badgesMap.set(b.user_id, [...existing, b.badge_type as BadgeType]);
      });
      
      // Combinar perfis com presença
      const extendedUsers: UserPresenceExtended[] = profiles.map(profile => {
        const presence = presenceMap.get(profile.id);
        const lastSeen = presence?.last_seen;
        const isRecentlyActive = lastSeen && new Date(lastSeen) > new Date(twoMinutesAgo);
        
        // Determinar status real baseado em last_seen
        let realStatus: 'online' | 'away' | 'offline' = 'offline';
        let activityType: ActivityType = 'offline';
        
        if (presence && isRecentlyActive) {
          realStatus = presence.status as 'online' | 'away' | 'offline';
          activityType = (presence.activity_type as ActivityType) || 'online';
        }
        
        return {
          user_id: profile.id,
          status: realStatus,
          activity_type: activityType,
          current_module: presence?.current_module || null,
          last_seen: lastSeen || null,
          user: {
            full_name: profile.full_name || null,
            avatar_url: profile.avatar_url || null,
            level: (profile.level as UserLevel) || 'bronze',
            badges: badgesMap.get(profile.id) || [],
            role: profile.role || 'user'
          }
        };
      });
      
      // Ordenar: online primeiro, depois offline, admins no topo
      extendedUsers.sort((a, b) => {
        // Admins primeiro
        const aIsAdmin = a.user?.role === 'admin' ? 1 : 0;
        const bIsAdmin = b.user?.role === 'admin' ? 1 : 0;
        if (bIsAdmin !== aIsAdmin) return bIsAdmin - aIsAdmin;
        
        // Depois por status (online > away > offline)
        const statusOrder = { online: 0, away: 1, offline: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      
      setAllUsers(extendedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initialize presence and subscriptions
  useEffect(() => {
    if (!user || isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    loadAllUsers();
    updatePresence('online');
    
    // Subscribe to presence changes
    const channel = supabase
      .channel('presence-changes-' + user.id)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_presence' },
        (payload) => {
          const newRecord = payload.new as { user_id?: string } | null;
          const oldRecord = payload.old as { user_id?: string } | null;
          const changedUserId = newRecord?.user_id || oldRecord?.user_id;
          if (changedUserId && changedUserId !== user.id) {
            loadAllUsers();
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
    
    // Reload users every minute to update status
    const usersInterval = setInterval(() => {
      loadAllUsers();
    }, 60000);
    
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
    
    return () => {
      supabase.removeChannel(channel);
      clearInterval(presenceInterval);
      clearInterval(usersInterval);
      if (awayTimeoutRef.current) clearTimeout(awayTimeoutRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      updatePresence('offline');
      isInitializedRef.current = false;
    };
  }, [user, loadAllUsers, updatePresence]);

  // Filtrar usuários por status
  const onlineUsers = allUsers.filter(u => u.status === 'online');
  const offlineUsers = allUsers.filter(u => u.status === 'offline' || u.status === 'away');
  const studyingNowUsers = allUsers.filter(u => u.activity_type === 'studying');

  return {
    currentStatus,
    allUsers,
    onlineUsers,
    offlineUsers,
    studyingNowUsers,
    onlineCount: onlineUsers.length,
    offlineCount: offlineUsers.length,
    studyingCount: studyingNowUsers.length,
    totalUsers: allUsers.length,
    setStudying,
    setOnline,
    setAway,
    setOffline,
    loading
  };
}
