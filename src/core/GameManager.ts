import { StorageManager } from './StorageManager';
import { UIManager } from './UIManager';
import { DifficultyManager } from './DifficultyManager';
import { TutorialManager } from './TutorialManager';
import { TranslationManager } from './TranslationManager';
import { BaseGame } from '../games/BaseGame';
import { MemoryGridGame } from '../games/MemoryGridGame';
import { SequenceSparksGame } from '../games/SequenceSparksGame';
import { CardMatchGame } from '../games/CardMatchGame';

export class GameManager {
  private storageManager: StorageManager;
  private uiManager: UIManager;
  private difficultyManager: DifficultyManager;
  private tutorialManager: TutorialManager;
  private translationManager: TranslationManager;
  private currentGame: BaseGame | null = null;
  private currentGameType: string = '';
  private startTime: number = 0;
  private timerAnimationId: number | null = null;

  constructor(storageManager: StorageManager, uiManager: UIManager, translationManager: TranslationManager) {
    this.storageManager = storageManager;
    this.uiManager = uiManager;
    this.translationManager = translationManager;
    this.difficultyManager = new DifficultyManager(storageManager);
    this.tutorialManager = new TutorialManager(storageManager, translationManager);

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
        this.currentGame = new MemoryGridGame(container, difficulty, this.onGameComplete.bind(this), this.translationManager);
        break;
      case 'sequence-sparks':
        this.currentGame = new SequenceSparksGame(container, difficulty, this.onGameComplete.bind(this), this.translationManager);
        break;
      case 'card-match':
        this.currentGame = new CardMatchGame(container, difficulty, this.onGameComplete.bind(this), this.translationManager);
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

    const t = (key: string) => this.translationManager.t(key);
    
    const titleKeys: Record<string, string> = {
      'memory-grid': 'games.memoryGrid.name',
      'sequence-sparks': 'games.sequenceSparks.name',
      'card-match': 'games.cardMatch.name'
    };

    if (titleEl) {
      const titleKey = titleKeys[gameType];
      titleEl.textContent = titleKey ? t(titleKey) : gameType;
    }
    if (levelEl) {
      levelEl.textContent = `${t('gameUI.level')} ${Math.floor(difficulty)}`;
    }
  }

  private startTimer(): void {
    // Clear any existing timer first
    this.stopTimer();
    
    const timerEl = document.getElementById('gameTimer');
    if (!timerEl) return;
    
    const updateTimer = () => {
      // Stop timer if game is no longer active
      if (!this.currentGame) {
        this.stopTimer();
        return;
      }

      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      this.timerAnimationId = requestAnimationFrame(updateTimer);
    };

    updateTimer();
  }

  private stopTimer(): void {
    if (this.timerAnimationId !== null) {
      cancelAnimationFrame(this.timerAnimationId);
      this.timerAnimationId = null;
    }
  }

  private onGameComplete(result: { score: number; accuracy: number; mistakes: number; successRate: number }): void {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - this.startTime) / 1000);

    // Stop the timer
    this.stopTimer();

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
    // Stop the timer
    this.stopTimer();
    
    if (this.currentGame) {
      this.currentGame.destroy();
      this.currentGame = null;
    }
  }
}

