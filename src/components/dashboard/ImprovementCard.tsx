import { AlertTriangle } from "lucide-react";

interface ImprovementItem {
  title: string;
  tag: string;
  tagColor: string;
  progress: string;
}

const improvements: ImprovementItem[] = [
  { 
    title: "Pancreatite Aguda de Causa Biliar", 
    tag: "CR", 
    tagColor: "bg-destructive",
    progress: "03/11"
  },
];

export function ImprovementCard() {
  return (
    <div className="rounded-xl card-gradient p-5 h-full">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-warning" />
        <h3 className="text-sm font-medium text-warning">
          Podemos melhorar <span className="bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded text-xs ml-1">1</span>
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Dar uma atenção especial.</p>

      <div className="space-y-2">
        {improvements.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <span className={`specialty-tag ${item.tagColor} text-white`}>
              {item.tag}
            </span>
            <span className="flex-1 text-sm text-foreground truncate">{item.title}</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {item.progress}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
