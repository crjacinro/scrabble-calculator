import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import LetterGrid from './LetterGrid';

const meta: Meta<typeof LetterGrid> = {
  title: 'Components/LetterGrid',
  component: LetterGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tiles: {
      control: 'object',
    },
    letterScore: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
const LetterGridWrapper = (args: any) => {
  const [tiles, setTiles] = useState(args.tiles || ['', '', '', '', '', '', '']);

  const handleTileChange = (index: number, value: string) => {
    const newTiles = [...tiles];
    newTiles[index] = value.toUpperCase();
    setTiles(newTiles);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && tiles[index] === '') {
      // Move to previous tile
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        const prevInput = document.getElementById(`tile-${prevIndex}`);
        prevInput?.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        const prevInput = document.getElementById(`tile-${prevIndex}`);
        prevInput?.focus();
      }
    } else if (e.key === 'ArrowRight') {
      const nextIndex = index + 1;
      if (nextIndex < tiles.length) {
        const nextInput = document.getElementById(`tile-${nextIndex}`);
        nextInput?.focus();
      }
    }
  };

  return <LetterGrid {...args} tiles={tiles} handleTileChange={handleTileChange} handleKeyDown={handleKeyDown} />;
};

// Default empty grid
export const Default: Story = {
  render: LetterGridWrapper,
  args: {
    tiles: ['', '', '', '', '', '', ''],
    letterScore: [0, 0, 0, 0, 0, 0, 0],
  },
};

// Grid with some letters filled
export const PartiallyFilled: Story = {
  render: LetterGridWrapper,
  args: {
    tiles: ['T', 'E', 'S', 'T', '', '', ''],
    letterScore: [1, 3, 1, 1],
  },
};

// Grid with all letters filled
export const FullyFilled: Story = {
  render: LetterGridWrapper,
  args: {
    tiles: ['T', 'E', 'S', 'T', 'I', 'N', 'G'],
    letterScore: [1, 3, 1, 1, 3, 3, 1],
  },
};

// Grid with high-value letters
export const HighValueLetters: Story = {
  render: LetterGridWrapper,
  args: {
    tiles: ['Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z'],
    letterScore: [10, 10, 10, 10, 10, 10, 10],
  },
};

// Grid with mixed case (should be converted to uppercase)
export const MixedCase: Story = {
  render: LetterGridWrapper,
  args: {
    tiles: ['s', 'c', 'r', 'a', 'b', 'b', 'l', 'e'],
    letterScore: [1, 3, 1, 1, 3, 3, 1, 1],
  },
};
