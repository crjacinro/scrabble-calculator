import { Head } from '~/components/components/Head';
import React, { useState } from 'react';
import LetterGrid from '~/components/components/LetterGrid';
import ActionButton from '~/components/components/ActionButton';

function Index() {
  const [tiles, setTiles] = useState<string[]>(Array(10).fill(''));
  const [score, setScore] = useState<number>(0);

  const handleTileChange = (index: number, value: string) => {
    const newTiles = [...tiles];
    newTiles[index] = value.toUpperCase();
    setTiles(newTiles);

    // Auto-focus next tile if current tile is filled
    if (value && index < 9) {
      const nextInput = document.getElementById(`tile-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous tile
    if (e.key === 'Backspace' && !tiles[index] && index > 0) {
      const prevInput = document.getElementById(`tile-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const resetTiles = () => {
    setTiles(Array(10).fill(''));
    setScore(0);
    // Focus first tile
    const firstInput = document.getElementById('tile-0');
    if (firstInput) {
      firstInput.focus();
    }
  };

  return (
    <>
      <Head title="Scrabble Calculator" />
      <div className="min-h-screen bg-base-300 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Scrabble Calculator
            </h1>
            <p className="text-base-content/70">
              Enter your 10 letters to calculate your score
            </p>
          </div>

          {/* Tiles Grid */}
          <LetterGrid
            tiles={tiles}
            handleTileChange={handleTileChange}
            handleKeyDown={handleKeyDown}
          />

          {/* Action Buttons */}
          <div className="bg-base-100 rounded-box p-6 shadow-xl mb-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <ActionButton
                onClick={resetTiles}
                className="btn btn-primary btn-lg gap-2"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              >
                Reset Tiles
              </ActionButton>

              <ActionButton
                className="btn btn-secondary btn-lg gap-2"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              >
                View Top Scores
              </ActionButton>

              <ActionButton
                className="btn btn-accent btn-lg gap-2"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                Save Score
              </ActionButton>
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-base-100 rounded-box p-6 shadow-xl text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl font-semibold text-base-content">Score:</span>
              <div className="bg-primary text-primary-content px-6 py-3 rounded-box">
                <span className="text-3xl font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
