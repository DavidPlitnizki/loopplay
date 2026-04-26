import { createActor } from "xstate";
import { gameMachine } from "./machine";

// Single actor instance shared between Phaser scenes and React components.
// Phaser: import { gameActor } from "../bridge"; gameActor.send({ type: "WRONG_ANSWER" })
// React:  import { gameActor } from "../game/bridge"; useSelector(gameActor, s => s.context)
export const gameActor = createActor(gameMachine);
gameActor.start();
