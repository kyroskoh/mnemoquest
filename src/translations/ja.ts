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
    nBack: {
      name: 'N-Backチャレンジ',
      description: 'ゴールドスタンダードの認知タスクでワーキングメモリをテスト',
      skill: 'ワーキングメモリ',
      back: '戻る',
      howToPlay: '遊び方',
      instruction1: '文字が1つずつ表示されます。現在の文字が{n}個前の文字と一致したらスペースキーを押す（または一致ボタンをタップ）してください。',
      instruction2: '集中して、一致を見つけたらすばやく反応してください！',
      example: '例',
      exampleText: '1-backの場合：A G B B（✓ ここで押す、Bが1個前と一致）| A B C D（✗ 押さない、D ≠ C）',
      trial: '試行',
      press: '一致を見つけたらスペースキーを押すかボタンをタップしてください',
      match: '一致！',
      hits: 'ヒット',
      misses: 'ミス'
    },
    storyRecall: {
      name: 'ストーリー記憶',
      description: '短い物語の詳細を覚える',
      skill: 'エピソード記憶',
      instructions: '物語をよく読んで詳細を覚えてください...',
      question: '質問',
      continue: '続ける'
    },
    changeDetection: {
      name: '変化検出',
      description: 'シーンで何が変わったか見つける',
      skill: '視覚的ワーキングメモリ',
      instructions: 'シーンを学習し、何が変わったかを識別してください！',
      round: 'ラウンド',
      memorize: 'このシーンを記憶してください...',
      findChange: '何が変わった？クリックしてください！'
    },
    colorSequence: {
      name: 'カラーシーケンス',
      description: '色のパターンを覚えて繰り返す',
      skill: '色の記憶',
      instructions: '色が順番に点滅するのを見て、同じ順序でクリックしてください！',
      level: 'レベル',
      sequence: 'シーケンス',
      watch: 'シーケンスを見てください...',
      yourTurn: 'あなたの番です！順番に色をクリックしてください',
      correct: '正解！',
      wrong: '間違ったシーケンス！',
      correctWas: '正しいシーケンスは：'
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
    },
    nBack: {
      welcome: 'Nバックチャレンジへようこそ！',
      intro: 'この科学的に検証されたタスクでワーキングメモリをテストし、改善します。',
      steps: '1. 画面に文字が次々と表示されます\n2. 現在の文字がN個前の文字と一致したらスペースバーを押す\n3. ゲームは1-backから始まり、2-back、3-backに進みます\n4. 集中して、一致を見たらすぐに反応する',
      tips: '• 最後のN個の文字の心的リストを保つ\n• 急がないで - 正確さはスピードより重要です\n• 定期的に練習してワーキングメモリ容量を向上させる\n• これは科学的に証明された数少ない脳トレーニングタスクの一つです！'
    },
    storyRecall: {
      welcome: 'ストーリーリコールへようこそ！',
      intro: '短いストーリーの詳細を覚えてエピソード記憶を改善します。',
      steps: '1. タイマーが動いている間、ストーリーを注意深く読む\n2. 特定の詳細（名前、色、数字、場所）に注意を払う\n3. ストーリーに関する多肢選択問題に答える\n4. メモは禁止 - 記憶に頼ってください！',
      tips: '• 読みながら心的イメージを作る\n• 誰が、何を、いつ、どこで、どのようにに注意を払う\n• 詳細を関連付けて一貫したストーリーを形成する\n• ストーリーに深く関与するほど、よく覚えられます'
    },
    changeDetection: {
      welcome: '変化検出へようこそ！',
      intro: 'シーンで何が変わったかを識別して視覚的ワーキングメモリをトレーニングします。',
      steps: '1. 表示フェーズ中にシーンを注意深く観察する\n2. 短い空白画面の後、シーンが1つの変化と共に再表示されます\n3. 変化したオブジェクトをクリックする\n4. 変化は色、位置、またはサイズです',
      tips: '• 各オブジェクトの位置と色を覚えようとする\n• シーンの心的スナップショットを作成する\n• より良い記憶のために場所や色でオブジェクトをグループ化する\n• 難易度が上がるとオブジェクトが増えます'
    },
    colorSequence: {
      welcome: 'カラーシーケンスへようこそ！',
      intro: 'この鮮やかなチャレンジで色のパターンと順序記憶をマスターします。',
      steps: '1. 色が順番に点滅するのを見る\n2. シーケンスが終わったら、あなたの番です\n3. 全く同じ順序で色をクリックする\n4. 各レベルはシーケンスに1つの色を追加します',
      tips: '• 点滅する色を声に出して（または心の中で）言う\n• 色でリズムやパターンを作る\n• シーケンスを覚えるために色の位置を使う\n• 3つのミスでゲーム終了 - 集中を保ってください！'
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
    achievements: '実績',
    game: 'ゲーム'
  },
  
  settings: {
    title: '設定',
    soundEffects: '🔊 効果音',
    colorBlindMode: '🎨 色覚異常モード',
    animations: '✨ アニメーション',
    language: '🌍 言語',
    applyLanguage: '言語を適用',
    dataManagement: '📦 データ管理',
    exportProgress: '💾 進捗をエクスポート',
    exportProgressDesc: '進捗と実績をダウンロード（暗号化）',
    importProgress: '📂 進捗をインポート',
    importProgressDesc: 'バックアップファイルから復元',
    dangerZone: '⚠️ 危険区域',
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
    // === ライフタイム進行 ===
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
    legendary: {
      name: 'レジェンド',
      description: '500ゲームをプレイ'
    },
    xp1000: {
      name: 'ライジングスター',
      description: '1,000XP獲得'
    },
    xp5000: {
      name: 'シャイニングブライト',
      description: '5,000XP獲得'
    },
    xp10000: {
      name: 'チャンピオン',
      description: '10,000XP獲得'
    },
    level5: {
      name: 'レベル5',
      description: 'レベル5に到達'
    },
    level10: {
      name: 'レベル10',
      description: 'レベル10に到達'
    },
    level20: {
      name: 'レベル20',
      description: 'レベル20に到達'
    },
    level50: {
      name: 'レベル50',
      description: 'レベル50に到達'
    },
    versatile: {
      name: '多才',
      description: '5種類のゲームをプレイ'
    },
    memoryMaster: {
      name: 'メモリーマスター',
      description: '20以上の記憶ゲームをプレイ'
    },
    highScorer: {
      name: 'ハイスコアラー',
      description: '1ゲームで1000点以上獲得'
    },
    // === デイリー/習慣ベース ===
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
    streak100: {
      name: '止められない',
      description: '100日連続でプレイ'
    },
    earlyBird: {
      name: '早起き鳥',
      description: '午前6時～10時にプレイ'
    },
    nightOwl: {
      name: '夜ふかしフクロウ',
      description: '深夜0時～午前4時にプレイ'
    },
    weekendWarrior: {
      name: 'ウィークエンドウォリアー',
      description: '土曜日と日曜日の両方にプレイ'
    },
    // === デイリーアチーブメント ===
    daily100xp: {
      name: 'デイリーアーナー',
      description: '1日で100XP獲得'
    },
    daily500xp: {
      name: 'デイリーグラインダー',
      description: '1日で500XP獲得'
    },
    daily1000xp: {
      name: 'デイリーチャンピオン',
      description: '1日で1000XP獲得'
    },
    daily5games: {
      name: 'デイリープレイヤー',
      description: '1日で5ゲームプレイ'
    },
    daily10games: {
      name: 'デイリーマラソナー',
      description: '1日で10ゲームプレイ'
    },
    daily20games: {
      name: 'デイリーレジェンド',
      description: '1日で20ゲームプレイ'
    },
    dailyVariety: {
      name: 'デイリーエクスプローラー',
      description: '今日3種類のゲームをプレイ'
    },
    dailyAllGames: {
      name: 'オールラウンダー',
      description: '今日5種類のゲームをプレイ'
    },
    dailyFocused: {
      name: 'デイリースペシャリスト',
      description: '今日同じゲームを5回プレイ'
    },
    // === パフォーマンスベース ===
    sharpMind: {
      name: 'シャープマインド',
      description: '平均80%の正確性（10+ゲーム）'
    },
    perfectionist: {
      name: '完璧主義者',
      description: '平均95%の正確性（20+ゲーム）'
    },
    flawless: {
      name: '完璧',
      description: 'ゲームで100%の正確性を達成'
    },
    noMistakes: {
      name: '完璧な連続',
      description: '5ゲームで100%の正確性を達成'
    }
  }
};

export default ja;

