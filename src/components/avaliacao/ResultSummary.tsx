import { Button } from "@/components/ui/button";
import { ChecklistEvaluationItem } from "@/types/checklists";
import { ItemScore } from "@/types/avaliacao";
import { calculatePercentage } from "@/lib/avaliacao-utils";
import {
  Share2,
  Check,
  Minus,
  X,
  Trophy,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultSummaryProps {
  items: ChecklistEvaluationItem[];
  scores: Record<number, ItemScore>;
  totalScore: number;
  maxScore: number;
  mode: "avaliador" | "avaliado";
  resultShared?: boolean;
  onShareResult?: () => void;
}

export function ResultSummary({
  items,
  scores,
  totalScore,
  maxScore,
  mode,
  resultShared = false,
  onShareResult,
}: ResultSummaryProps) {
  const percentage = calculatePercentage(totalScore, maxScore);
  const passingPercentage = 60; // Linha de segurança
  const isApproved = percentage >= passingPercentage;

  // Estatísticas
  const adequateCount = Object.values(scores).filter(
    (s) => s.type === "adequate"
  ).length;
  const partialCount = Object.values(scores).filter(
    (s) => s.type === "partial"
  ).length;
  const inadequateCount = Object.values(scores).filter(
    (s) => s.type === "inadequate"
  ).length;
  const totalItems = items.length;
  const answeredItems = Object.keys(scores).length;

  const getScoreIcon = (type: ItemScore["type"] | null) => {
    switch (type) {
      case "adequate":
        return <Check className="w-4 h-4 text-green-500" />;
      case "partial":
        return <Minus className="w-4 h-4 text-amber-500" />;
      case "inadequate":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <span className="w-4 h-4 text-muted-foreground">-</span>;
    }
  };

  // Calcular o ângulo para o círculo de progresso
  const circumference = 2 * Math.PI * 54; // raio = 54
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const passingStrokeDashoffset =
    circumference - (passingPercentage / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Círculo de Progresso Principal */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative w-40 h-40">
          {/* SVG do círculo */}
          <svg className="w-full h-full transform -rotate-90">
            {/* Círculo de fundo */}
            <circle
              cx="80"
              cy="80"
              r="54"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-secondary"
            />
            {/* Linha de segurança (60%) */}
            <circle
              cx="80"
              cy="80"
              r="54"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={passingStrokeDashoffset}
              className="text-amber-500/30"
              strokeLinecap="round"
            />
            {/* Progresso atual */}
            <circle
              cx="80"
              cy="80"
              r="54"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                "transition-all duration-1000 ease-out",
                isApproved ? "text-green-500" : "text-red-500"
              )}
              strokeLinecap="round"
            />
          </svg>

          {/* Conteúdo central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                "text-3xl font-bold",
                isApproved ? "text-green-500" : "text-red-500"
              )}
            >
              {percentage.toFixed(0)}%
            </span>
            <span className="text-xs text-muted-foreground">
              {totalScore.toFixed(1)}/{maxScore.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Status de aprovação */}
        <div
          className={cn(
            "mt-4 px-6 py-2 rounded-full flex items-center gap-2",
            isApproved
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          )}
        >
          {isApproved ? (
            <Trophy className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span className="font-semibold">
            {isApproved ? "APROVADO" : "REPROVADO"}
          </span>
        </div>
      </div>

      {/* Linha de Segurança Info */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Target className="w-4 h-4" />
          <span className="text-sm font-medium">Linha de Segurança: 60%</span>
        </div>
        <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full flex">
            <div
              className={cn(
                "h-full transition-all duration-500",
                isApproved ? "bg-green-500" : "bg-red-500"
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          {/* Marcador da linha de segurança */}
          <div
            className="relative h-0"
            style={{ marginLeft: `${passingPercentage}%` }}
          >
            <div className="absolute -top-2 w-0.5 h-2 bg-amber-500" />
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>0%</span>
          <span className="text-amber-400">60%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
            <Check className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-green-400">{adequateCount}</p>
          <p className="text-xs text-muted-foreground">Adequados</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            <Minus className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-amber-400">{partialCount}</p>
          <p className="text-xs text-muted-foreground">Parciais</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
            <X className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-red-400">{inadequateCount}</p>
          <p className="text-xs text-muted-foreground">Inadequados</p>
        </div>
      </div>

      {/* Progresso de itens respondidos */}
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Itens Avaliados</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {answeredItems}/{totalItems}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(answeredItems / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* Botão compartilhar (apenas avaliador) */}
      {mode === "avaliador" && onShareResult && (
        <Button
          className="w-full"
          variant={resultShared ? "outline" : "default"}
          onClick={onShareResult}
          disabled={resultShared}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {resultShared ? "Resultado Compartilhado" : "Compartilhar com Avaliado"}
        </Button>
      )}

      {/* Lista de itens avaliados */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <span>📋</span> Detalhamento por Item
        </h4>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {items.map((item) => {
            const score = scores[item.id];
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg text-sm transition-colors",
                  score?.type === "adequate" && "bg-green-500/10 border border-green-500/20",
                  score?.type === "partial" && "bg-amber-500/10 border border-amber-500/20",
                  score?.type === "inadequate" && "bg-red-500/10 border border-red-500/20",
                  !score && "bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      score?.type === "adequate" && "bg-green-500/20",
                      score?.type === "partial" && "bg-amber-500/20",
                      score?.type === "inadequate" && "bg-red-500/20",
                      !score && "bg-secondary"
                    )}
                  >
                    {getScoreIcon(score?.type || null)}
                  </div>
                  <span className="truncate text-foreground">{item.title}</span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span
                    className={cn(
                      "font-mono text-sm font-bold px-2 py-1 rounded",
                      score?.type === "adequate" && "text-green-400 bg-green-500/20",
                      score?.type === "partial" && "text-amber-400 bg-amber-500/20",
                      score?.type === "inadequate" && "text-red-400 bg-red-500/20",
                      !score && "text-muted-foreground"
                    )}
                  >
                    {score ? score.score.toFixed(1) : "-"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
