import type { Meta, StoryObj } from '@storybook/react';
import ActionButton from './ActionButton';
import { SpinnerIcon } from '~/assets/SpinnerIcon';

const meta: Meta<typeof ActionButton> = {
  title: 'Components/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    className: 'btn btn-primary',
    icon: <span>🚀</span>,
    text: 'Click me',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    className: 'btn btn-primary',
    icon: <span>🚀</span>,
    loadingIcon: <SpinnerIcon />,
    text: 'Loading...',
    isLoading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    className: 'btn btn-primary',
    icon: <span>🚀</span>,
    text: 'Disabled',
    disabled: true,
  },
};

// Different button styles
export const Secondary: Story = {
  args: {
    className: 'btn btn-secondary',
    icon: <span>📝</span>,
    text: 'Secondary',
  },
};

export const Accent: Story = {
  args: {
    className: 'btn btn-accent',
    icon: <span>✨</span>,
    text: 'Accent',
  },
};

export const Ghost: Story = {
  args: {
    className: 'btn btn-ghost',
    icon: <span>👻</span>,
    text: 'Ghost'
  },
};

// Large button
export const Large: Story = {
  args: {
    className: 'btn btn-primary btn-lg',
    icon: <span>🚀</span>,
    text: 'Large Button'
  },
};

// Small button
export const Small: Story = {
  args: {
    className: 'btn btn-primary btn-sm',
    icon: <span>🚀</span>,
    text: 'Small'
  },
};
