import { RoomStateManager } from '@/services/RoomStateManager';
import { CreateRoomConfig } from '@/types/checklists';

/**
 * Função para criar salas de teste para demonstração
 */
export function createTestRooms() {
  const roomManager = RoomStateManager.getInstance();

  // Sala pública 1 - Clínica Médica
  const config1: CreateRoomConfig = {
    type: 'public',
    checklistId: 'cm_001',
    checklistTitle: 'Cetoacidose Diabética',
    areaCode: 'CM',
    maxParticipants: 4,
    settings: {
      allowChat: true,
      allowLateJoin: true,
      autoStart: false,
    },
  };

  const room1 = roomManager.createRoom('host_1', 'Dr. Silva', config1);

  // Sala pública 2 - Cirurgia
  const config2: CreateRoomConfig = {
    type: 'public',
    checklistId: 'cr_001',
    checklistTitle: 'Abdome Agudo Perfurativo | INEP 2025.1',
    areaCode: 'CR',
    maxParticipants: 6,
    settings: {
      allowChat: true,
      allowLateJoin: false,
      autoStart: false,
    },
  };

  const room2 = roomManager.createRoom('host_2', 'Dra. Santos', config2);

  // Sala privada - Ginecologia
  const config3: CreateRoomConfig = {
    type: 'private',
    checklistId: 'go_001',
    checklistTitle: 'Síndrome dos Ovários Policísticos - SOP',
    areaCode: 'GO',
    maxParticipants: 3,
    settings: {
      allowChat: true,
      allowLateJoin: true,
      autoStart: false,
    },
  };

  const room3 = roomManager.createRoom('host_3', 'Dr. Costa', config3);

  // Adicionar alguns participantes às salas públicas
  roomManager.joinRoom(room1.id, 'user_1', 'Ana Oliveira');
  roomManager.joinRoom(room1.id, 'user_2', 'João Pereira');

  roomManager.joinRoom(room2.id, 'user_3', 'Maria Lima');

  console.log('Salas de teste criadas:');
  console.log('- Sala pública CM:', room1.id);
  console.log('- Sala pública CR:', room2.id);
  console.log('- Sala privada GO:', room3.id, 'Código:', room3.code);

  return {
    publicRooms: [room1, room2],
    privateRoom: room3,
  };
}

/**
 * Função para obter estatísticas das salas
 */
export function getRoomStats() {
  const roomManager = RoomStateManager.getInstance();
  return roomManager.getRoomStats();
}

/**
 * Função para limpar todas as salas (útil para testes)
 */
export function clearAllRooms() {
  const roomManager = RoomStateManager.getInstance();
  // Como não temos um método público para limpar, vamos criar salas vazias
  // Em produção, isso seria feito através de um método administrativo
  console.log('Para limpar salas, reinicie a aplicação');
}