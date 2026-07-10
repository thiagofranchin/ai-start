# ai-start — Launchpad Dashboard

Dashboard pessoal que cataloga ferramentas, APIs, IAs, comandos e recursos do ecossistema de desenvolvimento. Migrado de um HTML vanilla (~1530 linhas) para Next.js com App Router, TypeScript e CSS Modules.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js (App Router) |
| Linguagem | TypeScript (strict) |
| Estilização | CSS Modules + `globals.css` para variáveis e estilos compartilhados |
| Fontes | `next/font` — Inter (UI) + JetBrains Mono (terminal/cripto) |
| Estado | React Context (busca) + `useState` (filtros, UI) + `usePathname` (rota ativa) |
| Dados | Arquivos TypeScript estáticos em `src/data/` |
| APIs externas | CoinGecko (preços cripto), AwesomeAPI (USD/BRL) — Client Components |

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx              # Root Layout: SearchProvider + Sidebar + TopBar + children
│   ├── page.tsx                # Home: welcome + 8 stat cards (contadores por seção)
│   ├── globals.css             # Reset, variáveis CSS, estilos de cards/sections, animações, responsive
│   ├── loading.tsx             # Suspense fallback: "⏳ Carregando..."
│   ├── not-found.tsx           # 404: "Página não encontrada" com link para home
│   ├── error.tsx               # Error Boundary: erro inesperado com botão reset()
│   └── [section]/
│       └── page.tsx            # Rota dinâmica — 8 seções (ais, apis, repos, commands, utils, skills, cursos, cripto)
├── components/
│   ├── cards/
│   │   ├── Card.tsx            # Card genérico com link overlay e color variant
│   │   ├── APICard.tsx         # Card destacado para APIs (borda accent + tag)
│   │   ├── CmdCard.tsx         # Card de comando com shell + CopyButton
│   │   └── StatCard.tsx        # Card de estatística da home (sem link overlay)
│   ├── layout/
│   │   ├── Sidebar.tsx         # Sidebar fixa: nav items com badges de contagem, mobile toggle, overlay
│   │   ├── Sidebar.module.css
│   │   ├── TopBar.tsx          # Título dinâmico (via pathname) + search input
│   │   ├── SearchProvider.tsx  # React Context — query de busca global + hook useSearch()
│   │   └── TopBar.module.css
│   ├── sections/
│   │   ├── PageSection.tsx     # Wrapper: header (emoji + título + contador) + grid de cards
│   │   ├── SectionContent.tsx  # Client Component — renderiza cards de qualquer seção (exceto cripto)
│   │   ├── SearchFilter.tsx    # Client Component — filtra children baseado na query do SearchProvider
│   │   ├── CommandGroup.tsx    # Sub-seção para comandos agrupados por `group`
│   │   ├── CriptoPage.tsx      # Client Component — filtro de categoria + grid com animações + ticker
│   │   ├── CriptoPage.module.css  # Tema DeFi Terminal: scanlines, grid bg, animações, cores por categoria
│   │   ├── CryptoTicker.tsx    # Client Component — fetch CoinGecko + AwesomeAPI, refresh manual
│   │   └── CryptoTicker.module.css  # Cards de preço com bordas coloridas por moeda
│   └── ui/
│       └── CopyButton.tsx      # Client Component — clipboard API com feedback "✓ Copiado" e fallback
├── data/
│   ├── index.ts                # Barrel export de todos os arrays
│   ├── ais.ts                  # 4 IAs (Codex, ChatGPT, Gemini, DeepSeek)
│   ├── apis.ts                 # 2 APIs (Vercel AI SDK, OpenRouter)
│   ├── repos.ts                # 2 repositórios (Codex, t3.chat)
│   ├── cmds.ts                 # 5 comandos (agrupados "Free Codex")
│   ├── skills.ts               # 10 skills/plugins
│   ├── cursos.ts               # 4 cursos/plataformas
│   ├── utils.ts                # 2 utilitários
│   └── cripto.ts               # 23 itens em 9 categorias (Swap, DeFi, Lending, etc.)
├── types/
│   └── index.ts                # Interfaces: BaseItem, AIItem, APIItem, RepoItem, CmdItem, SkillItem, CursoItem, UtilItem, CriptoItem, CriptoPrices, SectionId
└── lib/
    ├── constants.ts             # SECTION_TITLES, NAV_ITEMS (9 seções com labels e ícones)
    └── utils.ts                 # formatPrice, formatUpdateTime, formatSidebarDate
```

## Arquitetura e Decisões de Design

### Server Components vs Client Components

A estratégia é **Server Components por padrão, Client Components apenas onde necessário**:

| Componente | Tipo | Motivo |
|-----------|------|--------|
| `page.tsx` (home + [section]) | Server | Dados estáticos, sem interatividade |
| `layout.tsx` | Server | Estrutura estática |
| `Card`, `APICard`, `CmdCard`, `StatCard` | Server | Apenas renderizam props |
| `PageSection`, `CommandGroup` | Server | Wrappers puros |
| `Sidebar` | Client | `useState` (mobile toggle), `usePathname` (active state) |
| `TopBar` | Client | `usePathname` (título), `useSearch()` (input de busca) |
| `SearchProvider` | Client | React Context requer Client Component |
| `SearchFilter` | Client | Consome `useSearch()` para filtrar children |
| `SectionContent` | Client | Embrulha cards com `<SearchFilter>` |
| `CriptoPage` | Client | `useState` (filtro de categoria) |
| `CryptoTicker` | Client | `useEffect` (fetch de APIs externas) |
| `CopyButton` | Client | `onClick` (clipboard API) |

### Padrão de Busca Global

```
SearchProvider (contexto: query + setQuery)
  ├── TopBar: escreve query via input
  └── SearchFilter: lê query, renderiza children ou null
       └── Usado em SectionContent e CriptoPage
```

**Por que Context em vez de URL search params?** A busca é efêmera — o usuário digita e vê resultados instantaneamente. Persistir no URL causaria navegações desnecessárias e poluiria o histórico.

### Rotas Dinâmicas

As 8 seções de conteúdo usam `/[section]/page.tsx` com `generateStaticParams()`:

```ts
const VALID_SECTIONS = ['ais', 'apis', 'repos', 'commands', 'utils', 'skills', 'cursos', 'cripto'];
```

Slugs inválidos acionam `notFound()`. A seção `cripto` tem tratamento especial — renderiza `<CriptoPage />` (Client Component com tema terminal), enquanto as outras usam `<SectionContent />`.

### Tema DeFi Terminal (Seção Cripto)

Implementado como CSS Module (`CriptoPage.module.css`) com variáveis sobrescritas:

- **Scanlines**: `::before` com grid de 36px + `::after` com `repeating-linear-gradient` para flicker
- **Cores**: accent `#00ffc8` (ciano terminal), bordas coloridas por categoria (9 categorias mapeadas)
- **Tipografia**: JetBrains Mono no header com cursor piscante (`▊` + `termBlink`)
- **Animações**: `termFadeIn` (entrada stagger), `termPulse` (indicador ● pulsando no canto)
- **Stagger**: `animation-delay` inline calculado por `i * 0.03s`

### Dados Estáticos

Cada seção é um array tipado em `src/data/`. Os dados são importados diretamente nos componentes — sem fetch, sem DB, sem camada de API. Vantagens:

- TypeScript valida a estrutura em tempo de compilação
- Tree-shaking automático (apenas o array usado é incluído no bundle)
- Editar dados = editar um arquivo TypeScript simples

## Como Rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento (porta 3000)
npm run dev

# Build de produção
npm run build

# Servir build
npm run start

# Lint
npm run lint
```

## Convenções de Código

- **Nomenclatura**: PascalCase para componentes, camelCase para funções/variáveis, kebab-case para arquivos CSS Module
- **Imports**: `@/` alias para `src/` em todos os arquivos
- **CSS**: Classes globais em `globals.css` (cards, layout, animações); estilos específicos de componente em `.module.css`
- **Tipagem**: Todas as props são explicitamente tipadas; `SectionId` usado em vez de `string` para slugs de seção
- **Client Components**: Sempre declarados com `'use client'` na primeira linha; sem efeitos colaterais no corpo do módulo
- **Componentes de Card**: Recebem `BaseItem` ou variante como props, renderizam `<Link>` com `target="_blank" rel="noopener noreferrer"` para URLs externas
- **Estados de UI**: Loading (`loading.tsx`), Empty (resultado de filtro vazio implícito), Error (`error.tsx` com reset), 404 (`not-found.tsx`)

## Seções do Dashboard

| Seção | Rota | Items | Tipo de Card |
|--------|------|-------|-------------|
| Home (stats) | `/` | 8 stats | StatCard |
| IAs | `/ais` | 4 | Card |
| APIs | `/apis` | 2 | APICard |
| Repositórios | `/repos` | 2 | Card (com extraUrl) |
| Comandos | `/commands` | 5 | CmdCard (agrupados) |
| Utilitários | `/utils` | 2 | Card |
| Skills | `/skills` | 10 | Card (com extraUrl) |
| Cursos | `/cursos` | 4 | Card |
| Cripto | `/cripto` | 23 + ticker | TermCard + CryptoTicker |

## APIs Externas

- **CoinGecko**: `GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd` — preços BTC/ETH/SOL
- **AwesomeAPI**: `GET https://economia.awesomeapi.com.br/json/last/USD-BRL` — cotação USD/BRL

Ambas são chamadas no Client Component `CryptoTicker.tsx` via `useEffect` na montagem e no botão de refresh. Fallback: valores `null` com indicador visual de erro, sem quebrar a UI.
