import { ApiResponse } from '~/data/apiResponse';

export interface SaveScoreRequest {
  score: number;
  wordUsed: string;
}

export const saveScoreData = async (request: SaveScoreRequest): Promise<ApiResponse> => {
  const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${request.wordUsed}`
  const isWordValidResponse = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!isWordValidResponse.ok) {
    throw new Error('This is not a valid word in English dictionary. Try again.');
  }

  const response = await fetch('http://localhost:8080/api/v1/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save score. Please try again.');
  }
  
  return {
    success: true,
    message: `Score ${request.score} saved successfully!`,
    timestamp: new Date().toISOString(),
    data: response.json(),
  };
}; 