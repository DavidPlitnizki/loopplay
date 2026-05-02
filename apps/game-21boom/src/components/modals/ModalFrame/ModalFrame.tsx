import type { ReactNode } from "react";
import styles from "./ModalFrame.module.css";

interface Props {
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

export function ModalFrame({ title, children, actions }: Props) {
  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}

      {(children || actions) && <div className={styles.divider} />}

      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
}
