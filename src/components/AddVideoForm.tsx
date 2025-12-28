import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoData } from "@/types/checklists";

interface AddVideoFormProps {
  onAddVideo: (videoData: VideoData) => void;
  onCancel: () => void;
}

export const AddVideoForm = ({ onAddVideo, onCancel }: AddVideoFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
    duration: ""
  });

  const detectProvider = (url: string): 'youtube' | 'vimeo' | 'direct' | 'other' => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    } else if (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')) {
      return 'direct';
    }
    return 'other';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const videoData: VideoData = {
      id: `video-${Date.now()}`,
      title: formData.title,
      url: formData.url,
      description: formData.description,
      category: formData.category,
      provider: detectProvider(formData.url),
      duration: formData.duration ? parseInt(formData.duration) * 60 : undefined
    };

    onAddVideo(videoData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Adicionar Novo Vídeo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Introdução à Cardiologia"
              required
            />
          </div>

          <div>
            <Label htmlFor="url">URL do Vídeo</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Suporta YouTube, Vimeo e links diretos
            </p>
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MFC">Medicina de Família e Comunidade</SelectItem>
                <SelectItem value="CM">Clínica Médica</SelectItem>
                <SelectItem value="CR">Cirurgia</SelectItem>
                <SelectItem value="PE">Pediatria</SelectItem>
                <SelectItem value="GO">Ginecologia e Obstetrícia</SelectItem>
                <SelectItem value="Procedimento">Procedimentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration">Duração (minutos)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="30"
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Breve descrição do conteúdo do vídeo..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Adicionar Vídeo
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};