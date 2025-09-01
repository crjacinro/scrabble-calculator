import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../root/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
