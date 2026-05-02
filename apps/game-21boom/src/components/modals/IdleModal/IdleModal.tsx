import { GameButton, GameCard } from "@loop-play/ui";
import { gameActor } from "../../../game/bridge";
import styles from "./IdleModal.module.css";

export function IdleModal() {
  const handleStart = () => {
    gameActor.send({ type: "START" });
  };

  return (
    <div className={styles.overlay}>
      <GameCard>
        <h1 className={styles.title}>21 Boom</h1>
        <p className={styles.description}>
          Count to 21 — say Boom! on multiples of 7 or numbers containing 7.
        </p>
        <GameButton onClick={handleStart}>Start Game</GameButton>
      </GameCard>
    </div>
  );
}
