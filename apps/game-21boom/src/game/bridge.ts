import { createActor } from "xstate";
import { gameMachine } from "./machine";

// Single actor instance shared between Phaser scenes and React components.
// Phaser: import { gameActor } from "../bridge"; gameActor.send({ type: "WRONG_ANSWER" })
// React:  import { gameActor } from "../game/bridge"; useSelector(gameActor, s => s.context)
export const gameActor = createActor(gameMachine);
gameActor.start();

// Tracks active tween count so React can disable controls during card animations.
// Phaser: animSignal.begin() before a tween, animSignal.end() in its onComplete.
// React: useSyncExternalStore(animSignal.subscribe, animSignal.snapshot)
type Listener = () => void;
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
