import { BaseGame } from './BaseGame';

export class SequenceSparksGame extends BaseGame {
  private sequence: number[] = [];
  private playerSequence: number[] = [];
  private sequenceLength: number = 3;
  private currentStep: number = 0;
  private gameState: 'showing' | 'player-turn' | 'complete' = 'showing';
  private round: number = 0;
  private maxRounds: number = 5;
  private buttons: HTMLElement[] = [];
  private firstInteraction: boolean = false;

  start(): void {
    this.sequenceLength = Math.min(12, Math.max(3, Math.floor(2 + this.difficulty)));
    this.initializeGame();
    this.startRound();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="sequence-game">
        <div class="game-instructions">
          <h3>${this.t('gameUI.round')} <span id="roundNumber">1</span>/${this.maxRounds}</h3>
          <p id="instructionText">${this.t('games.sequenceSparks.instructions')}</p>
        </div>
        <div class="sequence-buttons" id="sequenceButtons"></div>
        <div class="sequence-progress" id="sequenceProgress"></div>
      </div>
    `;

    this.createButtons();
    this.addGameStyles();
  }

  private createButtons(): void {
    const container = document.getElementById('sequenceButtons');
    if (!container) return;

    const colors = [
      { bg: '#ef4444', shadow: '#dc2626' },
      { bg: '#3b82f6', shadow: '#2563eb' },
      { bg: '#10b981', shadow: '#059669' },
      { bg: '#f59e0b', shadow: '#d97706' }
    ];

    this.buttons = [];
    colors.forEach((color, index) => {
      const btn = document.createElement('div');
      btn.className = 'spark-button';
      btn.dataset.index = index.toString();
      btn.style.setProperty('--btn-color', color.bg);
      btn.style.setProperty('--btn-shadow', color.shadow);
      
      btn.addEventListener('click', () => this.handleButtonClick(index));
      
      container.appendChild(btn);
      this.buttons.push(btn);
    });
  }

  private startRound(): void {
    this.round++;
    this.totalAttempts++;
    this.playerSequence = [];
    this.currentStep = 0;

    const roundEl = document.getElementById('roundNumber');
    if (roundEl) roundEl.textContent = this.round.toString();

    // Generate sequence (length increases with rounds)
    const length = Math.min(this.sequenceLength, 3 + this.round);
    this.sequence = [];
    for (let i = 0; i < length; i++) {
      this.sequence.push(Math.floor(Math.random() * 4));
    }

    this.showSequence();
  }

  private async showSequence(): Promise<void> {
    this.gameState = 'showing';
    const instructionEl = document.getElementById('instructionText');
    if (instructionEl) instructionEl.textContent = this.t('games.sequenceSparks.watch');

    this.disableButtons();

    // Flash duration decreases with difficulty (600ms to 300ms)
    const flashDuration = Math.max(300, 600 - (this.difficulty * 30));
    const gapDuration = Math.max(200, 400 - (this.difficulty * 20));

    for (const buttonIndex of this.sequence) {
      await this.sleep(gapDuration);
      await this.flashButton(buttonIndex, flashDuration);
    }

    await this.sleep(500);
    this.enablePlayerTurn();
  }

  private flashButton(index: number, duration: number): Promise<void> {
    return new Promise((resolve) => {
      const btn = this.buttons[index];
      btn.classList.add('active');
      
      setTimeout(() => {
        btn.classList.remove('active');
        resolve();
      }, duration);
    });
  }

  private enablePlayerTurn(): void {
    this.gameState = 'player-turn';
    const instructionEl = document.getElementById('instructionText');
    if (instructionEl) instructionEl.textContent = this.t('games.sequenceSparks.repeat');

    this.enableButtons();
    this.updateProgress();
  }

  private handleButtonClick(index: number): void {
    if (this.gameState !== 'player-turn') return;

    // Reset GameManager timer on first interaction
    if (!this.firstInteraction) {
      this.firstInteraction = true;
      window.dispatchEvent(new CustomEvent('gameFirstInteraction'));
    }

    this.flashButton(index, 200);
    this.playerSequence.push(index);

    if (this.playerSequence[this.currentStep] === this.sequence[this.currentStep]) {
      // Correct
      this.currentStep++;
      this.updateProgress();

      if (this.currentStep === this.sequence.length) {
        // Round complete!
        this.correctAttempts++;
        setTimeout(() => {
          this.nextRound();
        }, 500);
      }
    } else {
      // Incorrect
      this.mistakes++;
      this.showError();
      setTimeout(() => {
        this.nextRound();
      }, 1500);
    }
  }

  private updateProgress(): void {
    const progressEl = document.getElementById('sequenceProgress');
    if (!progressEl) return;

    progressEl.innerHTML = '';
    for (let i = 0; i < this.sequence.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      if (i < this.currentStep) {
        dot.classList.add('complete');
      }
      progressEl.appendChild(dot);
    }
  }

  private showError(): void {
    const instructionEl = document.getElementById('instructionText');
    if (instructionEl) {
      instructionEl.textContent = this.t('games.sequenceSparks.wrong');
      instructionEl.style.color = '#ef4444';
      
      setTimeout(() => {
        instructionEl.style.color = '';
      }, 1000);
    }

    this.disableButtons();
  }

  private disableButtons(): void {
    this.buttons.forEach(btn => btn.classList.add('disabled'));
  }

  private enableButtons(): void {
    this.buttons.forEach(btn => btn.classList.remove('disabled'));
  }

  private nextRound(): void {
    if (this.round >= this.maxRounds) {
      this.endGame();
    } else {
      this.startRound();
    }
  }

  private endGame(): void {
    this.gameState = 'complete';
    this.completeGame();
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  destroy(): void {
    this.buttons.forEach(btn => {
      btn.replaceWith(btn.cloneNode(true));
    });
  }

  private addGameStyles(): void {
    if (document.getElementById('sequence-game-styles')) return;

    const style = document.createElement('style');
    style.id = 'sequence-game-styles';
    style.textContent = `
      .sequence-game {
        padding: 2rem;
        text-align: center;
      }

      .sequence-buttons {
        display: grid;
        grid-template-columns: repeat(2, 150px);
        gap: 1rem;
        justify-content: center;
        margin: 2rem auto;
      }

      .spark-button {
        width: 150px;
        height: 150px;
        background: var(--btn-color);
        border: 4px solid var(--btn-shadow);
        border-radius: var(--radius-lg);
        cursor: pointer;
        transition: all 0.15s ease;
        box-shadow: 0 4px 0 var(--btn-shadow);
      }

      .spark-button:hover:not(.disabled) {
        transform: translateY(-4px);
        box-shadow: 0 8px 0 var(--btn-shadow);
      }

      .spark-button:active:not(.disabled) {
        transform: translateY(2px);
        box-shadow: 0 2px 0 var(--btn-shadow);
      }

      .spark-button.active {
        filter: brightness(1.5);
        transform: scale(1.1);
        box-shadow: 0 0 30px var(--btn-color);
      }

      .spark-button.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .sequence-progress {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin-top: 2rem;
      }

      .progress-dot {
        width: 16px;
        height: 16px;
        background: var(--border);
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .progress-dot.complete {
        background: var(--primary);
        transform: scale(1.2);
      }

      @media (max-width: 768px) {
        .sequence-buttons {
          grid-template-columns: repeat(2, 120px);
          gap: 0.75rem;
        }

        .spark-button {
          width: 120px;
          height: 120px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

