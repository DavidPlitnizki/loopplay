import type * as Phaser from "phaser";

// ── Asset registry ────────────────────────────────────────────────────────────
// Add new assets here. LoaderScene iterates these arrays automatically.

export interface ImageAsset {
  key: string;
  path: string;
}

export interface AudioAsset {
  key: string;
  path: string | string[];
}

export interface FontAsset {
  key: string;
  path: string; // path to .fnt XML + matching .png
}

export const IMAGES: ImageAsset[] = [
  // { key: "card-back", path: "assets/cards/back.png" },
];

export const AUDIO: AudioAsset[] = [
  // { key: "deal",  path: "assets/audio/deal.mp3" },
  // { key: "win",   path: "assets/audio/win.mp3" },
  // { key: "bust",  path: "assets/audio/bust.mp3" },
];

export const FONTS: FontAsset[] = [
  // { key: "game-font", path: "assets/fonts/game-font.fnt" },
];

export function loadAll(loader: Phaser.Loader.LoaderPlugin) {
  for (const img of IMAGES) loader.image(img.key, img.path);
  for (const sfx of AUDIO)  loader.audio(sfx.key, sfx.path);
  for (const fnt of FONTS)  loader.bitmapFont(fnt.key, fnt.path);
}
