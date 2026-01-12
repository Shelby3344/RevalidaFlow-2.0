import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  FileText,
  Play,
  Clock,
  RotateCcw,
  Eye,
  CheckCircle2,
  PauseCircle,
  ChevronRight,
  Target,
  Brain,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { AllChecklistsModal } from "@/components/AllChecklistsModal";
import { TreinoIAModeModal } from "@/components/treino-ia/TreinoIAModeModal";
import { PepeChecklistsModal } from "@/components/PepeChecklistsModal";
import { ActiveUsersPanel } from "@/components/collaborative/ActiveUsersPanel";
import { checklistsData } from "@/data/checklists";
import { cn } from "@/lib/utils";

type ActivityType = "completed" | "paused" | "resumed" | "started";
type FilterPeriod = "today" | "7days" | "30days";

interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  area: string;
  areaColor: string;
  time: string;
  score?: number;
  duration?: string;
}

const recentActivities: Activity[] = [
  {
    id: 1,
    type: "completed",
    title: "Baby Blues (REAPLICAÇÃO)",
    area: "PR",
    areaColor: "from-emerald-500 to-teal-600",
    time: "Há 2 horas",
    score: 85,
    duration: "8:32",
  },
  {
    id: 2,
    type: "paused",
    title: "Síndrome dos Ovários Policísticos - SOP",
    area: "GO",
    areaColor: "from-fuchsia-500 to-pink-600",
    time: "Há 5 horas",
    duration: "4:15",
  },
  {
    id: 3,
    type: "completed",
    title: "Abdome Agudo Perfurativo | INEP 2025.1",
    area: "CR",
    areaColor: "from-red-500 to-rose-600",
    time: "Ontem",
    score: 72,
    duration: "9:45",
  },
  {
    id: 4,
    type: "completed",
    title: "Cetoacidose Diabética",
    area: "CM",
    areaColor: "from-blue-500 to-cyan-600",
    time: "Ontem",
    score: 90,
    duration: "7:20",
  },
  {
    id: 5,
    type: "resumed",
    title: "Pancreatite Aguda de Causa Biliar",
    area: "CR",
    areaColor: "from-red-500 to-rose-600",
    time: "2 dias atrás",
  },
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "completed":
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case "paused":
      return <PauseCircle className="w-4 h-4 text-amber-500" />;
    case "resumed":
      return <RotateCcw className="w-4 h-4 text-blue-500" />;
    case "started":
      return <Play className="w-4 h-4 text-primary" />;
  }
};

const getActivityLabel = (type: ActivityType) => {
  switch (type) {
    case "completed":
      return "Concluído";
    case "paused":
      return "Pausado";
    case "resumed":
      return "Retomado";
    case "started":
      return "Iniciado";
  }
};

export default function Checklists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [isPepeModalOpen, setIsPepeModalOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("7days");
  const navigate = useNavigate();

  const handleStartChecklist = (id: string) => {
    navigate(`/checklists/execucao/${id}`);
  };

  const handleJoinRoom = (roomId: string) => {
    console.log('Entrando na sala:', roomId);
    // Navegar para a sala colaborativa
    navigate(`/collaborative/${roomId}`);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com ações principais */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sua Atividade</h1>
            <p className="text-muted-foreground mt-1">
              Acompanhe seu progresso e continue de onde parou
            </p>
          </div>

          {/* Filtro de período */}
          <div className="flex items-center gap-2 bg-secondary/50 rounded-xl p-1">
            {[
              { value: "today", label: "Hoje" },
              { value: "7days", label: "7 dias" },
              { value: "30days", label: "30 dias" },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setFilterPeriod(period.value as FilterPeriod)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  filterPeriod === period.value
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed de Atividades - Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Últimos Realizados - Timeline */}
            <div className="card-modern overflow-hidden">
              <div className="p-5 border-b border-border/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Últimos Realizados
                </h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Ver histórico completo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="divide-y divide-border/30">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br",
                              activity.areaColor
                            )}
                          >
                            {activity.area}
                          </div>
                          <h3 className="text-sm font-medium text-foreground truncate">
                            {activity.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className={cn(
                            "font-medium",
                            activity.type === "completed" && "text-emerald-500",
                            activity.type === "paused" && "text-amber-500",
                            activity.type === "resumed" && "text-blue-500"
                          )}>
                            {getActivityLabel(activity.type)}
                          </span>
                          <span>•</span>
                          <span>{activity.time}</span>
                          {activity.duration && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.duration}
                              </span>
                            </>
                          )}
                          {activity.score !== undefined && (
                            <>
                              <span>•</span>
                              <span className={cn(
                                "font-semibold",
                                activity.score >= 70 ? "text-emerald-500" : activity.score >= 50 ? "text-amber-500" : "text-red-500"
                              )}>
                                {activity.score}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {activity.type === "paused" ? (
                          <Button
                            size="sm"
                            onClick={() => handleStartChecklist(activity.id.toString())}
                            className="h-8 px-3 bg-amber-500 hover:bg-amber-600 text-white"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Continuar
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartChecklist(activity.id.toString())}
                              className="h-8 px-3"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              Repetir
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-3 text-muted-foreground"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Detalhes
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continuar de onde parou - REMOVIDO */}
          </div>

          {/* Sidebar - Stats e Ações */}
          <div className="space-y-6">
            {/* Quick Actions - Cards Horizontais */}
            <div className="space-y-3">
              {/* Card Principal - Todos os Checklists */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-4 text-left transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                    <List className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">Todos os Checklists</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{checklistsData.length} estações disponíveis</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              {/* Card - Treinar com IA */}
              <button
                onClick={() => setIsIAModalOpen(true)}
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 border border-violet-700/30 p-4 text-left transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl" />
                <div className="flex items-center gap-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                    <Brain className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">Paciente IA</h3>
                    <p className="text-xs text-violet-300/70 mt-0.5">Simulação com inteligência artificial</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-violet-400/50 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              {/* Card - Checklists PEPE */}
              <button
                onClick={() => setIsPepeModalOpen(true)}
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-700/30 p-4 text-left transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">Checklists PEPE</h3>
                    <p className="text-xs text-indigo-300/70 mt-0.5">Estações oficiais do PEPE</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-400/50 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              {/* Card - Criar Simulado */}
              <button
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-700/30 p-4 text-left transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">Criar Simulado</h3>
                    <p className="text-xs text-emerald-300/70 mt-0.5">Monte seu próprio treino</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-400/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </div>

            {/* Stats Compacto */}
            <div className="card-modern p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-cyan-400">{checklistsData.length}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Concluídos</div>
                </div>
                <div className="space-y-1 border-x border-border/50">
                  <div className="text-2xl font-bold text-emerald-400">78%</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Média</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-amber-400">7🔥</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Sequência</div>
                </div>
              </div>
            </div>

            {/* Progresso por Área - Visual diferente */}
            <div className="card-modern p-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Progresso por Área
              </h3>

              <div className="grid grid-cols-5 gap-2">
                {[
                  { area: "CM", color: "bg-blue-500", percent: 65 },
                  { area: "CR", color: "bg-red-500", percent: 45 },
                  { area: "GO", color: "bg-fuchsia-500", percent: 80 },
                  { area: "PD", color: "bg-amber-500", percent: 55 },
                  { area: "PV", color: "bg-emerald-500", percent: 70 },
                ].map((item) => (
                  <div key={item.area} className="text-center">
                    <div className="relative w-full aspect-square mb-1.5">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="hsl(var(--muted))"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          className={item.color.replace('bg-', 'stroke-')}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${item.percent * 0.88} 88`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-foreground">{item.percent}%</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground">{item.area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Painel de Usuários Ativos */}
            <ActiveUsersPanel onJoinRoom={handleJoinRoom} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AllChecklistsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      {/* Modal de Treino IA */}
      <TreinoIAModeModal open={isIAModalOpen} onOpenChange={setIsIAModalOpen} />
      
      {/* Modal de Checklists PEPE */}
      <PepeChecklistsModal open={isPepeModalOpen} onOpenChange={setIsPepeModalOpen} />
    </AppLayout>
  );
}
