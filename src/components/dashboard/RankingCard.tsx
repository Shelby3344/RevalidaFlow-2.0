import { Trophy, Medal, Crown, Award, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface RankingUser {
  name: string;
  position: number;
  points: number;
  medal?: "OURO" | "PRATA" | "BRONZE";
  initials: string;
  trend?: "up" | "down" | "same";
  isCurrentUser?: boolean;
}

export function RankingCard() {
  const { profile } = useUserProfile();
  const { mediaGeral, totalEstacoes } = useAnalytics();
  const [topUsers, setTopUsers] = useState<RankingUser[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<RankingUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
  }, [profile.nome, mediaGeral]);

  const loadRanking = async () => {
    setLoading(true);
    try {
      // Buscar top 5 usuários por média
      const { data: topStats, error } = await supabase
        .from('user_stats')
        .select(`
          user_id,
          average_score,
          total_checklists
        `)
        .gt('total_checklists', 0)
        .order('average_score', { ascending: false })
        .limit(5);

      if (error) throw error;

      // Buscar perfis dos top usuários
      const userIds = topStats?.map(s => s.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p.full_name]) || []);

      // Montar lista de ranking
      const rankings: RankingUser[] = (topStats || []).map((stat, index) => {
        const name = profileMap.get(stat.user_id) || 'Usuário';
        const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
        const medal = index === 0 ? 'OURO' : index === 1 ? 'PRATA' : index === 2 ? 'BRONZE' : undefined;
        
        return {
          name,
          position: index + 1,
          points: (stat.average_score || 0) / 10,
          medal,
          initials,
          trend: 'same' as const,
        };
      });

      setTopUsers(rankings);

      // Calcular posição do usuário atual
      const { count } = await supabase
        .from('user_stats')
        .select('*', { count: 'exact', head: true })
        .gt('average_score', mediaGeral * 10);

      const userPosition = (count || 0) + 1;
      const userInitials = profile.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

      setCurrentUserRank({
        name: profile.nome,
        position: userPosition,
        points: mediaGeral,
        initials: userInitials,
        trend: 'up',
        isCurrentUser: true,
      });

    } catch (err) {
      console.error('Erro ao carregar ranking:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (medal?: string) => {
    switch (medal) {
      case "OURO": return <Crown className="w-4 h-4 text-yellow-500" />;
      case "PRATA": return <Medal className="w-4 h-4 text-gray-400" />;
      case "BRONZE": return <Award className="w-4 h-4 text-amber-700" />;
      default: return null;
    }
  };

  const getMedalBg = (medal?: string) => {
    switch (medal) {
      case "OURO": return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case "PRATA": return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/30";
      case "BRONZE": return "bg-gradient-to-r from-amber-700/20 to-orange-700/20 border-amber-700/30";
      default: return "bg-secondary/30 border-border/30";
    }
  };

  const getPositionBg = (position: number) => {
    if (position === 1) return "bg-gradient-to-br from-yellow-500 to-amber-600 text-white";
    if (position === 2) return "bg-gradient-to-br from-gray-400 to-slate-500 text-white";
    if (position === 3) return "bg-gradient-to-br from-amber-600 to-orange-700 text-white";
    return "bg-secondary text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-card border border-border/50 p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/30 bg-gradient-to-r from-amber-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Ranking Geral</h3>
              <p className="text-xs text-muted-foreground">Top 5 da plataforma</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Atualizado hoje</span>
        </div>
      </div>

      {topUsers.length > 0 ? (
        <>
          {/* Top 3 Podium */}
          <div className="px-5 py-4 border-b border-border/30">
            <div className="flex items-end justify-center gap-3">
              {/* 2º Lugar */}
              {topUsers[1] && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm mb-1">
                    {topUsers[1].initials}
                  </div>
                  <div className="w-16 h-12 rounded-t-lg bg-gray-400/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">2°</span>
                  </div>
                </div>
              )}
              
              {/* 1º Lugar */}
              {topUsers[0] && (
                <div className="flex flex-col items-center -mt-4">
                  <Crown className="w-5 h-5 text-yellow-500 mb-1" />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold mb-1 ring-2 ring-yellow-500/30">
                    {topUsers[0].initials}
                  </div>
                  <div className="w-16 h-16 rounded-t-lg bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-yellow-500">1°</span>
                  </div>
                </div>
              )}
              
              {/* 3º Lugar */}
              {topUsers[2] && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white font-bold text-sm mb-1">
                    {topUsers[2].initials}
                  </div>
                  <div className="w-16 h-10 rounded-t-lg bg-amber-700/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-amber-700">3°</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lista completa */}
          <div className="p-3">
            <div className="space-y-1.5">
              {topUsers.map((user) => (
                <div 
                  key={user.position}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${getMedalBg(user.medal)}`}
                >
                  {/* Posição */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${getPositionBg(user.position)}`}>
                    {user.position}°
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {user.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.points.toFixed(2)} pts</p>
                  </div>

                  {/* Trend */}
                  {user.trend === "up" && <ChevronUp className="w-4 h-4 text-emerald-500" />}
                  {user.trend === "down" && <ChevronDown className="w-4 h-4 text-red-500" />}

                  {/* Medal */}
                  {getMedalIcon(user.medal)}
                </div>
              ))}

              {/* Separador */}
              {currentUserRank && totalEstacoes > 0 && (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-[10px] text-muted-foreground">SUA POSIÇÃO</span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>

                  {/* Usuário atual */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {currentUserRank.position}°
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                      {currentUserRank.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">{currentUserRank.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUserRank.points.toFixed(2)} pts</p>
                    </div>
                    {currentUserRank.trend === "up" && <ChevronUp className="w-4 h-4 text-emerald-500" />}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-sm text-muted-foreground">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
          Nenhum usuário no ranking ainda
        </div>
      )}
    </div>
  );
}
