"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoGameControllerOutline,
  IoHomeOutline,
  IoTrophyOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoMenuOutline,
} from "react-icons/io5";

const navItems = [
  { icon: IoHomeOutline, label: "Dashboard", href: "/dashboard" },
  { icon: IoGameControllerOutline, label: "Games", href: "/dashboard/games" },
  { icon: IoTrophyOutline, label: "Leaderboard", href: "/dashboard/leaderboard" },
  { icon: IoPersonOutline, label: "Profile", href: "/dashboard/profile" },
  { icon: IoSettingsOutline, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile toggle button — rendered inside topbar slot via portal-like trick */}
      <button
        id="sidebar-toggle"
        className="md:hidden text-white/60 hover:text-white"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <IoMenuOutline className="text-2xl" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 flex flex-col border-r border-white/8
          bg-[#0b0b18] transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600/20 border border-violet-500/30">
            <IoGameControllerOutline className="text-xl text-violet-400" />
          </div>
          <Link href="/" className="text-base font-bold tracking-tight">
            Loop<span className="text-violet-400">Play</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                  ${active
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
              >
                <Icon className="text-lg shrink-0" />
                {label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="m-3 rounded-2xl border border-white/8 bg-white/3 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                PL
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#0b0b18]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Player</p>
              <p className="text-xs text-white/40 truncate">Level 12 · 2,450 🪙</p>
            </div>
          </div>
          {/* XP bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-white/30 mb-1.5">
              <span>XP Progress</span>
              <span>7,200 / 10,000</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
