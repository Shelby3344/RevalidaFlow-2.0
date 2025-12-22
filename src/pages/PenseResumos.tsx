import { useState, useEffect } from "react";
import { Search, ArrowLeft, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loadAllResumos, loadResumoByUid, ResumoItem, ResumoJson } from "@/data/resumoLoader";

const ITEMS_PER_PAGE = 10;

// Cores por área
const areaColors: Record<string, string> = {
  CM: "bg-blue-500",
  CR: "bg-red-500",
  GO: "bg-purple-500",
  PE: "bg-yellow-500",
  PR: "bg-green-500"
};

const areaNames: Record<string, string> = {
  CM: "Clínica Médica",
  CR: "Cirurgia",
  GO: "Ginecologia/Obstetrícia",
  PE: "Pediatria",
  PR: "Preventiva"
};

export default function PenseResumos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resumos, setResumos] = useState<ResumoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResumo, setSelectedResumo] = useState<ResumoJson | null>(null);
  const [isLoadingResumo, setIsLoadingResumo] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Carrega a lista de resumos
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await loadAllResumos();
      setResumos(data);
      setIsLoading(false);
    };
    load();
  }, []);

  // Filtra os resumos
  const filteredResumos = resumos.filter(r => {
    const matchesSearch = r.tema.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || r.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  // Paginação
  const totalPages = Math.ceil(filteredResumos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResumos = filteredResumos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset página quando filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedArea]);

  // Abre um resumo
  const handleOpenResumo = async (uid: number) => {
    setIsLoadingResumo(true);
    const resumo = await loadResumoByUid(uid);
    setSelectedResumo(resumo);
    setIsLoadingResumo(false);
  };

  // Volta para a lista
  const handleBack = () => {
    setSelectedResumo(null);
  };

  // Contagem por área
  const countByArea = resumos.reduce((acc, r) => {
    acc[r.area] = (acc[r.area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Renderiza a visualização do resumo
  if (selectedResumo) {
    return (
      <AppLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBack}
              className="border-border"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-bold text-white ${areaColors[selectedResumo.area]}`}>
                {selectedResumo.area}
              </span>
              <h1 className="text-xl font-semibold text-foreground">{selectedResumo.nome}</h1>
            </div>
          </div>

          {/* Definição */}
          <div className="rounded-xl card-gradient p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Definição
            </h2>
            <p className="text-muted-foreground leading-relaxed">{selectedResumo.definicao}</p>
          </div>

          {/* Conteúdo HTML */}
          <div className="rounded-xl card-gradient p-6">
            <div 
              className="prose prose-invert max-w-none
                prose-headings:text-foreground prose-headings:font-semibold
                prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-ul:text-muted-foreground prose-ul:my-3
                prose-li:my-1
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-primary/80
                [&_.alert]:rounded-lg [&_.alert]:p-4 [&_.alert]:my-4
                [&_.alert-info]:bg-blue-500/10 [&_.alert-info]:border [&_.alert-info]:border-blue-500/30
                [&_.alert-warning]:bg-yellow-500/10 [&_.alert-warning]:border [&_.alert-warning]:border-yellow-500/30
                [&_.alert_h4]:text-foreground [&_.alert_h4]:font-semibold [&_.alert_h4]:mb-2
              "
              dangerouslySetInnerHTML={{ __html: selectedResumo.conteudo_html }}
            />
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Revalida Flow
        </footer>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {isLoadingResumo && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando resumo...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Pense Resumos</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Pesquisar</span>
              <Input
                placeholder="Buscar tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 bg-card border-border h-9 text-sm"
              />
            </div>
          </div>

          {/* Filtros por área */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedArea === null ? "default" : "outline"}
              onClick={() => setSelectedArea(null)}
              className="text-xs"
            >
              Todos ({resumos.length})
            </Button>
            {Object.entries(areaNames).map(([code, name]) => (
              <Button
                key={code}
                size="sm"
                variant={selectedArea === code ? "default" : "outline"}
                onClick={() => setSelectedArea(code)}
                className="text-xs"
              >
                <span className={`w-2 h-2 rounded-full ${areaColors[code]} mr-2`}></span>
                {name} ({countByArea[code] || 0})
              </Button>
            ))}
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando resumos...</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16">
                      Área
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Tema
                      <span className="ml-1">↑</span>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
                      Média (%)
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResumos.map((resumo) => (
                    <tr key={resumo.id} className="border-b border-border last:border-0 hover:bg-card/50">
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold text-white ${areaColors[resumo.area]}`}>
                          {resumo.area}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{resumo.tema}</td>
                      <td className="px-4 py-3 text-sm text-center text-muted-foreground">{resumo.media.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <Button 
                          size="sm" 
                          className="bg-info hover:bg-info/90 text-white text-xs px-4"
                          onClick={() => handleOpenResumo(resumo.uid)}
                        >
                          Abrir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredResumos.length)} de {filteredResumos.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-border h-8"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      Anterior
                    </Button>
                    
                    {/* Páginas */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          size="sm"
                          variant={currentPage === pageNum ? "default" : "outline"}
                          className={`text-xs w-8 h-8 ${currentPage === pageNum ? 'bg-primary text-primary-foreground' : 'border-border'}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2 text-muted-foreground">...</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs w-8 h-8 border-border"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-border h-8"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
                      Próximo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-card overflow-hidden">
            <div className="h-full rounded-full" style={{ 
              background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
              width: `${(filteredResumos.length / resumos.length) * 100}%`
            }} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl card-gradient p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Mais de <span className="font-bold text-foreground">{resumos.length}</span> Resumos atualizados.
            </p>
            
            {/* Donut chart */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--card))" strokeWidth="12" />
                  {/* CM - Azul */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" 
                    strokeDasharray={`${(countByArea['CM'] || 0) / resumos.length * 251.2} 251.2`} 
                    strokeDashoffset="0" />
                  {/* CR - Vermelho */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12" 
                    strokeDasharray={`${(countByArea['CR'] || 0) / resumos.length * 251.2} 251.2`} 
                    strokeDashoffset={`-${(countByArea['CM'] || 0) / resumos.length * 251.2}`} />
                  {/* GO - Roxo */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" 
                    strokeDasharray={`${(countByArea['GO'] || 0) / resumos.length * 251.2} 251.2`} 
                    strokeDashoffset={`-${((countByArea['CM'] || 0) + (countByArea['CR'] || 0)) / resumos.length * 251.2}`} />
                  {/* PE - Amarelo */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" strokeWidth="12" 
                    strokeDasharray={`${(countByArea['PE'] || 0) / resumos.length * 251.2} 251.2`} 
                    strokeDashoffset={`-${((countByArea['CM'] || 0) + (countByArea['CR'] || 0) + (countByArea['GO'] || 0)) / resumos.length * 251.2}`} />
                  {/* PR - Verde */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12" 
                    strokeDasharray={`${(countByArea['PR'] || 0) / resumos.length * 251.2} 251.2`} 
                    strokeDashoffset={`-${((countByArea['CM'] || 0) + (countByArea['CR'] || 0) + (countByArea['GO'] || 0) + (countByArea['PE'] || 0)) / resumos.length * 251.2}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{resumos.length}</span>
                </div>
              </div>
            </div>

            {/* Legenda */}
            <div className="space-y-2">
              {Object.entries(areaNames).map(([code, name]) => (
                <div key={code} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${areaColors[code]}`}></span>
                    <span className="text-muted-foreground">{name}</span>
                  </div>
                  <span className="text-foreground font-medium">{countByArea[code] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>
    </AppLayout>
  );
}
