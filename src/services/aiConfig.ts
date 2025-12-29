// Configuração centralizada para APIs de IA

// Inicializa a API key no localStorage se não existir
function initializeApiKey(): void {
  const existingKey = localStorage.getItem('openai_api_key');
  if (!existingKey) {
    const envKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (envKey) {
      localStorage.setItem('openai_api_key', envKey);
      console.log('[AI Config] API Key inicializada do .env para localStorage');
    }
  }
}

// Executa inicialização
initializeApiKey();

// Chave da API OpenAI
// Prioridade: 1. localStorage, 2. variável de ambiente
export function getOpenAIApiKey(): string {
  // Primeiro tenta do localStorage
  const localKey = localStorage.getItem('openai_api_key');
  if (localKey) {
    return localKey;
  }
  
  // Depois tenta da variável de ambiente
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (envKey) {
    // Salva no localStorage para garantir persistência
    localStorage.setItem('openai_api_key', envKey);
    return envKey;
  }
  
  console.warn('[AI Config] Nenhuma API Key encontrada - configure VITE_OPENAI_API_KEY no .env');
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
