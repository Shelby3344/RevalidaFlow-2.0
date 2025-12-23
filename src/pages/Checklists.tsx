import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  FileText,
  Bot,
  Play,
  TrendingUp,
  Clock,
  RotateCcw,
  Eye,
  CheckCircle2,
  PauseCircle,
  AlertCircle,
  ChevronRight,
  Calendar,
  Target,
  Flame,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { AllChecklistsModal } from "@/components/AllChecklistsModal";
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
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("7days");
  const navigate = useNavigate();

  const handleStartChecklist = (id: string) => {
    navigate(`/checklists/execucao/${id}`);
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

            {/* Continuar de onde parou */}
            {recentActivities.some((a) => a.type === "paused") && (
              <div className="card-modern p-5 border-l-4 border-amber-500 bg-amber-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Você tem um checklist pausado
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Síndrome dos Ovários Policísticos - SOP • 4:15 de progresso
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleStartChecklist("2")}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Continuar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Stats e Ações */}
          <div className="space-y-6">
            {/* Stats Card com Donut */}
            <div className="card-modern p-6">
              <div className="text-center">
                {/* Donut chart */}
                <div className="relative w-36 h-36 mx-auto mb-4">
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="hsl(var(--muted))"
                      strokeWidth="14"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="hsl(142 76% 36%)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray="94 283"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="hsl(38 92% 50%)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray="75 283"
                      strokeDashoffset="-94"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="hsl(199 89% 48%)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray="57 283"
                      strokeDashoffset="-169"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="hsl(258 90% 66%)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray="38 283"
                      strokeDashoffset="-226"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gradient">586</span>
                    <span className="text-[10px] text-muted-foreground">concluídos</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-5">
                  Você está no caminho certo! Continue praticando.
                </p>

                {/* Action buttons */}
                <div className="space-y-2.5">
                  <Button
                    className="w-full h-10 gap-2 bg-primary hover:bg-primary/90 text-white text-sm"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <List className="w-4 h-4" />
                    Todos os Checklists
                  </Button>
                  <Button
                    className="w-full h-10 gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 text-sm"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Bot className="w-4 h-4" />
                    Treinar com Paciente IA
                  </Button>
                  <Button className="w-full h-10 gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                    <FileText className="w-4 h-4" />
                    Criar Simulado
                  </Button>
                </div>
              </div>
            </div>

            {/* Progresso Semanal */}
            <div className="card-modern p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Seu Progresso
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Esta semana</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">12 checklists</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Média geral</span>
                  </div>
                  <span className="text-sm font-semibold text-emerald-500">78%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Sequência</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-500">🔥 7 dias</span>
                </div>
              </div>

              {/* Mini progress bars por área */}
              <div className="mt-5 pt-4 border-t border-border/50 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Clínica</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[65%] bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">65%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Cirurgia</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[45%] bg-red-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">45%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">GO</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[80%] bg-fuchsia-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">80%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Pediatria</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[55%] bg-amber-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">55%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Preventiva</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[70%] bg-emerald-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-foreground">70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AllChecklistsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </AppLayout>
  );
}
