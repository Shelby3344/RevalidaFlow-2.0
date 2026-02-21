import React from 'react';

/**
 * Converte markdown simples para HTML seguro.
 * Suporta: **bold**, *italic*, bullets (• e -), line breaks
 */
function markdownToHtml(text: string): string {
  if (!text) return '';

  let html = text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text* (não capturar ** que já foi tratado)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Line breaks: dois espaços + newline ou \n
    .replace(/  \n/g, '<br/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    // Bullet points
    .replace(/• /g, '&bull; ');

  return '<p>' + html + '</p>';
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Renderiza conteúdo markdown simples como HTML formatado.
 * Usado para exibir cenários, scripts, impressos dos checklists PEPE.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
};

export default MarkdownRenderer;
