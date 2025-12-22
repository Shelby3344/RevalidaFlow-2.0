# Implementation Plan

- [x] 1. Criar tipos e utilitários base




  - [ ] 1.1 Criar tipos TypeScript para treino IA
    - Criar arquivo `src/types/treino-ia.ts` com interfaces `TreinoIASession`, `Message`, `ItemScore`, `AIResponse`


    - Definir tipos para prompts e contexto da IA
    - _Requirements: 1.1, 2.1, 3.1_
  - [ ] 1.2 Criar utilitários de detecção
    - Criar arquivo `src/lib/checklist-detector.ts` com função para detectar itens do checklist em mensagens
    - Criar arquivo `src/lib/exame-detector.ts` com função para detectar solicitações de exames
    - _Requirements: 7.1, 3.1_
  - [x]* 1.3 Escrever testes de propriedade para detecção




    - **Property 2: Itens detectados são marcados**
    - **Property 5: Exames solicitados são liberados**
    - **Property 8: Exames inexistentes retornam mensagem**
    - **Validates: Requirements 2.1, 3.1, 3.5, 7.1**


- [ ] 2. Implementar hook principal useAIPacienteAvaliador
  - [ ] 2.1 Criar hook useAIPacienteAvaliador
    - Criar arquivo `src/hooks/useAIPacienteAvaliador.ts`

    - Implementar `sendMessage()` que processa como paciente e avaliador
    - Integrar detecção de checklist e exames
    - Implementar lógica de pontuação (adequado/parcial/inadequado)
    - _Requirements: 1.2, 2.1, 2.5, 3.1, 7.1, 7.2_
  - [ ] 2.2 Implementar prompt engineering
    - Criar função `generateSystemPrompt()` com contexto do caso
    - Criar função `parseAIResponse()` para extrair dados estruturados
    - Implementar fallback para respostas locais
    - _Requirements: 1.3, 1.4, 1.5_
  - [ ] 2.3 Implementar lógica de preservação de pontuação
    - Manter pontuação mais alta quando item já foi marcado
    - Registrar múltiplos itens de uma mensagem




    - _Requirements: 7.3, 7.4_
  - [ ]* 2.4 Escrever testes de propriedade para hook
    - **Property 1: Resposta da IA é retornada**
    - **Property 13: Classificação é válida**


    - **Property 14: Múltiplos itens são registrados**
    - **Property 15: Pontuação mais alta é preservada**
    - **Validates: Requirements 1.2, 7.2, 7.3, 7.4**



- [ ] 3. Checkpoint - Garantir que todos os testes passam
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implementar componentes de UI


  - [ ] 4.1 Criar componente ChatPacienteIA
    - Criar arquivo `src/components/treino-ia/ChatPacienteIA.tsx`
    - Interface de chat com paciente IA
    - Integrar reconhecimento de voz e text-to-speech
    - Exibir indicador de "digitando" enquanto IA processa
    - _Requirements: 1.1, 1.2, 6.1, 6.2, 6.3, 6.4_
  - [ ] 4.2 Criar componente ProgressoAvaliacao
    - Criar arquivo `src/components/treino-ia/ProgressoAvaliacao.tsx`




    - Exibir barra de progresso (itens completados / total)
    - Listar itens do checklist com status (completado/pendente)
    - Exibir pontuação parcial em tempo real
    - _Requirements: 2.2, 2.3_

  - [ ] 4.3 Criar componente ExamesLiberados
    - Criar arquivo `src/components/treino-ia/ExamesLiberados.tsx`
    - Listar exames disponíveis e liberados
    - Exibir conteúdo do exame quando clicado
    - Notificação quando novo exame é liberado


    - _Requirements: 3.2, 3.3, 3.4_
  - [ ] 4.4 Criar componente FeedbackItem
    - Criar arquivo `src/components/treino-ia/FeedbackItem.tsx`
    - Toast/notificação quando item do checklist é completado
    - Mostrar qual item foi detectado e pontuação
    - _Requirements: 2.3_
  - [ ]* 4.5 Escrever testes de propriedade para progresso
    - **Property 3: Progresso é calculado corretamente**
    - **Property 6: Exames liberados têm conteúdo**


    - **Property 7: Lista de exames é mantida**

    - **Validates: Requirements 2.2, 3.3, 3.4**

- [ ] 5. Implementar página principal TreinoIACompleto
  - [x] 5.1 Criar página TreinoIACompleto

    - Criar arquivo `src/pages/TreinoIACompleto.tsx`
    - Layout com chat à esquerda, progresso e exames à direita
    - Integrar timer, chat, progresso e exames
    - Controles de iniciar/pausar/finalizar
    - _Requirements: 1.1, 4.1, 4.2, 4.3, 4.4_
  - [ ] 5.2 Implementar tela de resultado
    - Exibir resumo com pontuação total e porcentagem
    - Listar todos os itens do checklist com status
    - Destacar itens não realizados
    - Botão para reiniciar treino
    - _Requirements: 5.1, 5.2, 5.3, 5.4_



  - [-] 5.3 Adicionar rota no App.tsx

    - Rota `/treino-ia-completo/:checklistId` para TreinoIACompleto
    - _Requirements: 1.1_
  - [ ]* 5.4 Escrever testes de propriedade para resultado
    - **Property 4: Resultado contém todos os campos**
    - **Property 11: Pontuação final é correta**
    - **Property 12: Itens não realizados são identificados**
    - **Validates: Requirements 2.4, 5.1, 5.2, 5.3**

- [ ] 6. Checkpoint - Garantir que todos os testes passam
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Integrar com timer e finalização
  - [ ] 7.1 Integrar useAvaliacaoTimer
    - Conectar timer existente na página
    - Implementar auto-finalização quando tempo acaba
    - Sincronizar estado de pausa
    - _Requirements: 4.1, 4.2, 4.3_
  - [ ] 7.2 Implementar fluxo de finalização
    - Calcular resultado final ao finalizar
    - Salvar sessão no localStorage para histórico
    - Permitir reiniciar com mesmo caso
    - _Requirements: 4.3, 5.4_
  - [ ]* 7.3 Escrever testes de propriedade para timer
    - **Property 9: Timer inicia com tempo correto**
    - **Property 10: Pausar preserva tempo**
    - **Validates: Requirements 4.1, 4.2**

- [ ] 8. Adicionar botão de acesso na interface
  - [ ] 8.1 Adicionar botão "Treinar com IA" no AllChecklistsModal
    - Botão ao lado de "Avaliar" para iniciar treino com IA
    - Navegar para `/treino-ia-completo/:checklistId`
    - _Requirements: 1.1_

- [ ] 9. Checkpoint Final - Garantir que todos os testes passam
  - Ensure all tests pass, ask the user if questions arise.

</content>
