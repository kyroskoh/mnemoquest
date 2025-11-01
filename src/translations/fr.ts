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
      skill: 'Rappel Spatial',
      instructions: 'Mémorisez les positions des symboles en surbrillance...',
      recall: 'Cliquez sur les cellules qui avaient des symboles !'
    },
    sequenceSparks: {
      name: 'Étincelles de Séquence',
      description: 'Mémorisez et répétez des séquences lumineuses',
      skill: 'Mémoire de Travail',
      instructions: 'Regardez la séquence et répétez-la...',
      watch: 'Regardez la séquence...',
      repeat: 'Maintenant répétez la séquence !',
      wrong: 'Oups ! Mauvaise séquence. Essayez la suivante !'
    },
    cardMatch: {
      name: 'Association de Cartes',
      description: 'Associez des paires sous pression temporelle',
      skill: 'Mémoire Visuelle',
      instructions: 'Trouvez toutes les paires avant la fin du temps !'
    },
    playNow: 'Jouer Maintenant'
  },
  
  tutorial: {
    skip: 'Passer le Tutoriel',
    back: 'Retour',
    next: 'Suivant',
    startPlaying: 'Commencer à Jouer !',
    howToPlay: 'Comment Jouer',
    tips: 'Conseils',
    memoryGrid: {
      welcome: 'Bienvenue dans la Grille de Mémoire !',
      intro: 'Testez votre mémoire spatiale en vous souvenant où les symboles apparaissent sur une grille.',
      steps: '1. Observez attentivement les symboles apparaître sur la grille\n2. Mémorisez leurs positions\n3. Lorsque la grille se vide, cliquez sur les cellules qui avaient des symboles\n4. Complétez 5 rounds pour finir le jeu',
      tips: '• La grille ne s\'affichera que quelques secondes - concentrez-vous !\n• Au fur et à mesure que vous progressez, la difficulté augmentera\n• Essayez de visualiser des motifs ou de créer des associations mentales'
    },
    sequenceSparks: {
      welcome: 'Bienvenue dans Étincelles de Séquence !',
      intro: 'Entraînez votre mémoire de travail en répétant des séquences de lumières clignotantes.',
      steps: '1. Regardez les boutons colorés s\'allumer en séquence\n2. Attendez que la séquence se termine\n3. Cliquez sur les boutons dans le même ordre\n4. La séquence s\'allonge à chaque round',
      tips: '• Concentrez-vous sur un bouton à la fois\n• Essayez de dire les couleurs à voix haute pour renforcer la mémoire\n• Créez un rythme ou un motif dans votre esprit'
    },
    cardMatch: {
      welcome: 'Bienvenue dans Cartes Assorties !',
      intro: 'Défiez votre mémoire visuelle en assortissant des paires de cartes avant la fin du temps.',
      steps: '1. Cliquez sur les cartes pour les retourner\n2. Essayez de trouver des paires correspondantes\n3. Mémorisez où chaque symbole est situé\n4. Assortissez toutes les paires avant l\'expiration du chronomètre',
      tips: '• Commencez par retourner les cartes systématiquement\n• Faites attention aux emplacements des symboles\n• Travaillez rapidement mais avec précision pour gagner du temps'
    }
  },
  
  gameUI: {
    backToDashboard: 'Retour au Tableau de Bord',
    level: 'Niveau',
    round: 'Manche',
    time: 'Temps',
    score: 'Score',
    accuracy: 'Précision',
    mistakes: 'Erreurs',
    pairsFound: 'Paires Trouvées',
    ready: 'Je suis prêt !'
  },
  
  results: {
    gameComplete: 'Jeu Terminé ! 🎉',
    score: 'Score',
    accuracy: 'Précision',
    time: 'Temps',
    xpGained: 'XP Gagné',
    level: 'Niveau',
    playAgain: 'Rejouer',
    backToDashboard: 'Retour au Tableau de Bord'
  },
  
  progress: {
    title: 'Votre Progrès',
    yourProgress: 'Votre Progrès',
    recentGames: 'Jeux Récents',
    accuracyLabel: 'Précision %',
    accuracyTrend: 'Tendance de Précision Récente',
    gamesPlayedLabel: 'Jeux Joués',
    gamesByType: 'Jeux Joués par Type',
    achievements: 'Réalisations'
  },
  
  settings: {
    title: 'Paramètres',
    soundEffects: '🔊 Effets Sonores',
    colorBlindMode: '🎨 Mode Daltonien',
    animations: '✨ Animations',
    language: '🌍 Langue',
    applyLanguage: 'Appliquer la Langue',
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

