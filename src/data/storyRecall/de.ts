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
    text: `Sarah fuhr am Dienstagmorgen mit ihrem roten Auto zum Lebensmittelgeschäft. Sie kaufte drei Äpfel, eine Packung Milch und frisches Brot. Auf dem Heimweg hielt sie am gelben Postamt an, um einen Brief an ihre Schwester zu schicken.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'Welche Farbe hatte Sarahs Auto?',
        options: ['Rot', 'Blau', 'Gelb', 'Grün'],
        correctAnswer: 0
      },
      {
        question: 'Wann ging Sarah einkaufen?',
        options: ['Montagmorgen', 'Dienstagmorgen', 'Mittwochnachmittag', 'Freitagabend'],
        correctAnswer: 1
      },
      {
        question: 'Was kaufte Sarah?',
        options: ['Äpfel, Milch und Brot', 'Orangen, Saft und Kekse', 'Bananen, Käse und Eier', 'Trauben, Wasser und Cracker'],
        correctAnswer: 0
      },
      {
        question: 'Wo hielt Sarah auf dem Heimweg an?',
        options: ['Bank', 'Postamt', 'Tankstelle', 'Bibliothek'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `Tom fand am Samstagnachmittag einen kleinen braunen Hund im Park. Der Hund hatte ein blaues Halsband mit einer silbernen Marke. Tom rief die Nummer auf der Marke an und gab den Hund seinem Besitzer zurück, der ihm zwanzig Dollar als Belohnung gab.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'Welche Farbe hatte der Hund?',
        options: ['Schwarz', 'Weiß', 'Braun', 'Golden'],
        correctAnswer: 2
      },
      {
        question: 'Wann fand Tom den Hund?',
        options: ['Sonntagmorgen', 'Samstagnachmittag', 'Freitagabend', 'Montagnachmittag'],
        correctAnswer: 1
      },
      {
        question: 'Welche Farbe hatte das Halsband?',
        options: ['Rot', 'Grün', 'Blau', 'Schwarz'],
        correctAnswer: 2
      },
      {
        question: 'Wie viel Belohnung erhielt Tom?',
        options: ['Zehn Dollar', 'Fünfzehn Dollar', 'Zwanzig Dollar', 'Fünfundzwanzig Dollar'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `Detektiv Martinez untersuchte das Büro sorgfältig. Das Fenster war von außen zerbrochen, und Glasscherben bedeckten den Holzboden. Drei Aktenschränke standen an der Nordwand, und der mittlere war unverschlossen und leer. Eine halb ausgetrunkene Kaffeetasse stand auf dem Mahagonischreibtisch neben einem silbernen Stift und einem Notizbuch mit herausgerissenen Seiten.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'Wie wurde das Fenster zerbrochen?',
        options: ['Von innen', 'Von außen', 'Beide Seiten', 'Nicht erwähnt'],
        correctAnswer: 1
      },
      {
        question: 'Aus welchem Material war der Boden?',
        options: ['Fliesen', 'Teppich', 'Holz', 'Beton'],
        correctAnswer: 2
      },
      {
        question: 'Welcher Aktenschrank war leer?',
        options: ['Der linke', 'Der mittlere', 'Der rechte', 'Alle'],
        correctAnswer: 1
      },
      {
        question: 'Was lag auf dem Schreibtisch?',
        options: ['Kaffee, Stift und Notizbuch', 'Tee, Bleistift und Papier', 'Kaffee, Bleistift und Mappe', 'Wasser, Stift und Zeitschrift'],
        correctAnswer: 0
      },
      {
        question: 'Aus welchem Material war der Schreibtisch?',
        options: ['Eiche', 'Kiefer', 'Mahagoni', 'Ahorn'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `Dr. Chen überprüfte die Patientenakte um 14:15 Uhr. Der Blutdruck betrug 120/80, die Temperatur 98,6°F und die Herzfrequenz 72 Schläge pro Minute. Der Patient berichtete über Kopfschmerzen seit drei Tagen und Schwindel beim Aufstehen. Dr. Chen verschrieb Medikamente und vereinbarte einen Folgetermin für Donnerstag um 10 Uhr.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'Um welche Uhrzeit überprüfte Dr. Chen die Akte?',
        options: ['13:15 Uhr', '14:15 Uhr', '15:15 Uhr', '16:15 Uhr'],
        correctAnswer: 1
      },
      {
        question: 'Wie hoch war die Herzfrequenz?',
        options: ['68 Schläge/Min', '70 Schläge/Min', '72 Schläge/Min', '75 Schläge/Min'],
        correctAnswer: 2
      },
      {
        question: 'Wie lange hatte der Patient Kopfschmerzen?',
        options: ['Zwei Tage', 'Drei Tage', 'Vier Tage', 'Fünf Tage'],
        correctAnswer: 1
      },
      {
        question: 'Wann war der Folgetermin?',
        options: ['Mittwoch um 10 Uhr', 'Donnerstag um 10 Uhr', 'Donnerstag um 14 Uhr', 'Freitag um 10 Uhr'],
        correctAnswer: 1
      },
      {
        question: 'Wie hoch war die Temperatur?',
        options: ['98,2°F', '98,4°F', '98,6°F', '99,0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `Professor Williams entdeckte ein altes Manuskript im dritten Untergeschoss der Universitätsbibliothek am 15. Oktober. Das Dokument, auf vergilbtem Pergament in Latein geschrieben, stammte aus dem Jahr 1347. Es enthielt Hinweise auf einen Kaufmann namens Giovanni Bellini, der mit Gewürzen zwischen Venedig und Konstantinopel handelte. Das Manuskript erwähnte sieben verschiedene Gewürzrouten und enthielt handgezeichnete Karten mit detaillierten Kompassrichtungen.`,
    difficulty: 'hard',
    questions: [
      {
        question: 'Wo wurde das Manuskript gefunden?',
        options: ['Zweites Untergeschoss', 'Drittes Untergeschoss', 'Viertes Untergeschoss', 'Fünftes Untergeschoss'],
        correctAnswer: 1
      },
      {
        question: 'Welches war das Datum der Entdeckung?',
        options: ['10. Oktober', '12. Oktober', '15. Oktober', '20. Oktober'],
        correctAnswer: 2
      },
      {
        question: 'Aus welchem Jahr stammte das Manuskript?',
        options: ['1337', '1347', '1357', '1367'],
        correctAnswer: 1
      },
      {
        question: 'Wie hieß der Kaufmann?',
        options: ['Giovanni Bellini', 'Marco Bellini', 'Giovanni Rossi', 'Marco Rossi'],
        correctAnswer: 0
      },
      {
        question: 'Zwischen welchen Städten handelte der Kaufmann?',
        options: ['Rom und Athen', 'Venedig und Konstantinopel', 'Florenz und Kairo', 'Genua und Alexandria'],
        correctAnswer: 1
      },
      {
        question: 'Wie viele Gewürzrouten wurden erwähnt?',
        options: ['Fünf', 'Sechs', 'Sieben', 'Acht'],
        correctAnswer: 2
      }
    ]
  }
];

