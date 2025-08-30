import React from 'react';

type ActionButtonProps = {
  onClick?: () => void;
  className: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, className, icon, children }) => (
  <button onClick={onClick} className={className}>
    {icon}
    {children}
  </button>
);

export default ActionButton;