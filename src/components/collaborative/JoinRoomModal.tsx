import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Lock, AlertCircle } from 'lucide-react';
import { RoomStateManager } from '@/services/RoomStateManager';

interface JoinRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoomJoined?: (roomId: string) => void;
}

export function JoinRoomModal({
  open,
  onOpenChange,
  onRoomJoined,
}: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

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

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setRoomCode('');
      setUserName('');
      setError('');
    }
  }, [open]);

  // Clear error when user types
  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [roomCode, userName]);

  const handleJoin = async () => {
    if (!roomCode.trim() || !userName.trim()) {
      setError('Preencha todos os campos');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const roomManager = RoomStateManager.getInstance();
      
      // Buscar sala pelo código
      const room = roomManager.findRoomByCode(roomCode.trim().toUpperCase());
      
      if (!room) {
        setError('Código inválido ou sala não encontrada');
        return;
      }

      // Simular ID do usuário (em produção viria da autenticação)
      const userId = `user_${Date.now()}`;

      // Tentar entrar na sala
      const success = roomManager.joinRoom(room.id, userId, userName.trim());
      
      if (!success) {
        setError('Não foi possível entrar na sala. Verifique se ela não está cheia ou se a sessão já começou.');
        return;
      }

      // Sucesso - callback para o componente pai
      onRoomJoined?.(room.id);
      onOpenChange(false);

    } catch (error) {
      console.error('Erro ao entrar na sala:', error);
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleCodeChange = (value: string) => {
    // Converter para maiúsculas e limitar a 6 caracteres
    const formattedCode = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setRoomCode(formattedCode);
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
                Entrar em Sala Privada
              </h2>
              <p className="text-sm text-muted-foreground">
                Digite o código da sala para participar da sessão.
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
          <div className="space-y-4">
            {/* Room Code */}
            <div className="space-y-2">
              <Label htmlFor="roomCode">
                <Lock className="w-4 h-4 inline mr-1" />
                Código da Sala
              </Label>
              <Input
                id="roomCode"
                placeholder="Digite o código (6 caracteres)"
                value={roomCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="text-center text-lg font-mono tracking-wider"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                O código contém 6 caracteres (letras e números)
              </p>
            </div>

            {/* User Name */}
            <div className="space-y-2">
              <Label htmlFor="userName">Seu nome</Label>
              <Input
                id="userName"
                placeholder="Digite seu nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-primary/10 rounded-lg p-3 text-sm">
              <p className="text-primary font-medium mb-1">Como funciona:</p>
              <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-xs">
                <li>Peça o código da sala para o host</li>
                <li>Digite o código e seu nome</li>
                <li>Aguarde o host iniciar a sessão</li>
                <li>Pratique colaborativamente em tempo real</li>
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
              onClick={handleJoin} 
              disabled={!roomCode.trim() || !userName.trim() || isJoining} 
              className="flex-1"
            >
              {isJoining ? 'Entrando...' : 'Entrar na Sala'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}