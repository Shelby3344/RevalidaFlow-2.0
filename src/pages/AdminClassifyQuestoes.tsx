import { useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Loader2, Play, Download, CheckCircle2, AlertCircle, Key } from 'lucide-react';

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

interface ClassificationResult {
  id: number;
  tema: string;
  subtema: string;
  error?: string;
}

export default function AdminClassifyQuestoes() {
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [classifications, setClassifications] = useState<Record<number, ClassificationResult>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, classified: 0, errors: 0 });
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openrouter_api_key') || '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');

  // Carregar questões do JSON
  const loadQuestoes = useCallback(async () => {
    try {
      const response = await fetch('/questoes-json/questoes_revalida.json');
      const data = await response.json();
      setQuestoes(data);
      setStats({ total: data.length, classified: 0, errors: 0 });
      
      // Carregar classificações existentes do localStorage
      const saved = localStorage.getItem('questoes_classifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        setClassifications(parsed);
        const classifiedCount = Object.values(parsed).filter((c: any) => c.tema).length;
        const errorCount = Object.values(parsed).filter((c: any) => c.error).length;
        setStats(prev => ({ ...prev, classified: classifiedCount, errors: errorCount }));
      }
    } catch (e) {
      setError('Erro ao carregar questões');
    }
  }, []);

  // Classificar uma questão diretamente via OpenRouter
  const classifyQuestion = useCallback(async (questao: any): Promise<ClassificationResult> => {
    if (!apiKey) {
      return { id: questao.id, tema: '', subtema: '', error: 'API Key não configurada' };
    }

    const prompt = `Classifique esta questão médica em TEMA e SUBTEMA baseado na taxonomia.

TAXONOMIA:
${TAXONOMY}

QUESTÃO:
Especialidade: ${questao.especialidade || 'Não informada'}
Enunciado: ${(questao.enunciado || '').substring(0, 1000)}

Responda APENAS em JSON: {"tema": "Nome do Tema", "subtema": "Nome do Subtema"}`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Revalida Flow - Classificador de Questões',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Você classifica questões médicas. Responda apenas em JSON válido.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.1,
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content.trim();
      
      // Limpar marcadores de código
      if (content.startsWith('```')) {
        content = content.split('\n').slice(1).join('\n');
      }
      if (content.endsWith('```')) {
        content = content.slice(0, -3);
      }
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const classification = JSON.parse(content);
      return {
        id: questao.id,
        tema: classification.tema || '',
        subtema: classification.subtema || '',
      };
    } catch (e) {
      return {
        id: questao.id,
        tema: '',
        subtema: '',
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }, [apiKey]);

  // Executar classificação
  const runClassification = useCallback(async () => {
    if (!apiKey) {
      setError('Configure sua API Key da OpenAI primeiro');
      return;
    }

    if (questoes.length === 0) {
      await loadQuestoes();
      return;
    }

    // Salvar API key
    localStorage.setItem('openrouter_api_key', apiKey);

    setIsRunning(true);
    setError(null);

    const unclassified = questoes.filter(q => !classifications[q.id]?.tema);
    
    let newClassifications = { ...classifications };
    let classified = stats.classified;
    let errors = stats.errors;

    for (let i = 0; i < unclassified.length; i++) {
      const questao = unclassified[i];
      setCurrentBatch(i + 1);
      setProgress(((i + 1) / unclassified.length) * 100);

      const result = await classifyQuestion(questao);
      
      newClassifications[result.id] = result;
      if (result.tema) {
        classified++;
      }
      if (result.error) {
        errors++;
      }

      setClassifications({ ...newClassifications });
      setStats({ total: questoes.length, classified, errors });

      // Salvar progresso no localStorage a cada 10 questões
      if (i % 10 === 0) {
        localStorage.setItem('questoes_classifications', JSON.stringify(newClassifications));
      }

      // Delay entre requisições para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Salvar progresso final
    localStorage.setItem('questoes_classifications', JSON.stringify(newClassifications));

    setIsRunning(false);
    setProgress(100);
  }, [questoes, classifications, classifyQuestion, loadQuestoes, stats, apiKey]);

  // Exportar JSON classificado
  const exportClassified = useCallback(() => {
    const classifiedQuestoes = questoes.map(q => ({
      ...q,
      tema: classifications[q.id]?.tema || '',
      subtema: classifications[q.id]?.subtema || '',
    }));

    const blob = new Blob([JSON.stringify(classifiedQuestoes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questoes_revalida_classified.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [questoes, classifications]);

  // Limpar progresso
  const clearProgress = useCallback(() => {
    localStorage.removeItem('questoes_classifications');
    setClassifications({});
    setStats({ total: questoes.length, classified: 0, errors: 0 });
    setProgress(0);
  }, [questoes.length]);

  return (
    <AppLayout>
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Classificar Questões com IA</h1>

          {/* API Key Input */}
          <div className="mb-6 p-4 bg-card border rounded-lg">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Key className="w-4 h-4" />
              OpenRouter API Key
            </label>
            <Input
              type="password"
              placeholder="sk-or-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Pegue sua chave em <a href="https://openrouter.ai/keys" target="_blank" rel="noopener" className="text-cyan-500 hover:underline">openrouter.ai/keys</a>. Usa o modelo GPT-4o-mini (barato e rápido).
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{stats.classified}</div>
              <div className="text-sm text-muted-foreground">Classificadas</div>
            </div>
            <div className="bg-card border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{stats.errors}</div>
              <div className="text-sm text-muted-foreground">Erros</div>
            </div>
          </div>

          {/* Progress */}
          {isRunning && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Processando questão {currentBatch} de {questoes.length - stats.classified}...
                </span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {questoes.length === 0 ? (
              <Button onClick={loadQuestoes} className="w-full" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Carregar Questões
              </Button>
            ) : (
              <>
                <Button 
                  onClick={runClassification} 
                  disabled={isRunning || !apiKey}
                  className="w-full" 
                  size="lg"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Classificando...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      {stats.classified > 0 ? 'Continuar Classificação' : 'Iniciar Classificação'}
                    </>
                  )}
                </Button>

                {stats.classified > 0 && (
                  <Button 
                    onClick={exportClassified} 
                    variant="outline"
                    className="w-full" 
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Exportar JSON Classificado
                  </Button>
                )}

                <Button 
                  onClick={clearProgress} 
                  variant="ghost"
                  className="w-full text-muted-foreground" 
                >
                  Limpar Progresso
                </Button>
              </>
            )}
          </div>

          {/* Preview */}
          {stats.classified > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Últimas Classificações</h2>
              <div className="space-y-2 max-h-64 overflow-auto">
                {Object.entries(classifications)
                  .filter(([_, c]) => c.tema)
                  .slice(-10)
                  .reverse()
                  .map(([id, c]) => (
                    <div key={id} className="p-3 bg-card border rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-medium">Questão #{id}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {c.tema} → {c.subtema}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
