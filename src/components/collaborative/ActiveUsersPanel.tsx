import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Crown, 
  Clock, 
  RefreshCw, 
  UserPlus,
  Eye,
  Lock,
  Globe
} from 'lucide-react';
import { RoomStateManager } from '@/services/RoomStateManager';
import { TrainingRoom } from '@/types/checklists';
import { cn } from '@/lib/utils';

interface ActiveUsersPanelProps {
  onJoinRoom?: (roomId: string) => void;
}

export function ActiveUsersPanel({ onJoinRoom }: ActiveUsersPanelProps) {
  const [activeRooms, setActiveRooms] = useState<TrainingRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadActiveRooms = () => {
    setIsLoading(true);
    try {
      const roomManager = RoomStateManager.getInstance();
      // Buscar todas as salas ativas (públicas e privadas)
      const allRooms = roomManager.getAllActiveRooms();
      
      setActiveRooms(allRooms);
      
      const stats = roomManager.getRoomStats();
      console.log('Stats das salas:', stats);
    } catch (error) {
      console.error('Erro ao carregar salas ativas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActiveRooms();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(loadActiveRooms, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins}min atrás`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    return 'Há mais de 1 dia';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Aguardando';
      case 'active':
        return 'Em Andamento';
      case 'paused':
        return 'Pausada';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Usuários Ativos
          </h2>
          <Badge variant="secondary" className="text-xs">
            {activeRooms.length} sala{activeRooms.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={loadActiveRooms}
          disabled={isLoading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Carregando...</span>
          </div>
        ) : activeRooms.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-sm font-medium text-foreground mb-2">
              Nenhum usuário ativo
            </h3>
            <p className="text-xs text-muted-foreground">
              Seja o primeiro a criar uma sala!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeRooms.map((room) => (
              <div
                key={room.id}
                className={cn(
                  "group relative border rounded-lg p-3 hover:bg-secondary/50 transition-colors",
                  room.type === 'public' 
                    ? "bg-green-500/5 border-green-500/20 hover:border-green-500/30" 
                    : "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/30"
                )}
              >
                {/* Header do usuário */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {/* Avatar do host */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-2 border-primary/20">
                        <span className="text-sm font-bold text-primary">
                          {room.hostName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {/* Indicador de host */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <Crown className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>

                    {/* Info do usuário */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground truncate">
                          {room.hostName}
                        </h3>
                        <div className="flex items-center gap-1">
                          {room.type === 'private' ? (
                            <Lock className="w-3 h-3 text-muted-foreground" />
                          ) : (
                            <Globe className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs border", getStatusColor(room.status))}
                        >
                          {getStatusText(room.status)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {room.areaCode}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {room.type === 'public' ? (
                      room.currentParticipants < room.maxParticipants ? (
                        <Button
                          size="sm"
                          onClick={() => onJoinRoom?.(room.id)}
                          className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Entrar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          disabled
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Cheia
                        </Button>
                      )
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs text-muted-foreground"
                        disabled
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        Privada
                      </Button>
                    )}
                  </div>
                </div>

                {/* Detalhes da sala */}
                <div className="ml-13 space-y-1">
                  <p className="text-xs text-muted-foreground truncate">
                    <strong>Caso:</strong> {room.checklistTitle}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {room.currentParticipants}/{room.maxParticipants}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(room.createdAt)}
                      </span>
                    </div>
                    
                    {room.settings.allowChat && (
                      <Badge variant="outline" className="text-xs">
                        Chat ativo
                      </Badge>
                    )}
                  </div>

                  {/* Lista de participantes */}
                  {room.participants.length > 1 && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs text-muted-foreground">Participantes:</span>
                      <div className="flex -space-x-1">
                        {room.participants.slice(0, 3).map((participant, index) => (
                          <div
                            key={participant.userId}
                            className="w-5 h-5 rounded-full bg-secondary border border-border flex items-center justify-center"
                            title={participant.userName}
                          >
                            <span className="text-xs font-medium">
                              {participant.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ))}
                        {room.participants.length > 3 && (
                          <div className="w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center">
                            <span className="text-xs">+{room.participants.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {activeRooms.length > 0 && (
        <div className="px-4 py-3 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Atualizado automaticamente a cada 30 segundos
          </p>
        </div>
      )}
    </div>
  );
}