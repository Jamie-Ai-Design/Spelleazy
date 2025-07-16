import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpellingWord } from '@/types/game';
import { CheckCircle, XCircle, Heart } from 'lucide-react';

interface MissingLettersGameProps {
  word: SpellingWord;
  onAnswer: (answer: string) => boolean;
  onNext: () => void;
  lives: number;
  score: number;
}

const MissingLettersGame: React.FC<MissingLettersGameProps> = ({
  word,
  onAnswer,
  onNext,
  lives,
  score
}) => {
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [maskedWord, setMaskedWord] = useState('');

  useEffect(() => {
    // Create masked version with 2-3 missing letters
    const wordLength = word.word.length;
    const numMissing = Math.min(3, Math.max(2, Math.floor(wordLength / 3)));
    const positions = new Set<number>();
    
    while (positions.size < numMissing) {
      positions.add(Math.floor(Math.random() * wordLength));
    }
    
    const masked = word.word
      .split('')
      .map((letter, index) => positions.has(index) ? '_' : letter)
      .join('');
    
    setMaskedWord(masked);
    setUserInput('');
    setShowResult(false);
  }, [word]);

  const handleSubmit = () => {
    const correct = onAnswer(userInput);
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleSubmit();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Missing Letters</Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Score: {score}</span>
            <div className="flex gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <Heart key={i} className="w-4 h-4 text-red-500 fill-current" />
              ))}
            </div>
          </div>
        </div>
        <CardTitle className="text-center text-2xl">
          Complete the word:
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold tracking-wider bg-gray-100 p-4 rounded-lg">
            {maskedWord}
          </div>
        </div>
        
        {!showResult ? (
          <div className="space-y-4">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type the complete word..."
              className="text-center text-lg"
              autoFocus
            />
            <Button 
              onClick={handleSubmit} 
              disabled={!userInput.trim()}
              className="w-full"
              size="lg"
            >
              Submit Answer
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  Correct! Well done!
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  The word was: {word.word}
                </>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Moving to next word...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MissingLettersGame;