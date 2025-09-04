import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ScoreDialog from './ScoreDialog';
import { TopScore } from '~/domain/scores';

const meta: Meta<typeof ScoreDialog> = {
  title: 'Components/ScoreDialog',
  component: ScoreDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for stories
const mockScores: TopScore[] = [
  {
    rank: '1',
    wordUsed: 'SCRABBLE',
    score: 142,
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    rank: '2',
    wordUsed: 'QUIZZES',
    score: 128,
    timestamp: '2024-01-14T15:45:00Z',
  },
  {
    rank: '3',
    wordUsed: 'JAZZIER',
    score: 115,
    timestamp: '2024-01-13T09:20:00Z',
  },
  {
    rank: '4',
    wordUsed: 'PIZZAZZ',
    score: 98,
    timestamp: '2024-01-12T14:10:00Z',
  },
  {
    rank: '5',
    wordUsed: 'BUZZARD',
    score: 87,
    timestamp: '2024-01-11T11:30:00Z',
  },
  {
    rank: '6',
    wordUsed: 'FUZZBOX',
    score: 76,
    timestamp: '2024-01-10T16:45:00Z',
  },
  {
    rank: '7',
    wordUsed: 'JACKBOX',
    score: 65,
    timestamp: '2024-01-09T13:20:00Z',
  },
  {
    rank: '8',
    wordUsed: 'KICKBOX',
    score: 54,
    timestamp: '2024-01-08T08:15:00Z',
  },
  {
    rank: '9',
    wordUsed: 'LOCKBOX',
    score: 43,
    timestamp: '2024-01-07T12:30:00Z',
  },
  {
    rank: '10',
    wordUsed: 'POCKBOX',
    score: 32,
    timestamp: '2024-01-06T17:00:00Z',
  },
];

// Interactive wrapper component
const ScoreDialogWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Score Dialog Demo</h2>
        <p className="text-gray-600">Click the button below to open the score dialog.</p>
        <button onClick={handleOpen} className="btn btn-primary">
          Show Top Scores
        </button>
        <ScoreDialog {...args} isOpen={isOpen} onClose={handleClose} />
      </div>
    </div>
  );
};

// Default with scores
export const Default: Story = {
  render: ScoreDialogWrapper,
  args: {
    scores: mockScores,
    isLoading: false,
  },
};

// Loading state
export const Loading: Story = {
  render: ScoreDialogWrapper,
  args: {
    scores: [],
    isLoading: true,
  },
};

// Empty state
export const Empty: Story = {
  render: ScoreDialogWrapper,
  args: {
    scores: [],
    isLoading: false,
  },
};

// Few scores
export const FewScores: Story = {
  render: ScoreDialogWrapper,
  args: {
    scores: mockScores.slice(0, 3),
    isLoading: false,
  },
};

// Single score
export const SingleScore: Story = {
  render: ScoreDialogWrapper,
  args: {
    scores: [mockScores[0]],
    isLoading: false,
  },
};
