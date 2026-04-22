# Loop Play

Monorepo for the Loop Play gaming platform — a lobby, its games, the backend, and shared packages.

## Structure

```
loop-play/
├── apps/
│   ├── lobby/         # Next.js platform (the lobby UI)
│   ├── game-21boom/   # Standalone game (Vite + PixiJS)
│   └── api/           # Backend (Hono)
└── packages/
    ├── game-sdk/      # Contract with the lobby — postMessage helpers
    ├── ui/            # Shared React components
    ├── types/         # Shared TS types (auth, scores, events)
    └── config/        # Shared eslint / tsconfig / tailwind base configs
```

## Tooling

- **Package manager:** pnpm (workspaces)
- **Task runner:** Turborepo
- **Language:** TypeScript
- **Node:** >= 20

## Getting started

```bash
pnpm install      # install all workspaces
pnpm dev          # run all dev servers via turbo
pnpm build        # build everything
pnpm lint         # lint everything
pnpm typecheck    # typecheck everything
```

## Adding a new app or package

1. Create the folder under `apps/` or `packages/`.
2. Add a `package.json` with `"name": "@loop-play/<name>"`.
3. `pnpm install` from the root to wire it into the workspace.
4. Reference other workspaces via `"workspace:*"`, e.g.
   ```json
   "dependencies": { "@loop-play/types": "workspace:*" }
   ```

## Conventions

- Internal package names use the `@loop-play/*` scope.
- Games live in `apps/game-<name>/` and depend on `@loop-play/game-sdk` + `@loop-play/types`.
- Cross-app runtime contracts (events, scores, auth payloads) live in `@loop-play/types`.
