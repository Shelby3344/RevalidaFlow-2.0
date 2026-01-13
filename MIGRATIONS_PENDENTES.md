# Migrations Pendentes para Produção

Execute estas migrations no SQL Editor do Supabase na ordem listada:

## 1. Migration 013 - Progresso de Questões Teóricas
Arquivo: `supabase/migrations/013_questoes_progress.sql`

Cria as tabelas:
- `questoes_progress` - Salva respostas do usuário nas questões
- `questoes_user_settings` - Configurações avançadas (ocultar acertadas, etc)
- `questoes_last_index` - Salva onde o usuário parou em cada filtro

## 2. Migration 014 - Métricas de Checklists e Avaliação
Arquivo: `supabase/migrations/014_checklist_metrics_and_avaliacao.sql`

Cria as tabelas:
- `checklist_metrics` - Métricas detalhadas por checklist (tentativas, médias, melhor nota)
- `avaliacao_sessions` - Sessões de avaliação em tempo real entre usuários

---

## Como Executar

1. Acesse o Supabase Dashboard
2. Vá em SQL Editor
3. Cole o conteúdo de cada arquivo de migration
4. Execute na ordem (013 primeiro, depois 014)

---

## Verificação

Após executar, verifique se as tabelas foram criadas:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'questoes_progress',
  'questoes_user_settings', 
  'questoes_last_index',
  'checklist_metrics',
  'avaliacao_sessions'
);
```

Deve retornar 5 tabelas.
