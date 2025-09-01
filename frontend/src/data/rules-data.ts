import { ApiResponse } from '~/data/api-response';
import { ScoresPerLetter } from '~/domain/scores';
import { BACKEND_PORT, BACKEND_URL } from '~/constants';

export const getRulesApi = async (): Promise<ApiResponse> => {
  const endpoint = `${BACKEND_URL}:${BACKEND_PORT}/api/v1/rules`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  setRulesLocal(data);

  return {
    success: true,
    message: 'Data loaded successfully',
    timestamp: new Date().toISOString(),
    data,
  };
};

export const getRulesLocal = (): ScoresPerLetter  => {
  return JSON.parse(localStorage.getItem('scrabble-rules') || '{}') as ScoresPerLetter;
};

export const setRulesLocal = (data: any): void => {
  localStorage.setItem('scrabble-rules', JSON.stringify(data));
}