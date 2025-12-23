import { useState } from "react";
import { ClipboardList, Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemScoreIA } from "@/types/treino-ia";
import { ChecklistEvaluationItem } from "@/types/checklists";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChecklistCompletoIAProps {
  items: ChecklistEvaluationItem[];
  completedItems: Record<number, ItemScoreIA>;
  totalScore: number;
  maxScore: number;
}

export function ChecklistCompletoIA({
  items,
  completedItems,
  totalScore,
  maxScore,
}: ChecklistCompletoIAProps) {
  // Estado para controlar quais subitens foram marcados como realizados
  const [checkedSubItems, setCheckedSubItems] = useState<Record<string, boolean>>({});

  const completedCount = Object.keys(completedItems).length;
  const totalItems = items.length;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  const toggleSubItem = (itemId: number, subItemIdx: number) => {
    const key = `${itemId}-${subItemIdx}`;
    setCheckedSubItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isSubItemChecked = (itemId: number, subItemIdx: number): boolean => {
    return checkedSubItems[`${itemId}-${subItemIdx}`] || false;
  };

  const getScoreBg = (type: string) => {
    switch (type) {
      case "adequate":
        return "bg-green-500/10 border-green-500/30";
      case "partial":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "inadequate":
        return "bg-red-500/10 border-red-500/30";
      default:
        return "bg-secondary/50 border-border/50";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-full">
      {/* Header fixo */}
      <div className="p-4 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Checklist de Avaliação
            </h3>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              {totalScore.toFixed(1)}/{maxScore.toFixed(1)}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {percentage.toFixed(0)}% • {completedCount}/{totalItems} itens
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-violet-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Lista de itens com scroll */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {items.map((item, index) => {
            const itemId = index + 1;
            const score = completedItems[itemId];
            const isCompleted = !!score;
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <div
                key={itemId}
                className={cn(
                  "rounded-lg border p-4 space-y-3",
                  isCompleted ? getScoreBg(score.type) : "bg-card border-border"
                )}
              >
                {/* Título em negrito */}
                <div>
                  <p className="text-foreground font-medium">{item.title}</p>

                  {/* Score badge quando completado */}
                  {isCompleted && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                          score.type === "adequate"
                            ? "bg-green-500/20 text-green-400"
                            : score.type === "partial"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        )}
                      >
                        {score.type === "adequate"
                          ? "✓ Adequado"
                          : score.type === "partial"
                          ? "◐ Parcial"
                          : "✗ Inadequado"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        +{score.score.toFixed(1)} pts
                      </span>
                    </div>
                  )}
                </div>

                {/* Subitens com bolinhas clicáveis - sempre visíveis */}
                {hasSubItems && (
                  <div className="space-y-2 mt-2">
                    {item.subItems.map((subItem, subIdx) => {
                      const isChecked = isSubItemChecked(itemId, subIdx);
                      return (
                        <div
                          key={subIdx}
                          className="flex items-center gap-2 cursor-pointer group"
                          onClick={() => toggleSubItem(itemId, subIdx)}
                        >
                          {/* Bolinha de checklist */}
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                              isChecked
                                ? "bg-red-500 border-red-500"
                                : "border-muted-foreground/50 group-hover:border-red-400"
                            )}
                          >
                            {isChecked && (
                              <Check className="w-2.5 h-2.5 text-white" />
                            )}
                          </div>
                          {/* Texto do subitem */}
                          <p
                            className={cn(
                              "text-xs transition-colors",
                              isChecked
                                ? "text-red-500 font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {subItem}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Critérios de avaliação */}
                <div className="text-xs space-y-1 border-t border-border/30 pt-2">
                  <p>
                    <span className="text-green-400 font-semibold">Adequado ({item.scores.max.toFixed(1)}):</span>{" "}
                    <span className="text-muted-foreground">{item.scoring.adequate}</span>
                  </p>
                  {item.scoring.partial && item.scoring.partial !== "—" && (
                    <p>
                      <span className="text-amber-400 font-semibold">Parcial ({item.scores.partial.toFixed(1)}):</span>{" "}
                      <span className="text-muted-foreground">{item.scoring.partial}</span>
                    </p>
                  )}
                  <p>
                    <span className="text-red-400 font-semibold">Inadequado ({item.scores.min.toFixed(1)}):</span>{" "}
                    <span className="text-muted-foreground">{item.scoring.inadequate}</span>
                  </p>
                </div>

                {/* Botões de pontuação */}
                <div className="flex gap-2 pt-2">
                  {/* Adequado */}
                  <div
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1 py-1.5 rounded border text-xs",
                      isCompleted && score.type === "adequate"
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-border/50 text-muted-foreground"
                    )}
                  >
                    <Check className="w-3 h-3" />
                    <span>{item.scores.max.toFixed(1)}</span>
                  </div>

                  {/* Parcial */}
                  {item.scoring.partial && item.scoring.partial !== "—" && (
                    <div
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1 py-1.5 rounded border text-xs",
                        isCompleted && score.type === "partial"
                          ? "bg-amber-600 border-amber-600 text-white"
                          : "border-border/50 text-muted-foreground"
                      )}
                    >
                      <Minus className="w-3 h-3" />
                      <span>{item.scores.partial.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Inadequado */}
                  <div
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1 py-1.5 rounded border text-xs",
                      isCompleted && score.type === "inadequate"
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-border/50 text-muted-foreground"
                    )}
                  >
                    <X className="w-3 h-3" />
                    <span>{item.scores.min.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
