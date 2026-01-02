import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Room {
  id: string;
  code: string;
  name: string;
  host_id: string;
  checklist_id: string;
  checklist_title: string | null;
  area_code: string | null;
  is_public: boolean;
  max_participants: number;
  status: 'waiting' | 'active' | 'paused' | 'finished';
  current_item: number;
  timer_seconds: number;
  timer_running: boolean;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

export interface Participant {
  id: string;
  room_id: string;
  user_id: string;
  role: 'host' | 'evaluator' | 'participant' | 'observer';
  is_ready: boolean;
  joined_at: string;
  left_at: string | null;
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface RoomMessage {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  message_type: 'text' | 'system' | 'score';
  created_at: string;
  profile?: {
    full_name: string | null;
  };
}

export interface RoomScore {
  id: string;
  room_id: string;
  evaluator_id: string;
  evaluated_id: string | null;
  item_index: number;
  score: number | null;
  score_type: 'full' | 'partial' | 'zero' | 'na' | null;
  created_at: string;
}

interface UseCollaborativeRoomReturn {
  // Room state
  room: Room | null;
  participants: Participant[];
  messages: RoomMessage[];
  scores: RoomScore[];
  loading: boolean;
  error: string | null;
  
  // Room actions
  createRoom: (data: CreateRoomData) => Promise<string | null>;
  joinRoom: (code: string) => Promise<boolean>;
  leaveRoom: () => Promise<void>;
  
  // Host actions
  startSession: () => Promise<void>;
  pauseSession: () => Promise<void>;
  resumeSession: () => Promise<void>;
  finishSession: () => Promise<void>;
  updateCurrentItem: (itemIndex: number) => Promise<void>;
  updateTimer: (seconds: number, running: boolean) => Promise<void>;
  kickParticipant: (participantId: string) => Promise<void>;
  
  // Participant actions
  setReady: (ready: boolean) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  submitScore: (itemIndex: number, score: number | null, scoreType: string) => Promise<void>;
  
  // Queries
  getPublicRooms: () => Promise<Room[]>;
  getRoomByCode: (code: string) => Promise<Room | null>;
}

interface CreateRoomData {
  name: string;
  checklistId: string;
  checklistTitle: string;
  areaCode: string;
  isPublic: boolean;
  maxParticipants?: number;
}

export function useCollaborativeRoom(roomCode?: string): UseCollaborativeRoomReturn {
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [scores, setScores] = useState<RoomScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // Load room data
  const loadRoom = useCallback(async (code: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get room
      const { data: roomData, error: roomError } = await supabase
        .from('collaborative_rooms')
        .select('*')
        .eq('code', code)
        .single();
      
      if (roomError) throw roomError;
      setRoom(roomData);

      // Get participants with profiles
      const { data: participantsData } = await supabase
        .from('room_participants')
        .select(`
          *,
          profile:profiles(full_name, avatar_url)
        `)
        .eq('room_id', roomData.id)
        .is('left_at', null);
      
      setParticipants(participantsData || []);

      // Get messages
      const { data: messagesData } = await supabase
        .from('room_messages')
        .select(`
          *,
          profile:profiles(full_name)
        `)
        .eq('room_id', roomData.id)
        .order('created_at', { ascending: true })
        .limit(100);
      
      setMessages(messagesData || []);

      // Get scores
      const { data: scoresData } = await supabase
        .from('room_scores')
        .select('*')
        .eq('room_id', roomData.id);
      
      setScores(scoresData || []);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!room?.id) return;

    const newChannel = supabase
      .channel(`room:${room.id}`)
      // Room updates
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'collaborative_rooms', filter: `id=eq.${room.id}` },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setRoom(payload.new as Room);
          } else if (payload.eventType === 'DELETE') {
            setRoom(null);
          }
        }
      )
      // Participants updates
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_participants', filter: `room_id=eq.${room.id}` },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            // Fetch profile for new participant
            const { data } = await supabase
              .from('room_participants')
              .select(`*, profile:profiles(full_name, avatar_url)`)
              .eq('id', payload.new.id)
              .single();
            if (data) {
              setParticipants(prev => [...prev, data]);
            }
          } else if (payload.eventType === 'UPDATE') {
            setParticipants(prev => prev.map(p => 
              p.id === payload.new.id ? { ...p, ...payload.new } : p
            ));
          } else if (payload.eventType === 'DELETE') {
            setParticipants(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      // Messages updates
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_messages', filter: `room_id=eq.${room.id}` },
        async (payload) => {
          const { data } = await supabase
            .from('room_messages')
            .select(`*, profile:profiles(full_name)`)
            .eq('id', payload.new.id)
            .single();
          if (data) {
            setMessages(prev => [...prev, data]);
          }
        }
      )
      // Scores updates
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_scores', filter: `room_id=eq.${room.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setScores(prev => [...prev, payload.new as RoomScore]);
          } else if (payload.eventType === 'UPDATE') {
            setScores(prev => prev.map(s => 
              s.id === payload.new.id ? payload.new as RoomScore : s
            ));
          }
        }
      )
      .subscribe();

    setChannel(newChannel);

    return () => {
      newChannel.unsubscribe();
    };
  }, [room?.id]);

  // Load room when code changes
  useEffect(() => {
    if (roomCode) {
      loadRoom(roomCode);
    }
  }, [roomCode, loadRoom]);

  // Create room
  const createRoom = useCallback(async (data: CreateRoomData): Promise<string | null> => {
    if (!user) return null;
    
    try {
      const { data: newRoom, error } = await supabase
        .from('collaborative_rooms')
        .insert({
          name: data.name,
          host_id: user.id,
          checklist_id: data.checklistId,
          checklist_title: data.checklistTitle,
          area_code: data.areaCode,
          is_public: data.isPublic,
          max_participants: data.maxParticipants || 10
        })
        .select()
        .single();
      
      if (error) throw error;
      return newRoom.code;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }, [user]);

  // Join room
  const joinRoom = useCallback(async (code: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Get room
      const { data: roomData, error: roomError } = await supabase
        .from('collaborative_rooms')
        .select('*')
        .eq('code', code)
        .single();
      
      if (roomError) throw new Error('Sala não encontrada');
      
      // Check if already participant
      const { data: existing } = await supabase
        .from('room_participants')
        .select('id')
        .eq('room_id', roomData.id)
        .eq('user_id', user.id)
        .is('left_at', null)
        .single();
      
      if (!existing) {
        // Join room
        const { error: joinError } = await supabase
          .from('room_participants')
          .insert({
            room_id: roomData.id,
            user_id: user.id,
            role: 'participant'
          });
        
        if (joinError) throw joinError;
      }
      
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, [user]);

  // Leave room
  const leaveRoom = useCallback(async () => {
    if (!user || !room) return;
    
    try {
      await supabase
        .from('room_participants')
        .update({ left_at: new Date().toISOString() })
        .eq('room_id', room.id)
        .eq('user_id', user.id);
      
      channel?.unsubscribe();
      setRoom(null);
      setParticipants([]);
      setMessages([]);
      setScores([]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [user, room, channel]);

  // Host actions
  const startSession = useCallback(async () => {
    if (!room) return;
    await supabase
      .from('collaborative_rooms')
      .update({ status: 'active', started_at: new Date().toISOString() })
      .eq('id', room.id);
  }, [room]);

  const pauseSession = useCallback(async () => {
    if (!room) return;
    await supabase
      .from('collaborative_rooms')
      .update({ status: 'paused', timer_running: false })
      .eq('id', room.id);
  }, [room]);

  const resumeSession = useCallback(async () => {
    if (!room) return;
    await supabase
      .from('collaborative_rooms')
      .update({ status: 'active', timer_running: true })
      .eq('id', room.id);
  }, [room]);

  const finishSession = useCallback(async () => {
    if (!room) return;
    await supabase
      .from('collaborative_rooms')
      .update({ status: 'finished', finished_at: new Date().toISOString(), timer_running: false })
      .eq('id', room.id);
  }, [room]);

  const updateCurrentItem = useCallback(async (itemIndex: number) => {
    if (!room) return;
    await supabase
      .from('collaborative_rooms')
      .update({ current_item: itemIndex })
      .eq('id', room.id);
  }, [room]);

  const updateTimer = useCallback(async (seconds: number, running: boolean) => {
    if (!room) return;
    await supabase
      .from('collaborative_rooms')
      .update({ timer_seconds: seconds, timer_running: running })
      .eq('id', room.id);
  }, [room]);

  const kickParticipant = useCallback(async (participantId: string) => {
    if (!room) return;
    await supabase
      .from('room_participants')
      .update({ left_at: new Date().toISOString() })
      .eq('id', participantId);
  }, [room]);

  // Participant actions
  const setReady = useCallback(async (ready: boolean) => {
    if (!user || !room) return;
    await supabase
      .from('room_participants')
      .update({ is_ready: ready })
      .eq('room_id', room.id)
      .eq('user_id', user.id);
  }, [user, room]);

  const sendMessage = useCallback(async (message: string) => {
    if (!user || !room) return;
    await supabase
      .from('room_messages')
      .insert({
        room_id: room.id,
        user_id: user.id,
        message,
        message_type: 'text'
      });
  }, [user, room]);

  const submitScore = useCallback(async (itemIndex: number, score: number | null, scoreType: string) => {
    if (!user || !room) return;
    await supabase
      .from('room_scores')
      .upsert({
        room_id: room.id,
        evaluator_id: user.id,
        item_index: itemIndex,
        score,
        score_type: scoreType
      }, {
        onConflict: 'room_id,evaluator_id,item_index'
      });
  }, [user, room]);

  // Queries
  const getPublicRooms = useCallback(async (): Promise<Room[]> => {
    const { data } = await supabase
      .from('collaborative_rooms')
      .select('*')
      .eq('is_public', true)
      .in('status', ['waiting', 'active'])
      .order('created_at', { ascending: false })
      .limit(20);
    return data || [];
  }, []);

  const getRoomByCode = useCallback(async (code: string): Promise<Room | null> => {
    const { data } = await supabase
      .from('collaborative_rooms')
      .select('*')
      .eq('code', code)
      .single();
    return data;
  }, []);

  return {
    room,
    participants,
    messages,
    scores,
    loading,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    startSession,
    pauseSession,
    resumeSession,
    finishSession,
    updateCurrentItem,
    updateTimer,
    kickParticipant,
    setReady,
    sendMessage,
    submitScore,
    getPublicRooms,
    getRoomByCode
  };
}
