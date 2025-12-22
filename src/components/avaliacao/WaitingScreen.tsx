import { Clock } from "lucide-react";
import { AreaBadge } from "@/components/AreaBadge";
import { AreaCode } from "@/data/checklists";
import { AppLayout } from "@/components/layout/AppLayout";

interface WaitingScreenProps {
  checklistTitle: string;
  areaCode: string;
  sessionCode: string;
  avaliadoName?: string;
}

export function WaitingScreen({ checklistTitle, areaCode, sessionCode, avaliadoName }: WaitingScreenProps) {
  return (
    <AppLayout>
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AreaBadge areaCode={areaCode as AreaCode} />
              </div>
              <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded">{sessionCode}</span>
            </div>

            {/* Cenário de atuação - Aguardando */}
            <div className="bg-card border border-border rounded-lg mb-6 overflow-hidden">
              <div className="bg-[#2a2f4a] border-b border-primary/30 px-4 py-3">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Cenário de atuação</span>
                </div>
              </div>

              <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                {/* Porta com número */}
                <div className="relative mb-6">
                  {/* Número da estação */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full z-10">
                    1
                  </div>
                  
                  {/* Porta */}
                  <div className="w-32 h-48 bg-primary/80 rounded-t-[60px] border-4 border-primary flex items-center justify-center relative overflow-hidden">
                    {/* Divisão da porta */}
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 border-r-2 border-primary/50 flex flex-col">
                        <div className="flex-1 border-b border-primary/30 m-2 rounded-t-lg bg-primary/60"></div>
                        <div className="flex-1 m-2 mb-4 rounded-b-sm bg-primary/60"></div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1 border-b border-primary/30 m-2 rounded-t-lg bg-primary/60"></div>
                        <div className="flex-1 m-2 mb-4 rounded-b-sm bg-primary/60"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm text-center">
                  Aguardando o avaliador iniciar a estação...
                </p>
              </div>
            </div>

            {/* Nos 10 Min. - Aguardando */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg mb-6 overflow-hidden">
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <span className="text-sm">
                    ⏱ Nos 10 Min. minutos de duração da estação, você deverá executar as seguintes tarefas:
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 border-l border-border bg-card p-4 flex flex-col gap-4">
            {/* Timer */}
            <div className="text-center">
              <div className="bg-primary text-primary-foreground text-2xl font-mono py-3 px-6 rounded-lg">
                00:00
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center justify-between text-sm border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Relógio</span>
              </div>
              <span className="text-foreground">10 Min.</span>
            </div>

            {/* Impressos */}
            <div className="space-y-2 border-b border-border pb-3">
              <p className="text-xs text-muted-foreground text-center">Impressos</p>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <span className="text-sm text-muted-foreground">Nenhum Impresso</span>
              </div>
            </div>

            {/* Participantes */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">Participantes</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">▸</span>
                  <span className="text-foreground">{avaliadoName || "Aguardando..."}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
