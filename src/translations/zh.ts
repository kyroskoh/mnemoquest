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
    startPlaying: '开始游戏！',
    howToPlay: '如何游戏',
    tips: '提示',
    memoryGrid: {
      welcome: '欢迎来到记忆网格！',
      intro: '通过记住符号在网格中的位置来测试您的空间记忆。',
      steps: '1. 仔细观察符号在网格上的出现\n2. 记住它们的位置\n3. 当网格清除时，点击有符号的单元格\n4. 完成5轮以完成游戏',
      tips: '• 网格只会显示几秒钟 - 集中注意力！\n• 随着您的进步，难度会增加\n• 尝试可视化模式或创建心理联想'
    },
    sequenceSparks: {
      welcome: '欢迎来到序列火花！',
      intro: '通过重复闪烁的光序列来训练您的工作记忆。',
      steps: '1. 观察彩色按钮按顺序亮起\n2. 等待序列结束\n3. 按相同顺序点击按钮\n4. 每轮序列会变长',
      tips: '• 一次专注于一个按钮\n• 尝试大声说出颜色以强化记忆\n• 在脑海中创建节奏或模式'
    },
    cardMatch: {
      welcome: '欢迎来到配对卡牌！',
      intro: '在时间用完之前配对卡牌，挑战您的视觉记忆。',
      steps: '1. 点击卡牌翻转它们\n2. 尝试找到匹配的对\n3. 记住每个符号的位置\n4. 在计时器到期前匹配所有对',
      tips: '• 从系统地翻转卡牌开始\n• 注意符号位置\n• 快速但准确地工作以节省时间'
    }
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

