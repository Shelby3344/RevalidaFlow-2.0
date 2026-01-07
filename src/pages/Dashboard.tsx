import { AppLayout } from "@/components/layout/AppLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ImprovementCard } from "@/components/dashboard/ImprovementCard";
import { RadarChartCard } from "@/components/dashboard/RadarChartCard";
import { TrainingRhythmCard } from "@/components/dashboard/TrainingRhythmCard";
import { RankingCard } from "@/components/dashboard/RankingCard";
import { MonthlyPerformanceCard } from "@/components/dashboard/MonthlyPerformanceCard";
import { MotivationCard } from "@/components/dashboard/MotivationCard";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main content - 2 columns */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Improvement and Radar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ImprovementCard />
            <RadarChartCard />
          </div>

          {/* Training Rhythm */}
          <TrainingRhythmCard />

          {/* Ranking */}
          <RankingCard />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-4 md:space-y-6">
          {/* Stats Card */}
          <StatsCard />

          {/* Motivation */}
          <MotivationCard />

          {/* Monthly Performance */}
          <MonthlyPerformanceCard />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 md:mt-8 text-center text-xs md:text-sm text-muted-foreground pb-4">
        © 2025 ProREV
      </footer>
    </AppLayout>
  );
}
