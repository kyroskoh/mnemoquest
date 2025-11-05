import { Translation } from '../core/TranslationManager';

const ja: Translation = {
  nav: {
    home: 'ホーム',
    progress: '進捗',
    settings: '設定',
    about: 'について'
  },
  
  dashboard: {
    welcome: '記憶トレーニングへようこそ',
    subtitle: '楽しく科学的に裏付けられたミニゲームで認知能力を向上させましょう',
    totalXP: '総経験値',
    dayStreak: '連続日数',
    avgAccuracy: '平均正確度',
    gamesPlayed: 'プレイしたゲーム',
    chooseChallenge: 'チャレンジを選択'
  },
  
  games: {
    memoryGrid: {
      name: 'メモリーグリッド',
      description: 'グリッド内のシンボルの位置を記憶する',
      skill: '空間記憶',
      instructions: 'ハイライトされたシンボルの位置を記憶してください...',
      recall: 'シンボルがあったセルをクリックしてください！'
    },
    sequenceSparks: {
      name: 'シーケンススパーク',
      description: '光の順序を記憶して繰り返す',
      skill: 'ワーキングメモリー',
      instructions: 'シーケンスを見て繰り返してください...',
      watch: 'シーケンスを見てください...',
      repeat: 'では、シーケンスを繰り返してください！',
      wrong: 'おっと！間違ったシーケンスです。次に挑戦してください！'
    },
    cardMatch: {
      name: 'カードマッチ',
      description: '時間制限内にペアを見つける',
      skill: '視覚記憶',
      instructions: '時間切れになる前にすべてのペアを見つけてください！',
      memorizePhase: 'カードを覚えてください！',
      playPhase: 'ペアを見つけてください！',
      cardsFlipIn: 'カードが裏返るまで...'
    },
    numberRecall: {
      name: '数字記憶',
      description: '数字の列を覚える',
      skill: '数字記憶',
      instructions: '数字をよく見てください...',
      enterNumbers: '数字を入力',
      submit: '送信',
      typeForward: '順番に数字を入力してください',
      typeReverse: '逆順に数字を入力してください',
      enterSomething: '数字を入力してください',
      perfect: '完璧です！',
      correct: '正解',
      incorrect: '不正解',
      correctWas: '正解は',
      reverseMode: '🔄 逆順モード'
    },
    flashCount: {
      name: 'フラッシュカウント',
      description: '画面に表示されるオブジェクトを数える',
      skill: '素早い注意力',
      instructions: 'オブジェクトが短時間表示されます。指定されたタイプを数えてください！',
      question: '{color}色の{shape}はいくつありましたか？',
      shapes: {
        circle: '円',
        square: '四角',
        triangle: '三角',
        star: '星'
      },
      colors: {
        red: '赤',
        blue: '青',
        green: '緑',
        yellow: '黄',
        purple: '紫',
        orange: 'オレンジ'
      }
    },
    wordTrail: {
      name: 'ワードトレイル',
      description: '順番に単語を覚える',
      skill: '言語記憶',
      instructions: 'これらの単語を順番に覚えてください...',
      recall: 'では順番に単語を入力してください！',
      typeWords: '正しい順番で各単語を入力してください',
      wordPlaceholder: '単語 {num}',
      submit: '送信',
      results: '結果',
      correctWords: '正解した単語',
      correctOrder: '正しい順序と位置'
    },
    patternPath: {
      name: 'パターンパス',
      description: 'グリッド上のパスを覚えて描く',
      skill: '空間シーケンス',
      instructions: 'パスを見て覚えてください...',
      watch: 'パスをよく見てください...',
      recall: '同じパスを描いてください！',
      clear: 'クリア',
      submit: '送信'
    },
    playNow: '今すぐプレイ'
  },
  
  tutorial: {
    skip: 'チュートリアルをスキップ',
    back: '戻る',
    next: '次へ',
    startPlaying: 'プレイ開始！',
    howToPlay: '遊び方',
    tips: 'ヒント',
    memoryGrid: {
      welcome: 'メモリーグリッドへようこそ！',
      intro: 'グリッド上のシンボルの位置を覚えて空間記憶をテストします。',
      steps: '1. グリッドにシンボルが現れるのを注意深く見る\n2. その位置を記憶する\n3. グリッドがクリアされたら、シンボルがあったセルをクリックする\n4. 5ラウンドを完了してゲームを終了する',
      tips: '• グリッドは数秒間しか表示されません - 集中してください！\n• 上達するにつれて難易度が上がります\n• パターンを視覚化したり、心理的な関連付けを作成してみてください'
    },
    sequenceSparks: {
      welcome: 'シーケンススパークへようこそ！',
      intro: '点滅する光の順序を繰り返してワーキングメモリーをトレーニングします。',
      steps: '1. 色付きボタンが順番に光るのを見る\n2. シーケンスが終わるまで待つ\n3. 同じ順番でボタンをクリックする\n4. ラウンドごとにシーケンスが長くなる',
      tips: '• 一度に1つのボタンに集中する\n• 記憶を強化するために色を声に出して言ってみる\n• 頭の中でリズムやパターンを作成する'
    },
    cardMatch: {
      welcome: 'カードマッチへようこそ！',
      intro: '時間切れになる前にカードのペアを見つけて視覚記憶に挑戦します。',
      steps: '1. カードをクリックしてひっくり返す\n2. 一致するペアを見つけてみる\n3. 各シンボルの位置を覚える\n4. タイマーが切れる前にすべてのペアを見つける',
      tips: '• 体系的にカードをひっくり返すことから始める\n• シンボルの位置に注意を払う\n• 時間を節約するために素早く、しかし正確に作業する'
    },
    numberRecall: {
      welcome: '数字記憶へようこそ！',
      intro: '数字の列を覚えて数字記憶力をトレーニングします。',
      steps: '1. 数字が1つずつ表示されるのを見る\n2. シーケンスを覚える\n3. 順番に数字を入力（難しいレベルでは逆順）\n4. 答えを送信する',
      tips: '• 数字をグループ化してみる（電話番号のように）\n• パターンや関連付けを作成する\n• 逆順モードでは、シーケンスを逆に視覚化する'
    },
    flashCount: {
      welcome: 'フラッシュカウントへようこそ！',
      intro: '短時間で画面に表示されるオブジェクトを数えて視覚注意力をテストします。',
      steps: '1. オブジェクトが短時間表示される\n2. 特定のタイプ（色+形）を数える\n3. 選択肢から正しい数を選ぶ\n4. 5ラウンドを完了する',
      tips: '• オブジェクトが現れる前にターゲットタイプに集中する\n• サビタイジング（小さな量を瞬時に認識）を練習する\n• すべてを数えようとしない - 求められているものだけを数える'
    },
    wordTrail: {
      welcome: 'ワードトレイルへようこそ！',
      intro: '単語を順番に覚えて言語記憶に挑戦します。',
      steps: '1. 単語が1つずつ表示されるのを見る\n2. 順番に覚える\n3. 各単語を正しい位置に入力する\n4. 完了したら送信する',
      tips: '• 単語をつなぐストーリーを作る\n• 各単語の最初の文字を使って頭字語を作る\n• 各単語のための鮮明なイメージを視覚化する'
    },
    patternPath: {
      welcome: 'パターンパスへようこそ！',
      intro: 'グリッド上のパスを覚えて描いて空間記憶をトレーニングします。',
      steps: '1. グリッド上にパスが描かれるのを見る\n2. セルの順序を覚える\n3. 順番にセルをクリックしてパスを再現する\n4. セルは隣接している必要がある（対角線不可）',
      tips: '• 方向指示に注意を払う\n• 長いパスを小さなチャンクに分割する\n• ランドマークやパターンを使用して曲がり角を覚える'
    }
  },
  
  gameUI: {
    backToDashboard: 'ダッシュボードに戻る',
    level: 'レベル',
    round: 'ラウンド',
    time: '時間',
    score: 'スコア',
    accuracy: '正確度',
    mistakes: 'ミス',
    pairsFound: '見つけたペア',
    ready: '準備完了！'
  },
  
  results: {
    gameComplete: 'ゲーム完了！🎉',
    score: 'スコア',
    accuracy: '正確度',
    time: '時間',
    xpGained: '獲得経験値',
    level: 'レベル',
    playAgain: 'もう一度プレイ',
    backToDashboard: 'ダッシュボードに戻る'
  },
  
  progress: {
    title: 'あなたの進捗',
    yourProgress: 'あなたの進捗',
    recentGames: '最近のゲーム',
    accuracyLabel: '正確度 %',
    accuracyTrend: '最近の正確度の推移',
    gamesPlayedLabel: 'プレイしたゲーム',
    gamesByType: 'タイプ別プレイしたゲーム',
    achievements: '実績'
  },
  
  settings: {
    title: '設定',
    soundEffects: '🔊 効果音',
    colorBlindMode: '🎨 色覚異常モード',
    animations: '✨ アニメーション',
    language: '🌍 言語',
    applyLanguage: '言語を適用',
    resetProgress: '全ての進捗をリセット',
    resetConfirm: '本当に全ての進捗をリセットしますか？この操作は元に戻せません。',
    resetSuccess: '進捗が正常にリセットされました！'
  },
  
  about: {
    title: 'MnemoQuestについて',
    description: 'MnemoQuestは、記憶力、集中力、想起速度を向上させるために設計された科学的根拠に基づく認知トレーニングプラットフォームです。',
    howItWorks: '仕組み',
    howItWorksText: '適応型難易度システムがあなたのパフォーマンスに基づいてチャレンジを調整し、常に最適な学習ゾーンにいることを保証します。',
    benefits: 'メリット',
    benefit1: '短期記憶とワーキングメモリーの向上',
    benefit2: '空間認識能力の向上',
    benefit3: '集中力と注意力の向上',
    benefit4: '認知的進歩の追跡',
    developer: '開発者',
    version: 'バージョン 1.0.0 • TypeScript & Viteで構築 • MITライセンス'
  },
  
  common: {
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    ok: 'OK',
    cancel: 'キャンセル',
    yes: 'はい',
    no: 'いいえ'
  },
  
  badges: {
    firstSteps: {
      name: '最初の一歩',
      description: '最初のゲームをクリア'
    },
    dedicated: {
      name: '熱心',
      description: '10ゲームをプレイ'
    },
    committed: {
      name: '献身的',
      description: '50ゲームをプレイ'
    },
    centurion: {
      name: 'センチュリオン',
      description: '100ゲームをプレイ'
    },
    streak3: {
      name: '3日連続',
      description: '3日連続でプレイ'
    },
    streak7: {
      name: 'ウィークウォリアー',
      description: '7日連続でプレイ'
    },
    streak30: {
      name: 'マンスリーマスター',
      description: '30日連続でプレイ'
    },
    level5: {
      name: 'レベル5',
      description: 'レベル5に到達'
    },
    level10: {
      name: 'レベル10',
      description: 'レベル10に到達'
    },
    sharpMind: {
      name: 'シャープマインド',
      description: '平均80%の正確性（10+ゲーム）'
    },
    perfectionist: {
      name: '完璧主義者',
      description: '平均95%の正確性（20+ゲーム）'
    }
  }
};

export default ja;

