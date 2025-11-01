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
      skill: 'Räumliches Gedächtnis'
    },
    sequenceSparks: {
      name: 'Sequenz-Funken',
      description: 'Merken und wiederholen Sie Lichtsequenzen',
      skill: 'Arbeitsgedächtnis'
    },
    cardMatch: {
      name: 'Karten-Paare',
      description: 'Finden Sie passende Paare unter Zeitdruck',
      skill: 'Visuelles Gedächtnis'
    },
    playNow: 'Jetzt spielen'
  },
  
  tutorial: {
    skip: 'Tutorial überspringen',
    back: 'Zurück',
    next: 'Weiter',
    startPlaying: 'Spielen!'
  },
  
  gameUI: {
    backToDashboard: 'Zum Dashboard',
    level: 'Level',
    round: 'Runde',
    time: 'Zeit',
    score: 'Punkte',
    accuracy: 'Genauigkeit',
    mistakes: 'Fehler',
    pairsFound: 'Paare gefunden'
  },
  
  results: {
    gameComplete: 'Spiel beendet! 🎉',
    xpGained: 'EP erhalten',
    playAgain: 'Nochmal spielen',
    backToDashboard: 'Zum Dashboard'
  },
  
  progress: {
    title: 'Ihr Fortschritt',
    accuracyTrend: 'Genauigkeitstrend (letzte Spiele)',
    gamesByType: 'Spiele nach Typ',
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
  }
};

export default de;

