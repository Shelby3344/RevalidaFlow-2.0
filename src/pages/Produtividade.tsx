import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, Circle, Plus, Trash2, Calendar,
  Target, ChevronLeft, ChevronRight, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";

interface DayData {
  date: string;
  tasks: { id: string; text: string; completed: boolean; date: string }[];
  percentage: number;
}

export default function Produtividade() {
  const { tasks, loadingTasks, addTask, toggleTask, deleteTask, getTasksByDate } = useUserData();
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [viewMode, setViewMode] = useState<"dia" | "semana" | "mes">("dia");
  const [isAdding, setIsAdding] = useState(false);

  const todayTasks = getTasksByDate(selectedDate);
  const completedCount = todayTasks.filter(t => t.completed).length;
  const percentage = todayTasks.length > 0 
    ? Math.round((completedCount / todayTasks.length) * 100) 
    : 0;

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    
    setIsAdding(true);
    try {
      await addTask(newTask.trim(), selectedDate);
      setNewTask("");
      toast.success("Tarefa adicionada!");
    } catch (error) {
      toast.error("Erro ao adicionar tarefa");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask(id);
    } catch (error) {
      toast.error("Erro ao atualizar tarefa");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Tarefa removida");
    } catch (error) {
      toast.error("Erro ao remover tarefa");
    }
  };

  const navigateDate = (direction: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + direction);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    
    if (dateStr === today) return "Hoje";
    if (dateStr === yesterday) return "Ontem";
    
    return date.toLocaleDateString("pt-BR", { 
      weekday: "long", 
      day: "numeric", 
      month: "short" 
    });
  };

  // Calculate week stats
  const getWeekStats = () => {
    const weekStart = new Date(selectedDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const days: DayData[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const dayTasks = getTasksByDate(dateStr);
      const completed = dayTasks.filter(t => t.completed).length;
      days.push({
        date: dateStr,
        tasks: dayTasks,
        percentage: dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : 0
      });
    }
    return days;
  };

  // Calculate month stats
  const getMonthStats = () => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let totalTasks = 0;
    let completedTasks = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayTasks = getTasksByDate(dateStr);
      totalTasks += dayTasks.length;
      completedTasks += dayTasks.filter(t => t.completed).length;
    }
    
    return {
      total: totalTasks,
      completed: completedTasks,
      percentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  };

  const weekStats = getWeekStats();
  const monthStats = getMonthStats();
  const weekPercentage = weekStats.reduce((acc, d) => acc + d.percentage, 0) / 7;

  const getProgressColor = (pct: number) => {
    if (pct >= 80) return "text-emerald-500";
    if (pct >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressBg = (pct: number) => {
    if (pct >= 80) return "bg-emerald-500";
    if (pct >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  if (loadingTasks) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Produtividade</h1>
            <p className="text-muted-foreground text-sm">Acompanhe seu desempenho diário</p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-secondary rounded-lg p-1">
            {(["dia", "semana", "mes"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  viewMode === mode 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {mode === "dia" ? "Dia" : mode === "semana" ? "Semana" : "Mês"}
              </button>
            ))}
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigateDate(-1)}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium capitalize">{formatDate(selectedDate)}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigateDate(1)}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className={cn(
            "p-4 rounded-xl border transition-all",
            viewMode === "dia" ? "bg-primary/5 border-primary/20" : "bg-card border-border"
          )}>
            <p className="text-xs text-muted-foreground mb-1">Hoje</p>
            <p className={cn("text-3xl font-bold", getProgressColor(percentage))}>{percentage}%</p>
            <p className="text-xs text-muted-foreground">{completedCount}/{todayTasks.length} tarefas</p>
          </div>
          
          <div className={cn(
            "p-4 rounded-xl border transition-all",
            viewMode === "semana" ? "bg-primary/5 border-primary/20" : "bg-card border-border"
          )}>
            <p className="text-xs text-muted-foreground mb-1">Semana</p>
            <p className={cn("text-3xl font-bold", getProgressColor(weekPercentage))}>{Math.round(weekPercentage)}%</p>
            <p className="text-xs text-muted-foreground">média semanal</p>
          </div>
          
          <div className={cn(
            "p-4 rounded-xl border transition-all",
            viewMode === "mes" ? "bg-primary/5 border-primary/20" : "bg-card border-border"
          )}>
            <p className="text-xs text-muted-foreground mb-1">Mês</p>
            <p className={cn("text-3xl font-bold", getProgressColor(monthStats.percentage))}>{monthStats.percentage}%</p>
            <p className="text-xs text-muted-foreground">{monthStats.completed}/{monthStats.total} tarefas</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center py-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={percentage >= 80 ? "#10b981" : percentage >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 440} 440`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-4xl font-bold", getProgressColor(percentage))}>{percentage}%</span>
              <span className="text-xs text-muted-foreground">concluído</span>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Adicionar nova tarefa..."
            className="flex-1"
            disabled={isAdding}
          />
          <Button onClick={handleAddTask} className="gap-2" disabled={isAdding}>
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Adicionar
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-2">
          {todayTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma tarefa para este dia</p>
              <p className="text-sm">Adicione tarefas para acompanhar sua produtividade</p>
            </div>
          ) : (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border transition-all",
                  task.completed 
                    ? "bg-emerald-500/5 border-emerald-500/20" 
                    : "bg-card border-border hover:border-primary/30"
                )}
              >
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className="flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
                  )}
                </button>
                <span className={cn(
                  "flex-1 text-sm",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.text}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Week View */}
        {viewMode === "semana" && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Visão da Semana</h3>
            <div className="grid grid-cols-7 gap-2">
              {weekStats.map((day, i) => {
                const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
                const isToday = day.date === new Date().toISOString().split("T")[0];
                const isSelected = day.date === selectedDate;
                
                return (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={cn(
                      "p-3 rounded-xl border text-center transition-all",
                      isSelected 
                        ? "bg-primary/10 border-primary/30" 
                        : "bg-card border-border hover:border-primary/20",
                      isToday && "ring-2 ring-primary/50"
                    )}
                  >
                    <p className="text-xs text-muted-foreground mb-1">{dayNames[i]}</p>
                    <p className={cn(
                      "text-lg font-bold",
                      day.tasks.length > 0 ? getProgressColor(day.percentage) : "text-muted-foreground/50"
                    )}>
                      {day.tasks.length > 0 ? `${day.percentage}%` : "-"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {day.tasks.length > 0 ? `${day.tasks.filter(t => t.completed).length}/${day.tasks.length}` : "0"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Month Calendar View */}
        {viewMode === "mes" && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              {new Date(selectedDate).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                <div key={i} className="text-center text-xs text-muted-foreground py-2">{d}</div>
              ))}
              {(() => {
                const date = new Date(selectedDate);
                const year = date.getFullYear();
                const month = date.getMonth();
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const today = new Date().toISOString().split("T")[0];
                
                const cells = [];
                for (let i = 0; i < firstDay; i++) {
                  cells.push(<div key={`empty-${i}`} />);
                }
                
                for (let day = 1; day <= daysInMonth; day++) {
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayTasks = getTasksByDate(dateStr);
                  const completed = dayTasks.filter(t => t.completed).length;
                  const pct = dayTasks.length > 0 ? Math.round((completed / dayTasks.length) * 100) : -1;
                  const isToday = dateStr === today;
                  const isSelected = dateStr === selectedDate;
                  
                  cells.push(
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      className={cn(
                        "aspect-square rounded-lg text-xs font-medium transition-all relative",
                        isSelected && "ring-2 ring-primary",
                        isToday && "ring-2 ring-emerald-500",
                        pct >= 80 && "bg-emerald-500/20 text-emerald-500",
                        pct >= 50 && pct < 80 && "bg-amber-500/20 text-amber-500",
                        pct >= 0 && pct < 50 && "bg-red-500/20 text-red-500",
                        pct === -1 && "text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      {day}
                      {dayTasks.length > 0 && (
                        <div className={cn(
                          "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                          getProgressBg(pct)
                        )} />
                      )}
                    </button>
                  );
                }
                
                return cells;
              })()}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="text-center py-4 text-sm text-muted-foreground">
          {percentage === 100 && "🎉 Parabéns! Você completou todas as tarefas!"}
          {percentage >= 80 && percentage < 100 && "💪 Excelente! Você está quase lá!"}
          {percentage >= 50 && percentage < 80 && "👍 Bom progresso! Continue assim!"}
          {percentage > 0 && percentage < 50 && "🚀 Vamos lá! Você consegue!"}
          {percentage === 0 && todayTasks.length > 0 && "⏰ Hora de começar suas tarefas!"}
        </div>
      </div>
    </AppLayout>
  );
}
