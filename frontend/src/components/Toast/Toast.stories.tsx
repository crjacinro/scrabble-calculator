import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toast, { ToastType } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [ToastType.Error, ToastType.Success, ToastType.Info],
    },
    duration: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
const ToastWrapper = (args: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleShow = () => {
    setIsVisible(true);
  };

  return (
    <div className="p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Toast Component Demo</h2>
        <p className="text-gray-600">Click the button below to show the toast notification.</p>
        <button onClick={handleShow} className="btn btn-primary">
          Show Toast
        </button>
        <Toast {...args} isVisible={isVisible} onClose={handleClose} />
      </div>
    </div>
  );
};

// Success toast
export const Success: Story = {
  render: ToastWrapper,
  args: {
    message: 'Operation completed successfully!',
    type: ToastType.Success,
    duration: 5000,
  },
};

// Error toast
export const Error: Story = {
  render: ToastWrapper,
  args: {
    message: 'Something went wrong. Please try again.',
    type: ToastType.Error,
    duration: 5000,
  },
};

// Info toast
export const Info: Story = {
  render: ToastWrapper,
  args: {
    message: 'Here is some useful information for you.',
    type: ToastType.Info,
    duration: 5000,
  },
};

// Long message
export const LongMessage: Story = {
  render: ToastWrapper,
  args: {
    message:
      'This is a very long message that demonstrates how the toast component handles longer text content. It should wrap properly and maintain good readability.',
    type: ToastType.Info,
    duration: 5000,
  },
};

// Short duration
export const ShortDuration: Story = {
  render: ToastWrapper,
  args: {
    message: 'This toast will disappear quickly!',
    type: ToastType.Success,
    duration: 1000,
  },
};

// No auto-close
export const NoAutoClose: Story = {
  render: ToastWrapper,
  args: {
    message: 'This toast will stay until manually closed.',
    type: ToastType.Info,
    duration: 0,
  },
};
