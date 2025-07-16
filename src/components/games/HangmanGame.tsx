import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpellingWord } from '@/types/game';
import { CheckCircle, XCircle, Heart, ArrowLeft } from 'lucide-react';

interface HangmanGameProps {
  word: SpellingWord;
  onAnswer: (answer: string) => boolean;
  onNext: () => void;
  onBack: () => void;
  lives: number;
  score: number;
}

const HangmanGame: React.FC<HangmanGameProps> = ({ word, onAnswer, onNext, onBack, lives, score }) => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const maxWrong = 6;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const displayWord = word.word.split('').map(letter => 
    guessedLetters.includes(letter) ? letter : '_'
  ).join(' ');

  const isComplete = word.word.split('').every(letter => guessedLetters.includes(letter));
  const isLost = wrongGuesses >= maxWrong;

  useEffect(() => {
    if (isComplete && !showResult) {
      setIsWon(true);
      setShowResult(true);
      onAnswer(word.word);
      setTimeout(onNext, 2000);
    } else if (isLost && !showResult) {
      setIsWon(false);
      setShowResult(true);
      onAnswer('wrong');
      setTimeout(onNext, 2000);
    }
  }, [isComplete, isLost, showResult, word.word, onAnswer, onNext]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || showResult) return;
    
    setGuessedLetters(prev => [...prev, letter]);
    
    if (!word.word.includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const hangmanParts = ['head', 'body', 'left arm', 'right arm', 'left leg', 'right leg'];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Badge variant="outline">Hangman</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Score: {score}</span>
            <div className="flex gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-red-500 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            Wrong guesses: {wrongGuesses}/{maxWrong}
          </div>
          <div className="text-3xl font-mono font-bold tracking-wider">
            {displayWord}
          </div>
        </div>
        
        <div className="text-center text-sm text-red-600">
          {hangmanParts.slice(0, wrongGuesses).join(', ')}
        </div>
        
        {!showResult ? (
          <div className="grid grid-cols-6 gap-2">
            {alphabet.map(letter => (
              <Button
                key={letter}
                variant={guessedLetters.includes(letter) ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                className="h-8 text-xs"
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${
              isWon ? 'text-green-600' : 'text-red-600'
            }`}>
              {isWon ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  You won!
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  The word was: {word.word}
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HangmanGame;