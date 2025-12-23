import { Clock, Target, TrendingUp, Award } from "lucide-react";

interface Specialty {
  name: string;
  average: number;
  stations: number;
  color: string;
  bgColor: string;
}

const specialties: Specialty[] = [
  { name: "Cirurgia", average: 4.00, stations: 1, color: "text-red-500", bgColor: "bg-red-500" },
  { name: "Clínica", average: 0, stations: 0, color: "text-blue-500", bgColor: "bg-blue-500" },
  { name: "GO", average: 0, stations: 0, color: "text-purple-500", bgColor: "bg-purple-500" },
  { name: "Pediatria", average: 0, stations: 0, color: "text-amber-500", bgColor: "bg-amber-500" },
  { name: "Preventiva", average: 10.00, stations: 1, color: "text-emerald-500", bgColor: "bg-emerald-500" },
  { name: "INEP 2020/2025.1", average: 7.00, stations: 2, color: "text-violet-500", bgColor: "bg-violet-500" },
];

export function StatsCard() {
  const totalEstacoes = specialties.reduce((acc, s) => acc + s.stations, 0);
  const mediaGeral = 7.00;
  const tempoTreinamento = "00:10:40";

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
                <span>{tempoTreinamento}</span>
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
            <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex flex-col items-center justify-center mb-1">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-xs text-muted-foreground">Subindo</p>
          </div>
        </div>

        {/* Specialties list */}
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div 
              key={specialty.name} 
              className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${specialty.bgColor}`} />
                <div>
                  <p className={`text-sm font-medium ${specialty.color}`}>{specialty.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Média: <span className="font-medium text-foreground">{specialty.average.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{specialty.stations}</p>
                <p className="text-[10px] text-muted-foreground">estações</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
