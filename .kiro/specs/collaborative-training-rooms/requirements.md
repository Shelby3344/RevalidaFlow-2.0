# Requirements Document

## Introduction

Sistema de salas de treino colaborativo que permite aos usuários criarem salas públicas ou privadas para praticar casos clínicos em conjunto, promovendo aprendizado colaborativo e interação entre estudantes de medicina.

## Glossary

- **Training_Room**: Sala virtual onde usuários podem praticar casos clínicos colaborativamente
- **Room_Host**: Usuário que cria e gerencia a sala de treino
- **Room_Participant**: Usuário que se junta a uma sala existente
- **Public_Room**: Sala visível para todos os usuários na lista pública
- **Private_Room**: Sala acessível apenas através de código de convite
- **Room_Code**: Código único gerado para salas privadas
- **Case_Selection**: Processo de escolha do caso clínico para a sessão
- **Session_State**: Estado atual da sessão (aguardando, em andamento, finalizada)

## Requirements

### Requirement 1: Criar Sala de Treino

**User Story:** Como um usuário, eu quero criar uma sala de treino, para que eu possa praticar casos clínicos com outros usuários.

#### Acceptance Criteria

1. WHEN um usuário clica em "Nova Sala", THE System SHALL exibir opções de sala pública ou privada
2. WHEN um usuário seleciona "Sala Privada", THE System SHALL gerar um código único de 6 caracteres
3. WHEN um usuário seleciona "Sala Pública", THE System SHALL adicionar a sala à lista pública
4. WHEN uma sala é criada, THE System SHALL permitir ao criador escolher o caso clínico
5. THE System SHALL permitir configurar o número máximo de participantes (2-8 usuários)

### Requirement 2: Gerenciar Salas Públicas

**User Story:** Como um usuário, eu quero ver salas públicas disponíveis, para que eu possa me juntar a sessões de treino abertas.

#### Acceptance Criteria

1. THE System SHALL exibir uma lista de salas públicas ativas
2. WHEN uma sala pública é exibida, THE System SHALL mostrar área médica, caso clínico, número de participantes e host
3. WHEN um usuário clica em "Praticar" em uma sala pública, THE System SHALL permitir entrada imediata
4. WHEN uma sala atinge o limite de participantes, THE System SHALL marcar como "Cheia"
5. THE System SHALL remover salas inativas da lista após 30 minutos sem atividade

### Requirement 3: Gerenciar Salas Privadas

**User Story:** Como um usuário, eu quero criar salas privadas com código, para que eu possa treinar apenas com pessoas específicas.

#### Acceptance Criteria

1. WHEN uma sala privada é criada, THE System SHALL gerar um código único alfanumérico
2. THE System SHALL permitir ao host compartilhar o código via link ou texto
3. WHEN um usuário insere um código válido, THE System SHALL permitir entrada na sala
4. WHEN um código inválido é inserido, THE System SHALL exibir mensagem de erro
5. THE System SHALL permitir ao host regenerar o código da sala

### Requirement 4: Participar de Sessões

**User Story:** Como um participante, eu quero me juntar a salas de treino, para que eu possa praticar colaborativamente.

#### Acceptance Criteria

1. WHEN um usuário entra em uma sala, THE System SHALL exibir lista de participantes
2. THE System SHALL permitir comunicação via chat de texto durante a sessão
3. WHEN o host inicia a sessão, THE System SHALL sincronizar o caso clínico para todos
4. THE System SHALL permitir que participantes vejam ações dos outros em tempo real
5. WHEN um participante sai, THE System SHALL notificar os demais usuários

### Requirement 5: Controle de Sessão

**User Story:** Como um host, eu quero controlar a sessão de treino, para que eu possa gerenciar a experiência colaborativa.

#### Acceptance Criteria

1. THE System SHALL permitir apenas ao host iniciar a sessão
2. WHEN a sessão inicia, THE System SHALL bloquear entrada de novos participantes
3. THE System SHALL permitir ao host pausar ou finalizar a sessão
4. WHEN a sessão é pausada, THE System SHALL manter o estado para todos os participantes
5. THE System SHALL permitir ao host remover participantes disruptivos

### Requirement 6: Sincronização em Tempo Real

**User Story:** Como um participante, eu quero ver as ações dos outros em tempo real, para que eu possa aprender colaborativamente.

#### Acceptance Criteria

1. WHEN um participante marca um item do checklist, THE System SHALL sincronizar para todos
2. WHEN um participante adiciona uma anotação, THE System SHALL exibir para todos instantaneamente
3. THE System SHALL mostrar cursor/indicador de onde cada participante está interagindo
4. WHEN há conflito de ações simultâneas, THE System SHALL priorizar por timestamp
5. THE System SHALL manter histórico de ações para revisão posterior

### Requirement 7: Sistema de Chat

**User Story:** Como um participante, eu quero me comunicar com outros durante o treino, para que eu possa discutir o caso clínico.

#### Acceptance Criteria

1. THE System SHALL fornecer chat de texto em tempo real
2. WHEN uma mensagem é enviada, THE System SHALL exibir nome do remetente e timestamp
3. THE System SHALL permitir ao host silenciar participantes específicos
4. THE System SHALL manter histórico do chat durante a sessão
5. THE System SHALL filtrar linguagem inadequada automaticamente

### Requirement 8: Resultados Colaborativos

**User Story:** Como um participante, eu quero ver os resultados da sessão colaborativa, para que eu possa avaliar o desempenho do grupo.

#### Acceptance Criteria

1. WHEN a sessão termina, THE System SHALL calcular pontuação individual e do grupo
2. THE System SHALL exibir estatísticas de participação de cada usuário
3. THE System SHALL mostrar consenso do grupo vs. gabarito oficial
4. THE System SHALL permitir exportar relatório da sessão
5. THE System SHALL salvar sessão no histórico de cada participante

### Requirement 9: Notificações e Convites

**User Story:** Como um usuário, eu quero receber notificações sobre salas de treino, para que eu não perca oportunidades de praticar.

#### Acceptance Criteria

1. WHEN um usuário é convidado para sala privada, THE System SHALL enviar notificação
2. THE System SHALL notificar quando salas públicas de interesse ficam disponíveis
3. WHEN uma sessão está prestes a começar, THE System SHALL alertar participantes
4. THE System SHALL permitir configurar preferências de notificação
5. THE System SHALL enviar lembrete 5 minutos antes de sessões agendadas

### Requirement 10: Moderação e Segurança

**User Story:** Como um administrador, eu quero moderar salas de treino, para que eu possa manter um ambiente de aprendizado saudável.

#### Acceptance Criteria

1. THE System SHALL permitir reportar comportamento inadequado
2. WHEN um usuário é reportado múltiplas vezes, THE System SHALL aplicar restrições temporárias
3. THE System SHALL registrar logs de todas as sessões para auditoria
4. THE System SHALL permitir aos hosts banir usuários de suas salas
5. THE System SHALL implementar sistema de reputação baseado em feedback dos participantes