import { ChevronLeft, ChevronRight } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState, useEffect } from "react";

export function WelcomeBanner() {
  const { profile } = useUserProfile();
  const [mediaGeral, setMediaGeral] = useState(0);
  const notaCorte = 66.148;

  // Calcula a média geral baseada nos desempenhos salvos
  useEffect(() => {
    // Busca desempenhos do localStorage
    const desempenhos = localStorage.getItem("userDesempenhos");
    if (desempenhos) {
      const data = JSON.parse(desempenhos);
      if (data.length > 0) {
        const soma = data.reduce((acc: number, d: { nota: number }) => acc + d.nota, 0);
        setMediaGeral(soma / data.length);
      }
    } else {
      // Valor padrão se não houver desempenhos
      setMediaGeral(7.0);
    }
  }, []);

  // Determina a mensagem baseada na média
  const getMensagem = () => {
    if (mediaGeral >= notaCorte / 10) {
      return "parabéns! Sua média está acima da nota de corte definida";
    } else {
      return "continue estudando! Sua média está abaixo da nota de corte definida";
    }
  };

  // Formata o nome com título
  const getNomeFormatado = () => {
    const primeiroNome = profile.nome.split(" ")[0];
    const ultimoNome = profile.nome.split(" ").slice(-1)[0];
    return `Dr(a) ${primeiroNome} ${ultimoNome}`;
  };

  return (
    <div className="relative overflow-hidden rounded-xl card-gradient p-6">
      {/* Premium link */}
      <a href="#" className="text-sm text-primary hover:underline mb-4 block">
        Faça parte do Grupo Premium 2025.2 Telegram / Whatsapp ( Grupo 4 )
      </a>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Streak icons */}
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-3xl opacity-30">🔥</div>
            ))}
          </div>

          {/* Welcome message */}
          <p className="text-foreground">
            <span className="text-primary font-semibold">{getNomeFormatado()}</span> sua média geral está em{" "}
            <span className="text-warning font-bold">{mediaGeral.toFixed(2)}</span>, {getMensagem()}
            <br />
            <span className="font-bold">{notaCorte}</span>. Continue treinando firme!
          </p>
        </div>

        {/* Illustration */}
        <div className="relative hidden md:block">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="w-48 h-48 relative">
            {/* Avatar do usuário ou placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt="Foto de perfil"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-warning/30 to-primary/30 flex items-center justify-center">
                    <span className="text-4xl">👩‍⚕️</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 rounded-full overflow-hidden flex">
        <div className="h-full bg-success w-1/4"></div>
        <div className="h-full bg-warning w-1/4"></div>
        <div className="h-full bg-info w-1/4"></div>
        <div className="h-full bg-primary w-1/4"></div>
      </div>
    </div>
  );
}
