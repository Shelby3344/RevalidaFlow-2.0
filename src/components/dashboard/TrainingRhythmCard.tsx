import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const trainingData = [
  { day: "00", value: 0 },
  { day: "01", value: 0 },
  { day: "02", value: 0 },
  { day: "03", value: 0 },
  { day: "04", value: 0 },
  { day: "05", value: 0 },
  { day: "06", value: 0 },
];

const gradesData = [
  { day: "00", value: 0 },
  { day: "01", value: 0 },
  { day: "02", value: 0 },
  { day: "03", value: 0 },
  { day: "04", value: 0 },
  { day: "05", value: 0 },
  { day: "06", value: 0 },
];

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RhythmChart
        title="Ritmo de Treinamento"
        titleColor="text-primary"
        data={trainingData}
        mainValue="0"
        subtitle="Média: 0"
        barColor="hsl(252 87% 64%)"
      />
      <RhythmChart
        title="Ritmo de Notas"
        titleColor="text-success"
        data={gradesData}
        mainValue="0"
        subtitle="0%"
        barColor="hsl(142 76% 45%)"
      />
    </div>
  );
}
