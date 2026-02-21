import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { 
  UserLevel, 
  BadgeType, 
  calculateLevel, 
  calculateLevelProgress,
  POINTS_CONFIG,
  LEVEL_THRESHOLDS
} from '@/types/community';

interface UseGamificationReturn {
  // User data
  totalPoints: number;
  level: UserLevel;
  levelProgress: number;
  badges: BadgeType[];
  
  // Actions
  awardPoints: (type: 'study_hour' | 'checklist' | 'streak' | 'flashcard', amount?: number) => Promise<void>;
  checkAndAwardBadges: () => Promise<BadgeType[]>;
  
  // Loading
  loading: boolean;
}

export function useGamification(): UseGamificationReturn {
  const { user } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState<UserLevel>('bronze');
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load user gamification data
  const loadGamificationData = useCallback(async () => {
    if (!user) return;
    
    try {
      // Get profile with points and level
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_points, level')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setTotalPoints(profile.total_points || 0);
        setLevel((profile.level as UserLevel) || 'bronze');
      }
      
      // Get badges
      const { data: userBadges } = await supabase
        .from('user_badges')
        .select('badge_type')
        .eq('user_id', user.id);
      
      if (userBadges) {
        setBadges(userBadges.map(b => b.badge_type as BadgeType));
      }
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadGamificationData();
  }, [loadGamificationData]);

  // Award points
  const awardPoints = useCallback(async (
    type: 'study_hour' | 'checklist' | 'streak' | 'flashcard',
    amount?: number
  ) => {
    if (!user) return;
    
    let pointsToAdd = 0;
    switch (type) {
      case 'study_hour':
        pointsToAdd = amount ? amount * POINTS_CONFIG.per_study_hour : POINTS_CONFIG.per_study_hour;
        break;
      case 'checklist':
        pointsToAdd = POINTS_CONFIG.per_checklist_completed;
        break;
      case 'streak':
        pointsToAdd = POINTS_CONFIG.per_streak_day;
        break;
      case 'flashcard':
        pointsToAdd = amount ? amount * POINTS_CONFIG.per_flashcard_review : POINTS_CONFIG.per_flashcard_review;
        break;
    }
    
    try {
      const newTotal = totalPoints + pointsToAdd;
      const newLevel = calculateLevel(newTotal);
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          total_points: newTotal,
          level: newLevel
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setTotalPoints(newTotal);
      setLevel(newLevel);
      
      // Check for new badges after points update
      await checkAndAwardBadges();
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  }, [user, totalPoints]);


  // Check and award badges
  const checkAndAwardBadges = useCallback(async (): Promise<BadgeType[]> => {
    if (!user) return [];
    
    const newBadges: BadgeType[] = [];
    
    try {
      // Get user stats
      const { data: stats } = await supabase
        .from('user_stats')
        .select('current_streak, total_study_time_minutes, total_checklists')
        .eq('user_id', user.id)
        .maybeSingle();
      
      const totalHours = (stats?.total_study_time_minutes || 0) / 60;
      const streak = stats?.current_streak || 0;
      const totalChecklists = stats?.total_checklists || 0;
      
      // Check each badge criteria
      const badgesToCheck: { type: BadgeType; condition: boolean }[] = [
        { type: 'first_checklist', condition: totalChecklists >= 1 },
        { type: '50h_studied', condition: totalHours >= 50 },
        { type: '100h_studied', condition: totalHours >= 100 },
        { type: '200h_studied', condition: totalHours >= 200 },
        { type: 'streak_7', condition: streak >= 7 },
        { type: 'streak_30', condition: streak >= 30 },
      ];
      
      for (const { type, condition } of badgesToCheck) {
        if (condition && !badges.includes(type)) {
          // Try to insert badge
          const { error } = await supabase
            .from('user_badges')
            .insert({ user_id: user.id, badge_type: type })
            .select()
            .single();
          
          if (!error) {
            newBadges.push(type);
          }
        }
      }
      
      if (newBadges.length > 0) {
        setBadges(prev => [...prev, ...newBadges]);
      }
      
      return newBadges;
    } catch (error) {
      console.error('Error checking badges:', error);
      return [];
    }
  }, [user, badges]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user) return;
    
    const channel = supabase
      .channel(`gamification-${user.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
        (payload) => {
          if (payload.new.total_points !== undefined) {
            setTotalPoints(payload.new.total_points);
            setLevel(calculateLevel(payload.new.total_points));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'user_badges', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setBadges(prev => [...prev, payload.new.badge_type as BadgeType]);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    totalPoints,
    level,
    levelProgress: calculateLevelProgress(totalPoints),
    badges,
    awardPoints,
    checkAndAwardBadges,
    loading
  };
}
