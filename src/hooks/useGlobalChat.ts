import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { GlobalChatMessage, ChatUser, UserPresence, PrivateMessage, Conversation } from '@/types/chat';

interface UseGlobalChatReturn {
  messages: GlobalChatMessage[];
  loadingMessages: boolean;
  sendMessage: (content: string, replyToId?: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  onlineUsers: UserPresence[];
  onlineCount: number;
  conversations: Conversation[];
  privateMessages: PrivateMessage[];
  unreadCount: number;
  sendPrivateMessage: (receiverId: string, content: string) => Promise<void>;
  loadPrivateMessages: (otherUserId: string) => Promise<void>;
  markAsRead: (otherUserId: string) => Promise<void>;
  updatePresence: (status: 'online' | 'away' | 'offline') => Promise<void>;
}

export function useGlobalChat(): UseGlobalChatReturn {
  const { user } = useAuth();
  
  const [messages, setMessages] = useState<GlobalChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const isInitializedRef = useRef(false);

  // Carregar mensagens globais
  const loadMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('global_chat_messages')
        .select(`
          *,
          user:profiles!global_chat_messages_user_id_fkey(id, full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      setMessages((data || []).reverse());
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Carregar usuários online
  const loadOnlineUsers = useCallback(async () => {
    try {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('user_presence')
        .select(`
          *,
          user:profiles!user_presence_user_id_fkey(id, full_name, avatar_url)
        `)
        .eq('status', 'online')
        .gte('last_seen', twoMinutesAgo);
      
      if (error) throw error;
      setOnlineUsers(data || []);
    } catch (error) {
      console.error('Erro ao carregar usuários online:', error);
    }
  }, []);

  // Carregar conversas privadas
  const loadConversations = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .rpc('get_conversations', { p_user_id: user.id });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const userIds = data.map((c: Conversation) => c.other_user_id);
        const { data: users } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);
        
        const usersMap = new Map(users?.map(u => [u.id, u]) || []);
        const conversationsWithUsers = data.map((c: Conversation) => ({
          ...c,
          other_user: usersMap.get(c.other_user_id)
        }));
        
        setConversations(conversationsWithUsers);
      } else {
        setConversations([]);
      }
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    }
  }, [user]);

  // Carregar contagem de não lidas
  const loadUnreadCount = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .rpc('get_unread_messages_count', { p_user_id: user.id });
      
      if (error) throw error;
      setUnreadCount(data || 0);
    } catch (error) {
      console.error('Erro ao carregar não lidas:', error);
    }
  }, [user]);

  // Enviar mensagem global - agora adiciona localmente também
  const sendMessage = useCallback(async (content: string, replyToId?: string) => {
    if (!user || !content.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('global_chat_messages')
        .insert({
          user_id: user.id,
          content: content.trim(),
          reply_to_id: replyToId || null
        })
        .select(`
          *,
          user:profiles!global_chat_messages_user_id_fkey(id, full_name, avatar_url)
        `)
        .single();
      
      if (error) throw error;
      
      // Adicionar mensagem localmente imediatamente
      if (data) {
        setMessages(prev => [...prev, data as GlobalChatMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }, [user]);

  // Deletar mensagem
  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('global_chat_messages')
        .delete()
        .eq('id', messageId);
      
      if (error) throw error;
      
      // Remover localmente
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      throw error;
    }
  }, []);

  // Carregar mensagens privadas com um usuário
  const loadPrivateMessages = useCallback(async (otherUserId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('private_messages')
        .select(`
          *,
          sender:profiles!private_messages_sender_id_fkey(id, full_name, avatar_url),
          receiver:profiles!private_messages_receiver_id_fkey(id, full_name, avatar_url)
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true })
        .limit(100);
      
      if (error) throw error;
      setPrivateMessages(data || []);
    } catch (error) {
      console.error('Erro ao carregar mensagens privadas:', error);
    }
  }, [user]);

  // Enviar mensagem privada
  const sendPrivateMessage = useCallback(async (receiverId: string, content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      const { error } = await supabase
        .from('private_messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim()
        });
      
      if (error) throw error;
      
      await loadPrivateMessages(receiverId);
      await loadConversations();
    } catch (error) {
      console.error('Erro ao enviar mensagem privada:', error);
      throw error;
    }
  }, [user, loadPrivateMessages, loadConversations]);

  // Marcar mensagens como lidas
  const markAsRead = useCallback(async (otherUserId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('private_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('sender_id', otherUserId)
        .eq('receiver_id', user.id)
        .is('read_at', null);
      
      if (error) throw error;
      
      await loadUnreadCount();
      await loadConversations();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  }, [user, loadUnreadCount, loadConversations]);

  // Atualizar presença
  const updatePresence = useCallback(async (status: 'online' | 'away' | 'offline') => {
    if (!user) return;
    
    try {
      await supabase
        .from('user_presence')
        .upsert({
          user_id: user.id,
          status,
          last_seen: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Erro ao atualizar presença:', error);
    }
  }, [user]);

  // Setup inicial e realtime (roda uma vez)
  useEffect(() => {
    if (!user || isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Carregar dados iniciais
    loadMessages();
    loadOnlineUsers();
    loadConversations();
    loadUnreadCount();
    updatePresence('online');

    // Criar canal de realtime
    const channel = supabase
      .channel('global-chat-' + user.id)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'global_chat_messages' },
        async (payload) => {
          // Só adicionar se não for nossa própria mensagem (já adicionamos localmente)
          if (payload.new.user_id !== user.id) {
            const { data: userData } = await supabase
              .from('profiles')
              .select('id, full_name, avatar_url')
              .eq('id', payload.new.user_id)
              .single();
            
            const newMessage: GlobalChatMessage = {
              ...payload.new as GlobalChatMessage,
              user: userData as ChatUser
            };
            
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'global_chat_messages' },
        (payload) => {
          setMessages(prev => prev.filter(m => m.id !== payload.old.id));
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'private_messages' },
        (payload) => {
          const msg = payload.new as PrivateMessage;
          if (msg.receiver_id === user.id) {
            loadUnreadCount();
            loadConversations();
          }
        }
      )
      .subscribe();

    // Heartbeat de presença
    const presenceInterval = setInterval(() => {
      updatePresence('online');
    }, 30000);

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
      clearInterval(presenceInterval);
      updatePresence('offline');
      isInitializedRef.current = false;
    };
  }, [user, loadMessages, loadOnlineUsers, loadConversations, loadUnreadCount, updatePresence]);

  return {
    messages,
    loadingMessages,
    sendMessage,
    deleteMessage,
    onlineUsers,
    onlineCount: onlineUsers.length,
    conversations,
    privateMessages,
    unreadCount,
    sendPrivateMessage,
    loadPrivateMessages,
    markAsRead,
    updatePresence
  };
}
