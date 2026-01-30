import { useState, useEffect, useMemo, useCallback } from 'react';
import { Questao, QuestaoFilters, QuestaoProgress, FilterOption, HierarchicalFilter } from '@/types/questoes';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface AdvancedFilters {
  hideCorrect: boolean;
  hideReviewed: boolean;
  onlyLast5Years: boolean;
}

export function useQuestoes() {
  const { user } = useAuth();
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState<QuestaoFilters>({
    especialidades: [],
    temas: [],
    subtemas: [],
    instituicoes: [],
    anos: [],
    searchTerm: ''
  });
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    hideCorrect: false,
    hideReviewed: false,
    onlyLast5Years: false
  });
  const [progress, setProgress] = useState<Record<number, QuestaoProgress>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [savingProgress, setSavingProgress] = useState(false);

  // Carregar questões do JSON
  useEffect(() => {
    const loadQuestoes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/questoes-json/questoes_revalida_classified.json');
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

  // Carregar progresso e configurações do Supabase
  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        // Carregar progresso
        const { data: progressData, error: progressError } = await supabase
          .from('questoes_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        if (progressData) {
          const progressMap: Record<number, QuestaoProgress> = {};
          progressData.forEach((p: any) => {
            progressMap[p.questao_id] = {
              questaoId: p.questao_id,
              answered: true,
              selectedAnswer: p.selected_answer,
              isCorrect: p.is_correct,
              answeredAt: p.answered_at
            };
          });
          setProgress(progressMap);
        }

        // Carregar configurações avançadas
        const { data: settingsData, error: settingsError } = await supabase
          .from('questoes_user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (settingsData && !settingsError) {
          setAdvancedFilters({
            hideCorrect: settingsData.hide_correct || false,
            hideReviewed: settingsData.hide_reviewed || false,
            onlyLast5Years: settingsData.only_last_5_years || false
          });
        }
      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    };

    loadUserData();
  }, [user]);

  // Salvar progresso no Supabase
  const saveProgress = useCallback(async (questaoId: number, answer: string, isCorrect: boolean | null) => {
    if (!user) return;

    setSavingProgress(true);
    try {
      const { error } = await supabase
        .from('questoes_progress')
        .upsert({
          user_id: user.id,
          questao_id: questaoId,
          selected_answer: answer,
          is_correct: isCorrect,
          answered_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,questao_id'
        });

      if (error) throw error;

      // Atualizar estado local
      setProgress(prev => ({
        ...prev,
        [questaoId]: {
          questaoId,
          answered: true,
          selectedAnswer: answer,
          isCorrect,
          answeredAt: new Date().toISOString()
        }
      }));
    } catch (err) {
      console.error('Erro ao salvar progresso:', err);
    } finally {
      setSavingProgress(false);
    }
  }, [user]);

  // Salvar configurações avançadas no Supabase
  const saveAdvancedFilters = useCallback(async (newFilters: AdvancedFilters) => {
    if (!user) return;

    setAdvancedFilters(newFilters);

    try {
      const { error } = await supabase
        .from('questoes_user_settings')
        .upsert({
          user_id: user.id,
          hide_correct: newFilters.hideCorrect,
          hide_reviewed: newFilters.hideReviewed,
          only_last_5_years: newFilters.onlyLast5Years
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    } catch (err) {
      console.error('Erro ao salvar configurações:', err);
    }
  }, [user]);

  // Toggle filtro avançado
  const toggleAdvancedFilter = useCallback((filter: keyof AdvancedFilters) => {
    const newFilters = { ...advancedFilters, [filter]: !advancedFilters[filter] };
    saveAdvancedFilters(newFilters);
    setCurrentIndex(0);
  }, [advancedFilters, saveAdvancedFilters]);

  // Gerar chave única para os filtros atuais
  const getFilterKey = useCallback(() => {
    return JSON.stringify({
      esp: filters.especialidades.sort(),
      inst: filters.instituicoes.sort(),
      anos: filters.anos.sort(),
      adv: advancedFilters
    });
  }, [filters, advancedFilters]);

  // Salvar último índice no Supabase
  const saveLastIndex = useCallback(async (index: number, filterKey: string) => {
    if (!user) return;

    try {
      await supabase
        .from('questoes_last_index')
        .upsert({
          user_id: user.id,
          filter_key: filterKey,
          last_index: index
        }, {
          onConflict: 'user_id,filter_key'
        });
    } catch (err) {
      console.error('Erro ao salvar último índice:', err);
    }
  }, [user]);

  // Carregar último índice do Supabase
  const loadLastIndex = useCallback(async (filterKey: string): Promise<number> => {
    if (!user) return 0;

    try {
      const { data, error } = await supabase
        .from('questoes_last_index')
        .select('last_index')
        .eq('user_id', user.id)
        .eq('filter_key', filterKey)
        .single();

      if (error || !data) return 0;
      return data.last_index || 0;
    } catch (err) {
      return 0;
    }
  }, [user]);

  // Extrair opções de filtro únicas
  const filterOptions = useMemo(() => {
    const especialidadesMap = new Map<string, number>();
    const temasMap = new Map<string, number>();
    const subtemasMap = new Map<string, number>();
    const instituicoesMap = new Map<string, number>();
    const anosMap = new Map<string, number>();

    questoes.forEach(q => {
      if (q.especialidade) {
        especialidadesMap.set(q.especialidade, (especialidadesMap.get(q.especialidade) || 0) + 1);
      }
      if (q.tema) {
        temasMap.set(q.tema, (temasMap.get(q.tema) || 0) + 1);
      }
      if (q.subtema) {
        subtemasMap.set(q.subtema, (subtemasMap.get(q.subtema) || 0) + 1);
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

    // Mapeia "ProREV" para "RevalidaFLOW" na exibição
    const toInstituicoesOptions = (map: Map<string, number>): FilterOption[] => 
      Array.from(map.entries())
        .map(([value, count]) => ({ 
          value, 
          label: value === 'ProREV' ? 'RevalidaFLOW' : value, 
          count 
        }))
        .sort((a, b) => b.count - a.count);

    return {
      especialidades: toOptions(especialidadesMap),
      temas: toOptions(temasMap),
      subtemas: toOptions(subtemasMap),
      instituicoes: toInstituicoesOptions(instituicoesMap),
      anos: Array.from(anosMap.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.value.localeCompare(a.value))
    };
  }, [questoes]);

  // Estrutura hierárquica para filtros
  const hierarchicalFilters = useMemo((): HierarchicalFilter[] => {
    const hierarchy: Record<string, {
      count: number;
      temas: Record<string, {
        count: number;
        subtemas: Record<string, number>;
      }>;
    }> = {};

    questoes.forEach(q => {
      const esp = q.especialidade || 'Outros';
      const tema = q.tema || 'Geral';
      const subtema = q.subtema || 'Geral';

      if (!hierarchy[esp]) {
        hierarchy[esp] = { count: 0, temas: {} };
      }
      hierarchy[esp].count++;

      if (!hierarchy[esp].temas[tema]) {
        hierarchy[esp].temas[tema] = { count: 0, subtemas: {} };
      }
      hierarchy[esp].temas[tema].count++;

      if (!hierarchy[esp].temas[tema].subtemas[subtema]) {
        hierarchy[esp].temas[tema].subtemas[subtema] = 0;
      }
      hierarchy[esp].temas[tema].subtemas[subtema]++;
    });

    return Object.entries(hierarchy)
      .map(([especialidade, data]) => ({
        especialidade,
        count: data.count,
        temas: Object.entries(data.temas)
          .map(([tema, temaData]) => ({
            tema,
            count: temaData.count,
            subtemas: Object.entries(temaData.subtemas)
              .map(([subtema, count]) => ({ subtema, count }))
              .sort((a, b) => b.count - a.count)
          }))
          .sort((a, b) => b.count - a.count)
      }))
      .sort((a, b) => b.count - a.count);
  }, [questoes]);

  // Questões filtradas
  const filteredQuestoes = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const fiveYearsAgo = currentYear - 5;
    
    return questoes.filter(q => {
      // Filtros básicos
      if (filters.especialidades.length > 0 && !filters.especialidades.includes(q.especialidade)) {
        return false;
      }
      if (filters.temas.length > 0 && q.tema && !filters.temas.includes(q.tema)) {
        return false;
      }
      if (filters.subtemas.length > 0 && q.subtema && !filters.subtemas.includes(q.subtema)) {
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
        const matchesSearch = q.enunciado.toLowerCase().includes(search) ||
               q.alternativas.some(a => a.toLowerCase().includes(search));
        if (!matchesSearch) return false;
      }
      
      // Filtros avançados
      const questionProgress = progress[q.id];
      
      if (advancedFilters.hideCorrect && questionProgress?.isCorrect === true) {
        return false;
      }
      
      if (advancedFilters.hideReviewed && questionProgress?.answered) {
        return false;
      }
      
      if (advancedFilters.onlyLast5Years) {
        const questionYear = parseInt(q.ano);
        if (isNaN(questionYear) || questionYear < fiveYearsAgo) {
          return false;
        }
      }
      
      return true;
    });
  }, [questoes, filters, advancedFilters, progress]);

  // Questão atual
  const currentQuestao = filteredQuestoes[currentIndex] || null;

  // Navegação
  const goToNext = useCallback(() => {
    if (currentIndex < filteredQuestoes.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setShowAnswer(false);
      setSelectedAnswer(null);
      saveLastIndex(newIndex, getFilterKey());
    }
  }, [currentIndex, filteredQuestoes.length, saveLastIndex, getFilterKey]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setShowAnswer(false);
      setSelectedAnswer(null);
      saveLastIndex(newIndex, getFilterKey());
    }
  }, [currentIndex, saveLastIndex, getFilterKey]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < filteredQuestoes.length) {
      setCurrentIndex(index);
      setShowAnswer(false);
      setSelectedAnswer(null);
      saveLastIndex(index, getFilterKey());
    }
  }, [filteredQuestoes.length, saveLastIndex, getFilterKey]);

  // Iniciar estudo - carrega de onde parou
  const startStudy = useCallback(async () => {
    const filterKey = getFilterKey();
    const lastIndex = await loadLastIndex(filterKey);
    const validIndex = Math.min(lastIndex, Math.max(0, filteredQuestoes.length - 1));
    setCurrentIndex(validIndex);
    setShowAnswer(false);
    setSelectedAnswer(null);
    return validIndex;
  }, [getFilterKey, loadLastIndex, filteredQuestoes.length]);

  // Responder questão
  const answerQuestion = useCallback((answer: string) => {
    if (!currentQuestao) return;
    
    setSelectedAnswer(answer);
    
    const isCorrect = currentQuestao.gabarito 
      ? answer.charAt(0).toUpperCase() === currentQuestao.gabarito.charAt(0).toUpperCase()
      : null;

    // Salvar no Supabase
    saveProgress(currentQuestao.id, answer, isCorrect);
  }, [currentQuestao, saveProgress]);

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
      temas: [],
      subtemas: [],
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
  const resetProgress = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from('questoes_progress')
        .delete()
        .eq('user_id', user.id);

      await supabase
        .from('questoes_last_index')
        .delete()
        .eq('user_id', user.id);

      setProgress({});
      setCurrentIndex(0);
    } catch (err) {
      console.error('Erro ao resetar progresso:', err);
    }
  }, [user]);

  return {
    questoes,
    filteredQuestoes,
    currentQuestao,
    currentIndex,
    loading,
    error,
    filters,
    advancedFilters,
    filterOptions,
    hierarchicalFilters,
    progress,
    showAnswer,
    selectedAnswer,
    stats,
    savingProgress,
    goToNext,
    goToPrevious,
    goToIndex,
    startStudy,
    answerQuestion,
    revealAnswer,
    updateFilters,
    toggleFilter,
    toggleAdvancedFilter,
    clearFilters,
    resetProgress,
    setShowAnswer
  };
}
