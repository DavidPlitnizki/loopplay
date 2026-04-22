"use client";

import { useState } from "react";
import { Button } from "@loop-play/ui";

const GAME_URL = "http://localhost:3001";

export default function HomePage() {
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Loop Play</h1>
      <p className="text-muted-foreground">Pick a game and start playing.</p>

      <div className="flex flex-col items-center gap-3 rounded-xl border p-6 w-72">
        <span className="text-lg font-semibold">21 Boom</span>
        <span className="text-sm text-muted-foreground text-center">
          Count to 21 — but don&apos;t say boom.
        </span>
        <Button onClick={() => setGameOpen(true)} className="w-full mt-2">
          Play
        </Button>
      </div>

      {gameOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black">
          <div className="flex items-center justify-between px-4 py-2 bg-background border-b">
            <span className="font-semibold text-sm">21 Boom</span>
            <Button variant="ghost" size="sm" onClick={() => setGameOpen(false)}>
              ✕ Close
            </Button>
          </div>
          <iframe
            src={GAME_URL}
            className="flex-1 w-full border-0"
            title="21 Boom"
            allow="fullscreen"
          />
        </div>
      )}
    </main>
  );
}
