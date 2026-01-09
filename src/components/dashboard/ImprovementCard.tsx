import { AlertTriangle, CheckCircle2, Loader2, ChevronRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { cn } from "@/lib/utils";

export function ImprovementCard() {
  const { weakPoints, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="rounded-xl card-gradient p-5 h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-xl card-gradient p-5 h-full">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-warning" />
        <h3 className="text-sm font-medium text-warning">
          Podemos melhorar 
          {weakPoints.length > 0 && (
            <span className="bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded text-xs ml-1">
              {weakPoints.length}
            </span>
          )}
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Dar uma atenção especial.</p>

      {weakPoints.length > 0 ? (
        <div className="space-y-2">
          {weakPoints.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white",
                item.score < 3 ? "bg-red-500" : item.score < 5 ? "bg-amber-500" : "bg-yellow-500"
              )}>
                {item.score.toFixed(1)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.area} • {item.date}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p className="text-sm text-muted-foreground">Nenhum ponto fraco identificado!</p>
          <p className="text-xs text-muted-foreground mt-1">Continue praticando para manter o bom desempenho.</p>
        </div>
      )}
    </div>
  );
}
