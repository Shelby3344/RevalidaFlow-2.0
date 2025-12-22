# Requirements Document

## Introduction

Este documento especifica os requisitos para um sistema de treino com IA completo para o Revalida. O sistema simula uma estação OSCE onde a IA atua simultaneamente como paciente (respondendo às perguntas do candidato) e como avaliador (pontuando automaticamente o desempenho conforme o checklist). Além disso, a IA libera exames e impressos automaticamente quando o candidato os solicita durante a consulta.

## Glossary

- **Candidato**: Usuário que está treinando, faz o papel de médico na consulta
- **Paciente IA**: Inteligência artificial que simula o paciente do caso clínico
- **Avaliador IA**: Inteligência artificial que avalia o desempenho do candidato em tempo real
- **Checklist**: Lista de itens que a IA usa para pontuar o desempenho do candidato
- **Impressos/Exames**: Documentos como resultados de exames, laudos, que podem ser liberados durante a consulta
- **Estação**: Uma sessão de treino com cenário, checklist e cronômetro de 10 minutos

## Requirements

### Requirement 1

**User Story:** Como candidato, quero conversar com um paciente simulado por IA, para que eu possa praticar anamnese e exame físico de forma realista.

#### Acceptance Criteria

1. WHEN o candidato inicia uma sessão de treino THEN o Sistema SHALL exibir o cenário de atuação e um chat para conversar com o paciente IA
2. WHEN o candidato envia uma mensagem THEN o Sistema SHALL processar a mensagem e retornar uma resposta do paciente IA em menos de 3 segundos
3. WHILE a consulta está em andamento THEN o Sistema SHALL manter o paciente IA respondendo de acordo com o script do caso clínico
4. WHEN o candidato faz perguntas sobre sintomas THEN o Sistema SHALL responder baseado nas informações do caso clínico
5. WHEN o candidato solicita exame físico THEN o Sistema SHALL descrever os achados do exame conforme o caso clínico

### Requirement 2

**User Story:** Como candidato, quero ser avaliado automaticamente pela IA durante a consulta, para que eu receba feedback em tempo real sobre meu desempenho.

#### Acceptance Criteria

1. WHEN o candidato realiza uma ação correspondente a um item do checklist THEN o Sistema SHALL marcar automaticamente o item como realizado
2. WHILE a consulta está em andamento THEN o Sistema SHALL exibir o progresso da avaliação (itens completados / total)
3. WHEN o candidato completa um item do checklist THEN o Sistema SHALL exibir uma notificação discreta indicando o item completado
4. WHEN a consulta é finalizada THEN o Sistema SHALL exibir o resultado final com pontuação e itens avaliados
5. WHEN um item do checklist é detectado THEN o Sistema SHALL registrar a pontuação correspondente (adequado/parcial/inadequado)

### Requirement 3

**User Story:** Como candidato, quero solicitar exames durante a consulta e recebê-los automaticamente, para que eu possa praticar a interpretação de resultados.

#### Acceptance Criteria

1. WHEN o candidato solicita um exame durante a conversa THEN o Sistema SHALL identificar o exame solicitado e liberar o impresso correspondente
2. WHEN um exame é liberado THEN o Sistema SHALL exibir uma notificação visual indicando que um novo documento está disponível
3. WHEN o candidato visualiza um exame liberado THEN o Sistema SHALL exibir o conteúdo completo do documento
4. WHILE a consulta está em andamento THEN o Sistema SHALL manter uma lista de exames disponíveis e liberados
5. WHEN o candidato solicita um exame que não existe no caso THEN o Sistema SHALL informar que o exame não está disponível

### Requirement 4

**User Story:** Como candidato, quero controlar o cronômetro da sessão de treino, para que eu possa simular o tempo real de uma estação OSCE.

#### Acceptance Criteria

1. WHEN o candidato inicia a sessão THEN o Sistema SHALL iniciar o cronômetro de 10 minutos
2. WHEN o candidato clica em pausar THEN o Sistema SHALL pausar o cronômetro e a sessão
3. WHEN o cronômetro atinge 00:00 THEN o Sistema SHALL emitir um alerta e finalizar a sessão automaticamente
4. WHILE a sessão está em andamento THEN o Sistema SHALL exibir o tempo restante de forma visível

### Requirement 5

**User Story:** Como candidato, quero ver o resultado detalhado ao final da sessão, para que eu possa identificar pontos de melhoria.

#### Acceptance Criteria

1. WHEN a sessão é finalizada THEN o Sistema SHALL exibir um resumo com pontuação total e porcentagem
2. WHEN o resultado é exibido THEN o Sistema SHALL mostrar cada item do checklist com status (completado/não completado) e pontuação
3. WHEN o resultado é exibido THEN o Sistema SHALL destacar os itens não realizados como oportunidades de melhoria
4. WHEN o candidato solicita THEN o Sistema SHALL permitir reiniciar o treino com o mesmo caso

### Requirement 6

**User Story:** Como candidato, quero usar reconhecimento de voz para conversar com o paciente, para que a experiência seja mais natural e realista.

#### Acceptance Criteria

1. WHEN o candidato ativa o microfone THEN o Sistema SHALL iniciar o reconhecimento de voz em português
2. WHEN o candidato fala THEN o Sistema SHALL transcrever a fala para texto e enviar como mensagem
3. WHEN o paciente IA responde THEN o Sistema SHALL reproduzir a resposta em áudio (text-to-speech)
4. WHEN o candidato desativa o microfone THEN o Sistema SHALL parar o reconhecimento de voz

### Requirement 7

**User Story:** Como sistema, quero analisar as mensagens do candidato para identificar ações do checklist, para que a avaliação seja precisa.

#### Acceptance Criteria

1. WHEN uma mensagem é enviada THEN o Sistema SHALL analisar o conteúdo para identificar itens do checklist
2. WHEN uma ação do checklist é identificada THEN o Sistema SHALL determinar se foi realizada de forma adequada, parcial ou inadequada
3. WHEN múltiplos itens são identificados em uma mensagem THEN o Sistema SHALL registrar todos os itens correspondentes
4. WHEN um item já foi marcado THEN o Sistema SHALL manter a pontuação mais alta registrada

</content>
