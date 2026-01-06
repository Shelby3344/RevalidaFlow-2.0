import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { StudyMatch, StudyInvite, UserLevel } from '@/types/community';

interface UseStudyMatcherReturn {
  // Matches
  matches: StudyMatch[];
  loadingMatches: boolean;
  
  // Invites
  pendingInvites: StudyInvite[];
  sentInvites: StudyInvite[];
  
  // Actions
  findMatches: () => Promise<void>;
  sendInvite: (receiverId: string, message?: string) => Promise<void>;
  respondToInvite: (inviteId: string, accept: boolean) => Promise<void>;
  
  // Loading
  loading: boolean;
}

export function useStudyMatcher(): UseStudyMatcherReturn {
  const { user } = useAuth();
  const [matches, setMatches] = useState<StudyMatch[]>([]);
  const [pendingInvites, setPendingInvites] = useState<StudyInvite[]>([]);
  const [sentInvites, setSentInvites] = useState<StudyInvite[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [loading, setLoading] = useState(true);

  // Find compatible study partners
  const findMatches = useCallback(async () => {
    if (!user) return;
    
    setLoadingMatches(true);
    try {
      const { data, error } = await supabase.rpc('find_study_matches', {
        p_user_id: user.id,
        p_limit: 5
      });
      
      if (error) throw error;
      
      const formattedMatches: StudyMatch[] = (data || []).map((m: any) => ({
        user_id: m.user_id,
        full_name: m.full_name,
        avatar_url: m.avatar_url,
        level: (m.level as UserLevel) || 'bronze',
        study_goal: m.study_goal,
        main_module: m.main_module,
        total_points: m.total_points || 0,
        compatibility_score: m.compatibility_score || 0,
        matching_criteria: {
          dedication_match: m.dedication_match || 0,
          goal_match: m.goal_match || 0,
          schedule_match: m.schedule_match || 0,
          module_match: m.module_match || 0
        }
      }));
      
      setMatches(formattedMatches);
    } catch (error) {
      console.error('Error finding matches:', error);
      setMatches([]);
    } finally {
      setLoadingMatches(false);
    }
  }, [user]);

  // Load invites
  const loadInvites = useCallback(async () => {
    if (!user) return;
    
    try {
      // Pending invites (received)
      const { data: pending } = await supabase
        .from('study_invites')
        .select(`
          *,
          sender:profiles!study_invites_sender_id_fkey(full_name, avatar_url, level)
        `)
        .eq('receiver_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      setPendingInvites(pending || []);
      
      // Sent invites
      const { data: sent } = await supabase
        .from('study_invites')
        .select(`
          *,
          receiver:profiles!study_invites_receiver_id_fkey(full_name, avatar_url, level)
        `)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      setSentInvites(sent || []);
    } catch (error) {
      console.error('Error loading invites:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);


  // Send study invite
  const sendInvite = useCallback(async (receiverId: string, message?: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('study_invites')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          message: message || null,
          status: 'pending'
        });
      
      if (error) throw error;
      
      await loadInvites();
    } catch (error) {
      console.error('Error sending invite:', error);
      throw error;
    }
  }, [user, loadInvites]);

  // Respond to invite
  const respondToInvite = useCallback(async (inviteId: string, accept: boolean) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('study_invites')
        .update({
          status: accept ? 'accepted' : 'declined',
          responded_at: new Date().toISOString()
        })
        .eq('id', inviteId)
        .eq('receiver_id', user.id);
      
      if (error) throw error;
      
      await loadInvites();
    } catch (error) {
      console.error('Error responding to invite:', error);
      throw error;
    }
  }, [user, loadInvites]);

  // Initial load and realtime subscription
  useEffect(() => {
    if (!user) return;
    
    loadInvites();
    
    // Subscribe to invite changes
    const channel = supabase
      .channel(`invites-${user.id}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'study_invites',
          filter: `receiver_id=eq.${user.id}`
        },
        () => {
          loadInvites();
        }
      )
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'study_invites',
          filter: `sender_id=eq.${user.id}`
        },
        () => {
          loadInvites();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loadInvites]);

  return {
    matches,
    loadingMatches,
    pendingInvites,
    sentInvites,
    findMatches,
    sendInvite,
    respondToInvite,
    loading
  };
}
