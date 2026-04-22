# @loop-play/api

Backend for Loop Play — Hono-based HTTP API.

## Stack
- Hono (router / handlers)
- TypeScript
- `@loop-play/types` — request / response types shared with the lobby and games
- Runtime TBD (Node, Bun, or Cloudflare Workers — pick one)

## Responsibilities
- Auth (sessions, tokens)
- Score submission + leaderboards
- Game catalog metadata
- User profile CRUD
- Anything that needs persistence or secrets

## Suggested layout
```
src/
├── index.ts           # Hono app entry
├── routes/            # Route handlers grouped by resource
├── middleware/        # Auth, CORS, rate limit
├── services/          # Business logic
└── db/                # Data access (Drizzle / Prisma / raw SQL)
```

## Scripts (once wired up)
- `pnpm dev` — watch mode
- `pnpm build` — compile
- `pnpm start` — run production build
