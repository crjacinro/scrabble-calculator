import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-base-300 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-base-100 p-8 rounded-lg shadow-xl flex flex-col items-center gap-4">
        <div className="loading loading-spinner loading-lg text-primary" />
        <p className="text-base-content text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading; 