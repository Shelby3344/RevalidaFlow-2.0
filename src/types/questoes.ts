export interface Questao {
  id: number;
  especialidade: string;
  instituicao: string;
  ano: string;
  modalidade: string;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
}

export interface QuestaoFilters {
  especialidades: string[];
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
