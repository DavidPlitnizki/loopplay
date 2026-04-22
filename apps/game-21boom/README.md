# @loop-play/game-21boom

Standalone Snake game — runs in its own iframe, hosted by the lobby.

## Stack
- Vite
- PixiJS (rendering) — or Canvas 2D, your call
- TypeScript
- `@loop-play/game-sdk` — talks to the lobby via postMessage
- `@loop-play/types` — shared event / score / auth types

## Responsibilities
- Render the snake + food grid
- Run the game loop + input handling (keyboard, swipe)
- Report scores and lifecycle events to the lobby through `game-sdk`
- Stay self-contained — no direct lobby imports

## Scripts (once wired up)
- `pnpm dev` — Vite dev server
- `pnpm build` — production bundle in `dist/`
- `pnpm preview` — preview the built bundle
