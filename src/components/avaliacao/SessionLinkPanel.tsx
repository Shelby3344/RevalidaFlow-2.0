import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Link, Check, Users } from 'lucide-react';
import { toast } from 'sonner';

interface SessionLinkPanelProps {
  sessionCode: string;
  sessionLink: string;
  avaliadoConnected?: boolean;
  avaliadoName?: string;
}

export function SessionLinkPanel({
  sessionCode,
  sessionLink,
  avaliadoConnected = false,
  avaliadoName,
}: SessionLinkPanelProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(sessionLink);
      setCopiedLink(true);
      toast.success('Link copiado!', {
        description: 'Envie o link para o avaliado',
      });
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error('Erro ao copiar link');
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sessionCode);
      setCopiedCode(true);
      toast.success('Código copiado!');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      toast.error('Erro ao copiar código');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Código da sessão */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Código da Sessão</p>
        <div className="bg-primary/20 text-primary font-mono text-sm px-3 py-2 rounded-lg">
          {sessionCode}
        </div>
      </div>

      {/* Botões de copiar */}
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleCopyLink}
        >
          {copiedLink ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Link className="w-4 h-4" />
          )}
          {copiedLink ? 'Link Copiado!' : 'Copiar Link'}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleCopyCode}
        >
          {copiedCode ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copiedCode ? 'Código Copiado!' : 'Copiar Código'}
        </Button>
      </div>

      {/* Status do avaliado */}
      <div className="border-t border-border pt-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Avaliado:</span>
          {avaliadoConnected ? (
            <span className="text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {avaliadoName || 'Conectado'}
            </span>
          ) : (
            <span className="text-amber-500">Aguardando...</span>
          )}
        </div>
      </div>
    </div>
  );
}
