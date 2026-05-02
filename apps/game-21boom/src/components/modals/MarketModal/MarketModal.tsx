import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "../SubModal.module.css";

export function MarketModal() {
  return (
    <ModalFrame
      title="🛒 Market"
      actions={
        <button className={styles.backBtn} onClick={() => gameActor.send({ type: "CLOSE_MARKET" })}>
          ← Main Menu
        </button>
      }
    >
      <p className={styles.body}>Coming soon…</p>
    </ModalFrame>
  );
}
