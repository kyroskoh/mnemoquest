export const wordLists = {
  easy: [
    'cat', 'dog', 'sun', 'moon', 'tree', 'bird', 'fish', 'car', 'book', 'home',
    'rain', 'snow', 'fire', 'wind', 'star', 'sky', 'sea', 'hill', 'rock', 'sand',
    'hand', 'foot', 'head', 'eye', 'ear', 'nose', 'face', 'hair', 'arm', 'leg',
    'red', 'blue', 'green', 'black', 'white', 'brown', 'pink', 'gray', 'gold', 'silver',
    'big', 'small', 'hot', 'cold', 'fast', 'slow', 'new', 'old', 'good', 'bad'
  ],
  medium: [
    'elephant', 'mountain', 'computer', 'telephone', 'keyboard', 'window', 'garden', 'picture',
    'kitchen', 'bedroom', 'rainbow', 'thunder', 'lightning', 'butterfly', 'dragonfly', 'grasshopper',
    'adventure', 'journey', 'vacation', 'mystery', 'treasure', 'castle', 'dragon', 'wizard',
    'breakfast', 'sandwich', 'chocolate', 'lemonade', 'hamburger', 'spaghetti', 'pizza', 'salad',
    'newspaper', 'magazine', 'notebook', 'pencil', 'eraser', 'scissors', 'calendar', 'envelope',
    'umbrella', 'blanket', 'pillow', 'curtain', 'mirror', 'carpet', 'furniture', 'appliance'
  ],
  hard: [
    'constellation', 'encyclopedia', 'magnificent', 'extraordinary', 'philosophical', 'revolutionary',
    'architecture', 'archaeology', 'anthropology', 'photography', 'geography', 'biography',
    'temperature', 'atmosphere', 'precipitation', 'evaporation', 'condensation', 'crystallization',
    'acceleration', 'deceleration', 'transformation', 'transportation', 'communication', 'investigation',
    'demonstration', 'presentation', 'celebration', 'declaration', 'confirmation', 'information',
    'refrigerator', 'calculator', 'microscope', 'telescope', 'thermometer', 'barometer',
    'appreciation', 'consideration', 'recommendation', 'congratulation', 'participation', 'collaboration'
  ]
};

export function getWords(difficulty: number, count: number): string[] {
  let pool: string[] = [];
  
  if (difficulty < 3) {
    pool = wordLists.easy;
  } else if (difficulty < 7) {
    pool = [...wordLists.easy, ...wordLists.medium];
  } else {
    pool = [...wordLists.medium, ...wordLists.hard];
  }

  // Shuffle and select
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

