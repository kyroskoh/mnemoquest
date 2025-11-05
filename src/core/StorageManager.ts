export interface GameProgress {
  totalXP: number;
  level: number;
  gamesPlayed: number;
  dailyStreak: number;
  lastPlayDate: string;
  // Daily tracking
  dailyXP: number;
  dailyGamesPlayed: number;
  dailyPlayTime: number; // in minutes
  lastDailyReset: string;
  todayGamesPlayed: string[]; // array of game types played today
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
    if (!data) {
      return this.getDefaultProgress();
    }
    const progress = JSON.parse(data) as GameProgress;
    
    // Migrate existing progress to include new daily tracking fields
    const today = new Date().toISOString().split('T')[0];
    if (!progress.dailyXP && progress.dailyXP !== 0) {
      progress.dailyXP = 0;
      progress.dailyGamesPlayed = 0;
      progress.dailyPlayTime = 0;
      progress.lastDailyReset = today;
      progress.todayGamesPlayed = [];
    }
    
    // Check if we need to reset daily counters
    this.checkAndResetDailyCounters(progress);
    
    return progress;
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
    
    // Update daily stats
    progress.dailyXP += score;
    progress.dailyGamesPlayed++;
    if (!progress.todayGamesPlayed.includes(gameType)) {
      progress.todayGamesPlayed.push(gameType);
    }
    
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

  private checkAndResetDailyCounters(progress: GameProgress): void {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if it's a new day
    if (progress.lastDailyReset !== today) {
      // Reset daily counters
      progress.dailyXP = 0;
      progress.dailyGamesPlayed = 0;
      progress.dailyPlayTime = 0;
      progress.todayGamesPlayed = [];
      progress.lastDailyReset = today;
      
      // Save the reset progress
      this.saveProgress(progress);
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
    
    // === LIFETIME PROGRESSION ===
    
    // Games played milestones
    if (progress.gamesPlayed >= 1 && !badges.includes('first_game')) {
      badges.push('first_game');
    }
    if (progress.gamesPlayed >= 10 && !badges.includes('ten_games')) {
      badges.push('ten_games');
    }
    if (progress.gamesPlayed >= 50 && !badges.includes('fifty_games')) {
      badges.push('fifty_games');
    }
    if (progress.gamesPlayed >= 100 && !badges.includes('century')) {
      badges.push('century');
    }
    if (progress.gamesPlayed >= 500 && !badges.includes('legendary')) {
      badges.push('legendary');
    }
    
    // XP milestones
    if (progress.totalXP >= 1000 && !badges.includes('xp_1000')) {
      badges.push('xp_1000');
    }
    if (progress.totalXP >= 5000 && !badges.includes('xp_5000')) {
      badges.push('xp_5000');
    }
    if (progress.totalXP >= 10000 && !badges.includes('xp_10000')) {
      badges.push('xp_10000');
    }
    
    // Level progression
    if (progress.level >= 5 && !badges.includes('level_5')) {
      badges.push('level_5');
    }
    if (progress.level >= 10 && !badges.includes('level_10')) {
      badges.push('level_10');
    }
    if (progress.level >= 20 && !badges.includes('level_20')) {
      badges.push('level_20');
    }
    if (progress.level >= 50 && !badges.includes('level_50')) {
      badges.push('level_50');
    }
    
    // Skill mastery badges
    const uniqueGameTypes = new Set(progress.recentScores.map(s => s.gameType));
    if (uniqueGameTypes.size >= 5 && !badges.includes('versatile')) {
      badges.push('versatile');
    }
    
    const memoryGames = ['memory-grid', 'card-match', 'word-trail', 'pattern-path'];
    const memoryGameCount = Object.keys(progress.gameStats)
      .filter(type => memoryGames.includes(type))
      .reduce((sum, type) => sum + progress.gameStats[type].played, 0);
    if (memoryGameCount >= 20 && !badges.includes('memory_master')) {
      badges.push('memory_master');
    }
    
    // High scorer - Get 1000+ points in any single game
    if (progress.recentScores.some(score => score.score >= 1000) && !badges.includes('high_scorer')) {
      badges.push('high_scorer');
    }
    
    // === DAILY/HABIT BASED ===
    
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
    if (progress.dailyStreak >= 100 && !badges.includes('streak_100')) {
      badges.push('streak_100');
    }
    
    // Time-of-day badges
    if (progress.recentScores.some(score => {
      const hour = new Date(score.date).getHours();
      return hour >= 6 && hour < 10; // 6 AM - 10 AM
    }) && !badges.includes('early_bird')) {
      badges.push('early_bird');
    }
    
    if (progress.recentScores.some(score => {
      const hour = new Date(score.date).getHours();
      return hour >= 0 && hour < 4; // Midnight - 4 AM
    }) && !badges.includes('night_owl')) {
      badges.push('night_owl');
    }
    
    // Weekend warrior - Play on both Saturday and Sunday
    const weekendDays = new Set(
      progress.recentScores
        .map(score => new Date(score.date).getDay())
        .filter(day => day === 0 || day === 6) // 0 = Sunday, 6 = Saturday
    );
    if (weekendDays.size === 2 && !badges.includes('weekend_warrior')) {
      badges.push('weekend_warrior');
    }
    
    // === PERFORMANCE BASED ===
    
    // Accuracy badges
    const avgAccuracy = this.calculateAverageAccuracy(progress);
    if (avgAccuracy >= 80 && progress.gamesPlayed >= 10 && !badges.includes('accurate')) {
      badges.push('accurate');
    }
    if (avgAccuracy >= 95 && progress.gamesPlayed >= 20 && !badges.includes('perfectionist')) {
      badges.push('perfectionist');
    }
    
    // Flawless - Get 100% accuracy in any game
    if (progress.recentScores.some(score => score.accuracy === 100) && !badges.includes('flawless')) {
      badges.push('flawless');
    }
    
    // No mistakes - Complete 5 games with 100% accuracy
    const perfectGames = progress.recentScores.filter(score => score.accuracy === 100).length;
    if (perfectGames >= 5 && !badges.includes('no_mistakes')) {
      badges.push('no_mistakes');
    }
    
    // === DAILY ACHIEVEMENTS ===
    
    // Daily XP milestones
    if (progress.dailyXP >= 100 && !badges.includes('daily_100xp')) {
      badges.push('daily_100xp');
    }
    if (progress.dailyXP >= 500 && !badges.includes('daily_500xp')) {
      badges.push('daily_500xp');
    }
    if (progress.dailyXP >= 1000 && !badges.includes('daily_1000xp')) {
      badges.push('daily_1000xp');
    }
    
    // Daily games played
    if (progress.dailyGamesPlayed >= 5 && !badges.includes('daily_5games')) {
      badges.push('daily_5games');
    }
    if (progress.dailyGamesPlayed >= 10 && !badges.includes('daily_10games')) {
      badges.push('daily_10games');
    }
    if (progress.dailyGamesPlayed >= 20 && !badges.includes('daily_20games')) {
      badges.push('daily_20games');
    }
    
    // Game variety today - Play different game types
    if (progress.todayGamesPlayed.length >= 3 && !badges.includes('daily_variety')) {
      badges.push('daily_variety');
    }
    if (progress.todayGamesPlayed.length >= 5 && !badges.includes('daily_all_games')) {
      badges.push('daily_all_games');
    }
    
    // Specific game focus - Play same game multiple times today
    const gameTypeCounts: Record<string, number> = {};
    progress.recentScores
      .filter(score => new Date(score.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0])
      .forEach(score => {
        gameTypeCounts[score.gameType] = (gameTypeCounts[score.gameType] || 0) + 1;
      });
    
    const maxGamesForOneType = Math.max(...Object.values(gameTypeCounts), 0);
    if (maxGamesForOneType >= 5 && !badges.includes('daily_focused')) {
      badges.push('daily_focused');
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
    const today = new Date().toISOString().split('T')[0];
    return {
      totalXP: 0,
      level: 1,
      gamesPlayed: 0,
      dailyStreak: 0,
      lastPlayDate: today,
      dailyXP: 0,
      dailyGamesPlayed: 0,
      dailyPlayTime: 0,
      lastDailyReset: today,
      todayGamesPlayed: [],
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

  // ========== EXPORT/IMPORT FUNCTIONALITY ==========

  /**
   * Simple XOR encryption for user data obfuscation
   * Not cryptographically secure, but prevents casual tampering
   */
  private encrypt(data: string): string {
    const key = 'MnemoQuest2025SecretKey'; // Simple obfuscation key
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    // Base64 encode to make it transportable
    return btoa(encrypted);
  }

  /**
   * Decrypt XOR encrypted data
   */
  private decrypt(encryptedData: string): string {
    try {
      const key = 'MnemoQuest2025SecretKey';
      const decoded = atob(encryptedData);
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return decrypted;
    } catch (e) {
      throw new Error('Invalid encrypted data');
    }
  }

  /**
   * Export user data (encrypted for users, includes progress and settings)
   */
  exportData(encrypted: boolean = true): string {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      progress: this.loadProgress(),
      settings: this.getSettings()
    };

    const jsonData = JSON.stringify(data, null, 2);
    
    if (encrypted) {
      return this.encrypt(jsonData);
    }
    
    return jsonData;
  }

  /**
   * Import user data (supports both encrypted and unencrypted)
   */
  importData(data: string, isEncrypted: boolean = true): { success: boolean; message: string } {
    try {
      let jsonData: string;
      
      if (isEncrypted) {
        jsonData = this.decrypt(data);
      } else {
        jsonData = data;
      }

      const imported = JSON.parse(jsonData);

      // Validate data structure
      if (!imported.version || !imported.progress || !imported.settings) {
        return { success: false, message: 'Invalid data format' };
      }

      // Validate progress data
      if (typeof imported.progress.totalXP !== 'number' || 
          typeof imported.progress.level !== 'number' ||
          !Array.isArray(imported.progress.badges)) {
        return { success: false, message: 'Invalid progress data' };
      }

      // Import the data
      this.saveProgress(imported.progress);
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(imported.settings));

      return { 
        success: true, 
        message: `Successfully imported data from ${new Date(imported.timestamp).toLocaleDateString()}` 
      };
    } catch (error) {
      console.error('Import error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to import data' 
      };
    }
  }

  /**
   * Developer function: Export unencrypted data
   * Accessible via browser console: window.mnemoDevExport()
   */
  devExportData(): string {
    const data = this.exportData(false);
    console.log('=== UNENCRYPTED EXPORT ===');
    console.log(data);
    console.log('========================');
    return data;
  }

  /**
   * Developer function: Import unencrypted data
   * Accessible via browser console: window.mnemoDevImport(data)
   */
  devImportData(data: string): { success: boolean; message: string } {
    console.log('=== DEVELOPER IMPORT ===');
    const result = this.importData(data, false);
    console.log(result);
    console.log('=======================');
    return result;
  }

  /**
   * Download export as a file
   */
  downloadExport(encrypted: boolean = true): void {
    const data = this.exportData(encrypted);
    const filename = `mnemoquest-backup-${new Date().toISOString().split('T')[0]}.${encrypted ? 'mqsave' : 'json'}`;
    
    const blob = new Blob([data], { type: encrypted ? 'application/octet-stream' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

