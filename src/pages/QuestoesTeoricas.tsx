import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useQuestoes } from '@/hooks/useQuestoes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, Search, Filter, X, 
  CheckCircle2, XCircle, Eye, RotateCcw, Calendar,
  Building2, Stethoscope, ChevronDown, ChevronUp,
  BookOpen, Target, TrendingUp, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuestoesTeoricas() {
  const {
    currentQuestao,
    currentIndex,
    loading,
    error,
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
    updateFilters,
    setShowAnswer
  } = useQuestoes();

  const [showFilters, setShowFilters] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    anos: true,
    especialidades: true,
    instituicoes: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentProgress = currentQuestao ? progress[currentQuestao.id] : null;

  if (loading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando questões...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-2">Erro ao carregar questões</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        </div>
      </AppLayout>
    );
  }


  return (
    <AppLayout>
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar de Filtros */}
        <aside className={cn(
          "border-r border-border bg-card/50 transition-all duration-300 flex flex-col",
          showFilters ? "w-80" : "w-0 overflow-hidden"
        )}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar no enunciado..."
                  value={filters.searchTerm}
                  onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                  className="pl-9"
                />
              </div>

              {/* Anos */}
              <FilterSection
                title="Anos"
                icon={<Calendar className="w-4 h-4 text-cyan-400" />}
                expanded={expandedSections.anos}
                onToggle={() => toggleSection('anos')}
                options={filterOptions.anos}
                selected={filters.anos}
                onSelect={(value) => toggleFilter('anos', value)}
                color="cyan"
              />

              {/* Especialidades */}
              <FilterSection
                title="Especialidades"
                icon={<Stethoscope className="w-4 h-4 text-purple-400" />}
                expanded={expandedSections.especialidades}
                onToggle={() => toggleSection('especialidades')}
                options={filterOptions.especialidades}
                selected={filters.especialidades}
                onSelect={(value) => toggleFilter('especialidades', value)}
                color="purple"
              />

              {/* Instituições */}
              <FilterSection
                title="Instituições"
                icon={<Building2 className="w-4 h-4 text-amber-400" />}
                expanded={expandedSections.instituicoes}
                onToggle={() => toggleSection('instituicoes')}
                options={filterOptions.instituicoes}
                selected={filters.instituicoes}
                onSelect={(value) => toggleFilter('instituicoes', value)}
                color="amber"
              />
            </div>
          </ScrollArea>

          {/* Stats no rodapé do filtro */}
          <div className="p-4 border-t border-border bg-secondary/30">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-card rounded-lg p-2">
                <p className="text-2xl font-bold text-primary">{stats.filtered}</p>
                <p className="text-[10px] text-muted-foreground">Questões</p>
              </div>
              <div className="bg-card rounded-lg p-2">
                <p className="text-2xl font-bold text-green-500">{stats.accuracy}%</p>
                <p className="text-[10px] text-muted-foreground">Acertos</p>
              </div>
            </div>
          </div>
        </aside>


        {/* Área Principal */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="p-4 border-b border-border flex items-center justify-between bg-card/30">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h1 className="text-lg font-semibold">Questões Teóricas</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Progresso */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  {currentIndex + 1} de {stats.filtered}
                </span>
                <Progress 
                  value={((currentIndex + 1) / stats.filtered) * 100} 
                  className="w-32 h-2"
                />
              </div>

              {/* Navegação */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  disabled={currentIndex >= stats.filtered - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Questão */}
          <ScrollArea className="flex-1">
            {currentQuestao ? (
              <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    {currentQuestao.especialidade}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                    {currentQuestao.ano}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs">
                    {currentQuestao.instituicao}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    ID: {currentQuestao.id}
                  </span>
                </div>

                {/* Enunciado */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {currentQuestao.enunciado}
                  </p>
                </div>

                {/* Alternativas */}
                <div className="space-y-3">
                  {currentQuestao.alternativas.map((alt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isSelected = selectedAnswer === alt || currentProgress?.selectedAnswer === alt;
                    const isCorrect = currentQuestao.gabarito && 
                      letter === currentQuestao.gabarito.charAt(0).toUpperCase();
                    const showResult = showAnswer || currentProgress?.answered;

                    return (
                      <button
                        key={idx}
                        onClick={() => !showResult && answerQuestion(alt)}
                        disabled={!!showResult}
                        className={cn(
                          "w-full text-left p-4 rounded-xl border-2 transition-all",
                          "hover:border-primary/50 hover:bg-primary/5",
                          !showResult && "cursor-pointer",
                          showResult && "cursor-default",
                          isSelected && !showResult && "border-primary bg-primary/10",
                          showResult && isCorrect && "border-green-500 bg-green-500/10",
                          showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                          !isSelected && !showResult && "border-border"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span className={cn(
                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                            showResult && isCorrect && "bg-green-500 text-white",
                            showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                            !showResult && isSelected && "bg-primary text-primary-foreground",
                            !showResult && !isSelected && "bg-secondary text-muted-foreground"
                          )}>
                            {showResult && isCorrect ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : showResult && isSelected && !isCorrect ? (
                              <XCircle className="w-5 h-5" />
                            ) : (
                              letter
                            )}
                          </span>
                          <span className="text-foreground pt-1">{alt.replace(/^[A-E]\)\s*/, '')}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>


                {/* Botões de ação */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      revealAnswer();
                    }}
                    disabled={showAnswer || currentProgress?.answered}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Gabarito
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={goToPrevious}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Anterior
                    </Button>
                    <Button
                      onClick={goToNext}
                      disabled={currentIndex >= stats.filtered - 1}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Próxima
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Gabarito/Comentário */}
                {(showAnswer || currentProgress?.answered) && currentQuestao.gabarito && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold text-green-500">Gabarito</h3>
                    </div>
                    <p className="text-foreground">
                      Alternativa correta: <span className="font-bold text-green-500">{currentQuestao.gabarito}</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">Nenhuma questão encontrada</h2>
                  <p className="text-muted-foreground mb-4">
                    Ajuste os filtros ou carregue o arquivo de questões
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </main>
      </div>

      <footer className="text-center text-sm text-muted-foreground py-3 border-t border-border">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}


// Componente de seção de filtro
interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  options: { value: string; label: string; count: number }[];
  selected: string[];
  onSelect: (value: string) => void;
  color: 'cyan' | 'purple' | 'amber';
}

function FilterSection({ 
  title, icon, expanded, onToggle, options, selected, onSelect, color 
}: FilterSectionProps) {
  const [search, setSearch] = useState('');
  
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const colorClasses = {
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5'
  };

  const badgeColors = {
    cyan: 'bg-cyan-500/20 text-cyan-400',
    purple: 'bg-purple-500/20 text-purple-400',
    amber: 'bg-amber-500/20 text-amber-400'
  };

  return (
    <div className={cn("rounded-xl border overflow-hidden", colorClasses[color])}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-foreground">{title}</span>
          {selected.length > 0 && (
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", badgeColors[color])}>
              {selected.length}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="p-3 pt-0 space-y-2">
          {options.length > 5 && (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <Input
                placeholder={`Pesquisar ${title.toLowerCase()}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-7 text-xs"
              />
            </div>
          )}

          <div className="space-y-1 max-h-48 overflow-y-auto">
            {filteredOptions.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
                  "hover:bg-secondary/50",
                  selected.includes(opt.value) && "bg-secondary"
                )}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selected.includes(opt.value)}
                    onCheckedChange={() => onSelect(opt.value)}
                  />
                  <span className="text-sm text-foreground truncate max-w-[180px]">
                    {opt.label}
                  </span>
                </div>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  badgeColors[color]
                )}>
                  {opt.count}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
