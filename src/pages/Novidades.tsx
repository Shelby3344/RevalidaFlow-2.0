import { Bell, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Novidades() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">ProREV Novidades</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Checklists column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-cyan-400">Checklists</h2>
            </div>
            
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-sm text-muted-foreground">
                Nenhuma novidade no momento
              </p>
            </div>
          </div>

          {/* Flashcards column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-semibold text-pink-400">Flashcards</h2>
            </div>
            
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <p className="text-sm text-muted-foreground">
                Nenhuma novidade no momento
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}
