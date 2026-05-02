import { useCallback, useState, useSyncExternalStore } from "react";
import { useSelector } from "@xstate/react";
import { CircleButton } from "@loop-play/ui";
import { gameActor, animSignal } from "../../../game/bridge";
import { Timer, TURN_SECONDS } from "./Timer";
import styles from "./Controls.module.css";

export function Controls() {
  const isAnimating = useSyncExternalStore(animSignal.subscribe, animSignal.snapshot);
  const isPlayerTurn = useSelector(gameActor, (s) =>
    s.matches({ playing: "playerTurn" }),
  );
  const [remaining, setRemaining] = useState(TURN_SECONDS);
  const actionStand = useCallback(() => gameActor.send({ type: "STAND" }), []);

  if (!isPlayerTurn) return null;

  const pct = (remaining / TURN_SECONDS) * 100;
  const tone = pct > 50 ? "green" : pct > 25 ? "orange" : "red";

  const actionHit = () => gameActor.send({ type: "HIT" });
  const actionSurrender = () => gameActor.send({ type: "SURRENDER" });

  const actionExit = () => gameActor.send({ type: "MAIN_MENU" });

  return (
    <div className={styles.controls}>
      <div className={styles.side_left}>
        <div className={styles.info_panel}>
          <div className={styles.balance}>
            <span className={styles.balance_label}>Balance</span>
            <span className={styles.balance_amount}>$1,250</span>
          </div>
        </div>
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

      </div>

      <div className={styles.side_right}>
        {isPlayerTurn && (
          <div className={styles.info_panel}>
            <Timer
              active={isPlayerTurn}
              paused={isAnimating}
              onExpire={actionStand}
              onTick={setRemaining}
            />
          </div>
        )}
        <button className={styles.exit_btn} onClick={actionExit}>
          <span className={styles.exit_icon}>✕</span>
          <span className={styles.exit_label}>Exit</span>
        </button>
      </div>

      {isPlayerTurn && (
        <div className={styles.progress_track}>
          <div
            className={`${styles.progress_fill} ${styles[`progress_${tone}`]} ${
              remaining <= 3 ? styles.progress_flicker : ""
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}
