import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LetterGrid from './LetterGrid';

describe('LetterGrid', () => {
  const defaultProps = {
    tiles: ['R', 'E', 'A', 'C', 'T'],
    handleTileChange: vi.fn(),
    handleKeyDown: vi.fn(),
  };

  it('renders all tiles', () => {
    render(<LetterGrid {...defaultProps} />);

    defaultProps.tiles.forEach((tile, index) => {
      const input = screen.getByDisplayValue(tile);
      expect(input).toBeTruthy();
      expect(input.id).toBe(`tile-${index}`);
    });
  });

  it('calls handleTileChange when input value changes', () => {
    render(<LetterGrid {...defaultProps} />);

    const firstInput = screen.getByDisplayValue('R');
    fireEvent.change(firstInput, { target: { value: 'X' } });

    expect(defaultProps.handleTileChange).toHaveBeenCalledWith(0, 'X');
  });

  it('calls handleKeyDown when key is pressed', () => {
    render(<LetterGrid {...defaultProps} />);

    const firstInput = screen.getByDisplayValue('R');
    fireEvent.keyDown(firstInput, { key: 'Enter' });

    expect(defaultProps.handleKeyDown).toHaveBeenCalledWith(0, expect.any(Object));
  });

  it('displays letter scores when provided', () => {
    const letterScore = [1, 2, 3, 4, 5];
    render(<LetterGrid {...defaultProps} letterScore={letterScore} />);

    letterScore.forEach((score, _) => {
      if (score !== 0) {
        const scoreElement = screen.getByText(score.toString());
        expect(scoreElement).toBeTruthy();
      }
    });
  });

  it('limits input to single character', () => {
    render(<LetterGrid {...defaultProps} />);

    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    inputs.forEach((input) => {
      expect(input.maxLength).toBe(1);
    });
  });
});
