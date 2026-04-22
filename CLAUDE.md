# Loop Play — Monorepo Architecture

## Overview
Turborepo pnpm monorepo. Gaming platform with a lobby that hosts standalone games in iframes.

## Workspace Structure
```
Loop Play/
├── apps/
│   ├── lobby/          # Next.js 16 App Router (src/ layout) — game browser, auth, launcher
│   ├── api/            # Hono HTTP API — auth, scores, catalog, user profiles
│   └── game-21boom/    # Vite + PixiJS standalone game (runs in iframe)
└── packages/
    ├── config/         # Shared ESLint, TypeScript, Tailwind base configs
    ├── types/          # Shared TS types — auth, scores, events, catalog DTOs
    ├── ui/             # Shared React components (presentational only)
    └── game-sdk/       # postMessage bridge between lobby and games
```

## Package Names
- `@loop-play/lobby`
- `@loop-play/api`
- `@loop-play/game-21boom`
- `@loop-play/config`
- `@loop-play/types`
- `@loop-play/ui`
- `@loop-play/game-sdk`

## Tech Stack
| Layer | Technology |
|---|---|
| Monorepo | Turborepo 2 + pnpm 9 workspaces |
| Lobby | Next.js 16 (App Router), React 19, TypeScript 5 |
| API | Hono, TypeScript |
| Games | Vite, PixiJS, TypeScript |
| UI | shadcn/ui, Tailwind CSS v4 |
| Tooling | ESLint (flat config), TypeScript strict |

## Package Dependency Graph
```
lobby ──► ui, types, game-sdk, config
api   ──► types
game-21boom ──► types, game-sdk
ui    ──► config, types
game-sdk ──► types
config  (no internal deps)
types   (no internal deps — types only, no runtime code)
```

## Key Conventions

### Turborepo Tasks
- `pnpm dev` — starts all apps in parallel (persistent, no cache)
- `pnpm build` — topological build (packages before apps)
- `pnpm lint` / `pnpm typecheck` / `pnpm test`

### TypeScript
- All packages extend from `@loop-play/config/tsconfig/*.json`
- Strict mode enabled everywhere
- Path aliases: `@/*` maps to `src/*` in each package

### Tailwind CSS (v4)
- CSS-first config: `@import "tailwindcss"` in global CSS
- Base theme tokens live in `packages/config/tailwind/base.css`
- Apps import via `@import "@loop-play/config/tailwind/base.css"` then `@import "tailwindcss"`

### Shared UI Components (`packages/ui`)
- All components accept a `className` prop (Tailwind override)
- Built on top of shadcn/ui primitives (Radix UI)
- No app-specific business logic — presentational only
- Tree-shakeable — no side effects on import

### Game ↔ Lobby Communication
- Games run in iframes at `apps/game-*`
- `@loop-play/game-sdk` wraps `postMessage` with typed events
- Lobby uses `createGameHost(iframe, opts)` to control embedded games
- Games use `createGameClient(opts)` to report score/lifecycle events
- Message schema is versioned to support old games

### API
- REST over HTTP, Hono router
- Shared request/response types from `@loop-play/types`
- Auth via sessions/tokens (implementation TBD: JWT or cookies)

## Running Locally
```bash
pnpm install          # install all deps
pnpm dev              # start lobby + api + games in watch mode
```

## Adding a New shadcn Component (to lobby)
```bash
cd apps/lobby
pnpm dlx shadcn@latest add <component-name>
```

## Adding a New Package
1. Create `packages/<name>/package.json` with `"name": "@loop-play/<name>"`
2. Add build/dev scripts
3. Reference from consuming app with `"@loop-play/<name>": "workspace:*"`
4. Run `pnpm install` from root
