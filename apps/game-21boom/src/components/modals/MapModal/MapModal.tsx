import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "../SubModal.module.css";

export function MapModal() {
  return (
    <ModalFrame
      title="🗺️ Map"
      actions={
        <button className={styles.backBtn} onClick={() => gameActor.send({ type: "CLOSE_MAP" })}>
          ← Main Menu
        </button>
      }
    >
      <p className={styles.body}>Coming soon…</p>
    </ModalFrame>
  );
}
