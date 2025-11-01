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
      skill: 'Memoria Espacial',
      instructions: 'Memoriza las posiciones de los símbolos resaltados...',
      recall: '¡Haz clic en las celdas que tenían símbolos!'
    },
    sequenceSparks: {
      name: 'Chispas de Secuencia',
      description: 'Recuerda y repite secuencias de luces',
      skill: 'Memoria de Trabajo',
      instructions: 'Observa la secuencia y repítela...',
      watch: 'Observa la secuencia...',
      repeat: '¡Ahora repite la secuencia!',
      wrong: '¡Ups! Secuencia incorrecta. ¡Inténtalo con la siguiente!'
    },
    cardMatch: {
      name: 'Empareja Cartas',
      description: 'Encuentra parejas bajo presión de tiempo',
      skill: 'Memoria Visual',
      instructions: '¡Encuentra todos los pares antes de que se acabe el tiempo!'
    },
    numberRecall: {
      name: 'Recordar Números',
      description: 'Recuerda secuencias de números',
      skill: 'Memoria Numérica',
      instructions: 'Observa los números con atención...',
      enterNumbers: 'Ingresa los números',
      submit: 'Enviar',
      typeForward: 'Escribe los números en orden',
      typeReverse: 'Escribe los números en orden INVERSO',
      enterSomething: 'Por favor ingresa los números',
      perfect: '¡Perfecto!',
      correct: 'Correcto',
      incorrect: 'Incorrecto',
      correctWas: 'La respuesta correcta era',
      reverseMode: '🔄 MODO INVERSO'
    },
    flashCount: {
      name: 'Conteo Rápido',
      description: 'Cuenta objetos que aparecen en pantalla',
      skill: 'Atención Rápida',
      instructions: '¡Los objetos aparecerán brevemente. Cuenta el tipo específico solicitado!',
      question: '¿Cuántos {shape}s {color}s había?',
      shapes: {
        circle: 'círculo',
        square: 'cuadrado',
        triangle: 'triángulo',
        star: 'estrella'
      },
      colors: {
        red: 'rojo',
        blue: 'azul',
        green: 'verde',
        yellow: 'amarillo',
        purple: 'morado',
        orange: 'naranja'
      }
    },
    wordTrail: {
      name: 'Rastro de Palabras',
      description: 'Recuerda palabras en secuencia',
      skill: 'Memoria Verbal',
      instructions: 'Memoriza estas palabras en orden...',
      recall: '¡Ahora escribe las palabras en orden!',
      typeWords: 'Escribe cada palabra en el orden correcto',
      wordPlaceholder: 'Palabra {num}',
      submit: 'Enviar',
      results: 'Resultados',
      correctWords: 'Palabras Correctas',
      correctOrder: 'Orden y Posición Correctos'
    },
    patternPath: {
      name: 'Camino de Patrones',
      description: 'Recuerda y traza caminos en una cuadrícula',
      skill: 'Secuencia Espacial',
      instructions: 'Observa el camino y recuérdalo...',
      watch: 'Observa el camino cuidadosamente...',
      recall: '¡Ahora traza el mismo camino!',
      clear: 'Limpiar',
      submit: 'Enviar'
    },
    playNow: 'Jugar Ahora'
  },
  
  tutorial: {
    skip: 'Saltar Tutorial',
    back: 'Atrás',
    next: 'Siguiente',
    startPlaying: '¡Comenzar a Jugar!',
    howToPlay: 'Cómo Jugar',
    tips: 'Consejos',
    memoryGrid: {
      welcome: '¡Bienvenido a Grid de Memoria!',
      intro: 'Prueba tu memoria espacial recordando dónde aparecen los símbolos en una cuadrícula.',
      steps: '1. Observa cuidadosamente cómo aparecen los símbolos en la cuadrícula\n2. Memoriza sus posiciones\n3. Cuando la cuadrícula se borre, haz clic en las celdas que tenían símbolos\n4. Completa 5 rondas para terminar el juego',
      tips: '• La cuadrícula solo se mostrará durante unos segundos - ¡concéntrate!\n• A medida que mejores, la dificultad aumentará\n• Intenta visualizar patrones o crear asociaciones mentales'
    },
    sequenceSparks: {
      welcome: '¡Bienvenido a Chispas de Secuencia!',
      intro: 'Entrena tu memoria de trabajo repitiendo secuencias de luces parpadeantes.',
      steps: '1. Observa cómo se iluminan los botones de colores en secuencia\n2. Espera a que la secuencia termine\n3. Haz clic en los botones en el mismo orden\n4. La secuencia se hace más larga cada ronda',
      tips: '• Concéntrate en un botón a la vez\n• Intenta decir los colores en voz alta para reforzar la memoria\n• Crea un ritmo o patrón en tu mente'
    },
    cardMatch: {
      welcome: '¡Bienvenido a Empareja Cartas!',
      intro: 'Desafía tu memoria visual emparejando pares de cartas antes de que se acabe el tiempo.',
      steps: '1. Haz clic en las cartas para voltearlas\n2. Intenta encontrar pares coincidentes\n3. Recuerda dónde está ubicado cada símbolo\n4. Empareja todos los pares antes de que expire el temporizador',
      tips: '• Comienza volteando cartas sistemáticamente\n• Presta atención a las ubicaciones de los símbolos\n• Trabaja rápido pero con precisión para ahorrar tiempo'
    },
    numberRecall: {
      welcome: '¡Bienvenido a Recordar Números!',
      intro: 'Entrena tu memoria numérica recordando secuencias de dígitos.',
      steps: '1. Observa mientras aparecen números uno por uno\n2. Memoriza la secuencia\n3. Escribe los números en orden (o en orden inverso para niveles más difíciles)\n4. Envía tu respuesta',
      tips: '• Intenta agrupar números en grupos (como números de teléfono)\n• Crea patrones o asociaciones\n• En modo inverso, visualiza la secuencia al revés'
    },
    flashCount: {
      welcome: '¡Bienvenido a Conteo Rápido!',
      intro: 'Prueba tu atención visual contando objetos que aparecen brevemente en pantalla.',
      steps: '1. Los objetos aparecerán por un breve momento\n2. Cuenta tipos específicos (color + forma)\n3. Selecciona el conteo correcto de las opciones\n4. Completa 5 rondas',
      tips: '• Concéntrate en el tipo objetivo antes de que aparezcan los objetos\n• Practica subitización (reconocer instantáneamente cantidades pequeñas)\n• No intentes contar todo - solo lo que se pide'
    },
    wordTrail: {
      welcome: '¡Bienvenido a Rastro de Palabras!',
      intro: 'Desafía tu memoria verbal recordando palabras en secuencia.',
      steps: '1. Observa mientras aparecen palabras una a la vez\n2. Memorízalas en orden\n3. Escribe cada palabra en la posición correcta\n4. Envía cuando termines',
      tips: '• Crea una historia que conecte las palabras\n• Usa la primera letra de cada palabra para hacer un acrónimo\n• Visualiza imágenes vívidas para cada palabra'
    },
    patternPath: {
      welcome: '¡Bienvenido a Camino de Patrones!',
      intro: 'Entrena tu memoria espacial recordando y trazando caminos en una cuadrícula.',
      steps: '1. Observa mientras se dibuja un camino en la cuadrícula\n2. Memoriza la secuencia de celdas\n3. Recrea el camino haciendo clic en las celdas en orden\n4. Las celdas deben ser adyacentes (sin diagonales)',
      tips: '• Presta atención a los indicadores de dirección\n• Divide caminos largos en fragmentos más pequeños\n• Usa puntos de referencia o patrones para recordar los giros'
    }
  },
  
  gameUI: {
    backToDashboard: 'Volver al Inicio',
    level: 'Nivel',
    round: 'Ronda',
    time: 'Tiempo',
    score: 'Puntuación',
    accuracy: 'Precisión',
    mistakes: 'Errores',
    pairsFound: 'Parejas Encontradas',
    ready: '¡Estoy listo!'
  },
  
  results: {
    gameComplete: '¡Juego Completado! 🎉',
    score: 'Puntuación',
    accuracy: 'Precisión',
    time: 'Tiempo',
    xpGained: 'XP Ganado',
    level: 'Nivel',
    playAgain: 'Jugar de Nuevo',
    backToDashboard: 'Volver al Inicio'
  },
  
  progress: {
    title: 'Tu Progreso',
    yourProgress: 'Tu Progreso',
    recentGames: 'Juegos Recientes',
    accuracyLabel: 'Precisión %',
    accuracyTrend: 'Tendencia de Precisión Reciente',
    gamesPlayedLabel: 'Juegos Jugados',
    gamesByType: 'Juegos Jugados por Tipo',
    achievements: 'Logros'
  },
  
  settings: {
    title: 'Ajustes',
    soundEffects: '🔊 Efectos de Sonido',
    colorBlindMode: '🎨 Modo para Daltónicos',
    animations: '✨ Animaciones',
    language: '🌍 Idioma',
    applyLanguage: 'Aplicar Idioma',
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
  },
  
  badges: {
    firstSteps: {
      name: 'Primeros Pasos',
      description: 'Completa tu primer juego'
    },
    dedicated: {
      name: 'Dedicado',
      description: 'Juega 10 juegos'
    },
    committed: {
      name: 'Comprometido',
      description: 'Juega 50 juegos'
    },
    centurion: {
      name: 'Centurión',
      description: 'Juega 100 juegos'
    },
    streak3: {
      name: 'Racha de 3 Días',
      description: 'Juega 3 días seguidos'
    },
    streak7: {
      name: 'Guerrero Semanal',
      description: 'Juega 7 días seguidos'
    },
    streak30: {
      name: 'Maestro Mensual',
      description: 'Juega 30 días seguidos'
    },
    level5: {
      name: 'Nivel 5',
      description: 'Alcanza el nivel 5'
    },
    level10: {
      name: 'Nivel 10',
      description: 'Alcanza el nivel 10'
    },
    sharpMind: {
      name: 'Mente Aguda',
      description: '80% precisión promedio (10+ juegos)'
    },
    perfectionist: {
      name: 'Perfeccionista',
      description: '95% precisión promedio (20+ juegos)'
    }
  }
};

export default es;

