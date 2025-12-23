import { ChecklistContent } from '@/types/checklists';

// Interface para o formato JSON dos arquivos
export interface JsonChecklist {
  uid: number;
  hash: string;
  area: number;
  area_a: string;
  area_b: string;
  area_s: string | null;
  color: string;
  checklist: string;
  definicao: string;
  origem: number;
  ano_da_prova: string | null;
  tipo_de_checklist: number;
  resumo: {
    pct: string;
    star: number;
    time: number;
    count: number;
  };
  cenario: string;
  tarefas: string;
  script_ator: string;
  impressos: Array<{
    idx: number;
    titulo: string;
    conteudo: string;
    imagem: string | null;
  }>;
  pep_items: Array<{
    idx: number;
    descricao: string;
    categoria: string;
    pontuacao: {
      inadequado: string;
      parcial: string;
      adequado: string;
    };
    dica_teorica: string | null;
  }>;
}

// Função para parsear o cenário
function parseScenario(cenario: string): { nivel: string; tipo: string; situacao: string[]; descricao: string[] } {
  const lines = cenario.split('\n').filter(l => l.trim());
  let nivel = '';
  let tipo = '';
  const situacao: string[] = [];
  const descricao: string[] = [];
  
  let currentSection = '';
  
  for (const line of lines) {
    if (line.startsWith('Nível de atenção:')) {
      nivel = line.replace('Nível de atenção:', '').trim();
    } else if (line.startsWith('Tipo de atendimento:')) {
      tipo = line.replace('Tipo de atendimento:', '').trim();
    } else if (line.includes('infraestrutura:') || line.startsWith('A unidade')) {
      currentSection = 'situacao';
      situacao.push(line);
    } else if (line.startsWith('Descrição do caso:') || line.startsWith('Descrição:')) {
      currentSection = 'descricao';
      const desc = line.replace('Descrição do caso:', '').replace('Descrição:', '').trim();
      if (desc) descricao.push(desc);
    } else if (line.startsWith('-')) {
      if (currentSection === 'situacao') {
        situacao.push(line);
      } else {
        descricao.push(line);
      }
    } else if (currentSection === 'descricao') {
      descricao.push(line);
    } else if (currentSection === 'situacao') {
      situacao.push(line);
    }
  }
  
  return { nivel, tipo, situacao, descricao };
}

// Função para parsear as tarefas/orientações
function parseOrientacoes(tarefas: string): string[] {
  return tarefas.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => l.startsWith('- ') ? l : `- ${l}`);
}

// Função para parsear o script do ator
function parseScriptAtor(script: string): { titulo: string; itens: string[] } {
  const lines = script.split('\n').filter(l => l.trim());
  const itens: string[] = [];
  
  for (const line of lines) {
    const cleanLine = line.replace(/\*\*/g, '').trim();
    if (cleanLine) {
      itens.push(cleanLine);
    }
  }
  
  return {
    titulo: 'Script do Ator/Atriz',
    itens
  };
}

// Função para parsear um item de avaliação
function parseEvaluationItem(item: { idx: number; descricao: string; categoria: string; pontuacao: { inadequado: string; parcial: string; adequado: string }; dica_teorica: string | null }) {
  const lines = item.descricao.split('\n').filter(l => l.trim());
  
  let title = '';
  const subItems: string[] = [];
  let adequate = '';
  let partial = '';
  let inadequate = '';
  
  for (const line of lines) {
    const cleanLine = line.replace(/\*\*/g, '').trim();
    
    if (cleanLine.match(/^\d+\.\s/)) {
      title = cleanLine;
    } else if (cleanLine.startsWith('(') && cleanLine.match(/^\(\d+\)/)) {
      subItems.push(cleanLine);
    } else if (cleanLine.startsWith('Adequado:')) {
      adequate = cleanLine.replace('Adequado:', '').trim();
    } else if (cleanLine.startsWith('Parcialmente adequado:') || cleanLine.startsWith('Parcialmente:')) {
      partial = cleanLine.replace('Parcialmente adequado:', '').replace('Parcialmente:', '').trim();
    } else if (cleanLine.startsWith('Inadequado:')) {
      inadequate = cleanLine.replace('Inadequado:', '').trim();
    }
  }
  
  // Parse scores from pontuacao
  const maxScore = parseFloat(item.pontuacao.adequado) || 1;
  const partialScore = item.pontuacao.parcial === '-' ? 0 : (parseFloat(item.pontuacao.parcial) || maxScore / 2);
  
  return {
    id: item.idx,
    title: title || `${item.idx}. Item de avaliação`,
    subItems,
    scoring: {
      adequate: adequate || 'Realiza corretamente.',
      partial: partial || '—',
      inadequate: inadequate || 'Não realiza.'
    },
    scores: {
      min: 0,
      partial: partialScore,
      max: maxScore
    },
    ...(item.dica_teorica ? { dica_teorica: item.dica_teorica } : {})
  };
}

// Função principal para converter JSON para ChecklistContent
export function convertJsonToChecklistContent(json: JsonChecklist): ChecklistContent {
  const scenario = parseScenario(json.cenario);
  
  return {
    scenario: {
      nivel: scenario.nivel || 'A definir',
      tipo: scenario.tipo || 'A definir',
      situacao: scenario.situacao.length > 0 ? scenario.situacao : ['Cenário não especificado.'],
      descricao: scenario.descricao.length > 0 ? scenario.descricao : ['Descrição não especificada.']
    },
    orientacoes: parseOrientacoes(json.tarefas),
    instrucoes: parseScriptAtor(json.script_ator),
    impressos: json.impressos.map(imp => ({
      id: imp.idx,
      title: `Impresso ${imp.idx} – ${imp.titulo}`,
      isOpen: false,
      color: 'bg-primary',
      content: imp.conteudo,
      image: imp.imagem
    })),
    evaluationItems: json.pep_items.map(parseEvaluationItem),
    references: [],
    definicao: json.definicao,
    resumo: json.resumo
  };
}

// Cache para armazenar checklists já carregados
const checklistCache: Record<string, ChecklistContent> = {};
const loadingPromises: Record<string, Promise<ChecklistContent | null>> = {};

// Lista de UIDs disponíveis por pasta (será preenchida dinamicamente)
let availableUids: Record<string, string[]> = {};
let initialized = false;

// Função para inicializar o índice de UIDs disponíveis
async function initializeIndex(): Promise<void> {
  if (initialized) return;
  
  try {
    // Tenta carregar o índice de checklists
    const response = await fetch('/checklists-index.json');
    if (response.ok) {
      availableUids = await response.json();
    }
  } catch (error) {
    console.warn('Índice de checklists não encontrado, usando fallback');
  }
  
  initialized = true;
}

// Função para carregar um checklist por UID (assíncrona)
// Também aceita o título do checklist para busca por nome
export async function loadChecklistByUidAsync(uid: string | number, title?: string): Promise<ChecklistContent | null> {
  const uidStr = String(uid);
  
  // Retorna do cache se já carregado
  if (checklistCache[uidStr]) {
    return checklistCache[uidStr];
  }
  
  // Retorna a promise existente se já está carregando
  if (loadingPromises[uidStr]) {
    return loadingPromises[uidStr];
  }
  
  // Inicia o carregamento
  loadingPromises[uidStr] = (async () => {
    try {
      // Tenta carregar de cada pasta
      const folders = ['CM', 'CR', 'GO', 'PE', 'PR'];
      
      for (const folder of folders) {
        try {
          // Primeiro tenta buscar o arquivo pelo UID no índice
          const indexResponse = await fetch(`/checklists-json/${folder}/index.json`);
          if (indexResponse.ok) {
            const index = await indexResponse.json() as Record<string, string>;
            
            // Tenta pelo UID direto
            let fileName = index[uidStr];
            
            // Se não encontrou pelo UID e temos um título, busca pelo nome do arquivo
            if (!fileName && title) {
              // Normaliza o título para comparação
              const normalizedTitle = title
                .replace(/\s*\|\s*INEP\s*\d+\.?\d*/gi, '') // Remove " | INEP 2024.2" ou " | INEP 2021"
                .replace(/[_\-–]/g, ' ')
                .replace(/\s+/g, ' ')
                .toLowerCase()
                .trim();
              
              // Busca no índice por nome de arquivo que contenha o título
              for (const [, file] of Object.entries(index)) {
                const normalizedFileName = (file as string)
                  .replace(/^\d+_/, '') // Remove o UID do início (ex: "1107_")
                  .replace(/\.json$/i, '') // Remove extensão
                  .replace(/[_\-–]/g, ' ')
                  .replace(/\s*_?\s*INEP\s*\d+\.?\d*/gi, '') // Remove INEP
                  .replace(/\s+/g, ' ')
                  .toLowerCase()
                  .trim();
                
                if (normalizedFileName === normalizedTitle || 
                    normalizedFileName.includes(normalizedTitle) ||
                    normalizedTitle.includes(normalizedFileName)) {
                  fileName = file as string;
                  break;
                }
              }
            }
            
            if (fileName) {
              const response = await fetch(`/checklists-json/${folder}/${fileName}`);
              if (response.ok) {
                const json = await response.json();
                const content = convertJsonToChecklistContent(json);
                checklistCache[uidStr] = content;
                return content;
              }
            }
          }
        } catch {
          // Continua para a próxima pasta
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Erro ao carregar checklist ${uidStr}:`, error);
      return null;
    } finally {
      delete loadingPromises[uidStr];
    }
  })();
  
  return loadingPromises[uidStr];
}

// Função síncrona para obter do cache (retorna null se não carregado)
export function loadChecklistByUid(uid: string | number): ChecklistContent | null {
  return checklistCache[String(uid)] || null;
}

// Função para pré-carregar um checklist
export function preloadChecklist(uid: string | number): void {
  loadChecklistByUidAsync(uid);
}

// Exporta o cache para acesso direto
export { checklistCache };
