import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAvaliacaoSession } from '@/hooks/useAvaliacaoSession';
import { ChecklistEvaluationItem } from '@/types/checklists';

interface CreateSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklistId: string;
  checklistTitle: string;
  areaCode: string;
  evaluationItems: ChecklistEvaluationItem[];
}

export function CreateSessionModal({
  open,
  onOpenChange,
  checklistId,
  checklistTitle,
  areaCode,
  evaluationItems,
}: CreateSessionModalProps) {
  const navigate = useNavigate();
  const [avaliadorName, setAvaliadorName] = useState('');
  const { createSession } = useAvaliacaoSession();

  // Calcular pontuação máxima
  const maxScore = evaluationItems.reduce((total, item) => total + item.scores.max, 0);

  const handleCreate = () => {
    if (!avaliadorName.trim()) return;

    const sessionCode = createSession(
      checklistId,
      checklistTitle,
      areaCode,
      avaliadorName.trim(),
      maxScore
    );

    onOpenChange(false);
    navigate(`/avaliacao/${sessionCode}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Sessão de Avaliação</DialogTitle>
          <DialogDescription>
            Crie uma sessão para avaliar um candidato em tempo real.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Checklist</Label>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm font-medium text-foreground">{checklistTitle}</p>
              <p className="text-xs text-muted-foreground">Área: {areaCode}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avaliadorName">Seu nome (Avaliador)</Label>
            <Input
              id="avaliadorName"
              placeholder="Digite seu nome"
              value={avaliadorName}
              onChange={(e) => setAvaliadorName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>

          <div className="bg-primary/10 rounded-lg p-3 text-sm">
            <p className="text-primary font-medium mb-1">Como funciona:</p>
            <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-xs">
              <li>Você receberá um link para enviar ao avaliado</li>
              <li>O avaliado verá apenas o cenário e instruções</li>
              <li>Você controla o cronômetro e marca o checklist</li>
              <li>Libere impressos clicando no cadeado</li>
            </ol>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={!avaliadorName.trim()}>
            Criar Sessão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
