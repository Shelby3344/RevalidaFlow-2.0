import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [name, setName] = useState('');

  const handleJoin = () => {
    if (!name.trim()) return;
    onJoin(name.trim());
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Entrar na Sessão</DialogTitle>
          <DialogDescription>
            Você está entrando em uma sessão de avaliação.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Estação</Label>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm font-medium text-foreground">{checklistTitle}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avaliadoName">Seu nome</Label>
            <Input
              id="avaliadoName"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              autoFocus
            />
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

        <DialogFooter>
          <Button onClick={handleJoin} disabled={!name.trim()} className="w-full">
            Entrar na Sessão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
