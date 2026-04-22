export type GameEventType =
  | "game:ready"
  | "game:start"
  | "game:pause"
  | "game:resume"
  | "game:exit"
  | "game:score"
  | "lobby:start"
  | "lobby:pause"
  | "lobby:resume";

interface BaseEvent {
  type: GameEventType;
  version: 1;
  id: string;
}

export interface GameReadyEvent extends BaseEvent {
  type: "game:ready";
}

export interface GameScoreEvent extends BaseEvent {
  type: "game:score";
  score: number;
  metadata?: Record<string, unknown>;
}

export interface GameExitEvent extends BaseEvent {
  type: "game:exit";
  finalScore?: number;
}

export interface LobbyStartEvent extends BaseEvent {
  type: "lobby:start";
  userId: string;
  token: string;
}

export type GameEvent =
  | GameReadyEvent
  | GameScoreEvent
  | GameExitEvent
  | LobbyStartEvent;
