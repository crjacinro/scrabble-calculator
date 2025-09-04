import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Page404 from '~/screens/404';

describe('Page 404', () => {
  it('renders without crashing', async () => {
    render(<Page404 />);
    await waitFor(() => {
      expect(screen.getByText('The page is not found.')).toBeTruthy();
    });
  });
});
