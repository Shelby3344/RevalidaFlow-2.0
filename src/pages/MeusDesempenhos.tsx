import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const evolutionData = [
  { date: "01/11", value: 0 },
  { date: "02/11", value: 5 },
  { date: "03/11", value: 40 },
  { date: "04/11", value: 100 },
];

interface ProgressItem {
  name: string;
  value: number;
  color: string;
}

const progressItems: ProgressItem[] = [
  { name: "Anamnese", value: 100, color: "#818cf8" },
  { name: "Exame Físico", value: 50, color: "#818cf8" },
  { name: "Laboratório", value: 0, color: "#818cf8" },
  { name: "Imagem", value: 25, color: "#fbbf24" },
  { name: "Diagnóstico", value: 50, color: "#818cf8" },
  { name: "Conduta", value: 75, color: "#22c55e" },
];

export default function MeusDesempenhos() {
  const [selectedArea, setSelectedArea] = useState("geral");

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-xl font-semibold text-foreground">Meus Desempenhos</h1>

          {/* Area selector */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground uppercase tracking-wider">Área</label>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full bg-card border-border">
                <SelectValue placeholder="Selecionar área" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="geral">Geral</SelectItem>
                <SelectItem value="cm">Clínica Médica</SelectItem>
                <SelectItem value="cr">Cirurgia</SelectItem>
                <SelectItem value="go">GO</SelectItem>
                <SelectItem value="pe">Pediatria</SelectItem>
                <SelectItem value="mfc">MFC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Evolution chart */}
          <div className="rounded-xl card-gradient p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Minha Evolução</h2>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolutionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <ReferenceDot x="01/11" y={0} r={8} fill="#06b6d4" stroke="none" />
                  <ReferenceDot x="03/11" y={40} r={8} fill="#06b6d4" stroke="none" />
                  <ReferenceDot x="04/11" y={100} r={8} fill="#06b6d4" stroke="none" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Reference lines legend */}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-green-500"></div>
                <span>100</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-yellow-500"></div>
                <span>40</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-blue-500"></div>
                <span>0</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-card overflow-hidden">
            <div className="h-full rounded-full" style={{ 
              background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
              width: '60%'
            }} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats card */}
          <div className="rounded-xl card-gradient p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Informações Gerais</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">2 / 2</p>
                <p className="text-xs text-muted-foreground">Total / Únicas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">70%</p>
                <p className="text-xs text-muted-foreground">Média</p>
              </div>
            </div>

            {/* Progress bars */}
            <div className="space-y-4">
              {progressItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Mente PBL | Pense Revalida
      </footer>
    </AppLayout>
  );
}
