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
    text: `Sara dirigiu seu carro vermelho até o supermercado na terça-feira de manhã. Ela comprou três maçãs, uma caixa de leite e pão fresco. No caminho de volta para casa, ela parou no correio amarelo para enviar uma carta para sua irmã.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'Qual era a cor do carro de Sara?',
        options: ['Vermelho', 'Azul', 'Amarelo', 'Verde'],
        correctAnswer: 0
      },
      {
        question: 'Quando Sara foi fazer compras?',
        options: ['Segunda de manhã', 'Terça de manhã', 'Quarta à tarde', 'Sexta à noite'],
        correctAnswer: 1
      },
      {
        question: 'O que Sara comprou?',
        options: ['Maçãs, leite e pão', 'Laranjas, suco e biscoitos', 'Bananas, queijo e ovos', 'Uvas, água e bolachas'],
        correctAnswer: 0
      },
      {
        question: 'Onde Sara parou no caminho de casa?',
        options: ['Banco', 'Correio', 'Posto de gasolina', 'Biblioteca'],
        correctAnswer: 1
      }
    ]
  },
  {
    text: `Tom encontrou um pequeno cachorro marrom no parque na tarde de sábado. O cachorro tinha uma coleira azul com uma placa prateada. Tom ligou para o número na placa e devolveu o cachorro ao seu dono, que lhe deu vinte dólares como recompensa.`,
    difficulty: 'easy',
    questions: [
      {
        question: 'Qual era a cor do cachorro?',
        options: ['Preto', 'Branco', 'Marrom', 'Dourado'],
        correctAnswer: 2
      },
      {
        question: 'Quando Tom encontrou o cachorro?',
        options: ['Domingo de manhã', 'Sábado à tarde', 'Sexta à noite', 'Segunda à tarde'],
        correctAnswer: 1
      },
      {
        question: 'Qual era a cor da coleira?',
        options: ['Vermelho', 'Verde', 'Azul', 'Preto'],
        correctAnswer: 2
      },
      {
        question: 'Quanto Tom recebeu de recompensa?',
        options: ['Dez dólares', 'Quinze dólares', 'Vinte dólares', 'Vinte e cinco dólares'],
        correctAnswer: 2
      }
    ]
  },
  // Medium stories
  {
    text: `O detetive Martinez examinou o escritório cuidadosamente. A janela estava quebrada de fora, e fragmentos de vidro cobriam o piso de madeira. Três arquivos estavam encostados na parede norte, e o do meio estava destrancado e vazio. Uma xícara de café pela metade estava sobre a mesa de mogno ao lado de uma caneta prateada e um caderno com páginas arrancadas.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'Como a janela foi quebrada?',
        options: ['De dentro', 'De fora', 'Dos dois lados', 'Não mencionado'],
        correctAnswer: 1
      },
      {
        question: 'De que material era o piso?',
        options: ['Azulejo', 'Carpete', 'Madeira', 'Concreto'],
        correctAnswer: 2
      },
      {
        question: 'Qual arquivo estava vazio?',
        options: ['O da esquerda', 'O do meio', 'O da direita', 'Todos'],
        correctAnswer: 1
      },
      {
        question: 'O que estava sobre a mesa?',
        options: ['Café, caneta e caderno', 'Chá, lápis e papel', 'Café, lápis e pasta', 'Água, caneta e revista'],
        correctAnswer: 0
      },
      {
        question: 'De que material era a mesa?',
        options: ['Carvalho', 'Pinho', 'Mogno', 'Bordo'],
        correctAnswer: 2
      }
    ]
  },
  {
    text: `Dr. Chen revisou o prontuário do paciente às 14h15. A pressão arterial era 120/80, temperatura 98,6°F e frequência cardíaca 72 batimentos por minuto. O paciente relatou dores de cabeça por três dias e tonturas ao se levantar. Dr. Chen prescreveu medicamentos e agendou uma consulta de acompanhamento para quinta-feira às 10h.`,
    difficulty: 'medium',
    questions: [
      {
        question: 'A que horas o Dr. Chen revisou o prontuário?',
        options: ['13h15', '14h15', '15h15', '16h15'],
        correctAnswer: 1
      },
      {
        question: 'Qual era a frequência cardíaca?',
        options: ['68 bpm', '70 bpm', '72 bpm', '75 bpm'],
        correctAnswer: 2
      },
      {
        question: 'Por quanto tempo o paciente teve dores de cabeça?',
        options: ['Dois dias', 'Três dias', 'Quatro dias', 'Cinco dias'],
        correctAnswer: 1
      },
      {
        question: 'Quando foi a consulta de acompanhamento?',
        options: ['Quarta às 10h', 'Quinta às 10h', 'Quinta às 14h', 'Sexta às 10h'],
        correctAnswer: 1
      },
      {
        question: 'Qual era a temperatura?',
        options: ['98,2°F', '98,4°F', '98,6°F', '99,0°F'],
        correctAnswer: 2
      }
    ]
  },
  // Hard stories
  {
    text: `Professor Williams descobriu um manuscrito antigo no terceiro subsolo da biblioteca universitária em 15 de outubro. O documento, escrito em latim em pergaminho amarelado, datava de 1347. Continha referências a um comerciante chamado Giovanni Bellini que comercializava especiarias entre Veneza e Constantinopla. O manuscrito mencionava sete rotas de especiarias diferentes e incluía mapas desenhados à mão com orientações de bússola detalhadas.`,
    difficulty: 'hard',
    questions: [
      {
        question: 'Onde o manuscrito foi encontrado?',
        options: ['Segundo subsolo', 'Terceiro subsolo', 'Quarto subsolo', 'Quinto subsolo'],
        correctAnswer: 1
      },
      {
        question: 'Qual foi a data da descoberta?',
        options: ['10 de outubro', '12 de outubro', '15 de outubro', '20 de outubro'],
        correctAnswer: 2
      },
      {
        question: 'De que ano datava o manuscrito?',
        options: ['1337', '1347', '1357', '1367'],
        correctAnswer: 1
      },
      {
        question: 'Qual era o nome do comerciante?',
        options: ['Giovanni Bellini', 'Marco Bellini', 'Giovanni Rossi', 'Marco Rossi'],
        correctAnswer: 0
      },
      {
        question: 'Entre quais cidades o comerciante negociava?',
        options: ['Roma e Atenas', 'Veneza e Constantinopla', 'Florença e Cairo', 'Gênova e Alexandria'],
        correctAnswer: 1
      },
      {
        question: 'Quantas rotas de especiarias foram mencionadas?',
        options: ['Cinco', 'Seis', 'Sete', 'Oito'],
        correctAnswer: 2
      }
    ]
  }
];

