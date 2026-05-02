import { BLACKJACK_TARGET, handTotal, type Card } from "./cards";
import type { GameContext, Winner } from "./types";

const ENEMY_HIT_THRESHOLD = 17;
const MATCH_LENGTH = 5;

type GuardFn = (args: { context: GameContext }) => boolean;

export const playerBust: GuardFn = ({ context }) =>
  handTotal(context.playerHand) > BLACKJACK_TARGET;

export const naturalBlackjack: GuardFn = ({ context }) =>
  context.playerHand.length === 2 && handTotal(context.playerHand) === BLACKJACK_TARGET;

export const enemyShouldHit: GuardFn = ({ context }) =>
  handTotal(context.enemyHand) < ENEMY_HIT_THRESHOLD;

export const matchOver: GuardFn = ({ context }) => context.roundsPlayed >= MATCH_LENGTH;

// Pure helper used by the decideWinner action.
export function decideRoundWinner(playerHand: Card[], enemyHand: Card[]): Winner {
  const p = handTotal(playerHand);
  const e = handTotal(enemyHand);
  const pBust = p > BLACKJACK_TARGET;
  const eBust = e > BLACKJACK_TARGET;
  if (pBust && eBust) return "tie";
  if (pBust) return "enemy";
  if (eBust) return "player";
  if (p > e) return "player";
  if (e > p) return "enemy";
  return "tie";
}
