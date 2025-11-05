import { Translation } from '../core/TranslationManager';

const it: Translation = {
  nav: {
    home: 'Home',
    progress: 'Progressi',
    settings: 'Impostazioni',
    about: 'Informazioni'
  },
  
  dashboard: {
    welcome: 'Benvenuto nel Tuo Percorso di Allenamento della Memoria',
    subtitle: 'Migliora le tue capacità cognitive attraverso mini-giochi divertenti e scientificamente validati',
    totalXP: 'XP Totali',
    dayStreak: 'Giorni Consecutivi',
    avgAccuracy: 'Precisione Media',
    gamesPlayed: 'Partite Giocate',
    chooseChallenge: 'Scegli la Tua Sfida'
  },
  
  games: {
    memoryGrid: {
      name: 'Griglia di Memoria',
      description: 'Ricorda le posizioni dei simboli in una griglia',
      skill: 'Memoria Spaziale',
      instructions: 'Memorizza le posizioni dei simboli evidenziati...',
      recall: 'Clicca sulle celle che avevano i simboli!'
    },
    sequenceSparks: {
      name: 'Sequenze Luminose',
      description: 'Ricorda e ripeti sequenze di luci',
      skill: 'Memoria di Lavoro',
      instructions: 'Guarda la sequenza e ripetila...',
      watch: 'Guarda la sequenza...',
      repeat: 'Ora ripeti la sequenza!',
      wrong: 'Ops! Sequenza sbagliata. Prova la prossima!'
    },
    cardMatch: {
      name: 'Abbina le Carte',
      description: 'Trova le coppie sotto pressione di tempo',
      skill: 'Memoria Visiva',
      instructions: 'Trova tutte le coppie prima che scada il tempo!',
      memorizePhase: 'Memorizza le carte!',
      playPhase: 'Trova le coppie corrispondenti!',
      cardsFlipIn: 'Le carte si girano tra...'
    },
    numberRecall: {
      name: 'Richiamo Numerico',
      description: 'Ricorda sequenze di numeri',
      skill: 'Memoria Numerica',
      instructions: 'Guarda attentamente i numeri...',
      enterNumbers: 'Inserisci i numeri',
      submit: 'Invia',
      typeForward: 'Digita i numeri in ordine',
      typeReverse: 'Digita i numeri in ordine INVERSO',
      enterSomething: 'Per favore inserisci i numeri',
      perfect: 'Perfetto!',
      correct: 'Corretto',
      incorrect: 'Sbagliato',
      correctWas: 'La risposta corretta era',
      reverseMode: '🔄 MODALITÀ INVERSA'
    },
    flashCount: {
      name: 'Conteggio Lampo',
      description: 'Conta gli oggetti che lampeggiano sullo schermo',
      skill: 'Attenzione Rapida',
      instructions: 'Gli oggetti lampeggeranno brevemente. Conta il tipo specifico richiesto!',
      question: 'Quanti {shape} {color} c\'erano?',
      shapes: {
        circle: 'cerchi',
        square: 'quadrati',
        triangle: 'triangoli',
        star: 'stelle'
      },
      colors: {
        red: 'rossi',
        blue: 'blu',
        green: 'verdi',
        yellow: 'gialli',
        purple: 'viola',
        orange: 'arancioni'
      }
    },
    wordTrail: {
      name: 'Traccia di Parole',
      description: 'Ricorda parole in sequenza',
      skill: 'Memoria Verbale',
      instructions: 'Memorizza queste parole in ordine...',
      recall: 'Ora digita le parole in ordine!',
      typeWords: 'Digita ogni parola nell\'ordine corretto',
      wordPlaceholder: 'Parola {num}',
      submit: 'Invia',
      results: 'Risultati',
      correctWords: 'Parole Corrette',
      correctOrder: 'Ordine e Posizione Corretti'
    },
    patternPath: {
      name: 'Percorso di Pattern',
      description: 'Ricorda e traccia percorsi su una griglia',
      skill: 'Sequenza Spaziale',
      instructions: 'Guarda il percorso e ricordalo...',
      watch: 'Guarda attentamente il percorso...',
      recall: 'Ora traccia lo stesso percorso!',
      clear: 'Cancella',
      submit: 'Invia'
    },
    nBack: {
      name: 'Sfida N-Back',
      description: 'Testa la memoria di lavoro con il gold standard dei compiti cognitivi',
      skill: 'Memoria di Lavoro',
      back: 'Indietro',
      howToPlay: 'Come Giocare',
      instruction1: 'Le lettere appariranno una alla volta. Premi SPAZIO (o tocca il pulsante MATCH) quando la lettera corrente corrisponde a quella {n} posizioni indietro.',
      instruction2: 'Concentrati e rispondi rapidamente quando vedi una corrispondenza!',
      example: 'Esempio',
      exampleText: 'In 1-back: A G B B (✓ premi qui, B corrisponde 1 indietro) | A B C D (✗ non premere, D ≠ C)',
      trial: 'Prova',
      press: 'Premi SPAZIO o tocca il pulsante quando vedi una corrispondenza',
      match: 'MATCH!',
      hits: 'Colpi',
      misses: 'Errori'
    },
    storyRecall: {
      name: 'Richiamo di Storie',
      description: 'Ricorda i dettagli di brevi racconti',
      skill: 'Memoria Episodica',
      instructions: 'Leggi attentamente la storia e ricorda i dettagli...',
      question: 'Domanda',
      continue: 'Continua'
    },
    changeDetection: {
      name: 'Rilevamento Cambiamenti',
      description: 'Individua cosa è cambiato in una scena',
      skill: 'Memoria Visiva di Lavoro',
      instructions: 'Studia la scena, poi identifica cosa è cambiato!',
      round: 'Round',
      memorize: 'Memorizza questa scena...',
      findChange: 'Cosa è cambiato? Cliccaci sopra!'
    },
    colorSequence: {
      name: 'Sequenza di Colori',
      description: 'Ricorda e ripeti pattern di colori',
      skill: 'Memoria dei Colori',
      instructions: 'Guarda i colori lampeggiare in sequenza, poi cliccali nello stesso ordine!',
      level: 'Livello',
      sequence: 'Sequenza',
      watch: 'Guarda la sequenza...',
      yourTurn: 'Il tuo turno! Clicca i colori in ordine',
      correct: 'Corretto!',
      wrong: 'Sequenza sbagliata!',
      correctWas: 'La sequenza corretta era:'
    },
    playNow: 'Gioca Ora'
  },
  
  tutorial: {
    skip: 'Salta Tutorial',
    back: 'Indietro',
    next: 'Avanti',
    startPlaying: 'Inizia a Giocare!',
    howToPlay: 'Come Giocare',
    tips: 'Suggerimenti',
    memoryGrid: {
      welcome: 'Benvenuto a Griglia di Memoria!',
      intro: 'Testa la tua memoria spaziale ricordando dove appaiono i simboli sulla griglia.',
      steps: '1. Guarda attentamente mentre i simboli appaiono sulla griglia\n2. Memorizza le loro posizioni\n3. Quando la griglia si svuota, clicca sulle celle che avevano i simboli\n4. Completa 5 round per finire il gioco',
      tips: '• La griglia verrà mostrata solo per pochi secondi - concentrati!\n• Man mano che migliori, la difficoltà aumenterà\n• Cerca di visualizzare pattern o creare associazioni mentali'
    },
    sequenceSparks: {
      welcome: 'Benvenuto a Sequenze Luminose!',
      intro: 'Allena la tua memoria di lavoro ripetendo sequenze di luci lampeggianti.',
      steps: '1. Guarda i pulsanti colorati illuminarsi in sequenza\n2. Aspetta che la sequenza finisca\n3. Clicca i pulsanti nello stesso ordine\n4. La sequenza diventa più lunga ad ogni round',
      tips: '• Concentrati su un pulsante alla volta\n• Prova a dire i colori ad alta voce per rafforzare la memoria\n• Crea un ritmo o un pattern nella tua mente'
    },
    cardMatch: {
      welcome: 'Benvenuto ad Abbina le Carte!',
      intro: 'Sfida la tua memoria visiva abbinando coppie di carte prima che scada il tempo.',
      steps: '1. Clicca sulle carte per girarle\n2. Cerca di trovare le coppie corrispondenti\n3. Ricorda dove si trova ogni simbolo\n4. Abbina tutte le coppie prima che scada il timer',
      tips: '• Inizia girando le carte sistematicamente\n• Presta attenzione alle posizioni dei simboli\n• Lavora velocemente ma con precisione per risparmiare tempo'
    },
    numberRecall: {
      welcome: 'Benvenuto a Richiamo Numerico!',
      intro: 'Allena la tua memoria numerica ricordando sequenze di cifre.',
      steps: '1. Guarda i numeri apparire uno per uno\n2. Memorizza la sequenza\n3. Digita i numeri in ordine (o in ordine inverso per livelli più difficili)\n4. Invia la tua risposta',
      tips: '• Prova a raggruppare i numeri (come i numeri di telefono)\n• Crea pattern o associazioni\n• In modalità inversa, visualizza la sequenza al contrario'
    },
    flashCount: {
      welcome: 'Benvenuto a Conteggio Lampo!',
      intro: 'Testa la tua attenzione visiva contando oggetti che lampeggiano brevemente sullo schermo.',
      steps: '1. Gli oggetti lampeggeranno per un breve istante\n2. Conta tipi specifici (colore + forma)\n3. Seleziona il conteggio corretto dalle opzioni\n4. Completa 5 round',
      tips: '• Concentrati sul tipo target prima che gli oggetti appaiano\n• Pratica il subitizing (riconoscere istantaneamente piccole quantità)\n• Non cercare di contare tutto - solo ciò che viene chiesto'
    },
    wordTrail: {
      welcome: 'Benvenuto a Traccia di Parole!',
      intro: 'Sfida la tua memoria verbale ricordando parole in sequenza.',
      steps: '1. Guarda le parole apparire una alla volta\n2. Memorizzale in ordine\n3. Digita ogni parola nella posizione corretta\n4. Invia quando hai finito',
      tips: '• Crea una storia che collega le parole\n• Usa la prima lettera di ogni parola per creare un acronimo\n• Visualizza immagini vivide per ogni parola'
    },
    patternPath: {
      welcome: 'Benvenuto a Percorso di Pattern!',
      intro: 'Allena la tua memoria spaziale ricordando e tracciando percorsi su una griglia.',
      steps: '1. Guarda mentre un percorso viene disegnato sulla griglia\n2. Memorizza la sequenza di celle\n3. Ricrea il percorso cliccando le celle in ordine\n4. Le celle devono essere adiacenti (no diagonali)',
      tips: '• Presta attenzione agli indicatori di direzione\n• Dividi percorsi lunghi in pezzi più piccoli\n• Usa punti di riferimento o pattern per ricordare le svolte'
    },
    nBack: {
      welcome: 'Benvenuto a Sfida N-Back!',
      intro: 'Testa e migliora la tua memoria di lavoro con questo compito scientificamente validato.',
      steps: '1. Le lettere appariranno una alla volta sullo schermo\n2. Premi SPAZIO quando la lettera corrente corrisponde a quella N posizioni indietro\n3. Il gioco inizia con 1-back, poi progredisce a 2-back e 3-back\n4. Resta concentrato e rispondi rapidamente quando vedi una corrispondenza',
      tips: '• Mantieni una lista mentale delle ultime N lettere\n• Non avere fretta - la precisione è più importante della velocità\n• Pratica regolarmente per migliorare la capacità della tua memoria di lavoro\n• Questo è uno dei pochi compiti di allenamento cerebrale scientificamente provati!'
    },
    storyRecall: {
      welcome: 'Benvenuto a Richiamo di Storie!',
      intro: 'Migliora la tua memoria episodica ricordando dettagli di brevi racconti.',
      steps: '1. Leggi la storia attentamente durante il timer\n2. Presta attenzione a dettagli specifici (nomi, colori, numeri, luoghi)\n3. Rispondi a domande a scelta multipla sulla storia\n4. Non sono ammessi appunti - affidati alla tua memoria!',
      tips: '• Crea immagini mentali mentre leggi\n• Presta attenzione a chi, cosa, quando, dove e come\n• Collega i dettagli insieme per formare una storia coerente\n• Più ti impegni con la storia, meglio la ricorderai'
    },
    changeDetection: {
      welcome: 'Benvenuto a Rilevamento Cambiamenti!',
      intro: 'Allena la tua memoria visiva di lavoro individuando cosa è cambiato in una scena.',
      steps: '1. Studia la scena attentamente durante la fase di visualizzazione\n2. Dopo un breve schermo vuoto, la scena riappare con UN cambiamento\n3. Clicca sull\'oggetto che è cambiato\n4. I cambiamenti possono essere: colore, posizione o dimensione',
      tips: '• Cerca di ricordare la posizione e il colore di ogni oggetto\n• Crea un\'istantanea mentale della scena\n• Raggruppa gli oggetti per posizione o colore per ricordarli meglio\n• Man mano che la difficoltà aumenta, appariranno più oggetti'
    },
    colorSequence: {
      welcome: 'Benvenuto a Sequenza di Colori!',
      intro: 'Padroneggia i pattern di colori e la memoria sequenziale con questa sfida vibrante.',
      steps: '1. Guarda i colori lampeggiare in sequenza\n2. Dopo che la sequenza finisce, è il tuo turno\n3. Clicca i colori nello stesso ordine esatto\n4. Ogni livello aggiunge un colore in più alla sequenza',
      tips: '• Pronuncia i colori ad alta voce (o nella tua mente) mentre lampeggiano\n• Crea un ritmo o un pattern con i colori\n• Usa le posizioni dei colori per aiutarti a ricordare la sequenza\n• Tre errori e il gioco finisce - resta concentrato!'
    }
  },
  
  gameUI: {
    backToDashboard: 'Torna alla Dashboard',
    level: 'Livello',
    round: 'Round',
    time: 'Tempo',
    score: 'Punteggio',
    accuracy: 'Precisione',
    mistakes: 'Errori',
    pairsFound: 'Coppie Trovate',
    ready: 'Sono Pronto!'
  },
  
  results: {
    gameComplete: 'Gioco Completato! 🎉',
    score: 'Punteggio',
    accuracy: 'Precisione',
    time: 'Tempo',
    xpGained: 'XP Guadagnati',
    level: 'Livello',
    playAgain: 'Gioca Ancora',
    backToDashboard: 'Torna alla Dashboard'
  },
  
  progress: {
    title: 'I Tuoi Progressi',
    yourProgress: 'I Tuoi Progressi',
    recentGames: 'Partite Recenti',
    accuracyLabel: 'Precisione %',
    accuracyTrend: 'Tendenza Precisione Recente',
    gamesPlayedLabel: 'Partite Giocate',
    gamesByType: 'Partite Giocate per Tipo',
    achievements: 'Obiettivi',
    game: 'Partita'
  },
  
  settings: {
    title: 'Impostazioni',
    soundEffects: '🔊 Effetti Sonori',
    colorBlindMode: '🎨 Modalità Daltonici',
    animations: '✨ Animazioni',
    language: '🌍 Lingua',
    applyLanguage: 'Applica Lingua',
    dataManagement: '📦 Gestione Dati',
    exportProgress: '💾 Esporta Progressi',
    exportProgressDesc: 'Scarica i tuoi progressi e obiettivi (crittografati)',
    importProgress: '📂 Importa Progressi',
    importProgressDesc: 'Ripristina da un file di backup',
    dangerZone: '⚠️ Zona Pericolosa',
    resetProgress: 'Reimposta Tutti i Progressi',
    resetConfirm: 'Sei sicuro di voler reimpostare tutti i progressi? Questa azione non può essere annullata.',
    resetSuccess: 'Progressi reimpostati con successo!'
  },
  
  about: {
    title: 'Informazioni su MnemoQuest',
    description: 'MnemoQuest è una piattaforma di allenamento cognitivo basata sulla scienza, progettata per migliorare la tua memoria, concentrazione e velocità di richiamo.',
    howItWorks: 'Come Funziona',
    howItWorksText: 'Il nostro sistema di difficoltà adattiva regola le sfide in base alle tue prestazioni, assicurando che tu sia sempre nella zona di apprendimento ottimale.',
    benefits: 'Benefici',
    benefit1: 'Migliora il richiamo a breve termine e la memoria di lavoro',
    benefit2: 'Migliora le capacità di riconoscimento spaziale',
    benefit3: 'Aumenta concentrazione e focus',
    benefit4: 'Traccia i tuoi progressi cognitivi nel tempo',
    developer: 'Sviluppatore',
    version: 'Versione 1.0.0 • Costruito con TypeScript & Vite • Licenza MIT'
  },
  
  common: {
    loading: 'Caricamento...',
    error: 'Si è verificato un errore',
    ok: 'OK',
    cancel: 'Annulla',
    yes: 'Sì',
    no: 'No'
  },
  
  badges: {
    // === PROGRESSIONE A VITA ===
    firstSteps: {
      name: 'Primi Passi',
      description: 'Completa il tuo primo gioco'
    },
    dedicated: {
      name: 'Dedicato',
      description: 'Gioca 10 partite'
    },
    committed: {
      name: 'Impegnato',
      description: 'Gioca 50 partite'
    },
    centurion: {
      name: 'Centurione',
      description: 'Gioca 100 partite'
    },
    legendary: {
      name: 'Leggendario',
      description: 'Gioca 500 partite'
    },
    xp1000: {
      name: 'Stella Nascente',
      description: 'Guadagna 1.000 XP'
    },
    xp5000: {
      name: 'Splendente',
      description: 'Guadagna 5.000 XP'
    },
    xp10000: {
      name: 'Campione',
      description: 'Guadagna 10.000 XP'
    },
    level5: {
      name: 'Livello 5',
      description: 'Raggiungi il livello 5'
    },
    level10: {
      name: 'Livello 10',
      description: 'Raggiungi il livello 10'
    },
    level20: {
      name: 'Livello 20',
      description: 'Raggiungi il livello 20'
    },
    level50: {
      name: 'Livello 50',
      description: 'Raggiungi il livello 50'
    },
    versatile: {
      name: 'Versatile',
      description: 'Gioca 5 tipi di giochi diversi'
    },
    memoryMaster: {
      name: 'Maestro della Memoria',
      description: 'Gioca 20+ giochi di memoria'
    },
    highScorer: {
      name: 'Alto Punteggio',
      description: 'Ottieni 1000+ punti in un gioco'
    },
    // === BASATO SU ABITUDINI QUOTIDIANE ===
    streak3: {
      name: 'Serie di 3 Giorni',
      description: 'Gioca 3 giorni di fila'
    },
    streak7: {
      name: 'Guerriero Settimanale',
      description: 'Gioca 7 giorni di fila'
    },
    streak30: {
      name: 'Maestro Mensile',
      description: 'Gioca 30 giorni di fila'
    },
    streak100: {
      name: 'Inarrestabile',
      description: 'Gioca 100 giorni di fila'
    },
    earlyBird: {
      name: 'Mattiniero',
      description: 'Gioca tra le 6-10 del mattino'
    },
    nightOwl: {
      name: 'Nottambulo',
      description: 'Gioca tra mezzanotte e le 4 del mattino'
    },
    weekendWarrior: {
      name: 'Guerriero del Weekend',
      description: 'Gioca sia sabato che domenica'
    },
    // === OBIETTIVI GIORNALIERI ===
    daily100xp: {
      name: 'Guadagno Giornaliero',
      description: 'Guadagna 100 XP in un giorno'
    },
    daily500xp: {
      name: 'Macinatore Giornaliero',
      description: 'Guadagna 500 XP in un giorno'
    },
    daily1000xp: {
      name: 'Campione Giornaliero',
      description: 'Guadagna 1000 XP in un giorno'
    },
    daily5games: {
      name: 'Giocatore Giornaliero',
      description: 'Gioca 5 partite in un giorno'
    },
    daily10games: {
      name: 'Maratoneta Giornaliero',
      description: 'Gioca 10 partite in un giorno'
    },
    daily20games: {
      name: 'Leggenda Giornaliera',
      description: 'Gioca 20 partite in un giorno'
    },
    dailyVariety: {
      name: 'Esploratore Giornaliero',
      description: 'Gioca 3 tipi di giochi diversi oggi'
    },
    dailyAllGames: {
      name: 'Tuttofare',
      description: 'Gioca 5 tipi di giochi diversi oggi'
    },
    dailyFocused: {
      name: 'Specialista Giornaliero',
      description: 'Gioca lo stesso gioco 5 volte oggi'
    },
    // === BASATO SULLE PRESTAZIONI ===
    sharpMind: {
      name: 'Mente Acuta',
      description: '80% precisione media (10+ partite)'
    },
    perfectionist: {
      name: 'Perfezionista',
      description: '95% precisione media (20+ partite)'
    },
    flawless: {
      name: 'Impeccabile',
      description: 'Ottieni 100% di precisione in un gioco'
    },
    noMistakes: {
      name: 'Serie Perfetta',
      description: 'Ottieni 100% di precisione in 5 partite'
    }
  }
};

export default it;

