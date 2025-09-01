export interface TopScore {
  rank: string;
  wordUsed: string;
  score: number;
  timestamp: string;
}

export interface ScoresPerLetter {
  scoresPerLetter: Record<string, number>;
}
