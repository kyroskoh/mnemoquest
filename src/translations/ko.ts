import { Translation } from '../core/TranslationManager';

const ko: Translation = {
  nav: {
    home: '홈',
    progress: '진행상황',
    settings: '설정',
    about: '정보'
  },
  
  dashboard: {
    welcome: '기억력 훈련에 오신 것을 환영합니다',
    subtitle: '재미있고 과학적으로 검증된 미니게임으로 인지 능력을 향상시키세요',
    totalXP: '총 경험치',
    dayStreak: '연속 일수',
    avgAccuracy: '평균 정확도',
    gamesPlayed: '플레이한 게임',
    chooseChallenge: '도전 과제 선택'
  },
  
  games: {
    memoryGrid: {
      name: '메모리 그리드',
      description: '그리드에서 기호의 위치를 기억하세요',
      skill: '공간 기억',
      instructions: '강조 표시된 기호의 위치를 기억하세요...',
      recall: '기호가 있던 셀을 클릭하세요!'
    },
    sequenceSparks: {
      name: '시퀀스 스파크',
      description: '빛의 순서를 기억하고 반복하세요',
      skill: '작업 기억',
      instructions: '시퀀스를 보고 반복하세요...',
      watch: '시퀀스를 보세요...',
      repeat: '이제 시퀀스를 반복하세요!',
      wrong: '앗! 잘못된 시퀀스입니다. 다음 것을 시도하세요!'
    },
    cardMatch: {
      name: '카드 매치',
      description: '시간 제한 내에 짝을 찾으세요',
      skill: '시각 기억',
      instructions: '시간이 다 되기 전에 모든 쌍을 찾으세요!',
      memorizePhase: '카드를 기억하세요!',
      playPhase: '짝을 찾으세요!',
      cardsFlipIn: '카드가 뒤집힐 때까지...'
    },
    numberRecall: {
      name: '숫자 기억',
      description: '숫자 시퀀스를 기억하세요',
      skill: '숫자 기억',
      instructions: '숫자를 주의깊게 보세요...',
      enterNumbers: '숫자 입력',
      submit: '제출',
      typeForward: '순서대로 숫자를 입력하세요',
      typeReverse: '역순으로 숫자를 입력하세요',
      enterSomething: '숫자를 입력해주세요',
      perfect: '완벽합니다!',
      correct: '정답',
      incorrect: '오답',
      correctWas: '정답은',
      reverseMode: '🔄 역순 모드'
    },
    flashCount: {
      name: '빠른 카운트',
      description: '화면에 표시되는 물체를 세세요',
      skill: '빠른 주의력',
      instructions: '물체가 짧게 표시됩니다. 특정 유형을 세세요!',
      question: '{color}색 {shape}가 몇 개 있었나요?',
      shapes: {
        circle: '원',
        square: '사각형',
        triangle: '삼각형',
        star: '별'
      },
      colors: {
        red: '빨강',
        blue: '파랑',
        green: '초록',
        yellow: '노랑',
        purple: '보라',
        orange: '주황'
      }
    },
    wordTrail: {
      name: '단어 트레일',
      description: '순서대로 단어를 기억하세요',
      skill: '언어 기억',
      instructions: '이 단어들을 순서대로 기억하세요...',
      recall: '이제 순서대로 단어를 입력하세요!',
      typeWords: '올바른 순서로 각 단어를 입력하세요',
      wordPlaceholder: '단어 {num}',
      submit: '제출',
      results: '결과',
      correctWords: '정답 단어',
      correctOrder: '정확한 순서와 위치'
    },
    patternPath: {
      name: '패턴 경로',
      description: '격자에서 경로를 기억하고 추적하세요',
      skill: '공간 순서',
      instructions: '경로를 보고 기억하세요...',
      watch: '경로를 주의깊게 보세요...',
      recall: '이제 같은 경로를 그리세요!',
      clear: '지우기',
      submit: '제출'
    },
    playNow: '지금 플레이'
  },
  
  tutorial: {
    skip: '튜토리얼 건너뛰기',
    back: '뒤로',
    next: '다음',
    startPlaying: '플레이 시작!',
    howToPlay: '게임 방법',
    tips: '팁',
    memoryGrid: {
      welcome: '메모리 그리드에 오신 것을 환영합니다!',
      intro: '그리드에서 기호가 나타나는 위치를 기억하여 공간 기억을 테스트하세요.',
      steps: '1. 그리드에 기호가 나타나는 것을 주의 깊게 관찰하세요\n2. 위치를 기억하세요\n3. 그리드가 지워지면 기호가 있던 셀을 클릭하세요\n4. 5라운드를 완료하여 게임을 마치세요',
      tips: '• 그리드는 몇 초 동안만 표시됩니다 - 집중하세요!\n• 실력이 향상되면 난이도가 올라갑니다\n• 패턴을 시각화하거나 정신적 연상을 만들어 보세요'
    },
    sequenceSparks: {
      welcome: '시퀀스 스파크에 오신 것을 환영합니다!',
      intro: '깜박이는 빛의 순서를 반복하여 작업 기억을 훈련하세요.',
      steps: '1. 색상 버튼이 순서대로 켜지는 것을 관찰하세요\n2. 순서가 끝날 때까지 기다리세요\n3. 같은 순서로 버튼을 클릭하세요\n4. 라운드마다 순서가 길어집니다',
      tips: '• 한 번에 하나의 버튼에 집중하세요\n• 기억을 강화하기 위해 색상을 소리 내어 말해 보세요\n• 마음속으로 리듬이나 패턴을 만드세요'
    },
    cardMatch: {
      welcome: '카드 매치에 오신 것을 환영합니다!',
      intro: '시간이 다 되기 전에 카드 쌍을 맞춰 시각 기억에 도전하세요.',
      steps: '1. 카드를 클릭하여 뒤집으세요\n2. 일치하는 쌍을 찾아보세요\n3. 각 기호의 위치를 기억하세요\n4. 타이머가 만료되기 전에 모든 쌍을 맞추세요',
      tips: '• 체계적으로 카드를 뒤집는 것부터 시작하세요\n• 기호 위치에 주의를 기울이세요\n• 시간을 절약하기 위해 빠르지만 정확하게 작업하세요'
    },
    numberRecall: {
      welcome: '숫자 기억에 오신 것을 환영합니다!',
      intro: '숫자 시퀀스를 기억하여 숫자 기억력을 훈련하세요.',
      steps: '1. 숫자가 하나씩 나타나는 것을 보세요\n2. 시퀀스를 기억하세요\n3. 순서대로 숫자를 입력하세요 (더 어려운 레벨은 역순으로)\n4. 답을 제출하세요',
      tips: '• 숫자를 그룹으로 묶어보세요 (전화번호처럼)\n• 패턴이나 연상을 만드세요\n• 역순 모드에서는 시퀀스를 거꾸로 시각화하세요'
    },
    flashCount: {
      welcome: '빠른 카운트에 오신 것을 환영합니다!',
      intro: '화면에 짧게 나타나는 물체를 세어 시각 주의력을 테스트하세요.',
      steps: '1. 물체가 짧은 순간 나타납니다\n2. 특정 유형(색상 + 모양)을 세세요\n3. 옵션에서 올바른 개수를 선택하세요\n4. 5라운드를 완료하세요',
      tips: '• 물체가 나타나기 전에 대상 유형에 집중하세요\n• 서비타이징(작은 수량을 즉시 인식)을 연습하세요\n• 모든 것을 세려고 하지 마세요 - 요청된 것만 세세요'
    },
    wordTrail: {
      welcome: '단어 트레일에 오신 것을 환영합니다!',
      intro: '순서대로 단어를 기억하여 언어 기억에 도전하세요.',
      steps: '1. 단어가 하나씩 나타나는 것을 보세요\n2. 순서대로 기억하세요\n3. 각 단어를 올바른 위치에 입력하세요\n4. 완료하면 제출하세요',
      tips: '• 단어를 연결하는 이야기를 만드세요\n• 각 단어의 첫 글자를 사용하여 두문자어를 만드세요\n• 각 단어에 대한 생생한 이미지를 시각화하세요'
    },
    patternPath: {
      welcome: '패턴 경로에 오신 것을 환영합니다!',
      intro: '격자에서 경로를 기억하고 추적하여 공간 기억을 훈련하세요.',
      steps: '1. 격자에 경로가 그려지는 것을 보세요\n2. 셀의 순서를 기억하세요\n3. 순서대로 셀을 클릭하여 경로를 재현하세요\n4. 셀은 인접해야 합니다 (대각선 불가)',
      tips: '• 방향 표시에 주의를 기울이세요\n• 긴 경로를 작은 덩어리로 나누세요\n• 랜드마크나 패턴을 사용하여 전환점을 기억하세요'
    }
  },
  
  gameUI: {
    backToDashboard: '대시보드로 돌아가기',
    level: '레벨',
    round: '라운드',
    time: '시간',
    score: '점수',
    accuracy: '정확도',
    mistakes: '실수',
    pairsFound: '찾은 쌍',
    ready: '준비 완료!'
  },
  
  results: {
    gameComplete: '게임 완료! 🎉',
    score: '점수',
    accuracy: '정확도',
    time: '시간',
    xpGained: '획득 경험치',
    level: '레벨',
    playAgain: '다시 플레이',
    backToDashboard: '대시보드로 돌아가기'
  },
  
  progress: {
    title: '당신의 진행 상황',
    yourProgress: '당신의 진행 상황',
    recentGames: '최근 게임',
    accuracyLabel: '정확도 %',
    accuracyTrend: '최근 정확도 추이',
    gamesPlayedLabel: '플레이한 게임',
    gamesByType: '유형별 플레이한 게임',
    achievements: '업적'
  },
  
  settings: {
    title: '설정',
    soundEffects: '🔊 효과음',
    colorBlindMode: '🎨 색맹 모드',
    animations: '✨ 애니메이션',
    language: '🌍 언어',
    applyLanguage: '언어 적용',
    dataManagement: '📦 데이터 관리',
    exportProgress: '💾 진행 상황 내보내기',
    exportProgressDesc: '진행 상황과 업적 다운로드（암호화됨）',
    importProgress: '📂 진행 상황 가져오기',
    importProgressDesc: '백업 파일에서 복원',
    dangerZone: '⚠️ 위험 영역',
    resetProgress: '모든 진행 상황 초기화',
    resetConfirm: '정말로 모든 진행 상황을 초기화하시겠습니까? 이 작업은 취소할 수 없습니다.',
    resetSuccess: '진행 상황이 성공적으로 초기화되었습니다!'
  },
  
  about: {
    title: 'MnemoQuest 정보',
    description: 'MnemoQuest는 기억력, 집중력, 회상 속도를 향상시키기 위해 설계된 과학적으로 검증된 인지 훈련 플랫폼입니다.',
    howItWorks: '작동 원리',
    howItWorksText: '적응형 난이도 시스템이 성과에 따라 도전 과제를 조정하여 항상 최적의 학습 영역에 있도록 합니다.',
    benefits: '이점',
    benefit1: '단기 기억력과 작업 기억력 향상',
    benefit2: '공간 인식 능력 향상',
    benefit3: '집중력과 주의력 증가',
    benefit4: '인지 진행 상황 추적',
    developer: '개발자',
    version: '버전 1.0.0 • TypeScript & Vite로 제작 • MIT 라이선스'
  },
  
  common: {
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    ok: '확인',
    cancel: '취소',
    yes: '예',
    no: '아니오'
  },
  
  badges: {
    firstSteps: {
      name: '첫 걸음',
      description: '첫 게임 완료'
    },
    dedicated: {
      name: '헌신적',
      description: '10개 게임 플레이'
    },
    committed: {
      name: '전념',
      description: '50개 게임 플레이'
    },
    centurion: {
      name: '센츄리온',
      description: '100개 게임 플레이'
    },
    streak3: {
      name: '3일 연속',
      description: '3일 연속 플레이'
    },
    streak7: {
      name: '주간 전사',
      description: '7일 연속 플레이'
    },
    streak30: {
      name: '월간 마스터',
      description: '30일 연속 플레이'
    },
    level5: {
      name: '레벨 5',
      description: '레벨 5 도달'
    },
    level10: {
      name: '레벨 10',
      description: '레벨 10 도달'
    },
    sharpMind: {
      name: '예리한 마음',
      description: '평균 80% 정확도 (10+ 게임)'
    },
    perfectionist: {
      name: '완벽주의자',
      description: '평균 95% 정확도 (20+ 게임)'
    }
  }
};

export default ko;

