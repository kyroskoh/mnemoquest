import { Translation } from '../core/TranslationManager';

const pt: Translation = {
  nav: {
    home: 'Início',
    progress: 'Progresso',
    settings: 'Configurações',
    about: 'Sobre'
  },
  
  dashboard: {
    welcome: 'Bem-vindo ao seu treinamento de memória',
    subtitle: 'Melhore suas habilidades cognitivas através de minijogos divertidos e cientificamente comprovados',
    totalXP: 'XP Total',
    dayStreak: 'Sequência de Dias',
    avgAccuracy: 'Precisão Média',
    gamesPlayed: 'Jogos Jogados',
    chooseChallenge: 'Escolha seu Desafio'
  },
  
  games: {
    memoryGrid: {
      name: 'Grade de Memória',
      description: 'Lembre-se das posições dos símbolos em uma grade',
      skill: 'Memória Espacial',
      instructions: 'Memorize as posições dos símbolos destacados...',
      recall: 'Clique nas células que tinham símbolos!'
    },
    sequenceSparks: {
      name: 'Faíscas de Sequência',
      description: 'Memorize e repita sequências de luz',
      skill: 'Memória de Trabalho',
      instructions: 'Observe a sequência e repita...',
      watch: 'Observe a sequência...',
      repeat: 'Agora repita a sequência!',
      wrong: 'Ops! Sequência errada. Tente a próxima!'
    },
    cardMatch: {
      name: 'Combinação de Cartas',
      description: 'Encontre pares correspondentes sob pressão de tempo',
      skill: 'Memória Visual',
      instructions: 'Encontre todos os pares antes que o tempo acabe!',
      memorizePhase: 'Memorize as cartas!',
      playPhase: 'Encontre os pares correspondentes!',
      cardsFlipIn: 'Cartas viram em...'
    },
    numberRecall: {
      name: 'Recordar Números',
      description: 'Memorize sequências de números',
      skill: 'Memória Numérica',
      instructions: 'Observe os números com atenção...',
      enterNumbers: 'Digite os números',
      submit: 'Enviar',
      typeForward: 'Digite os números em ordem',
      typeReverse: 'Digite os números em ordem INVERSA',
      enterSomething: 'Por favor digite os números',
      perfect: 'Perfeito!',
      correct: 'Correto',
      incorrect: 'Incorreto',
      correctWas: 'A resposta correta era',
      reverseMode: '🔄 MODO INVERSO'
    },
    flashCount: {
      name: 'Contagem Rápida',
      description: 'Conte objetos que aparecem na tela',
      skill: 'Atenção Rápida',
      instructions: 'Objetos vão aparecer brevemente. Conte o tipo específico!',
      question: 'Quantos {shape}s {color}s havia?',
      shapes: {
        circle: 'círculo',
        square: 'quadrado',
        triangle: 'triângulo',
        star: 'estrela'
      },
      colors: {
        red: 'vermelho',
        blue: 'azul',
        green: 'verde',
        yellow: 'amarelo',
        purple: 'roxo',
        orange: 'laranja'
      }
    },
    wordTrail: {
      name: 'Trilha de Palavras',
      description: 'Memorize palavras em sequência',
      skill: 'Memória Verbal',
      instructions: 'Memorize estas palavras em ordem...',
      recall: 'Agora digite as palavras em ordem!',
      typeWords: 'Digite cada palavra na ordem correta',
      wordPlaceholder: 'Palavra {num}',
      submit: 'Enviar',
      results: 'Resultados',
      correctWords: 'Palavras Corretas',
      correctOrder: 'Ordem e Posição Corretas'
    },
    patternPath: {
      name: 'Caminho de Padrões',
      description: 'Memorize e trace caminhos em uma grade',
      skill: 'Sequenciamento Espacial',
      instructions: 'Observe o caminho e memorize-o...',
      watch: 'Observe o caminho com atenção...',
      recall: 'Agora trace o mesmo caminho!',
      clear: 'Limpar',
      submit: 'Enviar'
    },
    nBack: {
      name: 'Desafio N-Back',
      description: 'Teste a memória de trabalho com a tarefa cognitiva padrão ouro',
      skill: 'Memória de Trabalho',
      back: 'Voltar',
      howToPlay: 'Como Jogar',
      instruction1: 'As letras aparecerão uma de cada vez. Pressione ESPAÇO (ou toque no botão CORRESPONDÊNCIA) quando a letra atual corresponder à que está {n} posições atrás.',
      instruction2: 'Concentre-se e responda rapidamente quando ver uma correspondência!',
      example: 'Exemplo',
      exampleText: 'Em 2-back: A G B B (✓ pressione aqui, B corresponde 2 atrás) | A B C D (✗ não pressione, D ≠ B)',
      trial: 'Tentativa',
      press: 'Pressione ESPAÇO ou toque no botão quando ver uma correspondência',
      match: 'CORRESPONDÊNCIA!',
      hits: 'Acertos',
      misses: 'Erros'
    },
    storyRecall: {
      name: 'Lembrança de Histórias',
      description: 'Lembre-se de detalhes de histórias curtas',
      skill: 'Memória Episódica',
      instructions: 'Leia a história com atenção e lembre-se dos detalhes...',
      question: 'Pergunta',
      continue: 'Continuar'
    },
    changeDetection: {
      name: 'Detecção de Mudanças',
      description: 'Identifique o que mudou em uma cena',
      skill: 'Memória de Trabalho Visual',
      instructions: 'Estude a cena e então identifique o que mudou!',
      round: 'Rodada',
      memorize: 'Memorize esta cena...',
      findChange: 'O que mudou? Clique nisso!'
    },
    colorSequence: {
      name: 'Sequência de Cores',
      description: 'Memorize e repita padrões de cores',
      skill: 'Memória de Cores',
      instructions: 'Observe as cores piscarem em sequência, então clique-as na mesma ordem!',
      level: 'Nível',
      sequence: 'Sequência',
      watch: 'Observe a sequência...',
      yourTurn: 'Sua vez! Clique nas cores em ordem',
      correct: 'Correto!',
      wrong: 'Sequência errada!',
      correctWas: 'A sequência correta era:'
    },
    playNow: 'Jogar Agora'
  },
  
  tutorial: {
    skip: 'Pular Tutorial',
    back: 'Voltar',
    next: 'Próximo',
    startPlaying: 'Começar a Jogar!',
    howToPlay: 'Como Jogar',
    tips: 'Dicas',
    memoryGrid: {
      welcome: 'Bem-vindo à Grade de Memória!',
      intro: 'Teste sua memória espacial lembrando onde os símbolos aparecem em uma grade.',
      steps: '1. Observe cuidadosamente os símbolos aparecendo na grade\n2. Memorize suas posições\n3. Quando a grade limpar, clique nas células que tinham símbolos\n4. Complete 5 rodadas para terminar o jogo',
      tips: '• A grade será exibida apenas por alguns segundos - concentre-se!\n• À medida que você melhora, a dificuldade aumentará\n• Tente visualizar padrões ou criar associações mentais'
    },
    sequenceSparks: {
      welcome: 'Bem-vindo às Faíscas de Sequência!',
      intro: 'Treine sua memória de trabalho repetindo sequências de luzes piscantes.',
      steps: '1. Observe os botões coloridos acenderem em sequência\n2. Aguarde o término da sequência\n3. Clique nos botões na mesma ordem\n4. A sequência fica mais longa a cada rodada',
      tips: '• Concentre-se em um botão de cada vez\n• Tente dizer as cores em voz alta para reforçar a memória\n• Crie um ritmo ou padrão em sua mente'
    },
    cardMatch: {
      welcome: 'Bem-vindo à Combinação de Cartas!',
      intro: 'Desafie sua memória visual combinando pares de cartas antes que o tempo acabe.',
      steps: '1. Clique nas cartas para virá-las\n2. Tente encontrar pares correspondentes\n3. Lembre-se onde cada símbolo está localizado\n4. Combine todos os pares antes que o tempo expire',
      tips: '• Comece virando as cartas sistematicamente\n• Preste atenção às localizações dos símbolos\n• Trabalhe rapidamente, mas com precisão para economizar tempo'
    },
    numberRecall: {
      welcome: 'Bem-vindo a Recordar Números!',
      intro: 'Treine sua memória numérica memorizando sequências de dígitos.',
      steps: '1. Observe os números aparecerem um por um\n2. Memorize a sequência\n3. Digite os números em ordem (ou em ordem inversa para níveis mais difíceis)\n4. Envie sua resposta',
      tips: '• Tente agrupar números em grupos (como números de telefone)\n• Crie padrões ou associações\n• No modo inverso, visualize a sequência de trás para frente'
    },
    flashCount: {
      welcome: 'Bem-vindo à Contagem Rápida!',
      intro: 'Teste sua atenção visual contando objetos que aparecem brevemente na tela.',
      steps: '1. Objetos vão aparecer por um breve momento\n2. Conte tipos específicos (cor + forma)\n3. Selecione a contagem correta das opções\n4. Complete 5 rodadas',
      tips: '• Concentre-se no tipo alvo antes dos objetos aparecerem\n• Pratique subitização (reconhecimento instantâneo de quantidades pequenas)\n• Não tente contar tudo - apenas o que é pedido'
    },
    wordTrail: {
      welcome: 'Bem-vindo à Trilha de Palavras!',
      intro: 'Desafie sua memória verbal memorizando palavras em sequência.',
      steps: '1. Observe as palavras aparecerem uma por vez\n2. Memorize-as em ordem\n3. Digite cada palavra na posição correta\n4. Envie quando terminar',
      tips: '• Crie uma história conectando as palavras\n• Use a primeira letra de cada palavra para fazer um acrônimo\n• Visualize imagens vívidas para cada palavra'
    },
    patternPath: {
      welcome: 'Bem-vindo ao Caminho de Padrões!',
      intro: 'Treine sua memória espacial memorizando e traçando caminhos em uma grade.',
      steps: '1. Observe um caminho sendo desenhado na grade\n2. Memorize a sequência de células\n3. Recrie o caminho clicando nas células em ordem\n4. Células devem ser adjacentes (sem diagonais)',
      tips: '• Preste atenção aos indicadores de direção\n• Divida caminhos longos em segmentos menores\n• Use pontos de referência ou padrões para lembrar das curvas'
    },
    nBack: {
      welcome: 'Bem-vindo ao Desafio N-Back!',
      intro: 'Teste e melhore sua memória de trabalho com esta tarefa cientificamente validada.',
      steps: '1. Letras aparecem sequencialmente na tela\n2. Pressione a BARRA DE ESPAÇO quando a letra atual corresponder a N posições atrás\n3. O jogo começa com 1-back, depois progride para 2-back e 3-back\n4. Mantenha o foco e reaja rapidamente quando ver uma correspondência',
      tips: '• Mantenha uma lista mental das últimas N letras\n• Não se apresse - precisão é mais importante que velocidade\n• Pratique regularmente para melhorar sua capacidade de memória de trabalho\n• Esta é uma das poucas tarefas de treinamento cerebral cientificamente comprovadas!'
    },
    storyRecall: {
      welcome: 'Bem-vindo à Recordação de Histórias!',
      intro: 'Melhore sua memória episódica lembrando detalhes de histórias curtas.',
      steps: '1. Leia a história cuidadosamente enquanto o cronômetro está rodando\n2. Preste atenção a detalhes específicos (nomes, cores, números, lugares)\n3. Responda perguntas de múltipla escolha sobre a história\n4. Sem anotações permitidas - confie em sua memória!',
      tips: '• Crie imagens mentais enquanto lê\n• Preste atenção em Quem, O Quê, Quando, Onde e Como\n• Conecte os detalhes para formar uma história coerente\n• Quanto mais você se envolver com a história, melhor se lembrará'
    },
    changeDetection: {
      welcome: 'Bem-vindo à Detecção de Mudanças!',
      intro: 'Treine sua memória de trabalho visual identificando o que mudou em uma cena.',
      steps: '1. Observe a cena cuidadosamente durante a fase de visualização\n2. Após uma tela em branco breve, a cena reaparece com UMA mudança\n3. Clique no objeto que mudou\n4. Mudanças podem ser: cor, posição ou tamanho',
      tips: '• Tente memorizar a posição e cor de cada objeto\n• Crie um instantâneo mental da cena\n• Agrupe objetos por localização ou cor para melhor memorização\n• À medida que a dificuldade aumenta, mais objetos aparecem'
    },
    colorSequence: {
      welcome: 'Bem-vindo à Sequência de Cores!',
      intro: 'Domine padrões de cores e memória sequencial com este desafio vibrante.',
      steps: '1. Observe as cores piscarem em sequência\n2. Após o término da sequência, é sua vez\n3. Clique nas cores na exata mesma ordem\n4. Cada nível adiciona uma cor à sequência',
      tips: '• Fale as cores em voz alta (ou mentalmente) enquanto piscam\n• Crie um ritmo ou padrão com as cores\n• Use as posições das cores para ajudar a lembrar a sequência\n• Três erros e o jogo acaba - mantenha o foco!'
    }
  },
  
  gameUI: {
    backToDashboard: 'Voltar ao Painel',
    level: 'Nível',
    round: 'Rodada',
    time: 'Tempo',
    score: 'Pontuação',
    accuracy: 'Precisão',
    mistakes: 'Erros',
    pairsFound: 'Pares Encontrados',
    ready: 'Estou pronto!'
  },
  
  results: {
    gameComplete: 'Jogo Completo! 🎉',
    score: 'Pontuação',
    accuracy: 'Precisão',
    time: 'Tempo',
    xpGained: 'XP Ganho',
    level: 'Nível',
    playAgain: 'Jogar Novamente',
    backToDashboard: 'Voltar ao Painel'
  },
  
  progress: {
    title: 'Seu Progresso',
    yourProgress: 'Seu Progresso',
    recentGames: 'Jogos Recentes',
    accuracyLabel: 'Precisão %',
    accuracyTrend: 'Tendência de Precisão Recente',
    gamesPlayedLabel: 'Jogos Jogados',
    gamesByType: 'Jogos Jogados por Tipo',
    achievements: 'Conquistas'
  },
  
  settings: {
    title: 'Configurações',
    soundEffects: '🔊 Efeitos Sonoros',
    colorBlindMode: '🎨 Modo Daltônico',
    animations: '✨ Animações',
    language: '🌍 Idioma',
    applyLanguage: 'Aplicar Idioma',
    dataManagement: '📦 Gerenciamento de Dados',
    exportProgress: '💾 Exportar Progresso',
    exportProgressDesc: 'Baixe seu progresso e conquistas (criptografado)',
    importProgress: '📂 Importar Progresso',
    importProgressDesc: 'Restaurar de um arquivo de backup',
    dangerZone: '⚠️ Zona de Perigo',
    resetProgress: 'Redefinir Todo o Progresso',
    resetConfirm: 'Tem certeza de que deseja redefinir todo o progresso? Esta ação não pode ser desfeita.',
    resetSuccess: 'Progresso redefinido com sucesso!'
  },
  
  about: {
    title: 'Sobre o MnemoQuest',
    description: 'MnemoQuest é uma plataforma de treinamento cognitivo cientificamente comprovada, projetada para melhorar sua memória, concentração e velocidade de recordação.',
    howItWorks: 'Como Funciona',
    howItWorksText: 'Nosso sistema de dificuldade adaptativa ajusta os desafios com base no seu desempenho, garantindo que você esteja sempre na zona de aprendizado ideal.',
    benefits: 'Benefícios',
    benefit1: 'Memória de curto prazo e de trabalho aprimoradas',
    benefit2: 'Reconhecimento espacial aprimorado',
    benefit3: 'Concentração e foco aumentados',
    benefit4: 'Acompanhe seu progresso cognitivo',
    developer: 'Desenvolvedor',
    version: 'Versão 1.0.0 • Construído com TypeScript & Vite • Licença MIT'
  },
  
  common: {
    loading: 'Carregando...',
    error: 'Ocorreu um erro',
    ok: 'OK',
    cancel: 'Cancelar',
    yes: 'Sim',
    no: 'Não'
  },
  
  badges: {
    firstSteps: {
      name: 'Primeiros Passos',
      description: 'Complete seu primeiro jogo'
    },
    dedicated: {
      name: 'Dedicado',
      description: 'Jogue 10 jogos'
    },
    committed: {
      name: 'Comprometido',
      description: 'Jogue 50 jogos'
    },
    centurion: {
      name: 'Centurião',
      description: 'Jogue 100 jogos'
    },
    streak3: {
      name: 'Sequência de 3 Dias',
      description: 'Jogue 3 dias seguidos'
    },
    streak7: {
      name: 'Guerreiro Semanal',
      description: 'Jogue 7 dias seguidos'
    },
    streak30: {
      name: 'Mestre Mensal',
      description: 'Jogue 30 dias seguidos'
    },
    level5: {
      name: 'Nível 5',
      description: 'Alcance o nível 5'
    },
    level10: {
      name: 'Nível 10',
      description: 'Alcance o nível 10'
    },
    sharpMind: {
      name: 'Mente Afiada',
      description: '80% de precisão média (10+ jogos)'
    },
    perfectionist: {
      name: 'Perfeccionista',
      description: '95% de precisão média (20+ jogos)'
    }
  }
};

export default pt;

