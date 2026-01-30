import { useState } from "react";
import { Calendar, Clock, CheckCircle2, Circle, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  time: string;
  duration: string;
  completed: boolean;
}

interface DaySchedule {
  date: string;
  dayName: string;
  tasks: Task[];
}

const weekSchedule: DaySchedule[] = [
  {
    date: "02",
    dayName: "Seg",
    tasks: [
      { id: 1, title: "Revisão Cirurgia - Abdome Agudo", category: "CR", categoryColor: "bg-destructive", time: "08:00", duration: "2h", completed: true },
      { id: 2, title: "Flashcards Clínica Médica", category: "CM", categoryColor: "bg-info", time: "10:30", duration: "1h", completed: true },
      { id: 3, title: "Checklist Pediatria", category: "PE", categoryColor: "bg-warning", time: "14:00", duration: "1h30", completed: false },
    ],
  },
  {
    date: "03",
    dayName: "Ter",
    tasks: [
      { id: 4, title: "Estudo GO - Pré-natal", category: "GO", categoryColor: "bg-specialty-go", time: "09:00", duration: "2h", completed: false },
      { id: 5, title: "Simulado Preventiva", category: "PV", categoryColor: "bg-success", time: "15:00", duration: "3h", completed: false },
    ],
  },
  {
    date: "04",
    dayName: "Qua",
    tasks: [
      { id: 6, title: "Revisão INEP 2024", category: "IN", categoryColor: "bg-primary", time: "08:00", duration: "4h", completed: false },
    ],
  },
  {
    date: "05",
    dayName: "Qui",
    tasks: [
      { id: 7, title: "Checklist Cirurgia", category: "CR", categoryColor: "bg-destructive", time: "08:00", duration: "2h", completed: false },
      { id: 8, title: "Flashcards GO", category: "GO", categoryColor: "bg-specialty-go", time: "11:00", duration: "1h", completed: false },
    ],
  },
  {
    date: "06",
    dayName: "Sex",
    tasks: [
      { id: 9, title: "Simulado Geral", category: "SG", categoryColor: "bg-primary", time: "08:00", duration: "6h", completed: false },
    ],
  },
  {
    date: "07",
    dayName: "Sáb",
    tasks: [
      { id: 10, title: "Revisão de Erros", category: "RV", categoryColor: "bg-warning", time: "10:00", duration: "3h", completed: false },
    ],
  },
  {
    date: "08",
    dayName: "Dom",
    tasks: [],
  },
];

export default function Cronograma() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cronograma</h1>
            <p className="text-sm text-muted-foreground">Dezembro 2025</p>
          </div>
          <Button className="btn-primary-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        {/* Week navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2 flex-1 justify-center">
            {weekSchedule.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  "flex flex-col items-center px-4 py-3 rounded-xl transition-all",
                  selectedDay === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
              >
                <span className="text-xs font-medium opacity-70">{day.dayName}</span>
                <span className="text-lg font-bold">{day.date}</span>
                {day.tasks.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {day.tasks.slice(0, 3).map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-current opacity-50" />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Tasks for selected day */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main task list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                {weekSchedule[selectedDay].dayName}, {weekSchedule[selectedDay].date} de Dezembro
              </h2>
            </div>

            {weekSchedule[selectedDay].tasks.length === 0 ? (
              <div className="rounded-xl card-gradient p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma tarefa para este dia</p>
                <Button className="mt-4 btn-primary-gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tarefa
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {weekSchedule[selectedDay].tasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "rounded-xl card-gradient p-4 flex items-center gap-4 transition-all",
                      task.completed && "opacity-60"
                    )}
                  >
                    <button className="flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </button>
                    
                    <span className={`specialty-tag ${task.categoryColor} text-white`}>
                      {task.category}
                    </span>
                    
                    <div className="flex-1">
                      <p className={cn(
                        "font-medium text-foreground",
                        task.completed && "line-through"
                      )}>
                        {task.title}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.time}
                      </span>
                      <span className="px-2 py-1 rounded bg-secondary">
                        {task.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl card-gradient p-5">
              <h3 className="text-sm font-medium text-primary mb-4">Resumo da Semana</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tarefas planejadas</span>
                  <span className="text-lg font-bold text-foreground">
                    {weekSchedule.reduce((acc, day) => acc + day.tasks.length, 0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Concluídas</span>
                  <span className="text-lg font-bold text-success">
                    {weekSchedule.reduce((acc, day) => acc + day.tasks.filter(t => t.completed).length, 0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pendentes</span>
                  <span className="text-lg font-bold text-warning">
                    {weekSchedule.reduce((acc, day) => acc + day.tasks.filter(t => !t.completed).length, 0)}
                  </span>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <span className="text-sm font-medium text-foreground">20%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill bg-primary" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-primary/20 to-info/20 border border-primary/30 p-5">
              <h3 className="text-sm font-medium text-primary mb-2">Dica do Dia</h3>
              <p className="text-sm text-foreground/90">
                Mantenha o foco nas revisões. A repetição espaçada é a chave para a memorização de longo prazo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 RevalidaFLOW
      </footer>
    </AppLayout>
  );
}
