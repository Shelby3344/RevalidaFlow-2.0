# RevalidaFlow

Plataforma de preparação para o exame Revalida INEP.

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase (Auth + Database)
- OpenAI (Chat, TTS, Whisper)

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
OPENAI_API_KEY=sua_chave_openai
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── hooks/          # Custom hooks
├── pages/          # Páginas da aplicação
├── services/       # Serviços (AI, etc)
├── lib/            # Utilitários
├── data/           # Dados estáticos
└── types/          # TypeScript types

api/                # Edge functions (Vercel)
supabase/           # Migrations e templates
```

## Funcionalidades

- ✅ Autenticação (Email, Google, GitHub)
- ✅ 176+ Checklists OSCE
- ✅ Treino com Paciente IA
- ✅ Salas Colaborativas
- ✅ Dashboard e Analytics
- ✅ Sistema de Aulas
- ✅ Flashcards
- ✅ Resumos

## Licença

© 2025 RevalidaFlow. Todos os direitos reservados.
