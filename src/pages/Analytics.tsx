import { useState } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  TrendingUp, Target, Award, Clock, Brain,
  BarChart3, Activity, Users, Sparkles, ChevronRight,
  AlertTriangle, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Loader2, RefreshCw, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalytics, AreaStats } from "@/hooks/useAnalytics";
import { toast } from "sonner";


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
        {area.estacoes > 0 && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(area.trend)}%
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-foreground mb-1 text-sm">{area.area}</h3>
      
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

// Componente de Estado Vazio
function EmptyState({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <BarChart3 className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum dado ainda</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-4">
        Complete alguns checklists para ver suas estatísticas de desempenho aqui.
      </p>
      <Button onClick={onRefresh} variant="outline" size="sm">
        <RefreshCw className="w-4 h-4 mr-2" />
        Atualizar
      </Button>
    </div>
  );
}


// Componente Principal
export default function Analytics() {
  const {
    areaStats,
    weakPoints,
    evolutionData,
    globalStats,
    loading,
    totalEstacoes,
    mediaGeral,
    tempoTotalMinutos,
    refreshData,
    resetAllStats,
    stats,
  } = useAnalytics();

  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isResetting, setIsResetting] = useState(false);

  // Preparar dados para gráficos
  const radarData = areaStats.map(a => ({
    subject: a.areaCode,
    A: a.media * 10,
    B: globalStats.avgScore * 10 || 65,
    fullMark: 100,
  }));

  const distributionData = areaStats
    .filter(a => a.estacoes > 0)
    .map(a => ({
      name: a.areaCode,
      value: a.estacoes,
      color: a.color,
    }));

  // Handler para resetar estatísticas
  const handleResetStats = async () => {
    setIsResetting(true);
    try {
      await resetAllStats();
      toast.success("Estatísticas resetadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao resetar estatísticas");
    } finally {
      setIsResetting(false);
    }
  };

  // Calcular ranking do usuário
  const getUserRanking = () => {
    if (globalStats.totalUsers === 0 || mediaGeral === 0) return "N/A";
    const percentile = mediaGeral >= 7 ? 25 : mediaGeral >= 5 ? 50 : 75;
    return `Top ${percentile}%`;
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Análise detalhada do seu desempenho</p>
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

            <Button variant="outline" size="icon" onClick={refreshData}>
              <RefreshCw className="w-4 h-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Resetar todas as estatísticas?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação irá apagar permanentemente todo o seu histórico de checklists e estatísticas. 
                    Você começará do zero. Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleResetStats}
                    disabled={isResetting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isResetting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resetando...
                      </>
                    ) : (
                      "Sim, resetar tudo"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                  <p className="text-2xl font-bold">
                    {Math.floor(tempoTotalMinutos / 60)}h{Math.round(tempoTotalMinutos % 60)}m
                  </p>
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
                  <p className="text-2xl font-bold">{getUserRanking()}</p>
                  <p className="text-xs text-muted-foreground">Ranking Geral</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {totalEstacoes === 0 ? (
          <EmptyState onRefresh={refreshData} />
        ) : (
          <>
            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Evolução */}
                {evolutionData.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5 text-primary" />
                          Evolução do Desempenho
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
                          <AreaChart data={evolutionData}>
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
                            <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} fill="url(#colorScore)" />
                            <Line type="monotone" dataKey="media" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}

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
                      {areaStats.map((area) => (
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
                            <RadarChart data={radarData}>
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
                            <BarChart data={areaStats} layout="vertical">
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
                              <Bar dataKey="media" radius={[0, 4, 4, 0]}>
                                {areaStats.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="pie" className="mt-4">
                        <div className="h-[300px]">
                          {distributionData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={distributionData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={100}
                                  paddingAngle={5}
                                  dataKey="value"
                                  label={({ name, value }) => `${name}: ${value}`}
                                >
                                  {distributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              Sem dados para exibir
                            </div>
                          )}
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
                        <span className="font-medium">{globalStats.avgScore.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sua Posição</span>
                        <span className={cn(
                          "font-medium",
                          mediaGeral >= 7 ? "text-green-500" : mediaGeral >= 5 ? "text-amber-500" : "text-red-500"
                        )}>
                          {getUserRanking()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Melhor Nota</span>
                        <span className="font-medium text-green-500">
                          {stats?.best_score ? (stats.best_score / 10).toFixed(1) : "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pontos a Melhorar */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Pontos a Melhorar
                      {weakPoints.length > 0 && (
                        <Badge variant="secondary" className="ml-auto">{weakPoints.length}</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {weakPoints.length > 0 ? (
                      weakPoints.map((point) => (
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
                      ))
                    ) : (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        Nenhum ponto fraco identificado!
                      </div>
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
                        <p className="text-xl font-bold text-foreground">{globalStats.totalUsers.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Usuários</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-card/50">
                        <p className="text-xl font-bold text-foreground">{globalStats.avgScore.toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground">Média Geral</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-card/50">
                        <p className="text-xl font-bold text-green-500">{globalStats.topPerformers}</p>
                        <p className="text-xs text-muted-foreground">Top Performers</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-card/50">
                        <p className="text-xl font-bold text-primary">{globalStats.activeToday}</p>
                        <p className="text-xs text-muted-foreground">Ativos Hoje</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Streak */}
                {stats && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        Sequência de Estudos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-amber-500">🔥 {stats.current_streak}</p>
                          <p className="text-xs text-muted-foreground">dias seguidos</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-foreground">{stats.longest_streak}</p>
                          <p className="text-xs text-muted-foreground">recorde</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-4">
          ProREV © 2025
        </footer>
      </div>
    </AppLayout>
  );
}
