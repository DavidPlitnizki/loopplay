import { assign, setup } from "xstate";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export interface Card {
  rank: number;
  suit: Suit;
}

export type Holder = "player" | "enemy";
export type Winner = Holder | "tie" | null;

interface GameContext {
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
type GameEvent =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "OPEN_MENU" }
  | { type: "CLOSE_MENU" }
  | { type: "OPEN_ADS" }
  | { type: "CLOSE_ADS" }
  | { type: "OPEN_MARKET" }
  | { type: "CLOSE_MARKET" }
  | { type: "END_GAME" };

// Round-level events — only valid inside the `playing` state.
type RoundEvent =
  | { type: "HIT" }
  | { type: "STAND" }
  | { type: "SURRENDER" }
  | { type: "SHUFFLE" }
  | { type: "NEXT_ROUND" };

type Events = GameEvent | RoundEvent;

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) deck.push({ suit, rank });
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function cardValue(card: Card): number {
  if (card.rank >= 11) return 10;
  return card.rank;
}

export function handTotal(hand: Card[]): number {
  let total = 0;
  let aces = 0;
  for (const c of hand) {
    if (c.rank === 1) {
      aces += 1;
      total += 11;
    } else {
      total += cardValue(c);
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}

const initialContext: GameContext = {
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

export const gameMachine = setup({
  types: {
    context: {} as GameContext,
    events: {} as Events,
  },
  actions: {
    dealAlternating: assign(() => {
      const deck = buildDeck();
      const playerHand: Card[] = [];
      const enemyHand: Card[] = [];
      // Strict alternation: player, enemy, player, enemy
      playerHand.push(deck.shift()!);
      enemyHand.push(deck.shift()!);
      playerHand.push(deck.shift()!);
      enemyHand.push(deck.shift()!);
      return {
        deck,
        playerHand,
        enemyHand,
        nextHolder: "player" as Holder,
        winner: null as Winner,
      };
    }),
    drawToNext: assign(({ context }) => {
      const deck = [...context.deck];
      const card = deck.shift()!;
      const playerHand =
        context.nextHolder === "player"
          ? [...context.playerHand, card]
          : context.playerHand;
      const enemyHand =
        context.nextHolder === "enemy"
          ? [...context.enemyHand, card]
          : context.enemyHand;
      const nextHolder: Holder =
        context.nextHolder === "player" ? "enemy" : "player";
      return { deck, playerHand, enemyHand, nextHolder };
    }),
    setEnemyAsNext: assign({ nextHolder: () => "enemy" as Holder }),
    decideWinner: assign(({ context }) => {
      const p = handTotal(context.playerHand);
      const e = handTotal(context.enemyHand);
      const pBust = p > 21;
      const eBust = e > 21;
      let winner: Winner;
      if (pBust && eBust) winner = "tie";
      else if (pBust) winner = "enemy";
      else if (eBust) winner = "player";
      else if (p > e) winner = "player";
      else if (e > p) winner = "enemy";
      else winner = "tie";
      return {
        winner,
        roundsPlayed: context.roundsPlayed + 1,
        playerWins: context.playerWins + (winner === "player" ? 1 : 0),
        enemyWins: context.enemyWins + (winner === "enemy" ? 1 : 0),
        roundResults: [...context.roundResults, winner],
      };
    }),
    surrender: assign(({ context }) => ({
      winner: "enemy" as Winner,
      roundsPlayed: context.roundsPlayed + 1,
      enemyWins: context.enemyWins + 1,
      roundResults: [...context.roundResults, "enemy" as Winner],
    })),
    shuffleDeck: assign(({ context }) => {
      const deck = [...context.deck];
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return { deck };
    }),
    resetMatch: assign(() => ({
      roundsPlayed: 0,
      playerWins: 0,
      enemyWins: 0,
      roundResults: [] as Winner[],
    })),
  },
  guards: {
    playerBust: ({ context }) => handTotal(context.playerHand) > 21,
    enemyShouldHit: ({ context }) => handTotal(context.enemyHand) < 17,
    matchOver: ({ context }) =>
      context.playerWins >= 3 || context.enemyWins >= 3 || context.roundsPlayed >= 5,
  },
}).createMachine({
  id: "game-21",
  initial: "idle",
  context: initialContext,
  // Top-level events available across game lifecycle states.
  states: {
    idle: {
      entry: "resetMatch",
      on: {
        START: { target: "playing" },
        OPEN_MENU: { target: "menu" },
        OPEN_ADS: { target: "ads" },
        OPEN_MARKET: { target: "market" },
      },
    },
    menu: {
      on: { CLOSE_MENU: { target: "idle" } },
    },
    ads: {
      on: { CLOSE_ADS: { target: "idle" } },
    },
    market: {
      on: { CLOSE_MARKET: { target: "idle" } },
    },
    paused: {
      on: { RESUME: { target: "playing" } },
    },
    // ── Round states & events live inside `playing` ──
    playing: {
      initial: "dealing",
      on: {
        PAUSE: { target: "paused" },
        END_GAME: { target: "gameOver" },
      },
      states: {
        dealing: {
          entry: "dealAlternating",
          always: { target: "playerTurn" },
        },
        playerTurn: {
          on: {
            HIT: { target: "playerDraw" },
            STAND: { target: "enemyTurn" },
            SURRENDER: { target: "enemyWin" },
          },
        },
        playerDraw: {
          entry: "drawToNext",
          always: [
            { guard: "playerBust", target: "resolving" },
            { target: "playerTurn" },
          ],
        },
        enemyTurn: {
          entry: "setEnemyAsNext",
          always: [
            { guard: "enemyShouldHit", target: "enemyDraw" },
            { target: "resolving" },
          ],
        },
        enemyDraw: {
          entry: ["setEnemyAsNext", "drawToNext"],
          always: { target: "enemyTurn" },
        },
        resolving: {
          entry: "decideWinner",
          always: { target: "roundOver" },
        },
        enemyWin: {
          entry: "surrender",
          always: { target: "roundOver" },
        },
        roundOver: {
          always: [
            { guard: "matchOver", target: "#game-21.gameOver" },
          ],
          on: {
            NEXT_ROUND: { target: "dealing" },
            SHUFFLE: { actions: "shuffleDeck" },
          },
        },
      },
    },
    gameOver: {
      on: {
        START: { target: "playing", actions: "resetMatch" },
      },
    },
  },
});

export type GameMachine = typeof gameMachine;
