import { Translation } from '../core/TranslationManager';

const fr: Translation = {
  nav: {
    home: 'Accueil',
    progress: 'Progrès',
    settings: 'Paramètres',
    about: 'À propos'
  },
  
  dashboard: {
    welcome: 'Bienvenue dans Votre Parcours d\'Entraînement de Mémoire',
    subtitle: 'Améliorez vos capacités cognitives grâce à des mini-jeux amusants et scientifiquement prouvés',
    totalXP: 'XP Total',
    dayStreak: 'Série de Jours',
    avgAccuracy: 'Précision Moyenne',
    gamesPlayed: 'Jeux Joués',
    chooseChallenge: 'Choisissez Votre Défi'
  },
  
  games: {
    memoryGrid: {
      name: 'Grille de Mémoire',
      description: 'Rappelez-vous les positions des symboles dans une grille',
      skill: 'Rappel Spatial'
    },
    sequenceSparks: {
      name: 'Étincelles de Séquence',
      description: 'Mémorisez et répétez des séquences lumineuses',
      skill: 'Mémoire de Travail'
    },
    cardMatch: {
      name: 'Association de Cartes',
      description: 'Associez des paires sous pression temporelle',
      skill: 'Mémoire Visuelle'
    },
    playNow: 'Jouer Maintenant'
  },
  
  tutorial: {
    skip: 'Passer le Tutoriel',
    back: 'Retour',
    next: 'Suivant',
    startPlaying: 'Commencer à Jouer !'
  },
  
  gameUI: {
    backToDashboard: 'Retour au Tableau de Bord',
    level: 'Niveau',
    round: 'Manche',
    time: 'Temps',
    score: 'Score',
    accuracy: 'Précision',
    mistakes: 'Erreurs',
    pairsFound: 'Paires Trouvées'
  },
  
  results: {
    gameComplete: 'Jeu Terminé ! 🎉',
    xpGained: 'XP Gagné',
    playAgain: 'Rejouer',
    backToDashboard: 'Retour au Tableau de Bord'
  },
  
  progress: {
    title: 'Vos Progrès',
    accuracyTrend: 'Tendance de Précision Récente',
    gamesByType: 'Jeux Joués par Type',
    achievements: 'Réalisations'
  },
  
  settings: {
    title: 'Paramètres',
    soundEffects: '🔊 Effets Sonores',
    colorBlindMode: '🎨 Mode Daltonien',
    animations: '✨ Animations',
    language: '🌍 Langue',
    resetProgress: 'Réinitialiser Tous les Progrès',
    resetConfirm: 'Êtes-vous sûr de vouloir réinitialiser tous les progrès ? Cette action est irréversible.',
    resetSuccess: 'Progrès réinitialisé avec succès !'
  },
  
  about: {
    title: 'À Propos de MnemoQuest',
    description: 'MnemoQuest est une plateforme d\'entraînement cognitif scientifiquement prouvée conçue pour améliorer votre mémoire, votre concentration et votre vitesse de rappel.',
    howItWorks: 'Comment Ça Marche',
    howItWorksText: 'Notre système de difficulté adaptative ajuste les défis en fonction de vos performances, garantissant que vous êtes toujours dans la zone d\'apprentissage optimale.',
    benefits: 'Avantages',
    benefit1: 'Améliorer le rappel à court terme et la mémoire de travail',
    benefit2: 'Améliorer les capacités de reconnaissance spatiale',
    benefit3: 'Augmenter la concentration et l\'attention',
    benefit4: 'Suivre vos progrès cognitifs au fil du temps',
    developer: 'Développeur',
    version: 'Version 1.0.0 • Construit avec TypeScript & Vite • Licence MIT'
  },
  
  common: {
    loading: 'Chargement...',
    error: 'Une erreur s\'est produite',
    ok: 'OK',
    cancel: 'Annuler',
    yes: 'Oui',
    no: 'Non'
  }
};

export default fr;

