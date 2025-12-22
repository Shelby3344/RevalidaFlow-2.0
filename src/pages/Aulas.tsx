import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AulaCard {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  color: string;
}

const esqueletosAulas: AulaCard[] = [
  { id: 1, title: "MFC", subtitle: "", category: "Esqueleto", color: "from-blue-600 to-blue-800" },
  { id: 2, title: "Cirurgia", subtitle: "", category: "Esqueleto", color: "from-blue-600 to-blue-800" },
  { id: 3, title: "Pediatria", subtitle: "", category: "Esqueleto", color: "from-blue-600 to-blue-800" },
  { id: 4, title: "GO", subtitle: "", category: "Esqueleto", color: "from-blue-600 to-blue-800" },
  { id: 5, title: "Clínica", subtitle: "", category: "Esqueleto", color: "from-blue-600 to-blue-800" },
];

const procedimentosAulas: AulaCard[] = [
  { id: 1, title: "Reanimação Neonatal", subtitle: "PEDIATRIA", category: "Procedimento", color: "from-green-600 to-green-800" },
  { id: 2, title: "Prática", subtitle: "PEDIATRIA", category: "Procedimento", color: "from-green-600 to-green-800" },
  { id: 3, title: "Desengasgo", subtitle: "PEDIATRIA", category: "Procedimento", color: "from-green-600 to-green-800" },
];

const clinicaMedicaAulas: AulaCard[] = [
  { id: 1, title: "ASMA", subtitle: "Clínica Médica", category: "CM", color: "from-blue-500 to-blue-700" },
  { id: 2, title: "Aplicando", subtitle: "Clínica Médica", category: "CM", color: "from-blue-500 to-blue-700" },
  { id: 3, title: "Anafilaxia", subtitle: "Clínica Médica", category: "CM", color: "from-blue-500 to-blue-700" },
];

const pediatriaAulas: AulaCard[] = [
  { id: 1, title: "Amamentação", subtitle: "PEDIATRIA", category: "PE", color: "from-green-500 to-green-700" },
  { id: 2, title: "Aplicando", subtitle: "PEDIATRIA", category: "PE", color: "from-green-500 to-green-700" },
  { id: 3, title: "Anafilaxia", subtitle: "PEDIATRIA", category: "PE", color: "from-green-500 to-green-700" },
];

const mfcAulas: AulaCard[] = [
  { id: 1, title: "SUS / APS", subtitle: "Medicina de Família e comunidade", category: "MFC", color: "from-cyan-500 to-cyan-700" },
  { id: 2, title: "Aplicando", subtitle: "Medicina de Família e comunidade", category: "MFC", color: "from-cyan-500 to-cyan-700" },
  { id: 3, title: "Rastreamento", subtitle: "Medicina de Família e comunidade", category: "MFC", color: "from-cyan-500 to-cyan-700" },
];

const cirurgiaAulas: AulaCard[] = [
  { id: 1, title: "Trauma Torácico", subtitle: "CIRURGIA", category: "CR", color: "from-purple-500 to-purple-700" },
  { id: 2, title: "Aplicando", subtitle: "CIRURGIA", category: "CR", color: "from-purple-500 to-purple-700" },
  { id: 3, title: "AOM", subtitle: "CIRURGIA", category: "CR", color: "from-purple-500 to-purple-700" },
];

const goAulas: AulaCard[] = [
  { id: 1, title: "Reiterando", subtitle: "GINECOLOGIA E OBSTETRÍCIA", category: "GO", color: "from-pink-500 to-pink-700" },
  { id: 2, title: "Aplicando", subtitle: "GINECOLOGIA E OBSTETRÍCIA", category: "GO", color: "from-pink-500 to-pink-700" },
  { id: 3, title: "Sangramento de Segunda Metade", subtitle: "GINECOLOGIA E OBSTETRÍCIA", category: "GO", color: "from-pink-500 to-pink-700" },
];

interface SectionProps {
  title: string;
  aulas: AulaCard[];
}

function AulaSection({ title, aulas }: SectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="w-7 h-7 border-border">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-7 h-7 border-border bg-primary text-primary-foreground">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {aulas.map((aula) => (
          <div 
            key={aula.id}
            className={`flex-shrink-0 w-40 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-gradient-to-b ${aula.color}`}
          >
            <div className="aspect-[3/4] relative p-3 flex flex-col justify-between">
              {/* Placeholder for person image */}
              <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="relative z-10">
                <p className="text-[10px] text-white/70 uppercase tracking-wider">{aula.subtitle}</p>
              </div>

              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary py-2 text-center">
              <p className="text-xs font-medium text-primary-foreground">{aula.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Aulas() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Search */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Buscar uma aula</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar um aula..."
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

          {/* Sections */}
          <AulaSection title="Esqueletos das Grandes Áreas" aulas={esqueletosAulas} />
          <AulaSection title="Procedimentos" aulas={procedimentosAulas} />
          <AulaSection title="Clínica Médica" aulas={clinicaMedicaAulas} />
          <AulaSection title="Pediatria" aulas={pediatriaAulas} />
          <AulaSection title="MFC" aulas={mfcAulas} />
          <AulaSection title="Cirurgia" aulas={cirurgiaAulas} />
          <AulaSection title="GO" aulas={goAulas} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl card-gradient p-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Sugestões de Aulas</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Comece assistindo a todos os vídeos dos esqueletos de cada grande área e, aos poucos, organize mentalmente um esqueleto estruturado.
            </p>
            
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground text-center mb-4">Opções</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                ≡ Todas as Aulas
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Mente PBL | Pense Revalida
      </footer>
    </AppLayout>
  );
}
