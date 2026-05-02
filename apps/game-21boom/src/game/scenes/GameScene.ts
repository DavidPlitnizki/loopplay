import * as Phaser from "phaser";
import type { Actor } from "xstate";
import type { GameMachine, Card } from "../machine";
import { animSignal } from "../bridge";

// ── Card dimensions ────────────────────────────────────────────────────────
const W = 78;
const H = 108;
const R = 8;
const STEP = 55; // horizontal overlap step per card in a hand

// ── Helpers ────────────────────────────────────────────────────────────────
const SUIT_SYM: Record<string, string> = {
  hearts: "♥", diamonds: "♦", clubs: "♣", spades: "♠",
};
const RANK_LBL: Record<number, string> = { 1: "A", 11: "J", 12: "Q", 13: "K" };

function rankLabel(r: number) { return RANK_LBL[r] ?? String(r); }
function isRed(s: string) { return s === "hearts" || s === "diamonds"; }
function cardKey(c: Card) { return `${c.rank}-${c.suit}`; }

// ── Scene ──────────────────────────────────────────────────────────────────
export class GameScene extends Phaser.Scene {
  protected actor!: Actor<GameMachine>;
  private sub: { unsubscribe(): void } | null = null;
  private ready = false;

  private deckPile!: Phaser.GameObjects.Container;
  private playerCards: Phaser.GameObjects.Container[] = [];
  private enemyCards: Phaser.GameObjects.Container[] = [];

  // Track identity of first card per hand to detect a new round
  private prevFirstPlayerKey: string | null = null;
  private prevFirstEnemyKey: string | null = null;
  private prevPlayerLen = 0;
  private prevEnemyLen = 0;

  constructor() {
    super({ key: "GameScene" });
  }
  preload() {}

  create() {
    this.actor = this.registry.get("gameActor") as Actor<GameMachine>;

    this.deckPile = this.buildDeckPile();

    // The xstate actor is a long-lived singleton in bridge.ts. Its callbacks
    // outlive the scene (StrictMode remounts, HMR), so we must guard against
    // firing into a torn-down scene where this.add is null.
    this.sub = this.actor.subscribe((snap) => {
      if (this.ready && this.scene?.isActive()) this.onSnap(snap);
    });

    // Force unsubscribe on shutdown/destroy — events.once is more reliable
    // than the protected shutdown() lifecycle method across Phaser versions.
    const cleanup = () => {
      this.ready = false;
      this.sub?.unsubscribe();
      this.sub = null;
    };
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, cleanup);
    this.events.once(Phaser.Scenes.Events.DESTROY, cleanup);

    this.scale.on(Phaser.Scale.Events.RESIZE, () => this.onResize());

    this.ready = true;
    this.onSnap(this.actor.getSnapshot());
  }

  // ── Derived positions ────────────────────────────────────────────────────
  private get sw() {
    return this.scale.width;
  }
  private get sh() {
    return this.scale.height;
  }
  private get deckX() {
    return this.sw * 0.9;
  }
  private get deckY() {
    return this.sh * 0.5;
  }
  private get playerCX() {
    return this.sw * 0.42;
  }
  private get playerCY() {
    return this.sh * 0.7;
  }
  private get enemyCX() {
    return this.sw * 0.42;
  }
  private get enemyCY() {
    return this.sh * 0.25;
  }

  private handCX(holder: "player" | "enemy") {
    return holder === "player" ? this.playerCX : this.enemyCX;
  }
  private handCY(holder: "player" | "enemy") {
    return holder === "player" ? this.playerCY : this.enemyCY;
  }

  // x of the i-th card in a hand of `total` cards, centred on handCX
  private cardTargetX(
    holder: "player" | "enemy",
    index: number,
    total: number,
  ) {
    return this.handCX(holder) + (index - (total - 1) / 2) * STEP;
  }

  // ── State subscription ───────────────────────────────────────────────────
  private onSnap(snap: ReturnType<typeof this.actor.getSnapshot>) {
    if (this.isIdle(snap)) { this.clearCards(); return; }
    if (!this.isPlaying(snap)) return;

    const { playerHand, enemyHand } = snap.context;

    this.handleNewRound(playerHand, enemyHand);
    this.syncHand(playerHand, "player", 0);
    this.syncHand(enemyHand, "enemy", 250);
  }

  private isIdle(snap: ReturnType<typeof this.actor.getSnapshot>) {
    return snap.value === "idle" || snap.value === "gameOver";
  }

  private isPlaying(snap: ReturnType<typeof this.actor.getSnapshot>) {
    const val = snap.value;
    return typeof val === "object" && "playing" in (val as object);
  }

  private handleNewRound(playerHand: Card[], enemyHand: Card[]) {
    const firstP = playerHand[0] ? cardKey(playerHand[0]) : null;
    const firstE = enemyHand[0] ? cardKey(enemyHand[0]) : null;
    const changed =
      (firstP !== null && firstP !== this.prevFirstPlayerKey) ||
      (firstE !== null && firstE !== this.prevFirstEnemyKey);

    if (!changed) return;

    this.clearCards();
    this.prevFirstPlayerKey = firstP;
    this.prevFirstEnemyKey = firstE;
  }

  private syncHand(hand: Card[], holder: "player" | "enemy", initialBaseDelay: number) {
    const prevLen = holder === "player" ? this.prevPlayerLen : this.prevEnemyLen;
    if (hand.length <= prevLen) return;

    const newTotal = hand.length;
    const isInitial = prevLen === 0;

    this.repositionSettledCards(holder, prevLen, newTotal);
    this.dealNewCards(hand, holder, prevLen, newTotal, isInitial, initialBaseDelay);

    if (holder === "player") this.prevPlayerLen = newTotal;
    else this.prevEnemyLen = newTotal;
  }

  private repositionSettledCards(
    holder: "player" | "enemy",
    count: number,
    newTotal: number,
  ) {
    const cards = holder === "player" ? this.playerCards : this.enemyCards;
    const cy = holder === "player" ? this.playerCY : this.enemyCY;

    for (let i = 0; i < count; i++) {
      this.tweens.add({
        targets: cards[i],
        x: this.cardTargetX(holder, i, newTotal),
        y: cy,
        duration: 200,
        ease: "Power1",
      });
    }
  }

  private dealNewCards(
    hand: Card[],
    holder: "player" | "enemy",
    prevLen: number,
    newTotal: number,
    isInitial: boolean,
    baseDelay: number,
  ) {
    for (let i = prevLen; i < newTotal; i++) {
      const batch = i - prevLen;
      const delay = isInitial ? baseDelay + batch * 500 : 0;
      this.dealCardAnim(hand[i], holder, i, newTotal, delay);
    }
  }

  // ── Deal animation ───────────────────────────────────────────────────────
  private dealCardAnim(
    card: Card,
    holder: "player" | "enemy",
    index: number,
    total: number,
    delay: number,
  ) {
    const container = this.buildCard(card);
    container.setPosition(this.deckX, this.deckY);

    const cards = holder === "player" ? this.playerCards : this.enemyCards;
    cards.push(container);

    const tx = this.cardTargetX(holder, index, total);
    const ty = this.handCY(holder);

    animSignal.begin();
    this.tweens.add({
      targets: container,
      x: tx,
      y: ty,
      duration: 380,
      delay,
      ease: "Power2.easeOut",
      onComplete: () => this.flipCard(container),
    });
  }

  // ── Flip animation (scale-X collapse → reveal face → expand) ────────────
  private flipCard(container: Phaser.GameObjects.Container) {
    this.tweens.add({
      targets: container,
      scaleX: 0,
      duration: 130,
      ease: "Sine.easeIn",
      onComplete: () => {
        const back = container.getData("back") as Phaser.GameObjects.Graphics;
        const front = container.getData("front") as Phaser.GameObjects.GameObject[];
        back.setVisible(false);
        front.forEach((o) =>
          (o as Phaser.GameObjects.Graphics | Phaser.GameObjects.Text).setVisible(true),
        );
        this.tweens.add({
          targets: container,
          scaleX: 1,
          duration: 130,
          ease: "Sine.easeOut",
          onComplete: () => animSignal.end(),
        });
      },
    });
  }

  // ── Card factory ─────────────────────────────────────────────────────────
  private buildCard(card: Card): Phaser.GameObjects.Container {
    const container = this.add.container(0, 0);

    // Back face
    const back = this.add.graphics();
    this.paintBack(back, 0, 0);

    // Front face
    const front = this.add.graphics();
    this.paintFront(front, 0, 0);

    const col = isRed(card.suit) ? "#cc2222" : "#111111";
    const sym = SUIT_SYM[card.suit];
    const lbl = rankLabel(card.rank);

    const tl1 = this.add
      .text(-W / 2 + 6, -H / 2 + 5, lbl, {
        fontSize: "20px",
        color: col,
        fontStyle: "bold",
      })
      .setOrigin(0, 0);
    const tl2 = this.add
      .text(-W / 2 + 6, -H / 2 + 24, sym, {
        fontSize: "20px",
        color: col,
      })
      .setOrigin(0, 0);
    const ctr = this.add
      .text(0, H * 0.05, sym, {
        fontSize: "40px",
        color: col,
      })
      .setOrigin(0.5, 0.5);

    // Start face-down
    [front, tl1, tl2, ctr].forEach((o) => o.setVisible(false));

    container.add([back, front, tl1, tl2, ctr]);
    container.setData("back", back);
    container.setData("front", [front, tl1, tl2, ctr]);

    return container;
  }

  // ── Graphics helpers ─────────────────────────────────────────────────────
  private paintBack(g: Phaser.GameObjects.Graphics, ox: number, oy: number) {
    // Drop shadow
    g.fillStyle(0x000000, 0.28);
    g.fillRoundedRect(ox - W / 2 + 2, oy - H / 2 + 3, W, H, R);
    // Base
    g.fillStyle(0x1a4c9e, 1);
    g.fillRoundedRect(ox - W / 2, oy - H / 2, W, H, R);
    // Outer border
    g.lineStyle(2, 0xffffff, 0.55);
    g.strokeRoundedRect(ox - W / 2, oy - H / 2, W, H, R);
    // Inner border
    g.lineStyle(1, 0xffffff, 0.25);
    g.strokeRoundedRect(ox - W / 2 + 5, oy - H / 2 + 5, W - 10, H - 10, R - 2);
  }

  private paintFront(g: Phaser.GameObjects.Graphics, ox: number, oy: number) {
    // Drop shadow
    g.fillStyle(0x000000, 0.22);
    g.fillRoundedRect(ox - W / 2 + 2, oy - H / 2 + 3, W, H, R);
    // White card
    g.fillStyle(0xffffff, 1);
    g.fillRoundedRect(ox - W / 2, oy - H / 2, W, H, R);
    // Border
    g.lineStyle(1, 0xbbbbbb, 1);
    g.strokeRoundedRect(ox - W / 2, oy - H / 2, W, H, R);
  }

  // ── Deck pile visual ─────────────────────────────────────────────────────
  private buildDeckPile(): Phaser.GameObjects.Container {
    const container = this.add.container(this.deckX, this.deckY);
    // 6 stacked face-down cards to simulate depth
    for (let i = 5; i >= 0; i--) {
      const g = this.add.graphics();
      const dx = -i;
      const dy = -i;
      this.paintBack(g, dx, dy);
      container.add(g);
    }
    return container;
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────
  private clearCards() {
    this.playerCards.forEach((c) => c.destroy());
    this.enemyCards.forEach((c) => c.destroy());
    this.playerCards = [];
    this.enemyCards = [];
    this.prevPlayerLen = 0;
    this.prevEnemyLen = 0;
  }

  // ── Resize ───────────────────────────────────────────────────────────────
  private onResize() {
    this.deckPile.setPosition(this.deckX, this.deckY);

    const reposition = (
      cards: Phaser.GameObjects.Container[],
      holder: "player" | "enemy",
    ) => {
      const total = cards.length;
      cards.forEach((c, i) => {
        c.setPosition(this.cardTargetX(holder, i, total), this.handCY(holder));
      });
    };

    reposition(this.playerCards, "player");
    reposition(this.enemyCards, "enemy");
  }

  update() {}

  shutdown() {
    this.sub?.unsubscribe();
  }
}
