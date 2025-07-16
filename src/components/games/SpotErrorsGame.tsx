import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpellingWord } from '@/types/game';
import { CheckCircle, XCircle, Heart, Eye } from 'lucide-react';

interface SpotErrorsGameProps {
  word: SpellingWord;
  onAnswer: (answer: string) => boolean;
  onNext: () => void;
  lives: number;
  score: number;
}

const SpotErrorsGame: React.FC<SpotErrorsGameProps> = ({
  word,
  onAnswer,
  onNext,
  lives,
  score
}) => {
  const [misspelledWord, setMisspelledWord] = useState('');
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorPositions, setErrorPositions] = useState<number[]>([]);

  useEffect(() => {
    // Create misspelled version
    const wordArray = word.word.split('');
    const numErrors = Math.min(2, Math.max(1, Math.floor(wordArray.length / 4)));
    const positions = new Set<number>();
    
    while (positions.size < numErrors) {
      positions.add(Math.floor(Math.random() * wordArray.length));
    }
    
    const errors = Array.from(positions);
    setErrorPositions(errors);
    
    // Replace letters at error positions with wrong letters
    errors.forEach(pos => {
      const originalLetter = wordArray[pos];
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      let newLetter;
      do {
        newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      } while (newLetter === originalLetter);
      wordArray[pos] = newLetter;
    });
    
    setMisspelledWord(wordArray.join(''));
    setSelectedLetters([]);
    setShowResult(false);
  }, [word]);

  const handleLetterClick = (index: number) => {
    if (showResult) return;
    
    setSelectedLetters(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSubmit = () => {
    const correct = selectedLetters.length === errorPositions.length &&
                   selectedLetters.every(pos => errorPositions.includes(pos));
    
    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(correct ? word.word : 'wrong');
    
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Spot Errors</Badge>
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
          <Eye className="w-6 h-6 inline mr-2" />
          Find the spelling errors:
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold tracking-wider p-4 bg-gray-50 rounded-lg">
            {misspelledWord.split('').map((letter, index) => (
              <span
                key={index}
                className={`cursor-pointer px-1 py-2 rounded transition-colors ${
                  selectedLetters.includes(index)
                    ? 'bg-red-200 text-red-800'
                    : 'hover:bg-gray-200'
                } ${
                  showResult && errorPositions.includes(index)
                    ? 'bg-red-500 text-white'
                    : ''
                } ${
                  showResult && selectedLetters.includes(index) && !errorPositions.includes(index)
                    ? 'bg-orange-200 text-orange-800'
                    : ''
                }`}
                onClick={() => handleLetterClick(index)}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Click on the letters that are spelled incorrectly
        </div>
        
        {!showResult ? (
          <div className="space-y-4">
            <div className="text-center text-sm">
              Selected: {selectedLetters.length} letter(s)
            </div>
            <Button 
              onClick={handleSubmit} 
              disabled={selectedLetters.length === 0}
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
                  Excellent! You found all the errors!
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  The correct word is: {word.word}
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

export default SpotErrorsGame;