import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Loader2 } from "lucide-react";

interface RhythmChartProps {
  title: string;
  titleColor: string;
  data: { day: string; value: number }[];
  mainValue: string | number;
  subtitle: string;
  barColor: string;
}

function RhythmChart({ title, titleColor, data, mainValue, subtitle, barColor }: RhythmChartProps) {
  return (
    <div className="rounded-xl card-gradient p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-medium ${titleColor}`}>{title}</h3>
        <span className="text-xs text-muted-foreground">Últimos 7 dias</span>
      </div>

      <div className="flex items-end gap-4 mb-4">
        <span className="text-4xl font-bold text-foreground">{mainValue}</span>
        <span className={`text-sm ${titleColor}`}>{subtitle}</span>
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(240 5% 60%)", fontSize: 10 }}
            />
            <YAxis hide />
            <Bar 
              dataKey="value" 
              fill={barColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrainingRhythmCard() {
  const { attempts, loading } = useAnalytics();

  // Calcular dados dos últimos 7 dias
  const { trainingData, gradesData, totalWeek, avgGrade } = useMemo(() => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    // Inicializar arrays para os últimos 7 dias
    const trainingByDay: Record<string, number> = {};
    const gradesByDay: Record<string, number[]> = {};
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const dayKey = date.toISOString().split('T')[0];
      trainingByDay[dayKey] = 0;
      gradesByDay[dayKey] = [];
    }

    // Preencher com dados reais
    attempts.forEach(attempt => {
      const attemptDate = new Date(attempt.completed_at);
      if (attemptDate >= sevenDaysAgo && attemptDate <= today) {
        const dayKey = attemptDate.toISOString().split('T')[0];
        if (trainingByDay[dayKey] !== undefined) {
          trainingByDay[dayKey]++;
          gradesByDay[dayKey].push(attempt.percentage / 10);
        }
      }
    });

    // Converter para formato do gráfico
    const trainingData = Object.entries(trainingByDay).map(([date, count], idx) => {
      const d = new Date(date);
      return {
        day: days[d.getDay()].slice(0, 2),
        value: count,
      };
    });

    const gradesData = Object.entries(gradesByDay).map(([date, grades], idx) => {
      const d = new Date(date);
      const avg = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
      return {
        day: days[d.getDay()].slice(0, 2),
        value: Math.round(avg * 10) / 10,
      };
    });

    const totalWeek = Object.values(trainingByDay).reduce((a, b) => a + b, 0);
    const allGrades = Object.values(gradesByDay).flat();
    const avgGrade = allGrades.length > 0 
      ? (allGrades.reduce((a, b) => a + b, 0) / allGrades.length).toFixed(1)
      : '0';

    return { trainingData, gradesData, totalWeek, avgGrade };
  }, [attempts]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl card-gradient p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
        <div className="rounded-xl card-gradient p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RhythmChart
        title="Ritmo de Treinamento"
        titleColor="text-primary"
        data={trainingData}
        mainValue={totalWeek}
        subtitle={`Média: ${(totalWeek / 7).toFixed(1)}/dia`}
        barColor="hsl(252 87% 64%)"
      />
      <RhythmChart
        title="Ritmo de Notas"
        titleColor="text-success"
        data={gradesData}
        mainValue={avgGrade}
        subtitle={`${(parseFloat(avgGrade) * 10).toFixed(0)}%`}
        barColor="hsl(142 76% 45%)"
      />
    </div>
  );
}
