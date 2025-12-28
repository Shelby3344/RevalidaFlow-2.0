import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Lock, MessageSquare, Clock, ListChecks, AlignLeft } from "lucide-react";
import { checklistsData } from "@/data/checklists";
import { getChecklistContentById, getChecklistContentByIdAsync, defaultChecklistContent } from "@/data/checklistContents";
import { AreaBadge } from "@/components/AreaBadge";
import { ChecklistContent } from "@/types/checklists";

export default function ChecklistExecution() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timer, setTimer] = useState("00:00");
  const [selectedConversation, setSelectedConversation] = useState("Conversa: (Aluno, Ator, etc)");
  const [content, setContent] = useState<ChecklistContent>(defaultChecklistContent);
  const [isLoading, setIsLoading] = useState(true);

  const checklist = checklistsData.find(c => c.id === id);
  const checklistTitle = checklist ? `${checklist.areaCode} ${checklist.title}` : "Checklist não encontrado";
  
  // Carrega o conteúdo do checklist (primeiro tenta síncrono, depois assíncrono)
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // Primeiro tenta carregar sincronamente (do cache estático)
      const syncContent = getChecklistContentById(id || "");
      if (syncContent !== defaultChecklistContent) {
        setContent(syncContent);
        setIsLoading(false);
        return;
      }
      
      // Se não encontrou, tenta carregar do JSON
      try {
        const asyncContent = await getChecklistContentByIdAsync(id || "");
        setContent(asyncContent);
      } catch (error) {
        console.error("Erro ao carregar checklist:", error);
        setContent(defaultChecklistContent);
      }
      
      setIsLoading(false);
    };
    
    loadContent();
  }, [id]);

  const [impressosState, setImpressosState] = useState(content.impressos);
  
  // Atualiza impressos quando o conteúdo muda
  useEffect(() => {
    setImpressosState(content.impressos);
  }, [content]);

  const toggleImpresso = (impressoId: number) => {
    setImpressosState(prev => prev.map(imp => 
      imp.id === impressoId ? { ...imp, isOpen: !imp.isOpen } : imp
    ));
  };

  return (
    <AppLayout>
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando checklist...</p>
          </div>
        </div>
      ) : (
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AreaBadge areaCode={checklist?.areaCode || "CM"} />
                <h1 className="text-lg font-semibold text-foreground">{checklistTitle}</h1>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                  NATN0654165G9YC
                </span>
              </div>
            </div>

            {/* Cenário de atuação */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Cenário de atuação</span>
                </div>
              </div>

              <div className="p-5 space-y-4 text-sm text-muted-foreground">
                <div>
                  <p><span className="text-foreground italic">Nível de atenção:</span> {content.scenario.nivel}.</p>
                  <p><span className="text-foreground italic">Tipo de atendimento:</span> {content.scenario.tipo}.</p>
                </div>
                
                <div>
                  <p className="text-foreground mb-2">A unidade possui a seguinte infraestrutura:</p>
                  {content.scenario.situacao.map((item, idx) => (
                    <p key={idx}>-{item}</p>
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-foreground font-medium mb-2">DESCRIÇÃO DO CASO:</p>
                  {content.scenario.descricao.map((item, idx) => (
                    <p key={idx} className={idx > 0 ? "mt-2" : ""}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Nos 10 Min. minutos de duração da estação */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <ListChecks className="w-4 h-4" />
                  <span className="text-sm font-medium">Nos 10 Min. minutos de duração da estação, você deverá executar as seguintes tarefas:</span>
                </div>
              </div>

              <div className="p-5 space-y-1 text-sm text-muted-foreground">
                {content.orientacoes.map((item, idx) => (
                  <p key={idx}>-{item}</p>
                ))}
              </div>
            </div>

            {/* Orientações do Ator/Atriz */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">Orientações do Ator/Atriz</span>
                </div>
              </div>

              <div className="p-5 text-sm text-muted-foreground">
                {/* Título introdutório */}
                <p className="font-semibold text-foreground mb-4">Você será o enfermeiro que auxiliará o médico e responderá suas perguntas de acordo ao roteiro.</p>

                {/* Frase do ator em itálico */}
                <p className="italic text-muted-foreground mb-6">-Olá eu me chamo Matheus, enfermeiro que o auxiliará durante todo o atendimento.</p>

                {/* Instruções com destaque */}
                {content.instrucoes.itens.length > 0 && (
                  <div className="space-y-4">
                    {content.instrucoes.itens.map((item, idx) => {
                      const colonIndex = item.indexOf(":");
                      if (colonIndex > -1) {
                        const titulo = item.substring(0, colonIndex);
                        const resto = item.substring(colonIndex + 1).trim();
                        return (
                          <div key={idx}>
                            <p className="text-amber-400/90 font-semibold uppercase">{titulo}:</p>
                            <p className="text-amber-400/70">-{resto}</p>
                          </div>
                        );
                      }
                      return <p key={idx}>{item}</p>;
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Impressos Section */}
            <div className="space-y-2 mb-6">
              {impressosState.map((impresso) => (
                <div key={impresso.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleImpresso(impresso.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm text-foreground">{impresso.title}</span>
                    <div className={`w-8 h-8 rounded-full ${impresso.color} flex items-center justify-center`}>
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  </button>
                  {impresso.isOpen && (
                    <div className="p-4 border-t border-border/30 text-sm text-muted-foreground">
                      Conteúdo do {impresso.title}...
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CHECKLIST (PEP) */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <AlignLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">CHECKLIST ( PEP )</span>
                </div>
                <Lock className="w-4 h-4 text-primary" />
              </div>

              <div className="p-5">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left text-xs font-semibold text-muted-foreground uppercase py-2">ITEM</th>
                      <th className="text-right text-xs font-semibold text-muted-foreground uppercase py-2">AVALIAÇÃO</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {content.evaluationItems.map((item) => (
                      <tr key={item.id} className="border-b border-border/20">
                        <td className="py-4 pr-4">
                          <p className="text-foreground font-medium mb-2">{item.title}</p>
                          {item.subItems.length > 0 && (
                            <div className="space-y-1 mb-3">
                              {item.subItems.map((subItem, idx) => (
                                <p key={idx} className="text-muted-foreground text-xs">{subItem}</p>
                              ))}
                            </div>
                          )}
                          <div className="space-y-1">
                            <p className="text-xs"><span className="text-green-400 font-semibold">Adequado:</span> <span className="text-muted-foreground">{item.scoring.adequate}</span></p>
                            {item.scoring.partial && item.scoring.partial !== "—" && (
                              <p className="text-xs"><span className="text-amber-400 font-semibold">Parcialmente adequado:</span> <span className="text-muted-foreground">{item.scoring.partial}</span></p>
                            )}
                            <p className="text-xs"><span className="text-red-400 font-semibold">Inadequado:</span> <span className="text-muted-foreground">{item.scoring.inadequate}</span></p>
                          </div>
                        </td>
                        <td className="py-4 text-right align-top">
                          <div className="flex justify-end">
                            {/* Container com largura fixa para garantir alinhamento consistente */}
                            <div className="flex gap-1 justify-end" style={{ minWidth: '200px' }}>
                              {/* Botão Inadequado */}
                              <div className="w-16 h-10 border-2 border-blue-500 rounded flex items-center justify-center text-blue-500 font-bold text-sm">
                                {item.scores.min}
                              </div>
                              
                              {/* Botão Parcial (se existir) */}
                              {item.scoring.partial && item.scoring.partial !== "—" && (
                                <div className="w-16 h-10 border-2 border-blue-500 rounded flex items-center justify-center text-blue-500 font-bold text-sm">
                                  {item.scores.partial}
                                </div>
                              )}
                              
                              {/* Botão Adequado */}
                              <div className="w-16 h-10 border-2 border-blue-500 rounded flex items-center justify-center text-blue-500 font-bold text-sm">
                                {item.scores.max}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">
                Atenção: esse checklist ainda não foi salvo. Se você fechar a guia ela ficará em memória por 15 minutos apenas momentos.
              </p>
            </div>

            {/* Análise de resultados Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Análise de resultados
            </Button>

            {/* References */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Referências bibliográficas:</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                {content.references.map((ref, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-primary">📎</span>
                    {ref}
                  </p>
                ))}
              </div>
            </div>

            {/* Feedback Button */}
            <div className="flex justify-center">
              <Button className="btn-primary-gradient flex items-center gap-2 px-8 py-6 rounded-full">
                <MessageSquare className="w-4 h-4" />
                Feedback | Erros, Dúvidas ou Sugestões
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 border-l border-border bg-card p-4 flex flex-col gap-4">
            {/* Timer */}
            <div className="text-center">
              <div className="bg-primary text-primary-foreground text-2xl font-mono py-3 px-6 rounded-lg">
                {timer}
              </div>
            </div>

            {/* Pause Button */}
            <Button className="btn-primary-gradient w-full">
              ⏸ Pausar
            </Button>

            {/* Conversation Dropdown */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Conversa-alvo:</label>
              <select 
                value={selectedConversation}
                onChange={(e) => setSelectedConversation(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg p-2 text-sm text-foreground"
              >
                <option>Conversa: (Aluno, Ator, etc)</option>
              </select>
            </div>

            {/* Result Button */}
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              Resultado
            </Button>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">0,00 / 10%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            {/* More Options */}
            <div className="space-y-2">
              <select className="w-full bg-secondary border border-border rounded-lg p-2 text-sm text-foreground">
                <option>Acompanhando...</option>
              </select>

              <Button variant="outline" className="w-full text-sm">
                Avaliação
              </Button>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full text-sm">
                Participantes
              </Button>
              <Button variant="outline" className="w-full text-sm">
                Atualizando participantes...
              </Button>
            </div>

            {/* Color Dots Indicator */}
            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </AppLayout>
  );
}
