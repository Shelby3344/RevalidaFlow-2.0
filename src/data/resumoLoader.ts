// Interface para o formato JSON dos resumos
export interface ResumoJson {
  uid: number;
  area: string;
  nome: string;
  definicao: string;
  conteudo_html: string;
  conteudo_texto: string;
}

// Interface para o item de resumo na lista
export interface ResumoItem {
  id: string;
  uid: number;
  tema: string;
  area: string;
  media: number;
}

// Cache para armazenar resumos já carregados
const resumoCache: Record<string, ResumoJson> = {};
const loadingPromises: Record<string, Promise<ResumoJson | null>> = {};

// Lista de todos os resumos disponíveis
let allResumos: ResumoItem[] = [];
let resumosLoaded = false;

// Função para carregar a lista de todos os resumos
export async function loadAllResumos(): Promise<ResumoItem[]> {
  if (resumosLoaded && allResumos.length > 0) {
    return allResumos;
  }

  const folders = ['CM', 'CR', 'GO', 'PE', 'PR'];
  const resumos: ResumoItem[] = [];

  for (const folder of folders) {
    try {
      const indexResponse = await fetch(`/resumos-json/${folder}/index.json`);
      if (indexResponse.ok) {
        const index = await indexResponse.json();
        
        for (const [uid, fileName] of Object.entries(index)) {
          // Extrai o nome do tema do nome do arquivo
          const tema = (fileName as string)
            .replace(/^\d+_/, '')
            .replace('.json', '')
            .replace(/_/g, ' ')
            .replace(/–/g, '-');
          
          resumos.push({
            id: uid,
            uid: parseInt(uid),
            tema,
            area: folder,
            media: Math.random() * 40 + 50 // Média simulada entre 50-90
          });
        }
      }
    } catch (error) {
      console.warn(`Erro ao carregar índice de resumos ${folder}:`, error);
    }
  }

  // Ordena por tema
  resumos.sort((a, b) => a.tema.localeCompare(b.tema, 'pt-BR'));
  
  allResumos = resumos;
  resumosLoaded = true;
  
  return resumos;
}

// Função para carregar um resumo por UID (assíncrona)
export async function loadResumoByUid(uid: string | number): Promise<ResumoJson | null> {
  const uidStr = String(uid);
  
  // Retorna do cache se já carregado
  if (resumoCache[uidStr]) {
    return resumoCache[uidStr];
  }
  
  // Retorna a promise existente se já está carregando
  if (loadingPromises[uidStr]) {
    return loadingPromises[uidStr];
  }
  
  // Inicia o carregamento
  loadingPromises[uidStr] = (async () => {
    try {
      const folders = ['CM', 'CR', 'GO', 'PE', 'PR'];
      
      for (const folder of folders) {
        try {
          const indexResponse = await fetch(`/resumos-json/${folder}/index.json`);
          if (indexResponse.ok) {
            const index = await indexResponse.json();
            const fileName = index[uidStr];
            if (fileName) {
              const response = await fetch(`/resumos-json/${folder}/${fileName}`);
              if (response.ok) {
                const json = await response.json();
                resumoCache[uidStr] = json;
                return json;
              }
            }
          }
        } catch {
          // Continua para a próxima pasta
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Erro ao carregar resumo ${uidStr}:`, error);
      return null;
    } finally {
      delete loadingPromises[uidStr];
    }
  })();
  
  return loadingPromises[uidStr];
}

// Função síncrona para obter do cache
export function getResumoFromCache(uid: string | number): ResumoJson | null {
  return resumoCache[String(uid)] || null;
}

// Exporta o cache
export { resumoCache };
