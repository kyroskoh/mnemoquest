import { Translation } from '../core/TranslationManager';

const en: Translation = {
  nav: {
    home: 'Home',
    progress: 'Progress',
    settings: 'Settings',
    about: 'About'
  },
  
  dashboard: {
    welcome: 'Welcome to Your Memory Training Journey',
    subtitle: 'Enhance your cognitive abilities through fun, science-backed mini-games',
    totalXP: 'Total XP',
    dayStreak: 'Day Streak',
    avgAccuracy: 'Avg Accuracy',
    gamesPlayed: 'Games Played',
    chooseChallenge: 'Choose Your Challenge'
  },
  
  games: {
    memoryGrid: {
      name: 'Memory Grid',
      description: 'Recall positions of symbols in a grid',
      skill: 'Spatial Recall',
      instructions: 'Memorize the positions of the highlighted symbols...',
      recall: 'Click on the cells that had symbols!'
    },
    sequenceSparks: {
      name: 'Sequence Sparks',
      description: 'Remember and repeat light sequences',
      skill: 'Working Memory',
      instructions: 'Watch the sequence and repeat it...',
      watch: 'Watch the sequence...',
      repeat: 'Now repeat the sequence!',
      wrong: 'Oops! Wrong sequence. Try the next one!'
    },
    cardMatch: {
      name: 'Card Match',
      description: 'Match pairs under time pressure',
      skill: 'Visual Memory',
      instructions: 'Find all matching pairs before time runs out!'
    },
    numberRecall: {
      name: 'Number Recall',
      description: 'Remember sequences of numbers',
      skill: 'Numerical Memory',
      instructions: 'Watch the numbers carefully...',
      enterNumbers: 'Enter the numbers',
      submit: 'Submit',
      typeForward: 'Type the numbers in order',
      typeReverse: 'Type the numbers in REVERSE order',
      enterSomething: 'Please enter the numbers',
      perfect: 'Perfect!',
      correct: 'Correct',
      incorrect: 'Incorrect',
      correctWas: 'Correct answer was',
      reverseMode: '🔄 REVERSE MODE'
    },
    flashCount: {
      name: 'Flash Count',
      description: 'Count objects that flash on screen',
      skill: 'Rapid Attention',
      instructions: 'Objects will flash briefly. Count the specific type asked!',
      question: 'How many {color} {shape}s were there?',
      shapes: {
        circle: 'circle',
        square: 'square',
        triangle: 'triangle',
        star: 'star'
      },
      colors: {
        red: 'red',
        blue: 'blue',
        green: 'green',
        yellow: 'yellow',
        purple: 'purple',
        orange: 'orange'
      }
    },
    wordTrail: {
      name: 'Word Trail',
      description: 'Remember words in sequence',
      skill: 'Verbal Memory',
      instructions: 'Memorize these words in order...',
      recall: 'Now type the words in order!',
      typeWords: 'Type each word in the correct order',
      wordPlaceholder: 'Word {num}',
      submit: 'Submit',
      results: 'Results',
      correctWords: 'Correct Words',
      correctOrder: 'Correct Order & Position'
    },
    patternPath: {
      name: 'Pattern Path',
      description: 'Remember and trace paths on a grid',
      skill: 'Spatial Sequencing',
      instructions: 'Watch the path and remember it...',
      watch: 'Watch the path carefully...',
      recall: 'Now trace the same path!',
      clear: 'Clear',
      submit: 'Submit'
    },
    playNow: 'Play Now'
  },
  
  tutorial: {
    skip: 'Skip Tutorial',
    back: 'Back',
    next: 'Next',
    startPlaying: 'Start Playing!',
    howToPlay: 'How to Play',
    tips: 'Tips',
    memoryGrid: {
      welcome: 'Welcome to Memory Grid!',
      intro: 'Test your spatial memory by remembering where symbols appear on a grid.',
      steps: '1. Watch carefully as symbols appear on the grid\n2. Memorize their positions\n3. When the grid clears, click on the cells that had symbols\n4. Complete 5 rounds to finish the game',
      tips: '• The grid will only show for a few seconds - focus!\n• As you improve, the difficulty will increase\n• Try to visualize patterns or create mental associations'
    },
    sequenceSparks: {
      welcome: 'Welcome to Sequence Sparks!',
      intro: 'Train your working memory by repeating sequences of flashing lights.',
      steps: '1. Watch the colored buttons light up in sequence\n2. Wait for the sequence to finish\n3. Click the buttons in the same order\n4. The sequence gets longer each round',
      tips: '• Focus on one button at a time\n• Try saying colors out loud to reinforce memory\n• Create a rhythm or pattern in your mind'
    },
    cardMatch: {
      welcome: 'Welcome to Card Match!',
      intro: 'Challenge your visual memory by matching pairs of cards before time runs out.',
      steps: '1. Click on cards to flip them over\n2. Try to find matching pairs\n3. Remember where each symbol is located\n4. Match all pairs before the timer expires',
      tips: '• Start by flipping cards systematically\n• Pay attention to symbol locations\n• Work quickly but accurately to save time'
    },
    numberRecall: {
      welcome: 'Welcome to Number Recall!',
      intro: 'Train your numerical memory by remembering sequences of digits.',
      steps: '1. Watch as numbers appear one by one\n2. Memorize the sequence\n3. Type the numbers in order (or reverse order for harder levels)\n4. Submit your answer',
      tips: '• Try chunking numbers into groups (like phone numbers)\n• Create patterns or associations\n• In reverse mode, visualize the sequence backwards'
    },
    flashCount: {
      welcome: 'Welcome to Flash Count!',
      intro: 'Test your visual attention by counting objects that flash briefly on screen.',
      steps: '1. Objects will flash for a brief moment\n2. Count specific types (color + shape)\n3. Select the correct count from options\n4. Work through 5 rounds',
      tips: '• Focus on the target type before objects appear\n• Practice subitizing (instantly recognizing small quantities)\n• Don\'t try to count everything - just what\'s asked'
    },
    wordTrail: {
      welcome: 'Welcome to Word Trail!',
      intro: 'Challenge your verbal memory by remembering words in sequence.',
      steps: '1. Watch as words appear one at a time\n2. Memorize them in order\n3. Type each word in the correct position\n4. Submit when done',
      tips: '• Create a story connecting the words\n• Use the first letter of each word to make an acronym\n• Visualize vivid images for each word'
    },
    patternPath: {
      welcome: 'Welcome to Pattern Path!',
      intro: 'Train your spatial memory by remembering and tracing paths on a grid.',
      steps: '1. Watch as a path is drawn on the grid\n2. Memorize the sequence of cells\n3. Recreate the path by clicking cells in order\n4. Cells must be adjacent (no diagonals)',
      tips: '• Pay attention to the direction indicators\n• Break long paths into smaller chunks\n• Use landmarks or patterns to remember turns'
    }
  },
  
  gameUI: {
    backToDashboard: 'Back to Dashboard',
    level: 'Level',
    round: 'Round',
    time: 'Time',
    score: 'Score',
    accuracy: 'Accuracy',
    mistakes: 'Mistakes',
    pairsFound: 'Pairs Found',
    ready: 'I\'m Ready!'
  },
  
  results: {
    gameComplete: 'Game Complete! 🎉',
    score: 'Score',
    accuracy: 'Accuracy',
    time: 'Time',
    xpGained: 'XP Gained',
    level: 'Level',
    playAgain: 'Play Again',
    backToDashboard: 'Back to Dashboard'
  },
  
  progress: {
    title: 'Your Progress',
    yourProgress: 'Your Progress',
    recentGames: 'Recent Games',
    accuracyLabel: 'Accuracy %',
    accuracyTrend: 'Recent Accuracy Trend',
    gamesPlayedLabel: 'Games Played',
    gamesByType: 'Games Played by Type',
    achievements: 'Achievements'
  },
  
  settings: {
    title: 'Settings',
    soundEffects: '🔊 Sound Effects',
    colorBlindMode: '🎨 Color-Blind Mode',
    animations: '✨ Animations',
    language: '🌍 Language',
    applyLanguage: 'Apply Language',
    resetProgress: 'Reset All Progress',
    resetConfirm: 'Are you sure you want to reset all progress? This cannot be undone.',
    resetSuccess: 'Progress reset successfully!'
  },
  
  about: {
    title: 'About MnemoQuest',
    description: 'MnemoQuest is a science-backed cognitive training platform designed to enhance your memory, focus, and recall speed.',
    howItWorks: 'How It Works',
    howItWorksText: 'Our adaptive difficulty system adjusts challenges based on your performance, ensuring you\'re always in the optimal learning zone.',
    benefits: 'Benefits',
    benefit1: 'Improve short-term recall and working memory',
    benefit2: 'Enhance spatial recognition abilities',
    benefit3: 'Boost focus and concentration',
    benefit4: 'Track your cognitive progress over time',
    developer: 'Developer',
    version: 'Version 1.0.0 • Built with TypeScript & Vite • MIT License'
  },
  
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    ok: 'OK',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No'
  },
  
  badges: {
    firstSteps: {
      name: 'First Steps',
      description: 'Complete your first game'
    },
    dedicated: {
      name: 'Dedicated',
      description: 'Play 10 games'
    },
    committed: {
      name: 'Committed',
      description: 'Play 50 games'
    },
    centurion: {
      name: 'Centurion',
      description: 'Play 100 games'
    },
    streak3: {
      name: '3-Day Streak',
      description: 'Play 3 days in a row'
    },
    streak7: {
      name: 'Week Warrior',
      description: 'Play 7 days in a row'
    },
    streak30: {
      name: 'Monthly Master',
      description: 'Play 30 days in a row'
    },
    level5: {
      name: 'Level 5',
      description: 'Reach level 5'
    },
    level10: {
      name: 'Level 10',
      description: 'Reach level 10'
    },
    sharpMind: {
      name: 'Sharp Mind',
      description: '80% avg accuracy (10+ games)'
    },
    perfectionist: {
      name: 'Perfectionist',
      description: '95% avg accuracy (20+ games)'
    }
  }
};

export default en;

