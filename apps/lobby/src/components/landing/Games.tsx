import { HiArrowRight } from "react-icons/hi";
import { IoFlashOutline, IoPeopleOutline, IoTrophyOutline, IoStarOutline } from "react-icons/io5";
import { MdOutlineSportsEsports } from "react-icons/md";
import { GiCardRandom, GiPodiumWinner, GiTargeted } from "react-icons/gi";
import { AnimateIn } from "./AnimateIn";

const games = [
  {
    icon: GiCardRandom,
    name: "21 Boom",
    genre: "Party · Multiplayer",
    description: "Count up to 21 without saying the boom word. Last one standing wins.",
    players: "2–8 players",
    badge: "Popular",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    accentColor: "from-violet-600/20 to-violet-900/0",
  },
  {
    icon: GiPodiumWinner,
    name: "Speed Quiz",
    genre: "Trivia · Competitive",
    description: "Answer trivia questions faster than your opponents to score points.",
    players: "2–16 players",
    badge: "Coming Soon",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    accentColor: "from-cyan-600/20 to-cyan-900/0",
  },
  {
    icon: GiTargeted,
    name: "Word Sniper",
    genre: "Word · Fast-paced",
    description: "Find hidden words before the clock runs out and eliminate rivals.",
    players: "2–10 players",
    badge: "Coming Soon",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    accentColor: "from-pink-600/20 to-pink-900/0",
  },
  {
    icon: MdOutlineSportsEsports,
    name: "Chain Reaction",
    genre: "Strategy · Turn-based",
    description: "Place atoms strategically and trigger chain reactions to take over the board.",
    players: "2–4 players",
    badge: "Coming Soon",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    accentColor: "from-orange-600/20 to-orange-900/0",
  },
];

const tags = [
  { icon: IoFlashOutline, label: "Instant Play" },
  { icon: IoPeopleOutline, label: "Multiplayer" },
  { icon: IoTrophyOutline, label: "Ranked Matches" },
  { icon: IoStarOutline, label: "Weekly Events" },
];

export function Games() {
  return (
    <section id="games" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <AnimateIn variant="fadeRight">
            <div>
              <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Game Library</p>
              <h2 className="text-4xl font-extrabold text-white">
                Games built for{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  competition
                </span>
              </h2>
              <p className="mt-3 text-white/50 max-w-md">
                Every game is designed for quick sessions and social moments. No install, just play.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn variant="fadeLeft" delay={100}>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  <t.icon className="text-violet-400" />
                  {t.label}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((g, i) => (
            <AnimateIn key={g.name} variant="fadeUp" delay={i * 80}>
              <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0d0d1a] overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 h-full">
                <div className={`absolute inset-0 bg-gradient-to-b ${g.accentColor} opacity-60`} />
                <div className="relative z-10 p-6 flex flex-col flex-1">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                      <g.icon className="text-2xl text-white/80" />
                    </div>
                    <span className={`text-xs font-medium rounded-full border px-2.5 py-1 ${g.badgeColor}`}>
                      {g.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{g.name}</h3>
                  <p className="text-xs text-violet-400 mt-0.5 mb-3">{g.genre}</p>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{g.description}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-white/30">{g.players}</span>
                    <button className="group/btn flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                      Play now
                      <HiArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
