"use client";

import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GameModal } from "./GameModal";

export function PlayDemoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10
          hover:bg-violet-500/20 transition-colors px-5 py-3 text-sm font-semibold text-violet-300"
      >
        <IoPlayCircleOutline className="text-lg" />
        Play Demo
      </button>

      {open && <GameModal onClose={() => setOpen(false)} />}
    </>
  );
}
