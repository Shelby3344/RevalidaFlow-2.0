import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Carregar estado do localStorage
  const [isPinned, setIsPinned] = useState(() => {
    const saved = localStorage.getItem("sidebar-pinned");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isHovered, setIsHovered] = useState(false);

  // Salvar estado no localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-pinned", JSON.stringify(isPinned));
  }, [isPinned]);

  // Sidebar está colapsada se não está fixada E não está com hover
  const isCollapsed = !isPinned && !isHovered;

  const togglePin = () => {
    setIsPinned((prev: boolean) => !prev);
  };

  const handleHoverChange = (hovered: boolean) => {
    if (!isPinned) {
      setIsHovered(hovered);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={isCollapsed}
        isPinned={isPinned}
        onTogglePin={togglePin}
        onHoverChange={handleHoverChange}
      />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "pl-16" : "pl-64"
        )}
      >
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
