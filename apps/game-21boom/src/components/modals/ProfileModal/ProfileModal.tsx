import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "../SubModal.module.css";

export function ProfileModal() {
  return (
    <ModalFrame
      title="👤 Profile"
      actions={
        <button className={styles.backBtn} onClick={() => gameActor.send({ type: "CLOSE_PROFILE" })}>
          ← Main Menu
        </button>
      }
    >
      <p className={styles.body}>Coming soon…</p>
    </ModalFrame>
  );
}
