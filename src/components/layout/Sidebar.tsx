import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  ClipboardList, 
  CreditCard, 
  BookOpen, 
  Calendar, 
  LogIn, 
  Tv, 
  Sparkles, 
  GraduationCap, 
  BarChart3, 
  History, 
  Users,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    ]
  },
  {
    title: "ESTUDOS",
    items: [
      { 
        title: "Checklists", 
        icon: ClipboardList, 
        children: [
          { title: "Revalida Flow", path: "/checklists" },
          { title: "Parceiros", path: "/checklists/parceiros" },
        ]
      },
      { 
        title: "Flashcards", 
        icon: CreditCard, 
        children: [
          { title: "Flashcards", path: "/flashcards" },
          { title: "Revisão", path: "/flashcards/revisao" },
        ]
      },
      { title: "Resumos", icon: BookOpen, path: "/resumos", badge: "Novo", badgeType: "new" },
      { title: "Cronograma", icon: Calendar, path: "/cronograma", badge: "Novo", badgeType: "new" },
    ]
  },
  {
    title: "CONTEÚDO",
    items: [
      { title: "Aulas", icon: GraduationCap, path: "/aulas", badge: 177, badgeType: "count" },
      { title: "Lives", icon: Tv, path: "/live" },
      { title: "Novidades", icon: Sparkles, path: "/novidades" },
    ]
  },
  {
    title: "PROGRESSO",
    items: [
      { title: "Desempenho", icon: BarChart3, path: "/desempenhos" },
      { 
        title: "Histórico", 
        icon: History,
        children: [
          { title: "Checklist", path: "/historico/checklist" },
          { title: "Flashcard", path: "/historico/flashcard" },
        ]
      },
    ]
  },
  {
    title: "COMUNIDADE",
    items: [
      { title: "Mentorados", icon: Users, path: "/mentorados" },
      { title: "Feedback", icon: MessageSquare, path: "/feedback" },
      { title: "Suporte", icon: HelpCircle, path: "/suporte" },
    ]
  },
];

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Checklists"]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar/95 backdrop-blur-2xl border-r border-white/5">
      {/* Logo - Premium Style */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
        <div className="relative">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-teal-400 shadow-lg shadow-primary/30">
            <span className="text-primary-foreground font-bold text-base tracking-tight">RF</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-foreground tracking-tight">Revalida Flow</h1>
          <p className="text-[11px] text-muted-foreground">Plataforma de Estudos</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100vh-88px)] overflow-y-auto py-4 px-3">
        {menuSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-5">
            {section.title && (
              <h3 className="px-4 mb-2 text-[10px] font-semibold text-muted-foreground/70 tracking-widest uppercase">
                {section.title}
              </h3>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className={cn(
                          "sidebar-item w-full justify-between group",
                          expandedItems.includes(item.title) && "text-foreground bg-white/5"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-opacity" />
                          <span className="text-[13px] font-medium">{item.title}</span>
                        </span>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="w-4 h-4 opacity-50" />
                        ) : (
                          <ChevronRight className="w-4 h-4 opacity-50" />
                        )}
                      </button>
                      {expandedItems.includes(item.title) && (
                        <ul className="ml-7 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                className={({ isActive }) => cn(
                                  "flex items-center gap-2 px-3 py-2 text-[13px] rounded-lg transition-all duration-200",
                                  isActive 
                                    ? "text-primary font-medium" 
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                )}
                              >
                                {child.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path || "/"}
                      className={({ isActive }) => cn(
                        "sidebar-item group",
                        isActive && "sidebar-item-active"
                      )}
                    >
                      <item.icon className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[13px] font-medium flex-1">{item.title}</span>
                      {item.badge && item.badgeType === "new" && (
                        <span className="tag tag-new">{item.badge}</span>
                      )}
                      {item.badge && item.badgeType === "count" && (
                        <span className="tag tag-count">{item.badge}</span>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
