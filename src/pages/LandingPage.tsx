import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  CheckCircle2, 
  Users, 
  Mic, 
  BookOpen, 
  Trophy,
  ArrowRight,
  Sparkles,
  Play,
  Star,
  Zap,
  Target,
  GraduationCap,
  Check,
  MessageSquare,
  BarChart3,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollStack, { ScrollStackItem } from "@/components/landing/ScrollStack";

// Componente de partículas animadas
function ParticlesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// Componente de card de feature com hover effect
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient,
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  gradient: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50",
        "hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10",
        "transition-all duration-500 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
        "bg-gradient-to-br", gradient
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

// Componente de estatística animada
function AnimatedStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Treino com IA",
      description: "Paciente virtual com voz realista. Pratique anamnese e exame físico como se fosse real.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckCircle2,
      title: "Checklists OSCE",
      description: "176+ checklists oficiais das principais bancas. Avalie seu desempenho item por item.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Treino Colaborativo",
      description: "Pratique com colegas em tempo real. Um avalia, outro executa. Feedback instantâneo.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Mic,
      title: "Reconhecimento de Voz",
      description: "Fale naturalmente com o paciente IA. Sua voz é transcrita e respondida em tempo real.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BookOpen,
      title: "Resumos Inteligentes",
      description: "Resumos objetivos de cada tema. Estude de forma direcionada para a prova.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Trophy,
      title: "Gamificação",
      description: "Pontuação, ranking e conquistas. Mantenha a motivação e acompanhe sua evolução.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Revalida<span className="text-cyan-400">Flow</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Resultados
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Planos
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                onClick={() => navigate("/dashboard")}
              >
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <ParticlesBackground />
        
        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Plataforma #1 para Revalida</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Sua aprovação no{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Revalida
            </span>
            <br />
            começa aqui
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Treine com pacientes virtuais, pratique checklists OSCE e estude com 
            inteligência artificial. A forma mais eficiente de se preparar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8 h-14 rounded-xl"
              onClick={() => navigate("/dashboard")}
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 h-14 rounded-xl border-border/50 hover:bg-card"
            >
              <Play className="w-5 h-5 mr-2" />
              Ver Demo
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-2 border-background flex items-center justify-center text-xs text-white font-medium"
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm">+2.500 alunos</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm ml-1">4.9/5</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para{" "}
              <span className="text-cyan-400">passar</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa com recursos exclusivos desenvolvidos 
              especificamente para a prova prática do Revalida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 px-4 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value={176} label="Checklists OSCE" suffix="+" />
            <AnimatedStat value={2500} label="Alunos Ativos" suffix="+" />
            <AnimatedStat value={89} label="Taxa de Aprovação" suffix="%" />
            <AnimatedStat value={50} label="Horas de Conteúdo" suffix="+" />
          </div>
        </div>
      </section>

      {/* ScrollStack Features Section */}
      <section id="recursos" className="relative bg-background">
        <div className="text-center pt-16 pb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Conheça nossos <span className="text-cyan-400">recursos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Role para descobrir tudo que o RevalidaFlow oferece
          </p>
        </div>
        
        <div className="h-screen max-w-4xl mx-auto">
          <ScrollStack
            itemDistance={80}
            itemScale={0.02}
            itemStackDistance={25}
            stackPosition="25%"
            scaleEndPosition="15%"
            baseScale={0.88}
            blurAmount={2}
          >
            <ScrollStackItem itemClassName="gradient-cyan">
              <div className="card-icon">
                <Brain />
              </div>
              <h3>Treino com Paciente IA</h3>
              <p>
                Converse com pacientes virtuais usando sua voz. A IA responde em tempo real 
                com voz natural, simulando uma consulta médica real.
              </p>
              <div className="card-features">
                <span className="card-feature"><Mic /> Reconhecimento de voz</span>
                <span className="card-feature"><MessageSquare /> Respostas naturais</span>
                <span className="card-feature"><Check /> Avaliação automática</span>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="gradient-purple">
              <div className="card-icon">
                <CheckCircle2 />
              </div>
              <h3>176+ Checklists OSCE</h3>
              <p>
                Todos os checklists oficiais das principais bancas do Revalida. 
                Organizados por área com pontuação detalhada.
              </p>
              <div className="card-features">
                <span className="card-feature"><Check /> Bancas oficiais</span>
                <span className="card-feature"><BarChart3 /> Pontuação detalhada</span>
                <span className="card-feature"><Target /> Por área médica</span>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="gradient-green">
              <div className="card-icon">
                <Users />
              </div>
              <h3>Treino Colaborativo</h3>
              <p>
                Pratique com colegas em tempo real. Um avalia enquanto o outro executa. 
                Feedback instantâneo.
              </p>
              <div className="card-features">
                <span className="card-feature"><Users /> Salas em tempo real</span>
                <span className="card-feature"><MessageSquare /> Chat integrado</span>
                <span className="card-feature"><Trophy /> Ranking</span>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="gradient-pink">
              <div className="card-icon">
                <BookOpen />
              </div>
              <h3>Resumos & Flashcards</h3>
              <p>
                Material de estudo objetivo. Resumos por tema e flashcards com repetição espaçada.
              </p>
              <div className="card-features">
                <span className="card-feature"><BookOpen /> Resumos objetivos</span>
                <span className="card-feature"><Zap /> Repetição espaçada</span>
                <span className="card-feature"><Clock /> Estudo otimizado</span>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="gradient-orange">
              <div className="card-icon">
                <Trophy />
              </div>
              <h3>Gamificação & Progresso</h3>
              <p>
                Acompanhe sua evolução com gráficos. Sistema de pontos, conquistas e ranking.
              </p>
              <div className="card-features">
                <span className="card-feature"><Trophy /> Conquistas</span>
                <span className="card-feature"><BarChart3 /> Gráficos</span>
                <span className="card-feature"><Star /> Ranking</span>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="gradient-indigo">
              <div className="card-icon">
                <GraduationCap />
              </div>
              <h3>Cronograma Inteligente</h3>
              <p>
                Organize seus estudos com cronograma personalizado. Metas e lembretes.
              </p>
              <div className="card-features">
                <span className="card-feature"><Clock /> Metas diárias</span>
                <span className="card-feature"><Check /> Acompanhamento</span>
                <span className="card-feature"><Sparkles /> Lembretes</span>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="text-muted-foreground">
              Em 3 passos simples você já está treinando
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: Target, title: "Escolha o checklist", desc: "Selecione entre 176+ checklists organizados por área" },
              { step: 2, icon: Mic, title: "Treine com a IA", desc: "Converse com o paciente virtual usando sua voz" },
              { step: 3, icon: GraduationCap, title: "Receba feedback", desc: "Veja sua pontuação e onde pode melhorar" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-500 text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-8 md:p-12 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Junte-se a milhares de médicos que já estão se preparando com o RevalidaFlow.
                Comece gratuitamente hoje mesmo.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8 h-14 rounded-xl"
                onClick={() => navigate("/dashboard")}
              >
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                Revalida<span className="text-cyan-400">Flow</span>
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2025 RevalidaFlow. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
