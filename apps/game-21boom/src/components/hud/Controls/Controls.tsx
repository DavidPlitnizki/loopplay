import { useSelector } from "@xstate/react";
import { CircleButton } from "@loop-play/ui";
import { gameActor } from "../../../game/bridge";
import styles from "./Controls.module.css";

export function Controls() {
  const isPlayerTurn = useSelector(gameActor, (s) =>
    s.matches({ playing: "playerTurn" }),
  );

  if (!isPlayerTurn) return null;

  const actionHit = () => {
    gameActor.send({ type: "HIT" });
  }

  const actionStand = () => {
    gameActor.send({ type: "STAND" });
  }

  return (
    <div className={styles.controls}>
      <div className={styles.buttons_wrapper}>
        <CircleButton
          variant="hit"
          actionHandle={actionHit}
        >
          Hit
        </CircleButton>
        <CircleButton
          variant="stand"
          actionHandle={actionStand}
        >
          Stand
        </CircleButton>
      </div>
    </div>
  );
}
