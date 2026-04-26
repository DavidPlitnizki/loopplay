import { GameFrame } from "./game/GameFrame/GameFrame";
import { PhaserGame } from "./game/PhaserGame";
import { HUD } from "./hud/HUD";

export default function App() {
  return (
    <GameFrame mode="landscape">
      <PhaserGame />
      <HUD />
    </GameFrame>
  );
}
