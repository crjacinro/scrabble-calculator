import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Toast, { ToastType } from './Toast';

describe('Toast', () => {
  const defaultProps = {
    message: 'Test message',
    type: ToastType.Info,
    isVisible: true,
    onClose: vi.fn(),
  };

  it('renders when visible', () => {
    render(<Toast {...defaultProps} />);

    expect(screen.getByText('Test message')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    render(<Toast {...defaultProps} isVisible={false} />);

    expect(screen.queryByText('Test message')).toBeFalsy();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Toast {...defaultProps} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes for different toast types', () => {
    const { rerender } = render(<Toast {...defaultProps} type={ToastType.Error} />);
    expect(screen.getByText('Test message').closest('div')?.className).toContain('alert-error');

    rerender(<Toast {...defaultProps} type={ToastType.Success} />);
    expect(screen.getByText('Test message').closest('div')?.className).toContain('alert-success');

    rerender(<Toast {...defaultProps} type={ToastType.Info} />);
    expect(screen.getByText('Test message').closest('div')?.className).toContain('alert-info');
  });

  it('has correct positioning classes', () => {
    render(<Toast {...defaultProps} />);

    const container = screen.getByText('Test message').closest('div')?.parentElement;
    expect(container?.className).toContain('fixed');
    expect(container?.className).toContain('top-4');
    expect(container?.className).toContain('right-4');
  });
});
