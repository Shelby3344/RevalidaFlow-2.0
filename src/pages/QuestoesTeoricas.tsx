import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useQuestoes } from '@/hooks/useQuestoes';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronLeft, ChevronRight, 
  CheckCircle2, XCircle, Calendar,
  Building2, ChevronDown, ChevronUp,
  Loader2, Stethoscope, ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuestoesTeoricas() {
  const {
    currentQuestao,
    currentIndex,
    loading,
    filters,
    filterOptions,
    progress,
    showAnswer,
    selectedAnswer,
    stats,
    filteredQuestoes,
    goToNext,
    goToPrevious,
    answerQuestion,
    revealAnswer,
    toggleFilter,
    clearFilters,
    setShowAnswer
  } = useQuestoes();

  const [expandedSections, setExpandedSections] = useState({
    especialidades: true,
    instituicoes: false,
    anos: false
  });
  const [showQuestao, setShowQuestao] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentProgress = currentQuestao ? progress[currentQuestao.id] : null;

  const startStudy = () => {
    if (stats.filtered > 0) {
      setShowQuestao(true);
      setShowAnswer(false);
    }
  };

  const backToFilters = () => {
    setShowQuestao(false);
    setShowAnswer(false);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando questões...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // View de Questão
  if (showQuestao && currentQuestao) {
    return (
      <AppLayout>
        <div className="flex-1 p-4 md:p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={backToFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos filtros
            </Button>
            <div className="text-sm text-muted-foreground">
              Questão {currentIndex + 1} de {stats.filtered}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">{currentQuestao.instituicao}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{currentQuestao.ano}</span>
                </div>
              </div>
              {currentQuestao.especialidade && (
                <div className="mt-2 flex items-center gap-2 text-cyan-100">
                  <Stethoscope className="w-4 h-4" />
                  <span className="text-sm">{currentQuestao.especialidade}</span>
                </div>
              )}
            </div>

            {/* Enunciado */}
            <div className="p-6 border-b border-border">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {currentQuestao.enunciado}
              </p>
            </div>

            {/* Alternativas */}
            <div className="p-6 space-y-3">
              {currentQuestao.alternativas.map((alt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedAnswer === alt;
                const isCorrect = currentQuestao.gabarito && 
                  letter === currentQuestao.gabarito.charAt(0).toUpperCase();
                const showResult = showAnswer || currentProgress?.answered;
                
                return (
                  <button
                    key={idx}
                    onClick={() => !showResult && answerQuestion(alt)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border-2 transition-all",
                      "hover:border-cyan-500/50 hover:bg-cyan-500/5",
                      !showResult && isSelected && "border-cyan-500 bg-cyan-500/10",
                      !showResult && !isSelected && "border-border bg-card",
                      showResult && isCorrect && "border-green-500 bg-green-500/10",
                      showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                      showResult && !isSelected && !isCorrect && "border-border bg-card opacity-60"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        !showResult && isSelected && "bg-cyan-500 text-white",
                        !showResult && !isSelected && "bg-muted text-muted-foreground",
                        showResult && isCorrect && "bg-green-500 text-white",
                        showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                        showResult && !isSelected && !isCorrect && "bg-muted text-muted-foreground"
                      )}>
                        {showResult && isCorrect ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : showResult && isSelected && !isCorrect ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          letter
                        )}
                      </span>
                      <span className="flex-1 pt-1">{alt.replace(/^[A-D]\)\s*/, '')}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explicação */}
            {(showAnswer || currentProgress?.answered) && currentQuestao.explicacao && (
              <div className="p-6 border-t border-border bg-gradient-to-r from-green-500/5 to-emerald-500/5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-500 mb-2">Explicação</h4>
                    <p className="text-foreground/90 leading-relaxed">
                      {currentQuestao.explicacao}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sem gabarito disponível */}
            {(showAnswer || currentProgress?.answered) && !currentQuestao.gabarito && (
              <div className="p-6 border-t border-border bg-amber-500/5">
                <div className="flex items-center gap-3 text-amber-500">
                  <Loader2 className="w-5 h-5" />
                  <span className="text-sm">Gabarito ainda não disponível para esta questão</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              <div className="flex gap-3">
                {!showAnswer && !currentProgress?.answered && selectedAnswer && (
                  <Button
                    onClick={revealAnswer}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    Verificar
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={goToNext}
                disabled={currentIndex >= stats.filtered - 1}
              >
                Próxima
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  // View de Filtros
  return (
    <AppLayout>
      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Questões Teóricas
            </h1>
            <p className="text-muted-foreground">
              {stats.total.toLocaleString()} questões disponíveis para estudo
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-foreground">{stats.filtered.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Questões filtradas</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-cyan-500">{stats.answered}</div>
              <div className="text-sm text-muted-foreground">Respondidas</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-green-500">{stats.correct}</div>
              <div className="text-sm text-muted-foreground">Acertos</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-500">{stats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Aproveitamento</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
            {/* Especialidades */}
            <FilterSection
              title="Especialidades"
              icon={<Stethoscope className="w-5 h-5" />}
              expanded={expandedSections.especialidades}
              onToggle={() => toggleSection('especialidades')}
              options={filterOptions.especialidades}
              selected={filters.especialidades}
              onToggleOption={(value) => toggleFilter('especialidades', value)}
            />

            {/* Instituições */}
            <FilterSection
              title="Instituições"
              icon={<Building2 className="w-5 h-5" />}
              expanded={expandedSections.instituicoes}
              onToggle={() => toggleSection('instituicoes')}
              options={filterOptions.instituicoes}
              selected={filters.instituicoes}
              onToggleOption={(value) => toggleFilter('instituicoes', value)}
            />

            {/* Anos */}
            <FilterSection
              title="Anos"
              icon={<Calendar className="w-5 h-5" />}
              expanded={expandedSections.anos}
              onToggle={() => toggleSection('anos')}
              options={filterOptions.anos}
              selected={filters.anos}
              onToggleOption={(value) => toggleFilter('anos', value)}
              isLast
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={filters.especialidades.length === 0 && 
                       filters.instituicoes.length === 0 && 
                       filters.anos.length === 0}
            >
              Limpar filtros
            </Button>
            <Button
              onClick={startStudy}
              disabled={stats.filtered === 0}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              Iniciar estudo ({stats.filtered.toLocaleString()} questões)
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}


// Filter Section Component
interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  options: { value: string; label: string; count: number }[];
  selected: string[];
  onToggleOption: (value: string) => void;
  isLast?: boolean;
}

function FilterSection({
  title,
  icon,
  expanded,
  onToggle,
  options,
  selected,
  onToggleOption,
  isLast
}: FilterSectionProps) {
  return (
    <div className={cn(!isLast && "border-b border-border")}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-cyan-500">{icon}</span>
          <span className="font-medium text-foreground">{title}</span>
          {selected.length > 0 && (
            <span className="bg-cyan-500/20 text-cyan-500 text-xs px-2 py-0.5 rounded-full">
              {selected.length} selecionado{selected.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      
      {expanded && (
        <ScrollArea className="max-h-64">
          <div className="px-4 pb-4 space-y-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => onToggleOption(option.value)}
                  className="border-muted-foreground data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <span className="flex-1 text-sm text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {option.count}
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
