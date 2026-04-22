export interface GameMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  entryUrl: string;
  tags: string[];
  minPlayers: number;
  maxPlayers: number;
}
