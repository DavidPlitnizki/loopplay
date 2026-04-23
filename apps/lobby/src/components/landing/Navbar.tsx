"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoGameControllerOutline } from "react-icons/io5";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a12]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <IoGameControllerOutline className="text-2xl text-violet-400" />
          <span className="text-lg font-bold tracking-tight text-white">
            Loop<span className="text-violet-400">Play</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#games" className="hover:text-white transition-colors">Games</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#leaderboard" className="hover:text-white transition-colors">Leaderboard</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
            Sign in
          </button>
          <Link href="/dashboard" className="rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors px-5 py-2 text-sm font-semibold text-white">
            Play Free
          </Link>
        </div>

        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a12] px-6 py-4 flex flex-col gap-4">
          <a href="#games" className="text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>Games</a>
          <a href="#features" className="text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>Features</a>
          <a href="#leaderboard" className="text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>Leaderboard</a>
          <a href="#how" className="text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>How it works</a>
          <Link href="/dashboard" className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white w-full mt-2 text-center block">
            Play Free
          </Link>
        </div>
      )}
    </header>
  );
}
