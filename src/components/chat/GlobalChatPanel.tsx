import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Users, Send, X, ChevronLeft, 
  MoreVertical, Trash2, Reply, ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGlobalChat } from '@/hooks/useGlobalChat';
import { useAuth } from '@/hooks/useAuth';
import { GlobalChatMessage, UserPresence } from '@/types/chat';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GlobalChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalChatPanel({ isOpen, onClose }: GlobalChatPanelProps) {
  const { user } = useAuth();
  const {
    messages,
    loadingMessages,
    sendMessage,
    deleteMessage,
    onlineUsers,
    onlineCount,
    conversations,
    privateMessages,
    unreadCount,
    sendPrivateMessage,
    loadPrivateMessages,
    markAsRead,
  } = useGlobalChat();

  const [activeTab, setActiveTab] = useState<'global' | 'private'>('global');
  const [messageInput, setMessageInput] = useState('');
  const [replyTo, setReplyTo] = useState<GlobalChatMessage | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [privateInput, setPrivateInput] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const privateMessagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para novas mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    privateMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [privateMessages]);

  // Carregar mensagens privadas quando selecionar usuário
  useEffect(() => {
    if (selectedUserId) {
      loadPrivateMessages(selectedUserId);
      markAsRead(selectedUserId);
    }
  }, [selectedUserId, loadPrivateMessages, markAsRead]);

  const handleSendGlobal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    try {
      await sendMessage(messageInput, replyTo?.id);
      setMessageInput('');
      setReplyTo(null);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  };

  const handleSendPrivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateInput.trim() || !selectedUserId) return;
    
    try {
      await sendPrivateMessage(selectedUserId, privateInput);
      setPrivateInput('');
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  };

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab('private');
  };

  // Renderizar link clicável
  const renderMessageContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline inline-flex items-center gap-1"
          >
            {part.length > 40 ? part.substring(0, 40) + '...' : part}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      return part;
    });
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatTime = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
  };

  if (!isOpen) return null;

  const selectedUser = onlineUsers.find(u => u.user_id === selectedUserId)?.user ||
    conversations.find(c => c.other_user_id === selectedUserId)?.other_user;

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-card border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-500" />
          <h2 className="font-semibold text-foreground">Chat Global</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'global' | 'private')} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-2" style={{ width: 'calc(100% - 32px)' }}>
          <TabsTrigger value="global" className="text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            Global
          </TabsTrigger>
          <TabsTrigger value="private" className="text-xs relative">
            <Users className="w-3 h-3 mr-1" />
            Privado
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Global Chat Tab */}
        <TabsContent value="global" className="flex-1 flex flex-col m-0 p-0">
          {/* Online Users Bar */}
          <div className="px-4 py-2 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{onlineCount} online</span>
            </div>
            <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
              {onlineUsers.slice(0, 8).map((presence) => (
                <button
                  key={presence.user_id}
                  onClick={() => handleUserClick(presence.user_id)}
                  className="flex-shrink-0"
                  title={presence.user?.full_name || 'Usuário'}
                >
                  <Avatar className="w-7 h-7 border-2 border-green-500">
                    <AvatarImage src={presence.user?.avatar_url || undefined} />
                    <AvatarFallback className="text-[10px] bg-primary/20">
                      {getInitials(presence.user?.full_name || null)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              ))}
              {onlineCount > 8 && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                  +{onlineCount - 8}
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {loadingMessages ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                Nenhuma mensagem ainda. Seja o primeiro!
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwn={msg.user_id === user?.id}
                    onReply={() => setReplyTo(msg)}
                    onDelete={() => deleteMessage(msg.id)}
                    onUserClick={() => handleUserClick(msg.user_id)}
                    renderContent={renderMessageContent}
                    getInitials={getInitials}
                    formatTime={formatTime}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Reply Preview */}
          {replyTo && (
            <div className="px-4 py-2 bg-secondary/50 border-t border-border flex items-center gap-2">
              <Reply className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 text-xs text-muted-foreground truncate">
                Respondendo a {replyTo.user?.full_name || 'Usuário'}
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setReplyTo(null)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendGlobal} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 text-sm"
              />
              <Button type="submit" size="icon" disabled={!messageInput.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* Private Chat Tab */}
        <TabsContent value="private" className="flex-1 flex flex-col m-0 p-0">
          {selectedUserId ? (
            <>
              {/* Private Chat Header */}
              <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedUserId(null)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selectedUser?.avatar_url || undefined} />
                  <AvatarFallback className="text-xs">
                    {getInitials(selectedUser?.full_name || null)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{selectedUser?.full_name || 'Usuário'}</span>
              </div>

              {/* Private Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {privateMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.sender_id === user?.id ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2",
                          msg.sender_id === user?.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        )}
                      >
                        <p className="text-sm break-words">{renderMessageContent(msg.content)}</p>
                        <p className="text-[10px] opacity-70 mt-1">
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={privateMessagesEndRef} />
                </div>
              </ScrollArea>

              {/* Private Input */}
              <form onSubmit={handleSendPrivate} className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={privateInput}
                    onChange={(e) => setPrivateInput(e.target.value)}
                    placeholder="Mensagem privada..."
                    className="flex-1 text-sm"
                  />
                  <Button type="submit" size="icon" disabled={!privateInput.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Conversations List */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  <p className="text-xs text-muted-foreground px-2 py-1 mb-2">
                    Usuários Online ({onlineCount})
                  </p>
                  {onlineUsers.map((presence) => (
                    <button
                      key={presence.user_id}
                      onClick={() => setSelectedUserId(presence.user_id)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="relative">
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={presence.user?.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {getInitials(presence.user?.full_name || null)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {presence.user?.full_name || 'Usuário'}
                      </span>
                    </button>
                  ))}

                  {conversations.length > 0 && (
                    <>
                      <p className="text-xs text-muted-foreground px-2 py-1 mt-4 mb-2">
                        Conversas Recentes
                      </p>
                      {conversations.map((conv) => (
                        <button
                          key={conv.other_user_id}
                          onClick={() => setSelectedUserId(conv.other_user_id)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <Avatar className="w-9 h-9">
                            <AvatarImage src={conv.other_user?.avatar_url || undefined} />
                            <AvatarFallback className="text-xs">
                              {getInitials(conv.other_user?.full_name || null)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {conv.other_user?.full_name || 'Usuário'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {conv.last_message}
                            </p>
                          </div>
                          {conv.unread_count > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                              {conv.unread_count}
                            </span>
                          )}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente de bolha de mensagem
interface MessageBubbleProps {
  message: GlobalChatMessage;
  isOwn: boolean;
  onReply: () => void;
  onDelete: () => void;
  onUserClick: () => void;
  renderContent: (content: string) => React.ReactNode;
  getInitials: (name: string | null) => string;
  formatTime: (date: string) => string;
}

function MessageBubble({
  message,
  isOwn,
  onReply,
  onDelete,
  onUserClick,
  renderContent,
  getInitials,
  formatTime,
}: MessageBubbleProps) {
  return (
    <div className={cn("flex gap-2", isOwn && "flex-row-reverse")}>
      <button onClick={onUserClick} className="flex-shrink-0">
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.user?.avatar_url || undefined} />
          <AvatarFallback className="text-xs bg-primary/20">
            {getInitials(message.user?.full_name || null)}
          </AvatarFallback>
        </Avatar>
      </button>
      <div className={cn("flex-1 min-w-0", isOwn && "flex flex-col items-end")}>
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={onUserClick}
            className="text-xs font-medium text-foreground hover:underline"
          >
            {message.user?.full_name || 'Usuário'}
          </button>
          <span className="text-[10px] text-muted-foreground">
            {formatTime(message.created_at)}
          </span>
        </div>
        <div
          className={cn(
            "rounded-lg px-3 py-2 max-w-[85%] group relative",
            isOwn ? "bg-primary text-primary-foreground" : "bg-secondary"
          )}
        >
          <p className="text-sm break-words">{renderContent(message.content)}</p>
          
          {/* Actions */}
          <div className={cn(
            "absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity",
            isOwn ? "left-0 -translate-x-full pr-1" : "right-0 translate-x-full pl-1"
          )}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isOwn ? "start" : "end"}>
                <DropdownMenuItem onClick={onReply}>
                  <Reply className="w-3 h-3 mr-2" />
                  Responder
                </DropdownMenuItem>
                {isOwn && (
                  <DropdownMenuItem onClick={onDelete} className="text-red-500">
                    <Trash2 className="w-3 h-3 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
