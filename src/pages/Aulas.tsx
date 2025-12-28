import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Play, Video, Grid3X3, List, Plus, X } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoModal } from "@/components/VideoModal";
import { AulaCard, VideoData } from "@/types/checklists";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const esqueletosAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "MFC", 
    subtitle: "Medicina de Família e Comunidade", 
    category: "Esqueleto", 
    color: "from-blue-600 to-blue-800",
    videoData: {
      id: "mfc-intro",
      title: "Introdução à Medicina de Família e Comunidade",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Conceitos fundamentais da MFC e sua importância no sistema de saúde",
      category: "MFC",
      provider: "youtube",
      duration: 1800
    }
  },
  { 
    id: 2, 
    title: "Cirurgia", 
    subtitle: "Fundamentos Cirúrgicos", 
    category: "Esqueleto", 
    color: "from-blue-600 to-blue-800",
    videoData: {
      id: "cirurgia-intro",
      title: "Fundamentos da Cirurgia Geral",
      url: "https://vimeo.com/76979871",
      description: "Princípios básicos da cirurgia e técnicas fundamentais",
      category: "Cirurgia",
      provider: "vimeo",
      duration: 2400
    }
  },
  { 
    id: 3, 
    title: "Pediatria", 
    subtitle: "Cuidados Pediátricos", 
    category: "Esqueleto", 
    color: "from-blue-600 to-blue-800",
    videoData: {
      id: "pediatria-intro",
      title: "Introdução à Pediatria",
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      description: "Desenvolvimento infantil e cuidados pediátricos essenciais",
      category: "Pediatria",
      provider: "youtube",
      duration: 2100
    }
  },
  { 
    id: 4, 
    title: "GO", 
    subtitle: "Ginecologia e Obstetrícia", 
    category: "Esqueleto", 
    color: "from-blue-600 to-blue-800",
    videoData: {
      id: "go-intro",
      title: "Fundamentos de Ginecologia e Obstetrícia",
      url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      description: "Conceitos essenciais em saúde da mulher",
      category: "GO",
      provider: "youtube",
      duration: 1950
    }
  },
  { 
    id: 5, 
    title: "Clínica", 
    subtitle: "Clínica Médica", 
    category: "Esqueleto", 
    color: "from-blue-600 to-blue-800",
    videoData: {
      id: "clinica-intro",
      title: "Introdução à Clínica Médica",
      url: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
      description: "Abordagem clínica e raciocínio diagnóstico",
      category: "Clínica",
      provider: "youtube",
      duration: 2250
    }
  },
];

const procedimentosAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "Reanimação Neonatal", 
    subtitle: "PEDIATRIA", 
    category: "Procedimento", 
    color: "from-green-600 to-green-800",
    videoData: {
      id: "reanimacao-neonatal",
      title: "Reanimação Neonatal - Protocolo Completo",
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      description: "Passo a passo da reanimação neonatal seguindo protocolos atualizados",
      category: "Procedimento",
      provider: "youtube",
      duration: 1680
    }
  },
  { 
    id: 2, 
    title: "Prática", 
    subtitle: "PEDIATRIA", 
    category: "Procedimento", 
    color: "from-green-600 to-green-800",
    videoData: {
      id: "pratica-pediatria",
      title: "Práticas Essenciais em Pediatria",
      url: "https://vimeo.com/148751763",
      description: "Demonstração prática de procedimentos pediátricos",
      category: "Procedimento",
      provider: "vimeo",
      duration: 1920
    }
  },
  { 
    id: 3, 
    title: "Desengasgo", 
    subtitle: "PEDIATRIA", 
    category: "Procedimento", 
    color: "from-green-600 to-green-800",
    videoData: {
      id: "desengasgo-pediatrico",
      title: "Manobras de Desengasgo em Pediatria",
      url: "https://www.youtube.com/watch?v=PSt2v1-k2ag",
      description: "Técnicas de desobstrução de vias aéreas em crianças",
      category: "Procedimento",
      provider: "youtube",
      duration: 1440
    }
  },
];

const clinicaMedicaAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "ASMA", 
    subtitle: "Clínica Médica", 
    category: "CM", 
    color: "from-blue-500 to-blue-700",
    videoData: {
      id: "asma-clinica",
      title: "Diagnóstico e Tratamento da Asma",
      url: "https://www.youtube.com/watch?v=hFBDbDNLvKU",
      description: "Abordagem completa da asma: diagnóstico, classificação e tratamento",
      category: "CM",
      provider: "youtube",
      duration: 2160
    }
  },
  { 
    id: 2, 
    title: "Aplicando", 
    subtitle: "Clínica Médica", 
    category: "CM", 
    color: "from-blue-500 to-blue-700",
    videoData: {
      id: "aplicacao-clinica",
      title: "Aplicação Prática em Clínica Médica",
      url: "https://vimeo.com/191947042",
      description: "Casos clínicos práticos e aplicação do conhecimento",
      category: "CM",
      provider: "vimeo",
      duration: 1800
    }
  },
  { 
    id: 3, 
    title: "Anafilaxia", 
    subtitle: "Clínica Médica", 
    category: "CM", 
    color: "from-blue-500 to-blue-700",
    videoData: {
      id: "anafilaxia",
      title: "Manejo da Anafilaxia",
      url: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
      description: "Reconhecimento e tratamento de emergência da anafilaxia",
      category: "CM",
      provider: "youtube",
      duration: 1560
    }
  },
];

const pediatriaAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "Amamentação", 
    subtitle: "PEDIATRIA", 
    category: "PE", 
    color: "from-green-500 to-green-700",
    videoData: {
      id: "amamentacao",
      title: "Aleitamento Materno - Orientações Práticas",
      url: "https://www.youtube.com/watch?v=wJnBTPUQS5A",
      description: "Técnicas de amamentação e orientações para mães",
      category: "PE",
      provider: "youtube",
      duration: 1740
    }
  },
  { 
    id: 2, 
    title: "Aplicando", 
    subtitle: "PEDIATRIA", 
    category: "PE", 
    color: "from-green-500 to-green-700",
    videoData: {
      id: "aplicacao-pediatria",
      title: "Aplicação Prática em Pediatria",
      url: "https://vimeo.com/203948572",
      description: "Casos práticos e aplicação do conhecimento pediátrico",
      category: "PE",
      provider: "vimeo",
      duration: 1980
    }
  },
  { 
    id: 3, 
    title: "Anafilaxia", 
    subtitle: "PEDIATRIA", 
    category: "PE", 
    color: "from-green-500 to-green-700",
    videoData: {
      id: "anafilaxia-pediatrica",
      title: "Anafilaxia em Pediatria",
      url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      description: "Manejo da anafilaxia em crianças e adolescentes",
      category: "PE",
      provider: "youtube",
      duration: 1620
    }
  },
];

const mfcAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "SUS / APS", 
    subtitle: "Medicina de Família e comunidade", 
    category: "MFC", 
    color: "from-cyan-500 to-cyan-700",
    videoData: {
      id: "sus-aps",
      title: "SUS e Atenção Primária à Saúde",
      url: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      description: "Funcionamento do SUS e princípios da APS",
      category: "MFC",
      provider: "youtube",
      duration: 2040
    }
  },
  { 
    id: 2, 
    title: "Aplicando", 
    subtitle: "Medicina de Família e comunidade", 
    category: "MFC", 
    color: "from-cyan-500 to-cyan-700",
    videoData: {
      id: "aplicacao-mfc",
      title: "Aplicação Prática em MFC",
      url: "https://vimeo.com/215847392",
      description: "Casos práticos em medicina de família",
      category: "MFC",
      provider: "vimeo",
      duration: 1860
    }
  },
  { 
    id: 3, 
    title: "Rastreamento", 
    subtitle: "Medicina de Família e comunidade", 
    category: "MFC", 
    color: "from-cyan-500 to-cyan-700",
    videoData: {
      id: "rastreamento",
      title: "Rastreamento em Saúde",
      url: "https://www.youtube.com/watch?v=Hm3JodBR-vs",
      description: "Programas de rastreamento e prevenção",
      category: "MFC",
      provider: "youtube",
      duration: 1920
    }
  },
];

const cirurgiaAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "Trauma Torácico", 
    subtitle: "CIRURGIA", 
    category: "CR", 
    color: "from-purple-500 to-purple-700",
    videoData: {
      id: "trauma-toracico",
      title: "Abordagem do Trauma Torácico",
      url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      description: "Avaliação e manejo do trauma torácico",
      category: "CR",
      provider: "youtube",
      duration: 2280
    }
  },
  { 
    id: 2, 
    title: "Aplicando", 
    subtitle: "CIRURGIA", 
    category: "CR", 
    color: "from-purple-500 to-purple-700",
    videoData: {
      id: "aplicacao-cirurgia",
      title: "Aplicação Prática em Cirurgia",
      url: "https://vimeo.com/187394852",
      description: "Casos cirúrgicos práticos e técnicas",
      category: "CR",
      provider: "vimeo",
      duration: 2100
    }
  },
  { 
    id: 3, 
    title: "AOM", 
    subtitle: "CIRURGIA", 
    category: "CR", 
    color: "from-purple-500 to-purple-700",
    videoData: {
      id: "aom-cirurgia",
      title: "Abdome Agudo - Obstrução Mecânica",
      url: "https://www.youtube.com/watch?v=nrI-RFLX9ns",
      description: "Diagnóstico e tratamento da obstrução intestinal",
      category: "CR",
      provider: "youtube",
      duration: 1980
    }
  },
];

const goAulas: AulaCard[] = [
  { 
    id: 1, 
    title: "Reiterando", 
    subtitle: "GINECOLOGIA E OBSTETRÍCIA", 
    category: "GO", 
    color: "from-pink-500 to-pink-700",
    videoData: {
      id: "go-reiterando",
      title: "Revisão em Ginecologia e Obstetrícia",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Revisão dos principais tópicos em GO",
      category: "GO",
      provider: "youtube",
      duration: 1800
    }
  },
  { 
    id: 2, 
    title: "Aplicando", 
    subtitle: "GINECOLOGIA E OBSTETRÍCIA", 
    category: "GO", 
    color: "from-pink-500 to-pink-700",
    videoData: {
      id: "go-aplicacao",
      title: "Aplicação Prática em GO",
      url: "https://vimeo.com/76979871",
      description: "Casos práticos em ginecologia e obstetrícia",
      category: "GO",
      provider: "vimeo",
      duration: 2040
    }
  },
  { 
    id: 3, 
    title: "Sangramento de Segunda Metade", 
    subtitle: "GINECOLOGIA E OBSTETRÍCIA", 
    category: "GO", 
    color: "from-pink-500 to-pink-700",
    videoData: {
      id: "sangramento-segunda-metade",
      title: "Sangramento na Segunda Metade da Gestação",
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      description: "Diagnóstico e manejo do sangramento obstétrico",
      category: "GO",
      provider: "youtube",
      duration: 1920
    }
  },
];

interface SectionProps {
  title: string;
  aulas: AulaCard[];
  onVideoClick: (videoData: VideoData) => void;
  viewMode: 'grid' | 'list';
}

function AulaSection({ title, aulas, onVideoClick, viewMode }: SectionProps) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <div className="space-y-2">
          {aulas.map((aula) => (
            <div 
              key={aula.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => aula.videoData && onVideoClick(aula.videoData)}
            >
              {/* Thumbnail/Icon */}
              <div className={`w-16 h-12 rounded-lg bg-gradient-to-br ${aula.color} flex items-center justify-center flex-shrink-0`}>
                {aula.videoData ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <div className="w-4 h-4 bg-white/40 rounded-sm"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{aula.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{aula.subtitle}</p>
                {aula.videoData?.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{aula.videoData.description}</p>
                )}
              </div>
              
              {/* Metadata */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {aula.videoData?.duration && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.floor(aula.videoData.duration / 60)}min
                  </Badge>
                )}
                {aula.videoData && (
                  <Badge variant="outline" className="text-xs">
                    {aula.videoData.provider.toUpperCase()}
                  </Badge>
                )}
                {aula.videoData && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVideoClick(aula.videoData!);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grid view (original)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="w-7 h-7 border-border">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-7 h-7 border-border bg-primary text-primary-foreground">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {aulas.map((aula) => (
          <div 
            key={aula.id}
            className={`flex-shrink-0 w-40 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-gradient-to-b ${aula.color} relative group`}
            onClick={() => aula.videoData && onVideoClick(aula.videoData)}
          >
            <div className="aspect-[3/4] relative p-3 flex flex-col justify-between">
              {/* Placeholder for person image */}
              <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="relative z-10">
                <p className="text-[10px] text-white/70 uppercase tracking-wider">{aula.subtitle}</p>
                
                {/* Video Button */}
                {aula.videoData && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-0 right-0 h-6 w-6 p-0 bg-white/20 hover:bg-white/30 border-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVideoClick(aula.videoData!);
                    }}
                  >
                    <Video className="h-3 w-3 text-white" />
                  </Button>
                )}
              </div>

              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  </div>
                </div>
                
                {/* Duration Badge */}
                {aula.videoData?.duration && (
                  <Badge 
                    variant="secondary" 
                    className="absolute bottom-0 left-0 bg-black/50 text-white text-xs"
                  >
                    {Math.floor(aula.videoData.duration / 60)}min
                  </Badge>
                )}
              </div>
            </div>
            <div className="bg-primary py-2 text-center relative">
              <p className="text-xs font-medium text-primary-foreground">{aula.title}</p>
              {/* Play Icon Overlay */}
              {aula.videoData && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para adicionar nova aula
function AddAulaModal({ 
  isOpen, 
  onClose, 
  onAdd 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (aula: AulaCard) => void; 
}) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    videoUrl: "",
    videoTitle: "",
    videoDescription: "",
    duration: ""
  });

  const detectProvider = (url: string): 'youtube' | 'vimeo' | 'vturb' | 'direct' | 'other' => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    } else if (url.includes('vturb.com')) {
      return 'vturb';
    } else if (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')) {
      return 'direct';
    }
    return 'other';
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'esqueleto': return 'from-blue-600 to-blue-800';
      case 'procedimento': return 'from-green-600 to-green-800';
      case 'cm': return 'from-blue-500 to-blue-700';
      case 'pe': return 'from-green-500 to-green-700';
      case 'mfc': return 'from-cyan-500 to-cyan-700';
      case 'cr': return 'from-purple-500 to-purple-700';
      case 'go': return 'from-pink-500 to-pink-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAula: AulaCard = {
      id: Date.now(), // Temporary ID
      title: formData.title,
      subtitle: formData.subtitle,
      category: formData.category,
      color: getCategoryColor(formData.category),
      videoData: formData.videoUrl ? {
        id: `video-${Date.now()}`,
        title: formData.videoTitle || formData.title,
        url: formData.videoUrl,
        description: formData.videoDescription,
        category: formData.category,
        provider: detectProvider(formData.videoUrl),
        duration: formData.duration ? parseInt(formData.duration) * 60 : undefined
      } : undefined
    };

    onAdd(newAula);
    
    // Reset form
    setFormData({
      title: "",
      subtitle: "",
      category: "",
      videoUrl: "",
      videoTitle: "",
      videoDescription: "",
      duration: ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Aula</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Aula</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Cardiologia Básica"
              required
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Ex: CLÍNICA MÉDICA"
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Esqueleto">Esqueleto das Grandes Áreas</SelectItem>
                <SelectItem value="Procedimento">Procedimentos</SelectItem>
                <SelectItem value="CM">Clínica Médica</SelectItem>
                <SelectItem value="PE">Pediatria</SelectItem>
                <SelectItem value="MFC">Medicina de Família e Comunidade</SelectItem>
                <SelectItem value="CR">Cirurgia</SelectItem>
                <SelectItem value="GO">Ginecologia e Obstetrícia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Informações do Vídeo (Opcional)</h4>
            
            <div>
              <Label htmlFor="videoUrl">URL do Vídeo</Label>
              <Input
                id="videoUrl"
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/... ou https://vturb.com/..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Suporta YouTube, Vimeo, Vturb e links diretos
              </p>
            </div>

            {formData.videoUrl && (
              <>
                <div>
                  <Label htmlFor="videoTitle">Título do Vídeo</Label>
                  <Input
                    id="videoTitle"
                    value={formData.videoTitle}
                    onChange={(e) => setFormData({ ...formData, videoTitle: e.target.value })}
                    placeholder="Deixe vazio para usar o título da aula"
                  />
                </div>

                <div>
                  <Label htmlFor="videoDescription">Descrição do Vídeo</Label>
                  <Textarea
                    id="videoDescription"
                    value={formData.videoDescription}
                    onChange={(e) => setFormData({ ...formData, videoDescription: e.target.value })}
                    placeholder="Breve descrição do conteúdo..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duração (minutos)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="30"
                    min="1"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Adicionar Aula
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Aulas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [allAulas, setAllAulas] = useState({
    esqueletos: esqueletosAulas,
    procedimentos: procedimentosAulas,
    clinicaMedica: clinicaMedicaAulas,
    pediatria: pediatriaAulas,
    mfc: mfcAulas,
    cirurgia: cirurgiaAulas,
    go: goAulas,
  });

  const handleVideoClick = (videoData: VideoData) => {
    setSelectedVideo(videoData);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const handleAddAula = (newAula: AulaCard) => {
    // Determinar em qual categoria adicionar baseado na categoria da aula
    const category = newAula.category.toLowerCase();
    
    setAllAulas(prev => {
      const updated = { ...prev };
      
      switch (category) {
        case 'esqueleto':
          updated.esqueletos = [...prev.esqueletos, { ...newAula, id: prev.esqueletos.length + 1 }];
          break;
        case 'procedimento':
          updated.procedimentos = [...prev.procedimentos, { ...newAula, id: prev.procedimentos.length + 1 }];
          break;
        case 'cm':
          updated.clinicaMedica = [...prev.clinicaMedica, { ...newAula, id: prev.clinicaMedica.length + 1 }];
          break;
        case 'pe':
          updated.pediatria = [...prev.pediatria, { ...newAula, id: prev.pediatria.length + 1 }];
          break;
        case 'mfc':
          updated.mfc = [...prev.mfc, { ...newAula, id: prev.mfc.length + 1 }];
          break;
        case 'cr':
          updated.cirurgia = [...prev.cirurgia, { ...newAula, id: prev.cirurgia.length + 1 }];
          break;
        case 'go':
          updated.go = [...prev.go, { ...newAula, id: prev.go.length + 1 }];
          break;
        default:
          updated.esqueletos = [...prev.esqueletos, { ...newAula, id: prev.esqueletos.length + 1 }];
      }
      
      return updated;
    });
    
    setIsAddModalOpen(false);
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header com controles */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Aulas</h1>
            <div className="flex items-center gap-2">
              {/* Toggle de visualização */}
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Botão adicionar */}
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Aula
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Buscar uma aula</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar um aula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border h-12"
              />
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-card overflow-hidden">
            <div className="h-full rounded-full" style={{ 
              background: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 25%, #c4b5fd 50%, #fbbf24 75%, #f472b6 100%)',
              width: '60%'
            }} />
          </div>

          {/* Sections */}
          <AulaSection title="Esqueletos das Grandes Áreas" aulas={allAulas.esqueletos} onVideoClick={handleVideoClick} viewMode={viewMode} />
          <AulaSection title="Procedimentos" aulas={allAulas.procedimentos} onVideoClick={handleVideoClick} viewMode={viewMode} />
          <AulaSection title="Clínica Médica" aulas={allAulas.clinicaMedica} onVideoClick={handleVideoClick} viewMode={viewMode} />
          <AulaSection title="Pediatria" aulas={allAulas.pediatria} onVideoClick={handleVideoClick} viewMode={viewMode} />
          <AulaSection title="MFC" aulas={allAulas.mfc} onVideoClick={handleVideoClick} viewMode={viewMode} />
          <AulaSection title="Cirurgia" aulas={allAulas.cirurgia} onVideoClick={handleVideoClick} viewMode={viewMode} />
          <AulaSection title="GO" aulas={allAulas.go} onVideoClick={handleVideoClick} viewMode={viewMode} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl card-gradient p-6">
            <h3 className="text-sm font-semibold text-foreground mb-2">Sugestões de Aulas</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Comece assistindo a todos os vídeos dos esqueletos de cada grande área e, aos poucos, organize mentalmente um esqueleto estruturado.
            </p>
            
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground text-center mb-4">Opções</p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-2"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? '≡ Ver em Lista' : '⊞ Ver em Grade'}
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Aula
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="rounded-xl card-gradient p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total de Aulas:</span>
                <span className="font-medium">
                  {Object.values(allAulas).reduce((total, aulas) => total + aulas.length, 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Com Vídeo:</span>
                <span className="font-medium">
                  {Object.values(allAulas).reduce((total, aulas) => 
                    total + aulas.filter(aula => aula.videoData).length, 0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Visualização:</span>
                <span className="font-medium capitalize">{viewMode === 'grid' ? 'Grade' : 'Lista'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2025 Revalida Flow
      </footer>

      {/* Modals */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoData={selectedVideo}
      />
      
      <AddAulaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAula}
      />
    </AppLayout>
  );
}
