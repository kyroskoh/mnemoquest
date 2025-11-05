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
    text: `Sarah drove her red car to the grocery store on Tuesday morning. She bought three apples, a carton of milk, and some fresh bread. On the way home, she stopped at the yellow post office to mail a letter to her sister.`,
    difficulty: 'easy',
    questions: [
      {
        question: "What color was Sarah's car?",
        options: ['Red', 'Blue', 'Yellow', 'Green'],
        correctAnswer: 0
      },
      {
        question: 'When did Sarah go shopping?',
        options: ['Monday morning', 'Tuesday morning', 'Wednesday afternoon', 'Friday evening'],
        correctAnswer: 1
      },
      {
        question: 'What did Sarah buy?',
        options: ['Apples, milk, and bread', 'Oranges, juice, and cookies', 'Bananas, cheese, and eggs', 'Grapes, water, and crackers'],
        correctAnswer: 0
      },
      {
        question: 'Where did Sarah stop on the way home?',
        options: ['Bank', 'Post office', 'Gas station', 'Library'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `Tom found a small brown dog in the park on Saturday afternoon. The dog had a blue collar with a silver tag. Tom called the number on the tag and returned the dog to its owner, who gave him twenty dollars as a reward.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'What color was the dog?',
        options: ['Black', 'White', 'Brown', 'Golden'],
        correctAnswer: 2
      },
      {
        question: 'When did Tom find the dog?',
        options: ['Sunday morning', 'Saturday afternoon', 'Friday evening', 'Monday afternoon'],
        correctAnswer: 1
      },
      {
        question: 'What color was the collar?',
        options: ['Red', 'Green', 'Blue', 'Black'],
        correctAnswer: 2
      },
      {
        question: 'How much reward did Tom receive?',
        options: ['Ten dollars', 'Fifteen dollars', 'Twenty dollars', 'Twenty-five dollars'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `Detective Martinez examined the office carefully. The window was broken from the outside, and glass fragments covered the wooden floor. Three file cabinets stood against the north wall, and the middle one was unlocked and empty. A half-finished coffee cup sat on the mahogany desk next to a silver pen and a notebook with torn pages.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'How was the window broken?',
        options: ['From the inside', 'From the outside', 'Both sides', 'Not mentioned'],
        correctAnswer: 1
      },
      {
        question: 'What material was the floor?',
        options: ['Tile', 'Carpet', 'Wood', 'Concrete'],
        correctAnswer: 2
      },
      {
        question: 'Which file cabinet was empty?',
        options: ['The left one', 'The middle one', 'The right one', 'All of them'],
        correctAnswer: 1
      },
      {
        question: 'What was on the desk?',
        options: ['Coffee, pen, and notebook', 'Tea, pencil, and paper', 'Coffee, pencil, and folder', 'Water, pen, and magazine'],
        correctAnswer: 0
      },
      {
        question: 'What material was the desk?',
        options: ['Oak', 'Pine', 'Mahogany', 'Maple'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `Dr. Chen reviewed the patient's chart at 2:15 PM. Blood pressure was 120/80, temperature 98.6°F, and heart rate 72 beats per minute. The patient reported headaches for three days and dizziness when standing. Dr. Chen prescribed medication and scheduled a follow-up appointment for Thursday at 10 AM.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'What time did Dr. Chen review the chart?',
        options: ['1:15 PM', '2:15 PM', '3:15 PM', '4:15 PM'],
        correctAnswer: 1
      },
      {
        question: 'What was the heart rate?',
        options: ['68 bpm', '70 bpm', '72 bpm', '75 bpm'],
        correctAnswer: 2
      },
      {
        question: 'How long had the patient had headaches?',
        options: ['Two days', 'Three days', 'Four days', 'Five days'],
        correctAnswer: 1
      },
      {
        question: 'When was the follow-up appointment?',
        options: ['Wednesday at 10 AM', 'Thursday at 10 AM', 'Thursday at 2 PM', 'Friday at 10 AM'],
        correctAnswer: 1
      },
      {
        question: 'What was the temperature?',
        options: ['98.2°F', '98.4°F', '98.6°F', '99.0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `Professor Williams discovered an ancient manuscript in the university library's third basement level on October 15th. The document, written in Latin on yellowed parchment, dated back to 1347. It contained references to a merchant named Giovanni Bellini who traded spices between Venice and Constantinople. The manuscript mentioned seven different spice routes and included hand-drawn maps with detailed compass bearings.`,
    difficulty: 'hard',
    questions: [
      {
        question: 'Where was the manuscript found?',
        options: ['Second basement', 'Third basement', 'Fourth basement', 'Fifth basement'],
        correctAnswer: 1
      },
      {
        question: 'What was the date of discovery?',
        options: ['October 10th', 'October 12th', 'October 15th', 'October 20th'],
        correctAnswer: 2
      },
      {
        question: 'What year did the manuscript date back to?',
        options: ['1337', '1347', '1357', '1367'],
        correctAnswer: 1
      },
      {
        question: 'What was the merchant\'s name?',
        options: ['Giovanni Bellini', 'Marco Bellini', 'Giovanni Rossi', 'Marco Rossi'],
        correctAnswer: 0
      },
      {
        question: 'Between which cities did the merchant trade?',
        options: ['Rome and Athens', 'Venice and Constantinople', 'Florence and Cairo', 'Genoa and Alexandria'],
        correctAnswer: 1
      },
      {
        question: 'How many spice routes were mentioned?',
        options: ['Five', 'Six', 'Seven', 'Eight'],
        correctAnswer: 2
      }
    ]
  }
];

