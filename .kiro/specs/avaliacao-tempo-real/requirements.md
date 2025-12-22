# Requirements Document

## Introduction

Este documento especifica os requisitos para um sistema de avaliação em tempo real para o Revalida. O sistema permite que um avaliador conduza uma avaliação de um candidato (avaliado) de forma sincronizada, onde cada participante tem uma visão específica da estação de avaliação. O avaliador controla o fluxo da avaliação, tem acesso ao checklist completo e pode pontuar o candidato. O avaliado recebe um link, visualiza apenas o cenário de atuação e as instruções, e aguarda o avaliador iniciar o cronômetro.

## Glossary

- **Avaliador**: Usuário que conduz a avaliação, tem acesso ao checklist completo e controla o cronômetro
- **Avaliado**: Candidato que está sendo avaliado, recebe um link e visualiza apenas o cenário e instruções
- **Estação**: Uma sessão de avaliação com cenário, checklist e cronômetro de 10 minutos
- **Sessão de Avaliação**: Instância única de uma avaliação identificada por um código único
- **Cenário de Atuação**: Descrição do caso clínico que o avaliado deve resolver
- **Checklist**: Lista de itens que o avaliador usa para pontuar o desempenho do avaliado
- **Cronômetro**: Timer de 10 minutos sincronizado entre avaliador e avaliado
- **Link de Avaliação**: URL única gerada para o avaliado acessar a sessão

## Requirements

### Requirement 1

**User Story:** Como avaliador, quero criar uma sessão de avaliação e gerar um link para enviar ao avaliado, para que ele possa participar da avaliação remotamente.

#### Acceptance Criteria

1. WHEN o avaliador seleciona um checklist e clica em "Criar Sessão" THEN o Sistema SHALL gerar um código único de sessão e exibir opções para copiar o link ou código
2. WHEN o avaliador copia o link da sessão THEN o Sistema SHALL copiar a URL completa para a área de transferência e exibir confirmação visual
3. WHEN uma sessão é criada THEN o Sistema SHALL manter a sessão ativa por no mínimo 2 horas ou até ser finalizada pelo avaliador
4. WHEN o avaliador acessa uma sessão existente THEN o Sistema SHALL restaurar o estado atual da avaliação incluindo cronômetro e pontuações
5. WHILE a sessão está ativa THEN o Sistema SHALL exibir na interface do avaliador um painel com o código da sessão e botões para "Copiar Link" e "Copiar Código"
6. WHEN o avaliador clica em "Copiar Link" THEN o Sistema SHALL copiar o link completo no formato URL para compartilhar via WhatsApp, email ou outro meio
7. WHEN o avaliado acessa o link THEN o Sistema SHALL exibir na tela do avaliador que o avaliado está conectado na sessão

### Requirement 2

**User Story:** Como avaliado, quero acessar a sessão através de um link e visualizar apenas as informações necessárias para minha atuação, para que eu possa me concentrar no cenário sem ver o checklist.

#### Acceptance Criteria

1. WHEN o avaliado acessa o link da sessão THEN o Sistema SHALL exibir uma tela de espera até o avaliador iniciar a avaliação
2. WHEN a avaliação é iniciada pelo avaliador THEN o Sistema SHALL exibir o cenário de atuação e as instruções dos 10 minutos para o avaliado
3. WHILE a avaliação está em andamento THEN o Sistema SHALL ocultar o checklist e as pontuações da visão do avaliado
4. WHEN o avaliado acessa a sessão THEN o Sistema SHALL exibir o cronômetro sincronizado com a visão do avaliador

### Requirement 3

**User Story:** Como avaliador, quero controlar o cronômetro da avaliação, para que eu possa iniciar, pausar e finalizar a estação no momento adequado.

#### Acceptance Criteria

1. WHEN o avaliador clica em "Iniciar" THEN o Sistema SHALL iniciar o cronômetro de 10 minutos e sincronizar com a tela do avaliado
2. WHEN o avaliador clica em "Pausar" THEN o Sistema SHALL pausar o cronômetro em ambas as telas (avaliador e avaliado)
3. WHEN o avaliador clica em "Terminar" THEN o Sistema SHALL encerrar a avaliação e exibir o resultado final
4. WHEN o cronômetro atinge 00:00 THEN o Sistema SHALL emitir um alerta sonoro e visual em ambas as telas

### Requirement 4

**User Story:** Como avaliador, quero marcar os itens do checklist durante a avaliação, para que eu possa registrar o desempenho do avaliado em tempo real.

#### Acceptance Criteria

1. WHEN o avaliador seleciona uma pontuação para um item do checklist THEN o Sistema SHALL registrar a pontuação e atualizar o resultado parcial
2. WHEN o avaliador altera uma pontuação já registrada THEN o Sistema SHALL atualizar o valor e recalcular o resultado total
3. WHILE a avaliação está em andamento THEN o Sistema SHALL exibir o progresso da pontuação (pontos obtidos / pontos totais)
4. WHEN todos os itens são avaliados THEN o Sistema SHALL calcular e exibir a pontuação final em porcentagem

### Requirement 5

**User Story:** Como avaliador, quero visualizar o resultado final da avaliação, para que eu possa informar ao avaliado seu desempenho.

#### Acceptance Criteria

1. WHEN a avaliação é finalizada THEN o Sistema SHALL exibir um resumo com pontuação total, porcentagem e itens avaliados
2. WHEN o avaliador solicita compartilhar resultado THEN o Sistema SHALL permitir exibir o resultado na tela do avaliado
3. WHEN o resultado é exibido THEN o Sistema SHALL mostrar a pontuação por item e a pontuação total

### Requirement 6

**User Story:** Como sistema, quero sincronizar o estado da avaliação entre avaliador e avaliado em tempo real, para que ambos tenham uma experiência consistente.

#### Acceptance Criteria

1. WHEN o estado da sessão muda (cronômetro, fase) THEN o Sistema SHALL propagar a mudança para todos os participantes em menos de 1 segundo
2. WHEN um participante perde conexão THEN o Sistema SHALL tentar reconectar automaticamente e restaurar o estado atual
3. WHEN um participante reconecta THEN o Sistema SHALL sincronizar o estado atual da sessão incluindo tempo restante do cronômetro
4. IF a conexão não puder ser restabelecida em 30 segundos THEN o Sistema SHALL exibir uma mensagem de erro e opção de reconexão manual

### Requirement 7

**User Story:** Como avaliado, quero ver claramente em qual fase da avaliação estou, para que eu saiba quando posso começar a atuar.

#### Acceptance Criteria

1. WHEN o avaliado está aguardando THEN o Sistema SHALL exibir uma mensagem clara indicando que está aguardando o avaliador iniciar
2. WHEN a avaliação inicia THEN o Sistema SHALL exibir uma transição visual clara indicando o início da estação
3. WHEN a avaliação termina THEN o Sistema SHALL exibir uma mensagem indicando o fim da estação
4. WHILE aguardando início THEN o Sistema SHALL exibir o nome do checklist/estação selecionado

### Requirement 8

**User Story:** Como avaliador, quero liberar exames e impressos individualmente para o avaliado durante a avaliação, para que ele possa visualizar os documentos necessários no momento adequado.

#### Acceptance Criteria

1. WHEN o avaliador clica no cadeado de um impresso/exame THEN o Sistema SHALL desbloquear o documento e torná-lo visível na tela do avaliado
2. WHEN um impresso é liberado THEN o Sistema SHALL exibir uma notificação visual na tela do avaliado indicando que um novo documento está disponível
3. WHILE um impresso está bloqueado THEN o Sistema SHALL exibir o item com ícone de cadeado fechado para o avaliador e ocultar completamente da visão do avaliado
4. WHEN um impresso é liberado THEN o Sistema SHALL permitir que o avaliado visualize o conteúdo completo do documento
5. WHEN o avaliador clica novamente no cadeado de um impresso liberado THEN o Sistema SHALL bloquear o documento e ocultá-lo da visão do avaliado

