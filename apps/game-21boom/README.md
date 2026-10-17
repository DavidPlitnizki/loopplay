# @loop-play/game-21boom

Blackjack ("21") against a dealer — a 5-round match. Runs standalone in its own
iframe, hosted by the lobby.

## Stack
- Phaser 4 — canvas: table, deck, card deal/flip animations
- React 19 — HUD and modals overlaid on the canvas
- XState 5 — single source of truth for game state
- Vite — dev server / bundler (port **3001**)
- CSS Modules
- `@loop-play/types` — shared event / score / auth types
- `@loop-play/game-sdk` — lobby ↔ game bridge (declared dependency, **not wired up yet**)

## Rules (as implemented)
- Standard 52-card deck, reshuffled every round. Ace = 11 or 1, J/Q/K = 10.
- Player and dealer get 2 cards each (alternating). The dealer's second card
  (hole card) stays face-down until the player stands.
- Player can **Hit**, **Stand** or **Surrender** (surrender = round loss).
- Dealer hits while below 17.
- A natural blackjack (21 on the first two cards) resolves the round immediately.
- Bust loses; both bust is a tie. Higher total wins.
- A match is 5 rounds; after that the game is over.

## Scripts
- `pnpm dev` — Vite dev server on http://localhost:3001
- `pnpm build` — typecheck + production bundle in `dist/`
- `pnpm preview` — preview the built bundle
- `pnpm typecheck`

From the monorepo root: `pnpm --filter @loop-play/game-21boom dev`.

## Status
- Standalone game works end to end.
- Lobby embeds it via iframe, but no postMessage traffic yet: the game does not
  report `game:ready` / `game:score` and does not receive `lobby:start`.
- Modals Market / Map / Profile / Settings / Ads exist as screens only.

See [ARCHITECTURE.md](ARCHITECTURE.md) for how it is put together.
