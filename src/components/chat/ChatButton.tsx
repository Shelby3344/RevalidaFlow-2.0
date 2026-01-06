import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalChatPanel } from './GlobalChatPanel';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface ChatButtonProps {
  isExpanded: boolean;
  isMobile?: boolean;
}

export function ChatButton({ isExpanded, isMobile }: ChatButtonProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);

  // Carregar contagem de não lidas e online
  useEffect(() => {
    if (!user) return;

    const loadCounts = async () => {
      // Contagem de não lidas
      const { data: unread } = await supabase
        .rpc('get_unread_messages_count', { p_user_id: user.id });
      setUnreadCount(unread || 0);

      // Contagem de online
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from('user_presence')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'online')
        .gte('last_seen', twoMinutesAgo);
      setOnlineCount(count || 0);
    };

    loadCounts();

    // Atualizar a cada 30 segundos
    const interval = setInterval(loadCounts, 30000);

    // Subscription para atualizações em tempo real
    const channel = supabase
      .channel('chat-counts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'private_messages' },
        (payload) => {
          if (payload.new.receiver_id === user.id) {
            setUnreadCount(prev => prev + 1);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_presence' },
        () => {
          loadCounts();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Resetar contagem quando abrir o chat
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      // A contagem será atualizada pelo hook useGlobalChat quando marcar como lida
    }
  }, [isOpen, unreadCount]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center py-2 px-3 text-[13px] rounded-lg w-full",
          "transition-all duration-200",
          "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          "bg-gradient-to-r from-cyan-600/10 to-blue-600/10 hover:from-cyan-600/20 hover:to-blue-600/20",
          (!isExpanded && !isMobile) && "justify-center"
        )}
      >
        <div className="relative">
          <MessageCircle className={cn("w-4 h-4", (isExpanded || isMobile) && "mr-2")} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
        {(isExpanded || isMobile) && (
          <>
            <span className="flex-1 text-left">Chat Global</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-muted-foreground">{onlineCount}</span>
            </div>
          </>
        )}
      </button>

      <GlobalChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
