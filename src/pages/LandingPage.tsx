import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
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
  Clock,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Linkedin,
  Shield,
  Headphones,
  CreditCard,
  Quote
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
  const { user, loading } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

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
              <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Como Funciona
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Planos
              </a>
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Resultados
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

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos <span className="text-cyan-400">alunos</span> dizem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milhares de médicos já conquistaram sua aprovação com o RevalidaFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Carlos Silva",
                role: "Aprovado Revalida 2024",
                avatar: "CS",
                text: "O treino com paciente IA foi um diferencial enorme. Consegui praticar anamnese todos os dias sem depender de colegas. Aprovei de primeira!",
                rating: 5
              },
              {
                name: "Dra. Ana Beatriz",
                role: "Aprovada Revalida 2024",
                avatar: "AB",
                text: "Os checklists são idênticos aos da prova. A pontuação detalhada me ajudou a identificar exatamente onde eu estava errando. Recomendo demais!",
                rating: 5
              },
              {
                name: "Dr. Pedro Henrique",
                role: "Aprovado Revalida 2023",
                avatar: "PH",
                text: "O treino colaborativo com meus colegas de estudo foi essencial. Conseguimos simular a prova real e nos preparar muito melhor.",
                rating: 5
              },
              {
                name: "Dra. Mariana Costa",
                role: "Aprovada Revalida 2024",
                avatar: "MC",
                text: "A plataforma é muito intuitiva e completa. Os resumos e flashcards me ajudaram muito na parte teórica. Vale cada centavo!",
                rating: 5
              },
              {
                name: "Dr. Lucas Oliveira",
                role: "Aprovado Revalida 2024",
                avatar: "LO",
                text: "Estudei 3 meses com o RevalidaFlow e passei com nota alta. O sistema de gamificação me manteve motivado durante toda a preparação.",
                rating: 5
              },
              {
                name: "Dra. Juliana Santos",
                role: "Aprovada Revalida 2023",
                avatar: "JS",
                text: "O reconhecimento de voz funciona muito bem. Parece que estou realmente conversando com um paciente. Tecnologia de ponta!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-cyan-500/20 mb-2" />
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos que cabem no seu <span className="text-cyan-400">bolso</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para sua preparação. Todos incluem acesso completo à plataforma.
            </p>
          </div>

          {/* Banner de Lançamento */}
          <div className="mb-12 p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-400">🎉 OFERTA DE LANÇAMENTO</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">Primeiros 90 dias com desconto especial!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Plano PRO Mensal */}
            <div className="relative p-6 rounded-2xl bg-card border border-border/50 hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-medium text-white">
                ✨ PRO
              </div>
              <h3 className="text-lg font-semibold mb-2 mt-2">Mensal</h3>
              <p className="text-muted-foreground text-sm mb-4">Flexibilidade total</p>
              <div className="mb-2">
                <span className="text-3xl font-bold">R$19,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <div className="mb-4 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-xs text-yellow-400 font-medium">🎉 Lançamento: R$14,90/mês</p>
                <p className="text-xs text-muted-foreground">25% OFF nos primeiros 90 dias</p>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Acesso a todos os checklists",
                  "Treino com Paciente IA",
                  "Treino Colaborativo",
                  "Resumos e Flashcards",
                  "Suporte por email"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Começar Agora
              </Button>
            </div>

            {/* Plano PRO Anual - Destaque */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 lg:scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-medium text-white">
                Mais Popular
              </div>
              <h3 className="text-lg font-semibold mb-2 mt-2">Anual</h3>
              <p className="text-muted-foreground text-sm mb-4">Melhor custo-benefício</p>
              <div className="mb-2">
                <span className="text-3xl font-bold">R$14,99</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <p className="text-xs text-cyan-400 mb-2">R$179,90/ano (25% OFF)</p>
              <div className="mb-4 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-xs text-yellow-400 font-medium">🎉 Lançamento: R$149,90/ano</p>
                <p className="text-xs text-muted-foreground">37% OFF nos primeiros 90 dias</p>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Tudo do plano Mensal",
                  "Acesso prioritário a novidades",
                  "Mentor IA personalizado",
                  "Simulados exclusivos",
                  "Suporte prioritário"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                onClick={() => navigate("/login")}
              >
                Escolher Anual
              </Button>
            </div>

            {/* Plano BUSINESS */}
            <div className="relative p-6 rounded-2xl bg-card border border-border/50 hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-medium text-white">
                🏢 BUSINESS
              </div>
              <h3 className="text-lg font-semibold mb-2 mt-2">Business</h3>
              <p className="text-muted-foreground text-sm mb-4">Para grupos de estudo</p>
              <div className="mb-2">
                <span className="text-3xl font-bold">R$79</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <div className="mb-4 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-xs text-yellow-400 font-medium">🎉 Lançamento: R$69/mês</p>
                <p className="text-xs text-muted-foreground">13% OFF nos primeiros 90 dias</p>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Tudo do plano Anual",
                  "Até 5 usuários",
                  "Painel administrativo",
                  "Relatórios de progresso",
                  "Suporte dedicado"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-purple-500/50 hover:bg-purple-500/10"
                onClick={() => navigate("/login")}
              >
                Escolher Business
              </Button>
            </div>

            {/* Plano ENTERPRISE */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-yellow-500/5 to-orange-500/5 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
              <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-medium text-white">
                🏆 ENTERPRISE
              </div>
              <h3 className="text-lg font-semibold mb-2 mt-2">Enterprise</h3>
              <p className="text-muted-foreground text-sm mb-4">Para instituições</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">R$299</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Tudo do plano Business",
                  "Usuários ilimitados",
                  "API de integração",
                  "Customização de marca",
                  "Gerente de conta dedicado",
                  "SLA garantido"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-yellow-500/50 hover:bg-yellow-500/10"
                onClick={() => navigate("/login")}
              >
                Falar com Vendas
              </Button>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-400">Garantia de 7 dias ou seu dinheiro de volta</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas <span className="text-cyan-400">Frequentes</span>
            </h2>
            <p className="text-muted-foreground">
              Tire suas dúvidas sobre a plataforma
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "O que é o RevalidaFlow?",
                answer: "O RevalidaFlow é a plataforma mais completa para preparação da prova prática do Revalida. Oferecemos treino com paciente virtual por IA, 176+ checklists OSCE oficiais, treino colaborativo em tempo real, resumos, flashcards e muito mais."
              },
              {
                question: "Como funciona o treino com Paciente IA?",
                answer: "Você conversa por voz com um paciente virtual que responde em tempo real usando inteligência artificial. É como uma consulta médica real - você faz anamnese, solicita exames e recebe respostas naturais. Ao final, recebe uma avaliação detalhada do seu desempenho."
              },
              {
                question: "Os checklists são das bancas oficiais?",
                answer: "Sim! Temos 176+ checklists baseados nas principais bancas do Revalida (INEP, UFMT, etc). Cada checklist tem pontuação detalhada item por item, exatamente como na prova real."
              },
              {
                question: "Posso treinar com outros colegas?",
                answer: "Sim! O treino colaborativo permite criar salas em tempo real onde um colega avalia enquanto o outro executa o checklist. É perfeito para simular a dinâmica real da prova."
              },
              {
                question: "Funciona no celular?",
                answer: "Sim! A plataforma é totalmente responsiva e funciona em qualquer dispositivo - computador, tablet ou celular. O reconhecimento de voz também funciona no mobile."
              },
              {
                question: "Tem garantia?",
                answer: "Sim! Oferecemos garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu dinheiro, sem perguntas."
              },
              {
                question: "Como faço para cancelar?",
                answer: "Você pode cancelar a qualquer momento diretamente na plataforma, sem burocracia. Seu acesso continua até o fim do período pago."
              }
            ].map((faq, index) => (
              <details 
                key={index}
                className="group p-4 rounded-xl bg-card border border-border/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: "Pagamento Seguro", desc: "SSL 256-bit" },
              { icon: CreditCard, label: "Parcelamento", desc: "Até 12x sem juros" },
              { icon: Headphones, label: "Suporte", desc: "7 dias por semana" },
              { icon: Trophy, label: "Satisfação", desc: "98% de aprovação" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
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
                onClick={() => navigate("/login")}
              >
                Criar Conta Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">
                  Revalida<span className="text-cyan-400">Flow</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                A plataforma mais completa para sua aprovação no Revalida.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Plataforma</h4>
              <ul className="space-y-2">
                {["Checklists", "Treino IA", "Colaborativo", "Flashcards", "Resumos"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2">
                {["Sobre nós", "Blog", "Carreiras", "Parceiros", "Afiliados"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="/termos" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="/privacidade" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-b border-border/50 mb-8">
            <a href="mailto:contato@revalidaflow.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
              <Mail className="w-4 h-4" />
              contato@revalidaflow.com
            </a>
            <a href="tel:+5511999999999" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
              <Phone className="w-4 h-4" />
              (11) 99999-9999
            </a>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              São Paulo, Brasil
            </span>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 RevalidaFlow. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Feito com 💜 para médicos que sonham alto
            </p>
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
