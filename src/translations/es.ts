import { Translation } from '../core/TranslationManager';

const es: Translation = {
  nav: {
    home: 'Inicio',
    progress: 'Progreso',
    settings: 'Ajustes',
    about: 'Acerca de'
  },
  
  dashboard: {
    welcome: 'Bienvenido a Tu Viaje de Entrenamiento de Memoria',
    subtitle: 'Mejora tus habilidades cognitivas con divertidos mini-juegos respaldados por la ciencia',
    totalXP: 'XP Total',
    dayStreak: 'Racha de Días',
    avgAccuracy: 'Precisión Promedio',
    gamesPlayed: 'Juegos Jugados',
    chooseChallenge: 'Elige Tu Desafío'
  },
  
  games: {
    memoryGrid: {
      name: 'Cuadrícula de Memoria',
      description: 'Recuerda las posiciones de los símbolos en una cuadrícula',
      skill: 'Memoria Espacial'
    },
    sequenceSparks: {
      name: 'Chispas de Secuencia',
      description: 'Recuerda y repite secuencias de luces',
      skill: 'Memoria de Trabajo'
    },
    cardMatch: {
      name: 'Empareja Cartas',
      description: 'Encuentra parejas bajo presión de tiempo',
      skill: 'Memoria Visual'
    },
    playNow: 'Jugar Ahora'
  },
  
  tutorial: {
    skip: 'Saltar Tutorial',
    back: 'Atrás',
    next: 'Siguiente',
    startPlaying: '¡Comenzar a Jugar!'
  },
  
  gameUI: {
    backToDashboard: 'Volver al Inicio',
    level: 'Nivel',
    round: 'Ronda',
    time: 'Tiempo',
    score: 'Puntuación',
    accuracy: 'Precisión',
    mistakes: 'Errores',
    pairsFound: 'Parejas Encontradas'
  },
  
  results: {
    gameComplete: '¡Juego Completado! 🎉',
    xpGained: 'XP Ganado',
    playAgain: 'Jugar de Nuevo',
    backToDashboard: 'Volver al Inicio'
  },
  
  progress: {
    title: 'Tu Progreso',
    accuracyTrend: 'Tendencia de Precisión Reciente',
    gamesByType: 'Juegos Jugados por Tipo',
    achievements: 'Logros'
  },
  
  settings: {
    title: 'Ajustes',
    soundEffects: '🔊 Efectos de Sonido',
    colorBlindMode: '🎨 Modo para Daltónicos',
    animations: '✨ Animaciones',
    language: '🌍 Idioma',
    resetProgress: 'Restablecer Todo el Progreso',
    resetConfirm: '¿Estás seguro de que quieres restablecer todo el progreso? Esto no se puede deshacer.',
    resetSuccess: '¡Progreso restablecido exitosamente!'
  },
  
  about: {
    title: 'Acerca de MnemoQuest',
    description: 'MnemoQuest es una plataforma de entrenamiento cognitivo respaldada por la ciencia, diseñada para mejorar tu memoria, concentración y velocidad de recuerdo.',
    howItWorks: 'Cómo Funciona',
    howItWorksText: 'Nuestro sistema de dificultad adaptativa ajusta los desafíos según tu rendimiento, asegurando que siempre estés en la zona óptima de aprendizaje.',
    benefits: 'Beneficios',
    benefit1: 'Mejorar el recuerdo a corto plazo y la memoria de trabajo',
    benefit2: 'Mejorar las habilidades de reconocimiento espacial',
    benefit3: 'Aumentar el enfoque y la concentración',
    benefit4: 'Seguir tu progreso cognitivo a lo largo del tiempo',
    developer: 'Desarrollador',
    version: 'Versión 1.0.0 • Construido con TypeScript & Vite • Licencia MIT'
  },
  
  common: {
    loading: 'Cargando...',
    error: 'Ocurrió un error',
    ok: 'Aceptar',
    cancel: 'Cancelar',
    yes: 'Sí',
    no: 'No'
  }
};

export default es;

