# ai-start

Dashboard pessoal para centralizar ferramentas, IAs, APIs, repositórios, comandos, cursos, recursos cripto e oportunidades de trabalho em uma única interface.

## Recursos

- Busca global instantânea entre os recursos catalogados.
- Seções para IAs & APIs, Agents & Skills, repositórios, utilitários, cursos, cripto & DeFi e oportunidades.
- Guia de comandos para Python, Node e Free Claude Code.
- Cotações de BTC, ETH, SOL e USD/BRL, atualizadas a partir de CoinGecko e AwesomeAPI.
- Layout responsivo, sidebar com navegação e tema terminal na área de cripto.

## Tecnologias

- Next.js 16 com App Router
- React 19 e TypeScript
- CSS Modules e CSS global
- `next/font` com Inter e JetBrains Mono

## Estrutura

- `src/app`: rotas e layout da aplicação.
- `src/components`: componentes reutilizáveis de layout, cards e seções.
- `src/data`: catálogo estático e tipado dos recursos.
- `src/types`: tipos compartilhados.
- `src/lib`: constantes e utilitários.

## Como executar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos disponíveis

```bash
npm run dev        # desenvolvimento com Webpack
npm run dev:turbo  # desenvolvimento com Turbopack
npm run lint       # verificação de lint
npm run build      # build de produção
npm run start      # serve o build de produção
```
