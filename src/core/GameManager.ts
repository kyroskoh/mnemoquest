import { StorageManager } from './StorageManager';
import { UIManager } from './UIManager';
import { DifficultyManager } from './DifficultyManager';
import { TutorialManager } from './TutorialManager';
import { BaseGame } from '../games/BaseGame';
import { MemoryGridGame } from '../games/MemoryGridGame';
import { SequenceSparksGame } from '../games/SequenceSparksGame';
import { CardMatchGame } from '../games/CardMatchGame';

export class GameManager {
  private storageManager: StorageManager;
  private uiManager: UIManager;
  private difficultyManager: DifficultyManager;
  private tutorialManager: TutorialManager;
  private currentGame: BaseGame | null = null;
  private currentGameType: string = '';
  private startTime: number = 0;

  constructor(storageManager: StorageManager, uiManager: UIManager) {
    this.storageManager = storageManager;
    this.uiManager = uiManager;
    this.difficultyManager = new DifficultyManager(storageManager);
    this.tutorialManager = new TutorialManager(storageManager);

    // Listen for play again events
    window.addEventListener('playAgain', ((event: CustomEvent) => {
      this.startGame(event.detail.gameType);
    }) as EventListener);
  }

  async startGame(gameType: string): Promise<void> {
    // Show tutorial if first time
    await this.tutorialManager.showGameTutorial(gameType);
    this.currentGameType = gameType;
    this.startTime = Date.now();

    // Get current difficulty for this game
    const difficulty = this.difficultyManager.getDifficulty(gameType);

    // Clean up previous game
    if (this.currentGame) {
      this.currentGame.destroy();
    }

    // Create new game instance
    const container = document.getElementById('gameContainer');
    if (!container) return;

    container.innerHTML = '';

    // Update game header
    this.updateGameHeader(gameType, difficulty);

    // Create appropriate game
    switch (gameType) {
      case 'memory-grid':
        this.currentGame = new MemoryGridGame(container, difficulty, this.onGameComplete.bind(this));
        break;
      case 'sequence-sparks':
        this.currentGame = new SequenceSparksGame(container, difficulty, this.onGameComplete.bind(this));
        break;
      case 'card-match':
        this.currentGame = new CardMatchGame(container, difficulty, this.onGameComplete.bind(this));
        break;
      default:
        console.error('Unknown game type:', gameType);
        return;
    }

    // Start the game
    this.currentGame.start();

    // Start timer
    this.startTimer();
  }

  private updateGameHeader(gameType: string, difficulty: number): void {
    const titleEl = document.getElementById('currentGameTitle');
    const levelEl = document.getElementById('currentLevel');

    const titles: Record<string, string> = {
      'memory-grid': 'Memory Grid',
      'sequence-sparks': 'Sequence Sparks',
      'card-match': 'Card Match'
    };

    if (titleEl) titleEl.textContent = titles[gameType] || gameType;
    if (levelEl) levelEl.textContent = `Level ${Math.floor(difficulty)}`;
  }

  private startTimer(): void {
    const timerEl = document.getElementById('gameTimer');
    if (!timerEl) return;

    const updateTimer = () => {
      if (!this.currentGame) return;

      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      requestAnimationFrame(updateTimer);
    };

    updateTimer();
  }

  private onGameComplete(result: { score: number; accuracy: number; mistakes: number; successRate: number }): void {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - this.startTime) / 1000);

    // Update difficulty based on performance
    this.difficultyManager.updateDifficulty(
      this.currentGameType,
      result.successRate,
      result.mistakes
    );

    // Save game result
    this.storageManager.addGameResult(
      this.currentGameType,
      result.score,
      result.accuracy
    );

    // Show result screen
    this.uiManager.showResultScreen(
      this.currentGameType,
      result.score,
      result.accuracy,
      timeTaken
    );
  }

  exitGame(): void {
    if (this.currentGame) {
      this.currentGame.destroy();
      this.currentGame = null;
    }
  }
}

