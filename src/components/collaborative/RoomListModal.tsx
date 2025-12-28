import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Users, Search, RefreshCw, Clock } from 'lucide-react';
import { RoomStateManager } from '@/services/RoomStateManager';
import { TrainingRoom } from '@/types/checklists';

interface RoomListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinRoom?: (roomId: string) => void;
}

export function RoomListModal({
  open,
  onOpenChange,
  onJoinRoom,
}: RoomListModalProps) {
  const [rooms, setRooms] = useState<TrainingRoom[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<TrainingRoom[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle ESC key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      loadRooms();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  // Filter rooms when search term changes
  useEffect(() => {
    let filtered = rooms;

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.hostName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRooms(filtered);
  }, [rooms, searchTerm]);

  const loadRooms = () => {
    setIsLoading(true);
    try {
      const roomManager = RoomStateManager.getInstance();
      const publicRooms = roomManager.getPublicRooms();
      setRooms(publicRooms);
    } catch (error) {
      console.error('Erro ao carregar salas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    onJoinRoom?.(roomId);
    onOpenChange(false);
  };

  const getStatusBadge = (room: TrainingRoom) => {
    switch (room.status) {
      case 'waiting':
        return <Badge variant="secondary">Aguardando</Badge>;
      case 'active':
        return <Badge variant="default">Em andamento</Badge>;
      case 'paused':
        return <Badge variant="outline">Pausada</Badge>;
      default:
        return null;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins}min atrás`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  };

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl bg-background border border-border rounded-lg shadow-xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Salas Públicas de Treino
              </h2>
              <p className="text-sm text-muted-foreground">
                Encontre salas abertas para praticar casos clínicos colaborativamente.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-lg hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 sm:px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por host..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Refresh */}
            <Button
              variant="outline"
              size="sm"
              onClick={loadRooms}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Carregando salas...</span>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {rooms.length === 0 ? 'Nenhuma sala pública disponível' : 'Nenhuma sala encontrada'}
              </h3>
              <p className="text-muted-foreground">
                {rooms.length === 0 
                  ? 'Seja o primeiro a criar uma sala pública!'
                  : 'Tente ajustar os filtros de busca.'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-foreground truncate">
                          {room.checklistTitle}
                        </h3>
                        {getStatusBadge(room)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{room.currentParticipants}/{room.maxParticipants}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{getTimeAgo(room.createdAt)}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Host: <span className="font-medium">{room.hostName}</span>
                      </p>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <Button
                        onClick={() => handleJoinRoom(room.id)}
                        disabled={room.currentParticipants >= room.maxParticipants}
                        size="sm"
                      >
                        {room.currentParticipants >= room.maxParticipants ? 'Cheia' : 'Entrar'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/30 flex-shrink-0">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {filteredRooms.length} sala{filteredRooms.length !== 1 ? 's' : ''} encontrada{filteredRooms.length !== 1 ? 's' : ''}
            </span>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}