import { Translation } from '../core/TranslationManager';

const de: Translation = {
  nav: {
    home: 'Startseite',
    progress: 'Fortschritt',
    settings: 'Einstellungen',
    about: 'Über'
  },
  
  dashboard: {
    welcome: 'Willkommen zu Ihrem Gedächtnistraining',
    subtitle: 'Verbessern Sie Ihre kognitiven Fähigkeiten durch unterhaltsame, wissenschaftlich fundierte Minispiele',
    totalXP: 'Gesamt-EP',
    dayStreak: 'Tage-Serie',
    avgAccuracy: 'Durchschn. Genauigkeit',
    gamesPlayed: 'Gespielte Spiele',
    chooseChallenge: 'Wählen Sie Ihre Herausforderung'
  },
  
  games: {
    memoryGrid: {
      name: 'Gedächtnis-Raster',
      description: 'Erinnern Sie sich an die Positionen von Symbolen in einem Raster',
      skill: 'Räumliches Gedächtnis',
      instructions: 'Merken Sie sich die Positionen der markierten Symbole...',
      recall: 'Klicken Sie auf die Zellen, die Symbole hatten!'
    },
    sequenceSparks: {
      name: 'Sequenz-Funken',
      description: 'Merken und wiederholen Sie Lichtsequenzen',
      skill: 'Arbeitsgedächtnis',
      instructions: 'Beobachten Sie die Sequenz und wiederholen Sie sie...',
      watch: 'Beobachten Sie die Sequenz...',
      repeat: 'Jetzt wiederholen Sie die Sequenz!',
      wrong: 'Ups! Falsche Sequenz. Versuchen Sie die nächste!'
    },
    cardMatch: {
      name: 'Karten-Paare',
      description: 'Finden Sie passende Paare unter Zeitdruck',
      skill: 'Visuelles Gedächtnis',
      instructions: 'Finden Sie alle Paare bevor die Zeit abläuft!'
    },
    playNow: 'Jetzt spielen'
  },
  
  tutorial: {
    skip: 'Tutorial überspringen',
    back: 'Zurück',
    next: 'Weiter',
    startPlaying: 'Spielen!',
    howToPlay: 'Wie man spielt',
    tips: 'Tipps',
    memoryGrid: {
      welcome: 'Willkommen bei Gedächtnis-Raster!',
      intro: 'Testen Sie Ihr räumliches Gedächtnis, indem Sie sich merken, wo Symbole auf einem Raster erscheinen.',
      steps: '1. Beobachten Sie sorgfältig, wie Symbole im Raster erscheinen\n2. Merken Sie sich ihre Positionen\n3. Wenn das Raster gelöscht wird, klicken Sie auf die Zellen mit Symbolen\n4. Absolvieren Sie 5 Runden, um das Spiel zu beenden',
      tips: '• Das Raster wird nur wenige Sekunden lang angezeigt - konzentrieren Sie sich!\n• Je besser Sie werden, desto schwieriger wird es\n• Versuchen Sie, Muster zu visualisieren oder mentale Assoziationen zu erstellen'
    },
    sequenceSparks: {
      welcome: 'Willkommen bei Sequenz-Funken!',
      intro: 'Trainieren Sie Ihr Arbeitsgedächtnis, indem Sie Sequenzen blinkender Lichter wiederholen.',
      steps: '1. Beobachten Sie, wie die farbigen Tasten nacheinander aufleuchten\n2. Warten Sie, bis die Sequenz beendet ist\n3. Klicken Sie die Tasten in derselben Reihenfolge\n4. Die Sequenz wird mit jeder Runde länger',
      tips: '• Konzentrieren Sie sich auf eine Taste nach der anderen\n• Versuchen Sie, die Farben laut auszusprechen, um das Gedächtnis zu stärken\n• Erstellen Sie einen Rhythmus oder ein Muster in Ihrem Kopf'
    },
    cardMatch: {
      welcome: 'Willkommen bei Karten-Paare!',
      intro: 'Fordern Sie Ihr visuelles Gedächtnis heraus, indem Sie Kartenpaare finden, bevor die Zeit abläuft.',
      steps: '1. Klicken Sie auf Karten, um sie umzudrehen\n2. Versuchen Sie, übereinstimmende Paare zu finden\n3. Merken Sie sich, wo jedes Symbol ist\n4. Finden Sie alle Paare, bevor die Zeit abläuft',
      tips: '• Beginnen Sie damit, Karten systematisch umzudrehen\n• Achten Sie auf die Positionen der Symbole\n• Arbeiten Sie schnell, aber genau, um Zeit zu sparen'
    }
  },
  
  gameUI: {
    backToDashboard: 'Zum Dashboard',
    level: 'Level',
    round: 'Runde',
    time: 'Zeit',
    score: 'Punkte',
    accuracy: 'Genauigkeit',
    mistakes: 'Fehler',
    pairsFound: 'Paare gefunden',
    ready: 'Ich bin bereit!'
  },
  
  results: {
    gameComplete: 'Spiel beendet! 🎉',
    score: 'Punkte',
    accuracy: 'Genauigkeit',
    time: 'Zeit',
    xpGained: 'EP erhalten',
    level: 'Level',
    playAgain: 'Nochmal spielen',
    backToDashboard: 'Zum Dashboard'
  },
  
  progress: {
    title: 'Ihr Fortschritt',
    yourProgress: 'Ihr Fortschritt',
    recentGames: 'Neueste Spiele',
    accuracyLabel: 'Genauigkeit %',
    accuracyTrend: 'Neuester Genauigkeitstrend',
    gamesPlayedLabel: 'Gespielte Spiele',
    gamesByType: 'Gespielte Spiele nach Typ',
    achievements: 'Erfolge'
  },
  
  settings: {
    title: 'Einstellungen',
    soundEffects: '🔊 Soundeffekte',
    colorBlindMode: '🎨 Farbenblind-Modus',
    animations: '✨ Animationen',
    language: '🌍 Sprache',
    applyLanguage: 'Sprache anwenden',
    resetProgress: 'Alle Fortschritte zurücksetzen',
    resetConfirm: 'Sind Sie sicher, dass Sie alle Fortschritte zurücksetzen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    resetSuccess: 'Fortschritt erfolgreich zurückgesetzt!'
  },
  
  about: {
    title: 'Über MnemoQuest',
    description: 'MnemoQuest ist eine wissenschaftlich fundierte kognitive Trainingsplattform zur Verbesserung Ihres Gedächtnisses, Ihrer Konzentration und Ihrer Erinnerungsgeschwindigkeit.',
    howItWorks: 'Wie es funktioniert',
    howItWorksText: 'Unser adaptives Schwierigkeitssystem passt die Herausforderungen basierend auf Ihrer Leistung an und stellt sicher, dass Sie immer in der optimalen Lernzone sind.',
    benefits: 'Vorteile',
    benefit1: 'Verbessertes Kurzzeitgedächtnis und Arbeitsgedächtnis',
    benefit2: 'Verbesserte räumliche Erkennungsfähigkeit',
    benefit3: 'Erhöhte Konzentration und Aufmerksamkeitsspanne',
    benefit4: 'Verfolgen Sie Ihren kognitiven Fortschritt',
    developer: 'Entwickler',
    version: 'Version 1.0.0 • Erstellt mit TypeScript & Vite • MIT-Lizenz'
  },
  
  common: {
    loading: 'Laden...',
    error: 'Ein Fehler ist aufgetreten',
    ok: 'OK',
    cancel: 'Abbrechen',
    yes: 'Ja',
    no: 'Nein'
  },
  
  badges: {
    firstSteps: {
      name: 'Erste Schritte',
      description: 'Beende dein erstes Spiel'
    },
    dedicated: {
      name: 'Engagiert',
      description: 'Spiele 10 Spiele'
    },
    committed: {
      name: 'Verpflichtet',
      description: 'Spiele 50 Spiele'
    },
    centurion: {
      name: 'Zenturio',
      description: 'Spiele 100 Spiele'
    },
    streak3: {
      name: '3-Tage-Serie',
      description: 'Spiele 3 Tage hintereinander'
    },
    streak7: {
      name: 'Wochenkrieger',
      description: 'Spiele 7 Tage hintereinander'
    },
    streak30: {
      name: 'Monatsmeister',
      description: 'Spiele 30 Tage hintereinander'
    },
    level5: {
      name: 'Level 5',
      description: 'Erreiche Level 5'
    },
    level10: {
      name: 'Level 10',
      description: 'Erreiche Level 10'
    },
    sharpMind: {
      name: 'Scharfer Verstand',
      description: '80% durchschnittliche Genauigkeit (10+ Spiele)'
    },
    perfectionist: {
      name: 'Perfektionist',
      description: '95% durchschnittliche Genauigkeit (20+ Spiele)'
    }
  }
};

export default de;

