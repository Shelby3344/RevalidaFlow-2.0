import { useState } from "react";
import { Target, Zap, BookOpen, Stethoscope, Brain, Pill, FileImage, ClipboardList } from "lucide-react";

interface Category {
  name: string;
  shortName: string;
  progress: number;
  icon: React.ReactNode;
}

interface Area {
  code: string;
  name: string;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  categories: Category[];
}

const categoryIcons = {
  ANA: <Stethoscope className="w-3.5 h-3.5" />,
  EF: <ClipboardList className="w-3.5 h-3.5" />,
  LAB: <Zap className="w-3.5 h-3.5" />,
  IMG: <FileImage className="w-3.5 h-3.5" />,
  DX: <Brain className="w-3.5 h-3.5" />,
  CDT: <Pill className="w-3.5 h-3.5" />,
};

const areasData: Area[] = [
  {
    code: "CR",
    name: "Cirurgia",
    color: "text-red-500",
    bgColor: "bg-red-500",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    categories: [
      { name: "Anamnese", shortName: "ANA", progress: 65, icon: categoryIcons.ANA },
      { name: "Exame Físico", shortName: "EF", progress: 70, icon: categoryIcons.EF },
      { name: "Laboratório", shortName: "LAB", progress: 50, icon: categoryIcons.LAB },
      { name: "Imagem", shortName: "IMG", progress: 75, icon: categoryIcons.IMG },
      { name: "Diagnóstico", shortName: "DX", progress: 60, icon: categoryIcons.DX },
      { name: "Conduta", shortName: "CDT", progress: 55, icon: categoryIcons.CDT },
    ],
  },
  {
    code: "CM",
    name: "Clínica Médica",
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-600",
    categories: [
      { name: "Anamnese", shortName: "ANA", progress: 60, icon: categoryIcons.ANA },
      { name: "Exame Físico", shortName: "EF", progress: 50, icon: categoryIcons.EF },
      { name: "Laboratório", shortName: "LAB", progress: 70, icon: categoryIcons.LAB },
      { name: "Imagem", shortName: "IMG", progress: 30, icon: categoryIcons.IMG },
      { name: "Diagnóstico", shortName: "DX", progress: 55, icon: categoryIcons.DX },
      { name: "Conduta", shortName: "CDT", progress: 65, icon: categoryIcons.CDT },
    ],
  },
  {
    code: "GO",
    name: "GO",
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    gradientFrom: "from-purple-500",
    gradientTo: "to-violet-600",
    categories: [
      { name: "Anamnese", shortName: "ANA", progress: 55, icon: categoryIcons.ANA },
      { name: "Exame Físico", shortName: "EF", progress: 45, icon: categoryIcons.EF },
      { name: "Laboratório", shortName: "LAB", progress: 40, icon: categoryIcons.LAB },
      { name: "Imagem", shortName: "IMG", progress: 65, icon: categoryIcons.IMG },
      { name: "Diagnóstico", shortName: "DX", progress: 50, icon: categoryIcons.DX },
      { name: "Conduta", shortName: "CDT", progress: 60, icon: categoryIcons.CDT },
    ],
  },
  {
    code: "PE",
    name: "Pediatria",
    color: "text-amber-500",
    bgColor: "bg-amber-500",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
    categories: [
      { name: "Anamnese", shortName: "ANA", progress: 70, icon: categoryIcons.ANA },
      { name: "Exame Físico", shortName: "EF", progress: 60, icon: categoryIcons.EF },
      { name: "Laboratório", shortName: "LAB", progress: 45, icon: categoryIcons.LAB },
      { name: "Imagem", shortName: "IMG", progress: 30, icon: categoryIcons.IMG },
      { name: "Diagnóstico", shortName: "DX", progress: 55, icon: categoryIcons.DX },
      { name: "Conduta", shortName: "CDT", progress: 65, icon: categoryIcons.CDT },
    ],
  },
  {
    code: "PR",
    name: "Preventiva",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    categories: [
      { name: "Anamnese", shortName: "ANA", progress: 80, icon: categoryIcons.ANA },
      { name: "Exame Físico", shortName: "EF", progress: 45, icon: categoryIcons.EF },
      { name: "Laboratório", shortName: "LAB", progress: 55, icon: categoryIcons.LAB },
      { name: "Imagem", shortName: "IMG", progress: 25, icon: categoryIcons.IMG },
      { name: "Diagnóstico", shortName: "DX", progress: 70, icon: categoryIcons.DX },
      { name: "Conduta", shortName: "CDT", progress: 85, icon: categoryIcons.CDT },
    ],
  },
];

export function RadarChartCard() {
  const [selectedArea, setSelectedArea] = useState<Area>(areasData[0]);
  const maxValue = 100;

  // Calcula média geral da área
  const areaAverage = selectedArea.categories.reduce((acc, cat) => acc + cat.progress, 0) / selectedArea.categories.length;

  const weakestCategory = selectedArea.categories.reduce((prev, curr) => 
    curr.progress < prev.progress ? curr : prev
  );

  const strongestCategory = selectedArea.categories.reduce((prev, curr) => 
    curr.progress > prev.progress ? curr : prev
  );

  return (
    <div className="rounded-2xl bg-card border border-border/50 overflow-hidden h-full flex flex-col">
      {/* Header com gradiente */}
      <div className={`px-5 py-4 bg-gradient-to-r ${selectedArea.gradientFrom}/10 ${selectedArea.gradientTo}/5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedArea.gradientFrom} ${selectedArea.gradientTo} flex items-center justify-center shadow-lg`}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Desempenho por Área</h3>
              <p className="text-xs text-muted-foreground">Selecione uma especialidade</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xl font-bold ${selectedArea.color}`}>{areaAverage.toFixed(0)}%</p>
            <p className="text-[10px] text-muted-foreground">média geral</p>
          </div>
        </div>
      </div>

      {/* Seletor de áreas */}
      <div className="px-5 py-4 border-b border-border/30">
        <div className="flex items-center justify-between gap-2">
          {areasData.map((area) => {
            const isSelected = selectedArea.code === area.code;
            return (
              <button
                key={area.code}
                onClick={() => setSelectedArea(area)}
                className={`flex-1 py-2.5 px-2 rounded-xl transition-all duration-300 ${
                  isSelected 
                    ? `bg-gradient-to-br ${area.gradientFrom} ${area.gradientTo} shadow-lg scale-105` 
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-muted-foreground"}`}>
                  {area.code}
                </span>
              </button>
            );
          })}
        </div>
        <p className={`text-center mt-2 text-sm font-medium ${selectedArea.color}`}>
          {selectedArea.name}
        </p>
      </div>

      {/* Lista de categorias */}
      <div className="p-4 space-y-2 flex-1 overflow-auto">
        {selectedArea.categories.map((cat) => {
          const isWeak = cat.progress < 50;
          const isStrong = cat.progress >= 70;
          
          return (
            <div 
              key={cat.name} 
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                isWeak 
                  ? "bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20" 
                  : isStrong 
                    ? "bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20" 
                    : "bg-secondary/30 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Ícone da categoria */}
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${selectedArea.gradientFrom} ${selectedArea.gradientTo} flex items-center justify-center text-white shadow-sm`}>
                  {cat.icon}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    {isWeak && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500">Revisar</span>}
                    {isStrong && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500">Ótimo</span>}
                  </div>
                  
                  {/* Barra de progresso única */}
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isWeak 
                          ? "bg-gradient-to-r from-red-500 to-orange-500"
                          : isStrong
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-500"
                      }`}
                      style={{ width: `${(cat.progress / maxValue) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Percentual */}
                <span className={`text-sm font-bold ${
                  isWeak ? "text-red-500" : isStrong ? "text-emerald-500" : "text-blue-500"
                }`}>
                  {cat.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer com dicas */}
      <div className="px-5 py-3 border-t border-border/30 bg-gradient-to-r from-amber-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500 font-medium">Foque em:</span>{" "}
              <span className="text-foreground">{weakestCategory.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-500">✓ Melhor:</span>
            <span className="text-[10px] text-foreground">{strongestCategory.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
