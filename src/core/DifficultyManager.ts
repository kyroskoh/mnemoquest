import { StorageManager } from './StorageManager';

export class DifficultyManager {
  private storageManager: StorageManager;
  private readonly MAX_DIFFICULTY = 10;
  private readonly MIN_DIFFICULTY = 1;
  private readonly SUCCESS_MULTIPLIER = 1.5;  // Increased from 0.5 to 1.5
  private readonly MISTAKE_DECAY = 0.2;        // Reduced from 0.3 to 0.2

  constructor(storageManager: StorageManager) {
    this.storageManager = storageManager;
  }

  getDifficulty(gameType: string): number {
    return this.storageManager.getGameDifficulty(gameType);
  }

  updateDifficulty(gameType: string, successRate: number, mistakes: number): void {
    const currentDifficulty = this.getDifficulty(gameType);
    
    // Adaptive algorithm from PRD:
    // difficulty = base_level + (success_rate × multiplier) - (mistakes × decay)
    let newDifficulty = currentDifficulty + 
                        (successRate * this.SUCCESS_MULTIPLIER) - 
                        (mistakes * this.MISTAKE_DECAY);

    // Clamp difficulty between min and max
    newDifficulty = Math.max(this.MIN_DIFFICULTY, Math.min(this.MAX_DIFFICULTY, newDifficulty));

    // Save new difficulty
    this.storageManager.updateGameDifficulty(gameType, newDifficulty);

    console.log(`Difficulty updated for ${gameType}: ${currentDifficulty.toFixed(2)} → ${newDifficulty.toFixed(2)}`);
  }

  // Helper methods for games to scale parameters based on difficulty
  getGridSize(difficulty: number): number {
    // Returns grid size (3x3 to 6x6)
    return Math.min(6, Math.max(3, Math.floor(2 + difficulty * 0.4)));
  }

  getSequenceLength(difficulty: number): number {
    // Returns sequence length (3 to 12)
    return Math.min(12, Math.max(3, Math.floor(2 + difficulty)));
  }

  getVisibilityDuration(difficulty: number): number {
    // Returns duration in ms (3000ms to 800ms)
    return Math.max(800, 3000 - (difficulty * 200));
  }

  getCardPairs(difficulty: number): number {
    // Returns number of card pairs (4 to 12)
    return Math.min(12, Math.max(4, Math.floor(3 + difficulty * 0.8)));
  }

  getTimeLimit(difficulty: number): number {
    // Returns time limit in seconds (60s to 30s)
    return Math.max(30, 60 - (difficulty * 3));
  }
}

