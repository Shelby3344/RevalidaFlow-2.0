// Configuração centralizada para APIs de IA

// API Key hardcoded como fallback (para quando .env não carrega)
const FALLBACK_API_KEY = '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';

// Chave da API OpenAI
// Prioridade: 1. localStorage, 2. variável de ambiente, 3. fallback hardcoded
export function getOpenAIApiKey(): string {
  // Primeiro tenta do localStorage (configurado pelo usuário)
  const localKey = localStorage.getItem('openai_api_key');
  if (localKey) {
    console.log('[AI Config] API Key carregada do localStorage');
    return localKey;
  }
  
  // Depois tenta da variável de ambiente
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envKey) {
    console.log('[AI Config] API Key carregada do .env');
    return envKey;
  }
  
  // Fallback para key hardcoded
  if (FALLBACK_API_KEY) {
    console.log('[AI Config] API Key carregada do fallback hardcoded');
    return FALLBACK_API_KEY;
  }
  
  console.log('[AI Config] Nenhuma API Key encontrada');
  return '';
}

// Salva a API key no localStorage
export function setOpenAIApiKey(key: string): void {
  if (key) {
    localStorage.setItem('openai_api_key', key);
  } else {
    localStorage.removeItem('openai_api_key');
  }
}

// Verifica se há uma API key configurada
export function hasOpenAIApiKey(): boolean {
  return !!getOpenAIApiKey();
}

// Configurações padrão para a API
export const AI_CONFIG = {
  model: 'gpt-4o-mini', // Modelo mais barato e rápido
  maxTokens: 1000,
  temperature: 0.7,
  voice: 'nova' as const, // Voz feminina natural
  ttsModel: 'tts-1-hd', // Modelo de TTS HD para maior qualidade
  useHDVoice: true, // Usar TTS HD por padrão
};
