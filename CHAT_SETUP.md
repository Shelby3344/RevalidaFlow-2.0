# Chat Global - Configuração

## Visão Geral

O sistema de chat global permite:
- **Chat Global**: Todos os usuários podem ver e enviar mensagens
- **Mensagens Privadas**: Conversas 1:1 entre usuários
- **Presença Online**: Ver quem está online em tempo real
- **Notificações**: Badge com contagem de mensagens não lidas

## Configuração no Supabase

### 1. Executar Migration

Execute o arquivo `supabase/migrations/003_global_chat.sql` no SQL Editor do Supabase.

Este arquivo cria:
- Tabela `global_chat_messages` - mensagens do chat público
- Tabela `private_messages` - mensagens privadas
- Tabela `user_presence` - status online dos usuários
- Políticas RLS para segurança
- Funções auxiliares
- Configuração de Realtime

### 2. Habilitar Realtime

No painel do Supabase:
1. Vá em **Database** → **Replication**
2. Certifique-se que as tabelas estão habilitadas:
   - `global_chat_messages`
   - `private_messages`
   - `user_presence`

### 3. Verificar RLS

As políticas RLS garantem que:
- Todos podem ver mensagens globais
- Usuários só podem enviar mensagens como eles mesmos
- Mensagens privadas só são visíveis para remetente/destinatário
- Usuários só podem atualizar sua própria presença

## Funcionalidades

### Chat Global
- Mensagens em tempo real via Supabase Realtime
- Suporte a links clicáveis
- Responder mensagens
- Deletar próprias mensagens

### Mensagens Privadas
- Clique em um usuário online para iniciar conversa
- Histórico de conversas
- Marcação automática como lida

### Presença Online
- Atualização automática a cada 30 segundos
- Usuários são considerados offline após 2 minutos sem atividade
- Marcação como offline ao fechar a página

## Localização na UI

O chat fica na Sidebar, abaixo de "Checklist Rooms":
- Ícone com badge de mensagens não lidas
- Indicador de usuários online
- Painel lateral ao clicar

## Arquivos Criados

```
src/
├── components/chat/
│   ├── GlobalChatPanel.tsx   # Painel principal do chat
│   └── ChatButton.tsx        # Botão na sidebar
├── hooks/
│   └── useGlobalChat.ts      # Hook com toda lógica
├── types/
│   └── chat.ts               # Tipos TypeScript
supabase/migrations/
└── 003_global_chat.sql       # Migration do banco
```

## Limites

- Supabase Free: 500 conexões simultâneas de Realtime
- Mensagens são armazenadas indefinidamente
- Últimas 100 mensagens carregadas por padrão
