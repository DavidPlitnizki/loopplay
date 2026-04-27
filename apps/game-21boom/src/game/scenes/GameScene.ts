import * as Phaser from "phaser";
import type { Actor } from "xstate";
import type { GameMachine } from "../machine";

export class GameScene extends Phaser.Scene {
  private actor!: Actor<GameMachine>;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {}

  create() {
    // Access the shared actor injected by PhaserGame.tsx
    this.actor = this.registry.get("gameActor") as Actor<GameMachine>;
  }

  update() {}

  // Example: call this.notifyWrong() from game logic when player makes a mistake
  protected notifyWrong() {
    this.actor.send({ type: "WRONG_ANSWER" });
  }
}
