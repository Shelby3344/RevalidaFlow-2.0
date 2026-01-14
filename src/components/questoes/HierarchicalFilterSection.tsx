import { useState } from 'react';
import { ChevronDown, ChevronRight, Stethoscope } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { HierarchicalFilter } from '@/types/questoes';

interface HierarchicalFilterSectionProps {
  hierarchicalFilters: HierarchicalFilter[];
  selectedEspecialidades: string[];
  selectedTemas: string[];
  selectedSubtemas: string[];
  onToggleEspecialidade: (value: string) => void;
  onToggleTema: (value: string) => void;
  onToggleSubtema: (value: string) => void;
}

export function HierarchicalFilterSection({
  hierarchicalFilters,
  selectedEspecialidades,
  selectedTemas,
  selectedSubtemas,
  onToggleEspecialidade,
  onToggleTema,
  onToggleSubtema,
}: HierarchicalFilterSectionProps) {
  const [expandedEspecialidades, setExpandedEspecialidades] = useState<Set<string>>(new Set());
  const [expandedTemas, setExpandedTemas] = useState<Set<string>>(new Set());

  const toggleEspecialidadeExpand = (esp: string) => {
    setExpandedEspecialidades(prev => {
      const next = new Set(prev);
      if (next.has(esp)) {
        next.delete(esp);
      } else {
        next.add(esp);
      }
      return next;
    });
  };

  const toggleTemaExpand = (tema: string) => {
    setExpandedTemas(prev => {
      const next = new Set(prev);
      if (next.has(tema)) {
        next.delete(tema);
      } else {
        next.add(tema);
      }
      return next;
    });
  };

  return (
    <div className="border-b border-border">
      <div className="p-4 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="font-medium text-foreground">Especialidades, Temas e Focos</span>
          {(selectedEspecialidades.length > 0 || selectedTemas.length > 0 || selectedSubtemas.length > 0) && (
            <span className="bg-cyan-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {selectedEspecialidades.length + selectedTemas.length + selectedSubtemas.length}
            </span>
          )}
        </div>
      </div>

      <ScrollArea className="max-h-[400px]">
        <div className="p-2">
          {hierarchicalFilters.map((esp) => (
            <div key={esp.especialidade} className="mb-1">
              {/* Especialidade */}
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <button
                  onClick={() => toggleEspecialidadeExpand(esp.especialidade)}
                  className="p-1 hover:bg-muted rounded"
                >
                  {expandedEspecialidades.has(esp.especialidade) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                <Checkbox
                  checked={selectedEspecialidades.includes(esp.especialidade)}
                  onCheckedChange={() => onToggleEspecialidade(esp.especialidade)}
                  className="border-muted-foreground data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <span className="flex-1 text-sm font-medium text-foreground">
                  {esp.especialidade}
                </span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium">
                  {esp.count}
                </span>
              </div>

              {/* Temas */}
              {expandedEspecialidades.has(esp.especialidade) && esp.temas.length > 0 && (
                <div className="ml-6 border-l-2 border-border/50 pl-2">
                  {esp.temas.map((tema) => (
                    <div key={tema.tema} className="mb-1">
                      {/* Tema */}
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                        <button
                          onClick={() => toggleTemaExpand(tema.tema)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          {tema.subtemas.length > 0 ? (
                            expandedTemas.has(tema.tema) ? (
                              <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-muted-foreground" />
                            )
                          ) : (
                            <div className="w-3 h-3" />
                          )}
                        </button>
                        <Checkbox
                          checked={selectedTemas.includes(tema.tema)}
                          onCheckedChange={() => onToggleTema(tema.tema)}
                          className="border-muted-foreground data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                        <span className="flex-1 text-sm text-foreground">
                          {tema.tema}
                        </span>
                        <span className="text-xs text-muted-foreground bg-purple-500/10 px-2 py-0.5 rounded font-medium">
                          {tema.count}
                        </span>
                      </div>

                      {/* Subtemas */}
                      {expandedTemas.has(tema.tema) && tema.subtemas.length > 0 && (
                        <div className="ml-6 border-l border-border/30 pl-2">
                          {tema.subtemas.map((subtema) => (
                            <div
                              key={subtema.subtema}
                              className="flex items-center gap-2 p-1.5 rounded hover:bg-muted/20 transition-colors"
                            >
                              <div className="w-4" />
                              <Checkbox
                                checked={selectedSubtemas.includes(subtema.subtema)}
                                onCheckedChange={() => onToggleSubtema(subtema.subtema)}
                                className="border-muted-foreground data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                              />
                              <span className="flex-1 text-xs text-muted-foreground">
                                {subtema.subtema}
                              </span>
                              <span className="text-xs text-muted-foreground/70 px-1.5 py-0.5 rounded font-medium">
                                {subtema.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
