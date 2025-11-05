import { BaseGame } from './BaseGame';

interface NBackTrial {
  letter: string;
  isMatch: boolean;
  userResponse: boolean | null;
  reactionTime: number | null;
}

export class NBackGame extends BaseGame {
  private sequence: string[] = [];
  private trials: NBackTrial[] = [];
  private currentIndex: number = 0;
  private nLevel: number = 1; // 1-back, 2-back, or 3-back
  private totalTrials: number = 20;
  private trialDuration: number = 2500; // ms per letter
  private isWaitingForResponse: boolean = false;
  private trialStartTime: number = 0;
  private letterPool: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T'];
  private gameInterval: number | null = null;

  start(): void {
    // Calculate n-back level and parameters based on difficulty
    // Difficulty 1-3: 1-back
    // Difficulty 4-7: 2-back
    // Difficulty 8+: 3-back
    if (this.difficulty <= 3) {
      this.nLevel = 1;
      this.trialDuration = 3000;
      this.totalTrials = 20;
    } else if (this.difficulty <= 7) {
      this.nLevel = 2;
      this.trialDuration = 2500;
      this.totalTrials = 25;
    } else {
      this.nLevel = 3;
      this.trialDuration = 2000;
      this.totalTrials = 30;
    }

    this.initializeGame();
    this.generateSequence();
    this.renderInstructions();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="nback-game">
        <div class="game-header">
          <h3>${this.t('games.nBack.name')}</h3>
          <div class="nback-level">${this.nLevel}-${this.t('games.nBack.back')}</div>
        </div>
        
        <div class="instructions-screen" id="instructionsScreen">
          <div class="instructions-content">
            <h4>${this.t('games.nBack.howToPlay')}</h4>
            <p>${this.t('games.nBack.instruction1').replace('{n}', this.nLevel.toString())}</p>
            <p>${this.t('games.nBack.instruction2')}</p>
            <div class="nback-example">
              <p><strong>${this.t('games.nBack.example')}:</strong></p>
              <p>${this.t('games.nBack.exampleText')}</p>
            </div>
            <button class="primary-btn" id="startNBackBtn">${this.t('gameUI.ready')}</button>
          </div>
        </div>

        <div class="game-screen" id="gameScreen" style="display: none;">
          <div class="trial-info">
            <span>${this.t('games.nBack.trial')}: <span id="trialNumber">0</span>/${this.totalTrials}</span>
          </div>
          
          <div class="letter-display" id="letterDisplay"></div>
          
          <div class="response-prompt">
            <p>${this.t('games.nBack.pressSpace')}</p>
            <div class="keyboard-hint">SPACE</div>
          </div>

          <div class="stats-display">
            <div class="stat">
              <span class="stat-label">${this.t('gameUI.accuracy')}:</span>
              <span class="stat-value" id="accuracy">-</span>
            </div>
            <div class="stat">
              <span class="stat-label">${this.t('games.nBack.hits')}:</span>
              <span class="stat-value" id="hits">0</span>
            </div>
            <div class="stat">
              <span class="stat-label">${this.t('games.nBack.misses')}:</span>
              <span class="stat-value" id="misses">0</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addGameStyles();
  }

  private renderInstructions(): void {
    const startBtn = document.getElementById('startNBackBtn');
    startBtn?.addEventListener('click', () => {
      this.startGame();
    });
  }

  private startGame(): void {
    const instructionsScreen = document.getElementById('instructionsScreen');
    const gameScreen = document.getElementById('gameScreen');
    
    if (instructionsScreen) instructionsScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'block';

    // Add keyboard listener
    document.addEventListener('keydown', this.handleKeyPress);

    // Dispatch first interaction event
    window.dispatchEvent(new CustomEvent('gameFirstInteraction'));

    // Start showing trials
    setTimeout(() => {
      this.showNextTrial();
    }, 1000);
  }

  private generateSequence(): void {
    // Generate sequence with approximately 30% matches
    this.sequence = [];
    const targetMatchRate = 0.3;
    
    for (let i = 0; i < this.totalTrials; i++) {
      if (i < this.nLevel) {
        // First n letters must be random (no match possible)
        this.sequence.push(this.getRandomLetter());
      } else {
        // Decide if this should be a match
        const shouldMatch = Math.random() < targetMatchRate;
        
        if (shouldMatch) {
          // Match: use letter from n positions back
          this.sequence.push(this.sequence[i - this.nLevel]);
        } else {
          // No match: use different letter
          let newLetter: string;
          do {
            newLetter = this.getRandomLetter();
          } while (newLetter === this.sequence[i - this.nLevel]);
          this.sequence.push(newLetter);
        }
      }
    }

    // Create trials array
    this.trials = this.sequence.map((letter, index) => ({
      letter,
      isMatch: index >= this.nLevel && letter === this.sequence[index - this.nLevel],
      userResponse: null,
      reactionTime: null
    }));
  }

  private getRandomLetter(): string {
    return this.letterPool[Math.floor(Math.random() * this.letterPool.length)];
  }

  private showNextTrial(): void {
    if (this.currentIndex >= this.totalTrials) {
      this.endGame();
      return;
    }

    const trial = this.trials[this.currentIndex];
    const letterDisplay = document.getElementById('letterDisplay');
    const trialNumber = document.getElementById('trialNumber');

    if (letterDisplay) letterDisplay.textContent = trial.letter;
    if (trialNumber) trialNumber.textContent = (this.currentIndex + 1).toString();

    this.isWaitingForResponse = true;
    this.trialStartTime = Date.now();
    this.totalAttempts++;

    // Auto-advance after trialDuration
    this.gameInterval = window.setTimeout(() => {
      if (this.trials[this.currentIndex].userResponse === null) {
        // No response = miss if it was a match, correct rejection if not
        this.trials[this.currentIndex].userResponse = false;
        if (this.trials[this.currentIndex].isMatch) {
          this.mistakes++;
        } else {
          this.correctAttempts++;
        }
      }
      
      this.isWaitingForResponse = false;
      this.currentIndex++;
      this.updateStats();
      
      // Short delay before next letter
      setTimeout(() => {
        if (letterDisplay) letterDisplay.textContent = '';
        setTimeout(() => {
          this.showNextTrial();
        }, 300);
      }, 200);
    }, this.trialDuration);
  }

  private handleKeyPress = (event: KeyboardEvent): void => {
    if (event.code === 'Space' && this.isWaitingForResponse) {
      event.preventDefault();
      
      const currentTrial = this.trials[this.currentIndex];
      if (currentTrial.userResponse !== null) return; // Already responded

      const reactionTime = Date.now() - this.trialStartTime;
      currentTrial.userResponse = true;
      currentTrial.reactionTime = reactionTime;

      // Check if correct
      if (currentTrial.isMatch) {
        // Hit: correctly identified match
        this.correctAttempts++;
      } else {
        // False alarm: said match when it wasn't
        this.mistakes++;
      }

      // Visual feedback
      this.showFeedback(currentTrial.isMatch);
    }
  };

  private showFeedback(wasMatch: boolean): void {
    const letterDisplay = document.getElementById('letterDisplay');
    if (!letterDisplay) return;

    const userSaidMatch = true; // They pressed space
    const correct = wasMatch === userSaidMatch;

    letterDisplay.style.color = correct ? '#10b981' : '#ef4444';
    
    setTimeout(() => {
      letterDisplay.style.color = '';
    }, 300);
  }

  private updateStats(): void {
    const hits = this.trials.filter(t => t.isMatch && t.userResponse === true).length;
    const misses = this.trials.filter(t => t.isMatch && t.userResponse !== true && t.userResponse !== null).length;
    const correctRejections = this.trials.filter(t => !t.isMatch && t.userResponse === false).length;

    const completed = this.trials.filter(t => t.userResponse !== null).length;
    const accuracy = completed > 0 ? ((hits + correctRejections) / completed * 100).toFixed(0) : '-';

    const hitsEl = document.getElementById('hits');
    const missesEl = document.getElementById('misses');
    const accuracyEl = document.getElementById('accuracy');

    if (hitsEl) hitsEl.textContent = hits.toString();
    if (missesEl) missesEl.textContent = misses.toString();
    if (accuracyEl) accuracyEl.textContent = accuracy + '%';
  }

  private endGame(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
    
    if (this.gameInterval) {
      clearTimeout(this.gameInterval);
    }

    // Calculate final statistics
    const hits = this.trials.filter(t => t.isMatch && t.userResponse === true).length;
    const misses = this.trials.filter(t => t.isMatch && (t.userResponse === false || t.userResponse === null)).length;
    const correctRejections = this.trials.filter(t => !t.isMatch && (t.userResponse === false || t.userResponse === null)).length;
    const falseAlarms = this.trials.filter(t => !t.isMatch && t.userResponse === true).length;

    // Set final stats for BaseGame
    this.correctAttempts = hits + correctRejections;
    this.mistakes = misses + falseAlarms;

    this.completeGame();
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
    
    if (this.gameInterval) {
      clearTimeout(this.gameInterval);
    }
  }

  private addGameStyles(): void {
    if (document.getElementById('nback-game-styles')) return;

    const style = document.createElement('style');
    style.id = 'nback-game-styles';
    style.textContent = `
      .nback-game {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }

      .game-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .game-header h3 {
        font-size: 2rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .nback-level {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        color: white;
        border-radius: var(--radius-lg);
        font-size: 1.5rem;
        font-weight: 700;
      }

      .instructions-screen {
        background: var(--bg-card);
        padding: 2rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px var(--shadow);
      }

      .instructions-content h4 {
        color: var(--primary);
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      .instructions-content p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .nback-example {
        background: var(--bg-secondary);
        padding: 1rem;
        border-radius: var(--radius-md);
        margin: 1.5rem 0;
        border-left: 4px solid var(--primary);
      }

      .game-screen {
        background: var(--bg-card);
        padding: 2rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px var(--shadow);
        text-align: center;
      }

      .trial-info {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .letter-display {
        font-size: 8rem;
        font-weight: 800;
        color: var(--primary);
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;
        font-family: 'Arial Black', sans-serif;
        transition: color 0.3s ease;
      }

      .response-prompt {
        margin: 2rem 0;
      }

      .response-prompt p {
        color: var(--text-secondary);
        margin-bottom: 1rem;
      }

      .keyboard-hint {
        display: inline-block;
        padding: 1rem 2rem;
        background: var(--bg-secondary);
        border: 2px solid var(--border);
        border-radius: var(--radius-md);
        font-weight: 600;
        color: var(--text-primary);
        font-family: monospace;
        font-size: 1.2rem;
      }

      .stats-display {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 2px solid var(--border);
      }

      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 0.25rem;
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
      }

      @media (max-width: 768px) {
        .nback-game {
          padding: 1rem;
        }

        .letter-display {
          font-size: 5rem;
          min-height: 150px;
        }

        .stats-display {
          flex-direction: column;
          gap: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

