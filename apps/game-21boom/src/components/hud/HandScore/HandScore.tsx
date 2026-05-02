import { useSelector } from "@xstate/react";
import { gameActor } from "../../../game/bridge";
import { handTotal, BLACKJACK_TARGET } from "../../../game/machine";
import styles from "./HandScore.module.css";

interface Props {
  holder: "player" | "enemy";
}

function isPlayerPhase(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const phase = (value as { playing?: string }).playing;
  return phase === "dealing" || phase === "playerTurn" || phase === "playerDraw";
}

export function HandScore({ holder }: Props) {
  const hand = useSelector(gameActor, (s) => {
    const fullHand =
      holder === "player" ? s.context.playerHand : s.context.enemyHand;
    // While the dealer's hole card is hidden, only the first card counts.
    if (holder === "enemy" && isPlayerPhase(s.value)) {
      return fullHand.slice(0, 1);
    }
    return fullHand;
  });

  if (hand.length === 0) return null;

  const total = handTotal(hand);
  const bust = total > BLACKJACK_TARGET;

  return (
    <div className={`${styles.badge} ${bust ? styles.bust : ""}`}>
      <span className={styles.label}>{holder === "player" ? "You" : "Dealer"}</span>
      <span className={styles.total}>{total}</span>
    </div>
  );
}
