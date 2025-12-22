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
    title: "CHECKLIST & FLASHCARD",
    items: [
      { 
        title: "Banco de checklists", 
        icon: ClipboardList, 
        children: [
          { title: "Revalida Flow", path: "/checklists" },
          { title: "Parceiros / Clientes", path: "/checklists/parceiros" },
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
      { title: "Pense Resumos", icon: BookOpen, path: "/resumos", badge: "New", badgeType: "new" },
      { title: "Cronograma", icon: Calendar, path: "/cronograma", badge: "New", badgeType: "new" },
      { title: "Entrar", icon: LogIn, path: "/entrar" },
      { title: "Live-Parceiros", icon: Tv, path: "/live" },
      { title: "Novidades", icon: Sparkles, path: "/novidades" },
    ]
  },
  {
    title: "PENSE CURSO",
    items: [
      { title: "Aulas", icon: GraduationCap, path: "/aulas", badge: 177, badgeType: "count" },
    ]
  },
  {
    title: "DESEMPENHO",
    items: [
      { title: "Meus Desempenhos", icon: BarChart3, path: "/desempenhos" },
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
    title: "ÁREA DA MENTORIA",
    items: [
      { title: "Mentorados", icon: Users, path: "/mentorados" },
    ]
  },
  {
    title: "CONTATO",
    items: [
      { title: "Feedback", icon: MessageSquare, path: "/feedback" },
      { title: "Suporte", icon: HelpCircle, path: "/suporte" },
    ]
  },
];

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Banco de checklists"]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-border/30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/30">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
          <span className="text-white font-bold text-sm">RF</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">REVALIDA</h1>
          <p className="text-xs font-medium text-primary">FLOW</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100vh-80px)] overflow-y-auto py-4 px-3">
        {menuSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-4">
            {section.title && (
              <h3 className="px-4 mb-2 text-[10px] font-semibold text-muted-foreground tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className={cn(
                          "sidebar-item w-full justify-between",
                          expandedItems.includes(item.title) && "text-foreground"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm">{item.title}</span>
                        </span>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      {expandedItems.includes(item.title) && (
                        <ul className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                className={({ isActive }) => cn(
                                  "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
                                  isActive 
                                    ? "text-foreground" 
                                    : "text-sidebar-foreground hover:text-foreground"
                                )}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
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
                        "sidebar-item",
                        isActive && "sidebar-item-active"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm flex-1">{item.title}</span>
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
