import { GiCardRandom, GiPodiumWinner, GiTargeted } from "react-icons/gi";
import { MdOutlineSportsEsports } from "react-icons/md";
import type { IconType } from "react-icons";

export interface Game {
  id: string;
  name: string;
  genre: string;
  description: string;
  longDescription: string;
  players: string;
  badge: "Popular" | "Coming Soon" | "New";
  badgeColor: string;
  gradientFrom: string;
  borderHover: string;
  live: boolean;
  devPort: number;
  iframeUrl: string | null;
  activePlayers: number;
  avgSession: string;
  rating: string;
  Icon: IconType;
}

export const games: Game[] = [
  {
    id: "21boom",
    name: "21 Boom",
    genre: "Party · Multiplayer",
    description: "Count up to 21 without saying the boom word. Last one standing wins.",
    longDescription:
      "Players take turns counting numbers. Say the wrong number or hesitate too long — you're out! The last player standing wins the round. Simple rules, wild moments. Perfect for 2–8 players.",
    players: "2–8 players",
    badge: "Popular",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    gradientFrom: "from-violet-600/25",
    borderHover: "hover:border-violet-500/40",
    live: true,
    devPort: 3001,
    iframeUrl: process.env.NEXT_PUBLIC_GAME_21BOOM_URL ?? "http://localhost:3001",
    activePlayers: 1247,
    avgSession: "8 min",
    rating: "4.9",
    Icon: GiCardRandom,
  },
  {
    id: "speed-quiz",
    name: "Speed Quiz",
    genre: "Trivia · Competitive",
    description: "Answer trivia questions faster than opponents to score points.",
    longDescription:
      "Race against other players to answer trivia questions first. Topics span science, history, pop culture, and sports. Fastest correct answer scores the most points — reflexes matter as much as knowledge.",
    players: "2–16 players",
    badge: "Coming Soon",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    gradientFrom: "from-cyan-600/25",
    borderHover: "hover:border-cyan-500/40",
    live: false,
    devPort: 3002,
    iframeUrl: process.env.NEXT_PUBLIC_GAME_SPEED_QUIZ_URL ?? "http://localhost:3002",
    activePlayers: 0,
    avgSession: "12 min",
    rating: "—",
    Icon: GiPodiumWinner,
  },
  {
    id: "word-sniper",
    name: "Word Sniper",
    genre: "Word · Fast-paced",
    description: "Find hidden words before the clock runs out and eliminate rivals.",
    longDescription:
      "A scrambled grid of letters hides dozens of words. Find them before your opponents do. Longer words score more points. Eliminate rivals by stealing their found words — if you're quick enough.",
    players: "2–10 players",
    badge: "Coming Soon",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    gradientFrom: "from-pink-600/25",
    borderHover: "hover:border-pink-500/40",
    live: false,
    devPort: 3003,
    iframeUrl: process.env.NEXT_PUBLIC_GAME_WORD_SNIPER_URL ?? "http://localhost:3003",
    activePlayers: 0,
    avgSession: "10 min",
    rating: "—",
    Icon: GiTargeted,
  },
  {
    id: "chain-reaction",
    name: "Chain Reaction",
    genre: "Strategy · Turn-based",
    description: "Place atoms strategically and trigger chain reactions to take over the board.",
    longDescription:
      "On your turn, place an atom on any cell you own. When a cell overloads it explodes — capturing neighbouring cells. A chain reaction can flip the entire board in one move. The player who owns every cell wins.",
    players: "2–4 players",
    badge: "Coming Soon",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    gradientFrom: "from-orange-600/25",
    borderHover: "hover:border-orange-500/40",
    live: false,
    devPort: 3004,
    iframeUrl: process.env.NEXT_PUBLIC_GAME_CHAIN_REACTION_URL ?? "http://localhost:3004",
    activePlayers: 0,
    avgSession: "15 min",
    rating: "—",
    Icon: MdOutlineSportsEsports,
  },
];

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}
