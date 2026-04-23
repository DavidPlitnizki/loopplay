import Link from "next/link";
import { IoChevronForwardOutline } from "react-icons/io5";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { games } from "@/lib/games";

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[#07070f] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <header className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4
          border-b border-white/8 bg-[#07070f]/80 backdrop-blur-md">
          <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">
            Dashboard
          </Link>
          <IoChevronForwardOutline className="text-white/20 text-xs" />
          <span className="text-sm text-white/80">Games</span>
        </header>

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-white mb-6">All Games</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((g) => {
              const Icon = g.Icon;
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
                        <Icon className="text-2xl text-white/80" />
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
                    <h3 className="font-semibold text-white">{g.name}</h3>
                    <p className="text-xs text-violet-400 mt-0.5 mb-2">{g.genre}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{g.description}</p>
                    <p className="mt-3 text-xs text-white/25">{g.players}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
