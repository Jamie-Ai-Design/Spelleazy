import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { getSpellingTips } from '@/data/words';

const SpellingTips: React.FC = () => {
  const tips = getSpellingTips();
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Card className="mb-4 border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-yellow-700">
          <Lightbulb className="w-4 h-4" />
          Spelling Tip
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-yellow-800">{randomTip}</p>
      </CardContent>
    </Card>
  );
};

export default SpellingTips;