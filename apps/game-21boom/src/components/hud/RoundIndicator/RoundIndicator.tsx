import { useSelector } from "@xstate/react";
import { gameActor } from "../../../game/bridge";
import styles from "./RoundIndicator.module.css";

const TOTAL_ROUNDS = 5;

export function RoundIndicator() {
  const roundResults = useSelector(gameActor, (s) => s.context.roundResults);

  const playerWins = roundResults.filter((r) => r === "player").length;
  const enemyWins = roundResults.filter((r) => r === "enemy").length;

  // dots[0]=top, dots[4]=bottom
  // player wins fill from bottom up: dot 4, 3, 2, ...
  // enemy wins fill from top down: dot 0, 1, 2, ...
  const dotStates = Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
    if (i >= TOTAL_ROUNDS - playerWins) return "player";
    if (i < enemyWins) return "enemy";
    return null;
  });

  return (
    <div className={styles.wrapper}>
      {dotStates.map((result, i) => {
        const cls = [
          styles.dot,
          result === "player" ? styles.player : "",
          result === "enemy" ? styles.enemy : "",
        ]
          .filter(Boolean)
          .join(" ");
        return <span key={i} className={cls} />;
      })}
    </div>
  );
}
