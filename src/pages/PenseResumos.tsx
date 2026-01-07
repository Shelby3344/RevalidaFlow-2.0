import { useState, useEffect } from "react";
import { Search, ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loadAllResumos, loadResumoByUid, ResumoItem, ResumoJson } from "@/data/resumoLoader";

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

// Cores de gradiente por área
const areaGradients: Record<string, string> = {
  CM: 'from-blue-500/20 to-blue-600/30',
  CR: 'from-red-500/20 to-red-600/30',
  GO: 'from-purple-500/20 to-purple-600/30',
  PE: 'from-yellow-500/20 to-yellow-600/30',
  PR: 'from-green-500/20 to-green-600/30'
};

// Ícones SVG médicos por categoria
const getMedicalIcon = (tema: string, area: string): string => {
  const temaLower = tema.toLowerCase();
  
  // Ícones específicos por tema
  if (temaLower.includes('coração') || temaLower.includes('cardí') || temaLower.includes('infarto') || temaLower.includes('arritmia') || temaLower.includes('fibrilação')) {
    return '❤️'; // Coração
  }
  if (temaLower.includes('pulmão') || temaLower.includes('pulmonar') || temaLower.includes('asma') || temaLower.includes('dpoc') || temaLower.includes('pneumonia') || temaLower.includes('respirat')) {
    return '🫁'; // Pulmão
  }
  if (temaLower.includes('cérebro') || temaLower.includes('cerebral') || temaLower.includes('avc') || temaLower.includes('neuro') || temaLower.includes('epilepsia') || temaLower.includes('parkinson') || temaLower.includes('alzheimer')) {
    return '🧠'; // Cérebro
  }
  if (temaLower.includes('osso') || temaLower.includes('fratura') || temaLower.includes('artrite') || temaLower.includes('artrose') || temaLower.includes('ortop')) {
    return '🦴'; // Osso
  }
  if (temaLower.includes('rim') || temaLower.includes('renal') || temaLower.includes('nefr')) {
    return '🫘'; // Rim
  }
  if (temaLower.includes('fígado') || temaLower.includes('hepát') || temaLower.includes('hepatite') || temaLower.includes('cirrose')) {
    return '🫀'; // Fígado (usando coração anatômico)
  }
  if (temaLower.includes('estômago') || temaLower.includes('gástr') || temaLower.includes('digest') || temaLower.includes('intestin') || temaLower.includes('diarr')) {
    return '🫃'; // Estômago
  }
  if (temaLower.includes('olho') || temaLower.includes('ocular') || temaLower.includes('visão') || temaLower.includes('oftalm')) {
    return '👁️'; // Olho
  }
  if (temaLower.includes('ouvido') || temaLower.includes('audit') || temaLower.includes('otite')) {
    return '👂'; // Ouvido
  }
  if (temaLower.includes('pele') || temaLower.includes('dermat') || temaLower.includes('cutân') || temaLower.includes('erisipela') || temaLower.includes('celulite')) {
    return '🧴'; // Pele
  }
  if (temaLower.includes('sangue') || temaLower.includes('anemia') || temaLower.includes('leucemia') || temaLower.includes('hemato')) {
    return '🩸'; // Sangue
  }
  if (temaLower.includes('vírus') || temaLower.includes('viral') || temaLower.includes('covid') || temaLower.includes('gripe') || temaLower.includes('dengue') || temaLower.includes('hepatite')) {
    return '🦠'; // Vírus
  }
  if (temaLower.includes('bactéria') || temaLower.includes('infecç') || temaLower.includes('sepse') || temaLower.includes('antibiótico')) {
    return '🔬'; // Microscópio
  }
  if (temaLower.includes('vacina') || temaLower.includes('imuniz')) {
    return '💉'; // Seringa
  }
  if (temaLower.includes('medicamento') || temaLower.includes('fármaco') || temaLower.includes('droga') || temaLower.includes('intoxicação')) {
    return '💊'; // Pílula
  }
  if (temaLower.includes('cirurgia') || temaLower.includes('cirúrg') || temaLower.includes('operação')) {
    return '🔪'; // Cirurgia
  }
  if (temaLower.includes('gravidez') || temaLower.includes('gestação') || temaLower.includes('parto') || temaLower.includes('obstét')) {
    return '🤰'; // Gravidez
  }
  if (temaLower.includes('bebê') || temaLower.includes('neonato') || temaLower.includes('recém-nascido') || temaLower.includes('puericultura')) {
    return '👶'; // Bebê
  }
  if (temaLower.includes('criança') || temaLower.includes('infantil') || temaLower.includes('pediátr')) {
    return '🧒'; // Criança
  }
  if (temaLower.includes('idoso') || temaLower.includes('geriatr') || temaLower.includes('senil')) {
    return '👴'; // Idoso
  }
  if (temaLower.includes('mental') || temaLower.includes('psiq') || temaLower.includes('depressão') || temaLower.includes('ansiedade') || temaLower.includes('pânico')) {
    return '🧘'; // Saúde mental
  }
  if (temaLower.includes('dor') || temaLower.includes('cefaleia') || temaLower.includes('enxaqueca')) {
    return '🤕'; // Dor
  }
  if (temaLower.includes('febre') || temaLower.includes('temperatura')) {
    return '🤒'; // Febre
  }
  if (temaLower.includes('diabetes') || temaLower.includes('glicose') || temaLower.includes('insulina')) {
    return '🍬'; // Diabetes
  }
  if (temaLower.includes('tireoide') || temaLower.includes('hipotireoid') || temaLower.includes('hipertireoid')) {
    return '🦋'; // Tireoide
  }
  if (temaLower.includes('câncer') || temaLower.includes('tumor') || temaLower.includes('oncol') || temaLower.includes('neoplasia')) {
    return '🎗️'; // Câncer
  }
  if (temaLower.includes('emergência') || temaLower.includes('urgência') || temaLower.includes('trauma')) {
    return '🚑'; // Emergência
  }
  if (temaLower.includes('exame') || temaLower.includes('diagnóstico') || temaLower.includes('laborat')) {
    return '🧪'; // Exame
  }
  if (temaLower.includes('raio') || temaLower.includes('radiolog') || temaLower.includes('tomografia') || temaLower.includes('ressonância')) {
    return '📷'; // Imagem
  }
  if (temaLower.includes('eletro') || temaLower.includes('ecg') || temaLower.includes('eeg')) {
    return '📈'; // ECG
  }
  
  // Fallback por área
  const areaIcons: Record<string, string> = {
    CM: '🩺', // Estetoscópio
    CR: '⚕️', // Símbolo médico
    GO: '🌸', // Flor (feminino)
    PE: '🧒', // Criança
    PR: '🏥'  // Hospital
  };
  
  return areaIcons[area] || '📋';
};

export default function PenseResumos() {
  const [searchTerm, setSearchTerm] = useState("");
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

  // Agrupa por área
  const resumosByArea = filteredResumos.reduce((acc, r) => {
    if (!acc[r.area]) acc[r.area] = [];
    acc[r.area].push(r);
    return acc;
  }, {} as Record<string, ResumoItem[]>);

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
          © 2025 ProREV
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

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Flow Resumos</h1>
            <span className="text-sm text-muted-foreground">({resumos.length} temas)</span>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
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

        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando resumos...</p>
            </div>
          </div>
        ) : (
          /* Cards por área */
          <div className="space-y-8">
            {(selectedArea ? [selectedArea] : Object.keys(areaNames)).map(areaCode => {
              const areaResumos = resumosByArea[areaCode] || [];
              if (areaResumos.length === 0) return null;

              return (
                <div key={areaCode}>
                  {/* Cabeçalho da área */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                      <h2 className="text-lg font-semibold text-foreground">{areaNames[areaCode]}</h2>
                    </div>
                    <span className="text-sm text-emerald-400">{areaResumos.length} temas</span>
                  </div>

                  {/* Grid de cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {areaResumos.map((resumo) => (
                      <div
                        key={resumo.id}
                        onClick={() => handleOpenResumo(resumo.uid)}
                        className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-primary/30 transition-all cursor-pointer group"
                      >
                        {/* Ícone médico */}
                        <div className={`w-14 h-14 rounded-lg flex-shrink-0 bg-gradient-to-br ${areaGradients[resumo.area]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl">{getMedicalIcon(resumo.tema, resumo.area)}</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 truncate">
                            {resumo.tema}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Equipe PEPList</p>
                          <p className="text-xs text-muted-foreground">2025</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}
