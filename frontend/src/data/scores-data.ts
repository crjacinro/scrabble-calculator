import { TopScore } from '~/domain/scores';
import { BACKEND_PORT, BACKEND_URL, DICTIONARY_SERVICE_URL } from '~/constants';

const BASE_URL = `${BACKEND_URL}:${BACKEND_PORT}`;

export interface SaveScoreRequest {
  score: number;
  wordUsed: string;
}

export const validateWord = async (word: string) => {
  const endpoint = `${DICTIONARY_SERVICE_URL}/${word}`;
  const isWordValidResponse = await fetch(endpoint);
  if (!isWordValidResponse.ok) {
    throw new Error('This is not a valid word in English dictionary. Try again.');
  }
};

export const saveScoreData = async (request: SaveScoreRequest): Promise<string> => {
  await validateWord(request.wordUsed);
  const endpoint = `${BASE_URL}/api/v1/scores`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to save score. Please try again.');
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
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as TopScoresResponse;

  return data.topScores.map((topScore: TopScoreResponse, index: number) => ({
    rank: (index + 1).toString(),
    wordUsed: topScore.wordUsed,
    score: topScore.score,
    timestamp: topScore.timestamp,
  }));
}; 