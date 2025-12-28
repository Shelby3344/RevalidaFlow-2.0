import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
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

  console.log('CreateSessionModal render:', { open, checklistTitle, areaCode }); // Debug

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
                Criar Sessão de Avaliação
              </h2>
              <p className="text-sm text-muted-foreground">
                Crie uma sessão para avaliar um candidato em tempo real.
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
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/30 flex-shrink-0">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={!avaliadorName.trim()} className="flex-1">
              Criar Sessão
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
