# game-21boom — Architecture

## Stack

| Layer | Technology |
|---|---|
| Renderer | Phaser 4 (canvas) |
| UI / HUD | React 19 + TSX |
| State machine | XState 5 |
| Build | Vite 6 |
| Styling | CSS Modules |

---

## Directory structure

```
src/
├── main.tsx              # React root — mounts <App />
├── App.tsx               # Composes GameFrame + PhaserGame + HUD
├── vite-env.d.ts         # Vite/CSS module type declarations
│
├── game/
│   ├── GameFrame/
│   │   ├── GameFrame.tsx          # Aspect-ratio frame wrapper
│   │   └── GameFrame.module.css   # Frame layout styles
│   ├── PhaserGame.tsx    # Phaser lifecycle + ResizeObserver
│   ├── config.ts         # Phaser config + screen aspect ratios
│   ├── bridge.ts         # Shared XState actor (Phaser ↔ React)
│   ├── machine.ts        # XState game state machine
│   └── scenes/
│       └── GameScene.ts  # Phaser scene (canvas logic)
│
└── hud/
    └── HUD.tsx           # React overlay — buttons, score, modals
```

---

## Architecture overview

```
┌─────────────────── GameFrame ────────────────────┐
│  (aspect-ratio container, centered in viewport)  │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │         PhaserGame (canvas)              │    │
│  │  Phaser.Scene ──► gameActor.send(...)    │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │         HUD (React overlay)              │    │
│  │  useSelector(gameActor) ──► render UI    │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  border overlay (pointer-events: none)   │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

### Shared state — `bridge.ts`

`gameActor` — единственный XState actor, создаётся один раз при импорте модуля.  
Доступен одновременно из Phaser и React:

```ts
// Phaser scene
this.actor = this.registry.get("gameActor");
this.actor.send({ type: "WRONG_ANSWER" });

// React HUD
const state = useSelector(gameActor, s => s.value);
gameActor.send({ type: "START" });
```

### State machine — `machine.ts`

```
idle ──START──► playing ──PAUSE──► paused ──RESUME──► playing
                  │
          SAY_NUMBER / SAY_BOOM
          (wrong answer or wrong boom)
                  │
              gameOver ──START──► playing
```

**Context:** `{ count: number, score: number }`

| Event | Guard | Action |
|---|---|---|
| `SAY_NUMBER` | `correctNumber` | `incrementCount`, `addScore` |
| `SAY_BOOM` | `correctBoom` | `incrementCount`, `addScore` |
| `WRONG_ANSWER` | — | → `gameOver` |

Boom правило: число кратно 7 **или** содержит цифру 7.

### GameFrame — `GameFrame/`

Центрирует игровой фрейм в viewport с фиксированным aspect ratio.  
Динамические размеры передаются через CSS custom properties:

```css
--frame-ratio  /* aspect-ratio значение */
--frame-width  /* min(100vw, 100vh * W/H) */
--frame-height /* min(100vh, 100vw * H/W) */
```

Красная рамка — отдельный `div.border` с `z-index: 9999` поверх canvas и HUD.

### Screen modes — `config.ts`

| Mode | Ratio | Use case |
|---|---|---|
| `landscape` | 16 : 9 | Desktop / tablet horizontal |
| `portrait` | 9 : 19.5 | Mobile (iPhone) |

---

## How to use

### Run locally

```bash
# From monorepo root — starts all apps:
pnpm dev

# Only this game (port 3001):
pnpm --filter @loop-play/game-21boom dev
```

Open `http://localhost:3001`

### Switch screen mode

В [App.tsx](src/App.tsx) измени проп `mode`:

```tsx
<GameFrame mode="portrait">   // или "landscape"
```

### Add a new game event

1. Добавь тип в `GameEvent` в `machine.ts`
2. Добавь обработчик в нужное состояние в `.createMachine({ states: { playing: { on: { ... } } } })`
3. Отправь событие из Phaser: `this.actor.send({ type: "..." })` или из React: `gameActor.send({ type: "..." })`

### Add a new Phaser scene

```ts
// src/game/scenes/MyScene.ts
import * as Phaser from "phaser";
export class MyScene extends Phaser.Scene {
  constructor() { super({ key: "MyScene" }); }
  create() {
    const actor = this.registry.get("gameActor");
    // ...
  }
}
```

Зарегистрируй в `config.ts`:

```ts
scene: [GameScene, MyScene],
```

---

## Port

| App | Port |
|---|---|
| game-21boom | **3001** |
