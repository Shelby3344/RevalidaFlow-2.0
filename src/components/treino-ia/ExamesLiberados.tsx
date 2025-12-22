import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExameForAI } from "@/types/treino-ia";
import { ImpressoItem } from "@/types/checklists";

interface ExamesLiberadosProps {
  impressos: ImpressoItem[];
  liberatedExames: number[];
  getExameContent: (exameId: number) => ExameForAI | undefined;
}

export function ExamesLiberados({
  impressos,
  liberatedExames,
  getExameContent,
}: ExamesLiberadosProps) {
  const [expandedExame, setExpandedExame] = useState<number | null>(null);

  const toggleExame = (exameId: number) => {
    setExpandedExame(expandedExame === exameId ? null : exameId);
  };

  const liberatedCount = liberatedExames.length;
  const totalCount = impressos.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Impressos</h3>
        </div>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
          {liberatedCount}/{totalCount}
        </span>
      </div>

      {/* Lista de exames */}
      <div className="space-y-2">
        {impressos.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            Nenhum impresso disponível neste caso
          </p>
        ) : (
          impressos.map((impresso, index) => {
            const exameId = index + 1;
            const isLiberated = liberatedExames.includes(exameId);
            const isExpanded = expandedExame === exameId;
            const exameContent = getExameContent(exameId);

            return (
              <div
                key={exameId}
                className={cn(
                  "border rounded-lg overflow-hidden transition-all",
                  isLiberated
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-border bg-secondary/30"
                )}
              >
                <button
                  onClick={() => isLiberated && toggleExame(exameId)}
                  disabled={!isLiberated}
                  className={cn(
                    "w-full flex items-center gap-2 p-3 text-left",
                    isLiberated
                      ? "hover:bg-green-500/10 cursor-pointer"
                      : "cursor-not-allowed opacity-60"
                  )}
                >
                  {isLiberated ? (
                    <Unlock className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <span
                    className={cn(
                      "flex-1 text-sm truncate",
                      isLiberated ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {impresso.title}
                  </span>
                  {isLiberated && (
                    isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )
                  )}
                </button>

                {/* Conteúdo expandido */}
                {isLiberated && isExpanded && exameContent && (
                  <div className="px-3 pb-3 border-t border-border/50">
                    <div className="mt-3 p-3 bg-background rounded-lg">
                      <p className="text-xs text-foreground whitespace-pre-wrap">
                        {exameContent.content || impresso.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Dica */}
      {liberatedCount === 0 && totalCount > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          💡 Solicite exames durante a consulta para liberá-los
        </p>
      )}
    </div>
  );
}
