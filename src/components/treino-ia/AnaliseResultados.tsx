import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Loader2, Sparkles, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ChecklistEvaluationItem } from "@/types/checklists";
import { ItemScore } from "@/types/avaliacao";
import { cn } from "@/lib/utils";

interface AnaliseResultadosProps {
  items: ChecklistEvaluationItem[];
  scores: Record<number, ItemScore>;
  totalScore: number;
  maxScore: number;
  checklistTitle: string;
  conversationHistory?: { role: string; content: string }[];
  apiKey?: string;
}

interface AnaliseIA {
  resumo: string;
  pontosFortes: string[];
  pontosAMelhorar: string[];
  dicasEstudo: string[];
  notaGeral: string;
}

export function AnaliseResultados({
  items,
  scores,
  totalScore,
  maxScore,
  checklistTitle,
  conversationHistory,
  apiKey,
}: AnaliseResultadosProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analise, setAnalise] = useState<AnaliseIA | null>(null);
  const [showAnalise, setShowAnalise] = useState(false);

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const generateAnalise = async () => {
    setIsAnalyzing(true);
    setShowAnalise(true);

    // Preparar dados para análise
    const itemsAnalysis = items.map((item) => {
      const score = scores[item.id];
      return {
        id: item.id,
        titulo: item.title,
        pontuacaoMaxima: item.scores.max,
        pontuacaoObtida: score?.score || 0,
        status: score?.type || "não avaliado",
        criterios: item.scoring,
      };
    });

    const itensRealizados = itemsAnalysis.filter((i) => i.pontuacaoObtida > 0);
    const itensNaoRealizados = itemsAnalysis.filter((i) => i.pontuacaoObtida === 0);
    const itensParciais = itemsAnalysis.filter((i) => i.status === "partial");

    // Se tiver API key, usar OpenAI
    if (apiKey) {
      try {
        const prompt = `Você é um professor de medicina especializado em OSCE (Objective Structured Clinical Examination).
Analise o desempenho do candidato na estação "${checklistTitle}".

RESULTADO:
- Pontuação: ${totalScore}/${maxScore} (${percentage}%)
- Itens realizados corretamente: ${itensRealizados.length}
- Itens parcialmente realizados: ${itensParciais.length}
- Itens não realizados: ${itensNaoRealizados.length}

ITENS DO CHECKLIST:
${itemsAnalysis.map((i) => `${i.id}. ${i.titulo} - ${i.status} (${i.pontuacaoObtida}/${i.pontuacaoMaxima})`).join("\n")}

${conversationHistory ? `\nCONVERSA COM PACIENTE:\n${conversationHistory.slice(-10).map((m) => `${m.role}: ${m.content}`).join("\n")}` : ""}

Forneça uma análise em JSON com:
{
  "resumo": "Resumo geral do desempenho em 2-3 frases",
  "pontosFortes": ["lista de 2-3 pontos fortes"],
  "pontosAMelhorar": ["lista de 2-3 pontos a melhorar"],
  "dicasEstudo": ["lista de 2-3 dicas de estudo específicas"],
  "notaGeral": "Aprovado/Reprovado/Limítrofe com justificativa breve"
}`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0].message.content;
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            setAnalise(JSON.parse(jsonMatch[0]));
            setIsAnalyzing(false);
            return;
          }
        }
      } catch (error) {
        console.error("Erro na análise com IA:", error);
      }
    }

    // Fallback: análise local
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const analiseLocal: AnaliseIA = {
      resumo:
        percentage >= 70
          ? `Bom desempenho na estação! Você demonstrou conhecimento adequado na maioria dos itens avaliados, obtendo ${percentage}% da pontuação máxima.`
          : percentage >= 50
            ? `Desempenho regular. Você completou alguns itens importantes, mas há espaço para melhoria. Pontuação: ${percentage}%.`
            : `Desempenho abaixo do esperado. É importante revisar os conceitos fundamentais desta estação. Pontuação: ${percentage}%.`,
      pontosFortes:
        itensRealizados.length > 0
          ? itensRealizados.slice(0, 3).map((i) => i.titulo)
          : ["Continue praticando para identificar seus pontos fortes"],
      pontosAMelhorar:
        itensNaoRealizados.length > 0
          ? itensNaoRealizados.slice(0, 3).map((i) => i.titulo)
          : ["Mantenha o bom trabalho!"],
      dicasEstudo: [
        "Revise o protocolo completo desta condição",
        "Pratique a anamnese estruturada",
        "Treine o exame físico direcionado",
      ],
      notaGeral:
        percentage >= 70
          ? "Aprovado - Demonstrou competência adequada"
          : percentage >= 50
            ? "Limítrofe - Necessita revisão de alguns pontos"
            : "Reprovado - Recomenda-se estudo adicional",
    };

    setAnalise(analiseLocal);
    setIsAnalyzing(false);
  };

  if (!showAnalise) {
    return (
      <Button
        onClick={generateAnalise}
        className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base"
        disabled={isAnalyzing}
      >
        <Clock className="w-5 h-5 mr-2" />
        Análise de resultados
      </Button>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="font-semibold text-foreground">Análise de Resultados</h3>
          {apiKey && <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">IA</span>}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
            <p className="text-sm text-muted-foreground">Analisando seu desempenho...</p>
          </div>
        ) : analise ? (
          <>
            {/* Resumo */}
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm text-foreground">{analise.resumo}</p>
            </div>

            {/* Nota Geral */}
            <div
              className={cn(
                "rounded-lg p-3 border",
                analise.notaGeral.toLowerCase().includes("aprovado")
                  ? "bg-green-500/10 border-green-500/30"
                  : analise.notaGeral.toLowerCase().includes("limítrofe")
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-red-500/10 border-red-500/30"
              )}
            >
              <div className="flex items-center gap-2">
                {analise.notaGeral.toLowerCase().includes("aprovado") ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : analise.notaGeral.toLowerCase().includes("limítrofe") ? (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium text-foreground">{analise.notaGeral}</span>
              </div>
            </div>

            {/* Pontos Fortes */}
            <div>
              <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Pontos Fortes
              </h4>
              <ul className="space-y-1">
                {analise.pontosFortes.map((ponto, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {ponto}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pontos a Melhorar */}
            <div>
              <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Pontos a Melhorar
              </h4>
              <ul className="space-y-1">
                {analise.pontosAMelhorar.map((ponto, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {ponto}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dicas de Estudo */}
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Dicas de Estudo
              </h4>
              <ul className="space-y-1">
                {analise.dicasEstudo.map((dica, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    {dica}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
