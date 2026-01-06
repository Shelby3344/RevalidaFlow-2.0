# Implementation Tasks: Community Hub

## Task 1: Database Migration - Community Hub Extensions ✅
- **Spec Requirement:** Requirements 2, 3, 4, 5, 6, 7, 9
- **Description:** Criar migration SQL para estender tabelas existentes e criar novas tabelas para o Community Hub
- **Status:** DONE - Created `supabase/migrations/004_community_hub.sql`
- **Actions:**
  1. Criar arquivo `supabase/migrations/004_community_hub.sql`
  2. Adicionar colunas à tabela `profiles`: study_goal, main_module, total_points, level, is_profile_public, show_in_rankings, allow_study_invites
  3. Criar tabela `user_badges` para badges conquistados
  4. Criar tabela `study_invites` para convites de estudo
  5. Criar tabela `study_sessions_log` para tracking de horários
  6. Criar tabela `community_metrics` para métricas de engajamento
  7. Estender tabela `user_presence` com activity_type e current_module
  8. Criar RLS policies para todas as tabelas
  9. Criar functions para cálculo de rankings e compatibilidade
  10. Habilitar Realtime para novas tabelas

## Task 2: TypeScript Types - Community Module ✅
- **Spec Requirement:** All Requirements
- **Description:** Criar tipos TypeScript para o módulo de comunidade
- **Status:** DONE - Created `src/types/community.ts`
- **Actions:**
  1. Criar arquivo `src/types/community.ts`
  2. Definir tipos: UserLevel, BadgeType, ActivityType, InviteStatus
  3. Definir interfaces: CommunityProfile, UserPresenceExtended, StudyInvite, StudyMatch, RankingEntry, ChatMessageExtended
  4. Definir constantes: LEVEL_THRESHOLDS, POINTS_CONFIG, BADGE_CRITERIA
  5. Atualizar `src/types/database.ts` com novos tipos

## Task 3: Hook - useGamification ✅
- **Spec Requirement:** Requirement 3 (Sistema de Gamificação)
- **Description:** Criar hook para gerenciar pontos, níveis e badges
- **Status:** DONE - Created `src/hooks/useGamification.ts`
- **Actions:**
  1. Criar arquivo `src/hooks/useGamification.ts`
  2. Implementar função `calculateLevel(points)` com thresholds definidos
  3. Implementar função `calculateLevelProgress(points)` para barra de progresso
  4. Implementar função `awardPoints(userId, type, amount)` para dar pontos
  5. Implementar função `checkAndAwardBadges(userId)` para verificar e dar badges
  6. Implementar função `getUserBadges(userId)` para listar badges
  7. Implementar listener realtime para atualizações de pontos

## Task 4: Hook - useAdvancedPresence ✅
- **Spec Requirement:** Requirement 6 (Sistema de Presença Avançado)
- **Description:** Criar hook para gerenciar presença avançada com status de atividade
- **Status:** DONE - Created `src/hooks/useAdvancedPresence.ts`
- **Actions:**
  1. Criar arquivo `src/hooks/useAdvancedPresence.ts`
  2. Implementar tracking de activity_type: online, studying, away, offline
  3. Implementar detecção automática de "studying" quando em páginas de estudo
  4. Implementar timeout de 5 min para "away" e 15 min para "offline"
  5. Implementar função `getStudyingNowUsers()` para listar quem está estudando
  6. Implementar listener realtime para mudanças de presença

## Task 5: Hook - useRankings ✅
- **Spec Requirement:** Requirement 4 (Rankings Inteligentes)
- **Description:** Criar hook para gerenciar rankings com filtros
- **Status:** DONE - Created `src/hooks/useRankings.ts`
- **Actions:**
  1. Criar arquivo `src/hooks/useRankings.ts`
  2. Implementar função `getRanking(filter)` com filtros: top_week, top_day, most_improved, same_goal, same_module
  3. Implementar cálculo de "maior evolução" comparando semanas
  4. Implementar highlight da posição do usuário atual
  5. Limitar resultados a top 10 por filtro
  6. Implementar cache local para evitar queries repetidas

## Task 6: Hook - useStudyMatcher ✅
- **Spec Requirement:** Requirement 5 (Match de Parceiros de Estudo)
- **Description:** Criar hook para algoritmo de matchmaking
- **Status:** DONE - Created `src/hooks/useStudyMatcher.ts`
- **Actions:**
  1. Criar arquivo `src/hooks/useStudyMatcher.ts`
  2. Implementar algoritmo de compatibilidade com pesos: dedicação (40%), objetivo (30%), horários (20%), módulos (10%)
  3. Implementar função `findMatches(userId)` retornando até 5 parceiros
  4. Implementar função `sendStudyInvite(receiverId, message)`
  5. Implementar função `respondToInvite(inviteId, accept)`
  6. Implementar listener realtime para novos convites

## Task 7: Hook - useCommunityHub
- **Spec Requirement:** Requirements 1, 2, 9
- **Description:** Criar hook principal que integra todos os outros hooks
- **Status:** SKIPPED - Integração feita diretamente no CommunityHub.tsx usando hooks existentes
- **Actions:**
  1. Criar arquivo `src/hooks/useCommunityHub.ts`
  2. Integrar useGlobalChat existente com extensões
  3. Integrar useGamification, useAdvancedPresence, useRankings, useStudyMatcher
  4. Implementar função `getUserProfile(userId)` com todas as estatísticas
  5. Implementar função `updatePrivacySettings(settings)`
  6. Implementar tracking de métricas de engajamento

## Task 8: Component - LevelBadge ✅
- **Spec Requirement:** Requirements 1.7, 3.2
- **Description:** Criar componente visual para exibir nível do usuário
- **Status:** DONE - Created `src/components/community/LevelBadge.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/LevelBadge.tsx`
  2. Implementar visual para cada nível: Bronze, Prata, Ouro, Diamante, Elite
  3. Adicionar cores e ícones distintos por nível
  4. Implementar variantes: small (chat), medium (profile), large (ranking)
  5. Adicionar tooltip com nome do nível e pontos necessários

## Task 9: Component - AchievementBadge ✅
- **Spec Requirement:** Requirement 3.5
- **Description:** Criar componente visual para exibir badges de conquistas
- **Status:** DONE - Created `src/components/community/AchievementBadge.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/AchievementBadge.tsx`
  2. Implementar visual para cada badge: studying_now, top_week, 100h_studied, streak_7, streak_30
  3. Adicionar animação para badge "studying_now"
  4. Implementar tooltip com descrição da conquista
  5. Implementar grid de badges para perfil

## Task 10: Component - UserProfileModal ✅
- **Spec Requirement:** Requirement 2 (Perfil Público do Usuário)
- **Description:** Criar modal/painel lateral para exibir perfil completo
- **Status:** DONE - Created `src/components/community/UserProfileModal.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/UserProfileModal.tsx`
  2. Implementar slide-out panel com animação
  3. Exibir: nome, avatar, objetivo, módulo principal
  4. Exibir estatísticas: horas totais, média diária/semanal, % checklists, streak
  5. Exibir gamificação: nível com progresso, badges conquistados
  6. Exibir última atividade
  7. Implementar botão "Convidar para estudar"
  8. Respeitar configurações de privacidade (mostrar dados limitados se privado)

## Task 11: Component - OnlineUsersBar
- **Spec Requirement:** Requirements 1.3, 1.4, 6.4
- **Description:** Criar barra de usuários online/estudando
- **Status:** DONE - Integrado diretamente no CommunityHub.tsx
- **Actions:**
  1. Criar arquivo `src/components/community/OnlineUsersBar.tsx`
  2. Exibir avatares dos usuários online com indicador de status
  3. Destacar usuários "estudando agora" com badge verde animado
  4. Exibir contagem total de online
  5. Implementar seção "Estudando agora" separada
  6. Ao clicar em avatar, abrir perfil do usuário

## Task 12: Component - RankingsPanel ✅
- **Spec Requirement:** Requirement 4 (Rankings Inteligentes)
- **Description:** Criar painel de rankings com filtros
- **Status:** DONE - Created `src/components/community/RankingsPanel.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/RankingsPanel.tsx`
  2. Implementar tabs/dropdown para filtros: Top semana, Top dia, Maior evolução, Mesmo objetivo, Mesmo módulo
  3. Exibir lista com: posição, avatar, nome, nível, métrica relevante
  4. Destacar posição do usuário atual
  5. Implementar loading skeleton
  6. Limitar a 10 resultados por filtro

## Task 13: Component - StudyMatcherPanel ✅
- **Spec Requirement:** Requirement 5 (Match de Parceiros de Estudo)
- **Description:** Criar painel de matchmaking de parceiros
- **Status:** DONE - Created `src/components/community/StudyMatcherPanel.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/StudyMatcherPanel.tsx`
  2. Implementar botão "Encontrar parceiro de estudo"
  3. Exibir cards de sugestão com: perfil resumido, % compatibilidade, critérios de match
  4. Implementar breakdown visual dos critérios (dedicação, objetivo, horários, módulos)
  5. Implementar botão "Convidar para estudar" em cada card
  6. Exibir mensagem quando não há matches compatíveis

## Task 14: Component - StudyInviteCard ✅
- **Spec Requirement:** Requirement 5.6
- **Description:** Criar card de notificação de convite de estudo
- **Status:** DONE - Created `src/components/community/StudyInviteCard.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/StudyInviteCard.tsx`
  2. Exibir: avatar e nome do remetente, mensagem, data
  3. Implementar botões "Aceitar" e "Recusar"
  4. Implementar animação de entrada/saída
  5. Integrar com sistema de notificações

## Task 15: Component - ChatPanel (Enhanced)
- **Spec Requirement:** Requirement 1 (Chat Global Evoluído)
- **Description:** Criar versão evoluída do chat com badges e níveis
- **Status:** DONE - Integrado no CommunityHub.tsx com badges e indicadores de estudo
- **Actions:**
  1. Criar arquivo `src/components/community/ChatPanel.tsx`
  2. Estender GlobalChatPanel existente
  3. Adicionar LevelBadge ao lado do nome nas mensagens
  4. Adicionar indicador "estudando agora" para usuários ativos
  5. Adicionar AchievementBadges visíveis nas mensagens
  6. Implementar click no nome para abrir UserProfileModal
  7. Manter funcionalidades existentes: reply, delete, links

## Task 16: Component - CommunityHub (Main Container) ✅
- **Spec Requirement:** Requirement 8 (Interface e UX)
- **Description:** Criar componente principal que integra todos os painéis
- **Status:** DONE - Created `src/components/community/CommunityHub.tsx`
- **Actions:**
  1. Criar arquivo `src/components/community/CommunityHub.tsx`
  2. Implementar layout com: ChatPanel (principal), painéis laterais (Rankings, Matcher)
  3. Implementar tabs ou accordion para alternar entre painéis
  4. Integrar OnlineUsersBar no topo
  5. Implementar UserProfileModal como overlay
  6. Implementar notificações de convites
  7. Garantir responsividade mobile

## Task 17: Integration - Sidebar Update ✅
- **Spec Requirement:** Requirement 8
- **Description:** Atualizar Sidebar para usar novo CommunityHub
- **Status:** DONE - Updated `src/components/layout/Sidebar.tsx` with CommunityButton
- **Actions:**
  1. Atualizar `src/components/layout/Sidebar.tsx`
  2. Substituir ChatButton por novo botão do Community Hub
  3. Manter posição abaixo de "Checklist Rooms"
  4. Atualizar badge de notificações para incluir convites

## Task 18: Integration - Presence Tracking
- **Spec Requirement:** Requirement 6
- **Description:** Integrar tracking de presença nas páginas de estudo
- **Status:** PENDING - Requires updating study pages to use useAdvancedPresence
- **Actions:**
  1. Atualizar páginas de estudo para usar useAdvancedPresence
  2. Páginas a atualizar: ChecklistExecution, PenseResumos, TreinoIACompleto
  3. Setar status "studying" ao entrar, "online" ao sair
  4. Incluir current_module no tracking

## Task 19: Integration - Points Awarding
- **Spec Requirement:** Requirement 3.1
- **Description:** Integrar sistema de pontos nas ações de estudo
- **Status:** PENDING - Requires updating checklist/study hooks to award points
- **Actions:**
  1. Atualizar hook de checklist para dar pontos ao completar
  2. Atualizar tracking de tempo de estudo para dar pontos por hora
  3. Atualizar sistema de streak para dar pontos por dia consecutivo
  4. Verificar e dar badges automaticamente após ações

## Task 20: Testing & Polish
- **Spec Requirement:** All Requirements
- **Description:** Testar e polir a implementação
- **Status:** PENDING - Requires running the migration and testing the full flow
- **Actions:**
  1. Testar fluxo completo de chat com badges
  2. Testar abertura de perfil e exibição de estatísticas
  3. Testar sistema de rankings com todos os filtros
  4. Testar algoritmo de matchmaking
  5. Testar sistema de convites (enviar, aceitar, recusar)
  6. Testar configurações de privacidade
  7. Testar responsividade mobile
  8. Verificar performance com muitos usuários online
  9. Corrigir bugs encontrados
