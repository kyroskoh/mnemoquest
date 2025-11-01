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
      skill: 'Memória Espacial'
    },
    sequenceSparks: {
      name: 'Faíscas de Sequência',
      description: 'Memorize e repita sequências de luz',
      skill: 'Memória de Trabalho'
    },
    cardMatch: {
      name: 'Combinação de Cartas',
      description: 'Encontre pares correspondentes sob pressão de tempo',
      skill: 'Memória Visual'
    },
    playNow: 'Jogar Agora'
  },
  
  tutorial: {
    skip: 'Pular Tutorial',
    back: 'Voltar',
    next: 'Próximo',
    startPlaying: 'Começar a Jogar!'
  },
  
  gameUI: {
    backToDashboard: 'Voltar ao Painel',
    level: 'Nível',
    round: 'Rodada',
    time: 'Tempo',
    score: 'Pontuação',
    accuracy: 'Precisão',
    mistakes: 'Erros',
    pairsFound: 'Pares Encontrados'
  },
  
  results: {
    gameComplete: 'Jogo Completo! 🎉',
    xpGained: 'XP Ganho',
    playAgain: 'Jogar Novamente',
    backToDashboard: 'Voltar ao Painel'
  },
  
  progress: {
    title: 'Seu Progresso',
    accuracyTrend: 'Tendência de Precisão (Jogos Recentes)',
    gamesByType: 'Jogos por Tipo',
    achievements: 'Conquistas'
  },
  
  settings: {
    title: 'Configurações',
    soundEffects: '🔊 Efeitos Sonoros',
    colorBlindMode: '🎨 Modo Daltônico',
    animations: '✨ Animações',
    language: '🌍 Idioma',
    applyLanguage: 'Aplicar Idioma',
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
  }
};

export default pt;

