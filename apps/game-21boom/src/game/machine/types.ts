import type { Card } from "./cards";

export type Holder = "player" | "enemy";
export type Winner = Holder | "tie" | null;

export interface GameContext {
  deck: Card[];
  playerHand: Card[];
  enemyHand: Card[];
  nextHolder: Holder;
  winner: Winner;
  roundsPlayed: number;
  playerWins: number;
  enemyWins: number;
  roundResults: Winner[];
}

// Top-level game lifecycle events — start, pause, modals, end.
export type GameEvent =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "OPEN_MENU" }
  | { type: "CLOSE_MENU" }
  | { type: "OPEN_ADS" }
  | { type: "CLOSE_ADS" }
  | { type: "OPEN_MARKET" }
  | { type: "CLOSE_MARKET" }
  | { type: "OPEN_RULES" }
  | { type: "CLOSE_RULES" }
  | { type: "OPEN_MAP" }
  | { type: "CLOSE_MAP" }
  | { type: "OPEN_SETTINGS" }
  | { type: "CLOSE_SETTINGS" }
  | { type: "OPEN_PROFILE" }
  | { type: "CLOSE_PROFILE" }
  | { type: "END_GAME" }
  | { type: "MAIN_MENU" };

// Round-level events — only valid inside the `playing` state.
export type RoundEvent =
  | { type: "HIT" }
  | { type: "STAND" }
  | { type: "SURRENDER" }
  | { type: "SHUFFLE" }
  | { type: "NEXT_ROUND" };

export type Events = GameEvent | RoundEvent;

export const initialContext: GameContext = {
  deck: [],
  playerHand: [],
  enemyHand: [],
  nextHolder: "player",
  winner: null,
  roundsPlayed: 0,
  playerWins: 0,
  enemyWins: 0,
  roundResults: [],
};
