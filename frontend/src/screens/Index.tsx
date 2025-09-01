import { Head } from '~/components/Head';
import React, { useEffect, useState } from 'react';
import LetterGrid from '~/components/LetterGrid';
import ActionButton from '~/components/ActionButton';
import Loading from '~/components/Loading';
import Toast, { ToastType } from '~/components/Toast';
import ScoreDialog from '~/components/ScoreDialog';
import { useQuery } from '@tanstack/react-query';
import { getRulesApi, getRulesLocal } from '~/data/rules-data';
import { STALE_TIME } from '~/constants';
import { TILE_COUNT } from '~/domain/config';
import { getTopScores, saveScoreData } from '~/data/scores-data';
import { TopScore } from '~/domain/scores';

function Index() {
  const [tiles, setTiles] = useState<string[]>(Array(TILE_COUNT).fill(''));
  const [tileScores, setTileScores] = useState<number[]>(Array(TILE_COUNT).fill(''));
  const [score, setScore] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>(ToastType.Info);
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [topScores, setTopScores] = useState<TopScore[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(false);

  const scrabbleRules = getRulesLocal();

  const { error, isLoading, isError } = useQuery({
    queryKey: ['initialData'],
    queryFn: getRulesApi,
    staleTime: STALE_TIME,
  });

  useEffect(() => {
    if (isError && error) {
      showToastMessage(error.message, ToastType.Error);
    }
  }, [isError, error]);

  useEffect(() => {
    let newScore = 0;
    tiles.forEach((tile) => {
      if (tile && scrabbleRules && scrabbleRules.scoresPerLetter[tile]) {
        newScore += scrabbleRules.scoresPerLetter[tile];
      }
    });
    setScore(newScore);
  }, [tiles]);

  const handleTileChange = (index: number, value: string) => {
    if (!/^[A-Za-z]+$/.test(value) && value !== '') {
      showToastMessage('Invalid letter. Please enter a letter between A-Z only', ToastType.Info);
      return;
    }
    const newTiles = [...tiles];
    newTiles[index] = value.toUpperCase();
    setTiles(newTiles);

    const newTileScores = [...tileScores];
    newTileScores[index] = scrabbleRules.scoresPerLetter[value.toUpperCase()] || 0;
    setTileScores(newTileScores);

    if (value && index < 9) {
      const nextInput = document.getElementById(`tile-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !tiles[index] && index > 0) {
      const prevInput = document.getElementById(`tile-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const resetTiles = () => {
    setTiles(Array(TILE_COUNT).fill(''));
    setTileScores(Array(TILE_COUNT).fill(0));
    setScore(0);
  };

  const showToastMessage = (message: string, type: ToastType) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleSaveScore = async () => {
    const word = tiles.filter((tile) => tile).join('');
    setIsSavingScore(true);
    try {
      const response = await saveScoreData({
        score,
        wordUsed: word,
      });

      showToastMessage(response.message, ToastType.Success);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save score';
      showToastMessage(errorMessage, ToastType.Error);
    } finally {
      setIsSavingScore(false);
    }
  };

  const handleViewTopScores = async () => {
    setShowScoreDialog(true);
    setIsLoadingScores(true);
    try {
      const scores = await getTopScores();
      setTopScores(scores);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load top scores';
      showToastMessage(errorMessage, ToastType.Error);
      setShowScoreDialog(false);
    } finally {
      setIsLoadingScores(false);
    }
  };

  const closeScoreDialog = () => {
    setShowScoreDialog(false);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  if (isLoading) {
    return (
      <>
        <Head title="Scrabble Calculator" />
        <Loading message="Loading Scrabble Calculator..." />
      </>
    );
  }

  return (
    <>
      <Head title="Scrabble Calculator" />
      <div className="min-h-screen bg-base-300 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Scrabble Calculator</h1>
            <p className="text-base-content/70">Enter a word on the tiles below and check your score!</p>
          </div>
          <LetterGrid
            tiles={tiles}
            letterScore={tileScores}
            handleTileChange={handleTileChange}
            handleKeyDown={handleKeyDown}
          />
          <div className="flex flex-wrap gap-4 justify-center p-6  mb-6">
            <ActionButton
              onClick={resetTiles}
              className="btn btn-primary btn-md gap-2"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
            >
              Reset Tiles
            </ActionButton>
            <ActionButton
              onClick={handleViewTopScores}
              className="btn btn-secondary btn-md gap-2"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
            >
              View Top Scores
            </ActionButton>
            <ActionButton
              onClick={handleSaveScore}
              className="btn btn-accent btn-md gap-2"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
              isLoading={isSavingScore}
              loadingIcon={
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              }
              disabled={score === 0}
            >
              Save Score
            </ActionButton>
          </div>
          <div className="flex items-center justify-center gap-4">
            <span className="text-2xl font-semibold text-base-content">Score:</span>
            <div className="text-primary-content px-6 py-3 rounded-box">
              <span className="text-3xl font-bold text-base-content">{score}</span>
            </div>
          </div>
        </div>
      </div>
      <Toast message={toastMessage} type={toastType} isVisible={showToast} onClose={closeToast} duration={5000} />
      <ScoreDialog isOpen={showScoreDialog} onClose={closeScoreDialog} scores={topScores} isLoading={isLoadingScores} />
    </>
  );
}

export default Index;
