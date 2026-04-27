import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { createPhaserConfig } from "./config";
import { gameActor } from "./bridge";

export function PhaserGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    gameRef.current = new Phaser.Game({
      ...createPhaserConfig(),
      parent: "phaser-container",
    });
    gameRef.current.registry.set("gameActor", gameActor);

    const observer = new ResizeObserver(() => {
      gameRef.current?.scale.refresh();
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="phaser-container"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
