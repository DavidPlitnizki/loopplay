"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IoExpandOutline,
  IoContractOutline,
  IoCloseOutline,
  IoWarningOutline,
  IoRefreshOutline,
} from "react-icons/io5";

interface GameIframeProps {
  src: string;
  title: string;
}

type Status = "loading" | "ok" | "error";

export function GameIframe({ src, title }: GameIframeProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const router = useRouter();

  useEffect(() => {
    setStatus("loading");
    const controller = new AbortController();
    fetch(src, { signal: controller.signal, mode: "no-cors" })
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
    return () => controller.abort();
  }, [src]);

  const wrapperClass = fullscreen
    ? "fixed inset-0 z-50 flex flex-col bg-[#07070f]"
    : "relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d0d1c]";

  return (
    <div className={`transition-all duration-300 ${wrapperClass}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0b0b18] border-b border-white/8">
        <span className="text-sm font-medium text-white/60">{title}</span>
        <div className="flex items-center gap-2">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10
              transition-colors px-3 py-1 text-xs text-white/50 hover:text-white"
          >
            Open in tab
          </a>
          <button
            onClick={() => setFullscreen((v) => !v)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10
              bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen
              ? <IoContractOutline className="text-base" />
              : <IoExpandOutline className="text-base" />
            }
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10
              bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 transition-colors text-white/50 hover:text-red-400"
            aria-label="Close game"
          >
            <IoCloseOutline className="text-base" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        className={`${fullscreen ? "flex-1" : ""} relative bg-[#0d0d1c]`}
        style={fullscreen ? undefined : { height: "600px" }}
      >
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
              <IoWarningOutline className="text-3xl text-red-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Failed to load game</p>
              <p className="text-xs text-white/40">
                Could not connect to{" "}
                <span className="font-mono text-white/60">{src}</span>
              </p>
            </div>
            <button
              onClick={() => setStatus("loading")}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5
                hover:bg-white/10 transition-colors px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              <IoRefreshOutline className="text-base" />
              Retry
            </button>
          </div>
        )}

        {status === "ok" && (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen"
          />
        )}
      </div>
    </div>
  );
}
