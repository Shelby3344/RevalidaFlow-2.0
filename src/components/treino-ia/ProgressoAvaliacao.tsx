import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemScoreIA } from "@/types/treino-ia";
import { ChecklistEvaluationItem } from "@/types/checklists";

interface ProgressoAvaliacaoProps {
  items: ChecklistEvaluationItem[];
  completedItems: Record<number, ItemScoreIA>;
  totalScore: number;
  maxScore: number;
  showDetails?: boolean;
}

export function ProgressoAvaliacao({
  items,
  completedItems,
  totalScore,
  maxScore,
  showDetails = true,
}: ProgressoAvaliacaoProps) {
  const completedCount = Object.keys(completedItems).length;
  const totalItems = items.length;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const progressPercentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Header com pontuação */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Avaliação IA</h3>
          <p className="text-xs text-muted-foreground">
            {completedCount}/{totalItems} itens detectados
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">
            {totalScore.toFixed(1)}/{maxScore.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Lista de itens */}
      {showDetails && (
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {items.map((item, index) => {
            const itemId = index + 1;
            const score = completedItems[itemId];
            const isCompleted = !!score;

            return (
              <div
                key={itemId}
                className={cn(
                  "flex items-start gap-2 p-2 rounded-lg transition-colors",
                  isCompleted ? "bg-green-500/10" : "bg-secondary/50"
                )}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    score.type === "adequate" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : score.type === "partial" ? (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-red-500" />
                    )
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-xs",
                      isCompleted ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </p>
                  {isCompleted && (
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded",
                          score.type === "adequate"
                            ? "bg-green-500/20 text-green-400"
                            : score.type === "partial"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        )}
                      >
                        {score.type === "adequate"
                          ? "Adequado"
                          : score.type === "partial"
                          ? "Parcial"
                          : "Inadequado"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        +{score.score.toFixed(1)} pts
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
