import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Brain, 
  CheckCircle2, 
  Users, 
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
  BarChart3,
  Clock,
  ChevronDown,
  Mail,
  Instagram,
  Youtube,
  Stethoscope,
  FileQuestion,
  Calendar,
  Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: FileQuestion,
      title: "4.116 Questões",
      description: "Banco completo de questões do REVALIDA com gabarito comentado por IA.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: CheckCircle2,
      title: "Checklists OSCE",
      description: "176+ checklists oficiais das principais bancas organizados por área.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Paciente Virtual IA",
      description: "Treine anamnese e exame físico com pacientes virtuais realistas.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Treino Colaborativo",
      description: "Pratique com colegas em tempo real. Um avalia, outro executa.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BookOpen,
      title: "Resumos Objetivos",
      description: "Material de estudo direcionado para cada tema da prova.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Calendar,
      title: "Cronograma Inteligente",
      description: "Organize seus estudos com metas e acompanhamento de progresso.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Crie sua conta",
      description: "Cadastro rápido e gratuito. Comece a estudar em minutos."
    },
    {
      number: "02", 
      title: "Escolha seu foco",
      description: "Selecione as áreas que deseja estudar e monte seu cronograma."
    },
    {
      number: "03",
      title: "Pratique diariamente",
      description: "Resolva questões, treine checklists e simule consultas com IA."
    },
    {
      number: "04",
      title: "Conquiste sua aprovação",
      description: "Acompanhe seu progresso e chegue preparado para a prova."
    }
  ];

  const faqs = [
    {
      question: "O ProREV é indicado para quem?",
      answer: "O ProREV é ideal para médicos formados no exterior que precisam se preparar para o exame REVALIDA do INEP. Nossa plataforma cobre tanto a prova teórica quanto a prática (OSCE)."
    },
    {
      question: "Como funciona o treino com Paciente IA?",
      answer: "Você conversa por voz com um paciente virtual que responde de forma realista. A IA simula diferentes casos clínicos e avalia sua conduta automaticamente."
    },
    {
      question: "Os checklists são atualizados?",
      answer: "Sim! Mantemos todos os checklists atualizados conforme as últimas provas do REVALIDA. São 176+ checklists organizados por área médica."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais."
    },
    {
      question: "Tem garantia de aprovação?",
      answer: "Oferecemos garantia de satisfação de 7 dias. Se não gostar, devolvemos 100% do valor pago."
    }
  ];

  const plans = [
    {
      name: "Mensal",
      price: "49",
      period: "/mês",
      description: "Flexibilidade total",
      features: [
        "Acesso a todas as questões",
        "Checklists OSCE completos",
        "Treino com Paciente IA",
        "Resumos e Flashcards",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Semestral",
      price: "39",
      period: "/mês",
      originalPrice: "294",
      totalPrice: "234",
      description: "Economia de 20%",
      features: [
        "Tudo do plano Mensal",
        "Treino Colaborativo",
        "Cronograma personalizado",
        "Simulados exclusivos",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Anual",
      price: "29",
      period: "/mês",
      originalPrice: "588",
      totalPrice: "348",
      description: "Melhor custo-benefício",
      features: [
        "Tudo do plano Semestral",
        "Mentor IA personalizado",
        "Acesso vitalício às atualizações",
        "Grupo exclusivo no WhatsApp",
        "Certificado de conclusão"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Pro<span className="text-cyan-400">REV</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="text-sm text-gray-400 hover:text-white transition-colors">Recursos</a>
              <a href="#como-funciona" className="text-sm text-gray-400 hover:text-white transition-colors">Como Funciona</a>
              <a href="#planos" className="text-sm text-gray-400 hover:text-white transition-colors">Planos</a>
              <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full px-6"
                onClick={() => navigate("/login")}
              >
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Plataforma #1 para REVALIDA</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sua aprovação no{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                REVALIDA
              </span>{" "}
              começa aqui
            </h1>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              A plataforma mais completa para preparação do REVALIDA. 
              Questões comentadas, checklists OSCE, treino com IA e muito mais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full px-8 h-14 text-lg"
                onClick={() => navigate("/login")}
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full px-8 h-14 text-lg border-gray-700 hover:bg-white/5"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((letter, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-2 border-[#0a0a1a] flex items-center justify-center text-xs font-medium"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">+2.500 alunos</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-400 ml-1">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-gray-400">Veja a plataforma em ação</p>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -left-8 top-1/4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">176+ Checklists</p>
                    <p className="text-xs text-gray-400">OSCE completo</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <FileQuestion className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">4.116 Questões</p>
                    <p className="text-xs text-gray-400">Com gabarito IA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4.116", label: "Questões", icon: FileQuestion },
              { value: "176+", label: "Checklists OSCE", icon: CheckCircle2 },
              { value: "89%", label: "Taxa de Aprovação", icon: Trophy },
              { value: "2.500+", label: "Alunos Ativos", icon: Users }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para{" "}
              <span className="text-cyan-400">passar</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Uma plataforma completa com recursos exclusivos desenvolvidos 
              especificamente para o REVALIDA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br",
                  feature.color
                )}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como <span className="text-cyan-400">funciona</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Em 4 passos simples você já está no caminho da aprovação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-cyan-500/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos que cabem no seu{" "}
              <span className="text-cyan-400">bolso</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Escolha o plano ideal para sua preparação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "relative p-8 rounded-3xl border transition-all duration-300",
                  plan.popular 
                    ? "bg-gradient-to-b from-cyan-500/10 to-purple-500/10 border-cyan-500/50 scale-105" 
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">R${plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                  {plan.totalPrice && (
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="line-through">R${plan.originalPrice}</span>
                      {" "}R${plan.totalPrice} total
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={cn(
                    "w-full rounded-full h-12",
                    plan.popular 
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700" 
                      : "bg-white/10 hover:bg-white/20"
                  )}
                  onClick={() => navigate("/login")}
                >
                  Começar Agora
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas <span className="text-cyan-400">Frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-gray-400 transition-transform flex-shrink-0",
                    openFaq === index && "rotate-180"
                  )} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para conquistar sua aprovação?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Junte-se a mais de 2.500 médicos que já estão se preparando com o ProREV.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full px-10 h-14 text-lg"
              onClick={() => navigate("/login")}
            >
              Começar Agora - É Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">
                  Pro<span className="text-cyan-400">REV</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                A plataforma mais completa para sua aprovação no REVALIDA.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Questões</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Checklists OSCE</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Paciente IA</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resumos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="mailto:contato@prorev.com.br" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500">
            <p>© 2025 ProREV. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
