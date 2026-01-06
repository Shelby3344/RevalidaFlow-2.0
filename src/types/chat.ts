// Tipos para o sistema de chat global

export interface GlobalChatMessage {
  id: string;
  user_id: string;
  content: string;
  reply_to_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  user?: ChatUser;
  reply_to?: GlobalChatMessage;
}

export interface PrivateMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
  // Joined data
  sender?: ChatUser;
  receiver?: ChatUser;
}

export interface UserPresence {
  user_id: string;
  status: 'online' | 'away' | 'offline';
  last_seen: string;
  updated_at: string;
  // Joined data
  user?: ChatUser;
}

export interface ChatUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface Conversation {
  other_user_id: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  other_user?: ChatUser;
}

export interface ChatState {
  isOpen: boolean;
  activeTab: 'global' | 'private';
  selectedUserId: string | null;
}
