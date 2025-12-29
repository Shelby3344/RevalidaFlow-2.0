import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface JoinSessionModalProps {
  open: boolean;
  checklistTitle: string;
  onJoin: (name: string) => void;
}

export function JoinSessionModal({
  open,
  checklistTitle,
  onJoin,
}: JoinSessionModalProps) {
  const { profile } = useUserProfile();

  // Handle body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleJoin = () => {
    onJoin(profile.nome);
  };

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md bg-background border border-border rounded-lg shadow-xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Entrar na Sessão
            </h2>
            <p className="text-sm text-muted-foreground">
              Você está entrando em uma sessão de avaliação.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col min-h-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Estação</Label>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium text-foreground">{checklistTitle}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Você</Label>
              <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium text-foreground">{profile.nome}</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm">
              <p className="text-amber-400 font-medium mb-1">⚠️ Atenção:</p>
              <ul className="text-muted-foreground space-y-1 text-xs list-disc list-inside">
                <li>Você verá apenas o cenário e instruções</li>
                <li>O checklist ficará oculto durante a avaliação</li>
                <li>Aguarde o avaliador iniciar o cronômetro</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/30 flex-shrink-0">
          <Button onClick={handleJoin} className="w-full">
            Entrar na Sessão
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
