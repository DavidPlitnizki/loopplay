import { HiArrowRight } from "react-icons/hi";
import { IoPlayCircleOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { AnimateIn } from "./AnimateIn";

const stats = [
  { value: "50K+", label: "Active Players" },
  { value: "12", label: "Live Games" },
  { value: "2M+", label: "Games Played" },
  { value: "#1", label: "Browser Gaming" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <AnimateIn variant="fadeDown" delay={0}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            <BsStars className="text-violet-400" />
            Now live — compete in real time with players worldwide
          </div>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={100}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Play. Compete.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Dominate.
            </span>
          </h1>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={200}>
          <p className="mt-6 max-w-2xl text-lg text-white/50 leading-relaxed">
            LoopPlay is a browser-based gaming platform where every session counts.
            Jump into fast-paced party games, climb the leaderboard, and challenge friends — no downloads needed.
          </p>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={320}>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button className="group flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-900/50">
              Start Playing Free
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all px-8 py-4 text-base font-medium text-white/80">
              <IoPlayCircleOutline className="text-xl text-violet-400" />
              Watch Trailer
            </button>
          </div>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={450} className="w-full">
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden w-full max-w-2xl border border-white/10 mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0d0d1a] flex flex-col items-center py-6 px-4">
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <span className="mt-1 text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
