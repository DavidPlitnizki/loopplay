import * as Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";

export type ScreenMode = "portrait" | "landscape";

// Aspect ratios used by GameFrame — Phaser fills the container via RESIZE.
export const SCREEN_ASPECT: Record<ScreenMode, { width: number; height: number }> = {
  portrait: { width: 9, height: 19.5 },  // iPhone (9:19.5)
  landscape: { width: 16, height: 9 },   // 16:9
};

export function createPhaserConfig(): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    backgroundColor: "#0B6623",
    scene: [GameScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: "100%",
      height: "100%",
    },
  };
}
