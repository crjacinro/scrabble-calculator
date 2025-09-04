import type { Meta, StoryObj } from '@storybook/react';
import ActionButton from './ActionButton';

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
    children: 'Click me',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    className: 'btn btn-primary',
    icon: <span>🚀</span>,
    loadingIcon: <span className="loading loading-spinner loading-sm"></span>,
    children: 'Loading...',
    isLoading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    className: 'btn btn-primary',
    icon: <span>🚀</span>,
    children: 'Disabled',
    disabled: true,
  },
};

// Different button styles
export const Secondary: Story = {
  args: {
    className: 'btn btn-secondary',
    icon: <span>📝</span>,
    children: 'Secondary',
  },
};

export const Accent: Story = {
  args: {
    className: 'btn btn-accent',
    icon: <span>✨</span>,
    children: 'Accent',
  },
};

export const Ghost: Story = {
  args: {
    className: 'btn btn-ghost',
    icon: <span>👻</span>,
    children: 'Ghost',
  },
};

// Large button
export const Large: Story = {
  args: {
    className: 'btn btn-primary btn-lg',
    icon: <span>🚀</span>,
    children: 'Large Button',
  },
};

// Small button
export const Small: Story = {
  args: {
    className: 'btn btn-primary btn-sm',
    icon: <span>🚀</span>,
    children: 'Small',
  },
};
