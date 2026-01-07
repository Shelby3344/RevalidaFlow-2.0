import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { UserProfileProvider } from "@/hooks/useUserProfile";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Checklists from "./pages/Checklists";
import ChecklistExecution from "./pages/ChecklistExecution";
import AvaliacaoAvaliador from "./pages/AvaliacaoAvaliador";
import AvaliacaoAvaliado from "./pages/AvaliacaoAvaliado";
import TreinoIA from "./pages/TreinoIA";
import TreinoIACompleto from "./pages/TreinoIACompleto";
import CollaborativeRoom from "./pages/CollaborativeRoom";
import FlashcardsPage from "./pages/FlashcardsPage";
import PenseResumos from "./pages/PenseResumos";
import CronogramaCalendar from "./pages/CronogramaCalendar";
import LiveParceiros from "./pages/LiveParceiros";
import Novidades from "./pages/Novidades";
import Aulas from "./pages/Aulas";
import MeusDesempenhos from "./pages/MeusDesempenhos";
import Analytics from "./pages/Analytics";
import Produtividade from "./pages/Produtividade";
import HistoricoChecklist from "./pages/HistoricoChecklist";
import Mentorados from "./pages/Mentorados";
import Feedback from "./pages/Feedback";
import Suporte from "./pages/Suporte";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import TermosDeUso from "./pages/TermosDeUso";
import Privacidade from "./pages/Privacidade";
import Comunidade from "./pages/Comunidade";
import PainelRevalida from "./pages/PainelRevalida";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="revalida-flow-theme">
      <AuthProvider>
        <UserProfileProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/entrar" element={<Login />} />
                <Route path="/termos" element={<TermosDeUso />} />
                <Route path="/privacidade" element={<Privacidade />} />
                
                {/* Rotas Protegidas */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/checklists" element={<ProtectedRoute><Checklists /></ProtectedRoute>} />
                <Route path="/checklists/execucao/:id" element={<ProtectedRoute><ChecklistExecution /></ProtectedRoute>} />
                <Route path="/checklists/parceiros" element={<ProtectedRoute><Checklists /></ProtectedRoute>} />
                <Route path="/collaborative/:roomId" element={<ProtectedRoute><CollaborativeRoom /></ProtectedRoute>} />
                <Route path="/avaliacao/:sessionCode" element={<ProtectedRoute><AvaliacaoAvaliador /></ProtectedRoute>} />
                <Route path="/avaliacao/participar/:sessionCode" element={<ProtectedRoute><AvaliacaoAvaliado /></ProtectedRoute>} />
                <Route path="/treino-ia/:checklistId" element={<ProtectedRoute><TreinoIA /></ProtectedRoute>} />
                <Route path="/treino-ia-completo/:checklistId" element={<ProtectedRoute><TreinoIACompleto /></ProtectedRoute>} />
                <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
                <Route path="/flashcards/revisao" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
                <Route path="/resumos" element={<ProtectedRoute><PenseResumos /></ProtectedRoute>} />
                <Route path="/cronograma" element={<ProtectedRoute><CronogramaCalendar /></ProtectedRoute>} />
                <Route path="/live" element={<ProtectedRoute><LiveParceiros /></ProtectedRoute>} />
                <Route path="/novidades" element={<ProtectedRoute><Novidades /></ProtectedRoute>} />
                <Route path="/aulas" element={<ProtectedRoute><Aulas /></ProtectedRoute>} />
                <Route path="/desempenhos" element={<ProtectedRoute><MeusDesempenhos /></ProtectedRoute>} />
                <Route path="/produtividade" element={<ProtectedRoute><Produtividade /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/historico/checklist" element={<ProtectedRoute><HistoricoChecklist /></ProtectedRoute>} />
                <Route path="/historico/flashcard" element={<ProtectedRoute><HistoricoChecklist /></ProtectedRoute>} />
                <Route path="/mentorados" element={<ProtectedRoute><Mentorados /></ProtectedRoute>} />
                <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                <Route path="/suporte" element={<ProtectedRoute><Suporte /></ProtectedRoute>} />
                <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                <Route path="/comunidade" element={<ProtectedRoute><Comunidade /></ProtectedRoute>} />
                <Route path="/painel-revalida" element={<ProtectedRoute><PainelRevalida /></ProtectedRoute>} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
