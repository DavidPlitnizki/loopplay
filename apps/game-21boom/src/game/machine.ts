import { assign, setup } from "xstate";

interface GameContext {
  count: number;
  score: number;
}

type GameEvent =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "SAY_NUMBER"; value: number }
  | { type: "SAY_BOOM" }
  | { type: "WRONG_ANSWER" };

function isBoom(n: number): boolean {
  return n % 7 === 0 || String(n).includes("7");
}

export const gameMachine = setup({
  types: {
    context: {} as GameContext,
    events: {} as GameEvent,
  },
  actions: {
    incrementCount: assign(({ context }) => ({ count: context.count + 1 })),
    addScore: assign(({ context }) => ({ score: context.score + 10 })),
    resetGame: assign(() => ({ count: 0, score: 0 })),
  },
  guards: {
    correctNumber: ({ context, event }) => {
      if (event.type !== "SAY_NUMBER") return false;
      const next = context.count + 1;
      return !isBoom(next) && event.value === next;
    },
    correctBoom: ({ context }) => {
      return isBoom(context.count + 1);
    },
  },
}).createMachine({
  id: "game-21boom",
  initial: "idle",
  context: { count: 0, score: 0 },
  states: {
    idle: {
      on: {
        START: { target: "playing", actions: "resetGame" },
      },
    },
    playing: {
      on: {
        PAUSE: "paused",
        WRONG_ANSWER: "gameOver",
        SAY_NUMBER: [
          {
            guard: "correctNumber",
            actions: ["incrementCount", "addScore"],
          },
          { target: "gameOver" },
        ],
        SAY_BOOM: [
          {
            guard: "correctBoom",
            actions: ["incrementCount", "addScore"],
          },
          { target: "gameOver" },
        ],
      },
    },
    paused: {
      on: {
        RESUME: "playing",
      },
    },
    gameOver: {
      on: {
        START: { target: "playing", actions: "resetGame" },
      },
    },
  },
});

export type GameMachine = typeof gameMachine;
