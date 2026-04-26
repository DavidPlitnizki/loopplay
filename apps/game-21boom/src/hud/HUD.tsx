import { useSelector } from "@xstate/react";
import { gameActor } from "../game/bridge";

function isBoom(n: number): boolean {
  return n % 7 === 0 || String(n).includes("7");
}

export function HUD() {
  const state = useSelector(gameActor, (s) => s.value);
  const { count, score } = useSelector(gameActor, (s) => s.context);

  const nextNumber = count + 1;
  const nextIsBoom = isBoom(nextNumber);

  if (state === "idle") {
    return (
      <div style={overlay}>
        <div style={card}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            21 Boom
          </h1>
          <p style={{ color: "#a3a3a3", marginBottom: "1.5rem" }}>
            Count to 21 — say Boom! on multiples of 7 or numbers containing 7.
          </p>
          <button style={btn} onClick={() => gameActor.send({ type: "START" })}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (state === "gameOver") {
    return (
      <div style={overlay}>
        <div style={card}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Game Over
          </h2>
          <p style={{ color: "#a3a3a3", marginBottom: "1.5rem" }}>Score: {score}</p>
          <button style={btn} onClick={() => gameActor.send({ type: "START" })}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // playing / paused
  const numbers = Array.from({ length: 5 }, (_, i) => nextNumber + i).filter(
    (n) => !isBoom(n)
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          pointerEvents: "auto",
          display: "flex",
          justifyContent: "space-between",
          color: "#f5f5f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <span>Count: {count}</span>
        <span>Score: {score}</span>
        <button
          style={{ ...btn, padding: "0.25rem 0.75rem", fontSize: "0.85rem" }}
          onClick={() =>
            gameActor.send({ type: state === "paused" ? "RESUME" : "PAUSE" })
          }
        >
          {state === "paused" ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Control buttons */}
      {state === "playing" && (
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {nextIsBoom ? (
            <button
              style={{ ...btn, background: "#ef4444", fontSize: "1.25rem", padding: "0.75rem 2rem" }}
              onClick={() => gameActor.send({ type: "SAY_BOOM" })}
            >
              BOOM!
            </button>
          ) : (
            numbers.slice(0, 1).map((n) => (
              <button
                key={n}
                style={{ ...btn, fontSize: "1.25rem", padding: "0.75rem 2rem" }}
                onClick={() => gameActor.send({ type: "SAY_NUMBER", value: n })}
              >
                {n}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.6)",
};

const card: React.CSSProperties = {
  background: "#1a1a2e",
  border: "1px solid #404040",
  borderRadius: "1rem",
  padding: "2rem",
  textAlign: "center",
  color: "#f5f5f5",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
};

const btn: React.CSSProperties = {
  background: "#f5f5f5",
  color: "#0f0f0f",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
};
