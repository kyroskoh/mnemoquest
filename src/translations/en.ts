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
    startPlaying: 'Start Playing!'
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

