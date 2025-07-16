import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shuffle, CheckCircle, XCircle } from 'lucide-react';

interface WordScrambleGameProps {
  word: string;
  onAnswer: (answer: string) => boolean;
  onNext: () => void;
  lives: number;
  score: number;
}

const WordScrambleGame: React.FC<WordScrambleGameProps> = ({
  word,
  onAnswer,
  onNext,
  lives,
  score
}) => {
  const [scrambledWord, setScrambledWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Scramble the word
    const letters = word.split('');
    const scrambled = letters.sort(() => Math.random() - 0.5).join('');
    setScrambledWord(scrambled);
    setUserAnswer('');
    setFeedback(null);
    setShowAnswer(false);
  }, [word]);

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === word.toLowerCase()) {
      setFeedback('correct');
      onAnswer(userAnswer);
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      setFeedback('incorrect');
      const isCorrect = onAnswer(userAnswer);
      if (!isCorrect) {
        setShowAnswer(true);
        setTimeout(() => {
          onNext();
        }, 2000);
      }
    }
  };

  const handleShuffle = () => {
    const letters = scrambledWord.split('');
    const reshuffled = letters.sort(() => Math.random() - 0.5).join('');
    setScrambledWord(reshuffled);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Word Scramble</CardTitle>
        <div className="flex justify-between items-center">
          <Badge variant="outline">Lives: {lives}</Badge>
          <Badge variant="outline">Score: {score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-lg mb-4">Unscramble this word:</p>
          <div className="text-4xl font-bold text-blue-600 mb-4 tracking-widest">
            {scrambledWord.toUpperCase()}
          </div>
          <Button onClick={handleShuffle} variant="outline" size="sm" className="gap-2">
            <Shuffle className="w-4 h-4" />
            Shuffle Again
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type the unscrambled word..."
            className="text-center text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={showAnswer}
          />
          
          {!showAnswer && (
            <Button onClick={handleSubmit} className="w-full" size="lg">
              Submit Answer
            </Button>
          )}
        </div>

        {feedback === 'correct' && (
          <div className="text-center text-green-600 flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Correct! Well done!</span>
          </div>
        )}

        {feedback === 'incorrect' && (
          <div className="text-center text-red-600 flex items-center justify-center gap-2">
            <XCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Try again!</span>
          </div>
        )}

        {showAnswer && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-lg">The correct word was:</p>
            <p className="text-2xl font-bold text-blue-600">{word.toUpperCase()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordScrambleGame;