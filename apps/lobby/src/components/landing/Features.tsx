import {
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoTrophyOutline,
  IoPeopleOutline,
  IoPhonePortraitOutline,
  IoAnalyticsOutline,
} from "react-icons/io5";
import { AnimateIn } from "./AnimateIn";

const features = [
  {
    icon: IoFlashOutline,
    title: "Instant Launch",
    description: "No downloads, no installs. Open a browser tab and you're in a game within seconds.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: IoPeopleOutline,
    title: "Private Rooms",
    description: "Create a private lobby and share a code with friends for a closed-door session.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: IoTrophyOutline,
    title: "Live Leaderboards",
    description: "Real-time rankings updated after every match. Climb the board or defend your spot.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Fair Play Engine",
    description: "Server-side validation ensures no cheating. Every win is earned, every score is real.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: IoPhonePortraitOutline,
    title: "Mobile Ready",
    description: "Fully responsive — play on phone, tablet, or desktop without missing a beat.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: IoAnalyticsOutline,
    title: "Player Stats",
    description: "Track wins, streaks, accuracy, and personal bests across every game you play.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[800px] rounded-full bg-violet-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimateIn variant="fadeUp" className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Platform Features</p>
          <h2 className="text-4xl font-extrabold text-white">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              play better
            </span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            LoopPlay is built from the ground up for competitive casual gaming — fast, fair, and fun.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <AnimateIn key={f.title} variant="fadeUp" delay={i * 70}>
              <div className="group rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 hover:border-white/20 transition-all hover:-translate-y-0.5 h-full">
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${f.bg}`}>
                  <f.icon className={`text-xl ${f.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
