import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pepeStationsData, stationAreas, areaColors, areaSiglas } from '@/data/pepe-stations';
import { cn } from '@/lib/utils';

interface PepeChecklistsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PepeChecklistsModal({ open, onOpenChange }: PepeChecklistsModalProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [showDiscursive, setShowDiscursive] = useState<string>('all');

  const filteredStations = useMemo(() => {
    return pepeStationsData.filter(station => {
      if (selectedArea !== 'all' && station.station_area !== selectedArea) return false;
      if (showDiscursive === 'discursive' && !station.is_discursive) return false;
      if (showDiscursive === 'practical' && station.is_discursive) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          station.station_name.toLowerCase().includes(query) ||
          station.station_area.toLowerCase().includes(query) ||
          station.station_id.toString().includes(query)
        );
      }
      return true;
    });
  }, [searchQuery, selectedArea, showDiscursive]);

  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    pepeStationsData.forEach(station => {
      counts[station.station_area] = (counts[station.station_area] || 0) + 1;
    });
    return counts;
  }, []);

  const handleStartChecklist = (stationId: number) => {
    navigate(`/checklists/execucao/${stationId}`);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 flex items-center justify-center">
        <div className="w-full max-w-3xl h-full max-h-[80vh] bg-background border border-border rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Checklists PEPE
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar estação..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="w-full sm:w-[160px] h-9">
                  <SelectValue placeholder="Área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Áreas</SelectItem>
                  {stationAreas.map(area => (
                    <SelectItem key={area} value={area}>
                      {area.length > 20 ? area.substring(0, 20) + '...' : area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={showDiscursive} onValueChange={setShowDiscursive}>
                <SelectTrigger className="w-full sm:w-[120px] h-9">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="practical">Práticas</SelectItem>
                  <SelectItem value="discursive">Discursivas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              {filteredStations.length} Checklists encontrados
            </p>
          </div>

          {/* List - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredStations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">Nenhuma estação encontrada</p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {filteredStations.map((station) => (
                  <div
                    key={station.station_id}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
                  >
                    {/* Station Info */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br flex-shrink-0",
                          areaColors[station.station_area] || "from-gray-500 to-gray-600"
                        )}
                      >
                        {areaSiglas[station.station_area] || "??"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {station.station_name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">
                            #{station.station_id}
                          </span>
                          {station.is_discursive && (
                            <Badge variant="outline" className="text-[8px] px-1 py-0 h-4 bg-purple-500/10 text-purple-500 border-purple-500/30">
                              Discursiva
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      size="sm"
                      onClick={() => handleStartChecklist(station.station_id)}
                      className="h-8 px-4 bg-purple-600 hover:bg-purple-700 text-white flex-shrink-0"
                    >
                      Treinar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-2 border-t border-border bg-muted/30">
            <p className="text-[10px] text-muted-foreground text-center">
              Fonte: PEPE • {pepeStationsData.length} estações disponíveis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
