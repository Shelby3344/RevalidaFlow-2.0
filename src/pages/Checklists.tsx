import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, List, FileText, Bot } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AllChecklistsModal } from "@/components/AllChecklistsModal";

interface ChecklistItem {
  tag: string;
  tagColor: string;
  title: string;
  completed: boolean;
  average: number;
}

const checklists: ChecklistItem[] = [
  { tag: "PR", tagColor: "bg-primary", title: "Baby Blues (REAPLICAÇÃO)", completed: true, average: 100 },
  { tag: "GO", tagColor: "bg-specialty-go", title: "Síndrome dos Ovários Policísticos - SOP", completed: false, average: 0 },
  { tag: "CR", tagColor: "bg-destructive", title: "Abdome Agudo Perfurativo por Úlcera Péptica | INEP 2025.1", completed: false, average: 0 },
  { tag: "PE", tagColor: "bg-warning", title: "Síndrome Nefrótica: Doença por lesão mínima", completed: false, average: 0 },
  { tag: "CR", tagColor: "bg-destructive", title: "Pancreatite Aguda de Causa Biliar", completed: true, average: 40 },
];

export default function Checklists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartChecklist = (index: number) => {
    // Map index to actual checklist ID (for demo purposes using index+1)
    navigate(`/checklists/execucao/${index + 1}`);
  };

  const handleStartTreinoIA = (index: number) => {
    // Navegar para treino com IA
    navigate(`/treino-ia/${index + 1}`);
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search section */}
          <div className="rounded-xl card-gradient p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Buscar um checklist</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar um tema..." 
                  className="pl-10 input-search"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Filtrar por pessoa..." 
                  className="pl-10 input-search"
                />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1 rounded-full overflow-hidden flex">
              <div className="h-full bg-success w-1/4"></div>
              <div className="h-full bg-warning w-1/4"></div>
              <div className="h-full bg-info w-1/4"></div>
              <div className="h-full bg-primary w-1/4"></div>
            </div>
          </div>

          {/* Table section */}
          <div className="rounded-xl card-gradient p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Sugestões de Temas</h2>
            
            <table className="table-dark">
              <thead>
                <tr>
                  <th>TEMA</th>
                  <th>REALIZADO</th>
                  <th>MÉDIA DO RESULTADO</th>
                  <th>AÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {checklists.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className={`specialty-tag ${item.tagColor} text-white`}>
                          {item.tag}
                        </span>
                        <span className="text-sm text-foreground">{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className={item.completed ? "text-success" : "text-muted-foreground"}>
                        {item.completed ? "Sim" : "Não"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden max-w-[120px]">
                          <div 
                            className="h-full bg-info rounded-full transition-all duration-500"
                            style={{ width: `${item.average}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{item.average}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="btn-primary-gradient text-xs px-3"
                          onClick={() => handleStartChecklist(index)}
                        >
                          Iniciar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs px-3 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                          onClick={() => handleStartTreinoIA(index)}
                        >
                          <Bot className="w-3 h-3 mr-1" />
                          IA
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="rounded-xl card-gradient p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Mais de <span className="text-foreground font-bold">610</span> checklists atualizados.
            </p>
            
            {/* Donut chart placeholder */}
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="20"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="hsl(var(--success))"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="100 280"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="hsl(var(--warning))"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="80 280"
                  strokeDashoffset="-100"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="hsl(var(--info))"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="60 280"
                  strokeDashoffset="-180"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="hsl(var(--primary))"
                  strokeWidth="20"
                  fill="none"
                  strokeDasharray="40 280"
                  strokeDashoffset="-240"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">586</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">Opções</p>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full btn-primary-gradient"
                onClick={() => setIsModalOpen(true)}
              >
                <List className="w-4 h-4 mr-2" />
                Todos os Checklists
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:opacity-90"
                onClick={() => setIsModalOpen(true)}
              >
                <Bot className="w-4 h-4 mr-2" />
                Treinar com Paciente IA
              </Button>
              <Button className="w-full bg-gradient-to-r from-success to-emerald-600 text-success-foreground hover:opacity-90">
                <FileText className="w-4 h-4 mr-2" />
                Criar Simulado
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>

      {/* Modal */}
      <AllChecklistsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </AppLayout>
  );
}
