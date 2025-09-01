import { ApiResponse } from '~/data/api-response';
import { ScoresPerLetter } from '~/domain/scores';

export const getRulesApi = async (): Promise<ApiResponse> => {
  const response = await fetch('http://localhost:8080/api/v1/rules');
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