import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Console personalizado do RevalidaFlow
const showConsoleMessage = () => {
  // Limpar console primeiro
  console.clear();
  
  // Título principal com estilo
  console.log(
    '%c🩺 Ei, futuro médico!',
    'font-size: 28px; font-weight: bold; color: #22d3ee; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
  );
  
  console.log(
    '%cRevalidaFlow detectou atividade no console! 📋',
    'font-size: 14px; color: #a78bfa; margin-bottom: 10px;'
  );
  
  // Aviso de segurança
  console.log(
    '%c⚠️ DIAGNÓSTICO DE SEGURANÇA:',
    'background: linear-gradient(90deg, #f59e0b, #d97706); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px;'
  );
  
  console.log(
    '%cSe alguém te pediu para colar algo aqui, você pode estar\nprestes a tomar um "remédio" que vai dar uma baita dor de cabeça! 💊',
    'color: #fbbf24; font-size: 12px; padding: 4px 0;'
  );
  
  // Aviso Self-XSS
  console.log(
    '%c🚨 ATENÇÃO: Colar código desconhecido aqui pode comprometer sua conta!',
    'background: #dc2626; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 13px;'
  );
  
  console.log(
    '%cIsso se chama "Self-XSS" e é um golpe comum.',
    'color: #f87171; font-size: 12px;'
  );
  
  // Prescrição
  console.log(
    '%c📝 PRESCRIÇÃO:',
    'color: #22c55e; font-weight: bold; font-size: 14px; margin-top: 10px;'
  );
  
  console.log(
    '%cFeche esta aba e continue estudando em paz.\nA menos que você saiba EXATAMENTE o que está fazendo.',
    'color: #86efac; font-size: 12px;'
  );
  
  // Para desenvolvedores
  console.log(
    '%c👨‍💻 MAS SE VOCÊ É DESENVOLVEDOR...',
    'color: #60a5fa; font-weight: bold; font-size: 14px; margin-top: 10px;'
  );
  
  console.log(
    '%cEstá procurando uma oportunidade? Adoramos gente curiosa!\nEntre em contato pelo nosso GitHub:',
    'color: #93c5fd; font-size: 12px;'
  );
  
  console.log(
    '%chttps://github.com/felipefmed/revalida-flow',
    'color: #22d3ee; font-size: 12px; text-decoration: underline;'
  );
  
  // Mensagem final
  console.log(
    '%c\nAfinal, quem entende de código E medicina é tipo um residente de TI.\nRaro e valioso! 🎯',
    'color: #c4b5fd; font-size: 12px; font-style: italic;'
  );
  
  // Footer
  console.log(
    '%c\nRevalidaFlow © 2025 - Sua jornada para o Revalida começa aqui! 🚀',
    'color: #64748b; font-size: 11px;'
  );
};

// Mostrar mensagem apenas em produção ou quando o console é aberto
if (typeof window !== 'undefined') {
  showConsoleMessage();
}

createRoot(document.getElementById("root")!).render(<App />);
