import React from 'react';

type ActionButtonProps = {
  onClick?: () => void;
  className: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
  disabled?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  className, 
  icon, 
  children, 
  isLoading = false, 
  loadingIcon,
  disabled = false 
}) => (
  <button 
    onClick={onClick} 
    className={className} 
    disabled={disabled || isLoading}
  >
    {isLoading && loadingIcon ? loadingIcon : icon}
    {children}
  </button>
);

export default ActionButton;