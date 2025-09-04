import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ActionButton from './ActionButton';

describe('ActionButton', () => {
  const defaultProps = {
    className: 'btn btn-primary',
    icon: <span data-testid="icon">🚀</span>,
    children: 'Click me',
  };

  it('renders with no issues with default properties', () => {
    render(<ActionButton {...defaultProps} />);

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText('Click me')).toBeTruthy();
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ActionButton {...defaultProps} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when isLoading is true', () => {
    const loadingIcon = <span data-testid="loading-icon">⏳</span>;
    render(<ActionButton {...defaultProps} isLoading loadingIcon={loadingIcon} />);

    expect(screen.getByTestId('loading-icon')).toBeTruthy();
    expect(screen.queryByTestId('icon')).toBeFalsy();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ActionButton {...defaultProps} disabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when isLoading is true', () => {
    render(<ActionButton {...defaultProps} isLoading />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
