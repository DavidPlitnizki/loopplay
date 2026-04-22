# @loop-play/types

Shared TypeScript types — the single source of truth for cross-app contracts.

## What lives here
- `auth` — user, session, token payloads
- `scores` — score submission + leaderboard shapes
- `events` — postMessage event schemas between lobby and games
- `catalog` — game metadata (id, slug, title, cover, entry URL)
- Any DTO that crosses a process / iframe / network boundary

## Rules
- **Types only.** No runtime code, no dependencies beyond dev-tooling.
- **Zod schemas optional but encouraged** — if used, export both the schema and its inferred type.
- Breaking changes here ripple everywhere — version the message schema fields instead of changing them in place.

## Suggested layout
```
src/
├── auth.ts
├── scores.ts
├── events.ts
├── catalog.ts
└── index.ts   // re-exports
```
