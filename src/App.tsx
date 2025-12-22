import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Checklists from "./pages/Checklists";
import ChecklistExecution from "./pages/ChecklistExecution";
import AvaliacaoAvaliador from "./pages/AvaliacaoAvaliador";
import AvaliacaoAvaliado from "./pages/AvaliacaoAvaliado";
import TreinoIA from "./pages/TreinoIA";
import TreinoIACompleto from "./pages/TreinoIACompleto";
import FlashcardsPage from "./pages/FlashcardsPage";
import PenseResumos from "./pages/PenseResumos";
import CronogramaCalendar from "./pages/CronogramaCalendar";
import LiveParceiros from "./pages/LiveParceiros";
import Novidades from "./pages/Novidades";
import Aulas from "./pages/Aulas";
import MeusDesempenhos from "./pages/MeusDesempenhos";
import HistoricoChecklist from "./pages/HistoricoChecklist";
import Mentorados from "./pages/Mentorados";
import Feedback from "./pages/Feedback";
import Suporte from "./pages/Suporte";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/checklists/execucao/:id" element={<ChecklistExecution />} />
          <Route path="/avaliacao/:sessionCode" element={<AvaliacaoAvaliador />} />
          <Route path="/avaliacao/participar/:sessionCode" element={<AvaliacaoAvaliado />} />
          <Route path="/treino-ia/:checklistId" element={<TreinoIA />} />
          <Route path="/treino-ia-completo/:checklistId" element={<TreinoIACompleto />} />
          <Route path="/checklists/parceiros" element={<Checklists />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/flashcards/revisao" element={<FlashcardsPage />} />
          <Route path="/resumos" element={<PenseResumos />} />
          <Route path="/cronograma" element={<CronogramaCalendar />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/live" element={<LiveParceiros />} />
          <Route path="/novidades" element={<Novidades />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/desempenhos" element={<MeusDesempenhos />} />
          <Route path="/historico/checklist" element={<HistoricoChecklist />} />
          <Route path="/historico/flashcard" element={<HistoricoChecklist />} />
          <Route path="/mentorados" element={<Mentorados />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
