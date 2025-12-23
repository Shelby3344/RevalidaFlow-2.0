import { useState, useCallback } from 'react';
import { ChecklistContent } from '@/types/checklists';

interface UseAIPacienteOptions {
  checklistContent: ChecklistContent;
  apiKey?: string;
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
  
  return `Você é um paciente simulado chamado ${info.nome}${info.idade ? `, ${info.idade} anos` : ''}.

CENÁRIO: ${scenario.nivel} - ${scenario.tipo}
${scenario.descricao.join('\n')}

SCRIPT DO PACIENTE:
${instrucoes.itens.join('\n')}

REGRAS:
1. Responda APENAS como paciente, nunca como médico
2. Use linguagem simples e coloquial brasileira
3. Demonstre emoções: dor, medo, preocupação
4. Só revele informações quando perguntado
5. Use expressões como *suspira*, *faz careta de dor*
6. Responda de forma CURTA e NATURAL`;
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
    if (info.queixaPrincipal) return `*suspira* ${info.queixaPrincipal}`;
    const sintoma = descricao.includes('dor') ? 'muita dor' : 
                    descricao.includes('febre') ? 'febre' : 
                    descricao.includes('tosse') ? 'tosse' : 'mal-estar';
    return `*suspira* Doutor(a), estou sentindo ${sintoma}. Começou há alguns dias...`;
  }
  
  if (lowerMsg.includes('dor')) {
    if (lowerMsg.includes('onde') || lowerMsg.includes('local')) {
      if (instrucoes.includes('costela')) return `*aponta* Dói aqui nas costelas, doutor(a). *faz careta*`;
      if (instrucoes.includes('cabeça')) return `*leva a mão à cabeça* Dói muito aqui.`;
      if (instrucoes.includes('barriga')) return `*aponta para a barriga* Dói aqui. *faz careta*`;
      return `*aponta* Dói aqui, doutor(a)... *faz careta de dor*`;
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


export function useAIPaciente({ checklistContent, apiKey }: UseAIPacienteOptions): UseAIPacienteReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const sendMessage = useCallback(async (message: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    const newHistory = [...conversationHistory, { role: 'user' as const, content: message }];

    try {
      let response: string;

      if (apiKey) {
        const systemPrompt = generateSystemPrompt(checklistContent);
        
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
            max_tokens: 200,
          }),
        });

        if (!apiResponse.ok) throw new Error('Erro na API');

        const data = await apiResponse.json();
        response = data.choices[0].message.content;
      } else {
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
        response = generateLocalResponse(message, checklistContent);
      }

      setConversationHistory([...newHistory, { role: 'assistant', content: response }]);
      return response;
    } catch {
      setError('Erro ao processar resposta');
      const fallbackResponse = generateLocalResponse(message, checklistContent);
      setConversationHistory([...newHistory, { role: 'assistant', content: fallbackResponse }]);
      return fallbackResponse;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, checklistContent, conversationHistory]);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setError(null);
  }, []);

  return { sendMessage, isLoading, error, conversationHistory, clearHistory };
}
