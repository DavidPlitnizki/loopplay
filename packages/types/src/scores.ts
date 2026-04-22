export interface ScoreSubmission {
  gameId: string;
  userId: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  score: number;
  submittedAt: string;
}
