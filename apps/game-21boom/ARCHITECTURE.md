# game-21boom — Architecture

## Stack

| Layer | Technology |
|---|---|
| Renderer | Phaser 4 (canvas) |
| UI / HUD / modals | React 19 + TSX |
| State machine | XState 5 (`@xstate/react` for hooks) |
| Build | Vite |
| Styling | CSS Modules |

---

## Directory structure

```
src/
├── main.tsx                  # React root — mounts <App />
├── App.tsx                   # GameFrame > PhaserGame + HUD + ModalsManager
│
├── game/
│   ├── GameFrame/            # Aspect-ratio frame wrapper (+ red border overlay)
│   ├── PhaserGame.tsx        # Phaser lifecycle + ResizeObserver
│   ├── config.ts             # Phaser config (LoaderScene, GameScene) + aspect ratios
│   ├── assets.ts             # Asset manifest for the loader
│   ├── bridge.ts             # gameActor singleton + gameReadySignal + animSignal
│   ├── machine/
│   │   ├── index.ts          # XState machine definition (states / transitions)
│   │   ├── types.ts          # GameContext, GameEvent, RoundEvent, initialContext
│   │   ├── actions.ts        # Pure context reducers (wrapped in assign)
│   │   ├── guards.ts         # playerBust, naturalBlackjack, enemyShouldHit, matchOver
│   │   └── cards.ts          # Card, buildDeck, shuffle, handTotal
│   └── scenes/
│       ├── LoaderScene.ts    # Preload assets, then start GameScene
│       └── GameScene.ts      # Table, deck pile, card deal/flip animations
│
└── components/
    ├── ErrorBoundary.tsx
    ├── hud/                  # TopBar, RoundIndicator, HandScore, Controls (+ Timer)
    └── modals/               # ModalsManager + one folder per modal
```

---

## Overview

```
┌──────────────────────── GameFrame ─────────────────────────┐
│  PhaserGame  (canvas)   — draws cards, animates deal / flip │
│  HUD         (React)    — scores, round dots, Hit/Stand     │
│  ModalsManager (React)  — menu, round result, game over ... │
│  border overlay (pointer-events: none)                      │
└─────────────────────────────────────────────────────────────┘
                  ▲                         │
                  │ subscribe(snapshot)     │ send(event)
                  └──────── gameActor ◄─────┘
```

**All game logic lives in the state machine.** Phaser and React are views:
they read snapshots from `gameActor` and send events to it. Phaser never
decides outcomes; it only animates what the machine already decided.

### `bridge.ts`

- `gameActor` — one XState actor created at module load and shared by Phaser
  (via `game.registry.get("gameActor")`) and React (`useSelector(gameActor, ...)`).
  It outlives the Phaser scene (HMR, StrictMode), so the scene must unsubscribe
  on `SHUTDOWN` / `DESTROY` (see `GameScene.create`).
- `notifyCardRendered(holder, card)` — Phaser calls it when a deal/flip
  animation finishes; it sends `CARD_RENDERED`, which appends to
  `displayedPlayerHand` / `displayedEnemyHand`. HUD scores read the *displayed*
  hands so the number matches what the player sees, not the logical hand.
- `gameReadySignal` — flipped by `GameScene.create()`; React modals render only
  after it (so nothing shows over the loader).
- `animSignal` — `begin()` / `end()` counter around tweens; React disables
  controls and delays the round-result modal while animations run.
  Both signals are consumed with `useSyncExternalStore`.

### State machine (`machine/index.ts`, id `game-21`)

Top level — lifecycle and menus:

```
idle ──START──► playing ──PAUSE──► paused ──RESUME──► playing
 ▲ │                 └──END_GAME──► gameOver ──START──► playing
 │ └─OPEN_MENU/ADS/MARKET/RULES/MAP/SETTINGS/PROFILE─► <modal state>
 └────────────────── CLOSE_* ◄──────────────────────────┘
(MAIN_MENU from anywhere → idle + resetMatch)
```

Round flow inside `playing`:

```
dealing ─► playerTurn ──HIT──► playerDraw ─(bust)─► resolving
              │  ▲                 └──────(ok)─────► playerTurn
              │  └─────────── enemyDraw ◄─(<17)── enemyTurn
              ├─STAND / END_TURN─────────────────► enemyTurn ─(>=17)─► resolving
              ├─SURRENDER────► enemyWin ─► roundOver ─┐
              └─(natural 21)─► resolving              │
resolving ─► roundResult ──NEXT_ROUND or after 7s──────┤
                                                       ▼
                                   matchOver? ─► gameOver : newRound ─► playerTurn
```

**Context:** `deck`, `playerHand`, `enemyHand`, `displayedPlayerHand`,
`displayedEnemyHand`, `nextHolder`, `winner`, `holeRevealed`, `roundsPlayed`,
`playerWins`, `enemyWins`, `roundResults`.

**Constants** (`guards.ts`): `ENEMY_HIT_THRESHOLD = 17`, `MATCH_LENGTH = 5`.
Target is `BLACKJACK_TARGET = 21` (`cards.ts`).

### Phaser scene

`GameScene` subscribes to the actor; `onSnap(snapshot)` compares hands with
the previous snapshot to detect a new round (clear + redeal), new cards
(deal tween), and hole-card reveal (flip tween). Idle → cards cleared.
`onResize` re-lays out on `Scale.Events.RESIZE`.

### GameFrame

Centers a fixed-aspect frame in the viewport via CSS variables
(`--frame-ratio`, `--frame-width`, `--frame-height`). The border is a
separate `div` above canvas and HUD. Modes in `config.ts`:
`landscape` 16:9 (current), `portrait` 9:19.5.

---

## How to work with it

### Run

```bash
pnpm --filter @loop-play/game-21boom dev   # http://localhost:3001
pnpm dev                                    # whole monorepo (lobby on :3000)
```

### Add a round action (e.g. Double Down)

1. Add the event to `RoundEvent` in `machine/types.ts`.
2. Add a transition from `playerTurn` in `machine/index.ts`; put new context
   changes in `actions.ts` (register in `setup({ actions })`) and conditions
   in `guards.ts` (register in `setup({ guards })`).
3. Add a button in `components/hud/Controls/Controls.tsx` that calls
   `gameActor.send({ type: "DOUBLE" })`.
4. Phaser needs changes only if there is a new animation.

### Add a modal

1. Add `OPEN_X` / `CLOSE_X` to `GameEvent` and a state `x` in the machine
   (`idle` → `x` → `idle`).
2. Create `components/modals/XModal/` and mount it in `ModalsManager` inside
   `<AnimatedModal show={is("x")}>`.
3. Open it from the main menu with `gameActor.send({ type: "OPEN_X" })`.

### Animate something in Phaser

Wrap the tween: `animSignal.begin()` before, `animSignal.end()` in `onComplete`.
If the animation shows a card, call `notifyCardRendered` when it settles.

### Test logic without UI

```ts
const actor = createActor(gameMachine).start();
actor.send({ type: "START" });
actor.send({ type: "STAND" });
actor.getSnapshot().value; // { playing: "roundResult" } | ...
```

### Add a new Phaser scene

Create a class extending `Phaser.Scene`, read the actor with
`this.registry.get("gameActor")`, and register it in `scene: [...]` in
`config.ts`.

---

## Not done yet

- Lobby integration: `@loop-play/game-sdk` is a dependency but unused. Planned:
  send `game:ready` on scene ready, `game:score` / `game:exit` when entering
  `gameOver`, and accept `lobby:start` (userId, token).
- Market / Map / Profile / Settings / Ads modals are placeholders.

## Port

| App | Port |
|---|---|
| game-21boom | **3001** |
