import { IoTrophyOutline, IoFlameOutline, IoArrowUpOutline } from "react-icons/io5";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { AnimateIn } from "./AnimateIn";

const players = [
  { rank: 1, name: "ShadowByte", score: 48_210, wins: 312, streak: 14, change: "up" },
  { rank: 2, name: "NeonRush", score: 44_780, wins: 289, streak: 9, change: "up" },
  { rank: 3, name: "QuantumFox", score: 41_330, wins: 264, streak: 6, change: "same" },
  { rank: 4, name: "VoidKnight", score: 38_900, wins: 241, streak: 3, change: "down" },
  { rank: 5, name: "PulseZero", score: 35_650, wins: 218, streak: 5, change: "up" },
  { rank: 6, name: "NightCipher", score: 32_100, wins: 195, streak: 2, change: "down" },
  { rank: 7, name: "ArcaneLoop", score: 29_440, wins: 173, streak: 7, change: "up" },
];

const rankColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-300",
  3: "text-orange-400",
};

export function Leaderboard() {
  return (
    <section id="leaderboard" className="py-24 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* copy */}
        <AnimateIn variant="fadeRight">
          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Leaderboard</p>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Your name could be{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                at the top
              </span>
            </h2>
            <p className="mt-5 text-white/50 leading-relaxed">
              Every game contributes to your global score. Consistent wins, long streaks, and fast reaction
              times push you up the board. Rankings update live — so every match matters.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: IoTrophyOutline, label: "Weekly Resets", sub: "Fresh competition every week" },
                { icon: IoFlameOutline, label: "Streak Bonuses", sub: "Win more, score more" },
                { icon: HiMiniArrowTrendingUp, label: "ELO Rating", sub: "Skill-based matchmaking" },
                { icon: IoArrowUpOutline, label: "Seasonal Ranks", sub: "Bronze to Grandmaster" },
              ].map((item, i) => (
                <AnimateIn key={item.label} variant="fadeUp" delay={100 + i * 60}>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-full">
                    <item.icon className="text-xl text-violet-400 mb-2" />
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* table */}
        <AnimateIn variant="fadeLeft" delay={150}>
          <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-sm font-semibold text-white">Global Ranking</span>
              <span className="text-xs text-white/30">Updated live</span>
            </div>

            <div className="divide-y divide-white/5">
              {players.map((p, i) => (
                <AnimateIn key={p.name} variant="fadeLeft" delay={200 + i * 50}>
                  <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                    <span className={`w-6 text-center text-sm font-bold ${rankColors[p.rank] ?? "text-white/30"}`}>
                      {p.rank}
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white uppercase flex-shrink-0">
                      {p.name.slice(0, 2)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{p.name}</p>
                      <p className="text-xs text-white/30">{p.wins} wins</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{p.score.toLocaleString()}</p>
                      {p.streak > 0 && (
                        <p className="text-xs text-orange-400 flex items-center justify-end gap-0.5">
                          <IoFlameOutline />
                          {p.streak}
                        </p>
                      )}
                    </div>

                    <div className="w-4">
                      {p.change === "up" && <IoArrowUpOutline className="text-green-400 text-sm" />}
                      {p.change === "down" && <IoArrowUpOutline className="text-red-400 text-sm rotate-180" />}
                      {p.change === "same" && <span className="block h-px w-3 bg-white/20 mt-1" />}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-white/10">
              <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                View full leaderboard →
              </button>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
