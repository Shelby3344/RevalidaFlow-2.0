import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Shuffle, List, X, Sparkles, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AreaBadge } from "@/components/AreaBadge";
import { checklistsData, AREA_OPTIONS } from "@/data/checklists";

interface TreinoIAModeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Mode = "choose" | "random" | null;

export function TreinoIAModeModal({
  open,
  onOpenChange,
}: TreinoIAModeModalProps) {
  const [mode, setMode] = useState<Mode>(null);
  const [selectedArea, setSelectedArea] = useState("all");
  const navigate = useNavigate();

  // Filtrar checklists por área
  const filteredChecklists = checklistsData.filter((item) => {
    if (selectedArea === "all") return true;
    if (selectedArea === "GO") return item.areaCode === "GO";
    return item.areaCode === selectedArea;
  });

  // Iniciar treino com caso aleatório
  const handleRandomStart = () => {
    const availableChecklists =
      selectedArea === "all"
        ? checklistsData
        : checklistsData.filter((c) => c.areaCode === selectedArea);

    if (availableChecklists.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableChecklists.length);
    const randomChecklist = availableChecklists[randomIndex];

    onOpenChange(false);
    setMode(null);
    navigate(`/treino-ia-completo/${randomChecklist.id}`);
  };

  // Iniciar treino com caso específico
  const handleSelectChecklist = (id: string) => {
    onOpenChange(false);
    setMode(null);
    navigate(`/treino-ia-completo/${id}`);
  };

  // Voltar para seleção de modo
  const handleBack = () => {
    setMode(null);
  };

  // Fechar modal
  const handleClose = () => {
    setMode(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-background border-border p-0 gap-0 sm:rounded-lg [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  Treino com Paciente IA
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Pratique consultas com paciente simulado
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 rounded-lg hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content - altura fixa para manter modal centralizado */}
        <div className="p-6 min-h-[380px] max-h-[60vh] overflow-y-auto flex flex-col">
          {mode === null && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-6">
                Como você quer treinar hoje?
              </p>

              {/* Opção: Caso Aleatório */}
              <button
                onClick={() => setMode("random")}
                className="w-full p-4 rounded-xl border-2 border-border hover:border-violet-500/50 bg-secondary/30 hover:bg-violet-500/10 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
                    <Shuffle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        Caso Aleatório
                      </h3>
                      <span className="text-[10px] bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full font-medium">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      O sistema escolhe um caso clínico surpresa. Você não verá
                      o diagnóstico antes de começar.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-amber-400">
                      <EyeOff className="w-3 h-3" />
                      <span>Diagnóstico oculto</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Opção: Escolher Caso */}
              <button
                onClick={() => setMode("choose")}
                className="w-full p-4 rounded-xl border-2 border-border hover:border-cyan-500/50 bg-secondary/30 hover:bg-cyan-500/10 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <List className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      Escolher Caso
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Selecione um caso específico para treinar. Útil para
                      revisar temas que você já estudou.
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-cyan-400">
                      <Eye className="w-3 h-3" />
                      <span>Você verá o diagnóstico</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}

          {mode === "random" && (
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-muted-foreground"
                >
                  ← Voltar
                </Button>
              </div>

              <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Caso Aleatório
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Selecione uma área ou deixe em "Todas" para um caso
                    totalmente surpresa
                  </p>
                </div>

                {/* Filtro de área */}
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-full bg-secondary border-border">
                    <SelectValue placeholder="Todas as Áreas" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Todas as Áreas</SelectItem>
                    <SelectItem value="CM">Clínica Médica</SelectItem>
                    <SelectItem value="CR">Cirurgia</SelectItem>
                    <SelectItem value="GO">Ginecologia e Obstetrícia</SelectItem>
                    <SelectItem value="PE">Pediatria</SelectItem>
                    <SelectItem value="PR">Preventiva</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-xs text-muted-foreground">
                  {selectedArea === "all"
                    ? `${checklistsData.length} casos disponíveis`
                    : `${filteredChecklists.length} casos em ${
                        AREA_OPTIONS.find((a) => a.value === selectedArea)
                          ?.label || selectedArea
                      }`}
                </div>

                <Button
                  onClick={handleRandomStart}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  Sortear Caso e Começar
                </Button>
              </div>
            </div>
          )}

          {mode === "choose" && (
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-muted-foreground"
                >
                  ← Voltar
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Escolha um caso clínico
                </h3>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-[180px] h-8 text-xs bg-secondary border-border">
                    <SelectValue placeholder="Filtrar por área" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Todas as Áreas</SelectItem>
                    <SelectItem value="CM">Clínica Médica</SelectItem>
                    <SelectItem value="CR">Cirurgia</SelectItem>
                    <SelectItem value="GO">GO</SelectItem>
                    <SelectItem value="PE">Pediatria</SelectItem>
                    <SelectItem value="PR">Preventiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-xs text-muted-foreground text-center bg-amber-500/10 text-amber-400 px-3 py-2 rounded-lg">
                <Eye className="w-3 h-3 inline mr-1" />
                Atenção: O nome do checklist revela o diagnóstico
              </div>

              <ScrollArea className="flex-1 min-h-[200px] -mx-2 px-2">
                <div className="space-y-1">
                  {filteredChecklists.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectChecklist(item.id)}
                      className="w-full p-3 rounded-lg border border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <AreaBadge areaCode={item.areaCode} />
                        <span className="text-sm text-foreground flex-1 truncate">
                          {item.title}
                        </span>
                        <Brain className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
