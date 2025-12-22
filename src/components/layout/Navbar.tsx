import { Bell, Settings, Sun, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border/30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - Version badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30">
            <span className="text-primary text-sm font-semibold">⚡ 2025.2</span>
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
              0/12
            </span>
          </div>
        </div>

        {/* Right side - User menu */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground font-medium">Nayara Nuñez</span>
          
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Sun className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
