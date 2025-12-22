import { BarChart3 } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { subject: "Anamnese", flashcards: 80, checklists: 60 },
  { subject: "E. Físico", flashcards: 70, checklists: 50 },
  { subject: "Lab", flashcards: 60, checklists: 40 },
  { subject: "Imagem", flashcards: 50, checklists: 30 },
  { subject: "Dx", flashcards: 65, checklists: 45 },
  { subject: "Conduta", flashcards: 75, checklists: 55 },
];

export function RadarChartCard() {
  return (
    <div className="rounded-xl card-gradient p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-success" />
        <h3 className="text-sm font-medium text-success">Desempenho por categorias</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Estude com mais foco.</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="hsl(240 15% 25%)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "hsl(240 5% 60%)", fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "hsl(240 5% 60%)", fontSize: 10 }}
            />
            <Radar
              name="Flashcards"
              dataKey="flashcards"
              stroke="hsl(199 89% 48%)"
              fill="hsl(199 89% 48%)"
              fillOpacity={0.3}
            />
            <Radar
              name="Checklists"
              dataKey="checklists"
              stroke="hsl(142 76% 45%)"
              fill="hsl(142 76% 45%)"
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
