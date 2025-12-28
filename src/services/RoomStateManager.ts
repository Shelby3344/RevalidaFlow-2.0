import { TrainingRoom, RoomParticipant, CreateRoomConfig, SyncAction, AreaCode } from '../types/checklists';

export class RoomStateManager {
  private rooms: Map<string, TrainingRoom> = new Map();
  private static instance: RoomStateManager;

  private constructor() {
    // Carregar salas do localStorage ao inicializar
    this.loadFromStorage();
  }

  static getInstance(): RoomStateManager {
    if (!RoomStateManager.instance) {
      RoomStateManager.instance = new RoomStateManager();
    }
    return RoomStateManager.instance;
  }

  /**
   * Salva as salas no localStorage
   */
  private saveToStorage(): void {
    try {
      const roomsArray = Array.from(this.rooms.entries()).map(([id, room]) => ({
        ...room,
        createdAt: room.createdAt.toISOString(),
        startedAt: room.startedAt?.toISOString(),
        participants: room.participants.map(p => ({
          ...p,
          joinedAt: p.joinedAt.toISOString()
        }))
      }));
      localStorage.setItem('collaborative_rooms', JSON.stringify(roomsArray));
    } catch (error) {
      console.error('Erro ao salvar salas no localStorage:', error);
    }
  }

  /**
   * Carrega as salas do localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('collaborative_rooms');
      if (stored) {
        const roomsArray = JSON.parse(stored);
        this.rooms.clear();
        roomsArray.forEach((room: any) => {
          const parsedRoom: TrainingRoom = {
            ...room,
            createdAt: new Date(room.createdAt),
            startedAt: room.startedAt ? new Date(room.startedAt) : undefined,
            participants: room.participants.map((p: any) => ({
              ...p,
              joinedAt: new Date(p.joinedAt)
            }))
          };
          this.rooms.set(room.id, parsedRoom);
        });
        console.log('Salas carregadas do localStorage:', this.rooms.size);
      }
    } catch (error) {
      console.error('Erro ao carregar salas do localStorage:', error);
    }
  }

  /**
   * Gera um código único de 6 caracteres para salas privadas
   */
  private generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.isCodeInUse(code));
    
    return code;
  }

  /**
   * Verifica se um código já está sendo usado
   */
  private isCodeInUse(code: string): boolean {
    for (const room of this.rooms.values()) {
      if (room.code === code) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gera um ID único para a sala
   */
  private generateRoomId(): string {
    return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Cria uma nova sala de treino
   */
  createRoom(hostId: string, hostName: string, config: CreateRoomConfig): TrainingRoom {
    const roomId = this.generateRoomId();
    const code = config.type === 'private' ? this.generateRoomCode() : undefined;

    const room: TrainingRoom = {
      id: roomId,
      code,
      type: config.type,
      hostId,
      hostName,
      checklistId: config.checklistId,
      checklistTitle: config.checklistTitle,
      areaCode: config.areaCode,
      maxParticipants: config.maxParticipants,
      currentParticipants: 1,
      participants: [{
        userId: hostId,
        userName: hostName,
        role: 'host',
        joinedAt: new Date(),
        isActive: true
      }],
      status: 'waiting',
      createdAt: new Date(),
      settings: config.settings
    };

    this.rooms.set(roomId, room);
    this.saveToStorage();
    console.log(`Sala criada: ${roomId} (${config.type})`, room);
    
    return room;
  }

  /**
   * Adiciona um participante à sala
   */
  joinRoom(roomId: string, userId: string, userName: string): boolean {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      console.error(`Sala não encontrada: ${roomId}`);
      return false;
    }

    // Verifica se a sala está cheia
    if (room.currentParticipants >= room.maxParticipants) {
      console.error(`Sala cheia: ${roomId}`);
      return false;
    }

    // Verifica se a sessão já começou e não permite entrada tardia
    if (room.status === 'active' && !room.settings.allowLateJoin) {
      console.error(`Sessão já iniciada e entrada tardia não permitida: ${roomId}`);
      return false;
    }

    // Verifica se o usuário já está na sala
    const existingParticipant = room.participants.find(p => p.userId === userId);
    if (existingParticipant) {
      existingParticipant.isActive = true;
      console.log(`Usuário reconectado à sala: ${userId} -> ${roomId}`);
      return true;
    }

    // Adiciona novo participante
    const participant: RoomParticipant = {
      userId,
      userName,
      role: 'participant',
      joinedAt: new Date(),
      isActive: true
    };

    room.participants.push(participant);
    room.currentParticipants++;
    this.saveToStorage();

    console.log(`Usuário entrou na sala: ${userId} -> ${roomId}`);
    return true;
  }

  /**
   * Remove um participante da sala
   */
  leaveRoom(roomId: string, userId: string): void {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      console.error(`Sala não encontrada: ${roomId}`);
      return;
    }

    const participantIndex = room.participants.findIndex(p => p.userId === userId);
    if (participantIndex === -1) {
      console.error(`Participante não encontrado na sala: ${userId} -> ${roomId}`);
      return;
    }

    const participant = room.participants[participantIndex];
    
    // Se for o host, transfere a propriedade ou encerra a sala
    if (participant.role === 'host') {
      const activeParticipants = room.participants.filter(p => p.userId !== userId && p.isActive);
      
      if (activeParticipants.length > 0) {
        // Transfere para o primeiro participante ativo
        activeParticipants[0].role = 'host';
        room.hostId = activeParticipants[0].userId;
        room.hostName = activeParticipants[0].userName;
        this.saveToStorage();
        console.log(`Host transferido para: ${activeParticipants[0].userName}`);
      } else {
        // Encerra a sala se não há mais participantes
        this.rooms.delete(roomId);
        this.saveToStorage();
        console.log(`Sala encerrada (host saiu): ${roomId}`);
        return;
      }
    }

    // Remove o participante
    room.participants.splice(participantIndex, 1);
    room.currentParticipants--;
    this.saveToStorage();

    console.log(`Usuário saiu da sala: ${userId} -> ${roomId}`);
  }

  /**
   * Busca uma sala por código (para salas privadas)
   */
  findRoomByCode(code: string): TrainingRoom | undefined {
    for (const room of this.rooms.values()) {
      if (room.code === code) {
        return room;
      }
    }
    return undefined;
  }

  /**
   * Obtém uma sala por ID
   */
  getRoom(roomId: string): TrainingRoom | undefined {
    return this.rooms.get(roomId);
  }

  /**
   * Lista todas as salas ativas (públicas e privadas)
   */
  getAllActiveRooms(): TrainingRoom[] {
    return Array.from(this.rooms.values())
      .filter(room => room.status !== 'finished');
  }

  /**
   * Lista todas as salas públicas ativas
   */
  getPublicRooms(): TrainingRoom[] {
    return Array.from(this.rooms.values())
      .filter(room => room.type === 'public' && room.status !== 'finished');
  }

  /**
   * Atualiza o status de uma sala
   */
  updateRoomStatus(roomId: string, status: TrainingRoom['status']): boolean {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      console.error(`Sala não encontrada: ${roomId}`);
      return false;
    }

    room.status = status;
    
    if (status === 'active' && !room.startedAt) {
      room.startedAt = new Date();
    }

    this.saveToStorage();
    console.log(`Status da sala atualizado: ${roomId} -> ${status}`);
    return true;
  }

  /**
   * Remove salas inativas (mais de 30 minutos sem atividade)
   */
  cleanupInactiveRooms(): void {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    for (const [roomId, room] of this.rooms.entries()) {
      const lastActivity = room.startedAt || room.createdAt;
      
      if (lastActivity < thirtyMinutesAgo && room.status !== 'active') {
        this.rooms.delete(roomId);
        console.log(`Sala inativa removida: ${roomId}`);
      }
    }
    this.saveToStorage();
  }

  /**
   * Obtém estatísticas das salas
   */
  getRoomStats() {
    const rooms = Array.from(this.rooms.values());
    
    return {
      total: rooms.length,
      public: rooms.filter(r => r.type === 'public').length,
      private: rooms.filter(r => r.type === 'private').length,
      active: rooms.filter(r => r.status === 'active').length,
      waiting: rooms.filter(r => r.status === 'waiting').length,
      totalParticipants: rooms.reduce((sum, r) => sum + r.currentParticipants, 0)
    };
  }
}