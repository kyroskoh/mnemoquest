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
      instructions: 'Trouvez toutes les paires avant la fin du temps !',
      memorizePhase: 'Mémorisez les cartes !',
      playPhase: 'Trouvez les paires correspondantes !',
      cardsFlipIn: 'Les cartes se retournent dans...'
    },
    numberRecall: {
      name: 'Rappel des Nombres',
      description: 'Mémorisez des séquences de nombres',
      skill: 'Mémoire Numérique',
      instructions: 'Regardez attentivement les nombres...',
      enterNumbers: 'Entrez les nombres',
      submit: 'Soumettre',
      typeForward: 'Tapez les nombres dans l\'ordre',
      typeReverse: 'Tapez les nombres dans l\'ordre INVERSE',
      enterSomething: 'Veuillez entrer les nombres',
      perfect: 'Parfait !',
      correct: 'Correct',
      incorrect: 'Incorrect',
      correctWas: 'La bonne réponse était',
      reverseMode: '🔄 MODE INVERSE'
    },
    flashCount: {
      name: 'Comptage Éclair',
      description: 'Comptez les objets qui apparaissent à l\'écran',
      skill: 'Attention Rapide',
      instructions: 'Les objets apparaîtront brièvement. Comptez le type spécifique demandé !',
      question: 'Combien de {shape}s {color}s y avait-il ?',
      shapes: {
        circle: 'cercle',
        square: 'carré',
        triangle: 'triangle',
        star: 'étoile'
      },
      colors: {
        red: 'rouge',
        blue: 'bleu',
        green: 'vert',
        yellow: 'jaune',
        purple: 'violet',
        orange: 'orange'
      }
    },
    wordTrail: {
      name: 'Piste de Mots',
      description: 'Mémorisez des mots en séquence',
      skill: 'Mémoire Verbale',
      instructions: 'Mémorisez ces mots dans l\'ordre...',
      recall: 'Maintenant tapez les mots dans l\'ordre !',
      typeWords: 'Tapez chaque mot dans le bon ordre',
      wordPlaceholder: 'Mot {num}',
      submit: 'Soumettre',
      results: 'Résultats',
      correctWords: 'Mots Corrects',
      correctOrder: 'Ordre et Position Corrects'
    },
    patternPath: {
      name: 'Chemin de Motifs',
      description: 'Mémorisez et tracez des chemins sur une grille',
      skill: 'Séquençage Spatial',
      instructions: 'Regardez le chemin et mémorisez-le...',
      watch: 'Regardez attentivement le chemin...',
      recall: 'Maintenant tracez le même chemin !',
      clear: 'Effacer',
      submit: 'Soumettre'
    },
    nBack: {
      name: 'Défi N-Back',
      description: 'Testez la mémoire de travail avec la tâche cognitive de référence',
      skill: 'Mémoire de Travail',
      back: 'Retour',
      howToPlay: 'Comment Jouer',
      instruction1: 'Les lettres apparaîtront une par une. Appuyez sur ESPACE (ou touchez le bouton CORRESPOND) lorsque la lettre actuelle correspond à celle {n} positions en arrière.',
      instruction2: 'Concentrez-vous et répondez rapidement quand vous voyez une correspondance !',
      example: 'Exemple',
      exampleText: 'En 1-back : A G B B (✓ appuyez ici, B correspond 1 en arrière) | A B C D (✗ n\'appuyez pas, D ≠ C)',
      trial: 'Essai',
      press: 'Appuyez sur ESPACE ou touchez le bouton quand vous voyez une correspondance',
      match: 'CORRESPOND!',
      hits: 'Réussites',
      misses: 'Ratés'
    },
    storyRecall: {
      name: 'Rappel d\'Histoire',
      description: 'Mémorisez les détails de courtes histoires',
      skill: 'Mémoire Épisodique',
      instructions: 'Lisez l\'histoire attentivement et mémorisez les détails...',
      question: 'Question',
      continue: 'Continuer'
    },
    changeDetection: {
      name: 'Détection de Changement',
      description: 'Repérez ce qui a changé dans une scène',
      skill: 'Mémoire de Travail Visuelle',
      instructions: 'Étudiez la scène, puis identifiez ce qui a changé !',
      round: 'Manche',
      memorize: 'Mémorisez cette scène...',
      findChange: 'Qu\'est-ce qui a changé ? Cliquez dessus !'
    },
    colorSequence: {
      name: 'Séquence de Couleurs',
      description: 'Mémorisez et répétez des motifs de couleurs',
      skill: 'Mémoire des Couleurs',
      instructions: 'Regardez les couleurs clignoter en séquence, puis cliquez-les dans le même ordre !',
      level: 'Niveau',
      sequence: 'Séquence',
      watch: 'Regardez la séquence...',
      yourTurn: 'À votre tour ! Cliquez sur les couleurs dans l\'ordre',
      correct: 'Correct !',
      wrong: 'Mauvaise séquence !',
      correctWas: 'La séquence correcte était :'
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
    },
    numberRecall: {
      welcome: 'Bienvenue au Rappel des Nombres !',
      intro: 'Entraînez votre mémoire numérique en mémorisant des séquences de chiffres.',
      steps: '1. Regardez les nombres apparaître un par un\n2. Mémorisez la séquence\n3. Tapez les nombres dans l\'ordre (ou dans l\'ordre inverse pour les niveaux plus difficiles)\n4. Soumettez votre réponse',
      tips: '• Essayez de regrouper les nombres (comme les numéros de téléphone)\n• Créez des motifs ou des associations\n• En mode inverse, visualisez la séquence à l\'envers'
    },
    flashCount: {
      welcome: 'Bienvenue au Comptage Éclair !',
      intro: 'Testez votre attention visuelle en comptant des objets qui apparaissent brièvement à l\'écran.',
      steps: '1. Les objets apparaîtront pour un bref moment\n2. Comptez les types spécifiques (couleur + forme)\n3. Sélectionnez le bon compte parmi les options\n4. Complétez 5 tours',
      tips: '• Concentrez-vous sur le type cible avant l\'apparition des objets\n• Pratiquez la subitisation (reconnaissance instantanée de petites quantités)\n• N\'essayez pas de tout compter - seulement ce qui est demandé'
    },
    wordTrail: {
      welcome: 'Bienvenue à la Piste de Mots !',
      intro: 'Défiez votre mémoire verbale en mémorisant des mots en séquence.',
      steps: '1. Regardez les mots apparaître un par un\n2. Mémorisez-les dans l\'ordre\n3. Tapez chaque mot à la bonne position\n4. Soumettez quand vous avez terminé',
      tips: '• Créez une histoire reliant les mots\n• Utilisez la première lettre de chaque mot pour faire un acronyme\n• Visualisez des images vives pour chaque mot'
    },
    patternPath: {
      welcome: 'Bienvenue au Chemin de Motifs !',
      intro: 'Entraînez votre mémoire spatiale en mémorisant et traçant des chemins sur une grille.',
      steps: '1. Regardez le chemin être dessiné sur la grille\n2. Mémorisez la séquence de cellules\n3. Recréez le chemin en cliquant sur les cellules dans l\'ordre\n4. Les cellules doivent être adjacentes (pas de diagonales)',
      tips: '• Faites attention aux indicateurs de direction\n• Divisez les longs chemins en petits segments\n• Utilisez des points de repère ou des motifs pour mémoriser les virages'
    },
    nBack: {
      welcome: 'Bienvenue au Défi N-Back !',
      intro: 'Testez et améliorez votre mémoire de travail avec cette tâche scientifiquement validée.',
      steps: '1. Les lettres apparaîtront une par une à l\'écran\n2. Appuyez sur ESPACE lorsque la lettre actuelle correspond à celle N positions en arrière\n3. Le jeu commence avec 1-back, puis progresse vers 2-back et 3-back\n4. Restez concentré et répondez rapidement quand vous voyez une correspondance',
      tips: '• Gardez une liste mentale des N dernières lettres\n• Ne vous précipitez pas - la précision est plus importante que la vitesse\n• Pratiquez régulièrement pour améliorer votre capacité de mémoire de travail\n• C\'est l\'une des rares tâches d\'entraînement cérébral scientifiquement prouvées !'
    },
    storyRecall: {
      welcome: 'Bienvenue au Rappel d\'Histoire !',
      intro: 'Améliorez votre mémoire épisodique en mémorisant les détails de courtes histoires.',
      steps: '1. Lisez l\'histoire attentivement pendant le chronomètre\n2. Faites attention aux détails spécifiques (noms, couleurs, nombres, lieux)\n3. Répondez aux questions à choix multiples sur l\'histoire\n4. Pas de notes autorisées - comptez sur votre mémoire !',
      tips: '• Créez des images mentales en lisant\n• Faites attention au qui, quoi, quand, où et comment\n• Connectez les détails pour former une histoire cohérente\n• Plus vous vous engagez dans l\'histoire, mieux vous vous en souviendrez'
    },
    changeDetection: {
      welcome: 'Bienvenue à la Détection de Changement !',
      intro: 'Entraînez votre mémoire de travail visuelle en repérant ce qui a changé dans une scène.',
      steps: '1. Étudiez la scène attentivement pendant la phase de visualisation\n2. Après un bref écran vide, la scène réapparaît avec UN changement\n3. Cliquez sur l\'objet qui a changé\n4. Les changements peuvent être : couleur, position ou taille',
      tips: '• Essayez de mémoriser la position et la couleur de chaque objet\n• Créez un instantané mental de la scène\n• Groupez les objets par emplacement ou couleur pour mieux mémoriser\n• À mesure que la difficulté augmente, plus d\'objets apparaîtront'
    },
    colorSequence: {
      welcome: 'Bienvenue à la Séquence de Couleurs !',
      intro: 'Maîtrisez les motifs de couleurs et la mémoire séquentielle avec ce défi vibrant.',
      steps: '1. Regardez les couleurs clignoter en séquence\n2. Après la fin de la séquence, c\'est votre tour\n3. Cliquez sur les couleurs dans le même ordre exact\n4. Chaque niveau ajoute une couleur de plus à la séquence',
      tips: '• Dites les couleurs à voix haute (ou dans votre tête) pendant qu\'elles clignotent\n• Créez un rythme ou un motif avec les couleurs\n• Utilisez les positions des couleurs pour vous aider à mémoriser la séquence\n• Trois erreurs et le jeu se termine - restez concentré !'
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
    dataManagement: '📦 Gestion des Données',
    exportProgress: '💾 Exporter les Progrès',
    exportProgressDesc: 'Téléchargez vos progrès et réalisations (chiffré)',
    importProgress: '📂 Importer les Progrès',
    importProgressDesc: 'Restaurer à partir d\'un fichier de sauvegarde',
    dangerZone: '⚠️ Zone de Danger',
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
  },
  
  badges: {
    firstSteps: {
      name: 'Premiers Pas',
      description: 'Terminez votre premier jeu'
    },
    dedicated: {
      name: 'Dévoué',
      description: 'Jouez à 10 jeux'
    },
    committed: {
      name: 'Engagé',
      description: 'Jouez à 50 jeux'
    },
    centurion: {
      name: 'Centurion',
      description: 'Jouez à 100 jeux'
    },
    streak3: {
      name: 'Série de 3 Jours',
      description: 'Jouez 3 jours de suite'
    },
    streak7: {
      name: 'Guerrier de la Semaine',
      description: 'Jouez 7 jours de suite'
    },
    streak30: {
      name: 'Maître Mensuel',
      description: 'Jouez 30 jours de suite'
    },
    level5: {
      name: 'Niveau 5',
      description: 'Atteignez le niveau 5'
    },
    level10: {
      name: 'Niveau 10',
      description: 'Atteignez le niveau 10'
    },
    sharpMind: {
      name: 'Esprit Vif',
      description: '80% de précision moyenne (10+ jeux)'
    },
    perfectionist: {
      name: 'Perfectionniste',
      description: '95% de précision moyenne (20+ jeux)'
    }
  }
};

export default fr;

