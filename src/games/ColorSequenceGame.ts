import { BaseGame } from './BaseGame';

interface ColorCell {
  id: number;
  color: string;
  colorName: string;
}

export class ColorSequenceGame extends BaseGame {
  private cells: ColorCell[] = [];
  private sequence: number[] = [];
  private userSequence: number[] = [];
  private isShowingSequence: boolean = false;
  private canInput: boolean = false;
  private currentLevel: number = 1;
  private sequenceDelay: number = 800; // ms between colors
  private flashDuration: number = 600; // ms for each color flash
  private colors: Array<{name: string; value: string}> = [];
  private gridSize: number = 4;

  start(): void {
    this.initializeColors();
    this.calculateDifficulty();
    this.initializeGame();
    this.generateCells();
    this.renderCells();
    this.startLevel();
  }

  private initializeColors(): void {
    this.colors = [
      { name: 'red', value: '#ef4444' },
      { name: 'blue', value: '#3b82f6' },
      { name: 'green', value: '#10b981' },
      { name: 'yellow', value: '#f59e0b' },
      { name: 'purple', value: '#8b5cf6' },
      { name: 'pink', value: '#ec4899' },
      { name: 'orange', value: '#f97316' },
      { name: 'cyan', value: '#06b6d4' }
    ];
  }

  private calculateDifficulty(): void {
    // Difficulty 1-3: 3 colors, 3-4 sequence length
    // Difficulty 4-7: 5 colors, 5-7 sequence length
    // Difficulty 8+: 7+ colors, 8-12 sequence length
    
    if (this.difficulty <= 3) {
      this.gridSize = 3;
      this.sequenceDelay = 900;
      this.flashDuration = 700;
    } else if (this.difficulty <= 7) {
      this.gridSize = 5;
      this.sequenceDelay = 700;
      this.flashDuration = 500;
    } else {
      this.gridSize = Math.min(8, 5 + Math.floor((this.difficulty - 8) * 0.3));
      this.sequenceDelay = 600;
      this.flashDuration = 400;
    }
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="color-sequence-game">
        <div class="game-header">
          <h3>${this.t('games.colorSequence.name')}</h3>
        </div>

        <div class="instructions-box">
          <p>${this.t('games.colorSequence.instructions')}</p>
        </div>

        <div class="level-display">
          <span>${this.t('games.colorSequence.level')}: <span id="levelNumber">1</span></span>
          <span>${this.t('games.colorSequence.sequence')}: <span id="sequenceLength">3</span></span>
        </div>

        <div class="color-grid" id="colorGrid"></div>

        <div class="message-display" id="messageDisplay">
          ${this.t('games.colorSequence.watch')}
        </div>

        <div class="stats-display">
          <div class="stat">
            <span class="stat-label">${this.t('gameUI.score')}:</span>
            <span class="stat-value" id="scoreValue">0</span>
          </div>
          <div class="stat">
            <span class="stat-label">${this.t('gameUI.mistakes')}:</span>
            <span class="stat-value" id="mistakesValue">0</span>
          </div>
        </div>
      </div>
    `;

    this.addGameStyles();
  }

  private generateCells(): void {
    this.cells = [];
    const colorsToUse = this.colors.slice(0, this.gridSize);
    
    colorsToUse.forEach((color, index) => {
      this.cells.push({
        id: index,
        color: color.value,
        colorName: color.name
      });
    });
  }

  private renderCells(): void {
    const grid = document.getElementById('colorGrid');
    if (!grid) return;

    grid.innerHTML = '';
    
    // Adjust columns based on grid size
    let columns = Math.min(4, this.gridSize);
    if (this.gridSize <= 4) columns = 4;
    else if (this.gridSize <= 6) columns = 3;
    else columns = 4;
    
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    this.cells.forEach(cell => {
      const cellEl = document.createElement('div');
      cellEl.className = 'color-cell';
      cellEl.style.background = cell.color;
      cellEl.dataset.id = cell.id.toString();
      
      cellEl.addEventListener('click', () => this.handleCellClick(cell.id));
      grid.appendChild(cellEl);
    });
  }

  private startLevel(): void {
    if (this.currentLevel === 1) {
      window.dispatchEvent(new CustomEvent('gameFirstInteraction'));
    }

    const sequenceLength = Math.min(3 + this.currentLevel - 1, 12);
    this.sequence = [];
    
    for (let i = 0; i < sequenceLength; i++) {
      this.sequence.push(Math.floor(Math.random() * this.gridSize));
    }

    this.userSequence = [];
    this.totalAttempts++;
    this.updateDisplay();
    this.showSequence();
  }

  private async showSequence(): Promise<void> {
    this.isShowingSequence = true;
    this.canInput = false;
    this.setMessage(this.t('games.colorSequence.watch'));

    await this.delay(1000);

    for (const cellId of this.sequence) {
      await this.highlightCell(cellId);
      await this.delay(this.sequenceDelay);
    }

    this.isShowingSequence = false;
    this.canInput = true;
    this.setMessage(this.t('games.colorSequence.yourTurn'));
  }

  private async highlightCell(cellId: number): Promise<void> {
    const cellEl = document.querySelector(`[data-id="${cellId}"]`) as HTMLElement;
    if (!cellEl) return;

    cellEl.classList.add('highlighted');
    await this.delay(this.flashDuration);
    cellEl.classList.remove('highlighted');
  }

  private handleCellClick(cellId: number): void {
    if (!this.canInput || this.isShowingSequence) return;

    this.userSequence.push(cellId);
    this.flashCell(cellId);

    // Check if correct so far
    const currentIndex = this.userSequence.length - 1;
    if (this.userSequence[currentIndex] !== this.sequence[currentIndex]) {
      // Wrong!
      this.mistakes++;
      this.handleWrongSequence();
      return;
    }

    // Check if sequence complete
    if (this.userSequence.length === this.sequence.length) {
      // Correct!
      this.correctAttempts++;
      this.handleCorrectSequence();
    }
  }

  private flashCell(cellId: number): void {
    const cellEl = document.querySelector(`[data-id="${cellId}"]`) as HTMLElement;
    if (!cellEl) return;

    cellEl.classList.add('clicked');
    setTimeout(() => {
      cellEl.classList.remove('clicked');
    }, 200);
  }

  private handleCorrectSequence(): void {
    this.canInput = false;
    this.setMessage('✓ ' + this.t('games.colorSequence.correct'));
    
    setTimeout(() => {
      if (this.currentLevel >= 10) {
        // Won the game!
        this.endGame();
      } else {
        this.currentLevel++;
        this.startLevel();
      }
    }, 1500);
  }

  private handleWrongSequence(): void {
    this.canInput = false;
    this.setMessage('✗ ' + this.t('games.colorSequence.wrong'));
    
    // Show correct sequence
    setTimeout(async () => {
      this.setMessage(this.t('games.colorSequence.correctWas'));
      await this.delay(500);
      
      for (const cellId of this.sequence) {
        await this.highlightCell(cellId);
        await this.delay(400);
      }
      
      await this.delay(1000);
      
      // Try again or end based on difficulty
      if (this.mistakes >= 3) {
        this.endGame();
      } else {
        // Retry same level
        this.startLevel();
      }
    }, 1500);
  }

  private setMessage(message: string): void {
    const messageDisplay = document.getElementById('messageDisplay');
    if (messageDisplay) {
      messageDisplay.textContent = message;
    }
  }

  private updateDisplay(): void {
    const levelNumber = document.getElementById('levelNumber');
    const sequenceLength = document.getElementById('sequenceLength');
    const scoreValue = document.getElementById('scoreValue');
    const mistakesValue = document.getElementById('mistakesValue');

    if (levelNumber) levelNumber.textContent = this.currentLevel.toString();
    if (sequenceLength) sequenceLength.textContent = this.sequence.length.toString();
    if (scoreValue) scoreValue.textContent = this.correctAttempts.toString();
    if (mistakesValue) mistakesValue.textContent = this.mistakes.toString();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private endGame(): void {
    this.completeGame();
  }

  destroy(): void {
    // Cleanup if needed
  }

  private addGameStyles(): void {
    if (document.getElementById('color-sequence-styles')) return;

    const style = document.createElement('style');
    style.id = 'color-sequence-styles';
    style.textContent = `
      .color-sequence-game {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem;
      }

      .game-header {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .game-header h3 {
        font-size: 2rem;
        color: var(--text-primary);
      }

      .instructions-box {
        background: var(--bg-card);
        padding: 1rem;
        border-radius: var(--radius-md);
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .instructions-box p {
        color: var(--text-secondary);
        margin: 0;
      }

      .level-display {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary);
      }

      .color-grid {
        display: grid;
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto 2rem;
        padding: 1.5rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px var(--shadow);
      }

      .color-cell {
        aspect-ratio: 1;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        border: 3px solid transparent;
        min-height: 80px;
        position: relative;
      }

      .color-cell:hover:not(.highlighted) {
        transform: scale(1.05);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }

      .color-cell.highlighted {
        transform: scale(1.2);
        box-shadow: 0 0 50px rgba(255, 255, 255, 1),
                    0 0 80px rgba(255, 255, 255, 0.8),
                    inset 0 0 30px rgba(255, 255, 255, 0.5);
        border: 5px solid white;
        filter: brightness(1.8) saturate(1.5);
        animation: pulse-glow 0.4s ease-in-out;
        z-index: 10;
        position: relative;
      }

      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 50px rgba(255, 255, 255, 1),
                      0 0 80px rgba(255, 255, 255, 0.8),
                      inset 0 0 30px rgba(255, 255, 255, 0.5);
        }
        50% {
          box-shadow: 0 0 70px rgba(255, 255, 255, 1),
                      0 0 120px rgba(255, 255, 255, 1),
                      inset 0 0 50px rgba(255, 255, 255, 0.8);
          transform: scale(1.25);
        }
      }

      .color-cell.clicked {
        transform: scale(0.95);
        filter: brightness(1.5);
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.8),
                    inset 0 0 20px rgba(255, 255, 255, 0.4);
      }

      .message-display {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary);
        min-height: 40px;
        margin-bottom: 2rem;
      }

      .stats-display {
        display: flex;
        justify-content: center;
        gap: 3rem;
      }

      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
      }

      @media (max-width: 768px) {
        .color-sequence-game {
          padding: 1rem;
        }

        .color-grid {
          gap: 0.75rem;
          padding: 1rem;
        }

        .color-cell {
          min-height: 60px;
        }

        .color-cell.highlighted {
          transform: scale(1.15);
          border: 4px solid white;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 1),
                        0 0 60px rgba(255, 255, 255, 0.9),
                        inset 0 0 25px rgba(255, 255, 255, 0.6);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 1),
                        0 0 100px rgba(255, 255, 255, 1),
                        inset 0 0 40px rgba(255, 255, 255, 0.9);
            transform: scale(1.2);
          }
        }

        .level-display {
          gap: 2rem;
          font-size: 1rem;
        }

        .message-display {
          font-size: 1.2rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

