import { useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoData } from "@/types/checklists";

interface VideoPlayerProps {
  videoData: VideoData;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

export const VideoPlayer = ({ 
  videoData, 
  autoPlay = false, 
  showControls = true,
  className = "" 
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = (url: string, provider: string) => {
    if (provider === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&controls=1`;
    } else if (provider === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}`;
    } else if (provider === 'vturb') {
      // Assumindo que Vturb tem uma estrutura similar
      const videoId = url.match(/vturb\.com\/(?:watch\?v=|embed\/)?([^&\n?#]+)/)?.[1];
      return `https://vturb.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}`;
    }
    return url;
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const embedUrl = getEmbedUrl(videoData.url, videoData.provider);

  return (
    <Card className={`relative overflow-hidden bg-black ${className}`}>
      {/* Video Player */}
      <div className="relative aspect-video">
        {!isPlaying && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center cursor-pointer z-10"
            onClick={() => setIsPlaying(true)}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white/30 transition-colors">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{videoData.title}</h3>
              <p className="text-white/80 text-sm">{videoData.description}</p>
            </div>
          </div>
        )}
        
        {isPlaying && (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        )}
        
        {/* Provider Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-black/50 text-white z-20"
        >
          {videoData.provider.toUpperCase()}
        </Badge>

        {/* Duration Badge */}
        {videoData.duration && !isPlaying && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 left-2 bg-black/50 text-white z-20"
          >
            {Math.floor(videoData.duration / 60)}min
          </Badge>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4 bg-card">
        <h3 className="font-semibold text-lg mb-1">{videoData.title}</h3>
        {videoData.description && (
          <p className="text-muted-foreground text-sm">{videoData.description}</p>
        )}
        {videoData.duration && (
          <p className="text-xs text-muted-foreground mt-2">
            Duração: {formatTime(videoData.duration)}
          </p>
        )}
      </div>
    </Card>
  );
};