import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css";

export const TURN_SECONDS = 15;

type Props = {
  active: boolean;
  paused: boolean;
  onExpire: () => void;
  onTick?: (remaining: number) => void;
};

export function Timer({ active, paused, onExpire, onTick }: Props) {
  const [remaining, setRemaining] = useState(TURN_SECONDS);
  const expiredRef = useRef(false);
  const onTickRef = useRef(onTick);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onTickRef.current = onTick;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!active) {
      setRemaining(TURN_SECONDS);
      expiredRef.current = false;
      onTickRef.current?.(TURN_SECONDS);
    }
  }, [active]);

  useEffect(() => {
    if (!active || paused) return;

    let rafId = 0;
    let lastTs = performance.now();
    let current = remaining;

    const tick = (ts: number) => {
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      current = Math.max(0, current - dt);
      setRemaining(current);
      onTickRef.current?.(current);

      if (current <= 0) {
        if (!expiredRef.current) {
          expiredRef.current = true;
          onExpireRef.current();
        }
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused]);

  return (
    <div className={styles.timer}>
      <span className={styles.label}>Time</span>
      <span className={styles.value}>{Math.ceil(remaining)}s</span>
    </div>
  );
}
