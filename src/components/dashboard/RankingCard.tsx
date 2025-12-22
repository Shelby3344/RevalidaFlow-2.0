import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RankingUser {
  name: string;
  position: string;
  points: number;
  medal?: "OURO" | "PRATA" | "BRONZE";
  avatar?: string;
  initials: string;
}

const rankingUsers: RankingUser[] = [
  { name: "MAICON ROCHA", position: "1° Lugar", points: 6.38, medal: "OURO", initials: "MR" },
  { name: "Sávio Rocha de Santana", position: "2° Lugar", points: 6.15, medal: "PRATA", initials: "SR" },
  { name: "Marcelo Correia Silva", position: "3° Lugar", points: 5.94, medal: "BRONZE", initials: "MC" },
  { name: "Tacyane S. da Silva Oliveira", position: "4° Lugar", points: 5.84, initials: "TS" },
  { name: "Jean Favian Zambrano Paneque", position: "5° Lugar", points: 5.57, initials: "JZ" },
  { name: "Nayara Nuñez", position: "4315° Lugar", points: 1.14, initials: "NN" },
];

export function RankingCard() {
  const getMedalClass = (medal?: string) => {
    switch (medal) {
      case "OURO": return "badge-gold";
      case "PRATA": return "badge-silver";
      case "BRONZE": return "badge-bronze";
      default: return "";
    }
  };

  return (
    <div className="rounded-xl card-gradient p-5">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-medium text-primary">Ranking - Top 5</h3>
      </div>

      <table className="table-dark">
        <thead>
          <tr>
            <th>NOME</th>
            <th>PONTOS</th>
            <th>MEDALHA</th>
          </tr>
        </thead>
        <tbody>
          {rankingUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.position}</p>
                  </div>
                </div>
              </td>
              <td className="text-sm text-foreground">{user.points.toFixed(2)}</td>
              <td>
                {user.medal && (
                  <span className={`badge-medal ${getMedalClass(user.medal)}`}>
                    {user.medal}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
