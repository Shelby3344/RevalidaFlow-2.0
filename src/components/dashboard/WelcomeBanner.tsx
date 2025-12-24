import { Flame, TrendingUp, Target } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState, useEffect } from "react";

export function WelcomeBanner() {
  const { profile } = useUserProfile();
  const [mediaGeral, setMediaGeral] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const notaCorte = 66.148;

  // Calcula a média geral baseada nos desempenhos salvos
  useEffect(() => {
    const desempenhos = localStorage.getItem("userDesempenhos");
    if (desempenhos) {
      const data = JSON.parse(desempenhos);
      if (data.length > 0) {
        const soma = data.reduce((acc: number, d: { nota: number }) => acc + d.nota, 0);
        setMediaGeral(soma / data.length);
      }
    } else {
      setMediaGeral(7.0);
    }
    
    // Sequência de dias (mock por enquanto)
    const seq = localStorage.getItem("userSequencia");
    setSequencia(seq ? parseInt(seq) : 5);
  }, []);

  // Determina se está acima da nota de corte
  const acimaDoCorte = mediaGeral >= notaCorte / 10;

  // Formata o nome
  const getNomeFormatado = () => {
    const partes = profile.nome.trim().split(" ");
    if (partes.length === 1) {
      return partes[0];
    }
    return `${partes[0]} ${partes[partes.length - 1]}`;
  };

  // Iniciais para avatar
  const getIniciais = () => {
    const partes = profile.nome.trim().split(" ");
    if (partes.length === 1) {
      return partes[0].substring(0, 2).toUpperCase();
    }
    return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
  };

  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 p-4 md:p-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative flex items-center gap-3 md:gap-6">
        {/* Avatar */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt="Foto de perfil"
                  className="w-full h-full rounded-xl md:rounded-2xl object-cover"
                />
              ) : (
                <span className="text-white text-lg md:text-2xl font-bold">{getIniciais()}</span>
              )}
            </div>
            {/* Status online */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-500 rounded-full border-2 border-card" />
          </div>
        </div>

        {/* Info principal */}
        <div className="flex-1 min-w-0">
          {/* Saudação */}
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base md:text-lg font-semibold text-foreground truncate">
              Olá, <span className="text-primary">{getNomeFormatado()}</span>! 👋
            </h2>
            {profile.plano === "premium" && (
              <span className="px-1.5 md:px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-[9px] md:text-[10px] font-bold text-white">
                PRO
              </span>
            )}
          </div>
          
          {/* Mensagem motivacional */}
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            {acimaDoCorte 
              ? "Você está no caminho certo! Continue assim." 
              : "Continue estudando, você está evoluindo!"}
          </p>

          {/* Stats em linha */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {/* Média */}
            <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-secondary/50">
              <Target className={`w-3.5 h-3.5 md:w-4 md:h-4 ${acimaDoCorte ? 'text-emerald-500' : 'text-amber-500'}`} />
              <div>
                <span className="text-[10px] md:text-xs text-muted-foreground">Média</span>
                <p className={`text-xs md:text-sm font-bold ${acimaDoCorte ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {mediaGeral.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Nota de corte */}
            <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-secondary/50">
              <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
              <div>
                <span className="text-[10px] md:text-xs text-muted-foreground">Nota de corte</span>
                <p className="text-xs md:text-sm font-bold text-blue-500">{notaCorte}</p>
              </div>
            </div>

            {/* Sequência */}
            <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <Flame className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-500" />
              <div>
                <span className="text-[10px] md:text-xs text-muted-foreground">Sequência</span>
                <p className="text-xs md:text-sm font-bold text-orange-500">{sequencia} dias 🔥</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Premium (se não for premium) */}
        {profile.plano !== "premium" && (
          <div className="hidden lg:block">
            <a 
              href="#" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Seja Premium
            </a>
          </div>
        )}
      </div>

      {/* Barra de progresso visual */}
      <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-border/30">
        <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2">
          <span>Progresso para a aprovação</span>
          <span className={acimaDoCorte ? 'text-emerald-500 font-medium' : ''}>
            {((mediaGeral / (notaCorte / 10)) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-1.5 md:h-2 rounded-full bg-secondary overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              acimaDoCorte 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500'
            }`}
            style={{ width: `${Math.min((mediaGeral / (notaCorte / 10)) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
