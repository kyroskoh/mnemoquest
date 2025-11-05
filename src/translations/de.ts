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
      instructions: 'Finden Sie alle Paare bevor die Zeit abläuft!',
      memorizePhase: 'Merken Sie sich die Karten!',
      playPhase: 'Finden Sie die passenden Paare!',
      cardsFlipIn: 'Karten drehen sich in...'
    },
    numberRecall: {
      name: 'Zahlen Merken',
      description: 'Merken Sie sich Zahlenfolgen',
      skill: 'Numerisches Gedächtnis',
      instructions: 'Beobachten Sie die Zahlen aufmerksam...',
      enterNumbers: 'Geben Sie die Zahlen ein',
      submit: 'Absenden',
      typeForward: 'Geben Sie die Zahlen in der Reihenfolge ein',
      typeReverse: 'Geben Sie die Zahlen in UMGEKEHRTER Reihenfolge ein',
      enterSomething: 'Bitte geben Sie die Zahlen ein',
      perfect: 'Perfekt!',
      correct: 'Richtig',
      incorrect: 'Falsch',
      correctWas: 'Die richtige Antwort war',
      reverseMode: '🔄 UMKEHR-MODUS'
    },
    flashCount: {
      name: 'Blitz-Zählen',
      description: 'Zählen Sie Objekte, die auf dem Bildschirm aufblitzen',
      skill: 'Schnelle Aufmerksamkeit',
      instructions: 'Objekte werden kurz aufblitzen. Zählen Sie den spezifischen Typ!',
      question: 'Wie viele {color}e {shape}s gab es?',
      shapes: {
        circle: 'Kreis',
        square: 'Quadrat',
        triangle: 'Dreieck',
        star: 'Stern'
      },
      colors: {
        red: 'rot',
        blue: 'blau',
        green: 'grün',
        yellow: 'gelb',
        purple: 'lila',
        orange: 'orange'
      }
    },
    wordTrail: {
      name: 'Wort-Pfad',
      description: 'Merken Sie sich Wörter in Reihenfolge',
      skill: 'Verbales Gedächtnis',
      instructions: 'Merken Sie sich diese Wörter in der Reihenfolge...',
      recall: 'Jetzt geben Sie die Wörter in der Reihenfolge ein!',
      typeWords: 'Geben Sie jedes Wort in der richtigen Reihenfolge ein',
      wordPlaceholder: 'Wort {num}',
      submit: 'Absenden',
      results: 'Ergebnisse',
      correctWords: 'Richtige Wörter',
      correctOrder: 'Richtige Reihenfolge & Position'
    },
    patternPath: {
      name: 'Muster-Pfad',
      description: 'Merken Sie sich Pfade und zeichnen Sie sie auf einem Raster',
      skill: 'Räumliche Sequenzierung',
      instructions: 'Beobachten Sie den Pfad und merken Sie ihn sich...',
      watch: 'Beobachten Sie den Pfad aufmerksam...',
      recall: 'Jetzt zeichnen Sie denselben Pfad!',
      clear: 'Löschen',
      submit: 'Absenden'
    },
    nBack: {
      name: 'N-Back-Herausforderung',
      description: 'Testen Sie das Arbeitsgedächtnis mit dem goldenen Standard kognitiver Aufgaben',
      skill: 'Arbeitsgedächtnis',
      back: 'Zurück',
      howToPlay: 'Wie man spielt',
      instruction1: 'Buchstaben erscheinen nacheinander. Drücken Sie LEERTASTE (oder tippen Sie auf den ÜBEREINSTIMMUNG-Button), wenn der aktuelle Buchstabe mit dem {n} Positionen zurück übereinstimmt.',
      instruction2: 'Konzentrieren Sie sich und reagieren Sie schnell, wenn Sie eine Übereinstimmung sehen!',
      example: 'Beispiel',
      exampleText: 'Bei 2-back: A G B B (✓ hier drücken, B stimmt 2 zurück überein) | A B C D (✗ nicht drücken, D ≠ B)',
      trial: 'Versuch',
      press: 'Drücken Sie LEERTASTE oder tippen Sie auf den Button bei einer Übereinstimmung',
      match: 'ÜBEREINSTIMMUNG!',
      hits: 'Treffer',
      misses: 'Fehlschläge'
    },
    storyRecall: {
      name: 'Geschichten-Erinnerung',
      description: 'Merken Sie sich Details aus kurzen Geschichten',
      skill: 'Episodisches Gedächtnis',
      instructions: 'Lesen Sie die Geschichte aufmerksam und merken Sie sich die Details...',
      question: 'Frage',
      continue: 'Weiter'
    },
    changeDetection: {
      name: 'Veränderungserkennung',
      description: 'Erkennen Sie, was sich in einer Szene verändert hat',
      skill: 'Visuelles Arbeitsgedächtnis',
      instructions: 'Studieren Sie die Szene und identifizieren Sie dann, was sich verändert hat!',
      round: 'Runde',
      memorize: 'Merken Sie sich diese Szene...',
      findChange: 'Was hat sich verändert? Klicken Sie darauf!'
    },
    colorSequence: {
      name: 'Farb-Sequenz',
      description: 'Merken und wiederholen Sie Farbmuster',
      skill: 'Farbgedächtnis',
      instructions: 'Beobachten Sie die Farben, die nacheinander aufblinken, dann klicken Sie sie in der gleichen Reihenfolge!',
      level: 'Level',
      sequence: 'Sequenz',
      watch: 'Beobachten Sie die Sequenz...',
      yourTurn: 'Sie sind dran! Klicken Sie die Farben in der Reihenfolge',
      correct: 'Richtig!',
      wrong: 'Falsche Sequenz!',
      correctWas: 'Die richtige Sequenz war:'
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
    },
    numberRecall: {
      welcome: 'Willkommen bei Zahlen Merken!',
      intro: 'Trainieren Sie Ihr numerisches Gedächtnis, indem Sie sich Ziffernfolgen merken.',
      steps: '1. Beobachten Sie, wie Zahlen nacheinander erscheinen\n2. Merken Sie sich die Sequenz\n3. Geben Sie die Zahlen in der Reihenfolge ein (oder in umgekehrter Reihenfolge für schwierigere Level)\n4. Senden Sie Ihre Antwort',
      tips: '• Versuchen Sie, Zahlen in Gruppen zu gruppieren (wie Telefonnummern)\n• Erstellen Sie Muster oder Assoziationen\n• Im Umkehr-Modus visualisieren Sie die Sequenz rückwärts'
    },
    flashCount: {
      welcome: 'Willkommen bei Blitz-Zählen!',
      intro: 'Testen Sie Ihre visuelle Aufmerksamkeit, indem Sie Objekte zählen, die kurz auf dem Bildschirm erscheinen.',
      steps: '1. Objekte werden für einen kurzen Moment erscheinen\n2. Zählen Sie spezifische Typen (Farbe + Form)\n3. Wählen Sie die richtige Anzahl aus den Optionen\n4. Arbeiten Sie durch 5 Runden',
      tips: '• Konzentrieren Sie sich auf den Zieltyp bevor Objekte erscheinen\n• Üben Sie Subitizing (sofortiges Erkennen kleiner Mengen)\n• Versuchen Sie nicht, alles zu zählen - nur was gefragt wird'
    },
    wordTrail: {
      welcome: 'Willkommen bei Wort-Pfad!',
      intro: 'Fordern Sie Ihr verbales Gedächtnis heraus, indem Sie sich Wörter in Sequenz merken.',
      steps: '1. Beobachten Sie, wie Wörter nacheinander erscheinen\n2. Merken Sie sich diese in der Reihenfolge\n3. Geben Sie jedes Wort an der richtigen Position ein\n4. Senden Sie, wenn Sie fertig sind',
      tips: '• Erstellen Sie eine Geschichte, die die Wörter verbindet\n• Verwenden Sie den ersten Buchstaben jedes Wortes für ein Akronym\n• Visualisieren Sie lebendige Bilder für jedes Wort'
    },
    patternPath: {
      welcome: 'Willkommen bei Muster-Pfad!',
      intro: 'Trainieren Sie Ihr räumliches Gedächtnis, indem Sie sich Pfade auf einem Raster merken und nachzeichnen.',
      steps: '1. Beobachten Sie, wie ein Pfad auf dem Raster gezeichnet wird\n2. Merken Sie sich die Sequenz der Zellen\n3. Erstellen Sie den Pfad neu, indem Sie Zellen in der Reihenfolge klicken\n4. Zellen müssen benachbart sein (keine Diagonalen)',
      tips: '• Achten Sie auf die Richtungsindikatoren\n• Teilen Sie lange Pfade in kleinere Abschnitte\n• Verwenden Sie Orientierungspunkte oder Muster, um sich Wendungen zu merken'
    },
    nBack: {
      welcome: 'Willkommen bei N-Back-Herausforderung!',
      intro: 'Testen und verbessern Sie Ihr Arbeitsgedächtnis mit dieser wissenschaftlich validierten Aufgabe.',
      steps: '1. Buchstaben erscheinen nacheinander auf dem Bildschirm\n2. Drücken Sie LEERTASTE, wenn der aktuelle Buchstabe mit dem N Positionen zurück übereinstimmt\n3. Das Spiel beginnt mit 1-back, dann geht es zu 2-back und 3-back über\n4. Bleiben Sie konzentriert und reagieren Sie schnell, wenn Sie eine Übereinstimmung sehen',
      tips: '• Behalten Sie eine mentale Liste der letzten N Buchstaben\n• Nicht hetzen - Genauigkeit ist wichtiger als Geschwindigkeit\n• Üben Sie regelmäßig, um Ihre Arbeitsgedächtniskapazität zu verbessern\n• Dies ist eine der wenigen wissenschaftlich bewiesenen Gehirntrainingsaufgaben!'
    },
    storyRecall: {
      welcome: 'Willkommen bei Geschichten-Erinnerung!',
      intro: 'Verbessern Sie Ihr episodisches Gedächtnis, indem Sie sich Details aus kurzen Geschichten merken.',
      steps: '1. Lesen Sie die Geschichte während des Timers aufmerksam\n2. Achten Sie auf spezifische Details (Namen, Farben, Zahlen, Orte)\n3. Beantworten Sie Multiple-Choice-Fragen zur Geschichte\n4. Keine Notizen erlaubt - verlassen Sie sich auf Ihr Gedächtnis!',
      tips: '• Erstellen Sie beim Lesen mentale Bilder\n• Achten Sie auf Wer, Was, Wann, Wo und Wie\n• Verbinden Sie Details, um eine zusammenhängende Geschichte zu bilden\n• Je mehr Sie sich mit der Geschichte beschäftigen, desto besser erinnern Sie sich'
    },
    changeDetection: {
      welcome: 'Willkommen bei Veränderungserkennung!',
      intro: 'Trainieren Sie Ihr visuelles Arbeitsgedächtnis, indem Sie erkennen, was sich in einer Szene verändert hat.',
      steps: '1. Studieren Sie die Szene während der Betrachtungsphase aufmerksam\n2. Nach einem kurzen leeren Bildschirm erscheint die Szene mit EINER Veränderung wieder\n3. Klicken Sie auf das Objekt, das sich verändert hat\n4. Veränderungen können sein: Farbe, Position oder Größe',
      tips: '• Versuchen Sie, sich Position und Farbe jedes Objekts zu merken\n• Erstellen Sie einen mentalen Schnappschuss der Szene\n• Gruppieren Sie Objekte nach Ort oder Farbe, um besser zu merken\n• Mit zunehmender Schwierigkeit erscheinen mehr Objekte'
    },
    colorSequence: {
      welcome: 'Willkommen bei Farb-Sequenz!',
      intro: 'Meistern Sie Farbmuster und sequenzielles Gedächtnis mit dieser lebendigen Herausforderung.',
      steps: '1. Beobachten Sie, wie Farben nacheinander aufblinken\n2. Nach Ende der Sequenz sind Sie dran\n3. Klicken Sie die Farben in genau der gleichen Reihenfolge\n4. Jedes Level fügt eine weitere Farbe zur Sequenz hinzu',
      tips: '• Sagen Sie die Farben laut (oder in Gedanken), während sie blinken\n• Erstellen Sie einen Rhythmus oder ein Muster mit den Farben\n• Nutzen Sie die Farbpositionen, um sich die Sequenz zu merken\n• Drei Fehler und das Spiel endet - bleiben Sie konzentriert!'
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
    dataManagement: '📦 Datenverwaltung',
    exportProgress: '💾 Fortschritt exportieren',
    exportProgressDesc: 'Laden Sie Ihren Fortschritt und Erfolge herunter (verschlüsselt)',
    importProgress: '📂 Fortschritt importieren',
    importProgressDesc: 'Aus einer Sicherungsdatei wiederherstellen',
    dangerZone: '⚠️ Gefahrenbereich',
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

