import styles from "./CircleButton.module.css";

type CircleButtonVariant = "hit" | "stand" | "surrender" | "shuffle";

interface CircleButtonProps {
  variant: CircleButtonVariant;
  actionHandle?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function CircleButton({ variant, actionHandle, disabled, children }: CircleButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={actionHandle}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
