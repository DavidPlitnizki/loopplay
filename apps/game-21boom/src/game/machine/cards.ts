export const BLACKJACK_TARGET = 21;

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export interface Card {
  rank: number;
  suit: Suit;
}

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

export function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) deck.push({ suit, rank });
  }
  return shuffle(deck);
}

export function shuffle(deck: Card[]): Card[] {
  const out = [...deck];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
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
  while (total > BLACKJACK_TARGET && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}
