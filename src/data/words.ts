export const wordsByAge = {
  '6-8': [
    'cat', 'dog', 'sun', 'run', 'fun', 'big', 'red', 'hat', 'bat', 'mat',
    'cup', 'bus', 'egg', 'leg', 'bed', 'pen', 'ten', 'hen', 'net', 'pet',
    'box', 'fox', 'six', 'mix', 'fix', 'bag', 'tag', 'rag', 'wag', 'sad',
    'mad', 'bad', 'dad', 'had', 'lap', 'map', 'cap', 'tap', 'nap', 'gap'
  ],
  '9-12': [
    'apple', 'banana', 'cherry', 'dragon', 'elephant', 'flower', 'guitar',
    'house', 'island', 'jungle', 'kitten', 'lemon', 'mountain', 'ocean',
    'planet', 'queen', 'rabbit', 'sunset', 'tiger', 'umbrella', 'violin',
    'water', 'yellow', 'zebra', 'castle', 'bridge', 'garden', 'rainbow',
    'thunder', 'wizard', 'crystal', 'diamond', 'forest', 'galaxy', 'harmony',
    'journey', 'kingdom', 'library', 'mystery', 'nature', 'orange'
  ],
  '13+': [
    'achievement', 'beautiful', 'certificate', 'democracy', 'environment',
    'fascinating', 'government', 'helicopter', 'imagination', 'journalism',
    'knowledge', 'laboratory', 'magnificent', 'necessary', 'opportunity',
    'personality', 'questionnaire', 'responsibility', 'sophisticated',
    'temperature', 'understanding', 'vocabulary', 'wonderful', 'extraordinary',
    'psychology', 'philosophy', 'technology', 'architecture', 'mathematics',
    'encyclopedia', 'pronunciation', 'communication', 'organization', 'development',
    'information', 'celebration', 'education', 'competition', 'preparation'
  ]
};

export const defaultWords = wordsByAge['9-12'];

export const getRandomWords = (count: number = 10, ageGroup: string = '9-12'): string[] => {
  const words = wordsByAge[ageGroup as keyof typeof wordsByAge] || wordsByAge['9-12'];
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDifficultyLevel = (word: string): number => {
  if (word.length <= 4) return 1;
  if (word.length <= 6) return 2;
  if (word.length <= 8) return 3;
  return 4;
};

export const getSpellingTips = () => [
  "Sound out the word slowly, syllable by syllable",
  "Look for common letter patterns like 'ing', 'tion', 'ed'",
  "Remember: 'i' before 'e' except after 'c'",
  "Double letters often come after short vowel sounds",
  "Silent letters are common in English - practice them!",
  "Break long words into smaller parts",
  "Use memory tricks like rhymes or word associations",
  "Practice writing the word multiple times",
  "Read the word in context to understand its meaning",
  "Check if the word follows common spelling rules"
];