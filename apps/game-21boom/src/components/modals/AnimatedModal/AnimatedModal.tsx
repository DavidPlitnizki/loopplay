import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import styles from "./AnimatedModal.module.css";

type Phase = "hidden" | "entering" | "visible" | "exiting";

interface Props {
  show: boolean;
  children: ReactNode;
  /** CSS background applied to the overlay. Default: dark dim. */
  bg?: string;
}

export function AnimatedModal({ show, children, bg = "oklch(0 0 0 / 68%)" }: Props) {
  const [phase, setPhase] = useState<Phase>(() => (show ? "entering" : "hidden"));

  useEffect(() => {
    if (show && phase === "hidden") setPhase("entering");
    if (!show && (phase === "entering" || phase === "visible")) setPhase("exiting");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (phase === "hidden") return null;

  const isOut = phase === "exiting";

  const handleAnimEnd = () => {
    if (phase === "entering") setPhase("visible");
    if (phase === "exiting")  setPhase("hidden");
  };

  return (
    <div
      className={`${styles.overlay} ${isOut ? styles.overlayOut : styles.overlayIn}`}
      style={{ background: bg } as CSSProperties}
    >
      <div
        className={isOut ? styles.cardOut : styles.cardIn}
        onAnimationEnd={handleAnimEnd}
      >
        {children}
      </div>
    </div>
  );
}
