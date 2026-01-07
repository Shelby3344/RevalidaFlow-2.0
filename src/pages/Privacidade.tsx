import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

export default function Privacidade() {
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-8">Última atualização: Janeiro de 2025</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              A sua privacidade é importante para nós. Esta Política de Privacidade explica como o ProREV 
              coleta, usa, divulga e protege suas informações pessoais quando você utiliza nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Informações que Coletamos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Coletamos os seguintes tipos de informações:
            </p>
            
            <h3 className="text-lg font-medium text-foreground mb-2">2.1 Informações de Cadastro</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Foto de perfil (opcional)</li>
              <li>Informações de login social (Google, GitHub)</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-2">2.2 Informações de Uso</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Histórico de checklists realizados</li>
              <li>Pontuações e desempenho</li>
              <li>Tempo de estudo</li>
              <li>Progresso nos flashcards</li>
              <li>Interações com o paciente IA</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-2">2.3 Informações Técnicas</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Sistema operacional</li>
              <li>Páginas visitadas e tempo de permanência</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Como Usamos suas Informações</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Fornecer e manter nossos serviços</li>
              <li>Personalizar sua experiência de estudo</li>
              <li>Processar pagamentos e assinaturas</li>
              <li>Enviar comunicações importantes sobre o serviço</li>
              <li>Melhorar e desenvolver novos recursos</li>
              <li>Analisar o uso da plataforma</li>
              <li>Prevenir fraudes e garantir a segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Compartilhamento de Informações</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Não vendemos suas informações pessoais. Podemos compartilhar dados com:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Provedores de serviço:</strong> Empresas que nos ajudam a operar a plataforma (hospedagem, pagamentos, analytics)</li>
              <li><strong>Parceiros de autenticação:</strong> Google e GitHub para login social</li>
              <li><strong>Autoridades legais:</strong> Quando exigido por lei ou ordem judicial</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Segurança dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Criptografia SSL/TLS em todas as comunicações</li>
              <li>Armazenamento seguro em servidores protegidos</li>
              <li>Acesso restrito aos dados pessoais</li>
              <li>Monitoramento contínuo de segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Acesso:</strong> Solicitar uma cópia dos seus dados pessoais</li>
              <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão dos seus dados</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
              <li><strong>Revogação:</strong> Retirar seu consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, lembrar suas preferências 
              e analisar o uso da plataforma. Você pode configurar seu navegador para recusar cookies, 
              mas isso pode afetar algumas funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Retenção de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mantemos suas informações enquanto sua conta estiver ativa ou conforme necessário para fornecer 
              nossos serviços. Após o encerramento da conta, podemos reter alguns dados por até 5 anos 
              para fins legais, contábeis ou de auditoria.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Menores de Idade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente 
              informações de menores de idade. Se tomarmos conhecimento de que coletamos dados de um menor, 
              tomaremos medidas para excluir essas informações.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Alterações nesta Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações 
              significativas por email ou através de um aviso na plataforma. Recomendamos revisar esta 
              política regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">11. Contato do DPO</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com 
              nosso Encarregado de Proteção de Dados (DPO):
            </p>
            <div className="mt-4 p-4 bg-card rounded-lg border border-border">
              <p className="text-foreground font-medium">Email:</p>
              <a href="mailto:privacidade@prorev.com.br" className="text-cyan-400 hover:underline">
                privacidade@prorev.com.br
              </a>
            </div>
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
