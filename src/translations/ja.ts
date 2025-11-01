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
      skill: '空間記憶'
    },
    sequenceSparks: {
      name: 'シーケンススパーク',
      description: '光の順序を記憶して繰り返す',
      skill: 'ワーキングメモリー'
    },
    cardMatch: {
      name: 'カードマッチ',
      description: '時間制限内にペアを見つける',
      skill: '視覚記憶'
    },
    playNow: '今すぐプレイ'
  },
  
  tutorial: {
    skip: 'チュートリアルをスキップ',
    back: '戻る',
    next: '次へ',
    startPlaying: 'プレイ開始！'
  },
  
  gameUI: {
    backToDashboard: 'ダッシュボードに戻る',
    level: 'レベル',
    round: 'ラウンド',
    time: '時間',
    score: 'スコア',
    accuracy: '正確度',
    mistakes: 'ミス',
    pairsFound: '見つけたペア'
  },
  
  results: {
    gameComplete: 'ゲーム完了！🎉',
    xpGained: '獲得経験値',
    playAgain: 'もう一度プレイ',
    backToDashboard: 'ダッシュボードに戻る'
  },
  
  progress: {
    title: 'あなたの進捗',
    accuracyTrend: '正確度トレンド（最近のゲーム）',
    gamesByType: 'タイプ別ゲーム',
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
  }
};

export default ja;

