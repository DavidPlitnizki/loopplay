import { gameActor } from "../../../game/bridge";
import { ModalFrame } from "../ModalFrame/ModalFrame";
import styles from "./MainMenuModal.module.css";

const MENU_ITEMS = [
  { label: "Market",   icon: "🛒", event: "OPEN_MARKET"   },
  { label: "Rules",    icon: "📖", event: "OPEN_RULES"    },
  { label: "Map",      icon: "🗺️", event: "OPEN_MAP"      },
  { label: "Settings", icon: "⚙️", event: "OPEN_SETTINGS" },
  { label: "Profile",  icon: "👤", event: "OPEN_PROFILE"  },
] as const;

export function MainMenuModal() {
  return (
    <ModalFrame
      title="21 BOOM"
      actions={
        <div className={styles.actions}>
          <button
            className={`${styles.menuBtn} ${styles.startBtn}`}
            onClick={() => gameActor.send({ type: "START" })}
          >
            Start Game
          </button>
          <div className={styles.divider} />
          {MENU_ITEMS.map((item) => (
            <button
              key={item.event}
              className={styles.menuBtn}
              onClick={() => gameActor.send({ type: item.event })}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      }
    />
  );
}
