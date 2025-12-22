import { useState } from "react";
import { Search, MoreVertical, BarChart3 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HistoricoItem {
  id: number;
  tema: string;
  area: string;
  areaColor: string;
  feito: string;
  tempo: string;
  nota: number;
}

const historicoData: HistoricoItem[] = [
  { id: 1, tema: "Baby Blues (REAPLICAÇÃO)", area: "PR", areaColor: "bg-warning", feito: "32D", tempo: "00:40", nota: 10.00 },
  { id: 2, tema: "Pancreatite Aguda de Causa Biliar", area: "CR", areaColor: "bg-purple-500", feito: "33D", tempo: "10:00", nota: 4.00 },
];

interface ProgressItem {
  name: string;
  value: number;
}

const selectedChecklistProgress: ProgressItem[] = [
  { name: "Acolhimento", value: 100 },
  { name: "Anamnese", value: 100 },
  { name: "Exame Físico", value: 100 },
  { name: "Diagnóstico", value: 100 },
  { name: "Conduta", value: 100 },
];

export default function HistoricoChecklist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"pense" | "simulado" | "parceiros">("pense");
  const [selectedItem, setSelectedItem] = useState<HistoricoItem | null>(historicoData[0]);

  const filteredData = historicoData.filter(item =>
    item.tema.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Histórico de Checklist | Pense Revalida</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-border bg-primary text-primary-foreground">
                Todos
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-card rounded-lg">
            <button
              onClick={() => setActiveTab("pense")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "pense" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Pense Revalida
            </button>
            <button
              onClick={() => setActiveTab("simulado")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "simulado" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Simulado
            </button>
            <button
              onClick={() => setActiveTab("parceiros")}
              className={cn(
                "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === "parceiros" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Parceiros e Clientes
            </button>
          </div>

          {/* Table */}
          <div className="rounded-xl overflow-hidden border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Tema
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Feito
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Tempo
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nota
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className={cn(
                      "border-b border-border last:border-0 cursor-pointer transition-colors",
                      selectedItem?.id === item.id ? "bg-primary/10" : "hover:bg-card/50"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-8 h-6 rounded flex items-center justify-center text-xs font-bold text-white",
                          item.areaColor
                        )}>
                          {item.area}
                        </span>
                        <span className="text-sm text-foreground">{item.tema}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-cyan-400">{item.feito}</td>
                    <td className="px-4 py-3 text-sm text-center text-pink-400">{item.tempo}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded text-sm font-medium",
                        item.nota >= 7 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      )}>
                        {item.nota.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-card overflow-hidden">
            <div className="h-full rounded-full" style={{ 
              background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
              width: '60%'
            }} />
          </div>
        </div>

        {/* Sidebar - Selected item details */}
        <div className="space-y-6">
          {selectedItem && (
            <div className="rounded-xl card-gradient p-6">
              <h3 className="text-sm font-semibold text-primary mb-4 text-center">
                {selectedItem.tema}
              </h3>
              
              {/* Progress bars */}
              <div className="space-y-3 mb-6">
                {selectedChecklistProgress.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Ver Correção
                </Button>
                <Button variant="outline" size="icon" className="border-border">
                  <BarChart3 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Mente PBL | Pense Revalida
      </footer>
    </AppLayout>
  );
}
