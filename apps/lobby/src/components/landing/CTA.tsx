import { HiArrowRight } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AnimateIn } from "./AnimateIn";

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <AnimateIn variant="fadeUp">
          <div className="relative rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-900/40 to-[#0d0d1a] overflow-hidden p-12 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[600px] rounded-full bg-violet-600/20 blur-[80px]" />
            </div>

            <div className="relative z-10">
              <AnimateIn variant="fadeDown" delay={100}>
                <IoGameControllerOutline className="text-5xl text-violet-400 mx-auto mb-6" />
              </AnimateIn>

              <AnimateIn variant="fadeUp" delay={180}>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                  Ready to play?
                </h2>
              </AnimateIn>

              <AnimateIn variant="fadeUp" delay={260}>
                <p className="mt-4 text-white/50 max-w-lg mx-auto text-lg">
                  Join thousands of players already competing on LoopPlay. Free forever, no credit card needed.
                </p>
              </AnimateIn>

              <AnimateIn variant="fadeUp" delay={340}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="group flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all px-10 py-4 text-base font-semibold text-white shadow-lg shadow-violet-900/60">
                    Get Started — It&apos;s Free
                    <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="text-sm text-white/40 hover:text-white/60 transition-colors">
                    No account? Play as guest →
                  </button>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade" delay={480}>
                <p className="mt-8 text-xs text-white/20">
                  50,000+ players · 12 games · Zero installs required
                </p>
              </AnimateIn>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
