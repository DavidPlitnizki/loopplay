import { GameFrame } from "./game/GameFrame/GameFrame";
import { PhaserGame } from "./game/PhaserGame";
import { HUD } from "./components/hud/HUD";
import ModalsManger from "./components/modals/ModalsManager/Modalsmanager";

export default function App() {
  return (
    <GameFrame mode="landscape">
      <PhaserGame />
      <HUD />
      <ModalsManger />
    </GameFrame>
  );
}
