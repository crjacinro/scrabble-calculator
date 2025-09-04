import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ScoreDialog from './ScoreDialog';
import { TopScore } from '~/domain/scores';

// Mock the domain module
vi.mock('~/domain/scores', () => ({
  TopScore: vi.fn(),
}));

describe('ScoreDialog', () => {
  const mockScores: TopScore[] = [
    {
      rank: '1',
      wordUsed: 'EXCITING',
      score: 18,
      timestamp: '2024-01-01T10:00:00Z',
    },
    {
      rank: '2',
      wordUsed: 'REACT',
      score: 10,
      timestamp: '2024-01-01T11:00:00Z',
    },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    scores: mockScores,
    isLoading: false,
  };

  it('renders when open', () => {
    render(<ScoreDialog {...defaultProps} />);

    expect(screen.getByText('Top 10 Scores')).toBeTruthy();
  });

  it('does not render when closed', () => {
    render(<ScoreDialog {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Top 10 Scores')).toBeFalsy();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ScoreDialog {...defaultProps} />);

    const closeButton = screen.getByLabelText('Close dialog');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('shows no scores message when scores array is empty', () => {
    render(<ScoreDialog {...defaultProps} scores={[]} />);

    expect(screen.getByText('No scores found.')).toBeTruthy();
  });

  it('displays all scores when provided', () => {
    render(<ScoreDialog {...defaultProps} />);

    expect(screen.getByText('EXCITING')).toBeTruthy();
    expect(screen.getByText('REACT')).toBeTruthy();
  });

  it('displays scores with correctly', () => {
    render(<ScoreDialog {...defaultProps} />);

    expect(screen.getByText('18')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
  });
});
