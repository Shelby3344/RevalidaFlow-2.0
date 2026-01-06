import { Clock, Target, TrendingUp, TrendingDown, Award, Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export function StatsCard() {
  const { areaStats, totalEstacoes, mediaGeral, tempoTotalMinutos, loading } = useAnalytics();

  // Formatar tempo
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    const secs = 0;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determinar tendência baseado na média
  const getTrend = () => {
    if (mediaGeral >= 7) return { icon: TrendingUp, text: "Subindo", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (mediaGeral >= 5) return { icon: TrendingUp, text: "Estável", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { icon: TrendingDown, text: "Revisar", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const trend = getTrend();
  const TrendIcon = trend.icon;

  // Cores por área
  const areaColors: Record<string, { text: string; bg: string }> = {
    CR: { text: "text-red-500", bg: "bg-red-500" },
    CM: { text: "text-blue-500", bg: "bg-blue-500" },
    GO: { text: "text-purple-500", bg: "bg-purple-500" },
    PE: { text: "text-amber-500", bg: "bg-amber-500" },
    PR: { text: "text-emerald-500", bg: "bg-emerald-500" },
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-card border border-border/50 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Estatísticas Gerais</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTime(tempoTotalMinutos)}</span>
              </div>
            </div>
          </div>
          <Award className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      {/* Main stats */}
      <div className="p-5">
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Estações */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-secondary/50 flex flex-col items-center justify-center mb-1">
              <p className="text-2xl font-bold text-foreground">{totalEstacoes}</p>
            </div>
            <p className="text-xs text-muted-foreground">Estações</p>
          </div>
          
          {/* Circular progress - Média */}
          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="hsl(var(--secondary))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(mediaGeral / 10) * 264} 264`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(38 92% 50%)" />
                  <stop offset="100%" stopColor="hsl(25 95% 53%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-foreground">{mediaGeral.toFixed(2)}</span>
              <span className="text-[10px] text-muted-foreground">Média</span>
            </div>
          </div>

          {/* Tendência */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-xl ${trend.bg} flex flex-col items-center justify-center mb-1`}>
              <TrendIcon className={`w-6 h-6 ${trend.color}`} />
            </div>
            <p className="text-xs text-muted-foreground">{trend.text}</p>
          </div>
        </div>

        {/* Specialties list */}
        <div className="space-y-2">
          {areaStats.map((area) => {
            const colors = areaColors[area.areaCode] || { text: "text-gray-500", bg: "bg-gray-500" };
            return (
              <div 
                key={area.areaCode} 
                className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1 h-8 rounded-full ${colors.bg}`} />
                  <div>
                    <p className={`text-sm font-medium ${colors.text}`}>{area.area}</p>
                    <p className="text-xs text-muted-foreground">
                      Média: <span className="font-medium text-foreground">{area.media.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{area.estacoes}</p>
                  <p className="text-[10px] text-muted-foreground">estações</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {totalEstacoes === 0 && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Complete checklists para ver suas estatísticas
          </div>
        )}
      </div>
    </div>
  );
}
