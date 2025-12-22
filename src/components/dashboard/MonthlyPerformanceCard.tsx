import { BarChart3 } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Fev", parceiros: 0, pense: 30 },
  { month: "Mar", parceiros: 0, pense: 40 },
  { month: "Abr", parceiros: 0, pense: 50 },
  { month: "Mai", parceiros: 0, pense: 35 },
  { month: "Jun", parceiros: 0, pense: 25 },
  { month: "Jul", parceiros: 0, pense: 20 },
];

export function MonthlyPerformanceCard() {
  return (
    <div className="rounded-xl card-gradient p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-success" />
        <h3 className="text-sm font-medium text-success">Desempenho Geral Por Mês</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="hsl(240 15% 25%)" />
            <PolarAngleAxis 
              dataKey="month" 
              tick={{ fill: "hsl(240 5% 60%)", fontSize: 11 }}
            />
            <Radar
              name="Parceiros (0)"
              dataKey="parceiros"
              stroke="hsl(199 89% 48%)"
              fill="hsl(199 89% 48%)"
              fillOpacity={0.3}
            />
            <Radar
              name="Pense Revalida (2)"
              dataKey="pense"
              stroke="hsl(252 87% 64%)"
              fill="hsl(252 87% 64%)"
              fillOpacity={0.3}
            />
            <Legend 
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => <span className="text-muted-foreground">{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
