import Link from "next/link";
import {
  IoGameControllerOutline,
  IoTrophyOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoFlameOutline,
  IoTimeOutline,
  IoRibbonOutline,
  IoStarOutline,
  IoChevronForwardOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { BsCoin } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PlayDemoButton } from "@/components/dashboard/PlayDemoButton";
import { games } from "@/lib/games";


/* ─── Data ─────────────────────────────────────────────── */

const stats = [
  {
    label: "Games Played",
    value: "142",
    sub: "+8 this week",
    Icon: IoGameControllerOutline,
    glow: "shadow-violet-500/20",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    subColor: "text-violet-400",
  },
  {
    label: "Win Rate",
    value: "68%",
    sub: "↑ 4% vs last week",
    Icon: IoTrophyOutline,
    glow: "shadow-cyan-500/20",
    border: "border-cyan-500/20",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    subColor: "text-cyan-400",
  },
  {
    label: "Coins Balance",
    value: "2,450",
    sub: "+120 today",
    Icon: BsCoin,
    glow: "shadow-amber-500/20",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    subColor: "text-amber-400",
  },
  {
    label: "Global Rank",
    value: "#847",
    sub: "Top 2% of players",
    Icon: IoRibbonOutline,
    glow: "shadow-pink-500/20",
    border: "border-pink-500/20",
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
    subColor: "text-pink-400",
  },
];


const topPlayers = [
  { rank: 1, name: "VortexX", score: "48,200", avatar: "VX", medal: "🥇" },
  { rank: 2, name: "NeonStrike", score: "45,100", avatar: "NS", medal: "🥈" },
  { rank: 3, name: "BlastCore", score: "43,800", avatar: "BC", medal: "🥉" },
  { rank: 4, name: "CryptoFrag", score: "41,200", avatar: "CF", medal: null },
  { rank: 5, name: "PixelKing", score: "39,900", avatar: "PK", medal: null },
];

const recentActivity = [
  { Icon: IoTrophyOutline, text: "Won a match in 21 Boom", time: "2h ago", color: "text-violet-400" },
  { Icon: BsCoin, text: "Earned 120 coins", time: "2h ago", color: "text-amber-400" },
  { Icon: IoFlameOutline, text: "Win streak × 4", time: "Yesterday", color: "text-orange-400" },
  { Icon: IoStarOutline, text: "Reached Top 1000 rank", time: "2 days ago", color: "text-cyan-400" },
];

const winRates = [
  { name: "21 Boom", rate: 68, color: "bg-violet-500" },
  { name: "Speed Quiz", rate: 0, color: "bg-cyan-500" },
  { name: "Word Sniper", rate: 0, color: "bg-pink-500" },
];

/* ─── Page (Server Component) ───────────────────────────── */

export default function DashboardPage() {
  const featured = games[0];
  const FeaturedIcon = featured.Icon;
  return (
    <div className="min-h-screen bg-[#07070f] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4
          border-b border-white/8 bg-[#07070f]/80 backdrop-blur-md">
          {/* Sidebar toggle injected by Sidebar client component via DOM id */}
          <div id="sidebar-toggle-slot" />

          <div className="flex-1 max-w-xs">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full rounded-xl border border-white/8 bg-white/5 pl-9 pr-4 py-2 text-sm
                  text-white/70 placeholder:text-white/25 focus:outline-none focus:border-violet-500/50
                  focus:bg-white/8 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border
              border-white/8 bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
              <IoNotificationsOutline className="text-lg" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
            </button>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
              PL
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="p-6 max-w-7xl mx-auto space-y-8">

            {/* Welcome */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, <span className="text-violet-400">Player</span> 👋
                </h1>
                <p className="mt-1 text-sm text-white/40">
                  Ready for another session? Your streak is on fire.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2">
                  <IoFlameOutline className="text-orange-400 text-lg" />
                  <span className="text-sm font-semibold text-orange-300">4-day streak</span>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500
                  transition-colors px-5 py-2 text-sm font-semibold text-white">
                  <IoGameControllerOutline />
                  Quick Play
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl border ${s.border} bg-[#0d0d1c] p-5 shadow-lg ${s.glow} hover:-translate-y-0.5 transition-transform`}
                >
                  <div className="mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
                      <s.Icon className={`text-xl ${s.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-white/40">{s.label}</p>
                  <p className={`mt-2 text-xs font-medium ${s.subColor}`}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* Left: games */}
              <div className="xl:col-span-2 space-y-5">

                {/* Featured */}
                <div className="relative overflow-hidden rounded-2xl border border-violet-500/20
                  bg-gradient-to-br from-violet-600/20 via-[#0d0d1c] to-[#0d0d1c] p-6">
                  <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64
                    rounded-full bg-violet-600/20 blur-[80px]" />

                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl
                      bg-violet-500/20 border border-violet-500/30">
                      <FeaturedIcon className="text-4xl text-violet-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                          Featured Game
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-green-500/20 border
                          border-green-500/30 px-2 py-0.5 text-xs text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                          Live · 1,247 playing
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">21 Boom</h2>
                      <p className="text-sm text-white/50 mt-1">
                        Count up to 21 without saying the boom number. Fast, fun, and social — play with up to 8 friends.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <PlayDemoButton />
                      <Link
                        href={`/dashboard/games/${featured.id}`}
                        className="flex items-center gap-2 rounded-xl bg-violet-600
                          hover:bg-violet-500 transition-all px-6 py-3 text-sm font-semibold text-white
                          shadow-lg shadow-violet-900/50"
                      >
                        Play Now <HiArrowRight />
                      </Link>
                    </div>
                  </div>

                  <div className="relative mt-5 flex gap-6 border-t border-white/8 pt-4">
                    {[
                      { label: "Avg session", value: "8 min" },
                      { label: "Players", value: "2–8" },
                      { label: "Your best", value: "Round 19" },
                      { label: "Rating", value: "4.9 ★" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-white/30">{item.label}</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All games */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">All Games</h3>
                    <Link href="/dashboard/games" className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                      Browse all <IoChevronForwardOutline />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {games.map((g) => {
                      const GameIcon = g.Icon;
                      return (
                        <Link
                          key={g.id}
                          href={`/dashboard/games/${g.id}`}
                          className={`group relative overflow-hidden rounded-2xl border border-white/8
                            ${g.borderHover} bg-[#0d0d1c] p-5 transition-all hover:-translate-y-0.5`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${g.gradientFrom} to-transparent opacity-50`} />
                          <div className="relative">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                                <GameIcon className="text-2xl text-white/80" />
                              </div>
                              <div className="flex items-center gap-2">
                                {g.live && (
                                  <span className="flex items-center gap-1 text-xs text-green-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Live
                                  </span>
                                )}
                                <span className={`text-xs font-medium rounded-full border px-2 py-0.5 ${g.badgeColor}`}>
                                  {g.badge}
                                </span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-white">{g.name}</h4>
                            <p className="text-xs text-violet-400 mt-0.5 mb-2">{g.genre}</p>
                            <p className="text-xs text-white/40 leading-relaxed">{g.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-white/25">{g.players}</span>
                              {g.live ? (
                                <span className="flex items-center gap-1 text-xs font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                                  Play now <IoArrowForwardOutline />
                                </span>
                              ) : (
                                <span className="text-xs text-white/25">Coming soon</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">

                {/* Leaderboard */}
                <div className="rounded-2xl border border-white/8 bg-[#0d0d1c] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Top Players</h3>
                    <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                      View all <IoChevronForwardOutline />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {topPlayers.map((p) => (
                      <div key={p.rank} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/4 transition-colors">
                        <span className="w-5 text-center text-sm">
                          {p.medal ?? <span className="text-white/30 text-xs font-bold">{p.rank}</span>}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-xs font-bold text-white">
                          {p.avatar}
                        </div>
                        <span className="flex-1 text-sm text-white/80 font-medium">{p.name}</span>
                        <span className="text-sm font-semibold text-white/60">{p.score}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/8">
                    <div className="flex items-center gap-3 rounded-xl p-2.5 bg-violet-500/10 border border-violet-500/20">
                      <span className="w-5 text-center text-xs font-bold text-violet-400">#</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg
                        bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
                        PL
                      </div>
                      <span className="flex-1 text-sm text-violet-300 font-medium">You</span>
                      <span className="text-sm font-semibold text-violet-400">#847</span>
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="rounded-2xl border border-white/8 bg-[#0d0d1c] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Recent Activity</h3>
                    <IoTimeOutline className="text-white/30 text-lg" />
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center
                          rounded-lg bg-white/5 ${item.color}`}>
                          <item.Icon className="text-sm" />
                        </div>
                        <div>
                          <p className="text-sm text-white/70">{item.text}</p>
                          <p className="text-xs text-white/25 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Win rate */}
                <div className="rounded-2xl border border-white/8 bg-[#0d0d1c] p-5">
                  <h3 className="text-base font-semibold text-white mb-4">Win Rate by Game</h3>
                  <div className="space-y-3">
                    {winRates.map((g) => (
                      <div key={g.name}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/50">{g.name}</span>
                          <span className="text-white/60 font-medium">
                            {g.rate > 0 ? `${g.rate}%` : "No data"}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${g.color}`}
                            style={{ width: `${g.rate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
