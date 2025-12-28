import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Plus, Users, Lock } from 'lucide-react';
import { RoomTypeModal } from './RoomTypeModal';
import { RoomListModal } from './RoomListModal';
import { JoinRoomModal } from './JoinRoomModal';

interface CollaborativeMenuModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollaborativeMenuModal({
  open,
  onOpenChange,
}: CollaborativeMenuModalProps) {
  const navigate = useNavigate();
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [isRoomListOpen, setIsRoomListOpen] = useState(false);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);

  // Handle ESC key
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

  const handleOptionClick = (option: 'create' | 'public' | 'code') => {
    onOpenChange(false);
    
    setTimeout(() => {
      if (option === 'create') {
        setIsCreateRoomOpen(true);
      } else if (option === 'public') {
        setIsRoomListOpen(true);
      } else if (option === 'code') {
        setIsJoinRoomOpen(true);
      }
    }, 100);
  };

  const handleJoinRoom = (roomId: string) => {
    navigate(`/collaborative/${roomId}`);
  };

  const handleRoomCreated = (roomId: string) => {
    navigate(`/collaborative/${roomId}`);
  };

  if (!open) {
    return (
      <>
        <RoomTypeModal 
          open={isCreateRoomOpen} 
          onOpenChange={setIsCreateRoomOpen}
          onRoomCreated={handleRoomCreated}
        />
        <RoomListModal 
          open={isRoomListOpen} 
          onOpenChange={setIsRoomListOpen}
          onJoinRoom={handleJoinRoom}
        />
        <JoinRoomModal 
          open={isJoinRoomOpen} 
          onOpenChange={setIsJoinRoomOpen}
          onRoomJoined={handleJoinRoom}
        />
      </>
    );
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-sm bg-background border border-border rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Treino Colaborativo
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-lg hover:bg-secondary"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-3">
          <button
            onClick={() => handleOptionClick('create')}
            className="w-full p-4 rounded-lg border border-border hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Plus className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <div className="font-medium text-foreground">Nova Sala</div>
                <div className="text-sm text-muted-foreground">Criar uma sala pública ou privada</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleOptionClick('public')}
            className="w-full p-4 rounded-lg border border-border hover:bg-blue-500/10 hover:border-blue-500/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="font-medium text-foreground">Salas Públicas</div>
                <div className="text-sm text-muted-foreground">Ver salas abertas para entrar</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleOptionClick('code')}
            className="w-full p-4 rounded-lg border border-border hover:bg-slate-500/10 hover:border-slate-500/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-500/10 flex items-center justify-center group-hover:bg-slate-500/20 transition-colors">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="font-medium text-foreground">Entrar com Código</div>
                <div className="text-sm text-muted-foreground">Acessar sala privada</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Sub-modals */}
      <RoomTypeModal 
        open={isCreateRoomOpen} 
        onOpenChange={setIsCreateRoomOpen}
        onRoomCreated={handleRoomCreated}
      />
      <RoomListModal 
        open={isRoomListOpen} 
        onOpenChange={setIsRoomListOpen}
        onJoinRoom={handleJoinRoom}
      />
      <JoinRoomModal 
        open={isJoinRoomOpen} 
        onOpenChange={setIsJoinRoomOpen}
        onRoomJoined={handleJoinRoom}
      />
    </div>
  );

  return createPortal(modalContent, document.body);
}
