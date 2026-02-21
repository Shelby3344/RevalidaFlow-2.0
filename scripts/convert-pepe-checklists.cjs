/**
 * Script para converter os checklists do formato scraped (checklists_completos.json)
 * para o formato usado pelo app (public/checklists-json/)
 * 
 * Também gera o pepe-stations.ts atualizado
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'scriping', 'checklists_completos.json');
const OUTPUT_BASE = path.join(__dirname, '..', 'public', 'checklists-json');
const PEPE_STATIONS_OUTPUT = path.join(__dirname, '..', 'src', 'data', 'pepe-stations.ts');

// Mapeamento de áreas para códigos de pasta
const areaToFolder = {
  'Clínica Médica': 'CM',
  'Cirurgia': 'CR',
  'Ginecologia e Obstetrícia': 'GO',
  'Pediatria': 'PE',
  'M. da Família e Comunidade': 'PR',
};

const areaToAreaA = {
  'Clínica Médica': 'Clínica',
  'Cirurgia': 'Cirurgia',
  'Ginecologia e Obstetrícia': 'Ginecologia',
  'Pediatria': 'Pediatria',
  'M. da Família e Comunidade': 'Família',
};

const areaToColor = {
  'Clínica Médica': '#038ffb',
  'Cirurgia': '#f97316',
  'Ginecologia e Obstetrícia': '#ec4899',
  'Pediatria': '#22c55e',
  'M. da Família e Comunidade': '#a855f7',
};

// Mapear clinical_skill para categoria
function skillToCategoria(skill) {
  const map = {
    'Apresentação': 'ac',
    'Anamnese': 'an',
    'Exame Físico': 'ef',
    'Exames Complementares': 'ec',
    'Diagnóstico': 'dx',
    'Conduta': 'cd',
    'Orientação': 'or',
    'Comunicação': 'cm',
    'Procedimento': 'pr',
    'Prescrição': 'rx',
    'Habilidade Atitudinal': 'ha',
  };
  return map[skill] || 'ac';
}

// Parsear cenário do formato markdown para texto simples
function parseScene(scene) {
  if (!scene) return '';
  return scene
    .replace(/\*\*/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Parsear tarefas
function parseTasks(tasks) {
  if (!tasks) return '';
  return tasks
    .replace(/\*\*/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Parsear script do ator
function parseScript(script) {
  if (!script) return '';
  return script
    .replace(/\\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Parsear descrição do item de checklist (markdown para texto)
function parseDescription(desc) {
  if (!desc) return '';
  return desc
    .replace(/\\n/g, '\n')
    .trim();
}

function convertChecklist(source) {
  const info = source.info_basica;
  const details = source.detalhes;
  const impressos = source.conteudo_impresso || [];
  const items = source.questoes_checklist || [];

  const folder = areaToFolder[info.station_area] || 'CM';
  const uid = info.station_id;
  const name = info.station_name;
  const edition = info.station_edition || '';
  
  // Detectar se é discursiva
  const isDiscursive = name.toLowerCase().includes('discursiva') || 
                       name.toLowerCase().includes('discursivo');

  // Construir cenário a partir dos dados
  let cenario = '';
  if (details.scene) {
    // Remover markdown bold e limpar
    cenario = details.scene
      .replace(/\*\*CENÁRIO DE ATENDIMENTO\*\*\s*/i, '')
      .replace(/\*\*/g, '')
      .replace(/\\\n/g, '\n')
      .trim();
  }
  
  // Adicionar descrição do caso se existir separada
  if (details.description) {
    const desc = details.description
      .replace(/\*\*DESCRIÇÃO DO CASO\*\*\s*/i, '')
      .replace(/\*\*/g, '')
      .trim();
    cenario += '\n\nDescrição do caso:\n' + desc;
  }

  // Parsear tarefas
  let tarefas = '';
  if (details.tasks) {
    tarefas = details.tasks
      .replace(/\*\*TAREFAS\*\*\s*/i, '')
      .replace(/\*\*Nos 10 minutos de duração da Estação, você deverá executar as seguintes tarefas:\*\*\s*/i, '')
      .replace(/\*\*/g, '')
      .replace(/•/g, '-')
      .trim();
  }

  // Parsear script do ator
  let scriptAtor = '';
  if (details.script) {
    scriptAtor = details.script
      .replace(/\\\n/g, '\n')
      .trim();
  }

  // Converter impressos
  const convertedImpressos = impressos.map((imp, idx) => ({
    idx: idx + 1,
    titulo: (imp.name || `Impresso ${idx + 1}`)
      .replace(/\*\*/g, '')
      .trim(),
    conteudo: (imp.description || '')
      .replace(new RegExp(`\\*\\*${(imp.name || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*\\*\\s*`, 'i'), '')
      .replace(/\\\n/g, '\n')
      .trim(),
    imagem: imp.img || null,
  }));

  // Converter items de avaliação (PEP items)
  const pepItems = items.map(item => {
    const scores = item.scores || [0, 0, 1];
    return {
      idx: item.cod_int || parseInt(item.cod) || 0,
      descricao: parseDescription(item.description),
      categoria: skillToCategoria(item.clinical_skill),
      pontuacao: {
        inadequado: String(scores[0] || 0),
        parcial: scores[1] === 0 && scores[0] === 0 ? '-' : String(scores[1] || 0),
        adequado: String(scores[2] || 1),
      },
      dica_teorica: item.tips || null,
    };
  });

  // Construir o JSON no formato do app
  const output = {
    uid: uid,
    hash: `pepe_${uid}`,
    area: Object.keys(areaToFolder).indexOf(info.station_area),
    area_a: areaToAreaA[info.station_area] || info.station_area,
    area_b: folder,
    area_s: info.station_area,
    color: areaToColor[info.station_area] || '#038ffb',
    checklist: name,
    definicao: details.resume || details.notes || '',
    origem: 0,
    ano_da_prova: edition || null,
    tipo_de_checklist: isDiscursive ? 3 : 2,
    resumo: { pct: '0', star: 0, time: 0, count: 0 },
    cenario: cenario,
    tarefas: tarefas,
    script_ator: scriptAtor,
    impressos: convertedImpressos,
    pep_items: pepItems,
  };

  return { output, folder, uid, name, isDiscursive };
}

// Main
function main() {
  console.log('Carregando checklists...');
  const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  console.log(`Total de checklists: ${data.length}`);

  // Limpar pastas existentes (exceto preservar os antigos? Não - substituímos tudo)
  const folders = ['CM', 'CR', 'GO', 'PE', 'PR'];
  
  // Acumular por pasta
  const byFolder = {};
  folders.forEach(f => { byFolder[f] = {}; });

  const stationsData = [];

  for (const source of data) {
    try {
      const { output, folder, uid, name, isDiscursive } = convertChecklist(source);
      const info = source.info_basica;
      
      // Gerar nome do arquivo
      const safeName = name
        .replace(/[<>:"/\\|?*]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      const fileName = `${uid}_${safeName}.json`;

      // Salvar
      const outputDir = path.join(OUTPUT_BASE, folder);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(outputDir, fileName),
        JSON.stringify(output, null, 2),
        'utf8'
      );

      byFolder[folder][String(uid)] = fileName;

      stationsData.push({
        station_id: uid,
        station_area: info.station_area,
        station_name: name,
        station_edition: info.station_edition || undefined,
        is_discursive: isDiscursive || undefined,
      });

    } catch (err) {
      console.error(`Erro ao converter checklist ${source.info_basica?.station_id}:`, err.message);
    }
  }

  // Gerar index.json para cada pasta
  for (const folder of folders) {
    const indexPath = path.join(OUTPUT_BASE, folder, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(byFolder[folder], null, 2), 'utf8');
    console.log(`${folder}: ${Object.keys(byFolder[folder]).length} checklists`);
  }

  // Gerar pepe-stations.ts
  const stationsTs = `// Dados das estações PEPE - Gerado automaticamente
// Total: ${stationsData.length} estações
export interface PepeStation {
  station_id: number;
  station_area: string;
  station_name: string;
  station_edition?: string;
  is_discursive?: boolean;
}

export const pepeStationsData: PepeStation[] = ${JSON.stringify(stationsData, null, 2)};

export const stationAreas = [
  'Clínica Médica',
  'Cirurgia',
  'Ginecologia e Obstetrícia',
  'Pediatria',
  'M. da Família e Comunidade',
];

export const areaColors: Record<string, string> = {
  'Clínica Médica': 'bg-blue-500',
  'Cirurgia': 'bg-orange-500',
  'Ginecologia e Obstetrícia': 'bg-pink-500',
  'Pediatria': 'bg-green-500',
  'M. da Família e Comunidade': 'bg-purple-500',
};

export const areaSiglas: Record<string, string> = {
  'Clínica Médica': 'CM',
  'Cirurgia': 'CR',
  'Ginecologia e Obstetrícia': 'GO',
  'Pediatria': 'PE',
  'M. da Família e Comunidade': 'PR',
};
`;

  fs.writeFileSync(PEPE_STATIONS_OUTPUT, stationsTs, 'utf8');
  console.log(`\\npepe-stations.ts atualizado com ${stationsData.length} estações`);
  console.log('Conversão concluída!');
}

main();
