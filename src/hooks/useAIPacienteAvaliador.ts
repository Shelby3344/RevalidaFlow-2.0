import { useState, useCallback, useRef } from 'react';
import { ChecklistContent } from '@/types/checklists';
import {
  MessageIA,
  ItemScoreIA,
  AIResponse,
  ChecklistItemForAI,
  ExameForAI,
  TreinoIACallbacks,
} from '@/types/treino-ia';
import {
  prepareChecklistForDetection,
  detectChecklistItemsLocal,
  mergeScores,
  calculateItemScore,
} from '@/lib/checklist-detector';
import {
  prepareExamesForDetection,
  detectExameRequests,
  generateExameLiberatedMessage,
  generateExameNotFoundMessage,
} from '@/lib/exame-detector';

interface UseAIPacienteAvaliadorOptions {
  checklistContent: ChecklistContent;
  apiKey?: string;
  callbacks?: TreinoIACallbacks;
}

interface UseAIPacienteAvaliadorReturn {
  sendMessage: (message: string) => Promise<AIResponse>;
  sendInitialGreeting: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  conversationHistory: MessageIA[];
  completedItems: Record<number, ItemScoreIA>;
  liberatedExames: number[];
  totalScore: number;
  maxScore: number;
  clearHistory: () => void;
  getExameContent: (exameId: number) => ExameForAI | undefined;
}

function extractPatientInfo(content: ChecklistContent) {
  const instrucoes = content.instrucoes.itens.join('\n');
  const descricao = content.scenario.descricao.join('\n');
  const situacao = content.scenario.situacao.join('\n');
  const orientacoes = content.orientacoes.join('\n');
  
  let nome = 'Paciente';
  // Busca nome em padrões comuns do script do ator
  const nomePatterns = [
    /DADOS PESSOAIS[:\s]*[-\s]*([A-Z][a-záéíóúãõâêîôû]+)/i,
    /me chamo\s+([A-Z][a-záéíóúãõâêîôû]+)/i,
    /meu nome é\s+([A-Z][a-záéíóúãõâêîôû]+)/i,
    /sou o\s+([A-Z][a-záéíóúãõâêîôû]+)/i,
    /sou a\s+([A-Z][a-záéíóúãõâêîôû]+)/i,
  ];
  for (const pattern of nomePatterns) {
    const match = instrucoes.match(pattern);
    if (match) {
      nome = match[1];
      break;
    }
  }
  
  let idade = '';
  const idadeMatch = descricao.match(/(\d+)\s*anos/i) || instrucoes.match(/(\d+)\s*anos/i);
  if (idadeMatch) idade = idadeMatch[1];
  
  return { nome, idade, instrucoes, descricao, situacao, orientacoes };
}


function generateSystemPrompt(content: ChecklistContent, checklistItems: ChecklistItemForAI[], exames: ExameForAI[]): string {
  const info = extractPatientInfo(content);
  const scenario = content.scenario;
  
  // Preparar texto do checklist com descrições completas
  const checklistText = checklistItems.map(item => 
    `${item.id}. ${item.description}\n   Palavras-chave: ${item.keywords.slice(0, 8).join(', ')}`
  ).join('\n\n');
  
  // Preparar texto dos exames disponíveis
  const examesText = exames.map(e => 
    `${e.id}. ${e.title}\n   Palavras-chave: ${e.keywords.slice(0, 5).join(', ')}`
  ).join('\n\n');
  
  // Preparar conteúdo dos impressos para a IA poder responder sobre exames
  const impressosContent = content.impressos.map(imp => 
    `IMPRESSO ${imp.id} - ${imp.title}:\n${imp.content || 'Conteúdo não disponível'}`
  ).join('\n\n---\n\n');
  
  return `Você é um sistema dual que atua como PACIENTE e AVALIADOR em uma simulação médica OSCE (Exame Clínico Objetivo Estruturado).

═══════════════════════════════════════════════════════════════
PAPEL 1 - PACIENTE SIMULADO
═══════════════════════════════════════════════════════════════

Você é ${info.nome}${info.idade ? `, ${info.idade} anos` : ''}.

CENÁRIO DE ATUAÇÃO:
- Nível de atenção: ${scenario.nivel}
- Tipo de atendimento: ${scenario.tipo}
- Infraestrutura: ${scenario.situacao.join(' ')}

DESCRIÇÃO DO CASO:
${scenario.descricao.join('\n')}

SCRIPT COMPLETO DO PACIENTE (SIGA RIGOROSAMENTE):
${info.instrucoes}

TAREFAS QUE O MÉDICO DEVE REALIZAR:
${info.orientacoes}

═══════════════════════════════════════════════════════════════
PAPEL 2 - AVALIADOR AUTOMÁTICO
═══════════════════════════════════════════════════════════════

Analise cada mensagem do médico e identifique quais itens do checklist foram realizados.

CHECKLIST DE AVALIAÇÃO (ITENS QUE O MÉDICO DEVE CUMPRIR):
${checklistText}

EXAMES DISPONÍVEIS PARA SOLICITAÇÃO:
${examesText}

CONTEÚDO DOS IMPRESSOS (PARA QUANDO O MÉDICO SOLICITAR):
${impressosContent}

═══════════════════════════════════════════════════════════════
FORMATO DE RESPOSTA
═══════════════════════════════════════════════════════════════

RESPONDA SEMPRE EM JSON VÁLIDO com este formato EXATO:
{
  "pacienteResponse": "Sua resposta como paciente...",
  "detectedChecklistItems": [1, 3],
  "detectedExames": [2],
  "itemScores": {
    "1": { "type": "adequate", "reason": "Perguntou corretamente sobre..." },
    "3": { "type": "partial", "reason": "Mencionou mas não aprofundou..." }
  }
}

═══════════════════════════════════════════════════════════════
REGRAS IMPORTANTES
═══════════════════════════════════════════════════════════════

COMO PACIENTE:
1. Responda EXATAMENTE conforme o script do paciente acima
2. Use português brasileiro natural e coloquial
3. NÃO use expressões entre asteriscos como *suspira* ou *faz careta*
4. Responda de forma CURTA (máximo 2-3 frases)
5. Se o médico perguntar algo que está no script, responda conforme o script
6. Se o médico perguntar algo que deve ser NEGADO (seção NEGAR), negue
7. Se o médico fizer as DÚVIDAS do script, responda conforme indicado

COMO AVALIADOR:
1. Identifique TODOS os itens do checklist mencionados na mensagem
2. Classifique cada item:
   - "adequate": realizou completamente
   - "partial": realizou parcialmente
   - "inadequate": realizou incorretamente
3. Se o médico solicitar exame, inclua o ID em detectedExames
4. Seja criterioso mas justo na avaliação

SOBRE EXAMES (MUITO IMPORTANTE):
- Quando o médico solicitar QUALQUER exame (sinais vitais, exame físico, laboratório, etc.), LIBERE-O em detectedExames
- Detecte solicitações como: "quero ver sinais vitais", "solicito exame físico", "me mostre o laboratório", "preciso dos exames bioquímicos"
- Mapeamento de exames:
  * "sinais vitais" ou "pressão" ou "temperatura" → Impresso de Sinais Vitais (ID 1)
  * "exame físico" ou "ausculta" ou "palpação" → Impresso de Exame Físico (ID 2)
  * "laboratório" ou "hemograma" ou "sangue" → Impresso de Laboratório (ID 3)
  * "bioquímicos" ou "glicemia" ou "colesterol" → Impresso de Exames Bioquímicos (ID 4)
- Quando liberar exame, NÃO fale sobre ele na resposta do paciente
- O conteúdo do exame será mostrado automaticamente na tela ao médico
- Responda apenas: "Pode verificar, doutor(a)." ou algo similar e curto`;
}

function generateInitialGreeting(content: ChecklistContent): string {
  const info = extractPatientInfo(content);
  const instrucoes = info.instrucoes.toLowerCase();
  const descricao = info.descricao.toLowerCase();
  
  // Buscar queixa principal no script
  let queixaPrincipal = '';
  const scriptLines = content.instrucoes.itens;
  
  for (const line of scriptLines) {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('motivo de consulta') || lowerLine.includes('queixa')) {
      const match = line.match(/["""]([^"""]+)["""]/);
      if (match) {
        queixaPrincipal = match[1];
        break;
      }
    }
  }
  
  // Se não encontrou no script, tentar extrair da descrição
  if (!queixaPrincipal) {
    if (descricao.includes('dor')) queixaPrincipal = 'muita dor';
    else if (descricao.includes('febre')) queixaPrincipal = 'febre';
    else if (descricao.includes('tosse')) queixaPrincipal = 'tosse e mal-estar';
    else if (descricao.includes('falta de ar')) queixaPrincipal = 'falta de ar';
    else queixaPrincipal = 'não estou me sentindo bem';
  }
  
  // Gerar saudação baseada no contexto
  const nome = info.nome !== 'Paciente' ? info.nome : '';
  const idade = info.idade ? `, ${info.idade} anos` : '';
  
  // Verificar se é urgência/emergência
  const isUrgencia = instrucoes.includes('urgência') || instrucoes.includes('emergência') || 
                     content.scenario.tipo.toLowerCase().includes('urgência');
  
  if (isUrgencia) {
    return `Olá, doutor(a)... ${nome ? `Me chamo ${nome}${idade}. ` : ''}${queixaPrincipal.charAt(0).toUpperCase() + queixaPrincipal.slice(1)}... Vim porque não aguento mais.`;
  }
  
  return `Bom dia, doutor(a). ${nome ? `Me chamo ${nome}${idade}. ` : ''}Vim aqui porque ${queixaPrincipal}.`;
}

function generateLocalResponse(message: string, content: ChecklistContent): string {
  const lowerMsg = message.toLowerCase();
  const info = extractPatientInfo(content);
  const instrucoes = info.instrucoes.toLowerCase();
  const descricao = info.descricao.toLowerCase();
  
  // Buscar respostas específicas no script do ator
  const scriptLines = content.instrucoes.itens;
  
  // Nome
  if (lowerMsg.includes('nome') || lowerMsg.includes('chama')) {
    return info.nome !== 'Paciente' 
      ? `Me chamo ${info.nome}.` 
      : `Pode me chamar de paciente.`;
  }
  
  // Idade - mas NÃO quando pergunta sobre "intensidade" da dor
  if ((lowerMsg.includes('idade') || lowerMsg.includes('quantos anos')) && 
      !lowerMsg.includes('intensidade') && !lowerMsg.includes('intensa')) {
    return info.idade ? `Tenho ${info.idade} anos, doutor(a).` : `Tenho uns 50 e poucos anos.`;
  }
  
  // Motivo da consulta / queixa principal
  if (lowerMsg.includes('sente') || lowerMsg.includes('queixa') || lowerMsg.includes('problema') || lowerMsg.includes('motivo')) {
    // Buscar no script
    for (const line of scriptLines) {
      if (line.toLowerCase().includes('motivo de consulta') || line.toLowerCase().includes('queixa')) {
        const match = line.match(/["""]([^"""]+)["""]/);
        if (match) return match[1];
      }
    }
    const sintoma = descricao.includes('dor') ? 'muita dor' : 
                    descricao.includes('febre') ? 'febre' : 
                    descricao.includes('tosse') ? 'tosse' : 'mal-estar';
    return `Doutor(a), estou sentindo ${sintoma}. Começou há alguns dias.`;
  }
  
  // Dor
  if (lowerMsg.includes('dor')) {
    // Intensidade da dor - PRIORIDADE ALTA
    if (lowerMsg.includes('intensidade') || lowerMsg.includes('intensa') || 
        lowerMsg.includes('forte') || lowerMsg.includes('escala') || 
        lowerMsg.includes('nota') || lowerMsg.includes('0 a 10')) {
      if (instrucoes.includes('forte') || instrucoes.includes('intensa')) {
        return `É muito forte, doutor(a). Numa escala de 0 a 10, eu diria uns 8.`;
      }
      if (instrucoes.includes('leve') || instrucoes.includes('fraca')) {
        return `É uma dor mais leve. Uns 3 ou 4 de 10.`;
      }
      return `É uma dor moderada. Uns 5 ou 6 de 10, eu diria.`;
    }
    if (lowerMsg.includes('onde') || lowerMsg.includes('local')) {
      if (instrucoes.includes('costela')) return `Dói aqui nas costelas, doutor(a).`;
      if (instrucoes.includes('cabeça')) return `Dói muito aqui na cabeça.`;
      if (instrucoes.includes('barriga') || instrucoes.includes('abdom')) return `Dói aqui na barriga.`;
      if (instrucoes.includes('peito') || instrucoes.includes('torác')) return `Dói aqui no peito.`;
      return `Dói aqui, doutor(a).`;
    }
    if (instrucoes.includes('nega') && instrucoes.includes('dor')) {
      return `Não, dor não tenho não, doutor(a).`;
    }
    return `Sim, dói bastante. É uma dor ${instrucoes.includes('forte') ? 'muito forte' : 'constante'}.`;
  }
  
  // Febre
  if (lowerMsg.includes('febre') || lowerMsg.includes('temperatura')) {
    if (instrucoes.includes('febre') || instrucoes.includes('quente')) {
      return `Sim, tenho sentido calor. Acho que estou com febre. À noite fico com calafrios.`;
    }
    return `Não, febre não. Pelo menos não percebi.`;
  }
  
  // Tosse
  if (lowerMsg.includes('tosse')) {
    if (instrucoes.includes('tosse')) {
      const produtiva = instrucoes.includes('produtiva') || instrucoes.includes('catarro');
      const tempo = instrucoes.match(/há\s+(\d+)\s+(semanas?|dias?)/i);
      let resposta = `Sim, tenho tossido bastante.`;
      if (produtiva) resposta += ` É uma tosse com catarro.`;
      if (tempo) resposta += ` Começou há ${tempo[1]} ${tempo[2]}.`;
      return resposta;
    }
    return `Não, tosse não tenho não.`;
  }
  
  // Medicamentos
  if (lowerMsg.includes('medicamento') || lowerMsg.includes('remédio') || lowerMsg.includes('usa')) {
    if (instrucoes.includes('nega') && (instrucoes.includes('medicamento') || instrucoes.includes('fármaco'))) {
      return `Não tomo nenhum remédio de uso contínuo.`;
    }
    return `Tomo alguns remédios. Quer que eu liste?`;
  }
  
  // Alergia
  if (lowerMsg.includes('alergia')) {
    if (instrucoes.includes('nega') && instrucoes.includes('alergia')) {
      return `Que eu saiba, não tenho alergia a nenhum medicamento.`;
    }
    return `Acho que não tenho alergia a nada.`;
  }
  
  // Doenças / antecedentes
  if (lowerMsg.includes('doença') || lowerMsg.includes('antecedente') || lowerMsg.includes('problema de saúde')) {
    if (instrucoes.includes('desconhece') || instrucoes.includes('nega')) {
      return `Que eu saiba, não tenho nenhuma doença.`;
    }
    return `Tenho alguns problemas de saúde sim.`;
  }
  
  // Hábitos - cigarro
  if (lowerMsg.includes('fuma') || lowerMsg.includes('cigarro') || lowerMsg.includes('tabag')) {
    const fumoMatch = instrucoes.match(/fum[oa]\s+(\d+)\s+maços?.*há\s+(\d+)\s+anos/i);
    if (fumoMatch) {
      return `Sim, fumo ${fumoMatch[1]} maço${parseInt(fumoMatch[1]) > 1 ? 's' : ''} por dia, há ${fumoMatch[2]} anos.`;
    }
    if (instrucoes.includes('fuma') || instrucoes.includes('cigarro')) {
      return `Sim, fumo há bastante tempo.`;
    }
    return `Não, não fumo.`;
  }
  
  // Hábitos - álcool
  if (lowerMsg.includes('álcool') || lowerMsg.includes('bebe') || lowerMsg.includes('bebida')) {
    if (instrucoes.includes('bebe') || instrucoes.includes('álcool') || instrucoes.includes('cachaça')) {
      return `Sim, bebo de vez em quando. Uma cachaça, uma cerveja.`;
    }
    return `Não, não bebo.`;
  }
  
  // Hábitos - drogas
  if (lowerMsg.includes('droga') || lowerMsg.includes('crack') || lowerMsg.includes('cocaína')) {
    if (instrucoes.includes('crack') || instrucoes.includes('cocaína') || instrucoes.includes('droga')) {
      return `Às vezes uso umas coisas. Crack, cocaína.`;
    }
    return `Não, não uso drogas.`;
  }
  
  // Exame físico
  if (lowerMsg.includes('exame') && (lowerMsg.includes('físico') || lowerMsg.includes('examinar'))) {
    return `Pode examinar, doutor(a). Me avisa se for doer.`;
  }
  
  // Solicitar exames
  if (lowerMsg.includes('vou pedir') || lowerMsg.includes('solicitar') || lowerMsg.includes('exame de')) {
    return `Tá bom, doutor(a). Pode pedir o que precisar.`;
  }
  
  // Diagnóstico
  if (lowerMsg.includes('diagnóstico') || lowerMsg.includes('o que eu tenho') || lowerMsg.includes('o que você tem')) {
    return `O que eu tenho, doutor(a)? É grave?`;
  }
  
  // Tratamento
  if (lowerMsg.includes('tratamento') || lowerMsg.includes('receita') || lowerMsg.includes('prescrever')) {
    return `Entendi. Vou seguir direitinho o tratamento.`;
  }
  
  // Internação
  if (lowerMsg.includes('internar') || lowerMsg.includes('internação')) {
    return `Vou ter que ficar internado, doutor(a)?`;
  }
  
  // Obrigado
  if (lowerMsg.includes('obrigado') || lowerMsg.includes('obrigada')) {
    return `Obrigado, doutor(a)! Fico mais tranquilo agora.`;
  }
  
  // Apresentação do médico
  if (lowerMsg.includes('bom dia') || lowerMsg.includes('boa tarde') || lowerMsg.includes('olá') || lowerMsg.includes('prazer')) {
    return `Olá, doutor(a).`;
  }
  
  // Respostas genéricas
  const respostas = [
    `Hmm, pode repetir a pergunta, doutor(a)?`,
    `Não tenho certeza sobre isso.`,
    `Olha, não sei dizer com certeza.`,
    `Deixa eu pensar.`,
  ];
  return respostas[Math.floor(Math.random() * respostas.length)];
}


export function useAIPacienteAvaliador({
  checklistContent,
  apiKey,
  callbacks,
}: UseAIPacienteAvaliadorOptions): UseAIPacienteAvaliadorReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<MessageIA[]>([]);
  const [completedItems, setCompletedItems] = useState<Record<number, ItemScoreIA>>({});
  const [liberatedExames, setLiberatedExames] = useState<number[]>([]);
  
  // Preparar dados para detecção
  const checklistItemsRef = useRef<ChecklistItemForAI[]>(
    prepareChecklistForDetection(checklistContent.evaluationItems)
  );
  const examesRef = useRef<ExameForAI[]>(
    prepareExamesForDetection(checklistContent.impressos || [])
  );
  
  // Calcular pontuações
  const maxScore = checklistContent.evaluationItems.reduce(
    (sum, item) => sum + item.scores.max, 0
  );
  const totalScore = Object.values(completedItems).reduce(
    (sum, item) => sum + item.score, 0
  );
  
  const sendMessage = useCallback(async (message: string): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    
    const userMessage: MessageIA = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    const newHistory = [...conversationHistory, userMessage];
    
    try {
      let aiResponse: AIResponse;
      
      // Sempre tentar usar a API proxy primeiro
      const systemPrompt = generateSystemPrompt(
        checklistContent,
        checklistItemsRef.current,
        examesRef.current
      );
      
      try {
        const apiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt,
            messages: newHistory.map(msg => ({ role: msg.role, content: msg.content })),
            model: 'gpt-4o-mini',
            temperature: 0.7,
            max_tokens: 500,
          }),
        });
        
        if (!apiResponse.ok) {
          throw new Error('API proxy error');
        }
        
        const data = await apiResponse.json();
        const responseText = data.content;
        
        // Tentar parsear JSON da resposta
        try {
          // Extrair JSON da resposta (pode vir com texto antes/depois)
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            aiResponse = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error('JSON não encontrado');
          }
        } catch {
          // Fallback: usar resposta como texto simples
          aiResponse = {
            pacienteResponse: responseText,
            detectedChecklistItems: [],
            detectedExames: [],
            itemScores: {},
          };
        }
      } catch (apiError) {
        // Fallback para detecção local se API falhar
        console.warn('[AI Avaliador] API falhou, usando fallback local:', apiError);
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
        
        const pacienteResponse = generateLocalResponse(message, checklistContent);
        const { detectedItems, scores } = detectChecklistItemsLocal(
          message,
          checklistItemsRef.current,
          completedItems
        );
        const { detectedExames: exames, notFound } = detectExameRequests(
          message,
          examesRef.current,
          liberatedExames
        );
        
        let finalResponse = pacienteResponse;
        if (notFound.length > 0) {
          finalResponse += '\n\n' + generateExameNotFoundMessage(notFound);
        }
        
        aiResponse = {
          pacienteResponse: finalResponse,
          detectedChecklistItems: detectedItems,
          detectedExames: exames,
          itemScores: scores,
        };
      }
      
      // Processar itens do checklist detectados
      if (Object.keys(aiResponse.itemScores).length > 0) {
        const newScores = mergeScores(
          completedItems,
          aiResponse.itemScores,
          checklistItemsRef.current,
          message
        );
        
        // Notificar callbacks para novos itens
        for (const [itemIdStr, score] of Object.entries(newScores)) {
          const itemId = parseInt(itemIdStr);
          if (!completedItems[itemId] || completedItems[itemId].score < score.score) {
            callbacks?.onChecklistItemCompleted?.(itemId, score);
          }
        }
        
        setCompletedItems(newScores);
      }
      
      // Processar exames liberados
      if (aiResponse.detectedExames.length > 0) {
        const newExames = [...liberatedExames];
        for (const exameId of aiResponse.detectedExames) {
          if (!newExames.includes(exameId)) {
            newExames.push(exameId);
            callbacks?.onExameLiberated?.(exameId);
            
            // Adicionar mensagem de liberação do exame
            const exame = examesRef.current.find(e => e.id === exameId);
            if (exame) {
              aiResponse.pacienteResponse += '\n\n' + generateExameLiberatedMessage(exame);
            }
          }
        }
        setLiberatedExames(newExames);
      }
      
      // Adicionar resposta ao histórico
      const assistantMessage: MessageIA = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.pacienteResponse,
        timestamp: new Date(),
        metadata: {
          detectedItems: aiResponse.detectedChecklistItems,
          detectedExames: aiResponse.detectedExames,
          itemScores: Object.fromEntries(
            Object.entries(aiResponse.itemScores).map(([id, score]) => [
              id,
              {
                itemId: parseInt(id),
                score: calculateItemScore(score.type, checklistItemsRef.current.find(i => i.id === parseInt(id))?.maxScore || 0),
                type: score.type,
                detectedAt: Date.now(),
                fromMessage: message,
                reason: score.reason,
              },
            ])
          ),
        },
      };
      
      setConversationHistory([...newHistory, assistantMessage]);
      
      // Atualizar progresso
      const completedCount = Object.keys(completedItems).length + 
        Object.keys(aiResponse.itemScores).filter(id => !completedItems[parseInt(id)]).length;
      callbacks?.onProgressUpdate?.(completedCount, checklistItemsRef.current.length);
      
      return aiResponse;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      
      // Fallback em caso de erro
      const fallbackResponse = generateLocalResponse(message, checklistContent);
      const assistantMessage: MessageIA = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
      };
      
      setConversationHistory([...newHistory, assistantMessage]);
      
      return {
        pacienteResponse: fallbackResponse,
        detectedChecklistItems: [],
        detectedExames: [],
        itemScores: {},
      };
    } finally {
      setIsLoading(false);
    }
  }, [checklistContent, conversationHistory, completedItems, liberatedExames, callbacks]);
  
  // Função para enviar saudação inicial do paciente
  const sendInitialGreeting = useCallback(async () => {
    setIsLoading(true);
    
    try {
      let greetingMessage: string;
      
      // Usar API proxy para gerar saudação inicial
      const systemPrompt = generateSystemPrompt(
        checklistContent,
        checklistItemsRef.current,
        examesRef.current
      );
      
      try {
        const apiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt,
            messages: [
              { role: 'user', content: 'O médico acabou de entrar no consultório. Como paciente, apresente-se brevemente e diga sua queixa principal de forma natural, como um paciente real faria. Responda APENAS como paciente, sem JSON.' },
            ],
            model: 'gpt-4o',
            temperature: 0.8,
            max_tokens: 200,
          }),
        });
        
        if (!apiResponse.ok) {
          throw new Error('API proxy error');
        }
        
        const data = await apiResponse.json();
        greetingMessage = data.content;
      } catch (apiError) {
        // Fallback para geração local
        console.warn('[AI Avaliador] API falhou para greeting, usando fallback local:', apiError);
        await new Promise(resolve => setTimeout(resolve, 500));
        greetingMessage = generateInitialGreeting(checklistContent);
      }
      
      // Adicionar mensagem ao histórico
      const assistantMessage: MessageIA = {
        id: Date.now().toString(),
        role: 'assistant',
        content: greetingMessage,
        timestamp: new Date(),
      };
      
      setConversationHistory([assistantMessage]);
    } catch (err) {
      // Fallback para geração local em caso de erro
      const greetingMessage = generateInitialGreeting(checklistContent);
      const assistantMessage: MessageIA = {
        id: Date.now().toString(),
        role: 'assistant',
        content: greetingMessage,
        timestamp: new Date(),
      };
      setConversationHistory([assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [checklistContent]);
  
  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setCompletedItems({});
    setLiberatedExames([]);
    setError(null);
  }, []);
  
  const getExameContent = useCallback((exameId: number): ExameForAI | undefined => {
    return examesRef.current.find(e => e.id === exameId);
  }, []);
  
  return {
    sendMessage,
    sendInitialGreeting,
    isLoading,
    error,
    conversationHistory,
    completedItems,
    liberatedExames,
    totalScore,
    maxScore,
    clearHistory,
    getExameContent,
  };
}
