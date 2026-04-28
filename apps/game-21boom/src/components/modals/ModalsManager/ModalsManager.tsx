import { useSelector } from "@xstate/react";
import { gameActor } from "../../../game/bridge";
import { IdleModal } from "../IdleModal/IdleModal";
import { GameOverModal } from "../GameOverModal/GameOverModal";

const ModalsManger = () => {
    const snapshot = useSelector(gameActor, (s) => s);

    if (snapshot.matches("idle")) return <IdleModal />;
    if (snapshot.matches("gameOver")) return <GameOverModal />;
    if (snapshot.matches({ playing: "roundOver" })) return <GameOverModal />;
    return null;
}
export default ModalsManger;
