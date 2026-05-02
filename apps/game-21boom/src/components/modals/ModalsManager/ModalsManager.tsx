import { useSyncExternalStore } from "react";
import { useSelector } from "@xstate/react";
import { gameActor, gameReadySignal, animSignal } from "../../../game/bridge";
import { AnimatedModal } from "../AnimatedModal/AnimatedModal";
import { MainMenuModal } from "../MainMenuModal/MainMenuModal";
import { GameOverModal } from "../GameOverModal/GameOverModal";
import { RoundOverModal } from "../RoundOverModal/RoundOverModal";
import { MarketModal } from "../MarketModal/MarketModal";
import { RulesModal } from "../RulesModal/RulesModal";
import { MapModal } from "../MapModal/MapModal";
import { SettingsModal } from "../SettingsModal/SettingsModal";
import { ProfileModal } from "../ProfileModal/ProfileModal";

const DIM = "oklch(0 0 0 / 68%)";

const ModalsManager = () => {
  const isReady = useSyncExternalStore(gameReadySignal.subscribe, gameReadySignal.snapshot);
  const isAnimating = useSyncExternalStore(animSignal.subscribe, animSignal.snapshot);
  const snap = useSelector(gameActor, (s) => s);

  const is = (state: Parameters<typeof snap.matches>[0]) => isReady && snap.matches(state);

  return (
    <>
      {/* Main menu — no overlay, game table visible behind */}
      <AnimatedModal show={is("idle")}>
        <MainMenuModal />
      </AnimatedModal>

      {/* In-game modals — dim the table */}
      <AnimatedModal show={is("gameOver")} bg={DIM}>
        <GameOverModal />
      </AnimatedModal>
      <AnimatedModal show={is({ playing: "roundResult" }) && !isAnimating} bg={DIM}>
        <RoundOverModal />
      </AnimatedModal>

      {/* Sub-menu modals — no overlay by default, can pass bg later */}
      <AnimatedModal show={is("market")}>
        <MarketModal />
      </AnimatedModal>
      <AnimatedModal show={is("rules")}>
        <RulesModal />
      </AnimatedModal>
      <AnimatedModal show={is("map")}>
        <MapModal />
      </AnimatedModal>
      <AnimatedModal show={is("settings")}>
        <SettingsModal />
      </AnimatedModal>
      <AnimatedModal show={is("profile")}>
        <ProfileModal />
      </AnimatedModal>
    </>
  );
};

export default ModalsManager;
