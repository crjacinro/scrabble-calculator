import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '../Index';
import React from 'react';

// Mock all the dependencies
vi.mock('~/components/Head', () => ({
  Head: () => <div data-testid="head">Head Component</div>,
}));

vi.mock('~/components/LetterGrid', () => ({
  default: ({ tiles, handleTileChange, handleKeyDown }: any) => (
    <div data-testid="letter-grid">
      {tiles.map((tile: string, index: number) => (
        <input
          key={index}
          data-testid={`tile-${index}`}
          value={tile}
          onChange={(e) => handleTileChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  ),
}));

vi.mock('~/components/ActionButton', () => ({
  default: ({ children, onClick, disabled }: any) => (
    <button data-testid="action-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

vi.mock('~/components/Loading', () => ({
  default: ({ message }: any) => <div data-testid="loading">{message}</div>,
}));

vi.mock('~/components/Toast', () => ({
  default: ({ message, isVisible }: any) =>
    isVisible ? <div data-testid="toast">{message}</div> : null,
  ToastType: { Info: 'info', Error: 'error', Success: 'success' },
}));

vi.mock('~/components/ScoreDialog', () => ({
  default: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="score-dialog">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

vi.mock('~/data/rules-data', () => ({
  getRulesApi: vi.fn(() => Promise.resolve({ scoresPerLetter: { A: 1, B: 3, C: 3 } })),
  getRulesLocal: vi.fn(() => ({ scoresPerLetter: { A: 1, B: 3, C: 3 } })),
}));

vi.mock('~/data/scores-data', () => ({
  getTopScores: vi.fn(() => Promise.resolve([])),
  saveScoreData: vi.fn(() => Promise.resolve({ message: 'Score saved!' })),
}));

vi.mock('~/constants', () => ({
  STALE_TIME: 1000,
}));

vi.mock('~/domain/config', () => ({
  TILE_COUNT: 10,
}));

describe('Index', () => {
  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  const renderWithQueryClient = (component: React.ReactElement) => {
    const queryClient = createQueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders by default', async () => {
    renderWithQueryClient(<Index />);
    await waitFor(() => {
      expect(screen.getByText('Scrabble Calculator')).toBeTruthy();
    });
  });

  it('displays the main heading', async () => {
    renderWithQueryClient(<Index />);
    await waitFor(() => {
      expect(screen.getByText('Scrabble Calculator')).toBeTruthy();
      expect(screen.getByText('Enter a word on the tiles below and check your score!')).toBeTruthy();
    });
  });

  it('shows initial score of 0', async () => {
    renderWithQueryClient(<Index />);
    await waitFor(() => {
      expect(screen.getByText('Score:')).toBeTruthy();
      expect(screen.getByText('0')).toBeTruthy();
    });
  });

  it('renders action buttons', async () => {
    renderWithQueryClient(<Index />);
    await waitFor(() => {
      expect(screen.getAllByTestId('action-button')).toHaveLength(3);
    });
  });

  it('renders letter grid', async () => {
    renderWithQueryClient(<Index />);
    await waitFor(() => {
      expect(screen.getByTestId('letter-grid')).toBeTruthy();
    });
  });

  it('renders head component', async () => {
    renderWithQueryClient(<Index />);
    await waitFor(() => {
      expect(screen.getByTestId('head')).toBeTruthy();
    });
  });
}); 