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
    text: `Sarah a conduit sa voiture rouge à l'épicerie mardi matin. Elle a acheté trois pommes, une brique de lait et du pain frais. Sur le chemin du retour, elle s'est arrêtée au bureau de poste jaune pour envoyer une lettre à sa sœur.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'De quelle couleur était la voiture de Sarah ?',
        options: ['Rouge', 'Bleue', 'Jaune', 'Verte'],
        correctAnswer: 0
      },
      {
        question: 'Quand Sarah est-elle allée faire les courses ?',
        options: ['Lundi matin', 'Mardi matin', 'Mercredi après-midi', 'Vendredi soir'],
        correctAnswer: 1
      },
      {
        question: 'Qu\'a acheté Sarah ?',
        options: ['Pommes, lait et pain', 'Oranges, jus et biscuits', 'Bananes, fromage et œufs', 'Raisins, eau et crackers'],
        correctAnswer: 0
      },
      {
        question: 'Où Sarah s\'est-elle arrêtée en rentrant ?',
        options: ['Banque', 'Bureau de poste', 'Station-service', 'Bibliothèque'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `Tom a trouvé un petit chien marron dans le parc samedi après-midi. Le chien avait un collier bleu avec une plaque argentée. Tom a appelé le numéro sur la plaque et a rendu le chien à son propriétaire, qui lui a donné vingt dollars en récompense.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'De quelle couleur était le chien ?',
        options: ['Noir', 'Blanc', 'Marron', 'Doré'],
        correctAnswer: 2
      },
      {
        question: 'Quand Tom a-t-il trouvé le chien ?',
        options: ['Dimanche matin', 'Samedi après-midi', 'Vendredi soir', 'Lundi après-midi'],
        correctAnswer: 1
      },
      {
        question: 'De quelle couleur était le collier ?',
        options: ['Rouge', 'Vert', 'Bleu', 'Noir'],
        correctAnswer: 2
      },
      {
        question: 'Combien Tom a-t-il reçu en récompense ?',
        options: ['Dix dollars', 'Quinze dollars', 'Vingt dollars', 'Vingt-cinq dollars'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `Le détective Martinez a examiné le bureau attentivement. La fenêtre était cassée de l'extérieur, et des fragments de verre couvraient le plancher en bois. Trois classeurs étaient contre le mur nord, et celui du milieu était déverrouillé et vide. Une tasse de café à moitié finie était posée sur le bureau en acajou à côté d'un stylo argenté et d'un cahier aux pages déchirées.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'Comment la fenêtre a-t-elle été cassée ?',
        options: ['De l\'intérieur', 'De l\'extérieur', 'Des deux côtés', 'Non mentionné'],
        correctAnswer: 1
      },
      {
        question: 'De quel matériau était le plancher ?',
        options: ['Carrelage', 'Moquette', 'Bois', 'Béton'],
        correctAnswer: 2
      },
      {
        question: 'Quel classeur était vide ?',
        options: ['Celui de gauche', 'Celui du milieu', 'Celui de droite', 'Tous'],
        correctAnswer: 1
      },
      {
        question: 'Qu\'y avait-il sur le bureau ?',
        options: ['Café, stylo et cahier', 'Thé, crayon et papier', 'Café, crayon et dossier', 'Eau, stylo et magazine'],
        correctAnswer: 0
      },
      {
        question: 'De quel matériau était le bureau ?',
        options: ['Chêne', 'Pin', 'Acajou', 'Érable'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `Le Dr Chen a examiné le dossier du patient à 14h15. La tension artérielle était de 120/80, la température de 98,6°F et la fréquence cardiaque de 72 battements par minute. Le patient a signalé des maux de tête pendant trois jours et des vertiges en se levant. Le Dr Chen a prescrit des médicaments et prévu un rendez-vous de suivi jeudi à 10h.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'À quelle heure le Dr Chen a-t-il examiné le dossier ?',
        options: ['13h15', '14h15', '15h15', '16h15'],
        correctAnswer: 1
      },
      {
        question: 'Quelle était la fréquence cardiaque ?',
        options: ['68 bpm', '70 bpm', '72 bpm', '75 bpm'],
        correctAnswer: 2
      },
      {
        question: 'Depuis combien de temps le patient avait-il des maux de tête ?',
        options: ['Deux jours', 'Trois jours', 'Quatre jours', 'Cinq jours'],
        correctAnswer: 1
      },
      {
        question: 'Quand était le rendez-vous de suivi ?',
        options: ['Mercredi à 10h', 'Jeudi à 10h', 'Jeudi à 14h', 'Vendredi à 10h'],
        correctAnswer: 1
      },
      {
        question: 'Quelle était la température ?',
        options: ['98,2°F', '98,4°F', '98,6°F', '99,0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `Le professeur Williams a découvert un manuscrit ancien au troisième sous-sol de la bibliothèque universitaire le 15 octobre. Le document, écrit en latin sur un parchemin jauni, datait de 1347. Il contenait des références à un marchand nommé Giovanni Bellini qui commerçait des épices entre Venise et Constantinople. Le manuscrit mentionnait sept routes d'épices différentes et comprenait des cartes dessinées à la main avec des orientations de boussole détaillées.`,
    difficulty: 'hard',
    questions: [
      {
        question: 'Où le manuscrit a-t-il été trouvé ?',
        options: ['Deuxième sous-sol', 'Troisième sous-sol', 'Quatrième sous-sol', 'Cinquième sous-sol'],
        correctAnswer: 1
      },
      {
        question: 'Quelle était la date de la découverte ?',
        options: ['10 octobre', '12 octobre', '15 octobre', '20 octobre'],
        correctAnswer: 2
      },
      {
        question: 'De quelle année datait le manuscrit ?',
        options: ['1337', '1347', '1357', '1367'],
        correctAnswer: 1
      },
      {
        question: 'Quel était le nom du marchand ?',
        options: ['Giovanni Bellini', 'Marco Bellini', 'Giovanni Rossi', 'Marco Rossi'],
        correctAnswer: 0
      },
      {
        question: 'Entre quelles villes le marchand commerçait-il ?',
        options: ['Rome et Athènes', 'Venise et Constantinople', 'Florence et Le Caire', 'Gênes et Alexandrie'],
        correctAnswer: 1
      },
      {
        question: 'Combien de routes d\'épices étaient mentionnées ?',
        options: ['Cinq', 'Six', 'Sept', 'Huit'],
        correctAnswer: 2
      }
    ]
  }
];

