import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "../SubModal.module.css";

export function RulesModal() {
  return (
    <ModalFrame
      title="📖 Rules"
      actions={
        <button className={styles.backBtn} onClick={() => gameActor.send({ type: "CLOSE_RULES" })}>
          ← Main Menu
        </button>
      }
    >
      <p className={styles.body}>Coming soon…</p>
    </ModalFrame>
  );
}
