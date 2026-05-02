import { useSelector } from "@xstate/react";
import { GameButton } from "@loop-play/ui";
import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "./GameOverModal.module.css";

const TOTAL_ROUNDS = 5;

export function GameOverModal() {
  const { playerWins, enemyWins } = useSelector(gameActor, (s) => s.context);

  const resultText =
    playerWins > enemyWins ? "You Win!"
    : enemyWins > playerWins ? "Enemy Wins"
    : "Tie";

  return (
    <ModalFrame
      title={resultText}
      actions={<GameButton onClick={() => gameActor.send({ type: "START" })}>Play Again</GameButton>}
    >
      <p className={styles.score}>You: {playerWins} · Enemy: {enemyWins}</p>
      <div className={styles.stars}>
        {Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
          const won = i < playerWins;
          return (
            <span
              key={i}
              className={`${styles.star} ${won ? styles.starWon : styles.starLost}`}
              style={won ? { animationDelay: `${i * 180}ms` } : undefined}
            >
              ★
            </span>
          );
        })}
      </div>
    </ModalFrame>
  );
}
