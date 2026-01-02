# 🗄️ Configuração do Supabase - RevalidaFlow

## Passo 1: Acessar o Supabase

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login com sua conta
3. Selecione o projeto `faazmzqbsnppmbymqtco`

## Passo 2: Executar o SQL

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `supabase/migrations/001_initial_schema.sql`
4. Cole no editor SQL
5. Clique em **Run** (ou Ctrl+Enter)

## Passo 3: Verificar as Tabelas

Após executar o SQL, você deve ter as seguintes tabelas:

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfil do usuário (criado automaticamente no registro) |
| `checklist_attempts` | Histórico de tentativas de checklists |
| `user_stats` | Estatísticas agregadas do usuário |
| `productivity_tasks` | Tarefas de produtividade diária |
| `flashcard_progress` | Progresso nos flashcards |
| `study_sessions` | Sessões de estudo |

## Passo 4: Verificar RLS (Row Level Security)

As políticas de segurança já estão configuradas no SQL. Cada usuário só pode ver/editar seus próprios dados.

Para verificar:
1. Vá em **Authentication** > **Policies**
2. Verifique se cada tabela tem políticas ativas

## Passo 5: Testar

1. Faça login no RevalidaFlow
2. Vá para a página de **Produtividade**
3. Adicione uma tarefa
4. Verifique no Supabase se a tarefa foi salva:
   - Vá em **Table Editor** > **productivity_tasks**

## Estrutura das Tabelas

### profiles
```sql
- id (UUID, PK) - Referência ao auth.users
- email (TEXT)
- full_name (TEXT)
- avatar_url (TEXT)
- plan (TEXT) - 'free', 'premium', 'vip'
- plan_expires_at (TIMESTAMPTZ)
- created_at, updated_at
```

### checklist_attempts
```sql
- id (UUID, PK)
- user_id (UUID, FK -> profiles)
- checklist_id (TEXT)
- checklist_title (TEXT)
- area_code (TEXT)
- score (DECIMAL)
- max_score (DECIMAL)
- percentage (DECIMAL)
- duration_seconds (INTEGER)
- completed_at, created_at
```

### user_stats
```sql
- id (UUID, PK)
- user_id (UUID, FK -> profiles, UNIQUE)
- total_checklists (INTEGER)
- total_study_time_minutes (INTEGER)
- average_score (DECIMAL)
- best_score (DECIMAL)
- current_streak (INTEGER)
- longest_streak (INTEGER)
- last_activity_at, updated_at
```

### productivity_tasks
```sql
- id (UUID, PK)
- user_id (UUID, FK -> profiles)
- text (TEXT)
- completed (BOOLEAN)
- date (DATE)
- created_at
```

## Triggers Automáticos

1. **on_auth_user_created**: Cria perfil automaticamente quando usuário se registra
2. **on_checklist_attempt**: Atualiza estatísticas do usuário após cada tentativa

## Troubleshooting

### Erro: "permission denied for table profiles"
- Verifique se as políticas RLS estão ativas
- Execute novamente a parte de políticas do SQL

### Erro: "relation does not exist"
- Execute o SQL completo novamente
- Verifique se está no projeto correto

### Dados não aparecem
- Verifique se o usuário está logado
- Verifique no console do navegador se há erros
- Confirme que o `user_id` está correto nas queries
