// Detector de solicitações de exames em mensagens do candidato

import { ExameForAI } from '@/types/treino-ia';
import { ImpressoItem } from '@/types/checklists';

/**
 * Palavras-chave que indicam solicitação de exame
 */
const EXAM_REQUEST_KEYWORDS = [
  'solicitar', 'pedir', 'quero', 'preciso', 'fazer', 'realizar',
  'exame', 'exames', 'resultado', 'resultados', 'laudo', 'laudos',
  'hemograma', 'raio', 'rx', 'tomografia', 'ressonancia', 'ultrassom',
  'eletrocardiograma', 'ecg', 'ecocardiograma', 'eco',
  'glicemia', 'colesterol', 'triglicerides', 'creatinina', 'ureia',
  'tsh', 't4', 'psa', 'hba1c', 'hemoglobina',
  'urina', 'fezes', 'sangue', 'laboratorio',
  'ver', 'mostrar', 'trazer', 'apresentar',
];

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
    normalizedMessage.includes(keyword)
  );
  
  if (!isExamRequest) {
    return { detectedExames: [], notFound: [] };
  }
  
  const detectedExames: number[] = [];
  const notFound: string[] = [];
  
  // Procurar exames mencionados
  for (const exame of availableExames) {
    // Pular exames já liberados
    if (alreadyLiberated.includes(exame.id)) {
      continue;
    }
    
    const matchCount = exame.keywords.filter(keyword => 
      normalizedMessage.includes(keyword)
    ).length;
    
    if (matchCount >= 1) {
      detectedExames.push(exame.id);
    }
  }
  
  // Detectar exames solicitados mas não disponíveis
  const commonExams = [
    'hemograma', 'glicemia', 'colesterol', 'raio x', 'rx',
    'tomografia', 'ressonancia', 'ultrassom', 'ecg', 'ecocardiograma',
  ];
  
  for (const exam of commonExams) {
    if (normalizedMessage.includes(exam)) {
      const found = availableExames.some(e => 
        e.keywords.some(k => k.includes(exam) || exam.includes(k))
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
 * Gera mensagem quando exame é liberado
 */
export function generateExameLiberatedMessage(exame: ExameForAI): string {
  return `*entrega o resultado* Aqui está o ${exame.title}. Pode analisar, doutor(a).`;
}
