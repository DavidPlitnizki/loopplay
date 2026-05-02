import { useSelector } from "@xstate/react";
import { gameActor } from "../../../game/bridge";
import { handTotal } from "../../../game/machine";
import styles from "./HandScore.module.css";

interface Props {
  holder: "player" | "enemy";
}

export function HandScore({ holder }: Props) {
  const hand = useSelector(gameActor, (s) =>
    holder === "player" ? s.context.playerHand : s.context.enemyHand,
  );

  if (hand.length === 0) return null;

  const total = handTotal(hand);
  const bust = total > 21;

  return (
    <div className={`${styles.badge} ${bust ? styles.bust : ""}`}>
      <span className={styles.label}>{holder === "player" ? "You" : "Dealer"}</span>
      <span className={styles.total}>{total}</span>
    </div>
  );
}
