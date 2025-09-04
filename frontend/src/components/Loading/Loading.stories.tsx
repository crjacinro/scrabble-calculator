import type { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default loading
export const Default: Story = {
  args: {
    message: 'Loading...',
  },
};

// Custom message
export const CustomMessage: Story = {
  args: {
    message: 'Calculating your score...',
  },
};

// Long message
export const LongMessage: Story = {
  args: {
    message: 'Please wait while we process your request and validate the data...',
  },
};

// Short message
export const ShortMessage: Story = {
  args: {
    message: 'Wait',
  },
};

// No message (empty string)
export const NoMessage: Story = {
  args: {
    message: '',
  },
};
