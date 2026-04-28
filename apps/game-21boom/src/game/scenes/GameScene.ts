import * as Phaser from "phaser";
import type { Actor } from "xstate";
import type { GameMachine } from "../machine";

export class GameScene extends Phaser.Scene {
  protected actor!: Actor<GameMachine>;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {}

  create() {
    this.actor = this.registry.get("gameActor") as Actor<GameMachine>;
  }

  update() {}
}
