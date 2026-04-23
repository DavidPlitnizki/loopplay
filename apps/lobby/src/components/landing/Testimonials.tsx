import { IoStarSharp } from "react-icons/io5";
import { AnimateIn } from "./AnimateIn";

const reviews = [
  {
    initials: "MK",
    name: "Marco K.",
    handle: "@mknight_gg",
    text: "Been playing 21 Boom with my friend group every Friday night. It's become our go-to warm-up game. The real-time leaderboard is addictive.",
    stars: 5,
  },
  {
    initials: "SL",
    name: "Sara L.",
    handle: "@saraloop",
    text: "I love that there's nothing to install. I pulled it up on my phone during lunch and was in a match in 10 seconds. Genuinely impressive.",
    stars: 5,
  },
  {
    initials: "DJ",
    name: "Dev J.",
    handle: "@devj_plays",
    text: "The UI is clean. Not cluttered like most browser game sites. And the streak system keeps you coming back for 'just one more'.",
    stars: 5,
  },
  {
    initials: "RA",
    name: "Riley A.",
    handle: "@rileya_gamer",
    text: "Private rooms are perfect for team nights. We set up a 6-person bracket and it handled it flawlessly. Waiting for more games!",
    stars: 4,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimateIn variant="fadeUp" className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">Players Love It</p>
          <h2 className="text-4xl font-extrabold text-white">
            What the community{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              is saying
            </span>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <AnimateIn key={r.name} variant="fadeUp" delay={i * 80}>
              <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-5 flex flex-col gap-4 h-full">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <IoStarSharp key={j} className="text-yellow-400 text-sm" />
                  ))}
                  {Array.from({ length: 5 - r.stars }).map((_, j) => (
                    <IoStarSharp key={j} className="text-white/10 text-sm" />
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="h-8 w-8 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-300">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-white/30">{r.handle}</p>
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
