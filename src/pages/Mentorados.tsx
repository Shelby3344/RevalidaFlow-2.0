import { useState } from "react";
import { Search, History } from "lucide-react";
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

interface Mentorado {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  treinamentos: number;
}

const mentoradosData: Mentorado[] = [
  { id: 1, name: "Thayline Pereira Braga", email: "thayline.nutri@gmail.com", treinamentos: 13 },
  { id: 2, name: "Tabta Luna", email: "tabtaluna@gmail.com", treinamentos: 0 },
  { id: 3, name: "Ryansp", email: "thaysantanagap@gmail.com", treinamentos: 23 },
  { id: 4, name: "Rebecca Manfredini", email: "becca.manfredini@gmail.com", treinamentos: 6 },
  { id: 5, name: "R9", email: "rpradovieiradeoliveira@gmail.com", treinamentos: 58 },
  { id: 6, name: "Pedro HM", email: "pedrohenriqmoura@gmail.com", treinamentos: 271 },
  { id: 7, name: "Shelbinho", email: "shelbinho@gmail.com", treinamentos: 0 },
  { id: 8, name: "Nayana Vilemon", email: "nayanavilemonleite@gmail.com", treinamentos: 0 },
  { id: 9, name: "Mayane Santos", email: "mayane.ss15@gmail.com", treinamentos: 83 },
  { id: 10, name: "Luis quintana", email: "luiscarlosquintana18@gmail.com", treinamentos: 0 },
];

export default function Mentorados() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = mentoradosData.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Meus Mentorados</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visualize e acompanhe o progresso dos seus mentorados
          </p>
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

        {/* Table */}
        <div className="rounded-xl overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Mentorado
                  <span className="ml-1">↕</span>
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Treinamentos
                  <span className="ml-1">▼</span>
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ações
                  <span className="ml-1">↕</span>
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
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <History className="w-4 h-4 mr-2" />
                      Histórico
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info and pagination */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Mostrando de 1 até 10 de 20 registros</p>
          
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="border-border h-8 px-3">
              Anterior
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="border-border h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="border-border h-8 px-3">
              Próximo
            </Button>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>
    </AppLayout>
  );
}
