export interface StoryQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface StoryData {
  text: string;
  questions: StoryQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const stories: StoryData[] = [
  // Easy stories
  {
    text: `Sarah guidava la sua auto rossa al supermercato martedì mattina. Ha comprato tre mele, un cartone di latte e del pane fresco. Sulla via di casa, si è fermata all'ufficio postale giallo per spedire una lettera a sua sorella.`,
    difficulty: 'easy',
    questions: [
      {
        question: "Di che colore era l'auto di Sarah?",
        options: ['Rossa', 'Blu', 'Gialla', 'Verde'],
        correctAnswer: 0
      },
      {
        question: 'Quando è andata Sarah a fare la spesa?',
        options: ['Lunedì mattina', 'Martedì mattina', 'Mercoledì pomeriggio', 'Venerdì sera'],
        correctAnswer: 1
      },
      {
        question: 'Cosa ha comprato Sarah?',
        options: ['Mele, latte e pane', 'Arance, succo e biscotti', 'Banane, formaggio e uova', 'Uva, acqua e crackers'],
        correctAnswer: 0
      },
      {
        question: 'Dove si è fermata Sarah sulla via di casa?',
        options: ['Banca', 'Ufficio postale', 'Stazione di servizio', 'Biblioteca'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `Tom ha trovato un piccolo cane marrone nel parco sabato pomeriggio. Il cane aveva un collare blu con una targhetta argentata. Tom ha chiamato il numero sulla targhetta e ha restituito il cane al proprietario, che gli ha dato venti dollari come ricompensa.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'Di che colore era il cane?',
        options: ['Nero', 'Bianco', 'Marrone', 'Dorato'],
        correctAnswer: 2
      },
      {
        question: 'Quando ha trovato Tom il cane?',
        options: ['Domenica mattina', 'Sabato pomeriggio', 'Venerdì sera', 'Lunedì pomeriggio'],
        correctAnswer: 1
      },
      {
        question: 'Di che colore era il collare?',
        options: ['Rosso', 'Verde', 'Blu', 'Nero'],
        correctAnswer: 2
      },
      {
        question: 'Quanta ricompensa ha ricevuto Tom?',
        options: ['Dieci dollari', 'Quindici dollari', 'Venti dollari', 'Venticinque dollari'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `Il detective Martinez ha esaminato attentamente l'ufficio. La finestra era rotta dall'esterno e frammenti di vetro coprivano il pavimento in legno. Tre schedari stavano contro il muro nord, e quello centrale era aperto e vuoto. Una tazza di caffè mezza finita era sulla scrivania in mogano accanto a una penna argentata e un taccuino con pagine strappate.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'Come era stata rotta la finestra?',
        options: ["Dall'interno", "Dall'esterno", 'Da entrambi i lati', 'Non menzionato'],
        correctAnswer: 1
      },
      {
        question: 'Di che materiale era il pavimento?',
        options: ['Piastrelle', 'Moquette', 'Legno', 'Cemento'],
        correctAnswer: 2
      },
      {
        question: 'Quale schedario era vuoto?',
        options: ['Quello di sinistra', 'Quello centrale', 'Quello di destra', 'Tutti'],
        correctAnswer: 1
      },
      {
        question: "Cosa c'era sulla scrivania?",
        options: ['Caffè, penna e taccuino', 'Tè, matita e carta', 'Caffè, matita e cartella', 'Acqua, penna e rivista'],
        correctAnswer: 0
      },
      {
        question: 'Di che materiale era la scrivania?',
        options: ['Quercia', 'Pino', 'Mogano', 'Acero'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `La Dr.ssa Chen ha esaminato la cartella del paziente alle 14:15. La pressione sanguigna era 120/80, temperatura 37°C, e frequenza cardiaca 72 battiti al minuto. Il paziente ha riferito mal di testa da tre giorni e vertigini quando si alza. La Dr.ssa Chen ha prescritto farmaci e ha fissato un appuntamento di controllo per giovedì alle 10.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'A che ora la Dr.ssa Chen ha esaminato la cartella?',
        options: ['13:15', '14:15', '15:15', '16:15'],
        correctAnswer: 1
      },
      {
        question: 'Qual era la frequenza cardiaca?',
        options: ['68 bpm', '70 bpm', '72 bpm', '75 bpm'],
        correctAnswer: 2
      },
      {
        question: 'Da quanto tempo il paziente aveva mal di testa?',
        options: ['Due giorni', 'Tre giorni', 'Quattro giorni', 'Cinque giorni'],
        correctAnswer: 1
      },
      {
        question: "Quando era l'appuntamento di controllo?",
        options: ['Mercoledì alle 10', 'Giovedì alle 10', 'Giovedì alle 14', 'Venerdì alle 10'],
        correctAnswer: 1
      },
      {
        question: 'Qual era la temperatura?',
        options: ['36.8°C', '37°C', '37.2°C', '37.4°C'],
        correctAnswer: 1
      }
    ]
  },
  // Hard stories
  {
    text: `Il Professor Williams ha scoperto un manoscritto antico nel terzo piano sotterraneo della biblioteca universitaria il 15 ottobre. Il documento, scritto in latino su pergamena ingiallita, risaliva al 1347. Conteneva riferimenti a un mercante di nome Giovanni Bellini che commerciava spezie tra Venezia e Costantinopoli. Il manoscritto menzionava sette diverse rotte delle spezie e includeva mappe disegnate a mano con dettagliati orientamenti della bussola.`,
    difficulty: 'hard',
    questions: [
      {
        question: 'Dove è stato trovato il manoscritto?',
        options: ['Secondo sotterraneo', 'Terzo sotterraneo', 'Quarto sotterraneo', 'Quinto sotterraneo'],
        correctAnswer: 1
      },
      {
        question: 'Qual era la data della scoperta?',
        options: ['10 ottobre', '12 ottobre', '15 ottobre', '20 ottobre'],
        correctAnswer: 2
      },
      {
        question: 'A che anno risaliva il manoscritto?',
        options: ['1337', '1347', '1357', '1367'],
        correctAnswer: 1
      },
      {
        question: 'Qual era il nome del mercante?',
        options: ['Giovanni Bellini', 'Marco Bellini', 'Giovanni Rossi', 'Marco Rossi'],
        correctAnswer: 0
      },
      {
        question: 'Tra quali città commerciava il mercante?',
        options: ['Roma e Atene', 'Venezia e Costantinopoli', 'Firenze e Il Cairo', 'Genova e Alessandria'],
        correctAnswer: 1
      },
      {
        question: 'Quante rotte delle spezie erano menzionate?',
        options: ['Cinque', 'Sei', 'Sette', 'Otto'],
        correctAnswer: 2
      }
    ]
  }
];

