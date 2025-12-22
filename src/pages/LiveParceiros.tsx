import { useState } from "react";
import { Play, ChevronLeft, ChevronRight, Volume2, Settings, Maximize } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
}

const videos: VideoItem[] = [
  { id: 1, title: "START - Mentoria Revalida", thumbnail: "", duration: "1:33:16" },
  { id: 2, title: "Entendendo o CRM", thumbnail: "", duration: "45:20" },
  { id: 3, title: "O Peso do Representante", thumbnail: "", duration: "52:10" },
  { id: 4, title: "Estratégias de Prova", thumbnail: "", duration: "38:45" },
];

export default function LiveParceiros() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Live dos Parceiros 2025.2</h1>

        {/* Main video player */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-primary/10 border border-primary/20">
          <div className="aspect-video bg-black relative">
            {/* Video placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <div className="w-4 h-4 bg-primary rounded"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">START</h2>
                <p className="text-primary text-sm">MENTORIA REVALIDA</p>
              </div>
            </div>

            {/* Play button overlay */}
            <button 
              className="absolute inset-0 flex items-center justify-center group"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </button>

            {/* Logo badge */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-card border-4 border-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-0.5 mx-auto w-6">
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                  </div>
                  <p className="text-[8px] font-bold text-primary mt-1">REVALIDA FLOW</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video controls */}
          <div className="px-4 py-3 bg-card/80 backdrop-blur">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-primary font-bold text-lg">LIVE PARCERIAS</h3>
                <p className="text-muted-foreground text-sm">2025.2</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Play className="w-5 h-5" />
              </Button>
              
              {/* Progress bar */}
              <div className="flex-1 h-1 bg-muted rounded-full">
                <div className="w-1/4 h-full bg-primary rounded-full"></div>
              </div>
              
              <span className="text-sm text-muted-foreground">1:33:16</span>
              
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Volume2 className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video thumbnails */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-4 overflow-x-auto flex-1 pb-2">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                onClick={() => setCurrentVideo(index)}
                className={cn(
                  "flex-shrink-0 w-52 cursor-pointer rounded-xl overflow-hidden border-2 transition-all",
                  currentVideo === index 
                    ? "border-primary shadow-lg shadow-primary/20" 
                    : "border-transparent hover:border-primary/50"
                )}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/30 to-card relative">
                  {/* Thumbnail placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/50 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-card">
                  <p className="text-xs text-primary font-medium">LIVE PARCERIAS</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex-shrink-0 bg-primary hover:bg-primary/90">
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-card overflow-hidden">
          <div className="h-full rounded-full" style={{ 
            background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
            width: '60%'
          }} />
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>
    </AppLayout>
  );
}
