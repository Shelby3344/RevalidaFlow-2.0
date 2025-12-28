import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X, Users, Clock, MessageCircle } from 'lucide-react';
import { RoomStateManager } from '@/services/RoomStateManager';
import { CreateRoomConfig, AreaCode } from '@/types/checklists';

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklistId: string;
  checklistTitle: string;
  areaCode: AreaCode;
  onRoomCreated?: (roomId: string, roomCode?: string) => void;
}

export function CreateRoomModal({
  open,
  onOpenChange,
  checklistId,
  checklistTitle,
  areaCode,
  onRoomCreated,
}: CreateRoomModalProps) {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState<'public' | 'private'>('public');
  const [hostName, setHostName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [allowChat, setAllowChat] = useState(true);
  const [allowLateJoin, setAllowLateJoin] = useState(true);
  const [sessionDuration, setSessionDuration] = useState<number | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);

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
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  const handleCreate = async () => {
    if (!hostName.trim()) return;

    setIsCreating(true);

    try {
      const roomManager = RoomStateManager.getInstance();
      
      // Simular ID do usuário (em produção viria da autenticação)
      const hostId = `user_${Date.now()}`;

      const config: CreateRoomConfig = {
        type: roomType,
        checklistId,
        checklistTitle,
        areaCode,
        maxParticipants,
        settings: {
          allowChat,
          allowLateJoin,
          autoStart: false,
          sessionDuration,
        },
      };

      const room = roomManager.createRoom(hostId, hostName.trim(), config);

      // Callback para o componente pai
      onRoomCreated?.(room.id, room.code);

      // Navegar diretamente para a sala
      navigate(`/collaborative/${room.id}`);

      // Fechar modal
      onOpenChange(false);

      // Reset form
      setHostName('');
      setMaxParticipants(4);
      setAllowChat(true);
      setAllowLateJoin(true);
      setSessionDuration(undefined);
    } catch (error) {
      console.error('Erro ao criar sala:', error);
    } finally {
      setIsCreating(false);
    }
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
      <div className="relative z-10 w-full max-w-lg bg-background border border-border rounded-lg shadow-xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Criar Sala de Treino
              </h2>
              <p className="text-sm text-muted-foreground">
                Crie uma sala para praticar casos clínicos colaborativamente.
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

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col min-h-0">
          <div className="space-y-6">
            {/* Checklist Info */}
            <div className="space-y-2">
              <Label>Caso Clínico</Label>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium text-foreground">{checklistTitle}</p>
                <p className="text-xs text-muted-foreground">Área: {areaCode}</p>
              </div>
            </div>

            {/* Host Name */}
            <div className="space-y-2">
              <Label htmlFor="hostName">Seu nome (Host da sala)</Label>
              <Input
                id="hostName"
                placeholder="Digite seu nome"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
            </div>

            {/* Room Type */}
            <div className="space-y-3">
              <Label>Tipo de Sala</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoomType('public')}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    roomType === 'public'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">Pública</div>
                  <div className="text-xs text-muted-foreground">
                    Visível para todos os usuários
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRoomType('private')}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    roomType === 'private'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">Privada</div>
                  <div className="text-xs text-muted-foreground">
                    Acesso apenas por código
                  </div>
                </button>
              </div>
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">
                <Users className="w-4 h-4 inline mr-1" />
                Máximo de participantes
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                min="2"
                max="8"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Entre 2 e 8 participantes</p>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <Label>Configurações da Sala</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Chat habilitado</div>
                      <div className="text-xs text-muted-foreground">
                        Permitir comunicação por texto
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={allowChat}
                    onCheckedChange={setAllowChat}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Entrada tardia</div>
                      <div className="text-xs text-muted-foreground">
                        Permitir entrar após o início
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={allowLateJoin}
                    onCheckedChange={setAllowLateJoin}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="sessionDuration">Duração da sessão (minutos)</Label>
                  </div>
                  <Input
                    id="sessionDuration"
                    type="number"
                    min="10"
                    max="120"
                    placeholder="Opcional"
                    value={sessionDuration || ''}
                    onChange={(e) => setSessionDuration(e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Deixe vazio para sessão sem limite de tempo
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-primary/10 rounded-lg p-3 text-sm">
              <p className="text-primary font-medium mb-1">Como funciona:</p>
              <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-xs">
                <li>Você será o host e controlará a sessão</li>
                <li>{roomType === 'private' ? 'Compartilhe o código com os participantes' : 'A sala aparecerá na lista pública'}</li>
                <li>Todos verão as ações em tempo real</li>
                <li>Use o chat para discutir o caso clínico</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/30 flex-shrink-0">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleCreate} 
              disabled={!hostName.trim() || isCreating} 
              className="flex-1"
            >
              {isCreating ? 'Criando...' : 'Criar Sala'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}