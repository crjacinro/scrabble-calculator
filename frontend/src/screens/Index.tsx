import { Head } from '~/components/Head/Head';
import React, { useEffect, useState } from 'react';
import LetterGrid from '~/components/LetterGrid/LetterGrid';
import ActionButton from '~/components/ActionButton/ActionButton';
import Loading from '~/components/Loading/Loading';
import Toast, { ToastType } from '~/components/Toast/Toast';
import ScoreDialog from '~/components/ScoreDialog/ScoreDialog';
import { useQuery } from '@tanstack/react-query';
import { getRulesApi } from '~/data/rules-data';
import { STALE_TIME } from '~/constants';
import { TILE_COUNT } from '~/domain/config';
import { getTopScores, saveScoreData } from '~/data/scores-data';
import { TopScore } from '~/domain/scores';
import { SpinnerIcon } from '~/assets/SpinnerIcon';
import { SaveIcon } from '~/assets/SaveIcon';
import { ScoresIcon } from '~/assets/ScoresIcon';
import { ResetIcon } from '~/assets/ResetIcon';

const Index = () => {
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

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['initialData'],
    queryFn: getRulesApi,
    staleTime: STALE_TIME,
  });
  const scrabbleRules = data;

  useEffect(() => {
    if (scrabbleRules && isError && error) {
      showToastMessage(error.message, ToastType.Error);
    }
  }, [isError, error]);

  useEffect(() => {
    let newScore = 0;
    tiles.forEach((tile) => {
      if (tile && scrabbleRules && scrabbleRules[tile]) {
        newScore += scrabbleRules[tile] ?? 0;
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

    if (scrabbleRules) {
      newTileScores[index] = scrabbleRules[value.toUpperCase()] ?? 0;
      setTileScores(newTileScores);
    }

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

      showToastMessage(response, ToastType.Success);
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

  if (!scrabbleRules) {
    return (
      <>
        <Head title="Scrabble Calculator" />
        <div className="min-h-screen bg-base-300 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-2">Scrabble Calculator</h1>
              <p className="text-base-content/70">Unable to load game files! Please try again</p>
            </div>
          </div>
        </div>
        <Toast message={toastMessage} type={toastType} isVisible={showToast} onClose={() => {}} duration={5000} />
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
              icon={<ResetIcon />}
              text="Reset Tiles"
            />
            <ActionButton
              onClick={handleViewTopScores}
              className="btn btn-secondary btn-md gap-2"
              icon={<ScoresIcon />}
              text="View Top Scores"
            />
            <ActionButton
              onClick={handleSaveScore}
              className="btn btn-accent btn-md gap-2"
              icon={<SaveIcon />}
              isLoading={isSavingScore}
              loadingIcon={<SpinnerIcon />}
              disabled={score === 0}
              text="Save Score"
            />
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
};

export default Index;
