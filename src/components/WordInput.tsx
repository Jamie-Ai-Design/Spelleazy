import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getRandomWords } from '@/data/words';
import { Shuffle, Plus, X, ArrowLeft } from 'lucide-react';

interface WordInputProps {
  onWordsSelected: (words: string[]) => void;
  onBack: () => void;
  ageGroup: string;
}

const WordInput: React.FC<WordInputProps> = ({ onWordsSelected, onBack, ageGroup }) => {
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleAddWord = () => {
    if (inputValue.trim() && customWords.length < 10) {
      setCustomWords([...customWords, inputValue.trim().toLowerCase()]);
      setInputValue('');
    }
  };

  const handleRemoveWord = (index: number) => {
    setCustomWords(customWords.filter((_, i) => i !== index));
  };

  const handleTextareaSubmit = () => {
    const words = textareaValue
      .split(/[\n,\s]+/)
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length > 0)
      .slice(0, 10);
    setCustomWords(words);
  };

  const handleRandomWords = () => {
    const randomWords = getRandomWords(10, ageGroup);
    onWordsSelected(randomWords);
  };

  const handleUseCustomWords = () => {
    if (customWords.length > 0) {
      onWordsSelected(customWords);
    }
  };

  const getDifficultyDescription = () => {
    switch (ageGroup) {
      case '6-8':
        return 'Simple 3-5 letter words';
      case '9-12':
        return 'Medium 4-7 letter words';
      case '13+':
        return 'Advanced 5-10 letter words';
      default:
        return 'Age-appropriate words';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <CardTitle className="text-2xl text-center">Choose Your Words</CardTitle>
            <CardDescription className="text-center">
              Select up to 10 words for your spelling practice
              <br />
              <span className="text-sm font-medium">Difficulty: {getDifficultyDescription()}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="random" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="random">Random Words</TabsTrigger>
            <TabsTrigger value="custom">Custom Words</TabsTrigger>
          </TabsList>
          
          <TabsContent value="random" className="space-y-4">
            <div className="text-center">
              <Button onClick={handleRandomWords} size="lg" className="gap-2">
                <Shuffle className="w-4 h-4" />
                Get 10 Random Words
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a word..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
                maxLength={20}
              />
              <Button onClick={handleAddWord} disabled={customWords.length >= 10}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              Or paste multiple words:
            </div>
            
            <Textarea
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="Paste words here (separated by spaces, commas, or new lines)..."
              rows={3}
            />
            <Button onClick={handleTextareaSubmit} variant="outline" className="w-full">
              Add Words from Text
            </Button>
            
            <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border rounded">
              {customWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {word}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => handleRemoveWord(index)}
                  />
                </Badge>
              ))}
            </div>
            
            <Button 
              onClick={handleUseCustomWords} 
              disabled={customWords.length === 0}
              className="w-full"
              size="lg"
            >
              Use These Words ({customWords.length}/10)
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WordInput;