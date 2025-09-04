import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BACKEND_PORT, BACKEND_URL } from '~/constants';
import { getTopScores, saveScoreData } from '~/data/scores-data';

const BASE_URL = `${BACKEND_URL}:${BACKEND_PORT}`;

describe('scores-data', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('saveScoreData should validate, post score, and return with message', async () => {
    const request = { score: 42, wordUsed: 'zoo' };

    // first call: dictionary validation
    // second call: POST /scores
    const mockJson = vi.fn().mockResolvedValue({ id: '123' });
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({ ok: true, json: mockJson } as unknown as Response);

    const response = await saveScoreData(request);

    expect(fetchMock).toHaveBeenNthCalledWith(1, `${BASE_URL}/api/v1/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    expect(response).toEqual('zoo - 42 saved successfully!');
  });

  it('saveScoreData should throw when POST fails', async () => {
    const request = { score: 10, wordUsed: 'aa' };
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({ ok: true } as unknown as Response) // validateWord ok
      .mockResolvedValueOnce({ ok: false } as unknown as Response); // POST fails

    await expect(saveScoreData(request)).rejects.toThrow();
  });

  it('getTopScores should fetch and map top scores with ranks', async () => {
    const apiResponse = {
      topScores: [
        { wordUsed: 'cat', score: 7, timestamp: '2023-01-01T00:00:00Z' },
        { wordUsed: 'quiz', score: 22, timestamp: '2023-01-02T00:00:00Z' },
      ],
    };
    const mockJson = vi.fn().mockResolvedValue(apiResponse);
    const mockFetch = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true, json: mockJson } as unknown as Response);

    const result = await getTopScores();

    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/api/v1/scores?top=10`);
    expect(result).toEqual([
      { rank: '1', wordUsed: 'cat', score: 7, timestamp: '2023-01-01T00:00:00Z' },
      { rank: '2', wordUsed: 'quiz', score: 22, timestamp: '2023-01-02T00:00:00Z' },
    ]);
  });

  it('getTopScores should throw on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as unknown as Response);
    await expect(getTopScores()).rejects.toThrow();
  });
});
