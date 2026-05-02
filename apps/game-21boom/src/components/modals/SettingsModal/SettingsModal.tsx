import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "../SubModal.module.css";

export function SettingsModal() {
  return (
    <ModalFrame
      title="⚙️ Settings"
      actions={
        <button className={styles.backBtn} onClick={() => gameActor.send({ type: "CLOSE_SETTINGS" })}>
          ← Main Menu
        </button>
      }
    >
      <p className={styles.body}>Coming soon…</p>
    </ModalFrame>
  );
}
