# Requirements Document

## Introduction

Sistema de Hub de Comunidade inteligente que transforma o Chat Global em uma plataforma social de estudos, permitindo conexões entre alunos baseadas em desempenho, dedicação e objetivos. O sistema inclui gamificação, rankings inteligentes, perfis públicos e matchmaking de parceiros de estudo para aumentar engajamento, retenção e tempo de estudo.

## Glossary

- **Community_Hub**: Sistema central que integra chat, perfis, rankings e matchmaking
- **User_Profile**: Perfil público do usuário com estatísticas e badges
- **Gamification_System**: Sistema de pontos, níveis e badges
- **Ranking_System**: Sistema de rankings com filtros inteligentes
- **Study_Matcher**: Algoritmo de matchmaking para encontrar parceiros de estudo
- **Presence_System**: Sistema de presença online com status de atividade
- **Badge**: Conquista visual exibida no perfil e chat
- **Level**: Nível do usuário (Bronze, Prata, Ouro, Diamante, Elite)
- **Streak**: Sequência de dias consecutivos de estudo
- **Compatibility_Score**: Pontuação de compatibilidade entre dois usuários

## Requirements

### Requirement 1: Chat Global Evoluído

**User Story:** As a student, I want to chat in real-time with other students, so that I can feel part of a study community and stay motivated.

#### Acceptance Criteria

1. THE Community_Hub SHALL display a real-time chat interface with dark mode design
2. WHEN a user sends a message, THE Community_Hub SHALL display the message with user name, avatar, level badge, and timestamp
3. WHEN a user is actively studying, THE Presence_System SHALL display a green indicator (🟢) next to their name with "estudando agora" status
4. THE Community_Hub SHALL display the count of online users in real-time
5. WHEN a message contains inappropriate content, THE Community_Hub SHALL allow moderators to delete it
6. THE Community_Hub SHALL support message replies and link detection
7. WHEN displaying the chat, THE Community_Hub SHALL show user level badges (Bronze, Prata, Ouro, Diamante, Elite) next to names

### Requirement 2: Perfil Público do Usuário

**User Story:** As a student, I want to view other students' profiles, so that I can evaluate potential study partners and feel motivated by their progress.

#### Acceptance Criteria

1. WHEN a user clicks on another user's name in chat, THE Community_Hub SHALL open a profile modal/panel
2. THE User_Profile SHALL display: name, avatar, study goal (e.g., "Revalida 2026"), and main course/module
3. THE User_Profile SHALL display study statistics: total hours studied, daily/weekly average, checklist completion percentage
4. THE User_Profile SHALL display gamification data: current streak, user level, and earned badges
5. THE User_Profile SHALL display last activity timestamp (e.g., "estudou há 10 min")
6. WHEN a user sets their profile to private, THE User_Profile SHALL hide detailed statistics from other users
7. THE User_Profile SHALL provide a "Convidar para estudar" button to initiate study partnership

### Requirement 3: Sistema de Gamificação

**User Story:** As a student, I want to earn points, levels, and badges for studying, so that I feel rewarded and motivated to continue.

#### Acceptance Criteria

1. THE Gamification_System SHALL award points based on: hours studied (10 pts/hour), checklists completed (50 pts), streak days (20 pts/day)
2. THE Gamification_System SHALL define levels: Bronze (0-500 pts), Prata (501-2000 pts), Ouro (2001-5000 pts), Diamante (5001-10000 pts), Elite (10001+ pts)
3. THE Gamification_System SHALL award badges for achievements: "Estudando agora", "Top da semana", "+100h estudadas", "Streak 7 dias", "Streak 30 dias"
4. WHEN a user earns a new badge or level, THE Gamification_System SHALL display a celebration notification
5. THE Gamification_System SHALL display badges visually in chat messages and user profiles
6. THE Gamification_System SHALL NOT include any pay-to-win mechanics

### Requirement 4: Rankings Inteligentes

**User Story:** As a student, I want to see rankings filtered by different criteria, so that I can compare myself with similar students and stay motivated.

#### Acceptance Criteria

1. THE Ranking_System SHALL provide filters: "Top da semana", "Top do dia", "Maior evolução", "Mesmo objetivo", "Mesmo módulo"
2. WHEN displaying rankings, THE Ranking_System SHALL show user avatar, name, level, and relevant metric
3. THE Ranking_System SHALL highlight the current user's position in each ranking
4. WHEN filtering by "Mesmo objetivo", THE Ranking_System SHALL only show users with matching study goals
5. WHEN filtering by "Mesmo módulo", THE Ranking_System SHALL only show users studying the same module
6. THE Ranking_System SHALL display top 10 users per filter to avoid overwhelming beginners
7. THE Ranking_System SHALL show percentage improvement for "Maior evolução" filter

### Requirement 5: Match de Parceiros de Estudo

**User Story:** As a student, I want to find compatible study partners, so that I can study together with someone at my level and with similar goals.

#### Acceptance Criteria

1. WHEN a user clicks "Encontrar parceiro de estudo", THE Study_Matcher SHALL analyze: hours studied, active modules, frequent study times, and study goal
2. THE Study_Matcher SHALL calculate a compatibility score (0-100%) based on: similar dedication level (40%), matching goals (30%), overlapping study times (20%), same modules (10%)
3. THE Study_Matcher SHALL suggest up to 5 compatible partners sorted by compatibility score
4. WHEN displaying a match suggestion, THE Study_Matcher SHALL show: user profile summary, compatibility percentage, and matching criteria
5. THE Study_Matcher SHALL provide a "Convidar para estudar" CTA button for each suggestion
6. WHEN a user sends a study invitation, THE Community_Hub SHALL notify the recipient via the chat system
7. IF no compatible partners are found, THE Study_Matcher SHALL display a message encouraging the user to study more to find matches

### Requirement 6: Sistema de Presença Avançado

**User Story:** As a student, I want to see who is studying right now, so that I feel motivated by social proof and can connect with active students.

#### Acceptance Criteria

1. THE Presence_System SHALL track user activity status: "online", "estudando", "away", "offline"
2. WHEN a user is on a checklist or study page, THE Presence_System SHALL set status to "estudando"
3. THE Presence_System SHALL display "estudando agora" badge in chat for users actively studying
4. THE Community_Hub SHALL show a "Estudando agora" section with avatars of active students
5. WHEN a user has been inactive for 5 minutes, THE Presence_System SHALL change status to "away"
6. WHEN a user closes the app or is inactive for 15 minutes, THE Presence_System SHALL change status to "offline"

### Requirement 7: Configurações de Privacidade

**User Story:** As a student, I want to control my profile visibility, so that I can choose what information to share with others.

#### Acceptance Criteria

1. THE User_Profile SHALL provide a toggle for "Perfil público/privado"
2. WHEN profile is set to private, THE User_Profile SHALL only show: name, avatar, and level
3. WHEN profile is set to private, THE User_Profile SHALL hide: detailed statistics, study times, and streak
4. THE User_Profile SHALL allow users to opt-out of rankings
5. THE User_Profile SHALL allow users to disable study partner suggestions

### Requirement 8: Interface e UX

**User Story:** As a student, I want a clean and modern interface, so that I can focus on studying without visual distractions.

#### Acceptance Criteria

1. THE Community_Hub SHALL use a wider chat layout than standard chat panels
2. THE Community_Hub SHALL display user profiles in a slide-out side panel
3. THE Community_Hub SHALL use subtle micro-animations for interactions
4. THE Community_Hub SHALL visually highlight users who are actively studying
5. THE Community_Hub SHALL maintain a clean, uncluttered design following dark mode aesthetics
6. THE Community_Hub SHALL be responsive and work on mobile devices

### Requirement 9: Métricas e Analytics

**User Story:** As a platform administrator, I want to track community engagement metrics, so that I can measure the feature's impact on user retention.

#### Acceptance Criteria

1. THE Community_Hub SHALL track: average time spent in chat per user
2. THE Community_Hub SHALL track: number of interactions (messages sent) per user
3. THE Community_Hub SHALL track: study hours increase after community feature usage
4. THE Community_Hub SHALL track: number of study partner connections made
5. THE Community_Hub SHALL track: weekly retention rate of community users
6. THE Community_Hub SHALL store metrics data for analytics dashboard consumption
