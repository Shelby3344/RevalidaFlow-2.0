import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { RankingEntry, RankingFilter, UserLevel } from '@/types/community';

interface UseRankingsReturn {
  // Rankings data
  rankings: RankingEntry[];
  currentUserRank: number | null;
  
  // Actions
  loadRanking: (filter: RankingFilter, filterValue?: string) => Promise<void>;
  
  // State
  activeFilter: RankingFilter;
  loading: boolean;
}

export function useRankings(): UseRankingsReturn {
  const { user } = useAuth();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<RankingFilter>('top_week');
  const [loading, setLoading] = useState(false);

  const loadRanking = useCallback(async (filter: RankingFilter, filterValue?: string) => {
    setLoading(true);
    setActiveFilter(filter);
    
    try {
      let data: any[] = [];
      let metricLabel = '';
      
      switch (filter) {
        case 'top_week':
          const { data: weeklyData } = await supabase.rpc('get_weekly_ranking', { p_limit: 10 });
          data = weeklyData || [];
          metricLabel = 'horas esta semana';
          break;
          
        case 'top_day':
          const { data: dailyData } = await supabase.rpc('get_daily_ranking', { p_limit: 10 });
          data = dailyData || [];
          metricLabel = 'horas hoje';
          break;
          
        case 'same_goal':
          if (filterValue) {
            const { data: goalData } = await supabase.rpc('get_ranking_by_goal', { 
              p_goal: filterValue, 
              p_limit: 10 
            });
            data = goalData || [];
            metricLabel = 'pontos';
          }
          break;
          
        case 'same_module':
          if (filterValue) {
            const { data: moduleData } = await supabase.rpc('get_ranking_by_module', { 
              p_module: filterValue, 
              p_limit: 10 
            });
            data = moduleData || [];
            metricLabel = 'pontos';
          }
          break;
          
        case 'most_improved':
          // Calculate improvement by comparing last week to this week
          const { data: improvedData } = await supabase.rpc('get_weekly_ranking', { p_limit: 10 });
          data = improvedData || [];
          metricLabel = 'evolução';
          break;
      }
      
      // Transform to RankingEntry format
      const entries: RankingEntry[] = data.map((item, index) => ({
        rank: item.rank || index + 1,
        user_id: item.user_id,
        full_name: item.full_name,
        avatar_url: item.avatar_url,
        level: (item.level as UserLevel) || 'bronze',
        total_points: item.total_points || 0,
        metric_value: item.weekly_hours || item.daily_hours || item.total_points || 0,
        metric_label: metricLabel
      }));
      
      setRankings(entries);
      
      // Find current user rank
      if (user) {
        const userEntry = entries.find(e => e.user_id === user.id);
        setCurrentUserRank(userEntry?.rank || null);
      }
    } catch (error) {
      console.error('Error loading ranking:', error);
      setRankings([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    rankings,
    currentUserRank,
    loadRanking,
    activeFilter,
    loading
  };
}
