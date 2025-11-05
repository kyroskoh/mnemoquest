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
      skill: '空间记忆',
      instructions: '记住高亮符号的位置...',
      recall: '点击有符号的单元格！'
    },
    sequenceSparks: {
      name: '序列火花',
      description: '记住并重复光序列',
      skill: '工作记忆',
      instructions: '观察序列并重复它...',
      watch: '观察序列...',
      repeat: '现在重复序列！',
      wrong: '哎呀！顺序错误。试试下一个！'
    },
    cardMatch: {
      name: '配对卡牌',
      description: '在时间压力下配对',
      skill: '视觉记忆',
      instructions: '在时间用完之前找到所有配对！',
      memorizePhase: '记住这些卡牌！',
      playPhase: '找到所有配对！',
      cardsFlipIn: '卡牌即将翻回...'
    },
    numberRecall: {
      name: '数字记忆',
      description: '记住数字序列',
      skill: '数字记忆',
      instructions: '仔细观察这些数字...',
      enterNumbers: '输入数字',
      submit: '提交',
      typeForward: '按顺序输入数字',
      typeReverse: '按逆序输入数字',
      enterSomething: '请输入数字',
      perfect: '完美！',
      correct: '正确',
      incorrect: '错误',
      correctWas: '正确答案是',
      reverseMode: '🔄 逆序模式'
    },
    flashCount: {
      name: '闪现计数',
      description: '计算闪现在屏幕上的物体',
      skill: '快速注意力',
      instructions: '物体会快速闪现，数出指定类型的数量！',
      question: '有多少个{color}色{shape}？',
      shapes: {
        circle: '圆形',
        square: '方形',
        triangle: '三角形',
        star: '星形'
      },
      colors: {
        red: '红',
        blue: '蓝',
        green: '绿',
        yellow: '黄',
        purple: '紫',
        orange: '橙'
      }
    },
    wordTrail: {
      name: '单词轨迹',
      description: '按顺序记住单词',
      skill: '语言记忆',
      instructions: '按顺序记住这些单词...',
      recall: '现在按顺序输入这些单词！',
      typeWords: '按正确顺序输入每个单词',
      wordPlaceholder: '单词 {num}',
      submit: '提交',
      results: '结果',
      correctWords: '正确单词数',
      correctOrder: '正确顺序和位置'
    },
    patternPath: {
      name: '模式路径',
      description: '记住并在网格上追踪路径',
      skill: '空间顺序',
      instructions: '观察路径并记住它...',
      watch: '仔细观察路径...',
      recall: '现在追踪相同的路径！',
      clear: '清除',
      submit: '提交'
    },
    nBack: {
      name: 'N-Back 挑战',
      description: '用黄金标准认知任务测试工作记忆',
      skill: '工作记忆',
      back: '回退',
      howToPlay: '如何玩',
      instruction1: '字母会一个接一个地出现。当当前字母与往前数第 {n} 个字母匹配时，按空格键（或点击匹配按钮）。',
      instruction2: '集中注意力，看到匹配时快速响应！',
      example: '示例',
      exampleText: '在 1-back 中：A G B B（✓ 按这里，B 与 1 个前匹配）| A B C D（✗ 不要按，D ≠ C）',
      trial: '试验',
      press: '看到匹配时按空格键或点击按钮',
      match: '匹配！',
      hits: '命中',
      misses: '错过'
    },
    storyRecall: {
      name: '故事回忆',
      description: '记住短故事中的细节',
      skill: '情景记忆',
      instructions: '仔细阅读故事并记住细节...',
      question: '问题',
      continue: '继续'
    },
    changeDetection: {
      name: '变化检测',
      description: '找出场景中的变化',
      skill: '视觉工作记忆',
      instructions: '学习场景，然后识别变化了什么！',
      round: '回合',
      memorize: '记住这个场景...',
      findChange: '什么变了？点击它！'
    },
    colorSequence: {
      name: '颜色序列',
      description: '记住并重复颜色模式',
      skill: '颜色记忆',
      instructions: '观察颜色按顺序闪烁，然后按相同顺序点击它们！',
      level: '等级',
      sequence: '序列',
      watch: '观察序列...',
      yourTurn: '轮到你了！按顺序点击颜色',
      correct: '正确！',
      wrong: '序列错误！',
      correctWas: '正确的序列是：'
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
    },
    numberRecall: {
      welcome: '欢迎来到数字记忆！',
      intro: '通过记住数字序列来训练您的数字记忆。',
      steps: '1. 观察数字逐个出现\n2. 记住序列\n3. 按顺序输入数字（较难的关卡需按逆序输入）\n4. 提交您的答案',
      tips: '• 尝试将数字分组（如电话号码）\n• 创建模式或联想\n• 在逆序模式中，将序列倒着可视化'
    },
    flashCount: {
      welcome: '欢迎来到闪现计数！',
      intro: '通过计算屏幕上快速闪现的物体来测试您的视觉注意力。',
      steps: '1. 物体会快速闪现\n2. 计算特定类型（颜色+形状）\n3. 从选项中选择正确的数量\n4. 完成5轮',
      tips: '• 在物体出现前专注于目标类型\n• 练习快速识别（即时识别小数量）\n• 不要尝试计算所有内容 - 只计算要求的'
    },
    wordTrail: {
      welcome: '欢迎来到单词轨迹！',
      intro: '通过按顺序记住单词来挑战您的语言记忆。',
      steps: '1. 观察单词逐个出现\n2. 按顺序记住它们\n3. 在正确位置输入每个单词\n4. 完成后提交',
      tips: '• 创建一个连接单词的故事\n• 使用每个单词的首字母组成缩写\n• 为每个单词想象生动的图像'
    },
    patternPath: {
      welcome: '欢迎来到模式路径！',
      intro: '通过记住并在网格上追踪路径来训练您的空间记忆。',
      steps: '1. 观察路径在网格上绘制\n2. 记住单元格序列\n3. 按顺序点击单元格重现路径\n4. 单元格必须相邻（不能对角）',
      tips: '• 注意方向指示器\n• 将长路径分成小段\n• 使用地标或模式来记住转弯'
    },
    nBack: {
      welcome: '欢迎来到N-Back挑战！',
      intro: '通过这个经过科学验证的任务测试和提高您的工作记忆。',
      steps: '1. 字母将在屏幕上逐个出现\n2. 当当前字母与往前数第N个字母匹配时按空格键\n3. 游戏从1-back开始，然后进展到2-back和3-back\n4. 保持专注，看到匹配时快速响应',
      tips: '• 在脑海中保持最后N个字母的列表\n• 不要急躁 - 准确性比速度更重要\n• 定期练习以提高工作记忆容量\n• 这是为数不多的经科学证明的脑力训练任务之一！'
    },
    storyRecall: {
      welcome: '欢迎来到故事回忆！',
      intro: '通过记住短故事中的细节来增强您的情景记忆。',
      steps: '1. 在计时器期间仔细阅读故事\n2. 注意具体细节（姓名、颜色、数字、地点）\n3. 回答关于故事的多选题\n4. 不允许做笔记 - 依靠您的记忆！',
      tips: '• 在阅读时创建心理图像\n• 注意谁、什么、何时、哪里和如何\n• 将细节连接起来形成连贯的故事\n• 您越投入故事，就越能记住它'
    },
    changeDetection: {
      welcome: '欢迎来到变化检测！',
      intro: '通过识别场景中的变化来训练您的视觉工作记忆。',
      steps: '1. 在观看阶段仔细研究场景\n2. 短暂的空白屏幕后，场景重新出现并有一个变化\n3. 点击发生变化的对象\n4. 变化可以是：颜色、位置或大小',
      tips: '• 尝试记住每个对象的位置和颜色\n• 创建场景的心理快照\n• 按位置或颜色对对象进行分组以更好地记忆\n• 随着难度增加，将出现更多对象'
    },
    colorSequence: {
      welcome: '欢迎来到颜色序列！',
      intro: '通过这个充满活力的挑战掌握颜色模式和顺序记忆。',
      steps: '1. 观察颜色按顺序闪烁\n2. 序列结束后，轮到您了\n3. 按完全相同的顺序点击颜色\n4. 每个级别在序列中添加一种颜色',
      tips: '• 在颜色闪烁时大声说出（或在心中默念）\n• 用颜色创建节奏或图案\n• 使用颜色位置帮助记住序列\n• 三次错误游戏结束 - 保持专注！'
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
    pairsFound: '找到配对',
    ready: '我准备好了！'
  },
  
  results: {
    gameComplete: '游戏完成！🎉',
    score: '分数',
    accuracy: '准确率',
    time: '时间',
    xpGained: '获得经验值',
    level: '等级',
    playAgain: '再玩一次',
    backToDashboard: '返回主页'
  },
  
  progress: {
    title: '你的进度',
    yourProgress: '你的进度',
    recentGames: '最近游戏',
    accuracyLabel: '准确率 %',
    accuracyTrend: '最近准确率趋势',
    gamesPlayedLabel: '已玩游戏',
    gamesByType: '按类型分类的已玩游戏',
    achievements: '成就'
  },
  
  settings: {
    title: '设置',
    soundEffects: '🔊 音效',
    colorBlindMode: '🎨 色盲模式',
    animations: '✨ 动画',
    language: '🌍 语言',
    applyLanguage: '应用语言',
    dataManagement: '📦 数据管理',
    exportProgress: '💾 导出进度',
    exportProgressDesc: '下载您的进度和成就（加密）',
    importProgress: '📂 导入进度',
    importProgressDesc: '从备份文件恢复',
    dangerZone: '⚠️ 危险区域',
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
  },
  
  badges: {
    firstSteps: {
      name: '第一步',
      description: '完成你的第一个游戏'
    },
    dedicated: {
      name: '专注者',
      description: '玩10个游戏'
    },
    committed: {
      name: '坚持者',
      description: '玩50个游戏'
    },
    centurion: {
      name: '百夫长',
      description: '玩100个游戏'
    },
    streak3: {
      name: '3天连胜',
      description: '连续玩3天'
    },
    streak7: {
      name: '周战士',
      description: '连续玩7天'
    },
    streak30: {
      name: '月度大师',
      description: '连续玩30天'
    },
    level5: {
      name: '5级',
      description: '达到5级'
    },
    level10: {
      name: '10级',
      description: '达到10级'
    },
    sharpMind: {
      name: '敏锐头脑',
      description: '80%平均准确度（10+游戏）'
    },
    perfectionist: {
      name: '完美主义者',
      description: '95%平均准确度（20+游戏）'
    }
  }
};

export default zh;

