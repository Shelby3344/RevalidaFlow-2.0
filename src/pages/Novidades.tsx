import { Bell } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

interface NovidadeItem {
  id: number;
  title: string;
  daysAgo: number;
}

const checklistsNovidades: NovidadeItem[] = [
  { id: 1, title: "Síndrome de Abstinência de Álcool - Híbrido", daysAgo: 36 },
  { id: 2, title: "Crupe Viral - Híbrido", daysAgo: 38 },
  { id: 3, title: "Transtorno Opositor Desafiador (TOD) - Híbrido", daysAgo: 39 },
  { id: 4, title: "Distonia Aguda (Haloperidol) - Híbrido", daysAgo: 41 },
  { id: 5, title: "Meningite bacteriana - Híbrido", daysAgo: 47 },
  { id: 6, title: "Uretrite - Híbrido", daysAgo: 52 },
  { id: 7, title: "Saturnismo - Híbrido", daysAgo: 53 },
  { id: 8, title: "Hipoparatroidismo - Híbrido", daysAgo: 54 },
  { id: 9, title: "Hemorragia digestiva alta varicosa - Híbrido", daysAgo: 57 },
  { id: 10, title: "Consulta de Rotina / Paciente DM 2 - Híbrido", daysAgo: 57 },
  { id: 11, title: "Atestado de Aptidão Física - Híbrido", daysAgo: 57 },
  { id: 12, title: "AVC Isquêmico - Híbrido", daysAgo: 57 },
  { id: 13, title: "AVCI - Híbrido", daysAgo: 57 },
  { id: 14, title: "Pielonefrite Gestacional - Híbrido", daysAgo: 58 },
  { id: 15, title: "Tamponamento cardíaco - Híbrido", daysAgo: 59 },
];

const flashcardsNovidades: NovidadeItem[] = [
  { id: 1, title: "Influenza", daysAgo: 191 },
  { id: 2, title: "Atendimento ao Homem Transgênero - Transição de gênero", daysAgo: 191 },
  { id: 3, title: "Ascite e PBE", daysAgo: 191 },
  { id: 4, title: "Angioedema Hereditário", daysAgo: 191 },
  { id: 5, title: "Gestação Ectópica Íntegra", daysAgo: 191 },
  { id: 6, title: "Comportamento sexual compulsivo (pornografia)", daysAgo: 191 },
  { id: 7, title: "Traumatismo cranioencefálico - Hemorragia Subaracnóidea", daysAgo: 191 },
  { id: 8, title: "Semiologia Respiratória/Pneumonia", daysAgo: 191 },
  { id: 9, title: "Hanseníase - Exame Dermatoneurológico", daysAgo: 191 },
  { id: 10, title: "Trauma de Face", daysAgo: 191 },
  { id: 11, title: "Síndrome Compartimental", daysAgo: 191 },
  { id: 12, title: "Abcesso Pulmonar", daysAgo: 191 },
  { id: 13, title: "Profilaxia de raiva humana - Mamífero de interesse econômico - Leve", daysAgo: 191 },
  { id: 14, title: "Planejamento Familiar na Adolescência", daysAgo: 191 },
  { id: 15, title: "Trombocitopenia Imune", daysAgo: 191 },
];

export default function Novidades() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Revalida Flow Novidades</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Checklists column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">Checklists</h2>
            </div>
            
            {checklistsNovidades.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <span className="flex-shrink-0 px-2 py-1 text-xs font-medium bg-warning text-warning-foreground rounded">
                  Há {item.daysAgo} dias
                </span>
                <span className="text-sm text-foreground">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Flashcards column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-semibold text-pink-400">Flashcards</h2>
            </div>
            
            {flashcardsNovidades.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-500/10 to-pink-500/5 border border-pink-500/20 hover:border-pink-500/40 transition-colors cursor-pointer"
              >
                <span className="flex-shrink-0 px-2 py-1 text-xs font-medium bg-warning text-warning-foreground rounded">
                  Há {item.daysAgo} dias
                </span>
                <span className="text-sm text-foreground">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>
    </AppLayout>
  );
}
