export interface GameResult {
  score: number;
  accuracy: number;
  mistakes: number;
  successRate: number;
}

export abstract class BaseGame {
  protected container: HTMLElement;
  protected difficulty: number;
  protected onComplete: (result: GameResult) => void;
  protected totalAttempts: number = 0;
  protected correctAttempts: number = 0;
  protected mistakes: number = 0;

  constructor(container: HTMLElement, difficulty: number, onComplete: (result: GameResult) => void) {
    this.container = container;
    this.difficulty = difficulty;
    this.onComplete = onComplete;
  }

  abstract start(): void;
  abstract destroy(): void;

  protected calculateResult(): GameResult {
    const accuracy = this.totalAttempts > 0 
      ? Math.round((this.correctAttempts / this.totalAttempts) * 100)
      : 0;
    
    const successRate = this.totalAttempts > 0
      ? this.correctAttempts / this.totalAttempts
      : 0;

    // Score based on accuracy and difficulty
    const baseScore = this.correctAttempts * 10;
    const difficultyBonus = Math.floor(this.difficulty * 5);
    const score = baseScore + difficultyBonus;

    return {
      score,
      accuracy,
      mistakes: this.mistakes,
      successRate
    };
  }

  protected completeGame(): void {
    const result = this.calculateResult();
    this.onComplete(result);
  }
}

