# 📧 Configuração de Emails - Supabase

## Como configurar os templates de email no Supabase

### Passo 1: Acessar configurações de Auth

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** > **Email Templates**

### Passo 2: Configurar template de Confirmação

1. Clique em **Confirm signup**
2. Cole o conteúdo de `confirmation.html`
3. Configure:
   - **Subject:** `Confirme seu email - RevalidaFlow`
   - **From:** `RevalidaFlow <noreply@revalidaflow.com>`

### Passo 3: Configurar template de Recuperação de Senha

1. Clique em **Reset password**
2. Cole o conteúdo de `recovery.html`
3. Configure:
   - **Subject:** `Recuperar senha - RevalidaFlow`
   - **From:** `RevalidaFlow <noreply@revalidaflow.com>`

### Passo 4: Configurar SMTP (Opcional - Recomendado para produção)

Para enviar emails com seu próprio domínio:

1. Vá em **Project Settings** > **Auth**
2. Role até **SMTP Settings**
3. Habilite **Enable Custom SMTP**
4. Configure com seu provedor (Resend, SendGrid, etc.):

```
Host: smtp.resend.com
Port: 465
User: resend
Password: sua_api_key
Sender email: noreply@revalidaflow.com
Sender name: RevalidaFlow
```

### Provedores de Email Recomendados

| Provedor | Plano Gratuito | Preço |
|----------|----------------|-------|
| [Resend](https://resend.com) | 3.000/mês | $20/mês |
| [SendGrid](https://sendgrid.com) | 100/dia | $15/mês |
| [Mailgun](https://mailgun.com) | 5.000/mês | $35/mês |

### Variáveis disponíveis nos templates

- `{{ .ConfirmationURL }}` - Link de confirmação
- `{{ .Email }}` - Email do usuário
- `{{ .SiteURL }}` - URL do site

### Testando

1. Crie uma nova conta no RevalidaFlow
2. Verifique se o email de confirmação chegou
3. Teste a recuperação de senha
