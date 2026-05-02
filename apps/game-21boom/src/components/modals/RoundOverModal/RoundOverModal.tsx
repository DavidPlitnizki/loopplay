import { useSyncExternalStore } from "react";
import { useSelector } from "@xstate/react";
import { GameButton } from "@loop-play/ui";
import { gameActor, animSignal } from "../../../game/bridge";
import { handTotal } from "../../../game/machine";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "./RoundOverModal.module.css";

export function RoundOverModal() {
  const isAnimating = useSyncExternalStore(animSignal.subscribe, animSignal.snapshot);
  const { winner, playerHand, enemyHand } = useSelector(gameActor, (s) => s.context);

  if (isAnimating) return null;

  const resultText =
    winner === "player" ? "You Win!"
    : winner === "enemy" ? "Enemy Wins"
    : "Tie";

  return (
    <ModalFrame
      title={resultText}
      actions={
        <GameButton onClick={() => gameActor.send({ type: "NEXT_ROUND" })}>
          Next Round
        </GameButton>
      }
    >
      <p className={styles.score}>
        You: {handTotal(playerHand)} · Enemy: {handTotal(enemyHand)}
      </p>
    </ModalFrame>
  );
}
