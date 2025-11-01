import { BaseGame } from './BaseGame';

export class NumberRecallGame extends BaseGame {
  private sequence: number[] = [];
  private playerInput: string = '';
  private digitCount: number = 3;
  private displaySpeed: number = 1500; // ms per digit
  private isReverseMode: boolean = false;

  start(): void {
    // Calculate difficulty
    this.digitCount = Math.min(12, Math.max(3, Math.floor(3 + this.difficulty * 0.9)));
    this.displaySpeed = Math.max(600, 1500 - (this.difficulty * 90));
    this.isReverseMode = this.difficulty >= 7;
    
    this.initializeGame();
    this.generateSequence();
    this.showSequence();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="number-recall-game">
        <div class="game-instructions">
          <h3>${this.t('games.numberRecall.name')}</h3>
          <p id="instructionText">${this.t('games.numberRecall.instructions')}</p>
          ${this.isReverseMode ? `<p class="mode-indicator">${this.t('games.numberRecall.reverseMode')}</p>` : ''}
        </div>
        <div class="number-display" id="numberDisplay">
          <div class="number-digit" id="currentDigit"></div>
        </div>
        <div class="input-section" id="inputSection" style="display: none;">
          <input 
            type="tel" 
            id="numberInput" 
            class="number-input" 
            placeholder="${this.t('games.numberRecall.enterNumbers')}"
            maxlength="${this.digitCount}"
            autocomplete="off"
          />
          <button class="submit-btn" id="submitBtn">${this.t('games.numberRecall.submit')}</button>
        </div>
        <div class="progress-indicator" id="progressIndicator"></div>
      </div>
    `;

    this.addGameStyles();
  }

  private generateSequence(): void {
    this.sequence = [];
    for (let i = 0; i < this.digitCount; i++) {
      this.sequence.push(Math.floor(Math.random() * 10));
    }
  }

  private async showSequence(): Promise<void> {
    const digitEl = document.getElementById('currentDigit');
    const progressEl = document.getElementById('progressIndicator');
    
    if (!digitEl || !progressEl) return;

    for (let i = 0; i < this.sequence.length; i++) {
      
      // Show digit
      digitEl.textContent = this.sequence[i].toString();
      digitEl.className = 'number-digit show';
      
      // Update progress
      progressEl.innerHTML = `
        <div class="progress-dots">
          ${this.sequence.map((_, idx) => 
            `<div class="dot ${idx <= i ? 'active' : ''}"></div>`
          ).join('')}
        </div>
      `;

      await this.wait(this.displaySpeed);
      
      // Hide digit
      digitEl.className = 'number-digit';
      await this.wait(300);
    }

    this.enableInput();
  }

  private enableInput(): void {
    const instructionEl = document.getElementById('instructionText');
    const displayEl = document.getElementById('numberDisplay');
    const inputSection = document.getElementById('inputSection');
    const inputEl = document.getElementById('numberInput') as HTMLInputElement;
    const submitBtn = document.getElementById('submitBtn');

    if (instructionEl) {
      instructionEl.textContent = this.isReverseMode 
        ? this.t('games.numberRecall.typeReverse')
        : this.t('games.numberRecall.typeForward');
    }
    
    if (displayEl) displayEl.style.display = 'none';
    if (inputSection) inputSection.style.display = 'flex';
    if (inputEl) {
      inputEl.focus();
      inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.submitAnswer();
        }
      });
    }
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.submitAnswer());
    }
  }

  private submitAnswer(): void {
    const inputEl = document.getElementById('numberInput') as HTMLInputElement;
    if (!inputEl) return;

    this.playerInput = inputEl.value.trim();
    
    if (this.playerInput.length === 0) {
      this.showError(this.t('games.numberRecall.enterSomething'));
      return;
    }

    this.totalAttempts++;
    this.checkAnswer();
  }

  private checkAnswer(): void {
    const correctSequence = this.isReverseMode 
      ? [...this.sequence].reverse().join('')
      : this.sequence.join('');
    
    const playerSequence = this.playerInput;

    // Calculate partial credit for partially correct answers
    let correctDigits = 0;
    const minLength = Math.min(correctSequence.length, playerSequence.length);
    
    for (let i = 0; i < minLength; i++) {
      if (correctSequence[i] === playerSequence[i]) {
        correctDigits++;
      }
    }

    const accuracy = correctDigits / correctSequence.length;
    
    if (accuracy === 1) {
      this.correctAttempts++;
      this.showFeedback(true, correctSequence);
    } else if (accuracy >= 0.5) {
      // Partial credit
      this.correctAttempts += accuracy;
      this.mistakes += (1 - accuracy);
      this.showFeedback(false, correctSequence, accuracy);
    } else {
      this.mistakes++;
      this.showFeedback(false, correctSequence);
    }

    setTimeout(() => {
      this.endGame();
    }, 2500);
  }

  private showFeedback(isCorrect: boolean, correctAnswer: string, partialScore?: number): void {
    const inputSection = document.getElementById('inputSection');
    const displayEl = document.getElementById('numberDisplay');
    const digitEl = document.getElementById('currentDigit');

    if (!inputSection || !displayEl || !digitEl) return;

    inputSection.style.display = 'none';
    displayEl.style.display = 'flex';

    if (isCorrect) {
      digitEl.className = 'number-digit show correct-full';
      digitEl.innerHTML = `
        <div class="feedback-icon">✓</div>
        <div class="feedback-text">${this.t('games.numberRecall.perfect')}</div>
        <div class="correct-answer">${correctAnswer}</div>
      `;
    } else if (partialScore !== undefined && partialScore > 0) {
      digitEl.className = 'number-digit show partial';
      const percentage = Math.round(partialScore * 100);
      digitEl.innerHTML = `
        <div class="feedback-icon">~</div>
        <div class="feedback-text">${percentage}% ${this.t('games.numberRecall.correct')}</div>
        <div class="correct-answer">${this.t('games.numberRecall.correctWas')}: ${correctAnswer}</div>
      `;
    } else {
      digitEl.className = 'number-digit show incorrect';
      digitEl.innerHTML = `
        <div class="feedback-icon">✗</div>
        <div class="feedback-text">${this.t('games.numberRecall.incorrect')}</div>
        <div class="correct-answer">${this.t('games.numberRecall.correctWas')}: ${correctAnswer}</div>
      `;
    }
  }

  private showError(message: string): void {
    const inputEl = document.getElementById('numberInput') as HTMLInputElement;
    if (!inputEl) return;

    inputEl.classList.add('error-shake');
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    inputEl.parentElement?.appendChild(errorEl);

    setTimeout(() => {
      inputEl.classList.remove('error-shake');
      errorEl.remove();
    }, 2000);
  }

  private endGame(): void {
    this.gameState = 'complete';
    this.completeGame();
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  destroy(): void {
    const submitBtn = document.getElementById('submitBtn');
    const inputEl = document.getElementById('numberInput');
    
    if (submitBtn) submitBtn.replaceWith(submitBtn.cloneNode(true));
    if (inputEl) inputEl.replaceWith(inputEl.cloneNode(true));
  }

  private addGameStyles(): void {
    if (document.getElementById('number-recall-styles')) return;

    const style = document.createElement('style');
    style.id = 'number-recall-styles';
    style.textContent = `
      .number-recall-game {
        padding: 2rem;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .game-instructions h3 {
        font-size: 1.5rem;
        color: var(--primary);
        margin-bottom: 0.5rem;
      }

      .game-instructions p {
        font-size: 1.125rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      .mode-indicator {
        display: inline-block;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }

      .number-display {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;
      }

      .number-digit {
        font-size: 6rem;
        font-weight: 700;
        color: var(--primary);
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.3s ease;
      }

      .number-digit.show {
        opacity: 1;
        transform: scale(1);
      }

      .number-digit.correct-full {
        color: #10b981;
      }

      .number-digit.incorrect {
        color: #ef4444;
      }

      .number-digit.partial {
        color: #f59e0b;
      }

      .feedback-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      .feedback-text {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .correct-answer {
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 0.5rem;
        margin-top: 1rem;
        color: var(--text-primary);
      }

      .input-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        margin: 2rem 0;
      }

      .number-input {
        width: 100%;
        max-width: 400px;
        padding: 1.5rem;
        font-size: 2rem;
        text-align: center;
        border: 3px solid var(--border);
        border-radius: var(--radius-md);
        font-weight: 700;
        letter-spacing: 0.5rem;
        transition: all 0.3s ease;
      }

      .number-input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
      }

      .number-input.error-shake {
        animation: shake 0.5s ease;
        border-color: #ef4444;
      }

      .submit-btn {
        padding: 1rem 3rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
      }

      .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
      }

      .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        font-weight: 500;
        margin-top: 0.5rem;
      }

      .progress-indicator {
        margin-top: 2rem;
      }

      .progress-dots {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--border);
        transition: all 0.3s ease;
      }

      .dot.active {
        background: var(--primary);
        transform: scale(1.2);
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }

      @media (max-width: 768px) {
        .number-recall-game {
          padding: 1rem;
        }

        .number-digit {
          font-size: 4rem;
        }

        .feedback-icon {
          font-size: 3rem;
        }

        .feedback-text {
          font-size: 1.25rem;
        }

        .correct-answer {
          font-size: 1.5rem;
          letter-spacing: 0.3rem;
        }

        .number-input {
          font-size: 1.5rem;
          padding: 1rem;
          letter-spacing: 0.3rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

