import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BACKEND_PORT, BACKEND_URL } from '~/constants';
import { getRulesApi, getRulesLocal, setRulesLocal } from '~/data/rules-data';

describe('rules-data', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('getRulesApi should fetch rules, store them locally, and return ApiResponse', async () => {
    const mockRules = { A: 1, B: 3 };
    const mockJson = vi.fn().mockResolvedValue(mockRules);
    const mockFetch = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true, json: mockJson } as unknown as Response);

    const result = await getRulesApi();

    expect(mockFetch).toHaveBeenCalledWith(`${BACKEND_URL}:${BACKEND_PORT}/api/v1/rules`);
    expect(localStorage.getItem('scrabble-rules')).toEqual(JSON.stringify(mockRules));
    expect(result.success).toBe(true);
    expect(result.message).toBe('Data loaded successfully');
    expect(result.data).toEqual(mockRules);
    expect(typeof result.timestamp).toBe('string');
  });

  it('getRulesApi should throw an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as unknown as Response);

    await expect(getRulesApi()).rejects.toThrow('API error: 500 Internal Server Error');
  });

  it('getRulesLocal should return parsed rules from localStorage', () => {
    const rules = { C: 3 };
    localStorage.setItem('scrabble-rules', JSON.stringify(rules));

    expect(getRulesLocal()).toEqual(rules);
  });

  it('getRulesLocal should return empty object when nothing stored', () => {
    expect(getRulesLocal()).toEqual({});
  });

  it('setRulesLocal should store rules into localStorage', () => {
    const rules = { D: 2 };
    setRulesLocal(rules);
    expect(localStorage.getItem('scrabble-rules')).toEqual(JSON.stringify(rules));
  });
});
