import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Detecta se é mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Carregar estado do localStorage (padrão: encolhido)
  const [isPinned, setIsPinned] = useState(() => {
    const saved = localStorage.getItem("sidebar-pinned");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isHovered, setIsHovered] = useState(false);

  // Detecta tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay para mobile */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      <Sidebar
        isCollapsed={isMobile ? false : isCollapsed}
        isPinned={isPinned}
        onTogglePin={togglePin}
        onHoverChange={handleHoverChange}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
      />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isMobile ? "pl-0" : (isCollapsed ? "pl-16" : "pl-64")
        )}
      >
        <Navbar 
          isMobile={isMobile} 
          onToggleMobileMenu={toggleMobileMenu} 
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
