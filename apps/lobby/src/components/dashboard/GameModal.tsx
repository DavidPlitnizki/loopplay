"use client";

import { useEffect, useCallback } from "react";
import { IoCloseOutline, IoExpandOutline } from "react-icons/io5";
import { GiCardRandom } from "react-icons/gi";

const GAME_URL = process.env.NEXT_PUBLIC_GAME_21BOOM_URL ?? "http://localhost:3001";

interface GameModalProps {
  onClose: () => void;
}

export function GameModal({ onClose }: GameModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#07070f]/95 backdrop-blur-md">
      {/* Topbar */}
      <div className="flex items-center justify-between gap-4 px-6 py-3
        border-b border-white/8 bg-[#0b0b18]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30">
            <GiCardRandom className="text-violet-400 text-base" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">21 Boom</p>
            <p className="text-xs text-white/35 mt-0.5">Party · Multiplayer</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-green-500/15 border border-green-500/25
            px-2.5 py-1 text-xs text-green-400 ml-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={GAME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5
              hover:bg-white/10 transition-colors px-3 py-1.5 text-xs text-white/60 hover:text-white"
          >
            <IoExpandOutline className="text-base" />
            Full screen
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10
              bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            aria-label="Close game"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        </div>
      </div>

      {/* Iframe */}
      <div className="flex-1 relative">
        <iframe
          src={GAME_URL}
          title="21 Boom"
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
