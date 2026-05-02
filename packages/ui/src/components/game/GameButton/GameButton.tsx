import * as React from "react";
import styles from "./GameButton.module.css";

interface Props extends React.ComponentProps<"button"> {
  variant?: "default" | "danger";
  size?: "sm" | "md" | "lg";
}

export function GameButton({
  variant = "default",
  size = "md",
  className = "",
  ...props
}: Props) {
  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : "";
  const variantClass = variant === "danger" ? styles.danger : "";
  return (
    <button
      className={[styles.btn, variantClass, sizeClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
