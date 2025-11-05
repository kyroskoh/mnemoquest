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
    text: `Sara condujo su auto rojo a la tienda de comestibles el martes por la mañana. Compró tres manzanas, un cartón de leche y pan fresco. De camino a casa, se detuvo en la oficina de correos amarilla para enviar una carta a su hermana.`,
    difficulty: 'easy',
    questions: [
      {
        question: '¿De qué color era el auto de Sara?',
        options: ['Rojo', 'Azul', 'Amarillo', 'Verde'],
        correctAnswer: 0
      },
      {
        question: '¿Cuándo fue Sara de compras?',
        options: ['Lunes por la mañana', 'Martes por la mañana', 'Miércoles por la tarde', 'Viernes por la noche'],
        correctAnswer: 1
      },
      {
        question: '¿Qué compró Sara?',
        options: ['Manzanas, leche y pan', 'Naranjas, jugo y galletas', 'Plátanos, queso y huevos', 'Uvas, agua y galletas saladas'],
        correctAnswer: 0
      },
      {
        question: '¿Dónde se detuvo Sara de camino a casa?',
        options: ['Banco', 'Oficina de correos', 'Gasolinera', 'Biblioteca'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `Tomás encontró un perro pequeño de color café en el parque el sábado por la tarde. El perro tenía un collar azul con una placa plateada. Tomás llamó al número de la placa y devolvió el perro a su dueño, quien le dio veinte dólares como recompensa.`,
    difficulty: 'easy',
    questions: [
      {
        question: '¿De qué color era el perro?',
        options: ['Negro', 'Blanco', 'Café', 'Dorado'],
        correctAnswer: 2
      },
      {
        question: '¿Cuándo encontró Tomás al perro?',
        options: ['Domingo por la mañana', 'Sábado por la tarde', 'Viernes por la noche', 'Lunes por la tarde'],
        correctAnswer: 1
      },
      {
        question: '¿De qué color era el collar?',
        options: ['Rojo', 'Verde', 'Azul', 'Negro'],
        correctAnswer: 2
      },
      {
        question: '¿Cuánto recibió Tomás de recompensa?',
        options: ['Diez dólares', 'Quince dólares', 'Veinte dólares', 'Veinticinco dólares'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `El detective Martínez examinó la oficina cuidadosamente. La ventana estaba rota desde el exterior, y fragmentos de vidrio cubrían el piso de madera. Tres archivadores estaban contra la pared norte, y el del medio estaba desbloqueado y vacío. Una taza de café a medio terminar estaba sobre el escritorio de caoba junto a un bolígrafo plateado y un cuaderno con páginas arrancadas.`,
    difficulty: 'medium',
    questions: [
      {
        question: '¿Cómo se rompió la ventana?',
        options: ['Desde el interior', 'Desde el exterior', 'Ambos lados', 'No se menciona'],
        correctAnswer: 1
      },
      {
        question: '¿De qué material era el piso?',
        options: ['Baldosa', 'Alfombra', 'Madera', 'Concreto'],
        correctAnswer: 2
      },
      {
        question: '¿Qué archivador estaba vacío?',
        options: ['El de la izquierda', 'El del medio', 'El de la derecha', 'Todos'],
        correctAnswer: 1
      },
      {
        question: '¿Qué había sobre el escritorio?',
        options: ['Café, bolígrafo y cuaderno', 'Té, lápiz y papel', 'Café, lápiz y carpeta', 'Agua, bolígrafo y revista'],
        correctAnswer: 0
      },
      {
        question: '¿De qué material era el escritorio?',
        options: ['Roble', 'Pino', 'Caoba', 'Arce'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `El Dr. Chen revisó el expediente del paciente a las 2:15 PM. La presión arterial era 120/80, temperatura 98.6°F, y frecuencia cardíaca 72 latidos por minuto. El paciente reportó dolores de cabeza durante tres días y mareos al ponerse de pie. El Dr. Chen recetó medicamentos y programó una cita de seguimiento para el jueves a las 10 AM.`,
    difficulty: 'medium',
    questions: [
      {
        question: '¿A qué hora revisó el Dr. Chen el expediente?',
        options: ['1:15 PM', '2:15 PM', '3:15 PM', '4:15 PM'],
        correctAnswer: 1
      },
      {
        question: '¿Cuál era la frecuencia cardíaca?',
        options: ['68 lpm', '70 lpm', '72 lpm', '75 lpm'],
        correctAnswer: 2
      },
      {
        question: '¿Cuánto tiempo había tenido dolores de cabeza el paciente?',
        options: ['Dos días', 'Tres días', 'Cuatro días', 'Cinco días'],
        correctAnswer: 1
      },
      {
        question: '¿Cuándo fue la cita de seguimiento?',
        options: ['Miércoles a las 10 AM', 'Jueves a las 10 AM', 'Jueves a las 2 PM', 'Viernes a las 10 AM'],
        correctAnswer: 1
      },
      {
        question: '¿Cuál era la temperatura?',
        options: ['98.2°F', '98.4°F', '98.6°F', '99.0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `El profesor Williams descubrió un manuscrito antiguo en el tercer sótano de la biblioteca universitaria el 15 de octubre. El documento, escrito en latín sobre pergamino amarillento, databa de 1347. Contenía referencias a un comerciante llamado Giovanni Bellini que comerciaba especias entre Venecia y Constantinopla. El manuscrito mencionaba siete rutas de especias diferentes e incluía mapas dibujados a mano con orientaciones de brújula detalladas.`,
    difficulty: 'hard',
    questions: [
      {
        question: '¿Dónde se encontró el manuscrito?',
        options: ['Segundo sótano', 'Tercer sótano', 'Cuarto sótano', 'Quinto sótano'],
        correctAnswer: 1
      },
      {
        question: '¿Cuál fue la fecha del descubrimiento?',
        options: ['15 de octubre', '12 de octubre', '15 de octubre', '20 de octubre'],
        correctAnswer: 2
      },
      {
        question: '¿De qué año databa el manuscrito?',
        options: ['1337', '1347', '1357', '1367'],
        correctAnswer: 1
      },
      {
        question: '¿Cómo se llamaba el comerciante?',
        options: ['Giovanni Bellini', 'Marco Bellini', 'Giovanni Rossi', 'Marco Rossi'],
        correctAnswer: 0
      },
      {
        question: '¿Entre qué ciudades comerciaba el mercader?',
        options: ['Roma y Atenas', 'Venecia y Constantinopla', 'Florencia y El Cairo', 'Génova y Alejandría'],
        correctAnswer: 1
      },
      {
        question: '¿Cuántas rutas de especias se mencionaban?',
        options: ['Cinco', 'Seis', 'Siete', 'Ocho'],
        correctAnswer: 2
      }
    ]
  }
];

