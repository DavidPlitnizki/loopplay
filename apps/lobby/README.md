# @loop-play/lobby

The Loop Play lobby — Next.js platform where users browse games, see their profile, and launch games.

## Stack
- Next.js (App Router)
- React
- Tailwind CSS (base config from `@loop-play/config`)
- `@loop-play/ui` for shared components
- `@loop-play/types` for shared TS types
- `@loop-play/game-sdk` for talking to embedded games via postMessage

## Responsibilities
- Auth + user session
- Game catalog + launcher (iframe host for games under `apps/game-*`)
- Leaderboards, scores, social features
- Calls into `apps/api` for data

## Scripts (once wired up)
- `pnpm dev` — Next dev server
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` / `pnpm typecheck`
