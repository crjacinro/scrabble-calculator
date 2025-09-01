import React from 'react';
import { TopScore } from '~/domain/scores';

interface ScoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  scores: TopScore[];
  isLoading: boolean;
}

const ScoreDialog: React.FC<ScoreDialogProps> = ({ isOpen, onClose, scores, isLoading }) => {
  if (!isOpen) return null;

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg p-6 max-w-2xl w-2/6 mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary">Top 10 Scores</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle" aria-label="Close dialog">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-8 text-base-content/70">
            <p>No scores found.</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[60vh]">
            <div className="grid gap-3">
              {scores.map((score, index) => (
                <div
                  key={score.rank}
                  className={`p-4 rounded-lg border ${
                    index === 0
                      ? 'bg-base-200 border-yellow-300'
                      : index === 1
                        ? 'bg-base-200 border-gray-300'
                        : index === 2
                          ? 'bg-base-200 border-orange-300'
                          : 'bg-base-200 border-base-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? 'bg-yellow-500 text-white'
                            : index === 1
                              ? 'bg-gray-500 text-white'
                              : index === 2
                                ? 'bg-orange-500 text-white'
                                : 'bg-primary text-primary-content'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{score.wordUsed}</div>
                        <div className="text-sm text-base-content/70">{formatTimestamp(score.timestamp)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{score.score}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreDialog;
