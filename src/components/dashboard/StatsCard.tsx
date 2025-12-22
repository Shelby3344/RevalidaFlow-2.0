import { Clock } from "lucide-react";

interface Specialty {
  name: string;
  average: number;
  stations: number;
  color: string;
}

const specialties: Specialty[] = [
  { name: "Cirurgia", average: 4.00, stations: 1, color: "text-destructive" },
  { name: "Clínica", average: 0, stations: 0, color: "text-info" },
  { name: "GO", average: 0, stations: 0, color: "text-specialty-go" },
  { name: "Pediatria", average: 0, stations: 0, color: "text-warning" },
  { name: "Preventiva", average: 10.00, stations: 1, color: "text-success" },
  { name: "INEP 2020/2025.1", average: 7.00, stations: 2, color: "text-primary" },
];

export function StatsCard() {
  return (
    <div className="rounded-xl card-gradient p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-primary">Minhas Estatísticas Gerais</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Tempo de treinamento: 00:10:40</p>

      {/* Main stats */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground">2</p>
          <p className="text-sm text-muted-foreground">Estações</p>
        </div>
        
        {/* Circular progress */}
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-secondary"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${(7 / 10) * 220} 220`}
              className="text-warning"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">7.00</span>
          </div>
        </div>
      </div>

      {/* Specialties list */}
      <div className="space-y-3">
        {specialties.map((specialty) => (
          <div key={specialty.name} className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${specialty.color}`}>{specialty.name}</p>
              <p className="text-xs text-muted-foreground">Média: {specialty.average.toFixed(2)}</p>
            </div>
            <p className="text-sm text-muted-foreground">Est.: {specialty.stations}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
