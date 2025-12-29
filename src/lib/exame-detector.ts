// Detector de solicitações de exames em mensagens do candidato

import { ExameForAI } from '@/types/treino-ia';
import { ImpressoItem } from '@/types/checklists';

/**
 * Palavras-chave que indicam solicitação de exame
 */
const EXAM_REQUEST_KEYWORDS = [
  // Verbos de solicitação
  'solicitar', 'solicito', 'pedir', 'peço', 'quero', 'preciso', 
  'fazer', 'realizar', 'ver', 'mostrar', 'trazer', 'apresentar',
  'gostaria', 'poderia', 'pode', 'posso',
  // Substantivos
  'exame', 'exames', 'resultado', 'resultados', 'laudo', 'laudos',
  // Tipos de exame
  'hemograma', 'raio', 'rx', 'tomografia', 'ressonancia', 'ultrassom',
  'eletrocardiograma', 'ecg', 'ecocardiograma', 'eco',
  'glicemia', 'colesterol', 'triglicerides', 'creatinina', 'ureia',
  'tsh', 't4', 'psa', 'hba1c', 'hemoglobina',
  'urina', 'fezes', 'sangue', 'laboratorio',
  // Exame físico
  'fisico', 'físico', 'sinais', 'vitais', 'pressao', 'pressão',
  'temperatura', 'pulso', 'frequencia', 'frequência', 'cardiaca', 'cardíaca',
  'respiratoria', 'respiratória', 'saturacao', 'saturação', 'oximetria',
  'ausculta', 'palpacao', 'palpação', 'inspecao', 'inspeção', 'percussao', 'percussão',
  'abdome', 'abdominal', 'torax', 'tórax', 'pulmonar', 'cardiaco', 'cardíaco',
  // Bioquímicos
  'bioquimico', 'bioquímico', 'bioquimica', 'bioquímica', 'bioquimicos', 'bioquímicos',
];

/**
 * Mapeamento de termos comuns para tipos de exame
 */
const EXAM_ALIASES: Record<string, string[]> = {
  'sinais vitais': ['sinais', 'vitais', 'pressao', 'pressão', 'temperatura', 'pulso', 'saturacao', 'saturação'],
  'exame fisico': ['fisico', 'físico', 'ausculta', 'palpacao', 'palpação', 'inspecao', 'inspeção', 'percussao', 'percussão'],
  'exame físico': ['fisico', 'físico', 'ausculta', 'palpacao', 'palpação', 'inspecao', 'inspeção', 'percussao', 'percussão'],
  'laboratorio': ['laboratorio', 'laboratório', 'sangue', 'hemograma', 'bioquimico', 'bioquímico'],
  'laboratório': ['laboratorio', 'laboratório', 'sangue', 'hemograma', 'bioquimico', 'bioquímico'],
  'bioquimicos': ['bioquimico', 'bioquímico', 'bioquimica', 'bioquímica', 'glicemia', 'colesterol', 'creatinina'],
  'bioquímicos': ['bioquimico', 'bioquímico', 'bioquimica', 'bioquímica', 'glicemia', 'colesterol', 'creatinina'],
};

/**
 * Converte impressos para formato de detecção
 */
export function prepareExamesForDetection(impressos: ImpressoItem[]): ExameForAI[] {
  return impressos.map((impresso, index) => ({
    id: index + 1,
    title: impresso.title,
    keywords: extractExameKeywords(impresso.title, impresso.content || ''),
    content: impresso.content || '',
  }));
}

/**
 * Extrai palavras-chave de um exame
 */
function extractExameKeywords(titulo: string, conteudo: string): string[] {
  const text = `${titulo} ${conteudo}`.toLowerCase();
  
  const keywords: string[] = [];
  
  // Extrair tipos de exame comuns
  const examTypes = [
    'hemograma', 'glicemia', 'colesterol', 'triglicerides',
    'creatinina', 'ureia', 'tgo', 'tgp', 'bilirrubina',
    'sodio', 'potassio', 'calcio', 'magnesio',
    'raio', 'rx', 'radiografia', 'tomografia', 'tc',
    'ressonancia', 'rm', 'ultrassom', 'usg', 'ecografia',
    'eletrocardiograma', 'ecg', 'ecocardiograma', 'eco',
    'urina', 'eas', 'fezes', 'parasitologico',
    'tsh', 't4', 't3', 'psa', 'hba1c',
    'pcr', 'vhs', 'leucograma', 'plaquetas',
    // Exame físico e sinais vitais
    'fisico', 'físico', 'sinais', 'vitais', 'pressao', 'pressão',
    'temperatura', 'pulso', 'frequencia', 'frequência',
    'saturacao', 'saturação', 'oximetria', 'ausculta',
    'palpacao', 'palpação', 'inspecao', 'inspeção',
    'abdome', 'abdominal', 'torax', 'tórax', 'pulmonar',
    // Bioquímicos
    'bioquimico', 'bioquímico', 'bioquimica', 'bioquímica', 'bioquimicos', 'bioquímicos',
    'laboratorio', 'laboratório',
  ];
  
  for (const examType of examTypes) {
    if (text.includes(examType)) {
      keywords.push(examType);
    }
  }
  
  // Adicionar palavras do título
  const titleWords = titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  keywords.push(...titleWords);
  
  return [...new Set(keywords)];
}

/**
 * Detecta solicitações de exames em uma mensagem
 */
export function detectExameRequests(
  message: string,
  availableExames: ExameForAI[],
  alreadyLiberated: number[]
): { detectedExames: number[]; notFound: string[] } {
  const normalizedMessage = message
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  // Verificar se é uma solicitação de exame
  const isExamRequest = EXAM_REQUEST_KEYWORDS.some(keyword => 
    normalizedMessage.includes(keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );
  
  if (!isExamRequest) {
    return { detectedExames: [], notFound: [] };
  }
  
  const detectedExames: number[] = [];
  const notFound: string[] = [];
  
  // Expandir aliases na mensagem
  let expandedKeywords: string[] = [];
  for (const [alias, keywords] of Object.entries(EXAM_ALIASES)) {
    const normalizedAlias = alias.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalizedMessage.includes(normalizedAlias)) {
      expandedKeywords.push(...keywords.map(k => k.normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
    }
  }
  
  // Procurar exames mencionados
  for (const exame of availableExames) {
    // Pular exames já liberados
    if (alreadyLiberated.includes(exame.id)) {
      continue;
    }
    
    // Normalizar keywords do exame
    const normalizedKeywords = exame.keywords.map(k => 
      k.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    
    // Verificar match direto
    let matchCount = normalizedKeywords.filter(keyword => 
      normalizedMessage.includes(keyword)
    ).length;
    
    // Verificar match com aliases expandidos
    if (matchCount === 0 && expandedKeywords.length > 0) {
      matchCount = normalizedKeywords.filter(keyword =>
        expandedKeywords.some(ek => keyword.includes(ek) || ek.includes(keyword))
      ).length;
    }
    
    // Verificar título do exame diretamente
    const normalizedTitle = exame.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const titleWords = normalizedTitle.split(/[\s\-–]+/).filter(w => w.length > 2);
    const titleMatch = titleWords.some(word => normalizedMessage.includes(word));
    
    if (matchCount >= 1 || titleMatch) {
      detectedExames.push(exame.id);
    }
  }
  
  // Detectar exames solicitados mas não disponíveis
  const commonExams = [
    'hemograma', 'glicemia', 'colesterol', 'raio x', 'rx',
    'tomografia', 'ressonancia', 'ultrassom', 'ecg', 'ecocardiograma',
  ];
  
  for (const exam of commonExams) {
    const normalizedExam = exam.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalizedMessage.includes(normalizedExam)) {
      const found = availableExames.some(e => 
        e.keywords.some(k => {
          const nk = k.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return nk.includes(normalizedExam) || normalizedExam.includes(nk);
        })
      );
      if (!found && !notFound.includes(exam)) {
        notFound.push(exam);
      }
    }
  }
  
  return { detectedExames, notFound };
}

/**
 * Gera mensagem quando exame não está disponível
 */
export function generateExameNotFoundMessage(notFoundExames: string[]): string {
  if (notFoundExames.length === 0) return '';
  
  if (notFoundExames.length === 1) {
    return `O exame "${notFoundExames[0]}" não está disponível neste caso clínico.`;
  }
  
  return `Os seguintes exames não estão disponíveis neste caso: ${notFoundExames.join(', ')}.`;
}

/**
 * Gera mensagem quando exame é liberado (sem expressões faciais)
 */
export function generateExameLiberatedMessage(exame: ExameForAI): string {
  return `Aqui está o ${exame.title}. Pode analisar, doutor(a).`;
}
