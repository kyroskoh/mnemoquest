export interface GameProgress {
  totalXP: number;
  level: number;
  gamesPlayed: number;
  dailyStreak: number;
  lastPlayDate: string;
  highScores: {
    [gameType: string]: number;
  };
  gameStats: {
    [gameType: string]: {
      played: number;
      totalAccuracy: number;
      bestTime: number;
      currentDifficulty: number;
    };
  };
  badges: string[];
  recentScores: Array<{
    gameType: string;
    score: number;
    accuracy: number;
    date: string;
  }>;
}

export interface Settings {
  soundEnabled: boolean;
  colorBlindMode: boolean;
  animationsEnabled: boolean;
  language: string;
}

export class StorageManager {
  private readonly PROGRESS_KEY = 'mnemoquest_progress';
  private readonly SETTINGS_KEY = 'mnemoquest_settings';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.PROGRESS_KEY)) {
      this.resetProgress();
    }
    if (!localStorage.getItem(this.SETTINGS_KEY)) {
      this.resetSettings();
    }
  }

  loadProgress(): GameProgress {
    const data = localStorage.getItem(this.PROGRESS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return this.getDefaultProgress();
  }

  saveProgress(progress: GameProgress): void {
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));
  }

  updateProgress(updates: Partial<GameProgress>): void {
    const current = this.loadProgress();
    const updated = { ...current, ...updates };
    this.saveProgress(updated);
  }

  addGameResult(gameType: string, score: number, accuracy: number): void {
    const progress = this.loadProgress();
    
    // Update total stats
    progress.gamesPlayed++;
    progress.totalXP += score;
    
    // Update game-specific stats
    if (!progress.gameStats[gameType]) {
      progress.gameStats[gameType] = {
        played: 0,
        totalAccuracy: 0,
        bestTime: 0,
        currentDifficulty: 1
      };
    }
    
    progress.gameStats[gameType].played++;
    progress.gameStats[gameType].totalAccuracy += accuracy;
    
    // Update high score
    if (!progress.highScores[gameType] || score > progress.highScores[gameType]) {
      progress.highScores[gameType] = score;
    }
    
    // Add to recent scores (keep last 20)
    progress.recentScores.unshift({
      gameType,
      score,
      accuracy,
      date: new Date().toISOString()
    });
    progress.recentScores = progress.recentScores.slice(0, 20);
    
    // Update daily streak
    progress.dailyStreak = this.calculateStreak(progress.lastPlayDate);
    progress.lastPlayDate = new Date().toISOString().split('T')[0];
    
    // Calculate level with progressive XP requirements
    progress.level = this.calculateLevel(progress.totalXP);
    
    // Check for badges
    this.checkAndAwardBadges(progress);
    
    this.saveProgress(progress);
  }

  private calculateStreak(lastPlayDate: string): number {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = new Date(lastPlayDate);
    const todayDate = new Date(today);
    
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Same day, maintain streak
      const progress = this.loadProgress();
      return progress.dailyStreak;
    } else if (diffDays === 1) {
      // Next day, increment streak
      const progress = this.loadProgress();
      return progress.dailyStreak + 1;
    } else {
      // Streak broken
      return 1;
    }
  }

  /**
   * Calculate player level based on total XP with progressive requirements.
   * Each level requires progressively more XP to achieve, making higher levels harder to reach.
   * 
   * Formula: Each level requires 10% more XP than the previous level
   * - Level 1->2: 100 XP
   * - Level 2->3: 110 XP  
   * - Level 3->4: 121 XP
   * - etc.
   */
  private calculateLevel(totalXP: number): number {
    if (totalXP < 0) return 1;
    
    let level = 1;
    let xpRequired = 0;
    let xpForNextLevel = 100; // Base XP for level 2
    
    while (totalXP >= xpRequired + xpForNextLevel) {
      xpRequired += xpForNextLevel;
      level++;
      // Each level requires 10% more XP than the previous level
      xpForNextLevel = Math.floor(xpForNextLevel * 1.1);
    }
    
    return level;
  }

  /**
   * Get XP progress for the current level
   * Returns: { currentLevelXP, xpForNextLevel, percentage }
   */
  getLevelProgress(totalXP: number): { currentLevelXP: number; xpForNextLevel: number; percentage: number } {
    let level = 1;
    let xpRequired = 0;
    let xpForNextLevel = 100;
    
    while (totalXP >= xpRequired + xpForNextLevel) {
      xpRequired += xpForNextLevel;
      level++;
      xpForNextLevel = Math.floor(xpForNextLevel * 1.1);
    }
    
    const currentLevelXP = totalXP - xpRequired;
    const percentage = (currentLevelXP / xpForNextLevel) * 100;
    
    return {
      currentLevelXP,
      xpForNextLevel,
      percentage: Math.min(100, Math.max(0, percentage))
    };
  }

  private checkAndAwardBadges(progress: GameProgress): void {
    const badges: string[] = [...progress.badges];
    
    // First game badge
    if (progress.gamesPlayed >= 1 && !badges.includes('first_game')) {
      badges.push('first_game');
    }
    
    // 10 games badge
    if (progress.gamesPlayed >= 10 && !badges.includes('ten_games')) {
      badges.push('ten_games');
    }
    
    // 50 games badge
    if (progress.gamesPlayed >= 50 && !badges.includes('fifty_games')) {
      badges.push('fifty_games');
    }
    
    // 100 games badge
    if (progress.gamesPlayed >= 100 && !badges.includes('century')) {
      badges.push('century');
    }
    
    // Streak badges
    if (progress.dailyStreak >= 3 && !badges.includes('streak_3')) {
      badges.push('streak_3');
    }
    if (progress.dailyStreak >= 7 && !badges.includes('streak_7')) {
      badges.push('streak_7');
    }
    if (progress.dailyStreak >= 30 && !badges.includes('streak_30')) {
      badges.push('streak_30');
    }
    
    // Level badges
    if (progress.level >= 5 && !badges.includes('level_5')) {
      badges.push('level_5');
    }
    if (progress.level >= 10 && !badges.includes('level_10')) {
      badges.push('level_10');
    }
    
    // Accuracy badges
    const avgAccuracy = this.calculateAverageAccuracy(progress);
    if (avgAccuracy >= 80 && progress.gamesPlayed >= 10 && !badges.includes('accurate')) {
      badges.push('accurate');
    }
    if (avgAccuracy >= 95 && progress.gamesPlayed >= 20 && !badges.includes('perfectionist')) {
      badges.push('perfectionist');
    }
    
    progress.badges = badges;
  }

  calculateAverageAccuracy(progress?: GameProgress): number {
    const p = progress || this.loadProgress();
    if (p.recentScores.length === 0) return 0;
    
    const total = p.recentScores.reduce((sum, score) => sum + score.accuracy, 0);
    return Math.round(total / p.recentScores.length);
  }

  getSettings(): Settings {
    const data = localStorage.getItem(this.SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return this.getDefaultSettings();
  }

  updateSettings(updates: Partial<Settings>): void {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(updated));
  }

  resetProgress(): void {
    this.saveProgress(this.getDefaultProgress());
  }

  resetSettings(): void {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.getDefaultSettings()));
  }

  private getDefaultProgress(): GameProgress {
    return {
      totalXP: 0,
      level: 1,
      gamesPlayed: 0,
      dailyStreak: 0,
      lastPlayDate: new Date().toISOString().split('T')[0],
      highScores: {},
      gameStats: {},
      badges: [],
      recentScores: []
    };
  }

  private getDefaultSettings(): Settings {
    return {
      soundEnabled: true,
      colorBlindMode: false,
      animationsEnabled: true,
      language: 'en'
    };
  }

  updateGameDifficulty(gameType: string, difficulty: number): void {
    const progress = this.loadProgress();
    if (!progress.gameStats[gameType]) {
      progress.gameStats[gameType] = {
        played: 0,
        totalAccuracy: 0,
        bestTime: 0,
        currentDifficulty: difficulty
      };
    } else {
      progress.gameStats[gameType].currentDifficulty = difficulty;
    }
    this.saveProgress(progress);
  }

  getGameDifficulty(gameType: string): number {
    const progress = this.loadProgress();
    return progress.gameStats[gameType]?.currentDifficulty || 1;
  }
}

