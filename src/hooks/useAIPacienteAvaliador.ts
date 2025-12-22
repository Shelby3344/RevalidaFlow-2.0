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
  
  let nome = 'Paciente';
  const nomeMatch = instrucoes.match(/(?:me chamo|meu nome é|sou o|sou a|DADOS PESSOAIS[:\s]*[-\s]*)?([A-Z][a-záéíóúãõâêîôû]+)/i);
  if (nomeMatch) nome = nomeMatch[1];
  
  let idade = '';
  const idadeMatch = descricao.match(/(\d+)\s*anos/i) || instrucoes.match(/(\d+)\s*anos/i);
  if (idadeMatch) idade = idadeMatch[1];
  
  return { nome, idade, instrucoes, descricao };
}


function generateSystemPrompt(content: ChecklistContent, checklistItems: ChecklistItemForAI[], exames: ExameForAI[]): string {
  const info = extractPatientInfo(content);
  const scenario = content.scenario;
  const instrucoes = content.instrucoes;
  
  const checklistText = checklistItems.map(item => 
    `${item.id}. ${item.description} (palavras-chave: ${item.keywords.slice(0, 5).join(', ')})`
  ).join('\n');
  
  const examesText = exames.map(e => 
    `${e.id}. ${e.title} (palavras-chave: ${e.keywords.slice(0, 3).join(', ')})`
  ).join('\n');
  
  return `Você é um sistema dual que atua como PACIENTE e AVALIADOR em uma simulação médica OSCE.

PAPEL 1 - PACIENTE:
Você é ${info.nome}${info.idade ? `, ${info.idade} anos` : ''}.

CENÁRIO: ${scenario.nivel} - ${scenario.tipo}
${scenario.descricao.join('\n')}

SCRIPT DO PACIENTE:
${instrucoes.itens.join('\n')}

PAPEL 2 - AVALIADOR:
Analise cada mensagem do médico e identifique quais itens do checklist foram realizados.

CHECKLIST DE AVALIAÇÃO:
${checklistText}

EXAMES DISPONÍVEIS:
${examesText}

RESPONDA SEMPRE EM JSON VÁLIDO com este formato:
{
  "pacienteResponse": "Sua resposta como paciente...",
  "detectedChecklistItems": [1, 3],
  "detectedExames": [2],
  "itemScores": {
    "1": { "type": "adequate", "reason": "Perguntou corretamente sobre..." },
    "3": { "type": "partial", "reason": "Mencionou mas não aprofundou..." }
  }
}

REGRAS:
1. Responda como paciente de forma NATURAL e REALISTA em português brasileiro
2. Use expressões como *suspira*, *faz careta*, *parece preocupado*
3. Identifique TODOS os itens do checklist mencionados na mensagem
4. Classifique: adequate (completo), partial (incompleto), inadequate (incorreto)
5. Se o médico solicitar exame, inclua o ID em detectedExames
6. Mantenha consistência com o histórico da conversa
7. Responda de forma CURTA (máximo 2-3 frases como paciente)`;
}

function generateLocalResponse(message: string, content: ChecklistContent): string {
  const lowerMsg = message.toLowerCase();
  const info = extractPatientInfo(content);
  const instrucoes = info.instrucoes.toLowerCase();
  const descricao = info.descricao.toLowerCase();
  
  if (lowerMsg.includes('nome') || lowerMsg.includes('chama')) {
    return info.nome !== 'Paciente' 
      ? `Me chamo ${info.nome}. *estende a mão*` 
      : `Pode me chamar de paciente...`;
  }
  
  if (lowerMsg.includes('idade') || lowerMsg.includes('anos')) {
    return info.idade ? `Tenho ${info.idade} anos, doutor(a).` : `Tenho uns 50 e poucos anos...`;
  }
  
  if (lowerMsg.includes('sente') || lowerMsg.includes('queixa') || lowerMsg.includes('problema')) {
    const sintoma = descricao.includes('dor') ? 'muita dor' : 
                    descricao.includes('febre') ? 'febre' : 
                    descricao.includes('tosse') ? 'tosse' : 'mal-estar';
    return `*suspira* Doutor(a), estou sentindo ${sintoma}. Começou há alguns dias...`;
  }
  
  if (lowerMsg.includes('dor')) {
    if (lowerMsg.includes('onde') || lowerMsg.includes('local')) {
      if (instrucoes.includes('costela')) return `*aponta* Dói aqui nas costelas, doutor(a). *faz careta*`;
      if (instrucoes.includes('cabeça')) return `*leva a mão à cabeça* Dói muito aqui.`;
      if (instrucoes.includes('barriga') || instrucoes.includes('abdom')) return `*aponta para a barriga* Dói aqui. *faz careta*`;
      return `*aponta* Dói aqui, doutor(a)... *faz careta de dor*`;
    }
    return `*faz careta* Sim, dói bastante... É uma dor ${instrucoes.includes('forte') ? 'muito forte' : 'constante'}.`;
  }
  
  if (lowerMsg.includes('febre') || lowerMsg.includes('temperatura')) {
    if (descricao.includes('febre') || instrucoes.includes('febre')) {
      return `Sim, tenho sentido calor... Acho que estou com febre. À noite fico com calafrios.`;
    }
    return `Não, febre não... Pelo menos não percebi.`;
  }
  
  if (lowerMsg.includes('medicamento') || lowerMsg.includes('remédio') || lowerMsg.includes('usa')) {
    if (instrucoes.includes('nega')) return `Não tomo nenhum remédio de uso contínuo.`;
    return `*pensa* Tomo alguns remédios... Quer que eu liste?`;
  }
  
  if (lowerMsg.includes('alergia')) {
    return `Que eu saiba, não tenho alergia a nenhum medicamento.`;
  }
  
  if (lowerMsg.includes('exame') || lowerMsg.includes('examinar')) {
    return `Pode examinar, doutor(a). *se posiciona* Me avisa se for doer...`;
  }
  
  if (lowerMsg.includes('diagnóstico') || lowerMsg.includes('o que eu tenho')) {
    return `*parece preocupado* O que eu tenho, doutor(a)? É grave?`;
  }
  
  if (lowerMsg.includes('tratamento') || lowerMsg.includes('receita')) {
    return `*presta atenção* Entendi. Vou seguir direitinho o tratamento.`;
  }
  
  if (lowerMsg.includes('obrigado')) {
    return `*sorri aliviado* Obrigado, doutor(a)! Fico mais tranquilo agora.`;
  }
  
  const respostas = [
    `*pensa* Hmm, pode repetir a pergunta, doutor(a)?`,
    `*parece confuso* Não tenho certeza sobre isso...`,
    `Olha, não sei dizer com certeza...`,
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
      
      if (apiKey) {
        // Usar API da OpenAI
        const systemPrompt = generateSystemPrompt(
          checklistContent,
          checklistItemsRef.current,
          examesRef.current
        );
        
        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...newHistory.map(msg => ({ role: msg.role, content: msg.content })),
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });
        
        if (!apiResponse.ok) {
          throw new Error('Erro na API OpenAI');
        }
        
        const data = await apiResponse.json();
        const responseText = data.choices[0].message.content;
        
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
      } else {
        // Usar detecção local (fallback)
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
  }, [apiKey, checklistContent, conversationHistory, completedItems, liberatedExames, callbacks]);
  
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
