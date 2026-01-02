import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  TrendingUp, TrendingDown, Target, Award, Clock, Brain,
  BarChart3, Activity, Users, Sparkles, ChevronRight,
  Calendar, Zap, Trophy, BookOpen, Stethoscope, Baby,
  Heart, Scissors, Shield, AlertTriangle, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { AIAnalystChat } from "@/components/analytics/AIAnalystChat";

// Types
interface AreaStats {
  area: string;
  areaCode: string;
  media: number;
  estacoes: number;
  color: string;
  icon: any;
  trend: number;
}

interface CategoryPerformance {
  category: string;
  percentage: number;
  color: string;
}

interface WeakPoint {
  id: number;
  title: string;
  score: number;
  area: string;
  date: string;
}


interface EvolutionData {
  date: string;
  score: number;
  media: number;
}

interface GlobalStats {
  totalUsers: number;
  avgScore: number;
  topPerformers: number;
  activeToday: number;
}

// Mock data - será substituído por dados reais do Supabase
const mockAreaStats: AreaStats[] = [
  { area: "Cirurgia", areaCode: "CR", media: 7.5, estacoes: 11, color: "#3b82f6", icon: Scissors, trend: 5 },
  { area: "Clínica Médica", areaCode: "CM", media: 6.5, estacoes: 11, color: "#8b5cf6", icon: Stethoscope, trend: -2 },
  { area: "Ginecologia", areaCode: "GO", media: 6.4, estacoes: 9, color: "#ec4899", icon: Heart, trend: 8 },
  { area: "Pediatria", areaCode: "PE", media: 7.9, estacoes: 15, color: "#10b981", icon: Baby, trend: 12 },
  { area: "Preventiva", areaCode: "PR", media: 8.0, estacoes: 7, color: "#f59e0b", icon: Shield, trend: 3 },
];

const mockCategoryPerformance: CategoryPerformance[] = [
  { category: "Anamnese", percentage: 71, color: "#22c55e" },
  { category: "Exame Físico", percentage: 73, color: "#22c55e" },
  { category: "Laboratório", percentage: 58, color: "#f59e0b" },
  { category: "Imagem", percentage: 55, color: "#f59e0b" },
  { category: "Diagnóstico", percentage: 62, color: "#f59e0b" },
  { category: "Conduta", percentage: 70, color: "#22c55e" },
];

const mockWeakPoints: WeakPoint[] = [
  { id: 1, title: "Colestase Gravídica", score: 1.6, area: "GO", date: "28/12" },
  { id: 2, title: "Febre Reumática", score: 3.4, area: "PE", date: "26/12" },
  { id: 3, title: "Síndrome do Bebê Sacudido", score: 4.3, area: "PE", date: "25/12" },
  { id: 4, title: "Cefaleia Tensional", score: 4.5, area: "CM", date: "24/12" },
  { id: 5, title: "Apendicite Aguda", score: 4.8, area: "CR", date: "23/12" },
];

const mockEvolutionData: EvolutionData[] = [
  { date: "01/12", score: 5.2, media: 6.5 },
  { date: "05/12", score: 5.8, media: 6.5 },
  { date: "10/12", score: 6.1, media: 6.6 },
  { date: "15/12", score: 6.8, media: 6.6 },
  { date: "20/12", score: 7.2, media: 6.7 },
  { date: "25/12", score: 7.0, media: 6.7 },
  { date: "30/12", score: 7.3, media: 6.8 },
];

const mockGlobalStats: GlobalStats = {
  totalUsers: 2547,
  avgScore: 6.8,
  topPerformers: 312,
  activeToday: 847,
};

const mockRadarData = [
  { subject: "Cirurgia", A: 75, B: 68, fullMark: 100 },
  { subject: "Clínica", A: 65, B: 70, fullMark: 100 },
  { subject: "GO", A: 64, B: 65, fullMark: 100 },
  { subject: "Pediatria", A: 79, B: 72, fullMark: 100 },
  { subject: "Preventiva", A: 80, B: 75, fullMark: 100 },
];

const mockWeeklyActivity = [
  { day: "Seg", estacoes: 4, tempo: 45 },
  { day: "Ter", estacoes: 6, tempo: 72 },
  { day: "Qua", estacoes: 3, tempo: 35 },
  { day: "Qui", estacoes: 8, tempo: 95 },
  { day: "Sex", estacoes: 5, tempo: 58 },
  { day: "Sáb", estacoes: 2, tempo: 25 },
  { day: "Dom", estacoes: 1, tempo: 12 },
];

const mockDistributionData = [
  { name: "Cirurgia", value: 11, color: "#3b82f6" },
  { name: "Clínica", value: 11, color: "#8b5cf6" },
  { name: "GO", value: 9, color: "#ec4899" },
  { name: "Pediatria", value: 15, color: "#10b981" },
  { name: "Preventiva", value: 7, color: "#f59e0b" },
];


// Componente de Score Circular
function CircularScore({ score, size = 120, strokeWidth = 8 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / 10) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 7) return "#22c55e";
    if (s >= 5) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">Geral</span>
      </div>
    </div>
  );
}

// Componente de Card de Área
function AreaCard({ area }: { area: AreaStats }) {
  const Icon = area.icon;
  const isPositive = area.trend >= 0;
  
  return (
    <div className="group relative p-4 rounded-xl bg-gradient-to-br from-card/80 to-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${area.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: area.color }} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(area.trend)}%
        </div>
      </div>
      
      <h3 className="font-semibold text-foreground mb-1">{area.area}</h3>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold" style={{ color: area.color }}>{area.media.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">Média</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-foreground">{area.estacoes}</p>
          <p className="text-xs text-muted-foreground">Estações</p>
        </div>
      </div>
      
      <div className="mt-3">
        <Progress value={area.media * 10} className="h-1.5" />
      </div>
    </div>
  );
}

// Componente Principal
export default function MeusDesempenhos() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  
  // Calcular estatísticas gerais
  const totalEstacoes = mockAreaStats.reduce((acc, a) => acc + a.estacoes, 0);
  const mediaGeral = mockAreaStats.reduce((acc, a) => acc + a.media, 0) / mockAreaStats.length;
  const tempoTotal = mockWeeklyActivity.reduce((acc, d) => acc + d.tempo, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Meus Desempenhos</h1>
            <p className="text-muted-foreground">Análise detalhada da sua evolução</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="all">Todo período</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalEstacoes}</p>
                  <p className="text-xs text-muted-foreground">Estações Realizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mediaGeral.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Média Geral</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.floor(tempoTotal / 60)}h{tempoTotal % 60}m</p>
                  <p className="text-xs text-muted-foreground">Tempo de Estudo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Top 25%</p>
                  <p className="text-xs text-muted-foreground">Ranking Geral</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Evolução */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Minha Evolução
                  </CardTitle>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Você</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                      <span>Média Geral</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockEvolutionData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} fill="url(#colorScore)" name="Sua Nota" />
                      <Line type="monotone" dataKey="media" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Média Plataforma" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Desempenho por Área */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Desempenho por Área
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {mockAreaStats.map((area) => (
                    <AreaCard key={area.areaCode} area={area} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs de Gráficos */}
            <Card>
              <CardHeader className="pb-2">
                <Tabs defaultValue="radar" className="w-full">
                  <div className="flex items-center justify-between">
                    <CardTitle>Análise Comparativa</CardTitle>
                    <TabsList>
                      <TabsTrigger value="radar">Radar</TabsTrigger>
                      <TabsTrigger value="bar">Barras</TabsTrigger>
                      <TabsTrigger value="pie">Pizza</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="radar" className="mt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={mockRadarData}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--border))" />
                          <Radar name="Você" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                          <Radar name="Média Geral" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bar" className="mt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockAreaStats} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" domain={[0, 10]} stroke="hsl(var(--muted-foreground))" />
                          <YAxis dataKey="area" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="media" name="Média" radius={[0, 4, 4, 0]}>
                            {mockAreaStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pie" className="mt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {mockDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>


          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Score Geral */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Minha Média Geral</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <CircularScore score={mediaGeral} size={140} />
                <div className="mt-4 w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Média da Plataforma</span>
                    <span className="font-medium">{mockGlobalStats.avgScore}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sua Posição</span>
                    <span className="font-medium text-green-500">Top 25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Desempenho por Categoria */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Desempenho por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCategoryPerformance.map((cat) => (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{cat.category}</span>
                      <span className="font-medium" style={{ color: cat.color }}>{cat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pontos a Melhorar */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Pontos a Melhorar
                  <Badge variant="secondary" className="ml-auto">{mockWeakPoints.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockWeakPoints.slice(0, 4).map((point) => (
                  <div 
                    key={point.id} 
                    className="flex items-center gap-3 p-2 rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white",
                      point.score < 3 ? "bg-red-500" : point.score < 5 ? "bg-amber-500" : "bg-yellow-500"
                    )}>
                      {point.score.toFixed(1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{point.title}</p>
                      <p className="text-xs text-muted-foreground">{point.area} • {point.date}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
                {mockWeakPoints.length > 4 && (
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    Ver Mais ({mockWeakPoints.length - 4})
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Estatísticas Globais */}
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Estatísticas da Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-card/50">
                    <p className="text-xl font-bold text-foreground">{mockGlobalStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Usuários</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50">
                    <p className="text-xl font-bold text-foreground">{mockGlobalStats.avgScore}</p>
                    <p className="text-xs text-muted-foreground">Média Geral</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50">
                    <p className="text-xl font-bold text-green-500">{mockGlobalStats.topPerformers}</p>
                    <p className="text-xs text-muted-foreground">Top Performers</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50">
                    <p className="text-xl font-bold text-primary">{mockGlobalStats.activeToday}</p>
                    <p className="text-xs text-muted-foreground">Ativos Hoje</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* AI Chat */}
        <AIAnalystChat 
          userStats={{
            mediaGeral,
            totalEstacoes,
            tempoEstudo: tempoTotal,
            areaStats: mockAreaStats.map(a => ({ area: a.area, media: a.media, estacoes: a.estacoes })),
            categoryPerformance: mockCategoryPerformance.map(c => ({ category: c.category, percentage: c.percentage })),
            weakPoints: mockWeakPoints.map(w => ({ title: w.title, score: w.score, area: w.area })),
          }}
        />

        {/* Atividade Semanal */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Atividade Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="estacoes" name="Estações" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-4">
          RevalidaFlow © 2025
        </footer>
      </div>
    </AppLayout>
  );
}