import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Loader2, Sparkles, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ChecklistEvaluationItem } from "@/types/checklists";
import { ItemScore } from "@/types/avaliacao";
import { cn } from "@/lib/utils";

interface AnaliseResultadosLocalProps {
  items: ChecklistEvaluationItem[];
  scores: Record<number, ItemScore>;
  totalScore: number;
  maxScore: number;
  checklistTitle: string;
}

interface AnaliseLocal {
  resumo: string;
  pontosFortes: string[];
  pontosAMelhorar: string[];
  dicasEstudo: string[];
  notaGeral: string;
}

export function AnaliseResultadosLocal({
  items,
  scores,
  totalScore,
  maxScore,
  checklistTitle,
}: AnaliseResultadosLocalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analise, setAnalise] = useState<AnaliseLocal | null>(null);
  const [showAnalise, setShowAnalise] = useState(false);

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const generateAnalise = async () => {
    setIsAnalyzing(true);
    setShowAnalise(true);

    // Simular tempo de processamento
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Análise dos itens
    const itemsAnalysis = items.map((item) => {
      const score = scores[item.id];
      return {
        id: item.id,
        titulo: item.title,
        pontuacaoMaxima: item.scores.max,
        pontuacaoObtida: score?.score || 0,
        status: score?.type || "não avaliado",
      };
    });

    const itensAdequados = itemsAnalysis.filter((i) => i.status === "adequate");
    const itensParciais = itemsAnalysis.filter((i) => i.status === "partial");
    const itensInadequados = itemsAnalysis.filter((i) => i.status === "inadequate" || i.pontuacaoObtida === 0);

    // Gerar análise baseada nos dados
    let resumo = "";
    let notaGeral = "";

    if (percentage >= 80) {
      resumo = `Excelente desempenho na estação "${checklistTitle}"! O candidato demonstrou domínio dos principais conceitos e habilidades avaliados, obtendo ${percentage}% da pontuação máxima.`;
      notaGeral = "Aprovado - Desempenho acima da média esperada";
    } else if (percentage >= 60) {
      resumo = `Bom desempenho na estação. O candidato demonstrou conhecimento adequado na maioria dos itens, com pontuação de ${percentage}%. Alguns pontos podem ser aprimorados.`;
      notaGeral = "Aprovado - Desempenho satisfatório";
    } else if (percentage >= 40) {
      resumo = `Desempenho regular na estação. O candidato completou alguns itens importantes, mas há lacunas significativas que precisam ser trabalhadas. Pontuação: ${percentage}%.`;
      notaGeral = "Limítrofe - Necessita revisão de conceitos fundamentais";
    } else {
      resumo = `Desempenho abaixo do esperado na estação. É fundamental revisar os conceitos básicos e praticar mais esta habilidade. Pontuação: ${percentage}%.`;
      notaGeral = "Reprovado - Recomenda-se estudo intensivo do tema";
    }

    // Pontos fortes (itens adequados)
    const pontosFortes = itensAdequados.length > 0
      ? itensAdequados.slice(0, 4).map((i) => i.titulo)
      : ["Continue praticando para consolidar seus conhecimentos"];

    // Pontos a melhorar (itens inadequados ou não realizados)
    const pontosAMelhorar = itensInadequados.length > 0
      ? itensInadequados.slice(0, 4).map((i) => i.titulo)
      : itensParciais.length > 0
        ? itensParciais.slice(0, 4).map((i) => `Aprofundar: ${i.titulo}`)
        : ["Mantenha o bom desempenho!"];

    // Dicas de estudo genéricas baseadas no desempenho
    const dicasEstudo = [];
    
    if (percentage < 60) {
      dicasEstudo.push("Revise o protocolo completo desta condição clínica");
      dicasEstudo.push("Pratique a anamnese estruturada com colegas");
    }
    
    if (itensParciais.length > 2) {
      dicasEstudo.push("Foque em completar cada item antes de passar ao próximo");
    }
    
    if (itensInadequados.length > 3) {
      dicasEstudo.push("Estude os critérios de avaliação de cada item do checklist");
    }
    
    dicasEstudo.push("Treine o exame físico direcionado para esta condição");
    dicasEstudo.push("Revise as referências bibliográficas recomendadas");

    const analiseLocal: AnaliseLocal = {
      resumo,
      pontosFortes,
      pontosAMelhorar,
      dicasEstudo: dicasEstudo.slice(0, 4),
      notaGeral,
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
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
            <p className="text-sm text-muted-foreground">Analisando desempenho...</p>
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
                <span className="font-medium text-foreground text-sm">{analise.notaGeral}</span>
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
