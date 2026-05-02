import * as Phaser from "phaser";
import { loadAll } from "../assets";

const TITLE = "21 BOOM";
const NEXT_SCENE = "GameScene";

const BAR_W = 420;
const BAR_H = 32;
const BAR_DEPTH = 10;

export class LoaderScene extends Phaser.Scene {
  private barFill!: Phaser.GameObjects.Graphics;
  private barGlow!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: "LoaderScene" });
  }

  preload() {
    loadAll(this.load);

    this.load.on(Phaser.Loader.Events.PROGRESS, (v: number) => {
      this.drawBar(v);
    });

    this.load.on(Phaser.Loader.Events.COMPLETE, () => {
      this.drawBar(1);
      this.time.delayedCall(500, () => this.startTransition());
    });
  }

  create() {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    this.buildBackground();
    this.buildTitle(cx, cy - 110);
    this.buildBarTrack(cx, cy + 20);

    this.barGlow = this.add.graphics();
    this.barFill = this.add.graphics();
    this.buildBarBevel(cx, cy + 20);

    if (!this.load.isLoading()) {
      this.drawBar(1);
      this.time.delayedCall(500, () => this.startTransition());
    }
  }

  // ── Background ───────────────────────────────────────────────────────────
  private buildBackground() {
    const w = this.scale.width;
    const h = this.scale.height;
    const g = this.add.graphics();

    g.fillStyle(0x0a3d1a, 1);
    g.fillRect(0, 0, w, h);
    g.fillStyle(0x0d5c28, 0.55);
    g.fillCircle(w / 2, h / 2, Math.max(w, h) * 0.7);

    g.lineStyle(1, 0x1a7a40, 0.18);
    for (let r = 60; r < Math.max(w, h) * 1.2; r += 60) {
      g.strokeCircle(w / 2, h / 2, r);
    }
  }

  // ── Title ────────────────────────────────────────────────────────────────
  private buildTitle(cx: number, y: number) {
    this.add.text(cx + 4, y + 6, TITLE, {
      fontSize: "72px",
      fontFamily: "Arial Black, Impact, sans-serif",
      color: "#000000",
    }).setOrigin(0.5).setAlpha(0.45);

    const title = this.add.text(cx, y, TITLE, {
      fontSize: "72px",
      fontFamily: "Arial Black, Impact, sans-serif",
      color: "#ffffff",
      stroke: "#b8860b",
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      alpha: { from: 0.85, to: 1 },
      scaleX: { from: 0.97, to: 1.03 },
      scaleY: { from: 0.97, to: 1.03 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  // ── Bar track ─────────────────────────────────────────────────────────────
  private buildBarTrack(cx: number, cy: number) {
    const g = this.add.graphics();
    const x = cx - BAR_W / 2;
    const y = cy - BAR_H / 2;

    g.fillStyle(0x000000, 0.7);
    g.fillRoundedRect(x + BAR_DEPTH, y + BAR_H, BAR_W, BAR_DEPTH, 4);

    g.fillStyle(0x0a1a0a, 0.9);
    g.fillRoundedRect(x, y, BAR_W, BAR_H, 8);

    g.lineStyle(2, 0x000000, 0.6);
    g.strokeRoundedRect(x, y, BAR_W, BAR_H, 8);
    g.lineStyle(1, 0x225522, 0.5);
    g.strokeRoundedRect(x + 2, y + 2, BAR_W - 4, BAR_H - 4, 6);
  }

  // ── Bevel frame on top of fill ────────────────────────────────────────────
  private buildBarBevel(cx: number, cy: number) {
    const g = this.add.graphics();
    const x = cx - BAR_W / 2;
    const y = cy - BAR_H / 2;

    g.lineStyle(1, 0xffffff, 0.12);
    g.beginPath();
    g.moveTo(x + 8, y + 1);
    g.lineTo(x + BAR_W - 8, y + 1);
    g.strokePath();

    g.lineStyle(1, 0x000000, 0.35);
    g.beginPath();
    g.moveTo(x + 8, y + BAR_H - 1);
    g.lineTo(x + BAR_W - 8, y + BAR_H - 1);
    g.strokePath();
  }

  // ── Scene transition ─────────────────────────────────────────────────────
  private startTransition() {
    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(NEXT_SCENE);
    });
  }

  // ── Fill + glow ───────────────────────────────────────────────────────────
  private drawBar(pct: number) {
    if (!this.barGlow || !this.barFill) return;

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2 + 20;
    const x  = cx - BAR_W / 2;
    const y  = cy - BAR_H / 2;
    const fillW = Math.max(0, (BAR_W - 4) * pct);

    this.barGlow.clear();
    if (fillW > 0) {
      this.barGlow.fillStyle(0x00ff66, 0.12);
      this.barGlow.fillRoundedRect(x - 6, y - 6, fillW + 16, BAR_H + 12, 10);
    }

    this.barFill.clear();
    if (fillW > 0) {
      // 3-D side extrusion
      this.barFill.fillStyle(0x007722, 1);
      this.barFill.fillRoundedRect(x + BAR_DEPTH + 2, y + BAR_H, fillW - BAR_DEPTH, BAR_DEPTH, 3);

      // Main fill
      this.barFill.fillStyle(0x00cc44, 1);
      this.barFill.fillRoundedRect(x + 2, y + 2, fillW, BAR_H - 4, 6);

      // Upper highlight band
      this.barFill.fillStyle(0x00ff66, 0.35);
      this.barFill.fillRoundedRect(x + 2, y + 2, fillW, BAR_H / 2 - 2, 6);

      // Static top shine stripe
      this.barFill.fillStyle(0xffffff, 0.12);
      this.barFill.fillRoundedRect(x + 4, y + 4, fillW - 6, 5, 3);
    }
  }
}
