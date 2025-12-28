import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Play, 
  Pause, 
  Square, 
  Clock,
  Crown,
  Copy,
  MessageCircle,
  Phone,
  PhoneOff,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppLayout } from '@/components/layout/AppLayout';
import { RoomStateManager } from '@/services/RoomStateManager';
import { TrainingRoom } from '@/types/checklists';
import { checklistsData, AREA_OPTIONS, INEP_OPTIONS, AREA_ORDER } from '@/data/checklists';
import { cn } from '@/lib/utils';

// Lista de títulos de GO-Ginecologia
const ginecologiaList = [
  'Amenorreia Fisiológica', 'Amenorreia Primária (Síndrome de Rokitansky)', 'Amenorreia Secundária',
  'Candidíase vaginal (REAPLICAÇÃO) | INEP 2021', 'Candidíase vulvovaginal recorrente', 'Cervicite',
  'Cistite – Não complicada', 'Cistite Recorrente', 'Cisto Ovariano Benigno', 'Climatério',
  'Climatério | INEP 2024.1', 'Climatério/Menopausa (Terapia de Reposição Hormonal)',
  'Consulta de Rotina em Adolescente', 'Descarga papilar', 'Doença Inflamatória Pélvica',
  'Doença Inflamatória Pélvica | INEP 2022.1', 'Endometriose 2', 'Exame Clínico das Mamas - Adaptado | INEP 2023.2',
  'Fibroadenoma Mamário', 'Herpes Genital', 'Hiperplasia Endometrial', 'Incontinência urinária de urgência',
  'Infertilidade Conjugal', 'Inserção de DIU', 'Nódulo de mama', 'Papanicolau | INEP 2023.1',
  'Papanicolau – Resultado de exame (ASC-H)', 'Planejamento Familiar | INEP 2021', 'Planejamento Familiar – Laqueadura',
  'Rastreio de Câncer de Mama', 'Retirada de DIU', 'Sangramento Uterino Anormal (SUA)',
  'Sangramento Uterino Anormal | INEP 2020', 'Sífilis Primária | INEP 2022.2', 'Sífilis Secundária',
  'Síndrome dos Ovários Policísticos – SOP', 'Tricomoníase Vaginal', 'Vaginose Bacteriana',
  'Úlcera Genital – Cancro Mole', 'Úlcera Genital – Donovanose'
];

// Lista de títulos de GO-Obstetrícia
const obstetriciaList = [
  'Aborto Inevitável', 'Aborto Retido', 'Ameaça de Aborto | INEP 2021', 'Assistência ao Trabalho de Parto',
  'Ausculta Fetal com Pinard', 'Candidíase na Gestação', 'Cardiotocografia', 'Cervicite na Gestação',
  'Cistite na Gestante – Complicada', 'Colestase Gravídica', 'Controle Pré-Natal De Baixo Risco',
  'Corioamnionite', 'Desprendimento Prematuro de Placenta | INEP 2022.1', 'Diabetes Gestacional',
  'Diabetes Gestacional | INEP 2023.1', 'Distocia De Ombro', 'Doença Hemolítica Perinatal',
  'Doença Trofoblástica Gestacional', 'Eclampsia', 'Exame Físico Obstétrico | INEP 2023.2',
  'Gestação Múltipla', 'Gestação Na Adolescência', 'Hipertensão Gestacional', 'Lipotimia | INEP 2020',
  'Medicina Legal em Obstetrícia | INEP 2022.2', 'Parto Pélvico', 'Partograma', 'Pielonefrite Gestacional',
  'Placenta Prévia', 'Placenta Prévia | INEP 2024.2', 'Pré Eclampsia com sinais de gravidade',
  'Psicose Pós Parto', 'Rotura Prematura Das Membranas Ovulares (RPM)', 'Rubéola', 'Sindrome HELLP',
  'Sífilis Gestacional', 'Síndrome HELLP | INEP 2024.1', 'Toxoplasmose Gestacional',
  'Trabalho De Parto Prematuro', 'Tricomoníase na Gestação', 'Vaginose Bacteriana na Gestação – Gardnerella', 'Óbito Fetal'
];

const isGinecologia = (title: string): boolean => ginecologiaList.includes(title);
const isObstetricia = (title: string): boolean => obstetriciaList.includes(title);

// Calcular contagem por área (fora do componente para evitar recálculos)
const areaCounts: Record<string, number> = { all: checklistsData.length };
checklistsData.forEach(item => {
  areaCounts[item.areaCode] = (areaCounts[item.areaCode] || 0) + 1;
  if (item.areaCode === 'GO') {
    if (isGinecologia(item.title)) {
      areaCounts['GO-Ginecologia'] = (areaCounts['GO-Ginecologia'] || 0) + 1;
    }
    if (isObstetricia(item.title)) {
      areaCounts['GO-Obstetrícia'] = (areaCounts['GO-Obstetrícia'] || 0) + 1;
    }
  }
});

export default function CollaborativeRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState<TrainingRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser] = useState({ id: 'user_current', name: 'Você' }); // Simular usuário atual
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedInep, setSelectedInep] = useState<string>('all');

  // Carregar dados da sala
  useEffect(() => {
    if (!roomId) {
      console.log('Nenhum roomId fornecido');
      navigate('/checklists');
      return;
    }

    const loadRoom = () => {
      console.log('Buscando sala:', roomId);
      const roomManager = RoomStateManager.getInstance();
      const roomData = roomManager.getRoom(roomId);
      
      if (roomData) {
        console.log('Sala encontrada:', roomData);
        setRoom(roomData);
        setIsLoading(false);
        return true;
      }
      return false;
    };

    // Tentar carregar imediatamente
    if (loadRoom()) return;

    // Se não encontrou, tentar novamente após um delay
    console.log('Sala não encontrada, tentando novamente...');
    const retryTimeout = setTimeout(() => {
      if (!loadRoom()) {
        console.error('Sala não encontrada após retry:', roomId);
        setIsLoading(false);
        // Não redirecionar automaticamente, mostrar mensagem de erro
      }
    }, 1000);

    return () => clearTimeout(retryTimeout);
  }, [roomId, navigate]);

  // Timer da sessão
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Carregar TODOS os casos clínicos disponíveis com filtros
  // IMPORTANTE: Este useMemo deve estar ANTES de qualquer return condicional
  const availableCases = useMemo(() => {
    return checklistsData
      .filter(item => {
        // Filtro por área
        let areaMatch = selectedArea === 'all';
        if (selectedArea === 'GO') {
          areaMatch = item.areaCode === 'GO';
        } else if (selectedArea === 'GO-Ginecologia') {
          areaMatch = item.areaCode === 'GO' && isGinecologia(item.title);
        } else if (selectedArea === 'GO-Obstetrícia') {
          areaMatch = item.areaCode === 'GO' && isObstetricia(item.title);
        } else if (selectedArea !== 'all') {
          areaMatch = item.areaCode === selectedArea;
        }

        // Filtro por INEP
        let inepMatch = true;
        if (selectedInep === 'all') {
          inepMatch = true;
        } else if (selectedInep === 'inep-only') {
          inepMatch = item.inepEdition !== null;
        } else {
          inepMatch = item.inepEdition === selectedInep;
        }

        // Filtro por busca
        let searchMatch = true;
        if (searchTerm) {
          const search = searchTerm.toLowerCase();
          searchMatch = item.title.toLowerCase().includes(search) || 
                       item.areaCode.toLowerCase().includes(search);
        }

        return areaMatch && inepMatch && searchMatch;
      })
      .sort((a, b) => {
        const orderA = AREA_ORDER[a.areaCode];
        const orderB = AREA_ORDER[b.areaCode];
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title, 'pt-BR');
      });
  }, [selectedArea, selectedInep, searchTerm]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Carregando sala...</h2>
            <p className="text-muted-foreground">Aguarde um momento</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!room) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Sala não encontrada</h2>
            <p className="text-muted-foreground mb-4">A sala pode ter sido encerrada ou o link está incorreto.</p>
            <Button onClick={() => navigate('/checklists')}>
              Voltar para Checklists
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const isHost = room.hostId === currentUser.id;
  const canStartSession = isHost && room.status === 'waiting';
  const isSessionActive = room.status === 'active';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    if (!isHost) return;
    
    const roomManager = RoomStateManager.getInstance();
    roomManager.updateRoomStatus(room.id, 'active');
    setRoom(prev => prev ? { ...prev, status: 'active', startedAt: new Date() } : null);
    setIsTimerRunning(true);
  };

  const handlePauseSession = () => {
    if (!isHost) return;
    
    const roomManager = RoomStateManager.getInstance();
    roomManager.updateRoomStatus(room.id, 'paused');
    setRoom(prev => prev ? { ...prev, status: 'paused' } : null);
    setIsTimerRunning(false);
  };

  const handleEndSession = () => {
    if (!isHost) return;
    
    const roomManager = RoomStateManager.getInstance();
    roomManager.updateRoomStatus(room.id, 'finished');
    setIsTimerRunning(false);
    navigate('/checklists');
  };

  const handleCopyRoomCode = () => {
    if (room.code) {
      navigator.clipboard.writeText(room.code);
      // TODO: Mostrar toast de sucesso
      alert('Código copiado para a área de transferência!');
    }
  };

  const handleStartVoiceCall = () => {
    // Simular início de chamada de voz
    setIsInCall(true);
    setIsMicOn(true);
    // TODO: Integrar com Google Meet ou sistema de voz real
    console.log('Iniciando chamada de voz...');
  };

  const handleEndVoiceCall = () => {
    setIsInCall(false);
    setIsMicOn(false);
    setIsVideoOn(false);
    console.log('Encerrando chamada de voz...');
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCase(caseId);
    // TODO: Sincronizar seleção com outros participantes
  };

  const handleStartCase = () => {
    if (!selectedCase) return;
    // TODO: Navegar para a sessão colaborativa do caso
    console.log('Iniciando caso:', selectedCase);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header da Sala */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Sala {room.type === 'private' ? 'Privada' : 'Pública'}
                </h1>
                <Badge variant={room.status === 'active' ? 'default' : 'secondary'}>
                  {room.status === 'waiting' && 'Aguardando'}
                  {room.status === 'active' && 'Em Andamento'}
                  {room.status === 'paused' && 'Pausada'}
                </Badge>
                {isHost && <Crown className="w-5 h-5 text-amber-500" />}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>Área: <strong className="text-foreground">{room.areaCode}</strong></span>
                <span>Host: <strong className="text-foreground">{room.hostName}</strong></span>
                <span>Participantes: <strong className="text-foreground">{room.currentParticipants}/{room.maxParticipants}</strong></span>
                {room.code && (
                  <div className="flex items-center gap-2">
                    <span>Código:</span>
                    <code className="bg-secondary px-2 py-1 rounded text-foreground font-mono">
                      {room.code}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyRoomCode}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Controles de Voz */}
            <div className="flex items-center gap-2">
              {!isInCall ? (
                <Button
                  onClick={handleStartVoiceCall}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Iniciar Chamada
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant={isMicOn ? "default" : "destructive"}
                    size="sm"
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant={isVideoOn ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleEndVoiceCall}
                  >
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Controles do Host */}
          {isHost && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-lg">{formatTime(sessionTime)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {canStartSession && (
                  <Button onClick={handleStartSession} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Sessão
                  </Button>
                )}
                
                {isSessionActive && (
                  <>
                    <Button onClick={handlePauseSession} variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </Button>
                    <Button onClick={handleEndSession} variant="destructive">
                      <Square className="w-4 h-4 mr-2" />
                      Encerrar
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lista de Casos Clínicos */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Checklists Disponíveis - {checklistsData.length}</h2>
                    <p className="text-sm text-muted-foreground">
                      Selecione um caso para praticar colaborativamente
                    </p>
                  </div>
                </div>
                
                {/* Filtros */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Busca */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar checklist..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Filtro por Área */}
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger 
                      className={cn(
                        "w-full sm:w-[200px] bg-secondary text-foreground transition-colors",
                        selectedArea !== "all" 
                          ? "border-2 border-primary" 
                          : "border border-border/50"
                      )}
                    >
                      <SelectValue placeholder="Todas as Áreas" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {AREA_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-foreground">
                          {option.label} {areaCounts[option.value] ? `(${areaCounts[option.value]})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Filtro por INEP */}
                  <Select value={selectedInep} onValueChange={setSelectedInep}>
                    <SelectTrigger 
                      className={cn(
                        "w-full sm:w-[200px] bg-secondary text-foreground transition-colors",
                        selectedInep !== "all" 
                          ? "border-2 border-primary" 
                          : "border border-border/50"
                      )}
                    >
                      <SelectValue placeholder="Todos os Checklists" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {INEP_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-foreground">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-3">
                  {availableCases.length} checklist{availableCases.length !== 1 ? 's' : ''} encontrado{availableCases.length !== 1 ? 's' : ''}
                </div>
                
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {availableCases.map((case_item) => (
                    <div
                      key={case_item.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                        selectedCase === case_item.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted/50"
                      )}
                      onClick={() => handleSelectCase(case_item.id)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs shrink-0",
                            case_item.areaCode === 'CM' && "bg-blue-500/10 text-blue-500 border-blue-500/30",
                            case_item.areaCode === 'CR' && "bg-red-500/10 text-red-500 border-red-500/30",
                            case_item.areaCode === 'GO' && "bg-pink-500/10 text-pink-500 border-pink-500/30",
                            case_item.areaCode === 'PE' && "bg-green-500/10 text-green-500 border-green-500/30",
                            case_item.areaCode === 'PR' && "bg-purple-500/10 text-purple-500 border-purple-500/30"
                          )}
                        >
                          {case_item.areaCode}
                        </Badge>
                        <span className="text-sm font-medium truncate">{case_item.title}</span>
                        {case_item.inepEdition && (
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {case_item.inepEdition}
                          </Badge>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        variant={selectedCase === case_item.id ? "default" : "outline"}
                        className="shrink-0 ml-2"
                      >
                        {selectedCase === case_item.id ? 'Selecionado' : 'Praticar'}
                      </Button>
                    </div>
                  ))}
                  
                  {availableCases.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum checklist encontrado com os filtros selecionados</p>
                    </div>
                  )}
                </div>
                
                {selectedCase && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button onClick={handleStartCase} className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Caso Selecionado
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Participantes e Status */}
          <div className="space-y-6">
            {/* Status da Sala */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Status da Sala
                </h3>
              </div>
              
              <div className="p-4">
                {room.status === 'waiting' && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <p className="text-sm font-medium text-amber-600 mb-1">
                      Aguardando médico entrar na sala
                    </p>
                    <p className="text-xs text-muted-foreground">
                      A sessão iniciará quando o host começar
                    </p>
                  </div>
                )}
                
                {room.status === 'active' && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                      <Play className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-green-600 mb-1">
                      Sessão em andamento
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tempo: {formatTime(sessionTime)}
                    </p>
                  </div>
                )}
                
                {room.status === 'paused' && (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                      <Pause className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="text-sm font-medium text-orange-600 mb-1">
                      Sessão pausada
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Aguardando retomada
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Lista de Participantes */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Participantes ({room.currentParticipants})
                </h3>
              </div>
              
              <div className="p-4 space-y-3">
                {room.participants.map((participant) => (
                  <div
                    key={participant.userId}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {participant.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {participant.userName}
                        {participant.userId === currentUser.id && ' (Você)'}
                      </p>
                      <div className="flex items-center gap-2">
                        {participant.role === 'host' && (
                          <Crown className="w-3 h-3 text-amber-500" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {participant.role === 'host' ? 'Host' : 'Participante'}
                        </span>
                      </div>
                    </div>
                    
                    {isInCall && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Slots vazios */}
                {Array.from({ length: room.maxParticipants - room.currentParticipants }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="flex items-center gap-3 p-2 rounded-lg border-2 border-dashed border-border/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                      <Users className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Aguardando participante...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Rápido */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </h3>
              </div>
              
              <div className="p-4">
                <div className="text-center text-sm text-muted-foreground">
                  Chat em desenvolvimento...
                  <br />
                  Use a chamada de voz para se comunicar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}