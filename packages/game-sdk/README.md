# @loop-play/game-sdk

The contract between the lobby and embedded games. Thin, dependency-light postMessage helpers.

## Who uses it
- `apps/lobby` — to **host** games (embed iframe, send/receive messages)
- `apps/game-*` — to **talk back** to the lobby (ready, score, exit, events)

## What lives here
- `postMessage` senders and listeners (typed)
- Message schema / discriminated unions (imported from `@loop-play/types`)
- Lifecycle helpers: `ready`, `start`, `pause`, `resume`, `exit`
- Score reporting helpers
- Origin validation + message-id correlation

## Suggested exports
```ts
// From the lobby side:
export function createGameHost(iframe: HTMLIFrameElement, opts): GameHost;

// From the game side:
export function createGameClient(opts): GameClient;
```

## Design rules
- **No DOM-heavy dependencies.** This package must work in both the Next.js lobby and a Vite+Pixi game.
- **Types come from `@loop-play/types`.** This package owns the *transport*, not the *shape*.
- **Versioned.** Breaking changes to the message schema bump a version field so old games still work.
