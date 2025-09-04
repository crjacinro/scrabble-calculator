import { BACKEND_PORT, BACKEND_URL } from '~/constants';

interface RulesResponse {
  scoresPerLetter: Map<string, number>;
}

export const getRulesApi = async (): Promise<Map<string, number>> => {
  const endpoint = `${BACKEND_URL}:${BACKEND_PORT}/api/v1/rules`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Unable to fetch rules data'`);
  }
  const data = (await response.json()) as RulesResponse;

  return data.scoresPerLetter;
};