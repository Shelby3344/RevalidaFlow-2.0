import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Console personalizado do ProREV
const showConsoleMessage = () => {
  // Título grande e chamativo
  console.log(
    "%c🩺 Ei, futuro médico!",
    "font-size: 32px; font-weight: bold; color: #22d3ee; padding: 20px 0;"
  );

  console.log(
    "%cProREV detectou atividade suspeita no console! 🔍",
    "font-size: 16px; color: #a78bfa; padding-bottom: 15px;"
  );

  // Bloco de Diagnóstico
  console.log(
    "%c ⚠️  DIAGNÓSTICO DE SEGURANÇA: ",
    "background: #f59e0b; color: #000; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 4px;"
  );
  console.log(
    "%c   Se alguém te pediu para colar algo aqui, você pode estar",
    "color: #fcd34d; font-size: 13px; padding: 5px 0;"
  );
  console.log(
    "%c   prestes a tomar um \"remédio\" que vai dar uma baita dor de cabeça! 💊",
    "color: #fcd34d; font-size: 13px;"
  );

  console.log(""); // Espaço

  // Bloco de Atenção
  console.log(
    "%c 🚨 ATENÇÃO: Colar código desconhecido aqui pode comprometer sua conta! ",
    "background: #dc2626; color: #fff; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 4px;"
  );
  console.log(
    "%c   Isso se chama \"Self-XSS\" e é um golpe comum.",
    "color: #fca5a5; font-size: 13px; padding: 5px 0;"
  );

  console.log(""); // Espaço

  // Bloco de Prescrição
  console.log(
    "%c 📝 PRESCRIÇÃO: ",
    "background: #22c55e; color: #000; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 4px;"
  );
  console.log(
    "%c   Feche esta aba e continue estudando em paz.",
    "color: #86efac; font-size: 13px; padding: 5px 0;"
  );
  console.log(
    "%c   A menos que você saiba EXATAMENTE o que está fazendo.",
    "color: #86efac; font-size: 13px;"
  );

  console.log(""); // Espaço

  // Bloco para Desenvolvedores
  console.log(
    "%c 👨‍💻 MAS SE VOCÊ É DESENVOLVEDOR... ",
    "background: #3b82f6; color: #fff; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 4px;"
  );
  console.log(
    "%c   Está procurando uma oportunidade? Adoramos gente curiosa!",
    "color: #93c5fd; font-size: 13px; padding: 5px 0;"
  );
  console.log(
    "%c   Entre em contato pelo nosso suporte:",
    "color: #93c5fd; font-size: 13px;"
  );
  console.log(
    "%c   https://github.com/felipefmed/revalida-flow",
    "color: #22d3ee; font-size: 13px; text-decoration: underline; padding: 5px 0;"
  );

  console.log(""); // Espaço

  // Mensagem final
  console.log(
    "%cAfinal, quem entende de código E medicina é tipo um residente de TI.",
    "color: #c4b5fd; font-size: 13px; font-style: italic;"
  );
  console.log(
    "%cRaro e valioso! 🎯",
    "color: #c4b5fd; font-size: 13px; font-style: italic;"
  );

  console.log(""); // Espaço

  // Footer
  console.log(
    "%cProREV © 2025",
    "color: #64748b; font-size: 12px;"
  );
};

// Mostrar mensagem quando o app carrega
if (typeof window !== "undefined") {
  showConsoleMessage();
}

createRoot(document.getElementById("root")!).render(<App />);
