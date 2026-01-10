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
  Loader2, Stethoscope, ArrowLeft,
  Lightbulb, BookOpen
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
    const showResult = showAnswer || currentProgress?.answered;
    
    return (
      <AppLayout>
        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={backToFilters}
                className="text-muted-foreground hover:text-foreground gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar aos filtros
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-full border border-border">
                <BookOpen className="w-4 h-4 text-cyan-500" />
                <span>Questão <span className="text-foreground font-semibold">{currentIndex + 1}</span> de {stats.filtered}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-wider">Instituição</p>
                      <p className="text-white font-medium text-sm md:text-base">{currentQuestao.instituicao}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {currentQuestao.especialidade && (
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                        <Stethoscope className="w-4 h-4 text-cyan-200" />
                        <span className="text-white text-sm">{currentQuestao.especialidade}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                      <Calendar className="w-4 h-4 text-cyan-200" />
                      <span className="text-white text-sm font-medium">{currentQuestao.ano}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enunciado */}
              <div className="p-6 md:p-8 border-b border-border bg-gradient-to-b from-muted/30 to-transparent">
                <p className="text-foreground leading-relaxed text-base md:text-lg whitespace-pre-wrap text-justify">
                  {currentQuestao.enunciado}
                </p>
              </div>

              {/* Alternativas */}
              <div className="p-6 md:p-8 space-y-4">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Selecione a alternativa correta:</p>
                {currentQuestao.alternativas.map((alt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = selectedAnswer === alt;
                  const isCorrect = currentQuestao.gabarito && 
                    letter === currentQuestao.gabarito.charAt(0).toUpperCase();
                  
                  // Extrair texto sem a letra
                  const altText = alt.replace(/^[A-E]\)\s*/, '');
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => !showResult && answerQuestion(alt)}
                      disabled={!!showResult}
                      className={cn(
                        "w-full text-left p-5 rounded-xl border-2 transition-all duration-300",
                        "hover:shadow-md",
                        !showResult && !isSelected && "border-border bg-card hover:border-cyan-500/50 hover:bg-cyan-500/5",
                        !showResult && isSelected && "border-cyan-500 bg-cyan-500/10 shadow-md shadow-cyan-500/10",
                        showResult && isCorrect && "border-green-500 bg-green-500/10",
                        showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                        showResult && !isSelected && !isCorrect && "border-border/50 bg-card/50 opacity-50"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <span className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all",
                          !showResult && !isSelected && "bg-muted text-muted-foreground",
                          !showResult && isSelected && "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30",
                          showResult && isCorrect && "bg-green-500 text-white shadow-lg shadow-green-500/30",
                          showResult && isSelected && !isCorrect && "bg-red-500 text-white shadow-lg shadow-red-500/30",
                          showResult && !isSelected && !isCorrect && "bg-muted/50 text-muted-foreground/50"
                        )}>
                          {showResult && isCorrect ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : showResult && isSelected && !isCorrect ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            letter
                          )}
                        </span>
                        <span className={cn(
                          "flex-1 pt-2 text-sm md:text-base leading-relaxed text-justify",
                          showResult && !isCorrect && !isSelected && "text-muted-foreground"
                        )}>
                          {altText}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explicação */}
              {showResult && currentQuestao.explicacao && (
                <div className="mx-6 md:mx-8 mb-6 md:mb-8 p-6 rounded-xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-500 mb-2 text-sm uppercase tracking-wider">Explicação</h4>
                      <p className="text-foreground leading-relaxed text-justify">
                        {currentQuestao.explicacao}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sem gabarito */}
              {showResult && !currentQuestao.gabarito && (
                <div className="mx-6 md:mx-8 mb-6 md:mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Gabarito ainda não disponível para esta questão</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-6 md:p-8 border-t border-border bg-muted/30 flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </Button>

                <div className="flex gap-3">
                  {!showAnswer && !currentProgress?.answered && selectedAnswer && (
                    <Button
                      onClick={revealAnswer}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Verificar Resposta
                    </Button>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={goToNext}
                  disabled={currentIndex >= stats.filtered - 1}
                  className="gap-2"
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Questões Teóricas
                </h1>
                <p className="text-muted-foreground">
                  Banco com {stats.total.toLocaleString()} questões para estudo
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{stats.filtered.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Questões filtradas</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-500">{stats.answered}</div>
              <div className="text-sm text-muted-foreground">Respondidas</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <div className="text-2xl font-bold text-green-500">{stats.correct}</div>
              <div className="text-sm text-muted-foreground">Acertos</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-500">{stats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">Aproveitamento</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8 shadow-sm">
            <div className="p-4 border-b border-border bg-muted/30">
              <h2 className="font-semibold text-foreground">Filtros de Estudo</h2>
              <p className="text-sm text-muted-foreground">Selecione os filtros para personalizar seu estudo</p>
            </div>
            
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
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={filters.especialidades.length === 0 && 
                       filters.instituicoes.length === 0 && 
                       filters.anos.length === 0}
              className="gap-2"
            >
              <XCircle className="w-4 h-4" />
              Limpar filtros
            </Button>
            <Button
              onClick={startStudy}
              disabled={stats.filtered === 0}
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 gap-2 shadow-lg shadow-cyan-500/20"
            >
              <BookOpen className="w-5 h-5" />
              Iniciar Estudo ({stats.filtered.toLocaleString()} questões)
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
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
            {icon}
          </div>
          <span className="font-medium text-foreground">{title}</span>
          {selected.length > 0 && (
            <span className="bg-cyan-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {selected.length}
            </span>
          )}
        </div>
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
          expanded ? "bg-cyan-500/10 text-cyan-500" : "bg-muted text-muted-foreground"
        )}>
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      
      {expanded && (
        <ScrollArea className="max-h-72">
          <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {options.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
                  selected.includes(option.value) 
                    ? "bg-cyan-500/10 border border-cyan-500/30" 
                    : "bg-muted/30 border border-transparent hover:bg-muted/50"
                )}
              >
                <Checkbox
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => onToggleOption(option.value)}
                  className="border-muted-foreground data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <span className="flex-1 text-sm text-foreground truncate">{option.label}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium">
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
