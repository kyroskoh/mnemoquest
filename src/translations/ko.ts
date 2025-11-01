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
      skill: '공간 기억'
    },
    sequenceSparks: {
      name: '시퀀스 스파크',
      description: '빛의 순서를 기억하고 반복하세요',
      skill: '작업 기억'
    },
    cardMatch: {
      name: '카드 매치',
      description: '시간 제한 내에 짝을 찾으세요',
      skill: '시각 기억'
    },
    playNow: '지금 플레이'
  },
  
  tutorial: {
    skip: '튜토리얼 건너뛰기',
    back: '뒤로',
    next: '다음',
    startPlaying: '플레이 시작!'
  },
  
  gameUI: {
    backToDashboard: '대시보드로 돌아가기',
    level: '레벨',
    round: '라운드',
    time: '시간',
    score: '점수',
    accuracy: '정확도',
    mistakes: '실수',
    pairsFound: '찾은 쌍'
  },
  
  results: {
    gameComplete: '게임 완료! 🎉',
    xpGained: '획득 경험치',
    playAgain: '다시 플레이',
    backToDashboard: '대시보드로 돌아가기'
  },
  
  progress: {
    title: '진행 상황',
    accuracyTrend: '정확도 추세 (최근 게임)',
    gamesByType: '유형별 게임',
    achievements: '업적'
  },
  
  settings: {
    title: '설정',
    soundEffects: '🔊 효과음',
    colorBlindMode: '🎨 색맹 모드',
    animations: '✨ 애니메이션',
    language: '🌍 언어',
    applyLanguage: '언어 적용',
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
  }
};

export default ko;

