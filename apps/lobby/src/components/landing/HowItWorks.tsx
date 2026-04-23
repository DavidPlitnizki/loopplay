import { IoPersonAddOutline, IoGameControllerOutline, IoTrophyOutline } from "react-icons/io5";
import { AnimateIn } from "./AnimateIn";

const steps = [
  {
    number: "01",
    icon: IoPersonAddOutline,
    title: "Create your account",
    description:
      "Sign up in under 30 seconds. No credit card, no email verification hassle. Just a username and you're in.",
  },
  {
    number: "02",
    icon: IoGameControllerOutline,
    title: "Pick a game & join",
    description:
      "Browse the lobby, click a game, and join a public room or create a private one with your own invite code.",
  },
  {
    number: "03",
    icon: IoTrophyOutline,
    title: "Play & climb the ranks",
    description:
      "Every win earns points, builds your streak, and moves you up the global leaderboard. Track your progress in real time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 relative">
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimateIn variant="fadeUp" className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">How It Works</p>
          <h2 className="text-4xl font-extrabold text-white">
            Up and running in{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              3 steps
            </span>
          </h2>
        </AnimateIn>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0" />

          {steps.map((s, i) => (
            <AnimateIn key={s.number} variant="fadeUp" delay={i * 120}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="h-24 w-24 rounded-2xl border border-violet-500/30 bg-violet-500/10 flex items-center justify-center">
                    <s.icon className="text-3xl text-violet-400" />
                  </div>
                  <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                    {s.number.replace("0", "")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs">{s.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
