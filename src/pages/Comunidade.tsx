import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, Trophy, Users, X, Send, 
  Flame, Clock, TrendingUp, TrendingDown,
  Play, ExternalLink, MoreVertical, Trash2, Reply,
  ChevronUp, ChevronDown, Target, Sparkles, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useGlobalChat } from '@/hooks/useGlobalChat';
import { useAdvancedPresence } from '@/hooks/useAdvancedPresence';
import { useRankings } from '@/hooks/useRankings';
import { useStudyMatcher } from '@/hooks/useStudyMatcher';
import { useGamification } from '@/hooks/useGamification';
import { GlobalChatMessage } from '@/types/chat';
import { LevelBadge } from '@/components/community/LevelBadge';
import { StudyingNowBadge } from '@/components/community/AchievementBadge';
import { UserProfileModal } from '@/components/community/UserProfileModal';
import { StudyInviteList } from '@/components/community/StudyInviteCard';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Comunidade() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalPoints, level, levelProgress } = useGamification();
  const {
    messages,
    loadingMessages,
    sendMessage,
    deleteMessage,
  } = useGlobalChat();
  const { 
    onlineUsers, 
    studyingNowUsers, 
    onlineCount, 
    studyingCount 
  } = useAdvancedPresence();
  const { 
    rankings, 
    currentUserRank, 
    loadRanking, 
    activeFilter, 
    loading: loadingRankings 
  } = useRankings();
  const { 
    matches, 
    loadingMatches, 
    pendingInvites, 
    findMatches, 
    sendInvite, 
    respondToInvite,
    sentInvites
  } = useStudyMatcher();

  const [activeTab, setActiveTab] = useState<'chat' | 'rankings' | 'match'>('chat');
  const [messageInput, setMessageInput] = useState('');
  const [replyTo, setReplyTo] = useState<GlobalChatMessage | null>(null);
  const [profileUserId, setProfileUserId] = useState<string | null>(null);
  const [rankingFilter, setRankingFilter] = useState<'top_day' | 'top_week' | 'same_goal'>('top_day');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load initial ranking
  useEffect(() => {
    loadRanking('top_day');
  }, [loadRanking]);

  const handleSendMessage = async (e: React.FormEvent) => {
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

  const handleRankingFilterChange = (filter: 'top_day' | 'top_week' | 'same_goal') => {
    setRankingFilter(filter);
    loadRanking(filter);
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatTime = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
  };

  const isUserStudying = (userId: string) => {
    return studyingNowUsers.some(u => u.user_id === userId);
  };

  const renderMessageContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer"
            className="text-cyan-400 hover:underline inline-flex items-center gap-1">
            {part.length > 40 ? part.substring(0, 40) + '...' : part}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      return part;
    });
  };

  // Mock data for header stats (would come from real hooks)
  const todayHours = 2.5;
  const currentStreak = 7;
  const todayRank = currentUserRank || 12;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in fade-in duration-300">
      {/* HEADER FIXO */}
      <header className="flex-shrink-0 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary/20">
                  {getInitials(user?.user_metadata?.full_name || user?.email)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {user?.user_metadata?.full_name || user?.user_metadata?.name || 'Estudante'}
                  </span>
                  <LevelBadge level={level} points={totalPoints} size="sm" />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {todayHours}h hoje
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {currentStreak} dias
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    #{todayRank} hoje
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Online Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-lg font-bold text-foreground">{onlineCount}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">online</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span className="text-lg font-bold text-green-500">{studyingCount}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">estudando</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Button onClick={() => navigate('/checklists')} className="gap-2">
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Começar a estudar</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto">
          <Tabs 
            value={activeTab} 
            onValueChange={(v) => setActiveTab(v as any)} 
            className="h-full flex flex-col"
          >
            {/* Tab Navigation */}
            <div className="flex-shrink-0 border-b border-border px-4">
              <TabsList className="h-12 bg-transparent gap-1">
                <TabsTrigger 
                  value="chat" 
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Global
                </TabsTrigger>
                <TabsTrigger 
                  value="rankings" 
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Rankings
                </TabsTrigger>
                <TabsTrigger 
                  value="match" 
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 relative"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Match de Estudo
                  {pendingInvites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {pendingInvites.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-hidden">
              {/* ========== ABA CHAT ========== */}
              <TabsContent value="chat" className="h-full m-0 p-0">
                <div className="h-full flex">
                  {/* Chat Area */}
                  <div className="flex-1 flex flex-col">
                    {/* Studying Now Bar */}
                    {studyingNowUsers.length > 0 && (
                      <div className="flex-shrink-0 px-4 py-2 bg-green-500/10 border-b border-green-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-green-500 font-medium">📚 Estudando agora:</span>
                          <div className="flex -space-x-2">
                            {studyingNowUsers.slice(0, 8).map((u) => (
                              <button
                                key={u.user_id}
                                onClick={() => setProfileUserId(u.user_id)}
                                className="relative"
                                title={u.user?.full_name || 'Usuário'}
                              >
                                <Avatar className="w-7 h-7 border-2 border-green-500">
                                  <AvatarImage src={u.user?.avatar_url || undefined} />
                                  <AvatarFallback className="text-[10px] bg-green-500/20">
                                    {getInitials(u.user?.full_name || null)}
                                  </AvatarFallback>
                                </Avatar>
                              </button>
                            ))}
                          </div>
                          {studyingNowUsers.length > 8 && (
                            <span className="text-xs text-green-500">+{studyingNowUsers.length - 8}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      {loadingMessages ? (
                        <div className="flex items-center justify-center h-32">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <MessageCircle className="w-12 h-12 text-muted-foreground mb-3" />
                          <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                          <p className="text-sm text-muted-foreground">Seja o primeiro a enviar!</p>
                        </div>
                      ) : (
                        <div className="space-y-4 max-w-3xl mx-auto">
                          {messages.map((msg) => (
                            <ChatMessage
                              key={msg.id}
                              message={msg}
                              isOwn={msg.user_id === user?.id}
                              isStudying={isUserStudying(msg.user_id)}
                              onReply={() => setReplyTo(msg)}
                              onDelete={() => deleteMessage(msg.id)}
                              onUserClick={() => setProfileUserId(msg.user_id)}
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
                      <div className="flex-shrink-0 px-4 py-2 bg-secondary/50 border-t border-border flex items-center gap-2 max-w-3xl mx-auto w-full">
                        <Reply className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1 text-sm text-muted-foreground truncate">
                          Respondendo a <span className="font-medium">{replyTo.user?.full_name || 'Usuário'}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setReplyTo(null)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}

                    {/* Input */}
                    <div className="flex-shrink-0 p-4 border-t border-border">
                      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
                        <div className="flex gap-3">
                          <Input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Digite sua mensagem para a comunidade..."
                            className="flex-1"
                          />
                          <Button type="submit" disabled={!messageInput.trim()}>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Online Users Sidebar */}
                  <div className="hidden lg:block w-72 border-l border-border bg-card/50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Online ({onlineCount})
                      </h3>
                    </div>
                    <ScrollArea className="h-[calc(100%-60px)]">
                      <div className="p-2 space-y-1">
                        {onlineUsers.map((presence) => (
                          <button
                            key={presence.user_id}
                            onClick={() => setProfileUserId(presence.user_id)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                          >
                            <div className="relative">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={presence.user?.avatar_url || undefined} />
                                <AvatarFallback className="text-xs bg-primary/20">
                                  {getInitials(presence.user?.full_name || null)}
                                </AvatarFallback>
                              </Avatar>
                              <span className={cn(
                                "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
                                presence.activity_type === 'studying' ? 'bg-green-500' : 'bg-blue-500'
                              )} />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <p className="text-sm font-medium truncate">
                                {presence.user?.full_name || 'Usuário'}
                              </p>
                              {presence.activity_type === 'studying' && (
                                <p className="text-[10px] text-green-500">📚 Estudando</p>
                              )}
                            </div>
                            <LevelBadge level={presence.user?.level || 'bronze'} size="sm" showTooltip={false} />
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>


              {/* ========== ABA RANKINGS ========== */}
              <TabsContent value="rankings" className="h-full m-0 p-0 overflow-auto">
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                  {/* Ranking Filters */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      Rankings
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant={rankingFilter === 'top_day' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleRankingFilterChange('top_day')}
                      >
                        Hoje
                      </Button>
                      <Button
                        variant={rankingFilter === 'top_week' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleRankingFilterChange('top_week')}
                      >
                        Semana
                      </Button>
                      <Button
                        variant={rankingFilter === 'same_goal' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleRankingFilterChange('same_goal')}
                      >
                        Mesmo Objetivo
                      </Button>
                    </div>
                  </div>

                  {/* Motivational Message */}
                  {currentUserRank && currentUserRank > 3 && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-500/20">
                      <p className="text-sm text-center">
                        <Sparkles className="w-4 h-4 inline mr-1 text-cyan-500" />
                        Você está a <span className="font-bold text-cyan-500">30 minutos</span> de subir 2 posições no ranking!
                      </p>
                    </div>
                  )}

                  {/* Your Position */}
                  {currentUserRank && (
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-primary">#{currentUserRank}</div>
                          <div>
                            <p className="font-medium">Sua posição</p>
                            <p className="text-sm text-muted-foreground">
                              {rankingFilter === 'top_day' ? 'Ranking de hoje' : 
                               rankingFilter === 'top_week' ? 'Ranking da semana' : 'Mesmo objetivo'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-500">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-medium">↑ 3 posições</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ranking List */}
                  {loadingRankings ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {rankings.map((entry, index) => {
                        const isCurrentUser = entry.user_id === user?.id;
                        const isTop3 = entry.rank <= 3;
                        
                        return (
                          <button
                            key={entry.user_id}
                            onClick={() => setProfileUserId(entry.user_id)}
                            className={cn(
                              "w-full flex items-center gap-4 p-4 rounded-xl transition-all",
                              isCurrentUser 
                                ? "bg-primary/10 border-2 border-primary/30" 
                                : "bg-card hover:bg-secondary/50 border border-border",
                              isTop3 && "shadow-lg"
                            )}
                          >
                            {/* Rank */}
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                              entry.rank === 1 && "bg-yellow-500/20 text-yellow-500",
                              entry.rank === 2 && "bg-gray-400/20 text-gray-400",
                              entry.rank === 3 && "bg-orange-500/20 text-orange-500",
                              entry.rank > 3 && "bg-secondary text-muted-foreground"
                            )}>
                              {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                            </div>

                            {/* Avatar */}
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={entry.avatar_url || undefined} />
                              <AvatarFallback className="bg-primary/20">
                                {getInitials(entry.full_name)}
                              </AvatarFallback>
                            </Avatar>

                            {/* Info */}
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "font-semibold",
                                  isCurrentUser && "text-primary"
                                )}>
                                  {entry.full_name || 'Usuário'}
                                  {isCurrentUser && ' (você)'}
                                </span>
                                <LevelBadge level={entry.level} size="sm" showTooltip={false} />
                                {isUserStudying(entry.user_id) && (
                                  <StudyingNowBadge size="sm" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {entry.total_points.toLocaleString()} pontos
                              </p>
                            </div>

                            {/* Metric */}
                            <div className="text-right">
                              <p className="text-xl font-bold">
                                {typeof entry.metric_value === 'number' 
                                  ? entry.metric_value.toFixed(1) 
                                  : entry.metric_value}h
                              </p>
                              <p className="text-xs text-muted-foreground">{entry.metric_label}</p>
                            </div>

                            {/* Trend */}
                            <div className={cn(
                              "flex items-center gap-1",
                              index % 2 === 0 ? "text-green-500" : "text-red-500"
                            )}>
                              {index % 2 === 0 ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </TabsContent>


              {/* ========== ABA MATCH ========== */}
              <TabsContent value="match" className="h-full m-0 p-0 overflow-auto">
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                      <Users className="w-6 h-6 text-purple-500" />
                      Match de Estudo
                    </h2>
                    <p className="text-muted-foreground">
                      Encontre parceiros compatíveis com seu perfil de estudo
                    </p>
                  </div>

                  {/* Pending Invites */}
                  {pendingInvites.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        Convites Recebidos ({pendingInvites.length})
                      </h3>
                      <StudyInviteList
                        invites={pendingInvites}
                        onAccept={(id) => respondToInvite(id, true)}
                        onDecline={(id) => respondToInvite(id, false)}
                        onUserClick={setProfileUserId}
                      />
                    </div>
                  )}

                  {/* Find Matches Button */}
                  <div className="flex justify-center">
                    <Button 
                      size="lg" 
                      onClick={findMatches}
                      disabled={loadingMatches}
                      className="gap-2 px-8"
                    >
                      {loadingMatches ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                          Buscando parceiros...
                        </>
                      ) : (
                        <>
                          <Users className="w-5 h-5" />
                          Encontrar parceiro de estudo
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Match Results */}
                  {matches.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {matches.map((match) => {
                        const hasInvited = sentInvites.some(
                          inv => inv.receiver_id === match.user_id && inv.status === 'pending'
                        );
                        
                        return (
                          <div 
                            key={match.user_id}
                            className="bg-card rounded-xl border border-border p-5 space-y-4"
                          >
                            {/* Header */}
                            <div className="flex items-center gap-4">
                              <button onClick={() => setProfileUserId(match.user_id)}>
                                <Avatar className="w-14 h-14">
                                  <AvatarImage src={match.avatar_url || undefined} />
                                  <AvatarFallback className="bg-primary/20 text-lg">
                                    {getInitials(match.full_name)}
                                  </AvatarFallback>
                                </Avatar>
                              </button>
                              <div className="flex-1">
                                <button 
                                  onClick={() => setProfileUserId(match.user_id)}
                                  className="font-semibold hover:underline"
                                >
                                  {match.full_name || 'Usuário'}
                                </button>
                                <div className="flex items-center gap-2 mt-1">
                                  <LevelBadge level={match.level} size="sm" />
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-purple-500">
                                  {match.compatibility_score}%
                                </div>
                                <div className="text-xs text-muted-foreground">compatível</div>
                              </div>
                            </div>

                            {/* Info Tags */}
                            <div className="flex flex-wrap gap-2">
                              {match.study_goal && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                                  <Target className="w-3 h-3" />
                                  {match.study_goal}
                                </span>
                              )}
                              {match.main_module && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                                  📚 {match.main_module}
                                </span>
                              )}
                            </div>

                            {/* Compatibility Breakdown */}
                            <div className="space-y-2">
                              <CompatibilityBar label="Dedicação" value={match.matching_criteria.dedication_match} max={40} />
                              <CompatibilityBar label="Objetivo" value={match.matching_criteria.goal_match} max={30} />
                              <CompatibilityBar label="Horários" value={match.matching_criteria.schedule_match} max={20} />
                              <CompatibilityBar label="Módulo" value={match.matching_criteria.module_match} max={10} />
                            </div>

                            {/* Action */}
                            <Button 
                              className="w-full"
                              onClick={() => sendInvite(match.user_id, 'Oi! Gostaria de estudar junto?')}
                              disabled={hasInvited}
                            >
                              {hasInvited ? 'Convite enviado' : 'Convidar para estudar'}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : !loadingMatches && (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Clique no botão acima para encontrar parceiros de estudo compatíveis
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      {/* Profile Modal */}
      <UserProfileModal
        userId={profileUserId || ''}
        isOpen={!!profileUserId}
        onClose={() => setProfileUserId(null)}
        onInvite={(userId) => {
          sendInvite(userId, 'Oi! Gostaria de estudar junto?');
          setProfileUserId(null);
        }}
        isStudying={profileUserId ? isUserStudying(profileUserId) : false}
      />
    </div>
  );
}


// ========== SUBCOMPONENTS ==========

interface ChatMessageProps {
  message: GlobalChatMessage;
  isOwn: boolean;
  isStudying: boolean;
  onReply: () => void;
  onDelete: () => void;
  onUserClick: () => void;
  renderContent: (content: string) => React.ReactNode;
  getInitials: (name: string | null) => string;
  formatTime: (date: string) => string;
}

function ChatMessage({
  message,
  isOwn,
  isStudying,
  onReply,
  onDelete,
  onUserClick,
  renderContent,
  getInitials,
  formatTime,
}: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
      <button onClick={onUserClick} className="flex-shrink-0 relative">
        <Avatar className={cn(
          "w-10 h-10",
          isStudying && "ring-2 ring-green-500"
        )}>
          <AvatarImage src={message.user?.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/20">
            {getInitials(message.user?.full_name || null)}
          </AvatarFallback>
        </Avatar>
        {isStudying && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        )}
      </button>
      
      <div className={cn("flex-1 max-w-xl", isOwn && "flex flex-col items-end")}>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <button onClick={onUserClick} className="text-sm font-semibold hover:underline">
            {message.user?.full_name || 'Usuário'}
          </button>
          {isStudying && <StudyingNowBadge size="sm" />}
          <span className="text-xs text-muted-foreground">
            {formatTime(message.created_at)}
          </span>
        </div>
        
        <div className={cn(
          "rounded-2xl px-4 py-2.5 group relative",
          isOwn 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "bg-secondary rounded-tl-sm"
        )}>
          <p className="text-sm leading-relaxed break-words">
            {renderContent(message.content)}
          </p>
          
          {/* Actions */}
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
            isOwn ? "left-0 -translate-x-full pr-2" : "right-0 translate-x-full pl-2"
          )}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isOwn ? "start" : "end"}>
                <DropdownMenuItem onClick={onReply}>
                  <Reply className="w-4 h-4 mr-2" />
                  Responder
                </DropdownMenuItem>
                {isOwn && (
                  <DropdownMenuItem onClick={onDelete} className="text-red-500">
                    <Trash2 className="w-4 h-4 mr-2" />
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

interface CompatibilityBarProps {
  label: string;
  value: number;
  max: number;
}

function CompatibilityBar({ label, value, max }: CompatibilityBarProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-20">{label}</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-12 text-right">{value}/{max}</span>
    </div>
  );
}
