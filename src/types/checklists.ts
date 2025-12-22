export interface ImpressoItem {
  id: number;
  title: string;
  isOpen: boolean;
  color: string;
  content?: string;
  image?: string | null;
}

export interface ChecklistEvaluationItem {
  id: number;
  title: string;
  subItems: string[];
  scoring: {
    adequate: string;
    partial: string;
    inadequate: string;
  };
  scores: {
    min: number;
    partial: number;
    max: number;
  };
  dica_teorica?: string;
}

export interface ChecklistContent {
  scenario: {
    nivel: string;
    tipo: string;
    situacao: string[];
    descricao: string[];
  };
  orientacoes: string[];
  instrucoes: {
    titulo: string;
    itens: string[];
  };
  impressos: ImpressoItem[];
  evaluationItems: ChecklistEvaluationItem[];
  references: string[];
  // Campos extras dos JSONs
  definicao?: string;
  resumo?: {
    pct: string;
    star: number;
    time: number;
    count: number;
  };
}
