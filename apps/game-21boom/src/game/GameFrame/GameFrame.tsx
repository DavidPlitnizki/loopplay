import type { ReactNode } from "react";
import { SCREEN_ASPECT, type ScreenMode } from "../config";
import styles from "./GameFrame.module.css";

interface Props {
  mode: ScreenMode;
  children: ReactNode;
}

export function GameFrame({ mode, children }: Props) {
  const { width: aspectW, height: aspectH } = SCREEN_ASPECT[mode];

  const cssVars = {
    "--frame-ratio": `${aspectW} / ${aspectH}`,
    "--frame-width": `min(100vw, calc(100vh * ${aspectW} / ${aspectH}))`,
    "--frame-height": `min(100vh, calc(100vw * ${aspectH} / ${aspectW}))`,
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.frame} style={cssVars}>
        {children}
        <div className={styles.border} />
      </div>
    </div>
  );
}
