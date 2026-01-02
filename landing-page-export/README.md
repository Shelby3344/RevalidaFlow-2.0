# Landing Page Export - RevalidaFlow

Este diretório contém todos os arquivos necessários para usar a LandingPage do RevalidaFlow em outro projeto React.

## Estrutura de Arquivos

```
landing-page-export/
├── LandingPage.tsx              # Componente principal
├── components/
│   ├── landing/
│   │   ├── ScrollStack.tsx      # Componente de cards empilhados
│   │   └── ScrollStack.css      # Estilos do ScrollStack
│   └── ui/
│       └── button.tsx           # Componente Button (shadcn/ui)
├── lib/
│   └── utils.ts                 # Função cn() para classes CSS
└── README.md
```

## Dependências NPM Necessárias

Instale no seu projeto:

```bash
npm install react react-dom react-router-dom lucide-react lenis clsx tailwind-merge class-variance-authority @radix-ui/react-slot
```

## Configuração do Tailwind CSS

O projeto precisa de Tailwind CSS configurado. No seu `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./landing-page-export/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
      }
    }
  }
}
```

## Variáveis CSS (adicione no seu CSS global)

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --border: 217.2 32.6% 17.5%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
}
```

## Como Usar

1. Copie a pasta `landing-page-export` para seu projeto
2. Instale as dependências
3. Configure o Tailwind
4. Importe e use:

```tsx
import LandingPage from './landing-page-export/LandingPage';

function App() {
  return <LandingPage />;
}
```

## Customização

- Edite as cores nos gradientes em `LandingPage.tsx`
- Modifique os textos e features diretamente no componente
- Ajuste os estilos do ScrollStack em `ScrollStack.css`

## Data de Export

31/12/2025
