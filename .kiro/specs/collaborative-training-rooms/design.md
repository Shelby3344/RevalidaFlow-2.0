# Design Document: Sistema de Salas de Treino Colaborativo

## Overview

O sistema de salas de treino colaborativo permite que usuários criem e participem de sessões de prática de casos clínicos em tempo real. O sistema suporta salas públicas (visíveis para todos) e privadas (acessíveis por código), com sincronização em tempo real, chat integrado e controles de moderação.

## Architecture

### Frontend Components
- **RoomListModal**: Lista de salas públicas disponíveis
- **CreateRoomModal**: Interface para criar nova sala
- **JoinRoomModal**: Interface para entrar em sala privada via código
- **CollaborativeSession**: Sessão de treino em tempo real
- **RoomChat**: Sistema de chat integrado
- **ParticipantsList**: Lista de participantes ativos

### Backend Services
- **Room Management Service**: Gerenciamento de salas e participantes
- **Real-time Sync Service**: Sincronização de ações em tempo real
- **Chat Service**: Sistema de mensagens
- **Session State Service**: Controle de estado das sessões

### Data Storage
- **Active Rooms**: Armazenamento em memória (Redis) para salas ativas
- **Session History**: Banco de dados para histórico de sessões
- **User Preferences**: Configurações de notificação e preferências

## Components and Interfaces

### 1. Room Management System

```typescript
interface TrainingRoom {
  id: string;
  code?: string; // Para salas privadas
  type: 'public' | 'private';
  hostId: string;
  hostName: string;
  checklistId: string;
  checklistTitle: string;
  areaCode: AreaCode;
  maxParticipants: number;
  currentParticipants: number;
  participants: RoomParticipant[];
  status: 'waiting' | 'active' | 'paused' | 'finished';
  createdAt: Date;
  startedAt?: Date;
  settings: RoomSettings;
}

interface RoomParticipant {
  userId: string;
  userName: string;
  role: 'host' | 'participant';
  joinedAt: Date;
  isActive: boolean;
  cursor?: CursorPosition;
}

interface RoomSettings {
  allowChat: boolean;
  allowLateJoin: boolean;
  autoStart: boolean;
  sessionDuration?: number;
}
```

### 2. Real-time Synchronization

```typescript
interface SyncAction {
  id: string;
  roomId: string;
  userId: string;
  type: 'checklist_item' | 'annotation' | 'cursor_move' | 'chat_message';
  data: any;
  timestamp: Date;
}

interface ChecklistSyncData {
  itemId: number;
  score: number;
  type: 'adequate' | 'partial' | 'inadequate';
  userId: string;
}

interface CursorPosition {
  x: number;
  y: number;
  elementId?: string;
  userId: string;
  userName: string;
}
```

### 3. Chat System

```typescript
interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system' | 'action';
}

interface ChatSettings {
  enabled: boolean;
  moderationEnabled: boolean;
  maxMessageLength: number;
  rateLimitPerMinute: number;
}
```

## Data Models

### Room State Management

```typescript
class RoomStateManager {
  private rooms: Map<string, TrainingRoom> = new Map();
  private roomSockets: Map<string, Set<WebSocket>> = new Map();

  createRoom(hostId: string, config: CreateRoomConfig): TrainingRoom;
  joinRoom(roomId: string, userId: string): boolean;
  leaveRoom(roomId: string, userId: string): void;
  updateRoomState(roomId: string, action: SyncAction): void;
  broadcastToRoom(roomId: string, data: any): void;
  cleanupInactiveRooms(): void;
}
```

### Session Synchronization

```typescript
class SessionSync {
  private sessionStates: Map<string, SessionState> = new Map();

  syncChecklistAction(roomId: string, action: ChecklistSyncData): void;
  syncCursorPosition(roomId: string, cursor: CursorPosition): void;
  resolveConflicts(roomId: string, conflicts: SyncAction[]): SyncAction[];
  getSessionSnapshot(roomId: string): SessionState;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do.*

### Property 1: Room Code Uniqueness
*For any* two private rooms created at any time, their generated codes should be unique and not conflict with existing active rooms
**Validates: Requirements 3.1, 3.2**

### Property 2: Participant Limit Enforcement
*For any* training room with a maximum participant limit, the number of active participants should never exceed the configured maximum
**Validates: Requirements 1.5, 2.4**

### Property 3: Real-time Action Synchronization
*For any* action performed by a participant in a room, all other active participants should receive the synchronized update within the acceptable latency threshold
**Validates: Requirements 6.1, 6.2, 6.3**

### Property 4: Host Authority Preservation
*For any* room management action (start, pause, kick participant), only the designated host should be able to execute these actions successfully
**Validates: Requirements 5.1, 5.3, 5.5**

### Property 5: Session State Consistency
*For any* room with multiple participants, the session state (checklist progress, scores, annotations) should remain consistent across all participants after synchronization
**Validates: Requirements 6.1, 6.4, 6.5**

### Property 6: Private Room Access Control
*For any* private room, only users with the correct room code should be able to join the session
**Validates: Requirements 3.3, 3.4**

### Property 7: Chat Message Ordering
*For any* sequence of chat messages sent to a room, all participants should receive messages in the same chronological order based on server timestamps
**Validates: Requirements 7.1, 7.2**

### Property 8: Room Cleanup Consistency
*For any* room that becomes inactive (no participants for 30 minutes), the system should remove it from public listings and clean up associated resources
**Validates: Requirements 2.5**

### Property 9: Notification Delivery Reliability
*For any* user subscribed to room notifications, they should receive notifications for relevant events within the specified delivery timeframe
**Validates: Requirements 9.1, 9.2, 9.3**

### Property 10: Conflict Resolution Determinism
*For any* set of simultaneous conflicting actions in a room, the conflict resolution should produce the same deterministic result regardless of processing order
**Validates: Requirements 6.4**

## Error Handling

### Connection Management
- **WebSocket Disconnection**: Implement automatic reconnection with exponential backoff
- **Network Partitions**: Handle temporary disconnections gracefully with state recovery
- **Server Overload**: Implement rate limiting and graceful degradation

### Room State Errors
- **Invalid Room Codes**: Provide clear error messages for expired or invalid codes
- **Full Rooms**: Queue users or suggest alternative rooms
- **Host Disconnection**: Implement host migration or session pause

### Data Synchronization Errors
- **Conflict Resolution**: Use timestamp-based conflict resolution with user notification
- **State Corruption**: Implement state validation and recovery mechanisms
- **Message Loss**: Use acknowledgment system for critical updates

## Testing Strategy

### Unit Tests
- Room creation and management logic
- Code generation uniqueness
- Participant limit enforcement
- Chat message filtering and validation
- Session state calculations

### Property-Based Tests
- **Room Code Generation**: Test uniqueness across large numbers of generated codes
- **Concurrent Participant Management**: Test race conditions in join/leave operations
- **Message Ordering**: Test chat message ordering under various network conditions
- **State Synchronization**: Test consistency under concurrent updates
- **Conflict Resolution**: Test deterministic resolution of simultaneous actions

### Integration Tests
- WebSocket connection handling
- Real-time synchronization across multiple clients
- Room lifecycle management
- Cross-browser compatibility
- Mobile responsiveness

### Load Testing
- Maximum concurrent rooms
- Participants per room limits
- Message throughput capacity
- Memory usage under load
- Database performance with session history

## Implementation Notes

### Real-time Communication
- Use WebSocket connections for real-time updates
- Implement heartbeat mechanism for connection health
- Use Socket.IO for cross-browser compatibility
- Implement message queuing for offline participants

### Security Considerations
- Validate all user inputs and room codes
- Implement rate limiting for room creation and messages
- Use JWT tokens for user authentication
- Sanitize chat messages to prevent XSS attacks
- Log all room activities for audit purposes

### Performance Optimization
- Use Redis for fast room state access
- Implement connection pooling for database operations
- Use CDN for static assets
- Implement lazy loading for room lists
- Cache frequently accessed room data

### Mobile Considerations
- Responsive design for all modal interfaces
- Touch-friendly controls for mobile devices
- Optimized network usage for mobile connections
- Offline capability for viewing session history
- Push notifications for mobile apps