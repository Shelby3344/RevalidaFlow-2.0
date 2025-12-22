import { useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Check, X, Shuffle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Flashcard {
  id: number;
  category: string;
  categoryColor: string;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    category: "Cirurgia",
    categoryColor: "bg-destructive",
    question: "Qual é a tríade de Charcot?",
    answer: "Febre, icterícia e dor em hipocôndrio direito. Sugere colangite aguda.",
    difficulty: "medium",
  },
  {
    id: 2,
    category: "Clínica",
    categoryColor: "bg-info",
    question: "Quais são os critérios de Light para exsudato?",
    answer: "Proteína líquido/sérica > 0.5, LDH líquido/sérico > 0.6, LDH líquido > 2/3 do limite superior sérico.",
    difficulty: "hard",
  },
  {
    id: 3,
    category: "Pediatria",
    categoryColor: "bg-warning",
    question: "Qual a vacinação do calendário básico aos 2 meses?",
    answer: "Pentavalente, VIP (poliomielite inativada), Pneumocócica 10-valente e Rotavírus.",
    difficulty: "easy",
  },
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<"list" | "review">("list");

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-success";
      case "medium": return "text-warning";
      case "hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      {mode === "list" ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Flashcards</h1>
            <Button 
              onClick={() => setMode("review")}
              className="btn-primary-gradient"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Iniciar Revisão
            </Button>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcards.map((card) => (
              <div 
                key={card.id}
                className="rounded-xl card-gradient p-5 hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => {
                  setCurrentIndex(flashcards.indexOf(card));
                  setMode("review");
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`specialty-tag ${card.categoryColor} text-white`}>
                    {card.category.substring(0, 2).toUpperCase()}
                  </span>
                  <span className={`text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
                    {card.difficulty === "easy" ? "Fácil" : card.difficulty === "medium" ? "Médio" : "Difícil"}
                  </span>
                </div>
                <p className="text-sm text-foreground line-clamp-3">{card.question}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl card-gradient p-5 text-center">
              <p className="text-3xl font-bold text-foreground">{flashcards.length}</p>
              <p className="text-sm text-muted-foreground">Total de cards</p>
            </div>
            <div className="rounded-xl card-gradient p-5 text-center">
              <p className="text-3xl font-bold text-success">0</p>
              <p className="text-sm text-muted-foreground">Acertos</p>
            </div>
            <div className="rounded-xl card-gradient p-5 text-center">
              <p className="text-3xl font-bold text-destructive">0</p>
              <p className="text-sm text-muted-foreground">Erros</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setMode("list")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {flashcards.length}
            </span>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>

          {/* Flashcard */}
          <div 
            className={cn(
              "relative min-h-[400px] rounded-2xl cursor-pointer transition-all duration-500 perspective-1000",
              "hover:shadow-xl hover:shadow-primary/10"
            )}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={cn(
              "absolute inset-0 rounded-2xl card-gradient p-8 flex flex-col backface-hidden transition-transform duration-500",
              isFlipped && "rotate-y-180"
            )}>
              <div className="flex items-center justify-between mb-6">
                <span className={`specialty-tag ${currentCard.categoryColor} text-white`}>
                  {currentCard.category}
                </span>
                <span className={`text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                  {currentCard.difficulty === "easy" ? "Fácil" : currentCard.difficulty === "medium" ? "Médio" : "Difícil"}
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xl text-foreground text-center leading-relaxed">
                  {currentCard.question}
                </p>
              </div>
              <p className="text-center text-sm text-muted-foreground">Clique para ver a resposta</p>
            </div>

            <div className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-info/20 border border-primary/30 p-8 flex flex-col backface-hidden transition-transform duration-500 rotate-y-180",
              isFlipped && "rotate-y-0"
            )}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-primary">Resposta</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-foreground text-center leading-relaxed">
                  {currentCard.answer}
                </p>
              </div>
              <p className="text-center text-sm text-muted-foreground">Clique para ver a pergunta</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handlePrev}
              className="border-border hover:bg-secondary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8"
            >
              <X className="w-5 h-5 mr-2" />
              Errei
            </Button>
            
            <Button
              size="lg"
              className="bg-success hover:bg-success/90 text-success-foreground px-8"
            >
              <Check className="w-5 h-5 mr-2" />
              Acertei
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleNext}
              className="border-border hover:bg-secondary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>
    </AppLayout>
  );
}
