import { useState, useCallback } from 'react';
import { SpellingWord, GameSession, GameMode } from '@/types/game';
import { getRandomWords, getDifficultyLevel } from '@/data/words';
import { toast } from '@/components/ui/use-toast';

export const useSpellingGame = () => {
  const [session, setSession] = useState<GameSession | null>(null);
  const [userWords, setUserWords] = useState<string[]>([]);

  const createWordsFromList = useCallback((words: string[]): SpellingWord[] => {
    return words.map(word => ({
      id: Math.random().toString(36).substr(2, 9),
      word: word.toLowerCase(),
      difficulty: getDifficultyLevel(word),
      attempts: 0,
      correct: 0
    }));
  }, []);

  const startGame = useCallback((mode: GameMode, words?: string[]) => {
    const gameWords = words || getRandomWords(10);
    const spellingWords = createWordsFromList(gameWords);
    
    const newSession: GameSession = {
      id: Date.now().toString(),
      words: spellingWords,
      currentWordIndex: 0,
      score: 0,
      lives: 3,
      gameMode: mode,
      startTime: new Date()
    };
    
    setSession(newSession);
    toast({ title: 'Game Started!', description: `Playing ${mode} mode` });
  }, [createWordsFromList]);

  const submitAnswer = useCallback((answer: string) => {
    if (!session) return false;
    
    const currentWord = session.words[session.currentWordIndex];
    const isCorrect = answer.toLowerCase() === currentWord.word;
    
    setSession(prev => {
      if (!prev) return prev;
      
      const updatedWords = [...prev.words];
      updatedWords[prev.currentWordIndex] = {
        ...currentWord,
        attempts: currentWord.attempts + 1,
        correct: isCorrect ? currentWord.correct + 1 : currentWord.correct
      };
      
      return {
        ...prev,
        words: updatedWords,
        score: isCorrect ? prev.score + 10 : prev.score,
        lives: isCorrect ? prev.lives : prev.lives - 1
      };
    });
    
    return isCorrect;
  }, [session]);

  const nextWord = useCallback(() => {
    if (!session) return;
    
    setSession(prev => {
      if (!prev) return prev;
      
      const nextIndex = prev.currentWordIndex + 1;
      if (nextIndex >= prev.words.length) {
        return { ...prev, endTime: new Date() };
      }
      
      return { ...prev, currentWordIndex: nextIndex };
    });
  }, [session]);

  return {
    session,
    userWords,
    setUserWords,
    startGame,
    submitAnswer,
    nextWord
  };
};