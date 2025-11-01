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
      skill: 'Spatial Recall'
    },
    sequenceSparks: {
      name: 'Sequence Sparks',
      description: 'Remember and repeat light sequences',
      skill: 'Working Memory'
    },
    cardMatch: {
      name: 'Card Match',
      description: 'Match pairs under time pressure',
      skill: 'Visual Memory'
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
    pairsFound: 'Pairs Found'
  },
  
  results: {
    gameComplete: 'Game Complete! 🎉',
    xpGained: 'XP Gained',
    playAgain: 'Play Again',
    backToDashboard: 'Back to Dashboard'
  },
  
  progress: {
    title: 'Your Progress',
    accuracyTrend: 'Recent Accuracy Trend',
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
  }
};

export default en;

