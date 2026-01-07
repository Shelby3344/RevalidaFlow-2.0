import { useState } from "react";
import { Send, MessageCircle, Mail, Phone } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Suporte() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada!",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setCategory("");
    setSubject("");
    setMessage("");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Suporte</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Precisa de ajuda? Entre em contato conosco através dos canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl card-gradient p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Chat</h3>
            <p className="text-sm text-muted-foreground">Atendimento online em tempo real</p>
          </div>

          <div className="rounded-xl card-gradient p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">E-mail</h3>
            <p className="text-sm text-muted-foreground">suporte@penserevalida.com</p>
          </div>

          <div className="rounded-xl card-gradient p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl card-gradient p-6 space-y-4">
            <h2 className="text-lg font-medium text-foreground mb-4">Envie sua solicitação</h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tipo de Problema</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="tecnico">Problema Técnico</SelectItem>
                  <SelectItem value="acesso">Problema de Acesso</SelectItem>
                  <SelectItem value="pagamento">Pagamento</SelectItem>
                  <SelectItem value="conteudo">Conteúdo</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Assunto</label>
              <Input
                placeholder="Descreva brevemente o problema"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Descrição</label>
              <Textarea
                placeholder="Descreva detalhadamente o problema..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-card border-border min-h-[150px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
            <Send className="w-5 h-5 mr-2" />
            Enviar Solicitação
          </Button>
        </form>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}
