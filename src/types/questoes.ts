export interface Questao {
  id: number;
  especialidade: string;
  tema?: string;
  subtema?: string;
  instituicao: string;
  ano: string;
  modalidade: string;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  explicacao?: string;
}

export interface QuestaoFilters {
  especialidades: string[];
  temas: string[];
  subtemas: string[];
  instituicoes: string[];
  anos: string[];
  searchTerm: string;
}

export interface QuestaoProgress {
  questaoId: number;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  answeredAt: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

// Estrutura hierárquica para filtros
export interface HierarchicalFilter {
  especialidade: string;
  count: number;
  temas: {
    tema: string;
    count: number;
    subtemas: {
      subtema: string;
      count: number;
    }[];
  }[];
}
