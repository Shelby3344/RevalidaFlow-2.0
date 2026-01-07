import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maximize2, Minimize2, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// URL pública do Power BI do INEP - Painel Revalida
const POWERBI_EMBED_URL = 'https://app.powerbi.com/view?r=eyJrIjoiOGQ3MjVjYzItOTMyOC00YzNjLTgwMTUtZTQyZmQ1MDdiYzY1IiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9';

export default function PainelRevalida() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Erro ao alternar tela cheia:', err);
    }
  };

  // Listener para detectar saída do fullscreen via ESC
  useState(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  });

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col bg-background",
        isFullscreen ? "fixed inset-0 z-[100]" : "min-h-screen"
      )}
    >
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="h-9 w-9"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Painel Revalida INEP
                </h1>
                <p className="text-xs text-muted-foreground">
                  Dados oficiais do exame Revalida
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(POWERBI_EMBED_URL, '_blank')}
                className="gap-2 hidden sm:flex"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir no Power BI
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={toggleFullscreen}
                className="gap-2"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Tela Cheia</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Power BI Embed */}
      <div className="flex-1 relative">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
            <p className="text-muted-foreground">Carregando painel do INEP...</p>
            <p className="text-xs text-muted-foreground mt-1">Isso pode levar alguns segundos</p>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src={POWERBI_EMBED_URL}
          onLoad={handleIframeLoad}
          className={cn(
            "w-full h-full border-0",
            isLoading && "opacity-0"
          )}
          style={{ 
            minHeight: isFullscreen ? '100vh' : 'calc(100vh - 120px)',
            backgroundColor: '#1a1a2e'
          }}
          allowFullScreen
          title="Painel Revalida INEP - Power BI"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      {/* Footer - Fonte */}
      <footer className="flex-shrink-0 border-t border-border bg-card/50 px-4 py-2">
        <p className="text-[11px] text-muted-foreground text-center">
          Fonte: <span className="font-medium">INEP</span> – Painel Revalida (Power BI) • 
          Os dados são atualizados automaticamente pelo INEP
        </p>
      </footer>
    </div>
  );
}
