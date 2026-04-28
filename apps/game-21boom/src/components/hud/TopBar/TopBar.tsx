import { useSelector } from "@xstate/react";
import { gameActor } from "../../../game/bridge";
import { handTotal } from "../../../game/machine";
import styles from "./TopBar.module.css";

export function TopBar() {
  const { playerHand, enemyHand } = useSelector(gameActor, (s) => s.context);

  return (
    <div className={styles.topbar}>
      <span>Player: {handTotal(playerHand)}</span>
      <span>Enemy: {handTotal(enemyHand)}</span>
    </div>
  );
}
