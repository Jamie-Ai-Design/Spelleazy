import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SpellingWord } from '@/types/game';
import { CheckCircle, XCircle, Heart, RotateCcw } from 'lucide-react';

interface RepetitionGameProps {
  word: SpellingWord;
  onAnswer: (answer: string) => boolean;
  onNext: () => void;
  lives: number;
  score: number;
}

const RepetitionGame: React.FC<RepetitionGameProps> = ({
  word,
  onAnswer,
  onNext,
  lives,
  score
}) => {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showWord, setShowWord] = useState(true);
  
  const requiredCorrect = 3;

  useEffect(() => {
    setAttempts(0);
    setCorrectAttempts(0);
    setShowResult(false);
    setUserInput('');
    setShowWord(true);
    
    // Hide word after 3 seconds
    const timer = setTimeout(() => {
      setShowWord(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [word]);

  const handleSubmit = () => {
    const correct = userInput.toLowerCase() === word.word.toLowerCase();
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      setCorrectAttempts(prev => prev + 1);
      onAnswer(userInput);
      
      if (correctAttempts + 1 >= requiredCorrect) {
        setShowResult(true);
        setTimeout(() => {
          onNext();
        }, 2000);
      } else {
        setUserInput('');
        setTimeout(() => {
          setIsCorrect(false);
        }, 1000);
      }
    } else {
      onAnswer(userInput);
      setTimeout(() => {
        setIsCorrect(false);
        setUserInput('');
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleSubmit();
    }
  };

  const progress = (correctAttempts / requiredCorrect) * 100;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Repetition</Badge>
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
          Type the word {requiredCorrect} times:
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          {showWord ? (
            <div className="text-4xl font-bold text-blue-600 p-4 bg-blue-50 rounded-lg">
              {word.word}
            </div>
          ) : (
            <div className="text-lg text-gray-500 p-4 border-2 border-dashed rounded-lg">
              Remember the word and type it below
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress: {correctAttempts}/{requiredCorrect}</span>
            <span>Attempts: {attempts}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {!showResult ? (
          <div className="space-y-4">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type the word..."
              className={`text-center text-lg ${
                isCorrect === true ? 'border-green-500' : 
                isCorrect === false && userInput ? 'border-red-500' : ''
              }`}
              autoFocus
            />
            <Button 
              onClick={handleSubmit} 
              disabled={!userInput.trim()}
              className="w-full"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Submit ({correctAttempts}/{requiredCorrect})
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-green-600">
              <CheckCircle className="w-6 h-6" />
              Perfect! You've mastered this word!
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

export default RepetitionGame;