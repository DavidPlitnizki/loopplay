import { useSyncExternalStore } from "react";
import { useSelector } from "@xstate/react";
import { CircleButton } from "@loop-play/ui";
import { gameActor, animSignal } from "../../../game/bridge";
import styles from "./Controls.module.css";

export function Controls() {
  const isAnimating = useSyncExternalStore(animSignal.subscribe, animSignal.snapshot);
  const isPlayerTurn = useSelector(gameActor, (s) =>
    s.matches({ playing: "playerTurn" }),
  );
  const isRoundOver = useSelector(gameActor, (s) =>
    s.matches({ playing: "roundOver" }),
  );

  if (!isPlayerTurn && !isRoundOver) return null;

  const actionHit = () => gameActor.send({ type: "HIT" });
  const actionStand = () => gameActor.send({ type: "STAND" });
  const actionSurrender = () => gameActor.send({ type: "SURRENDER" });
  const actionShuffle = () => gameActor.send({ type: "SHUFFLE" });

  const actionExit = () => gameActor.send({ type: "END_GAME" });

  return (
    <div className={styles.controls}>
      <div className={styles.balance}>
        <span className={styles.balance_label}>Balance</span>
        <span className={styles.balance_amount}>$1,250</span>
      </div>

      <div className={styles.buttons_wrapper}>
        {isPlayerTurn && (
          <>
            <CircleButton variant="hit" actionHandle={actionHit} disabled={isAnimating}>
              Hit
            </CircleButton>
            <CircleButton variant="stand" actionHandle={actionStand} disabled={isAnimating}>
              Stand
            </CircleButton>
            <CircleButton variant="surrender" actionHandle={actionSurrender} disabled={isAnimating}>
              Surrender
            </CircleButton>
          </>
        )}
        {isRoundOver && (
          <CircleButton variant="shuffle" actionHandle={actionShuffle} disabled={isAnimating}>
            Shuffle
          </CircleButton>
        )}
      </div>

      <div className={styles.side_right}>
        <button className={styles.exit_btn} onClick={actionExit}>
          <span className={styles.exit_icon}>✕</span>
          <span className={styles.exit_label}>Exit</span>
        </button>
      </div>
    </div>
  );
}
