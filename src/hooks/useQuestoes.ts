import { useState, useEffect, useMemo, useCallback } from 'react';
import { Questao, QuestaoFilters, QuestaoProgress, FilterOption } from '@/types/questoes';

const STORAGE_KEY = 'prorev_questoes_progress';

export function useQuestoes() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState<QuestaoFilters>({
    especialidades: [],
    instituicoes: [],
    anos: [],
    searchTerm: ''
  });
  const [progress, setProgress] = useState<Record<number, QuestaoProgress>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Carregar questões do JSON
  useEffect(() => {
    const loadQuestoes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/questoes-json/questoes_revalida.json');
        if (!response.ok) throw new Error('Erro ao carregar questões');
        const data = await response.json();
        setQuestoes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    loadQuestoes();
  }, []);

  // Carregar progresso do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar progresso:', e);
      }
    }
  }, []);

  // Salvar progresso no localStorage
  const saveProgress = useCallback((newProgress: Record<number, QuestaoProgress>) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  }, []);


  // Extrair opções de filtro únicas
  const filterOptions = useMemo(() => {
    const especialidadesMap = new Map<string, number>();
    const instituicoesMap = new Map<string, number>();
    const anosMap = new Map<string, number>();

    questoes.forEach(q => {
      if (q.especialidade) {
        especialidadesMap.set(q.especialidade, (especialidadesMap.get(q.especialidade) || 0) + 1);
      }
      if (q.instituicao) {
        instituicoesMap.set(q.instituicao, (instituicoesMap.get(q.instituicao) || 0) + 1);
      }
      if (q.ano) {
        anosMap.set(q.ano, (anosMap.get(q.ano) || 0) + 1);
      }
    });

    const toOptions = (map: Map<string, number>): FilterOption[] => 
      Array.from(map.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count);

    return {
      especialidades: toOptions(especialidadesMap),
      instituicoes: toOptions(instituicoesMap),
      anos: Array.from(anosMap.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.value.localeCompare(a.value)) // Anos em ordem decrescente
    };
  }, [questoes]);

  // Questões filtradas
  const filteredQuestoes = useMemo(() => {
    return questoes.filter(q => {
      if (filters.especialidades.length > 0 && !filters.especialidades.includes(q.especialidade)) {
        return false;
      }
      if (filters.instituicoes.length > 0 && !filters.instituicoes.includes(q.instituicao)) {
        return false;
      }
      if (filters.anos.length > 0 && !filters.anos.includes(q.ano)) {
        return false;
      }
      if (filters.searchTerm) {
        const search = filters.searchTerm.toLowerCase();
        return q.enunciado.toLowerCase().includes(search) ||
               q.alternativas.some(a => a.toLowerCase().includes(search));
      }
      return true;
    });
  }, [questoes, filters]);

  // Questão atual
  const currentQuestao = filteredQuestoes[currentIndex] || null;

  // Navegação
  const goToNext = useCallback(() => {
    if (currentIndex < filteredQuestoes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  }, [currentIndex, filteredQuestoes.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  }, [currentIndex]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < filteredQuestoes.length) {
      setCurrentIndex(index);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  }, [filteredQuestoes.length]);


  // Responder questão
  const answerQuestion = useCallback((answer: string) => {
    if (!currentQuestao) return;
    
    setSelectedAnswer(answer);
    
    const isCorrect = currentQuestao.gabarito 
      ? answer.charAt(0).toUpperCase() === currentQuestao.gabarito.charAt(0).toUpperCase()
      : null;

    const newProgress = {
      ...progress,
      [currentQuestao.id]: {
        questaoId: currentQuestao.id,
        answered: true,
        selectedAnswer: answer,
        isCorrect,
        answeredAt: new Date().toISOString()
      }
    };
    saveProgress(newProgress);
  }, [currentQuestao, progress, saveProgress]);

  // Revelar resposta
  const revealAnswer = useCallback(() => {
    setShowAnswer(true);
  }, []);

  // Atualizar filtros
  const updateFilters = useCallback((newFilters: Partial<QuestaoFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentIndex(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  }, []);

  // Toggle filtro individual
  const toggleFilter = useCallback((type: keyof Omit<QuestaoFilters, 'searchTerm'>, value: string) => {
    setFilters(prev => {
      const current = prev[type] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
    setCurrentIndex(0);
  }, []);

  // Limpar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      especialidades: [],
      instituicoes: [],
      anos: [],
      searchTerm: ''
    });
    setCurrentIndex(0);
  }, []);

  // Estatísticas
  const stats = useMemo(() => {
    const answered = Object.values(progress).filter(p => p.answered).length;
    const correct = Object.values(progress).filter(p => p.isCorrect === true).length;
    const incorrect = Object.values(progress).filter(p => p.isCorrect === false).length;
    
    return {
      total: questoes.length,
      filtered: filteredQuestoes.length,
      answered,
      correct,
      incorrect,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0
    };
  }, [questoes.length, filteredQuestoes.length, progress]);

  // Reset progresso
  const resetProgress = useCallback(() => {
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    questoes,
    filteredQuestoes,
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
    goToNext,
    goToPrevious,
    goToIndex,
    answerQuestion,
    revealAnswer,
    updateFilters,
    toggleFilter,
    clearFilters,
    resetProgress,
    setShowAnswer
  };
}
