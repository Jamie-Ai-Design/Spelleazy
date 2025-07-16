export interface SpellingWord {
  id: string;
  word: string;
  difficulty: number;
  attempts: number;
  correct: number;
  lastAttempt?: Date;
}

export interface GameSession {
  id: string;
  words: SpellingWord[];
  currentWordIndex: number;
  score: number;
  lives: number;
  gameMode: GameMode;
  startTime: Date;
  endTime?: Date;
}

export type GameMode = 'missing-letters' | 'repetition' | 'spot-errors' | 'hangman' | 'word-scramble' | 'crossword' | 'word-search' | 'rhyming' | 'syllable-count' | 'spelling-bee' | 'word-building' | 'speed-spelling';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}