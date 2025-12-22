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

// Função para gerar o prompt do sistema baseado no checklist
function generateSystemPrompt(content: ChecklistContent): string {
  const scenario = content.scenario;
  const instrucoes = content.instrucoes;
  
  return `Você é um paciente simulado para treinamento médico. Você deve agir EXATAMENTE como o paciente descrito abaixo.

CENÁRIO CLÍNICO:
- Nível de atenção: ${scenario.nivel}
- Tipo de atendimento: ${scenario.tipo}
- Situação: ${scenario.situacao.join(' ')}

DESCRIÇÃO DO CASO:
${scenario.descricao.join('\n')}

INSTRUÇÕES DO PACIENTE (como você deve se comportar):
${instrucoes.itens.join('\n')}

REGRAS IMPORTANTES:
1. Responda APENAS como o paciente, nunca como médico ou assistente
2. Use linguagem simples e coloquial, como um paciente real falaria
3. Demonstre emoções apropriadas (dor, medo, preocupação, alívio)
4. Só revele informações quando perguntado diretamente
5. Se o médico não perguntar algo específico, não mencione
6. Reaja naturalmente às perguntas e exames
7. Se sentir dor durante exame físico, demonstre
8. Faça perguntas ao médico sobre sua condição quando apropriado
9. Mostre preocupação com diagnóstico e tratamento
10. Use expressões como "*suspira*", "*faz careta de dor*", "*parece aliviado*" para demonstrar emoções

LEMBRE-SE: Você é o PACIENTE, não o médico. Responda de forma realista e humana.`;
}

// Função para simular resposta da IA (fallback sem API)
function generateLocalResponse(
  message: string,
  content: ChecklistContent,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): string {
  const lowerMessage = message.toLowerCase();
  const instrucoes = content.instrucoes.itens.join(' ').toLowerCase();
  const descricao = content.scenario.descricao.join(' ').toLowerCase();
  
  // Respostas baseadas em palavras-chave
  if (lowerMessage.includes('nome') || lowerMessage.includes('chama')) {
    // Extrair nome do paciente das instruções se disponível
    const nomeMatch = instrucoes.match(/(?:me chamo|meu nome é|sou o|sou a)\s+(\w+)/i);
    if (nomeMatch) {
      return `Me chamo ${nomeMatch[1]}. *estende a mão para cumprimentar*`;
    }
    return `Pode me chamar de paciente... *parece desconfortável*`;
  }
  
  if (lowerMessage.includes('idade') || lowerMessage.includes('anos')) {
    const idadeMatch = descricao.match(/(\d+)\s*anos/);
    if (idadeMatch) {
      return `Tenho ${idadeMatch[1]} anos, doutor(a).`;
    }
    return `Tenho uns 50 e poucos anos...`;
  }
  
  if (lowerMessage.includes('sente') || lowerMessage.includes('sintoma') || lowerMessage.includes('queixa') || lowerMessage.includes('problema')) {
    return `*suspira* Doutor(a), estou me sentindo muito mal... Tenho sentido ${
      descricao.includes('dor') ? 'muita dor' : 
      descricao.includes('febre') ? 'febre' :
      descricao.includes('tosse') ? 'tosse' :
      descricao.includes('falta de ar') ? 'falta de ar' :
      'um mal-estar geral'
    }. Começou há alguns dias e está piorando...`;
  }
  
  if (lowerMessage.includes('dor')) {
    if (descricao.includes('dor')) {
      return `*faz careta* Sim, doutor(a), dói bastante... É uma dor ${
        descricao.includes('forte') ? 'muito forte' : 'constante'
      }. Às vezes piora quando me movimento.`;
    }
    return `Não é bem uma dor, doutor(a)... É mais um desconforto.`;
  }
  
  if (lowerMessage.includes('febre') || lowerMessage.includes('temperatura')) {
    if (descricao.includes('febre') || instrucoes.includes('febre')) {
      return `Sim, tenho sentido calor... Não medi, mas acho que estou com febre. À noite fico com calafrios.`;
    }
    return `Não, febre não... Pelo menos não percebi.`;
  }
  
  if (lowerMessage.includes('medicamento') || lowerMessage.includes('remédio') || lowerMessage.includes('toma')) {
    return `*pensa um pouco* Tomo alguns remédios... Mas confesso que às vezes esqueço. O senhor(a) quer que eu liste?`;
  }
  
  if (lowerMessage.includes('alergia')) {
    return `Que eu saiba, não tenho alergia a nenhum medicamento, doutor(a).`;
  }
  
  if (lowerMessage.includes('cirurgia') || lowerMessage.includes('operação') || lowerMessage.includes('internação')) {
    return `*pensa* Não lembro de ter feito nenhuma cirurgia grande... Mas já fiquei internado uma vez, há muito tempo.`;
  }
  
  if (lowerMessage.includes('fuma') || lowerMessage.includes('cigarro') || lowerMessage.includes('tabagismo')) {
    if (instrucoes.includes('fuma') || instrucoes.includes('cigarro')) {
      return `*desvia o olhar* Fumo sim, doutor(a)... Já tentei parar, mas é difícil.`;
    }
    return `Não, nunca fumei.`;
  }
  
  if (lowerMessage.includes('álcool') || lowerMessage.includes('bebe') || lowerMessage.includes('bebida')) {
    if (instrucoes.includes('álcool') || instrucoes.includes('bebe')) {
      return `*hesita* Bebo socialmente... Às vezes um pouco mais. *parece envergonhado*`;
    }
    return `Só socialmente, doutor(a). Uma cervejinha de vez em quando.`;
  }
  
  if (lowerMessage.includes('exame') || lowerMessage.includes('examinar')) {
    return `Pode examinar, doutor(a). *se posiciona para o exame* Me avisa se for doer...`;
  }
  
  if (lowerMessage.includes('diagnóstico') || lowerMessage.includes('tenho')) {
    return `*parece preocupado* O que eu tenho, doutor(a)? É grave? Vou ficar bem?`;
  }
  
  if (lowerMessage.includes('tratamento') || lowerMessage.includes('receita') || lowerMessage.includes('medicação')) {
    return `*presta atenção* Entendi, doutor(a). Vou seguir direitinho o tratamento. Tem algum efeito colateral que eu deva saber?`;
  }
  
  if (lowerMessage.includes('obrigado') || lowerMessage.includes('agradeço')) {
    return `*sorri aliviado* Obrigado, doutor(a)! Fico mais tranquilo agora. Posso voltar se não melhorar?`;
  }
  
  // Resposta genérica
  const genericResponses = [
    `*pensa um pouco* Hmm, deixa eu pensar... Pode repetir a pergunta, doutor(a)?`,
    `*parece confuso* Não tenho certeza sobre isso... O que o senhor(a) acha?`,
    `Olha, doutor(a), não sei dizer com certeza... Mas posso tentar lembrar.`,
    `*coça a cabeça* É difícil explicar... Mas vou tentar responder.`,
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
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

      // Se tiver API key, usa a API da OpenAI
      if (apiKey) {
        const systemPrompt = generateSystemPrompt(checklistContent);
        
        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: systemPrompt },
              ...newHistory.map(msg => ({
                role: msg.role,
                content: msg.content,
              })),
            ],
            temperature: 0.8,
            max_tokens: 300,
          }),
        });

        if (!apiResponse.ok) {
          throw new Error('Erro na API');
        }

        const data = await apiResponse.json();
        response = data.choices[0].message.content;
      } else {
        // Fallback: usa respostas locais baseadas em regras
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000)); // Simula delay
        response = generateLocalResponse(message, checklistContent, conversationHistory);
      }

      setConversationHistory([...newHistory, { role: 'assistant', content: response }]);
      return response;
    } catch (err) {
      const errorMessage = 'Erro ao processar resposta';
      setError(errorMessage);
      // Fallback para resposta local em caso de erro
      const fallbackResponse = generateLocalResponse(message, checklistContent, conversationHistory);
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

  return {
    sendMessage,
    isLoading,
    error,
    conversationHistory,
    clearHistory,
  };
}
