import { Sun, Moon, Bell, Search, User, Crown } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { profile } = useUserProfile();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-10 h-10 input-modern w-full"
            />
          </div>
        </div>

        {/* Center - Version badge */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary text-sm font-semibold">2025.2</span>
            <span className="text-muted-foreground text-sm">• 0/12</span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl hover:bg-muted"
          >
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </div>
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl hover:bg-muted"
            title={resolvedTheme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>

          {/* User */}
          <div className="flex items-center gap-3 pl-2 ml-2 border-l border-border">
            <div className="hidden sm:block text-right">
              <div className="flex items-center justify-end gap-2">
                <p className="text-sm font-medium text-foreground">{profile.nome}</p>
                {profile.plano === "premium" && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {profile.plano === "premium" ? "Premium" : "Free"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileClick}
              className={cn(
                "h-10 w-10 rounded-xl",
                "bg-gradient-to-br from-primary to-violet-600",
                "hover:opacity-90"
              )}
              title="Meu Perfil"
            >
              <span className="text-white font-bold text-sm">
                {profile.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
