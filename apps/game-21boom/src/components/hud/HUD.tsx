import { useSelector } from "@xstate/react";
import { gameActor } from "../../game/bridge";
import { TopBar } from "./TopBar/TopBar";
import { Controls } from "./Controls/Controls";
import styles from "./HUD.module.css";

export function HUD() {
  const state = useSelector(gameActor, (s) => s.value);

  if (state === "idle" || state === "gameOver") return null;

  return (
    <div className={styles.hud}>
      <TopBar />
      <Controls />
    </div>
  );
}
