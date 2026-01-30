import { useState, useEffect } from "react";
import { Search, History, UserPlus, Trash2, X } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Mentorado {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  treinamentos: number;
}

export default function Mentorados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [mentorados, setMentorados] = useState<Mentorado[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Carrega mentorados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mentorados");
    if (saved) {
      setMentorados(JSON.parse(saved));
    }
  }, []);

  // Salva mentorados no localStorage
  const saveMentorados = (data: Mentorado[]) => {
    localStorage.setItem("mentorados", JSON.stringify(data));
    setMentorados(data);
  };

  const filteredData = mentorados.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleAddMentorado = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    
    const newMentorado: Mentorado = {
      id: Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      treinamentos: 0
    };
    
    saveMentorados([...mentorados, newMentorado]);
    setNewName("");
    setNewEmail("");
    setIsDialogOpen(false);
  };

  const handleRemoveMentorado = (id: number) => {
    saveMentorados(mentorados.filter(m => m.id !== id));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Meus Mentorados</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visualize e acompanhe o progresso dos seus mentorados
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Adicionar Mentorado
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Adicionar Mentorado</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Nome</label>
                  <Input
                    placeholder="Nome do mentorado"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={handleAddMentorado}
                    disabled={!newName.trim() || !newEmail.trim()}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-20 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Pesquisar</span>
            <Input
              placeholder="Buscar usuário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 bg-card border-border h-9 text-sm"
            />
          </div>
        </div>

        {/* Table ou Empty State */}
        {mentorados.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum mentorado ainda</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Adicione seus mentorados para acompanhar o progresso deles
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsDialogOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Adicionar Mentorado
            </Button>
          </div>
        ) : (
          <>
            <div className="rounded-xl overflow-hidden border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Mentorado
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Treinamentos
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((mentorado) => (
                    <tr key={mentorado.id} className="border-b border-border last:border-0 hover:bg-card/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={mentorado.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary text-sm">
                              {getInitials(mentorado.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{mentorado.name}</p>
                            <p className="text-xs text-muted-foreground">{mentorado.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded text-xs font-medium ${
                          mentorado.treinamentos > 0 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {mentorado.treinamentos}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <History className="w-4 h-4 mr-1" />
                            Histórico
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            onClick={() => handleRemoveMentorado(mentorado.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>Mostrando {filteredData.length} de {mentorados.length} registros</p>
            </div>
          </>
        )}
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 RevalidaFLOW
      </footer>
    </AppLayout>
  );
}
