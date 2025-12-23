import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { List, User, Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AreaBadge } from "./AreaBadge";
import { checklistsData, AREA_OPTIONS, INEP_OPTIONS, AREA_ORDER, AreaCode } from "@/data/checklists";
import { CreateSessionModal } from "./avaliacao/CreateSessionModal";
import { getChecklistContentByIdAsync } from "@/data/checklistContents";
import { ChecklistEvaluationItem } from "@/types/checklists";
import { useChecklistMetrics } from "@/hooks/useChecklistMetrics";
import { useUserProfile } from "@/hooks/useUserProfile";

interface AllChecklistsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AllChecklistsModal({ open, onOpenChange }: AllChecklistsModalProps) {
  const { profile } = useUserProfile();
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedInep, setSelectedInep] = useState("all");
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<{
    id: string;
    title: string;
    areaCode: AreaCode;
    evaluationItems: ChecklistEvaluationItem[];
  } | null>(null);

  // Hook para métricas do usuário
  const { getAverage, getAttempts } = useChecklistMetrics();

  // Lista explícita de títulos de GO-Ginecologia (40 itens exatos)
  const ginecologiaList = [
    'Amenorreia Fisiológica',
    'Amenorreia Primária (Síndrome de Rokitansky)',
    'Amenorreia Secundária',
    'Candidíase vaginal (REAPLICAÇÃO) | INEP 2021',
    'Candidíase vulvovaginal recorrente',
    'Cervicite',
    'Cistite – Não complicada',
    'Cistite Recorrente',
    'Cisto Ovariano Benigno',
    'Climatério',
    'Climatério | INEP 2024.1',
    'Climatério/Menopausa (Terapia de Reposição Hormonal)',
    'Consulta de Rotina em Adolescente',
    'Descarga papilar',
    'Doença Inflamatória Pélvica',
    'Doença Inflamatória Pélvica | INEP 2022.1',
    'Endometriose 2',
    'Exame Clínico das Mamas - Adaptado | INEP 2023.2',
    'Fibroadenoma Mamário',
    'Herpes Genital',
    'Hiperplasia Endometrial',
    'Incontinência urinária de urgência',
    'Infertilidade Conjugal',
    'Inserção de DIU',
    'Nódulo de mama',
    'Papanicolau | INEP 2023.1',
    'Papanicolau – Resultado de exame (ASC-H)',
    'Planejamento Familiar | INEP 2021',
    'Planejamento Familiar – Laqueadura',
    'Rastreio de Câncer de Mama',
    'Retirada de DIU',
    'Sangramento Uterino Anormal (SUA)',
    'Sangramento Uterino Anormal | INEP 2020',
    'Sífilis Primária | INEP 2022.2',
    'Sífilis Secundária',
    'Síndrome dos Ovários Policísticos – SOP',
    'Tricomoníase Vaginal',
    'Vaginose Bacteriana',
    'Úlcera Genital – Cancro Mole',
    'Úlcera Genital – Donovanose'
  ];

  // Lista explícita de títulos de GO-Obstetrícia (42 itens exatos)
  const obstetriciaList = [
    'Aborto Inevitável',
    'Aborto Retido',
    'Ameaça de Aborto | INEP 2021',
    'Assistência ao Trabalho de Parto',
    'Ausculta Fetal com Pinard',
    'Candidíase na Gestação',
    'Cardiotocografia',
    'Cervicite na Gestação',
    'Cistite na Gestante – Complicada',
    'Colestase Gravídica',
    'Controle Pré-Natal De Baixo Risco',
    'Corioamnionite',
    'Desprendimento Prematuro de Placenta | INEP 2022.1',
    'Diabetes Gestacional',
    'Diabetes Gestacional | INEP 2023.1',
    'Distocia De Ombro',
    'Doença Hemolítica Perinatal',
    'Doença Trofoblástica Gestacional',
    'Eclampsia',
    'Exame Físico Obstétrico | INEP 2023.2',
    'Gestação Múltipla',
    'Gestação Na Adolescência',
    'Hipertensão Gestacional',
    'Lipotimia | INEP 2020',
    'Medicina Legal em Obstetrícia | INEP 2022.2',
    'Parto Pélvico',
    'Partograma',
    'Pielonefrite Gestacional',
    'Placenta Prévia',
    'Placenta Prévia | INEP 2024.2',
    'Pré Eclampsia com sinais de gravidade',
    'Psicose Pós Parto',
    'Rotura Prematura Das Membranas Ovulares (RPM)',
    'Rubéola',
    'Sindrome HELLP',
    'Sífilis Gestacional',
    'Síndrome HELLP | INEP 2024.1',
    'Toxoplasmose Gestacional',
    'Trabalho De Parto Prematuro',
    'Tricomoníase na Gestação',
    'Vaginose Bacteriana na Gestação – Gardnerella',
    'Óbito Fetal'
  ];

  // Função para verificar se é Ginecologia
  const isGinecologia = (title: string): boolean => {
    return ginecologiaList.includes(title);
  };

  // Função para verificar se é Obstetrícia
  const isObstetricia = (title: string): boolean => {
    return obstetriciaList.includes(title);
  };

  const filteredChecklists = useMemo(() => {
    return checklistsData
      .filter((item) => {
        // Filter by area
        let areaMatch = selectedArea === "all";
        if (selectedArea === "GO") {
          areaMatch = item.areaCode === "GO";
        } else if (selectedArea === "GO-Ginecologia") {
          areaMatch = item.areaCode === "GO" && isGinecologia(item.title);
        } else if (selectedArea === "GO-Obstetrícia") {
          areaMatch = item.areaCode === "GO" && isObstetricia(item.title);
        } else if (selectedArea !== "all") {
          areaMatch = item.areaCode === selectedArea;
        }

        // Filter by INEP edition
        let inepMatch = true;
        if (selectedInep === "all") {
          inepMatch = true; // Todos os Checklists
        } else if (selectedInep === "inep-only") {
          inepMatch = item.inepEdition !== null; // Checklists do INEP
        } else {
          inepMatch = item.inepEdition === selectedInep; // Edição específica
        }

        return areaMatch && inepMatch;
      })
      .sort((a, b) => {
        // Ordenar por área: CM → CR → GO → PE → PR
        const orderA = AREA_ORDER[a.areaCode];
        const orderB = AREA_ORDER[b.areaCode];
        if (orderA !== orderB) return orderA - orderB;
        // Dentro da mesma área, ordenar por título
        return a.title.localeCompare(b.title, 'pt-BR');
      });
  }, [selectedArea, selectedInep]);

  const navigate = useNavigate();

  const handleStart = (id: string) => {
    onOpenChange(false);
    navigate(`/checklists/execucao/${id}`);
  };

  const handleCreateSession = async (id: string, title: string, areaCode: AreaCode) => {
    try {
      const content = await getChecklistContentByIdAsync(id);
      setSelectedChecklist({
        id,
        title,
        areaCode,
        evaluationItems: content.evaluationItems,
      });
      setSessionModalOpen(true);
    } catch (error) {
      console.error('Erro ao carregar checklist:', error);
    }
  };

  const handleSessionModalClose = (isOpen: boolean) => {
    setSessionModalOpen(isOpen);
    if (!isOpen) {
      setSelectedChecklist(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-4 max-w-none w-auto h-auto max-h-none bg-background border-border p-0 gap-0 overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <List className="w-5 h-5 text-foreground" />
              <DialogTitle className="text-lg font-semibold text-foreground">
                Todos os Checklists
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-lg hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-border/30 flex-shrink-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* User info */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm">{profile.nome}</span>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 max-w-2xl">
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger 
                  className={`w-full sm:w-[240px] bg-secondary text-foreground transition-colors ${
                    selectedArea !== "all" 
                      ? "border-2 border-primary" 
                      : "border border-border/50"
                  }`}
                >
                  <SelectValue placeholder="Todas as Áreas" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {AREA_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-foreground">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedInep} onValueChange={setSelectedInep}>
                <SelectTrigger 
                  className={`w-full sm:w-[240px] bg-secondary text-foreground transition-colors ${
                    selectedInep !== "all" 
                      ? "border-2 border-primary" 
                      : "border border-border/50"
                  }`}
                >
                  <SelectValue placeholder="Todos os Checklists" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {INEP_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-foreground">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              {filteredChecklists.length} Checklists
            </span>
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6">
            <table className="w-full">
              <thead className="sticky top-0 bg-background z-10">
                <tr>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">
                    CHECKLIST
                  </th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 w-24">
                    MÉDIA
                  </th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 w-24">
                    TENTATIVAS
                  </th>
                  <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4 w-48">
                    AÇÕES
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredChecklists.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-t border-border/20 hover:bg-secondary/30 transition-colors ${
                      index % 2 === 0 ? "bg-transparent" : "bg-secondary/10"
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <AreaBadge areaCode={item.areaCode} />
                        <span className="text-sm text-foreground">{item.title}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-sm text-muted-foreground">
                        {(() => {
                          const userAvg = getAverage(item.id);
                          const attempts = getAttempts(item.id);
                          if (attempts === 0) return "-";
                          return userAvg.toFixed(userAvg % 1 === 0 ? 0 : 2);
                        })()}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-sm text-muted-foreground">
                        {(() => {
                          const attempts = getAttempts(item.id);
                          if (attempts === 0) return "-";
                          return attempts;
                        })()}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStart(item.id)}
                          className="text-xs px-3 py-1 h-7 bg-primary hover:bg-primary/90 text-white"
                        >
                          Treinar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCreateSession(item.id, item.title, item.areaCode)}
                          className="text-xs px-3 py-1 h-7 border-green-500/50 text-green-400 hover:bg-green-500/10"
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Avaliar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/30 flex justify-end flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-secondary/50 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>

      {/* Modal de criação de sessão */}
      {selectedChecklist && (
        <CreateSessionModal
          open={sessionModalOpen}
          onOpenChange={handleSessionModalClose}
          checklistId={selectedChecklist.id}
          checklistTitle={selectedChecklist.title}
          areaCode={selectedChecklist.areaCode}
          evaluationItems={selectedChecklist.evaluationItems}
        />
      )}
    </Dialog>
  );
}
