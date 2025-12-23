import { Lock, ClipboardList, Brain, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistBloqueadoProps {
  totalItems: number;
  onAutoAvaliar: () => void;
  onAvaliacaoIA: () => void;
  isFinished: boolean;
}

export function ChecklistBloqueado({
  totalItems,
  onAutoAvaliar,
  onAvaliacaoIA,
  isFinished,
}: ChecklistBloqueadoProps) {
  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Checklist de Avaliação
            </h3>
          </div>
          <div className="flex items-center gap-2 text-amber-500">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-medium">Bloqueado</span>
          </div>
        </div>
      </div>

      {/* Conteúdo bloqueado */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
          <Lock className="w-10 h-10 text-amber-500" />
        </div>
        
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Checklist Bloqueado
        </h4>
        
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          {isFinished 
            ? "Escolha como deseja ver sua avaliação para desbloquear o checklist."
            : "O checklist será desbloqueado após finalizar a consulta. Foque na conversa com o paciente!"
          }
        </p>

        {!isFinished && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg">
            <ClipboardList className="w-4 h-4" />
            <span>{totalItems} itens para avaliar</span>
          </div>
        )}

        {isFinished && (
          <div className="space-y-3 w-full max-w-xs">
            <Button
              onClick={onAutoAvaliar}
              variant="outline"
              className="w-full h-14 flex items-center justify-center gap-3 border-cyan-500/50 hover:bg-cyan-500/10"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Auto-avaliar</p>
                <p className="text-[10px] text-muted-foreground">Revise a conversa e avalie você mesmo</p>
              </div>
            </Button>

            <Button
              onClick={onAvaliacaoIA}
              className="w-full h-14 flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-200" />
              </div>
              <div className="text-left">
                <p className="font-medium text-white">Avaliação pela IA</p>
                <p className="text-[10px] text-purple-200">A IA analisa e pontua automaticamente</p>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
