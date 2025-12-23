import { TrendingUp, Calendar, ArrowUpRight, BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Fev", estudos: 12, media: 6.5 },
  { month: "Mar", estudos: 18, media: 7.0 },
  { month: "Abr", estudos: 25, media: 7.2 },
  { month: "Mai", estudos: 20, media: 6.8 },
  { month: "Jun", estudos: 15, media: 7.5 },
  { month: "Jul", estudos: 22, media: 7.8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            <span className="text-xs text-muted-foreground">Estudos:</span>
            <span className="text-xs font-bold text-primary">{payload[0].value}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            <span className="text-xs text-muted-foreground">Média:</span>
            <span className="text-xs font-bold text-emerald-500">{payload[1]?.value || '-'}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function MonthlyPerformanceCard() {
  const totalEstudos = data.reduce((acc, d) => acc + d.estudos, 0);
  const mediaGeral = (data.reduce((acc, d) => acc + d.media, 0) / data.length).toFixed(1);
  const crescimento = ((data[data.length - 1].estudos - data[0].estudos) / data[0].estudos * 100).toFixed(0);
  const melhorMes = data.reduce((prev, curr) => curr.estudos > prev.estudos ? curr : prev);

  return (
    <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
      {/* Header com gradiente */}
      <div className="px-5 py-4 border-b border-border/30 bg-gradient-to-r from-primary/10 via-violet-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Evolução Mensal</h3>
              <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-500">+{crescimento}%</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-5 py-4 border-b border-border/30">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Total</span>
            </div>
            <p className="text-xl font-bold text-foreground">{totalEstudos}</p>
            <p className="text-[10px] text-muted-foreground">estudos</p>
          </div>
          
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Média</span>
            </div>
            <p className="text-xl font-bold text-emerald-500">{mediaGeral}</p>
            <p className="text-[10px] text-muted-foreground">pontos</p>
          </div>
          
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/10">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Melhor</span>
            </div>
            <p className="text-xl font-bold text-amber-500">{melhorMes.month}</p>
            <p className="text-[10px] text-muted-foreground">{melhorMes.estudos} estudos</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEstudos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(252 87% 64%)" stopOpacity={0.4}/>
                  <stop offset="50%" stopColor="hsl(252 87% 64%)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="hsl(252 87% 64%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160 84% 39%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(160 84% 39%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 15% 20%)" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(240 5% 60%)", fontSize: 11 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(240 5% 60%)", fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="estudos"
                stroke="hsl(252 87% 64%)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorEstudos)"
              />
              <Area
                type="monotone"
                dataKey="media"
                stroke="hsl(160 84% 39%)"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorMedia)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legenda */}
        <div className="flex justify-center gap-6 mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            <span className="text-xs text-muted-foreground">Estudos realizados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-emerald-500" style={{ borderStyle: 'dashed' }} />
            <span className="text-xs text-muted-foreground">Média de notas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
