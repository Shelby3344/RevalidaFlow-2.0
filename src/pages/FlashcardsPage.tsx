import { useState } from "react";
import { Search } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FlashcardItem {
  id: number;
  tema: string;
  realizado: string;
  resultado: number;
}

const flashcardsData: FlashcardItem[] = [
  { id: 1, tema: "Baby Blues (REAPLICAÇÃO)", realizado: "Não", resultado: 0 },
  { id: 2, tema: "Pancreatite Aguda de Causa Biliar", realizado: "Não", resultado: 0 },
];

export default function FlashcardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTable, setSearchTable] = useState("");

  const filteredFlashcards = flashcardsData.filter(fc =>
    fc.tema.toLowerCase().includes(searchTable.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Buscar um flashcard</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar um tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border h-12"
              />
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-card overflow-hidden">
            <div className="h-full rounded-full" style={{ 
              background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
              width: '60%'
            }} />
          </div>

          {/* Flashcards liberados */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Flashcards liberados</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Pesquisar</span>
                <Input
                  placeholder="Buscar tema..."
                  value={searchTable}
                  onChange={(e) => setSearchTable(e.target.value)}
                  className="w-48 bg-card border-border h-9 text-sm"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl overflow-hidden border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Tema
                      <span className="ml-1">↑</span>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Realizado
                      <span className="ml-1">↕</span>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Resultado
                      <span className="ml-1">↕</span>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Ação
                      <span className="ml-1">↕</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFlashcards.map((fc) => (
                    <tr key={fc.id} className="border-b border-border last:border-0 hover:bg-card/50">
                      <td className="px-4 py-3 text-sm text-foreground">{fc.tema}</td>
                      <td className="px-4 py-3 text-sm text-center text-muted-foreground">{fc.realizado}</td>
                      <td className="px-4 py-3 text-sm text-center text-muted-foreground">{fc.resultado}</td>
                      <td className="px-4 py-3 text-center">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-4">
                          Iniciar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border">
                <Button variant="outline" size="sm" className="text-xs border-border">
                  Anterior
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground text-xs w-8 h-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-border">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl card-gradient p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Mais de <span className="font-bold text-foreground">400</span> flashcards atualizados.
            </p>
            
            {/* Donut chart */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--card))" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#818cf8" strokeWidth="12" strokeDasharray="60 251.2" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="50 251.2" strokeDashoffset="-60" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="40 251.2" strokeDashoffset="-110" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f472b6" strokeWidth="12" strokeDasharray="35 251.2" strokeDashoffset="-150" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="12" strokeDasharray="30 251.2" strokeDashoffset="-185" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-400">425</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground text-center mb-4">Opções</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                ≡ Todos os Flashcards
              </Button>
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
