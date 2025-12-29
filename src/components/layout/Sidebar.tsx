import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  BookOpen,
  Calendar,
  Tv,
  Sparkles,
  GraduationCap,
  BarChart3,
  History,
  Users,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Pin,
  PinOff,
  Zap,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CollaborativeMenuModal } from "@/components/collaborative/CollaborativeMenuModal";
import { useAuth } from "@/hooks/useAuth";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  badge?: string | number;
  badgeType?: "new" | "count";
  children?: { title: string; path: string }[];
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    items: [{ title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
  },
  {
    title: "Estudos",
    items: [
      {
        title: "Checklists",
        icon: ClipboardList,
        children: [
          { title: "Revalida Flow", path: "/checklists" },
        ],
      },
      {
        title: "Flashcards",
        icon: CreditCard,
        children: [
          { title: "Flashcards", path: "/flashcards" },
          { title: "Revisão", path: "/flashcards/revisao" },
        ],
      },
      { title: "Resumos", icon: BookOpen, path: "/resumos", badge: "Novo", badgeType: "new" },
      { title: "Cronograma", icon: Calendar, path: "/cronograma", badge: "Novo", badgeType: "new" },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      { title: "Aulas", icon: GraduationCap, path: "/aulas", badge: 177, badgeType: "count" },
      { title: "Lives", icon: Tv, path: "/live" },
      { title: "Novidades", icon: Sparkles, path: "/novidades" },
    ],
  },
  {
    title: "Progresso",
    items: [
      { title: "Desempenho", icon: BarChart3, path: "/desempenhos" },
      {
        title: "Histórico",
        icon: History,
        children: [
          { title: "Checklist", path: "/historico/checklist" },
          { title: "Flashcard", path: "/historico/flashcard" },
        ],
      },
    ],
  },
  {
    title: "Comunidade",
    items: [
      { title: "Mentorados", icon: Users, path: "/mentorados" },
      { title: "Feedback", icon: MessageSquare, path: "/feedback" },
      { title: "Suporte", icon: HelpCircle, path: "/suporte" },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  isPinned: boolean;
  onTogglePin: () => void;
  onHoverChange: (isHovered: boolean) => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export function Sidebar({ 
  isCollapsed, 
  isPinned, 
  onTogglePin, 
  onHoverChange,
  isMobile,
  isMobileMenuOpen,
  onCloseMobileMenu
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Checklists"]);
  const [isCollaborativeMenuOpen, setIsCollaborativeMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isExpanded = !isCollapsed;

  // Para mobile, só mostra se o menu estiver aberto
  if (isMobile && !isMobileMenuOpen) {
    return null;
  }

  const handleNavClick = () => {
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-border/50",
        "transition-all duration-300 ease-out",
        isMobile 
          ? "w-72 shadow-2xl" 
          : (isExpanded ? "w-64" : "w-[72px]")
      )}
      onMouseEnter={() => !isMobile && onHoverChange(true)}
      onMouseLeave={() => !isMobile && onHoverChange(false)}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-14 md:h-16 border-b border-border/50",
          "transition-all duration-300",
          (isExpanded || isMobile) ? "gap-3 px-4 md:px-5" : "justify-center px-2"
        )}
      >
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl",
              "bg-gradient-to-br from-emerald-500 to-teal-600",
              "shadow-lg shadow-emerald-500/20",
              "w-9 h-9 md:w-10 md:h-10"
            )}
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        </div>
        {(isExpanded || isMobile) && (
          <div className="flex-1 min-w-0">
            <h1 className="text-sm md:text-base font-bold text-foreground tracking-tight">
              Revalida<span className="text-emerald-500">Flow</span>
            </h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground font-medium">Plataforma de Estudos</p>
          </div>
        )}
        {/* Close button for mobile */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseMobileMenu}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Pin Button - hidden on mobile */}
      {!isMobile && (
        <div
          className={cn(
            "flex h-10 border-b border-border/50",
            "transition-all duration-300",
            isExpanded ? "justify-end px-3" : "justify-center px-2"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onTogglePin}
            className={cn(
              "h-8 w-8 rounded-lg",
              isPinned
                ? "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"
                : "text-muted-foreground hover:text-foreground"
            )}
            title={isPinned ? "Desafixar sidebar" : "Fixar sidebar"}
          >
            {isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn(
        "overflow-y-auto py-3 md:py-4 px-2 md:px-3",
        isMobile ? "h-[calc(100vh-56px-60px)]" : "h-[calc(100vh-104px-60px)]"
      )}>
        {menuSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-4 md:mb-6">
            {section.title && (isExpanded || isMobile) && (
              <h3 className="px-3 mb-2 text-[10px] md:text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            {section.title && !isExpanded && !isMobile && <div className="h-px bg-border/50 mx-2 mb-3" />}
            <ul className="space-y-0.5 md:space-y-1">
              {section.items.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => (isExpanded || isMobile) && toggleExpand(item.title)}
                        className={cn(
                          "sidebar-item w-full group",
                          (isExpanded || isMobile) ? "justify-between" : "justify-center",
                          expandedItems.includes(item.title) &&
                            (isExpanded || isMobile) &&
                            "bg-muted/50 text-foreground"
                        )}
                        title={(!isExpanded && !isMobile) ? item.title : undefined}
                      >
                        <span className={cn("flex items-center", (isExpanded || isMobile) ? "gap-3" : "")}>
                          <item.icon
                            className={cn(
                              "w-[18px] h-[18px] flex-shrink-0",
                              "transition-colors duration-200",
                              "group-hover:text-foreground"
                            )}
                          />
                          {(isExpanded || isMobile) && (
                            <span className="text-[13px] font-medium">{item.title}</span>
                          )}
                        </span>
                        {(isExpanded || isMobile) &&
                          (expandedItems.includes(item.title) ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          ))}
                      </button>
                      {expandedItems.includes(item.title) && (isExpanded || isMobile) && (
                        <ul className="mt-1 ml-4 pl-4 border-l border-border/50 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center py-2 px-3 text-[13px] rounded-lg",
                                    "transition-all duration-200",
                                    isActive
                                      ? "text-emerald-500 font-medium bg-emerald-500/10"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                  )
                                }
                              >
                                {child.title}
                              </NavLink>
                            </li>
                          ))}
                          
                          {/* Botão de Treino Colaborativo - apenas para Checklists */}
                          {item.title === "Checklists" && (
                            <li>
                              <button
                                onClick={() => setIsCollaborativeMenuOpen(true)}
                                className={cn(
                                  "flex items-center py-2 px-3 text-[13px] rounded-lg w-full",
                                  "transition-all duration-200",
                                  "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                  "bg-gradient-to-r from-blue-600/10 to-indigo-600/10 hover:from-blue-600/20 hover:to-indigo-600/20"
                                )}
                              >
                                <Users className="w-3 h-3 mr-2" />
                                Treino Colaborativo
                              </button>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path || "/"}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        cn(
                          "sidebar-item group",
                          (isExpanded || isMobile) ? "" : "justify-center",
                          isActive && "sidebar-item-active"
                        )
                      }
                      title={(!isExpanded && !isMobile) ? item.title : undefined}
                    >
                      <item.icon
                        className={cn(
                          "w-[18px] h-[18px] flex-shrink-0",
                          "transition-colors duration-200"
                        )}
                      />
                      {(isExpanded || isMobile) && (
                        <>
                          <span className="text-[13px] font-medium flex-1">{item.title}</span>
                          {item.badge && item.badgeType === "new" && (
                            <span className="tag tag-new">{item.badge}</span>
                          )}
                          {item.badge && item.badgeType === "count" && (
                            <span className="tag tag-count">{item.badge}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Modal de Treino Colaborativo */}
      <CollaborativeMenuModal 
        open={isCollaborativeMenuOpen} 
        onOpenChange={setIsCollaborativeMenuOpen}
      />

      {/* Logout Button */}
      {user && (
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 border-t border-border/50 bg-sidebar",
          (isExpanded || isMobile) ? "" : "flex justify-center"
        )}>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 w-full py-2.5 px-3 rounded-lg",
              "text-muted-foreground hover:text-red-500 hover:bg-red-500/10",
              "transition-all duration-200",
              (!isExpanded && !isMobile) && "justify-center"
            )}
            title="Sair"
          >
            <LogOut className="w-[18px] h-[18px]" />
            {(isExpanded || isMobile) && (
              <span className="text-[13px] font-medium">Sair</span>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
