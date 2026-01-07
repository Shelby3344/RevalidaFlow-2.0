import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const daysOfWeek = ["DOM.", "SEG.", "TER.", "QUA.", "QUI.", "SEX.", "SÁB."];

const getCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  
  const days: { day: number; isCurrentMonth: boolean; isToday: boolean }[] = [];
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, isToday: false });
  }
  
  // Current month days
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
    days.push({ day: i, isCurrentMonth: true, isToday });
  }
  
  // Next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, isCurrentMonth: false, isToday: false });
  }
  
  return days;
};

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function CronogramaCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11)); // December 2025
  const [view, setView] = useState<"month" | "list">("month");
  const [searchPerson, setSearchPerson] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getCalendarDays(year, month);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Top actions */}
        <div className="flex items-center gap-4">
          <Button className="flex-1 max-w-xl bg-primary hover:bg-primary/90 text-primary-foreground h-12">
            Gerar Cronograma
          </Button>
          <div className="relative flex-1 max-w-md">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Filtrar por pessoa..."
              value={searchPerson}
              onChange={(e) => setSearchPerson(e.target.value)}
              className="pl-10 bg-card border-border h-12"
            />
          </div>
        </div>

        {/* Calendar header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goToPrevMonth} className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextMonth} className="text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">
              {monthNames[month]} De {year}
            </h2>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={view === "month" ? "default" : "outline"}
              onClick={() => setView("month")}
              className={cn(
                "px-6",
                view === "month" 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              Mês
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              onClick={() => setView("list")}
              className={cn(
                "px-6",
                view === "list" 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              Lista
            </Button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="rounded-xl border border-border overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-border">
            {daysOfWeek.map((day) => (
              <div 
                key={day} 
                className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map((dayInfo, index) => (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] border-b border-r border-border p-2 transition-colors",
                  !dayInfo.isCurrentMonth && "text-muted-foreground/50",
                  dayInfo.isToday && "bg-primary/10",
                  index % 7 === 6 && "border-r-0",
                  index >= 35 && "border-b-0",
                  "hover:bg-card/50 cursor-pointer"
                )}
              >
                <span className={cn(
                  "text-sm font-medium",
                  dayInfo.isToday && "text-primary font-bold"
                )}>
                  {dayInfo.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-card overflow-hidden">
          <div className="h-full rounded-full" style={{ 
            background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
            width: '60%'
          }} />
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}
