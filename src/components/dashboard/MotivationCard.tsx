import { Lightbulb } from "lucide-react";

export function MotivationCard() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-primary/20 to-info/20 border border-primary/30 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-primary">Motivação Revalida Flow</h3>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">
        Cada hora de estudo te aproxima da sua aprovação. Continue firme!
      </p>
    </div>
  );
}
