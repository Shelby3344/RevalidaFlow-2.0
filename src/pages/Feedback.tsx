import { useState } from "react";
import { Send } from "lucide-react";
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

export default function Feedback() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback enviado!",
      description: "Obrigado por sua contribuição.",
    });
    setCategory("");
    setSubject("");
    setMessage("");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Feedback</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sua opinião é muito importante para nós. Envie suas sugestões, críticas ou elogios.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl card-gradient p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Categoria</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="sugestao">Sugestão</SelectItem>
                  <SelectItem value="problema">Problema</SelectItem>
                  <SelectItem value="elogio">Elogio</SelectItem>
                  <SelectItem value="duvida">Dúvida</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Assunto</label>
              <Input
                placeholder="Digite o assunto"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Mensagem</label>
              <Textarea
                placeholder="Escreva sua mensagem aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-card border-border min-h-[150px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
            <Send className="w-5 h-5 mr-2" />
            Enviar Feedback
          </Button>
        </form>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}
