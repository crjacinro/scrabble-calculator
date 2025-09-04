import { TopScore } from '~/domain/scores';
import { BACKEND_PORT, BACKEND_URL } from '~/constants';

const BASE_URL = `${BACKEND_URL}:${BACKEND_PORT}`;

export interface SaveScoreRequest {
  score: number;
  wordUsed: string;
}

export const saveScoreData = async (request: SaveScoreRequest): Promise<string> => {
  const endpoint = `${BASE_URL}/api/v1/scores`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return `${request.wordUsed} - ${request.score} saved successfully!`;
};

interface TopScoreResponse {
  wordUsed: string;
  score: number;
  timestamp: string;
}

interface TopScoresResponse {
  topScores: TopScoreResponse[];
}

export const getTopScores = async (): Promise<TopScore[]> => {
  const endpoint = `${BASE_URL}/api/v1/scores?top=10`;
  const response = await fetch(endpoint);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }

  const data = responseData as TopScoresResponse;

  return data.topScores.map((topScore: TopScoreResponse, index: number) => ({
    rank: (index + 1).toString(),
    wordUsed: topScore.wordUsed,
    score: topScore.score,
    timestamp: topScore.timestamp,
  }));
}; 