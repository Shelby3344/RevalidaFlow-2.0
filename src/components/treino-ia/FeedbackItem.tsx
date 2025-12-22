import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemScoreIA } from "@/types/treino-ia";

interface FeedbackItemProps {
  item: ItemScoreIA;
  itemDescription: string;
  onDismiss?: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
}

export function FeedbackItem({
  item,
  itemDescription,
  onDismiss,
  autoHide = true,
  autoHideDelay = 4000,
}: FeedbackItemProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onDismiss?.();
        }, 300);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, onDismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 300);
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (item.type) {
      case "adequate":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "inadequate":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getLabel = () => {
    switch (item.type) {
      case "adequate":
        return "Adequado";
      case "partial":
        return "Parcial";
      case "inadequate":
        return "Inadequado";
    }
  };

  const getBgColor = () => {
    switch (item.type) {
      case "adequate":
        return "bg-green-500/10 border-green-500/30";
      case "partial":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "inadequate":
        return "bg-red-500/10 border-red-500/30";
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 max-w-sm p-4 rounded-lg border shadow-lg transition-all duration-300 z-50",
        getBgColor(),
        isExiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
      )}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded",
                item.type === "adequate"
                  ? "bg-green-500/20 text-green-400"
                  : item.type === "partial"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {getLabel()}
            </span>
            <span className="text-xs text-muted-foreground">
              +{item.score.toFixed(1)} pts
            </span>
          </div>
          <p className="text-sm text-foreground line-clamp-2">
            {itemDescription}
          </p>
          {item.reason && (
            <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Componente para gerenciar múltiplos feedbacks
interface FeedbackManagerProps {
  feedbacks: Array<{ item: ItemScoreIA; description: string }>;
  onDismiss: (itemId: number) => void;
}

export function FeedbackManager({ feedbacks, onDismiss }: FeedbackManagerProps) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {feedbacks.map((feedback, index) => (
        <div
          key={feedback.item.itemId}
          style={{ transform: `translateY(-${index * 8}px)` }}
        >
          <FeedbackItem
            item={feedback.item}
            itemDescription={feedback.description}
            onDismiss={() => onDismiss(feedback.item.itemId)}
          />
        </div>
      ))}
    </div>
  );
}
