import { notFound } from "next/navigation";
import Link from "next/link";
import {
  IoArrowBackOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoStarOutline,
  IoFlameOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GameIframe } from "@/components/dashboard/GameIframe";
import { games, getGame } from "@/lib/games";

export function generateStaticParams() {
  return games.map((g) => ({ gameid: g.id }));
}

interface Props {
  params: Promise<{ gameid: string }>;
}

export default async function GamePage({ params }: Props) {
  const { gameid } = await params;
  const game = getGame(gameid);

  if (!game) notFound();

  const related = games.filter((g) => g.id !== game.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#07070f] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4
          border-b border-white/8 bg-[#07070f]/80 backdrop-blur-md">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <IoArrowBackOutline />
            Dashboard
          </Link>
          <IoChevronForwardOutline className="text-white/20 text-xs" />
          <span className="text-sm text-white/80">{game.name}</span>
        </header>

        <main className="flex-1">
          <div className="p-6 max-w-7xl mx-auto space-y-6">

            {/* Game header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl
                bg-white/5 border border-white/10">
                <game.Icon className="text-3xl text-white/80" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-white">{game.name}</h1>
                  <span className={`text-xs font-medium rounded-full border px-2.5 py-0.5 ${game.badgeColor}`}>
                    {game.badge}
                  </span>
                  {game.live && (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/15 border
                      border-green-500/25 px-2.5 py-0.5 text-xs text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live · {game.activePlayers.toLocaleString()} playing
                    </span>
                  )}
                </div>
                <p className="text-sm text-violet-400 mb-2">{game.genre}</p>
                <p className="text-sm text-white/50 max-w-xl leading-relaxed">{game.longDescription}</p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-3 shrink-0">
                {[
                  { Icon: IoPeopleOutline, label: "Players", value: game.players },
                  { Icon: IoTimeOutline, label: "Avg session", value: game.avgSession },
                  { Icon: IoStarOutline, label: "Rating", value: game.rating === "—" ? "—" : `${game.rating} ★` },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 rounded-xl border border-white/8 bg-[#0d0d1c] px-3 py-2">
                    <s.Icon className="text-violet-400 text-base shrink-0" />
                    <div>
                      <p className="text-xs text-white/30">{s.label}</p>
                      <p className="text-sm font-semibold text-white">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game area */}
            {game.live && game.iframeUrl ? (
              <GameIframe src={game.iframeUrl} title={game.name} />
            ) : (
              <div className={`relative overflow-hidden rounded-2xl border border-white/8
                bg-gradient-to-br ${game.gradientFrom} to-[#0d0d1c]`}>
                <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <game.Icon className="text-4xl text-white/30" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Coming Soon</h2>
                  <p className="text-sm text-white/40 max-w-sm">
                    {game.name} is currently in development. Follow us to be the first to know when it launches.
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <IoFlameOutline className="text-orange-400" />
                    <span className="text-sm text-white/50">Join the waitlist for early access</span>
                  </div>
                  <button className="mt-4 rounded-xl border border-violet-500/30 bg-violet-500/10
                    hover:bg-violet-500/20 transition-colors px-6 py-2.5 text-sm font-semibold text-violet-300">
                    Notify Me
                  </button>
                </div>
              </div>
            )}

            {/* Other games */}
            <div>
              <h2 className="text-base font-semibold text-white mb-4">More Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((g) => (
                  <Link
                    key={g.id}
                    href={`/dashboard/games/${g.id}`}
                    className={`group relative overflow-hidden rounded-2xl border border-white/8
                      ${g.borderHover} bg-[#0d0d1c] p-5 transition-all hover:-translate-y-0.5`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${g.gradientFrom} to-transparent opacity-40`} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                          <g.Icon className="text-xl text-white/80" />
                        </div>
                        <span className={`text-xs font-medium rounded-full border px-2 py-0.5 ${g.badgeColor}`}>
                          {g.badge}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white text-sm">{g.name}</h3>
                      <p className="text-xs text-violet-400 mt-0.5 mb-2">{g.genre}</p>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{g.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
