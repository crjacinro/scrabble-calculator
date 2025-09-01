# Testing Setup

This project uses Vitest for unit testing with React Testing Library.

## Available Scripts

- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once and exit
- `npm run test:ui` - Run tests with Vitest UI

## Test Structure

- Tests are located in the `src/test/` directory
- Test files should follow the naming convention: `*.test.tsx` or `*.test.ts`
- The test setup is configured in `src/test/setup.ts`

## Writing Tests

Tests use React Testing Library for component testing. Example:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentName } from '../path/to/component'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })
})
```

## Dependencies

- `vitest` - Test runner
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom Jest matchers for DOM elements
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for testing 