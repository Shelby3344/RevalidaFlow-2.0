import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

export default function TermosDeUso() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">
              Pro<span className="text-cyan-400">REV</span>
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Termos de Uso</h1>
        <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao acessar e usar a plataforma ProREV, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground leading-relaxed">
              O ProREV é uma plataforma educacional online destinada à preparação para o exame Revalida. 
              Oferecemos checklists OSCE, treino com paciente virtual por IA, salas colaborativas, flashcards, 
              resumos e outras ferramentas de estudo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Cadastro e Conta</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Para utilizar nossos serviços, você deve:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Fornecer informações verdadeiras e completas no cadastro</li>
              <li>Manter a confidencialidade de sua senha</li>
              <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Uso Aceitável</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Você concorda em não:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Compartilhar sua conta com terceiros</li>
              <li>Copiar, distribuir ou reproduzir o conteúdo da plataforma</li>
              <li>Usar a plataforma para fins ilegais ou não autorizados</li>
              <li>Tentar acessar áreas restritas do sistema</li>
              <li>Interferir no funcionamento da plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Propriedade Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo o conteúdo disponível na plataforma, incluindo textos, gráficos, logos, ícones, imagens, 
              clipes de áudio, downloads digitais e compilações de dados, é propriedade do ProREV ou 
              de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Pagamentos e Assinaturas</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ao adquirir uma assinatura:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Você autoriza a cobrança recorrente conforme o plano escolhido</li>
              <li>Os preços podem ser alterados com aviso prévio de 30 dias</li>
              <li>Cancelamentos podem ser feitos a qualquer momento</li>
              <li>Reembolsos seguem nossa política de garantia de 7 dias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Garantia de 7 Dias</h2>
            <p className="text-muted-foreground leading-relaxed">
              Oferecemos garantia incondicional de 7 dias. Se você não estiver satisfeito com o serviço, 
              pode solicitar o reembolso integral dentro deste período, sem necessidade de justificativa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              O ProREV é uma ferramenta de estudo e não garante aprovação em exames. 
              Não nos responsabilizamos por decisões tomadas com base no conteúdo da plataforma. 
              O serviço é fornecido "como está", sem garantias de qualquer tipo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Modificações dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              Alterações significativas serão comunicadas por email ou através da plataforma. 
              O uso continuado após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para dúvidas sobre estes Termos de Uso, entre em contato através do email: 
              <a href="mailto:contato@prorev.com.br" className="text-cyan-400 hover:underline ml-1">
                contato@prorev.com.br
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 ProREV. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
