import React from 'react';

type ActionButtonProps = {
  onClick?: () => void;
  className: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
  disabled?: boolean;
  text?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  icon,
  isLoading = false,
  loadingIcon,
  disabled = false,
  text = '',
}) => (
  <button onClick={onClick} className={className} disabled={disabled || isLoading}>
    {isLoading && loadingIcon ? loadingIcon : icon}
    {text}
  </button>
);

export default ActionButton;