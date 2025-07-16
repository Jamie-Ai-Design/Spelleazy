import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GameMode } from '@/types/game';
import { Zap, RefreshCw, Eye, Target, Shuffle, Grid3X3, Search, Music, Hash, Trophy, Building, Timer, ArrowLeft } from 'lucide-react';
import SpellingTips from './SpellingTips';

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode, onBack }) => {
  const modes = [
    {
      id: 'missing-letters' as GameMode,
      title: 'Missing Letters',
      description: 'Fill in the missing letters to complete the word',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      id: 'repetition' as GameMode,
      title: 'Repetition',
      description: 'Type the word multiple times to memorize it',
      icon: RefreshCw,
      color: 'bg-green-500'
    },
    {
      id: 'spot-errors' as GameMode,
      title: 'Spot Errors',
      description: 'Find and correct the spelling mistakes',
      icon: Eye,
      color: 'bg-orange-500'
    },
    {
      id: 'hangman' as GameMode,
      title: 'Hangman',
      description: 'Guess the word letter by letter',
      icon: Zap,
      color: 'bg-red-500'
    },
    {
      id: 'word-scramble' as GameMode,
      title: 'Word Scramble',
      description: 'Unscramble the letters to form the word',
      icon: Shuffle,
      color: 'bg-purple-500'
    },
    {
      id: 'crossword' as GameMode,
      title: 'Crossword',
      description: 'Fill words in intersecting grids',
      icon: Grid3X3,
      color: 'bg-indigo-500'
    },
    {
      id: 'word-search' as GameMode,
      title: 'Word Search',
      description: 'Find hidden words in letter grids',
      icon: Search,
      color: 'bg-pink-500'
    },
    {
      id: 'rhyming' as GameMode,
      title: 'Rhyming Game',
      description: 'Match words that rhyme together',
      icon: Music,
      color: 'bg-cyan-500'
    },
    {
      id: 'syllable-count' as GameMode,
      title: 'Syllable Count',
      description: 'Break words into syllables',
      icon: Hash,
      color: 'bg-teal-500'
    },
    {
      id: 'spelling-bee' as GameMode,
      title: 'Spelling Bee',
      description: 'Traditional spelling competition format',
      icon: Trophy,
      color: 'bg-yellow-500'
    },
    {
      id: 'word-building' as GameMode,
      title: 'Word Building',
      description: 'Create words from given letters',
      icon: Building,
      color: 'bg-emerald-500'
    },
    {
      id: 'speed-spelling' as GameMode,
      title: 'Speed Spelling',
      description: 'Type words quickly against timer',
      icon: Timer,
      color: 'bg-rose-500'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold">Choose Game Mode</h2>
      </div>
      <SpellingTips />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Card key={mode.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectMode(mode.id)}>
              <CardHeader className="text-center">
                <div className={`w-12 h-12 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{mode.title}</CardTitle>
                <CardDescription className="text-sm">{mode.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Play Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GameModeSelector;