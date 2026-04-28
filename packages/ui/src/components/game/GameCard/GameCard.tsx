import * as React from "react";
import styles from "./GameCard.module.css";

interface Props extends React.ComponentProps<"div"> {}

export function GameCard({ className = "", ...props }: Props) {
  return (
    <div
      className={[styles.card, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
