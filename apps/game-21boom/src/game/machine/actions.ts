import { buildDeck, shuffle, type Card } from "./cards";
import { decideRoundWinner } from "./guards";
import type { Events, GameContext, Holder, Winner } from "./types";

type Reducer = (args: { context: GameContext }) => Partial<GameContext>;

export const dealAlternating: Reducer = () => {
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
    nextHolder: "player",
    winner: null,
    holeRevealed: false,
    displayedPlayerHand: [],
    displayedEnemyHand: [],
  };
};

export const revealHole: Reducer = () => ({ holeRevealed: true });

export const pushDisplayed = ({
  context,
  event,
}: {
  context: GameContext;
  event: Events;
}): Partial<GameContext> => {
  if (event.type !== "CARD_RENDERED") return {};
  if (event.holder === "player") {
    return { displayedPlayerHand: [...context.displayedPlayerHand, event.card] };
  }
  return { displayedEnemyHand: [...context.displayedEnemyHand, event.card] };
};

export const drawToNext: Reducer = ({ context }) => {
  const deck = [...context.deck];
  const card = deck.shift()!;
  const playerHand =
    context.nextHolder === "player" ? [...context.playerHand, card] : context.playerHand;
  const enemyHand =
    context.nextHolder === "enemy" ? [...context.enemyHand, card] : context.enemyHand;
  const nextHolder: Holder = context.nextHolder === "player" ? "enemy" : "player";
  return { deck, playerHand, enemyHand, nextHolder };
};

export const setEnemyAsNext: Reducer = () => ({ nextHolder: "enemy" });
export const setPlayerAsNext: Reducer = () => ({ nextHolder: "player" });

export const decideWinner: Reducer = ({ context }) => {
  const winner = decideRoundWinner(context.playerHand, context.enemyHand);
  return {
    winner,
    roundsPlayed: context.roundsPlayed + 1,
    playerWins: winner === "player" ? context.playerWins + 1 : context.playerWins,
    enemyWins: winner === "enemy" ? context.enemyWins + 1 : context.enemyWins,
    roundResults: [...context.roundResults, winner],
  };
};

export const surrender: Reducer = ({ context }) => ({
  winner: "enemy",
  roundsPlayed: context.roundsPlayed + 1,
  enemyWins: context.enemyWins + 1,
  roundResults: [...context.roundResults, "enemy" as Winner],
});

export const shuffleDeck: Reducer = ({ context }) => ({
  deck: shuffle(context.deck),
});

export const resetMatch: Reducer = () => ({
  roundsPlayed: 0,
  playerWins: 0,
  enemyWins: 0,
  roundResults: [],
});
