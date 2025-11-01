import { Translation } from '../core/TranslationManager';

const zh: Translation = {
  nav: {
    home: '主页',
    progress: '进度',
    settings: '设置',
    about: '关于'
  },
  
  dashboard: {
    welcome: '欢迎来到您的记忆训练之旅',
    subtitle: '通过有趣的、科学支持的小游戏增强您的认知能力',
    totalXP: '总经验值',
    dayStreak: '连续天数',
    avgAccuracy: '平均准确率',
    gamesPlayed: '已玩游戏',
    chooseChallenge: '选择您的挑战'
  },
  
  games: {
    memoryGrid: {
      name: '记忆网格',
      description: '回忆网格中符号的位置',
      skill: '空间记忆'
    },
    sequenceSparks: {
      name: '序列火花',
      description: '记住并重复光序列',
      skill: '工作记忆'
    },
    cardMatch: {
      name: '配对卡牌',
      description: '在时间压力下配对',
      skill: '视觉记忆'
    },
    playNow: '立即游戏'
  },
  
  tutorial: {
    skip: '跳过教程',
    back: '返回',
    next: '下一步',
    startPlaying: '开始游戏！'
  },
  
  gameUI: {
    backToDashboard: '返回主页',
    level: '等级',
    round: '回合',
    time: '时间',
    score: '分数',
    accuracy: '准确率',
    mistakes: '错误',
    pairsFound: '找到配对'
  },
  
  results: {
    gameComplete: '游戏完成！🎉',
    xpGained: '获得经验值',
    playAgain: '再玩一次',
    backToDashboard: '返回主页'
  },
  
  progress: {
    title: '您的进度',
    accuracyTrend: '最近准确率趋势',
    gamesByType: '按类型划分的游戏',
    achievements: '成就'
  },
  
  settings: {
    title: '设置',
    soundEffects: '🔊 音效',
    colorBlindMode: '🎨 色盲模式',
    animations: '✨ 动画',
    language: '🌍 语言',
    applyLanguage: '应用语言',
    resetProgress: '重置所有进度',
    resetConfirm: '您确定要重置所有进度吗？此操作无法撤消。',
    resetSuccess: '进度已成功重置！'
  },
  
  about: {
    title: '关于 MnemoQuest',
    description: 'MnemoQuest 是一个科学支持的认知训练平台，旨在增强您的记忆力、专注力和回忆速度。',
    howItWorks: '工作原理',
    howItWorksText: '我们的自适应难度系统根据您的表现调整挑战，确保您始终处于最佳学习区域。',
    benefits: '好处',
    benefit1: '提高短期回忆和工作记忆',
    benefit2: '增强空间识别能力',
    benefit3: '提升专注力和注意力',
    benefit4: '追踪您的认知进步',
    developer: '开发者',
    version: '版本 1.0.0 • 使用 TypeScript & Vite 构建 • MIT 许可证'
  },
  
  common: {
    loading: '加载中...',
    error: '发生错误',
    ok: '确定',
    cancel: '取消',
    yes: '是',
    no: '否'
  }
};

export default zh;

