import { useState, useCallback } from 'react';
import { ChecklistContent } from '@/types/checklists';

interface UseAIPacienteOptions {
  checklistContent: ChecklistContent;
}

interface UseAIPacienteReturn {
  sendMessage: (message: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  clearHistory: () => void;
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
  
  let queixaPrincipal = '';
  const queixaMatch = instrucoes.match(/MOTIVO DE CONSULTA[:\s]*[-\s]*([\s\S]*?)(?=\*\*|$)/i);
  if (queixaMatch) queixaPrincipal = queixaMatch[1].trim();

  return { nome, idade, queixaPrincipal, instrucoes, descricao };
}


function generateSystemPrompt(content: ChecklistContent): string {
  const info = extractPatientInfo(content);
  const scenario = content.scenario;
  const instrucoes = content.instrucoes;
  
  return `Você é um paciente simulado para treinamento médico. Seu papel é interpretar o paciente descrito abaixo de forma realista.

DADOS DO PACIENTE:
- Nome: ${info.nome}
- Idade: ${info.idade || 'não especificada'}
- Cenário: ${scenario.nivel} - ${scenario.tipo}

DESCRIÇÃO DO CASO:
${scenario.descricao.join('\n')}

INFORMAÇÕES DO PACIENTE (use para responder perguntas):
${instrucoes.itens.join('\n')}

REGRAS IMPORTANTES:
1. Você é o PACIENTE, não o médico. Nunca dê diagnósticos ou prescrições.
2. Responda de forma CURTA e NATURAL, como um paciente real falaria.
3. Use linguagem simples e coloquial brasileira.
4. Demonstre emoções apropriadas: dor, medo, preocupação, alívio.
5. Só revele informações quando o médico perguntar especificamente.
6. Use expressões entre asteriscos para ações: *suspira*, *faz careta de dor*, *pensa*
7. Se não souber algo, diga que não sabe ou não lembra.
8. Mantenha consistência com as informações do caso clínico.
9. Responda APENAS o que foi perguntado, não antecipe informações.
10. Máximo de 2-3 frases por resposta.`;
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
  
  if ((lowerMsg.includes('idade') || lowerMsg.includes('quantos anos')) && !lowerMsg.includes('intensidade')) {
    return info.idade ? `Tenho ${info.idade} anos, doutor(a).` : `Tenho uns 50 e poucos anos...`;
  }
  
  if (lowerMsg.includes('sente') || lowerMsg.includes('queixa') || lowerMsg.includes('problema')) {
    if (info.queixaPrincipal) return `*suspira* ${info.queixaPrincipal}`;
    const sintoma = descricao.includes('dor') ? 'muita dor' : 
                    descricao.includes('febre') ? 'febre' : 
                    descricao.includes('tosse') ? 'tosse' : 'mal-estar';
    return `*suspira* Doutor(a), estou sentindo ${sintoma}. Começou há alguns dias...`;
  }
  
  if (lowerMsg.includes('dor')) {
    if (lowerMsg.includes('intensidade') || lowerMsg.includes('forte') || lowerMsg.includes('escala') || lowerMsg.includes('nota')) {
      if (instrucoes.includes('forte') || instrucoes.includes('intensa')) {
        return `*faz careta* É muito forte, doutor(a)... Numa escala de 0 a 10, eu diria uns 8. *geme baixinho*`;
      }
      if (instrucoes.includes('leve') || instrucoes.includes('fraca')) {
        return `É uma dor mais leve... Uns 3 ou 4 de 10. Mas incomoda bastante.`;
      }
      return `*pensa* É uma dor moderada... Uns 5 ou 6 de 10, eu diria. Às vezes piora.`;
    }
    if (lowerMsg.includes('onde') || lowerMsg.includes('local')) {
      if (instrucoes.includes('costela')) return `*aponta* Dói aqui nas costelas, doutor(a). *faz careta*`;
      if (instrucoes.includes('cabeça')) return `*leva a mão à cabeça* Dói muito aqui.`;
      if (instrucoes.includes('barriga') || instrucoes.includes('abdom')) return `*aponta para a barriga* Dói aqui. *faz careta*`;
      if (instrucoes.includes('peito') || instrucoes.includes('tórax')) return `*leva a mão ao peito* Dói aqui no peito, doutor(a).`;
      return `*aponta* Dói aqui, doutor(a)... *faz careta de dor*`;
    }
    if (lowerMsg.includes('quando') || lowerMsg.includes('começou') || lowerMsg.includes('tempo')) {
      return `*pensa* Começou há alguns dias... Uns 3 ou 4 dias, mais ou menos.`;
    }
    if (lowerMsg.includes('piora') || lowerMsg.includes('melhora')) {
      return `*pensa* Piora quando me movimento... Melhora um pouco quando fico quieto.`;
    }
    if (descricao.includes('dor')) {
      return `*faz careta* Sim, dói bastante... É uma dor ${instrucoes.includes('forte') ? 'muito forte' : 'constante'}.`;
    }
    return `Não é bem uma dor... É mais um desconforto.`;
  }
  
  if (lowerMsg.includes('febre') || lowerMsg.includes('temperatura')) {
    if (descricao.includes('febre') || instrucoes.includes('febre')) {
      return `Sim, tenho sentido calor... Acho que estou com febre. À noite fico com calafrios.`;
    }
    return `Não, febre não... Pelo menos não percebi.`;
  }
  
  if (lowerMsg.includes('tosse')) {
    if (instrucoes.includes('tosse')) {
      if (instrucoes.includes('catarro')) return `*tosse* Sim, e sai um catarro amarelado.`;
      return `*tosse* Sim, estou tossindo bastante.`;
    }
    return `Não, tosse não tenho.`;
  }
  
  if (lowerMsg.includes('medicamento') || lowerMsg.includes('remédio')) {
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


export function useAIPaciente({ checklistContent }: UseAIPacienteOptions): UseAIPacienteReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const sendMessage = useCallback(async (message: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    const newHistory = [...conversationHistory, { role: 'user' as const, content: message }];

    try {
      const systemPrompt = generateSystemPrompt(checklistContent);
      
      // Usar API proxy para evitar CORS e expor API key
      const apiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          messages: newHistory.map(msg => ({ role: msg.role, content: msg.content })),
        }),
      });

      let response: string;

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        response = data.content;
      } else {
        // Fallback para respostas locais se API falhar
        console.warn('[AI Paciente] API falhou, usando fallback local');
        response = generateLocalResponse(message, checklistContent);
      }

      setConversationHistory([...newHistory, { role: 'assistant', content: response }]);
      return response;
    } catch (err) {
      console.error('[AI Paciente] Erro:', err);
      setError('Erro ao processar resposta');
      const fallbackResponse = generateLocalResponse(message, checklistContent);
      setConversationHistory([...newHistory, { role: 'assistant', content: fallbackResponse }]);
      return fallbackResponse;
    } finally {
      setIsLoading(false);
    }
  }, [checklistContent, conversationHistory]);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setError(null);
  }, []);

  return { sendMessage, isLoading, error, conversationHistory, clearHistory };
}
