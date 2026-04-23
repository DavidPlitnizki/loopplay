import { IoGameControllerOutline } from "react-icons/io5";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";

const links = {
  Product: ["Games", "Leaderboard", "Seasons", "Roadmap"],
  Company: ["About", "Blog", "Press", "Careers"],
  Support: ["Help Center", "Community", "Contact", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080810] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <IoGameControllerOutline className="text-xl text-violet-400" />
              <span className="text-base font-bold text-white">
                Loop<span className="text-violet-400">Play</span>
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-[180px]">
              Browser gaming built for competition and fun.
            </p>
            <div className="flex gap-3 mt-5">
              {[FaXTwitter, FaDiscord, FaGithub].map((Icon, i) => (
                <button
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Icon className="text-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* nav columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/20">© 2026 LoopPlay. All rights reserved.</p>
          <p className="text-xs text-white/20">Made with ♥ for players everywhere</p>
        </div>
      </div>
    </footer>
  );
}
