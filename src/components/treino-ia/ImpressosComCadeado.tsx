import { useState } from "react";
import { Lock, Unlock, ChevronDown, ChevronUp, FileText, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImpressoItem } from "@/types/checklists";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImpressosComCadeadoProps {
  impressos: ImpressoItem[];
  liberatedExames: number[];
}

export function ImpressosComCadeado({
  impressos,
  liberatedExames,
}: ImpressosComCadeadoProps) {
  const [expandedImpresso, setExpandedImpresso] = useState<number | null>(null);

  if (impressos.length === 0) return null;

  const toggleExpand = (id: number) => {
    if (liberatedExames.includes(id)) {
      setExpandedImpresso(expandedImpresso === id ? null : id);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-border/50 bg-secondary/30">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-semibold text-foreground">Impressos / Exames</h3>
          <span className="text-[10px] text-muted-foreground ml-auto">
            {liberatedExames.length}/{impressos.length} liberados
          </span>
        </div>
        {/* Dica de como liberar */}
        {liberatedExames.length === 0 && (
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-amber-400">
            <Mic className="w-3 h-3" />
            <span>Solicite exames ao paciente para desbloquear</span>
          </div>
        )}
      </div>

      {/* Lista de impressos */}
      <ScrollArea className="max-h-[200px]">
        <div className="p-2 space-y-1.5">
          {impressos.map((impresso) => {
            const isUnlocked = liberatedExames.includes(impresso.id);
            const isExpanded = expandedImpresso === impresso.id;

            return (
              <div
                key={impresso.id}
                className={cn(
                  "rounded-lg border transition-all duration-200",
                  isUnlocked
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-border/50 bg-secondary/20"
                )}
              >
                {/* Item header */}
                <div
                  className={cn(
                    "flex items-center gap-2 p-2 cursor-pointer",
                    isUnlocked && "hover:bg-green-500/10"
                  )}
                  onClick={() => toggleExpand(impresso.id)}
                >
                  {/* Cadeado */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                      isUnlocked ? "bg-green-500" : "bg-primary"
                    )}
                  >
                    {isUnlocked ? (
                      <Unlock className="w-3 h-3 text-white" />
                    ) : (
                      <Lock className="w-3 h-3 text-white" />
                    )}
                  </div>

                  {/* Título */}
                  <span
                    className={cn(
                      "text-xs flex-1 truncate",
                      isUnlocked ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {impresso.title}
                  </span>

                  {/* Badge novo */}
                  {isUnlocked && (
                    <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-medium">
                      NOVO
                    </span>
                  )}

                  {/* Expand icon */}
                  {isUnlocked && (
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                  )}

                  {/* Dica para desbloquear */}
                  {!isUnlocked && (
                    <span className="text-[9px] text-muted-foreground italic">
                      Solicite ao paciente
                    </span>
                  )}
                </div>

                {/* Conteúdo expandido */}
                {isExpanded && isUnlocked && (
                  <div className="px-3 pb-3 pt-1 border-t border-green-500/20">
                    {impresso.content ? (
                      <div className="text-[11px] text-muted-foreground whitespace-pre-wrap leading-relaxed max-h-[150px] overflow-y-auto">
                        {impresso.content}
                      </div>
                    ) : impresso.image ? (
                      <img
                        src={impresso.image}
                        alt={impresso.title}
                        className="max-w-full rounded-lg mt-2"
                      />
                    ) : (
                      <p className="text-[11px] text-muted-foreground italic">
                        Conteúdo do exame...
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
