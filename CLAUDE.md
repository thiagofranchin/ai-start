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
│   ├── layout.tsx              # Root Layout: SearchProvider + MarketProvider + MarketBar + Sidebar + TopBar + CommandPalette + skip-link
│   ├── page.tsx                # Home: hero (com busca) + Favoritos + atalhos de seção (StatCard como link)
│   ├── globals.css             # Reset, variáveis CSS, cards, favoritos, empty state, skeleton, a11y, reduced-motion
│   ├── loading.tsx             # Suspense fallback: skeleton de cards
│   ├── not-found.tsx / error.tsx
│   ├── icon.svg / robots.ts / sitemap.ts   # Favicon, robots e sitemap (metadata files do Next)
│   ├── [section]/page.tsx      # Rota dinâmica — 7 seções (ais, repos, utils, skills, cursos, cripto, jobs) + generateMetadata
│   └── code/
│       ├── page.tsx            # Redireciona para /code/python
│       └── [topic]/page.tsx    # Tópicos Code (python, node, fcc, claude-codex, dsh) + generateMetadata
├── components/
│   ├── cards/
│   │   ├── Card.tsx            # Card genérico: link overlay (com aria-label), links extras e ★ favorito (`favKey`)
│   │   ├── AICard.tsx          # Card de IA/API: botão "Abrir chat", links secundários, pulse, stagger via `index`, ★ favorito
│   │   ├── StatCard.tsx        # Atalho de seção na home (Link com ícone, contagem e descrição)
│   │   └── StatCard.module.css
│   ├── layout/
│   │   ├── Sidebar.tsx         # Sidebar com grupos (Explorar / Desenvolvimento / Mercado & carreira), badges, submenu Code, menu mobile
│   │   ├── TopBar.tsx          # <h1> da página + descrição, filtro da página (só seções filtráveis) e botão da paleta
│   │   ├── SearchProvider.tsx  # Context: query do filtro (zera ao navegar) + estado da paleta
│   │   ├── CommandPalette.tsx  # Paleta Ctrl/⌘+K (busca global no catálogo) + atalho "/" para o filtro
│   │   ├── MarketProvider.tsx  # Context único de cotações: fetch ao montar + a cada 60s (aba visível) + refresh manual
│   │   └── MarketBar.tsx       # Barra global de cotações (consome MarketProvider)
│   ├── sections/
│   │   ├── PageSection.tsx     # Wrapper: contagem "x de y itens" + grid de cards
│   │   ├── SectionContent.tsx  # Client — cards de qualquer seção (exceto cripto), filtrados por useFilteredItems
│   │   ├── useFilteredItems.ts # Hook: filtra por query (sem acento, todos os termos)
│   │   ├── FavoritesSection.tsx / HeroSearch.tsx  # Home: favoritos fixados e botão de busca do hero
│   │   ├── CodeTabs.tsx / CodeTopicPage.tsx / CodeCommandRow.tsx
│   │   ├── CriptoPage.tsx(+.module.css)    # Client — tema terminal, filtro de categoria, tags, ★ favorito
│   │   └── CryptoTicker.tsx(+.module.css)  # Client — cards de preço (consome MarketProvider)
│   └── ui/
│       ├── CardIcon.tsx        # Ícone de card (emoji ou imagem via next/image `unoptimized`)
│       ├── FavoriteButton.tsx  # Botão ★ (aria-pressed)
│       ├── EmptyState.tsx      # "Nenhum resultado" + Limpar busca
│       ├── CopyButton.tsx
│       └── TruncatedDescription.tsx  # Descrição com clamp + tooltip (portal)
├── data/                       # Arrays estáticos tipados por seção (ais, repos, skills, cursos, utils, jobs, cripto, code) + index.ts
├── types/index.ts              # BaseItem, AIItem, CriptoItem, CriptoPrices, SectionId, CodeTopic…
└── lib/
    ├── constants.ts            # SECTION_TITLES/EMOJIS/DESCRIPTIONS, FILTERABLE_SECTIONS, NAV_ITEMS (com `group`)
    ├── registry.ts             # `catalog` (todos os cards, chave `seção:nome`) + `pages` — alimenta paleta e favoritos
    ├── search.ts               # normalize() e matchesQuery() (sem acento, multi-termo)
    ├── favorites.ts            # useFavorites() — localStorage via useSyncExternalStore
    ├── market.ts               # fetchMarket() — CoinGecko + AwesomeAPI, falha independente por fonte
    ├── site.ts                 # SITE_URL, pageMetadata()
    ├── useIsClient.ts          # useIsClient() / useModKey() sem setState em efeito
    └── utils.ts                # formatPrice, formatChange
```

> Contagens de itens mudam toda hora: a fonte da verdade é `src/data/` (a UI calcula `array.length`).

## Arquitetura e Decisões de Design

### Server Components vs Client Components

Server Components por padrão; Client Components só onde há estado, efeitos ou eventos:

| Componente | Tipo | Motivo |
|-----------|------|--------|
| `page.tsx` (home, [section], code), `layout.tsx` | Server | Dados estáticos |
| `Card`, `AICard`, `StatCard`, `PageSection`, `CodeTabs`, `CodeTopicPage`, `CodeCommandRow`, `CardIcon` | Server | Apenas renderizam props |
| `Sidebar`, `TopBar`, `CommandPalette` | Client | `usePathname`, teclado, estado de UI |
| `SearchProvider`, `MarketProvider` | Client | Context + estado |
| `MarketBar`, `CryptoTicker` | Client | Consomem `useMarket()` |
| `SectionContent`, `CriptoPage`, `FavoritesSection`, `HeroSearch`, `EmptyState`, `FavoriteButton` | Client | `useSearch()`, `useFavorites()`, estado |
| `CopyButton`, `TruncatedDescription` | Client | Clipboard / medição e portal |

### Busca, Filtro e Favoritos

Dois mecanismos complementares, ambos efêmeros (sem URL params):

```
SearchProvider (query do filtro + estado da paleta)
  ├── TopBar: input "Filtrar nesta página" (só em FILTERABLE_SECTIONS) → setQuery
  ├── useFilteredItems(items): lê a query e filtra (SectionContent, CriptoPage) → EmptyState quando vazio
  └── CommandPalette (Ctrl/⌘+K): busca em `catalog` + `pages` de lib/registry.ts, em todas as seções
```

- A `query` pertence à rota em que foi digitada: ao navegar volta a `''` (derivado do `pathname`, sem `useEffect`).
- `matchesQuery` normaliza acentos e exige todos os termos; o texto pesquisável inclui nome, descrição, categorias (cripto) e rótulos de links.
- **Favoritos**: `useFavorites()` guarda chaves `seção:nome` em `localStorage` (`ai-start:favorites`) via `useSyncExternalStore`. A home (`FavoritesSection`) e a paleta resolvem as chaves em `catalogByKey`. **Renomear um item em `src/data/` invalida o favorito dele.**
- Novo item em `src/data/` entra automaticamente na paleta e nos favoritos (o `registry.ts` lê os arrays).

### Rotas Dinâmicas

As 7 seções de conteúdo usam `/[section]/page.tsx` com `generateStaticParams()`:

```ts
const VALID_SECTIONS = ['ais', 'repos', 'utils', 'skills', 'cursos', 'cripto', 'jobs'];
```

Slugs inválidos acionam `notFound()`. A seção `cripto` tem tratamento especial — renderiza `<CriptoPage />` (Client Component com tema terminal), enquanto as outras usam `<SectionContent />`.

Além disso, a seção **Code** (`/code`) usa uma segunda rota dinâmica `/[topic]/page.tsx` com `generateStaticParams()`:

```ts
const VALID_TOPICS = ['python', 'node', 'fcc', 'claude-codex', 'dsh'];
```

`/code` redireciona para `/code/python`. Cada tópico renderiza `<CodeTabs />` (abas) + `<CodeTopicPage />` (intro + grupos de comandos).

### Tema DeFi Terminal (Seção Cripto)

Implementado como CSS Module (`CriptoPage.module.css`) com variáveis sobrescritas:

- **Scanlines**: `::before` com grid de 36px + `::after` com `repeating-linear-gradient` para flicker
- **Cores**: accent `#00ffc8` (ciano terminal), bordas coloridas por categoria (11 categorias mapeadas)
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
- **Estados de UI**: Loading (`loading.tsx`, skeleton), Empty (`EmptyState` quando o filtro zera a lista), Error (`error.tsx` com reset), 404 (`not-found.tsx`)
- **Hooks/efeitos**: evite `setState` síncrono dentro de `useEffect` (lint `react-hooks/set-state-in-effect`); prefira estado derivado ou `useSyncExternalStore`
- **Acessibilidade**: `<h1>` só na `TopBar`; links overlay de card precisam de `aria-label`; botões toggle usam `aria-pressed`; animações respeitam `prefers-reduced-motion`
- **Novos itens**: ao adicionar em `src/data/`, use `name` estável (é a chave do favorito)

## Seções do Dashboard

| Seção | Rota | Items | Tipo de Card |
|--------|------|-------|-------------|
| Home | `/` | hero + favoritos + 7 atalhos | StatCard (link) |
| IAs & APIs | `/ais` | ver `src/data/ais.ts` | AICard (chat opcional + links de API) |
| Repositórios | `/repos` | ver `src/data/repos.ts` | Card (com links) |
| Utilitários | `/utils` | ver `src/data/utils.ts` | Card |
| Skills | `/skills` | ver `src/data/skills.ts` | Card (com links) |
| Cursos | `/cursos` | ver `src/data/cursos.ts` | Card |
| Cripto | `/cripto` | ver `src/data/cripto.ts` + ticker | TermCard + CryptoTicker |
| Code | `/code/[topic]` | 5 tópicos | CodeTabs + CodeCommandRow |
| Oportunidades | `/jobs` | ver `src/data/jobs.ts` | Card |

## APIs Externas

- **CoinGecko**: `GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true` — preços e variação 24h de BTC/ETH/SOL
- **AwesomeAPI**: `GET https://economia.awesomeapi.com.br/json/last/USD-BRL` — cotação USD/BRL

Ambas são chamadas **uma única vez** por `MarketProvider` (em `layout.tsx`) via `lib/market.ts`, e consumidas por `MarketBar` e `CryptoTicker` com `useMarket()`. Atualiza ao montar, a cada 60s (só com a aba visível, intervalo mínimo de 30s) e no botão de refresh.

Fallback: cada fonte falha de forma independente; valores `null` viram "—" e o último valor bom é mantido. O plano gratuito da CoinGecko tem rate limit — recarregar a página várias vezes seguidas pode deixar BTC/ETH/SOL em "—" por um tempo.
