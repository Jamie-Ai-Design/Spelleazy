import React, { useState } from 'react';
import { useSpellingGame } from '@/hooks/useSpellingGame';
import { GameMode } from '@/types/game';
import GameModeSelector from './GameModeSelector';
import WordInput from './WordInput';
import MissingLettersGame from './games/MissingLettersGame';
import RepetitionGame from './games/RepetitionGame';
import SpotErrorsGame from './games/SpotErrorsGame';
import HangmanGame from './games/HangmanGame';
import WordScrambleGame from './games/WordScrambleGame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Home, Star, ArrowLeft, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SpellingApp: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'words' | 'modes' | 'game' | 'results'>('home');
  const [selectedMode, setSelectedMode] = useState<GameMode>('missing-letters');
  const [ageGroup, setAgeGroup] = useState<string>('6-8');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { session, startGame, submitAnswer, nextWord } = useSpellingGame();

  const handleWordsSelected = (words: string[]) => {
    setSelectedWords(words);
    setScreen('modes');
  };

  const handleModeSelected = (mode: GameMode) => {
    setSelectedMode(mode);
    startGame(mode, selectedWords);
    setScreen('game');
  };

  const handleAnswer = (answer: string) => {
    return submitAnswer(answer);
  };

  const handleNext = () => {
    if (session && session.currentWordIndex >= session.words.length - 1) {
      setScreen('results');
    } else {
      nextWord();
    }
  };

  const handleRestart = () => {
    setScreen('home');
  };

  const renderGame = () => {
    if (!session) return null;
    
    const currentWord = session.words[session.currentWordIndex];
    const props = {
      word: currentWord,
      onAnswer: handleAnswer,
      onNext: handleNext,
      onBack: () => setScreen('modes'),
      lives: session.lives,
      score: session.score
    };

    switch (session.gameMode) {
      case 'missing-letters':
        return <MissingLettersGame {...props} />;
      case 'repetition':
        return <RepetitionGame {...props} />;
      case 'spot-errors':
        return <SpotErrorsGame {...props} />;
      case 'hangman':
        return <HangmanGame {...props} />;
      case 'word-scramble':
        return <WordScrambleGame {...props} />;
      default:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Coming Soon!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This game mode is being developed. Try another game!</p>
              <Button onClick={() => setScreen('modes')} className="mt-4">
                Back to Games
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  const HelpDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Missing Letters:</h4>
            <p className="text-sm text-gray-600">Fill in the blanks to complete the word</p>
          </div>
          <div>
            <h4 className="font-semibold">Repetition:</h4>
            <p className="text-sm text-gray-600">Type the word correctly multiple times</p>
          </div>
          <div>
            <h4 className="font-semibold">Spot Errors:</h4>
            <p className="text-sm text-gray-600">Find and fix the spelling mistakes</p>
          </div>
          <div>
            <h4 className="font-semibold">Hangman:</h4>
            <p className="text-sm text-gray-600">Guess the word letter by letter</p>
          </div>
          <div>
            <h4 className="font-semibold">Word Scramble:</h4>
            <p className="text-sm text-gray-600">Unscramble the letters to form the word</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
        <div className="max-w-4xl mx-auto pt-20">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
              🌟 Spelling Stars 🌟
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Master your spelling with fun games!
            </p>
            <div className="mb-6">
              <label className="text-white block mb-2">Age Group:</label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger className="w-48 mx-auto bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-8">6-8 years (Easy)</SelectItem>
                  <SelectItem value="9-12">9-12 years (Medium)</SelectItem>
                  <SelectItem value="13+">13+ years (Hard)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => setScreen('words')} 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-8 py-4 rounded-full shadow-lg"
              >
                Start Learning!
              </Button>
              <HelpDialog />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'words') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
        <div className="max-w-4xl mx-auto pt-10">
          <WordInput 
            onWordsSelected={handleWordsSelected} 
            onBack={() => setScreen('home')}
            ageGroup={ageGroup} 
          />
        </div>
      </div>
    );
  }

  if (screen === 'modes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 p-4">
        <div className="max-w-4xl mx-auto pt-10">
          <h2 className="text-4xl font-bold text-white text-center mb-8">Choose Your Game!</h2>
          <GameModeSelector 
            onSelectMode={handleModeSelected} 
            onBack={() => setScreen('words')}
          />
        </div>
      </div>
    );
  }

  if (screen === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 p-4">
        <div className="max-w-4xl mx-auto pt-10">
          <div className="text-center mb-6">
            <div className="text-white text-lg">
              Word {session ? session.currentWordIndex + 1 : 1} of {session ? session.words.length : 10}
            </div>
          </div>
          {renderGame()}
        </div>
      </div>
    );
  }

  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="text-center">
            <CardHeader>
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-3xl">Great Job!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold text-green-600">
                Final Score: {session?.score || 0}
              </div>
              <div className="flex justify-center gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleRestart} size="lg" className="gap-2">
                  <Home className="w-4 h-4" />
                  Play Again
                </Button>
                <Button onClick={() => setScreen('modes')} variant="outline" size="lg" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Try Different Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default SpellingApp;