export const config = {
  runtime: 'edge',
};

// Taxonomia médica para classificação
const TAXONOMY = `
Clínica Médica:
  Cardiologia: Hipertensão Arterial, Insuficiência Cardíaca, Arritmias, Doença Coronariana, Valvopatias, Endocardite
  Pneumologia: Asma, DPOC, Pneumonias, Tuberculose, Derrame Pleural, TEP, Neoplasias Pulmonares
  Gastroenterologia: DRGE, Úlcera Péptica e H. pylori, Hepatites, Cirrose, DII, Pancreatite, Hemorragia Digestiva
  Nefrologia: IRA, DRC, Glomerulopatias, ITU, Distúrbios Hidroeletrolíticos, Litíase Renal
  Endocrinologia: Diabetes Mellitus, Doenças da Tireoide, Doenças da Adrenal, Obesidade, Dislipidemias
  Reumatologia: Artrite Reumatoide, LES, Espondiloartrites, Gota, Fibromialgia, Vasculites
  Hematologia: Anemias, Leucemias, Linfomas, Distúrbios da Coagulação
  Infectologia: HIV/AIDS, Dengue e Arboviroses, Meningites, Sepse, ISTs
  Neurologia: AVC, Epilepsia, Cefaléias, Demências, Parkinson, Neuropatias
  Dermatologia: Dermatites, Psoríase, Infecções Cutâneas, Neoplasias de Pele

Cirurgia:
  Cirurgia Geral: Hérnias, Apendicite, Colecistite, Obstrução Intestinal, Abdome Agudo
  Trauma: Trauma Abdominal, Trauma Torácico, TCE, Politrauma e ATLS, Queimaduras
  Cirurgia Vascular: Doença Arterial Periférica, Aneurismas, TVP, Varizes
  Oncologia Cirúrgica: Câncer de Mama, Câncer Colorretal, Câncer Gástrico
  Urologia: HPB, Câncer de Próstata, Litíase Urinária
  Ortopedia: Fraturas, Luxações, Lesões de Partes Moles
  Cicatrização: Cicatrização Normal e Patológica, Queloides, Feridas Crônicas

Ginecologia:
  Ginecologia Geral: Ciclo Menstrual, SPM e TDPM, Amenorreia, SUA
  Oncologia Ginecológica: Câncer de Colo, Câncer de Endométrio, Câncer de Ovário
  Infertilidade: Infertilidade Conjugal, Propedêutica, Reserva Ovariana, Fator Tuboperitoneal
  Uroginecologia: Incontinência Urinária, Prolapsos, Fístulas, Bexiga Hiperativa
  Doenças Benignas: Miomas, Endometriose, Cistos Ovarianos, DIP
  Climatério: Síndrome Climatérica, Terapia Hormonal
  Ética: Aborto Legal, Violência Sexual, Profilaxia Pós-Exposição

Obstetrícia:
  Pré-Natal: Assistência Pré-Natal, Exames e Rastreamento, Imunização
  Patologias: Síndromes Hipertensivas, DMG, Placenta Prévia, DPP, TPP
  Parto: Trabalho de Parto, Cesariana, Hemorragia Pós-Parto, Infecções Puerperais
  Medicina Fetal: Crescimento Fetal, Malformações, Sofrimento Fetal

Pediatria:
  Neonatologia: Reanimação Neonatal, Icterícia, Sepse Neonatal, Prematuridade
  Puericultura: Crescimento e Desenvolvimento, Aleitamento, Alimentação, Imunização
  Doenças Respiratórias: Bronquiolite, Pneumonias, Asma Infantil, IVAS
  Doenças Infecciosas: Exantemáticas, Meningites, Diarreia Aguda
  Oncologia Pediátrica: Leucemias, Tumores Sólidos, Neuroblastoma, Wilms
  Urgências: Desidratação, Convulsões Febris, Intoxicações

Medicina Preventiva:
  Epidemiologia: Indicadores de Saúde, Estudos Epidemiológicos, Vigilância
  Saúde Pública: SUS, Atenção Primária, Programas de Saúde, Políticas
  Bioestatística: Medidas de Frequência, Testes Diagnósticos
  Saúde do Trabalhador: Doenças Ocupacionais, Acidentes de Trabalho
`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { questoes } = await req.json();

    if (!questoes || !Array.isArray(questoes)) {
      return new Response('questoes array is required', { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    // Processar em lote (máximo 10 por vez para não sobrecarregar)
    const results: Array<{ id: number; tema: string; subtema: string; error?: string }> = [];
    
    for (const questao of questoes.slice(0, 10)) {
      const prompt = `Classifique esta questão médica em TEMA e SUBTEMA baseado na taxonomia.

TAXONOMIA:
${TAXONOMY}

QUESTÃO:
Especialidade: ${questao.especialidade || 'Não informada'}
Enunciado: ${(questao.enunciado || '').substring(0, 1000)}

Responda APENAS em JSON: {"tema": "Nome do Tema", "subtema": "Nome do Subtema"}`;

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'Você classifica questões médicas. Responda apenas em JSON válido.' },
              { role: 'user', content: prompt },
            ],
            temperature: 0.1,
            max_tokens: 100,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          let content = data.choices[0].message.content.trim();
          
          // Limpar marcadores de código
          if (content.startsWith('```')) {
            content = content.split('\n').slice(1).join('\n');
          }
          if (content.endsWith('```')) {
            content = content.slice(0, -3);
          }
          content = content.trim();
          
          const classification = JSON.parse(content);
          results.push({
            id: questao.id,
            tema: classification.tema || '',
            subtema: classification.subtema || '',
          });
        } else {
          results.push({
            id: questao.id,
            tema: '',
            subtema: '',
            error: 'API error',
          });
        }
      } catch (e) {
        results.push({
          id: questao.id,
          tema: '',
          subtema: '',
          error: String(e),
        });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Classify Error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
