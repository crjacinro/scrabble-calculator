import React from 'react';

interface LetterGridProps {
  tiles: string[];
  letterScore?: number[];
  handleTileChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TilesGrid: React.FC<LetterGridProps> = ({ tiles, handleTileChange, handleKeyDown, letterScore }) => (
  <div className="bg-base-100 rounded-box p-8 shadow-xl mb-8">
    <div className="flex justify-center items-center gap-3 mb-6">
      {tiles.map((tile, index) => (
        <div key={index} className="relative">
          <input
            id={`tile-${index}`}
            type="text"
            maxLength={1}
            value={tile}
            onChange={(e) => handleTileChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-16 text-center text-2xl font-bold bg-base-200 border-2 border-primary/30 rounded-lg focus:border-primary focus:outline-none transition-all duration-200 hover:border-primary/50 uppercase"
            placeholder=""
            autoFocus={index === 0}
          />
          <div className="absolute -bottom-0 right-1 transform -translate-x-1/2 text-xs text-base-content/50">
            {(letterScore && letterScore[index] !== 0 && letterScore[index]) ?? ""}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TilesGrid;