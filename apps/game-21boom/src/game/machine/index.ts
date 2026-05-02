import { assign, setup } from "xstate";
import * as A from "./actions";
import * as G from "./guards";
import { initialContext, type Events, type GameContext } from "./types";

export { BLACKJACK_TARGET, handTotal } from "./cards";
export type { Card, Suit } from "./cards";
export type { GameContext, Holder, Winner } from "./types";

export const gameMachine = setup({
  types: {
    context: {} as GameContext,
    events: {} as Events,
  },
  actions: {
    dealAlternating: assign(A.dealAlternating),
    drawToNext: assign(A.drawToNext),
    setEnemyAsNext: assign(A.setEnemyAsNext),
    setPlayerAsNext: assign(A.setPlayerAsNext),
    decideWinner: assign(A.decideWinner),
    surrender: assign(A.surrender),
    shuffleDeck: assign(A.shuffleDeck),
    resetMatch: assign(A.resetMatch),
  },
  guards: {
    playerBust: G.playerBust,
    naturalBlackjack: G.naturalBlackjack,
    enemyShouldHit: G.enemyShouldHit,
    matchOver: G.matchOver,
  },
}).createMachine({
  id: "game-21",
  initial: "idle",
  context: initialContext,
  on: {
    MAIN_MENU: { target: ".idle", actions: "resetMatch" },
  },
  states: {
    // ── Top-level lifecycle: menus, modals, paused, gameOver ──
    idle: {
      entry: "resetMatch",
      on: {
        START:         { target: "playing" },
        OPEN_MENU:     { target: "menu" },
        OPEN_ADS:      { target: "ads" },
        OPEN_MARKET:   { target: "market" },
        OPEN_RULES:    { target: "rules" },
        OPEN_MAP:      { target: "map" },
        OPEN_SETTINGS: { target: "settings" },
        OPEN_PROFILE:  { target: "profile" },
      },
    },
    menu:     { on: { CLOSE_MENU:     { target: "idle" } } },
    ads:      { on: { CLOSE_ADS:      { target: "idle" } } },
    market:   { on: { CLOSE_MARKET:   { target: "idle" } } },
    rules:    { on: { CLOSE_RULES:    { target: "idle" } } },
    map:      { on: { CLOSE_MAP:      { target: "idle" } } },
    settings: { on: { CLOSE_SETTINGS: { target: "idle" } } },
    profile:  { on: { CLOSE_PROFILE:  { target: "idle" } } },
    paused:   { on: { RESUME:         { target: "playing" } } },

    // ── Round flow lives inside `playing` ──
    playing: {
      initial: "dealing",
      on: {
        PAUSE: { target: "paused" },
        END_GAME: { target: "gameOver" },
      },
      states: {
        dealing: {
          entry: "dealAlternating",
          always: { target: "playerTurn" },
        },
        playerTurn: {
          always: { guard: "naturalBlackjack", target: "resolving" },
          on: {
            HIT: { target: "playerDraw" },
            STAND: { target: "enemyTurn" },
            SURRENDER: { target: "enemyWin" },
          },
        },
        playerDraw: {
          entry: ["setPlayerAsNext", "drawToNext"],
          always: [
            { guard: "playerBust", target: "resolving" },
            { target: "playerTurn" },
          ],
        },
        enemyTurn: {
          entry: "setEnemyAsNext",
          always: [
            { guard: "enemyShouldHit", target: "enemyDraw" },
            { target: "resolving" },
          ],
        },
        enemyDraw: {
          entry: ["setEnemyAsNext", "drawToNext"],
          always: { target: "enemyTurn" },
        },
        resolving: {
          entry: "decideWinner",
          always: { target: "roundResult" },
        },
        enemyWin: {
          entry: "surrender",
          always: { target: "roundOver" },
        },
        roundResult: {
          on: {
            NEXT_ROUND: [
              { guard: "matchOver", target: "#game-21.gameOver" },
              { target: "newRound" },
            ],
          },
          after: {
            7000: [
              { guard: "matchOver", target: "#game-21.gameOver" },
              { target: "newRound" },
            ],
          },
        },
        roundOver: {
          always: [
            { guard: "matchOver", target: "#game-21.gameOver" },
            { target: "newRound" },
          ],
        },
        newRound: {
          entry: "dealAlternating",
          always: { target: "playerTurn" },
        },
      },
    },
    gameOver: {
      on: {
        START: { target: "playing", actions: "resetMatch" },
      },
    },
  },
});

export type GameMachine = typeof gameMachine;
