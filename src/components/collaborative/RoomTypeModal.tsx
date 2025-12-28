import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Users, Lock, Globe, Shield } from 'lucide-react';
import { RoomStateManager } from '@/services/RoomStateManager';
import { CreateRoomConfig, AreaCode } from '@/types/checklists';

interface RoomTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomCreated?: (roomId: string, roomCode?: string) => void;
}

export function RoomTypeModal({
  open,
  onOpenChange,
  onRoomCreated,
}: RoomTypeModalProps) {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState<'public' | 'private'>('public');
  const [hostName, setHostName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(4);
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
      
      // Usar um ID fixo para o usuário atual (em produção viria da autenticação)
      const hostId = 'user_current';

      const config: CreateRoomConfig = {
        type: roomType,
        checklistId: 'general',
        checklistTitle: 'Sala Geral de Treino',
        areaCode: 'CM' as AreaCode,
        maxParticipants,
        settings: {
          allowChat: true,
          allowLateJoin: true,
          autoStart: false,
          sessionDuration: undefined,
        },
      };

      const room = roomManager.createRoom(hostId, hostName.trim(), config);
      
      console.log('Sala criada com sucesso:', room.id);
      console.log('Verificando sala após criação:', roomManager.getRoom(room.id));

      // Reset form
      setHostName('');
      setMaxParticipants(4);

      // Fechar modal
      onOpenChange(false);

      // Callback para o componente pai
      onRoomCreated?.(room.id, room.code);

      // Navegar para a sala após garantir que tudo foi salvo
      setTimeout(() => {
        console.log('Navegando para sala:', room.id);
        navigate(`/collaborative/${room.id}`);
      }, 200);
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
      <div className="relative z-10 w-full max-w-md bg-background border border-border rounded-lg shadow-xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Nova Sala de Treino
              </h2>
              <p className="text-sm text-muted-foreground">
                Escolha o tipo de sala que deseja criar
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
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setRoomType('public')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                    roomType === 'public'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <div className="font-medium">Sala Pública</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Visível para todos os usuários do app. Qualquer pessoa pode entrar e praticar junto com você.
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRoomType('private')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                    roomType === 'private'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-slate-500" />
                    <div className="font-medium">Sala Privada</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Acesso apenas por código. Você pode compartilhar o código com pessoas específicas.
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

            {/* Info Box */}
            <div className="bg-primary/10 rounded-lg p-3 text-sm">
              <p className="text-primary font-medium mb-1">Como funciona:</p>
              <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-xs">
                <li>Você será o host e controlará a sessão</li>
                <li>{roomType === 'private' ? 'Compartilhe o código com os participantes' : 'A sala aparecerá na lista pública'}</li>
                <li>Escolha um checklist para praticar em conjunto</li>
                <li>Todos verão as ações em tempo real</li>
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