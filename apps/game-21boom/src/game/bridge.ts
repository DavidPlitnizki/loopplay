import { createActor } from "xstate";
import { gameMachine } from "./machine";

// Single actor instance shared between Phaser scenes and React components.
// Phaser: import { gameActor } from "../bridge"; gameActor.send({ type: "WRONG_ANSWER" })
// React:  import { gameActor } from "../game/bridge"; useSelector(gameActor, s => s.context)
export const gameActor = createActor(gameMachine);
gameActor.start();

// Flipped to true once GameScene.create() runs — gates React UI from rendering
// before the loader finishes and the game scene is actually on screen.
// Phaser: gameReadySignal.set()  React: useSyncExternalStore(...)
type Listener = () => void;
export const gameReadySignal = {
  _ready: false,
  _listeners: new Set<Listener>(),
  set() {
    if (this._ready) return;
    this._ready = true;
    this._listeners.forEach((l) => l());
  },
  subscribe(l: Listener) {
    gameReadySignal._listeners.add(l);
    return () => gameReadySignal._listeners.delete(l);
  },
  snapshot: () => gameReadySignal._ready,
};

// Tracks active tween count so React can disable controls during card animations.
// Phaser: animSignal.begin() before a tween, animSignal.end() in its onComplete.
// React: useSyncExternalStore(animSignal.subscribe, animSignal.snapshot)
export const animSignal = {
  _active: 0,
  _listeners: new Set<Listener>(),
  begin() {
    this._active++;
    if (this._active === 1) this._listeners.forEach((l) => l());
  },
  end() {
    if (this._active > 0) this._active--;
    if (this._active === 0) this._listeners.forEach((l) => l());
  },
  subscribe(l: Listener) {
    animSignal._listeners.add(l);
    return () => animSignal._listeners.delete(l);
  },
  snapshot: () => animSignal._active > 0,
};
