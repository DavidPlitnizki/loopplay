import { useSelector } from "@xstate/react";
import { GameButton, GameCard } from "@loop-play/ui";
import { gameActor } from "../../../game/bridge";
import { handTotal } from "../../../game/machine";
import styles from "./GameOverModal.module.css";

export function GameOverModal() {
  const { winner, playerHand, enemyHand } = useSelector(
    gameActor,
    (s) => s.context,
  );

  const resultText =
    winner === "player"
      ? "You Win!"
      : winner === "enemy"
        ? "Enemy Wins"
        : "Tie";

  return (
    <div className={styles.overlay}>
      <GameCard>
        <h2>{resultText}</h2>
        <p className={styles.score}>
          You: {handTotal(playerHand)} · Enemy: {handTotal(enemyHand)}
        </p>
        <GameButton onClick={() => gameActor.send({ type: "START" })}>
          Play Again
        </GameButton>
      </GameCard>
    </div>
  );
}
