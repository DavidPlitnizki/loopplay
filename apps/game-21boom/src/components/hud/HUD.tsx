import { useSelector } from "@xstate/react";
import { gameActor } from "../../game/bridge";
import { TopBar } from "./TopBar/TopBar";
import { Controls } from "./Controls/Controls";
import { HandScore } from "./HandScore/HandScore";
import { RoundIndicator } from "./RoundIndicator/RoundIndicator";
import styles from "./HUD.module.css";

export function HUD() {
  const state = useSelector(gameActor, (s) => s.value);

  if (state === "idle" || state === "gameOver") return null;

  return (
    <div className={styles.hud}>
      <TopBar />
      <div className={styles.rounds}>
        <RoundIndicator />
      </div>
      <div className={styles.dealer_score}>
        <HandScore holder="enemy" />
      </div>
      <div className={styles.player_score}>
        <HandScore holder="player" />
      </div>
      <Controls />
    </div>
  );
}
