import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BACKEND_PORT, BACKEND_URL } from '~/constants';
import { getRulesApi } from '~/data/rules-data';

describe('rules-data', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('getRulesApi should fetch rules and return the rules map response', async () => {
    const mockRules = { scoresPerLetter: { A: 1, B: 3 } };
    const mockJson = vi.fn().mockResolvedValue(mockRules);
    const mockFetch = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true, json: mockJson } as unknown as Response);

    const result = await getRulesApi();

    expect(mockFetch).toHaveBeenCalledWith(`${BACKEND_URL}:${BACKEND_PORT}/api/v1/rules`);
    expect(result).toEqual({ A: 1, B: 3 });
  });

  it('getRulesApi should throw an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as unknown as Response);

    await expect(getRulesApi()).rejects.toThrow('Unable to fetch rules data');
  });
});
