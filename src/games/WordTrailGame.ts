import { BaseGame } from './BaseGame';
import { getWords } from '../data/wordlists';

export class WordTrailGame extends BaseGame {
  private words: string[] = [];
  private playerWords: string[] = [];
  private wordCount: number = 3;
  private displayTime: number = 2000; // ms per word

  start(): void {
    // Calculate difficulty
    this.wordCount = Math.min(15, Math.max(3, Math.floor(3 + this.difficulty * 1.2)));
    this.displayTime = Math.max(800, 2000 - (this.difficulty * 120));
    
    this.initializeGame();
    this.generateWords();
    this.showWords();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="word-trail-game">
        <div class="game-instructions">
          <h3>${this.t('games.wordTrail.name')}</h3>
          <p id="instructionText">${this.t('games.wordTrail.instructions')}</p>
        </div>
        <div class="word-display" id="wordDisplay">
          <div class="word-text" id="currentWord"></div>
          <div class="word-counter" id="wordCounter"></div>
        </div>
        <div class="input-section" id="inputSection" style="display: none;">
          <p class="input-instructions">${this.t('games.wordTrail.recall')}</p>
          <div id="wordInputs"></div>
          <button class="submit-btn" id="submitBtn">${this.t('games.wordTrail.submit')}</button>
        </div>
      </div>
    `;

    this.addGameStyles();
  }

  private generateWords(): void {
    this.words = getWords(this.difficulty, this.wordCount);
  }

  private async showWords(): Promise<void> {
    const wordEl = document.getElementById('currentWord');
    const counterEl = document.getElementById('wordCounter');
    
    if (!wordEl || !counterEl) return;

    for (let i = 0; i < this.words.length; i++) {
      
      // Show word
      wordEl.textContent = this.words[i];
      wordEl.className = 'word-text show';
      counterEl.textContent = `${i + 1} / ${this.words.length}`;

      await this.wait(this.displayTime);
      
      // Hide word
      wordEl.className = 'word-text';
      await this.wait(300);
    }

    this.enableInput();
  }

  private enableInput(): void {
    const instructionEl = document.getElementById('instructionText');
    const displayEl = document.getElementById('wordDisplay');
    const inputSection = document.getElementById('inputSection');
    const wordInputsContainer = document.getElementById('wordInputs');

    if (instructionEl) {
      instructionEl.textContent = this.t('games.wordTrail.typeWords');
    }
    
    if (displayEl) displayEl.style.display = 'none';
    if (inputSection) inputSection.style.display = 'block';

    if (wordInputsContainer) {
      wordInputsContainer.innerHTML = '';
      
      for (let i = 0; i < this.words.length; i++) {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'word-input-wrapper';
        
        const label = document.createElement('label');
        label.textContent = `${i + 1}.`;
        label.className = 'word-label';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'word-input';
        input.id = `word-${i}`;
        input.placeholder = this.t('games.wordTrail.wordPlaceholder').replace('{num}', (i + 1).toString());
        input.autocomplete = 'off';
        
        // Auto-focus first input
        if (i === 0) {
          setTimeout(() => input.focus(), 100);
        }
        
        // Enter key moves to next input
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (i < this.words.length - 1) {
              const nextInput = document.getElementById(`word-${i + 1}`) as HTMLInputElement;
              if (nextInput) nextInput.focus();
            } else {
              this.submitAnswer();
            }
          }
        });
        
        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        wordInputsContainer.appendChild(inputWrapper);
      }
    }

    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.submitAnswer());
    }
  }

  private submitAnswer(): void {
    this.playerWords = [];
    
    for (let i = 0; i < this.words.length; i++) {
      const input = document.getElementById(`word-${i}`) as HTMLInputElement;
      if (input) {
        this.playerWords.push(input.value.trim().toLowerCase());
      }
    }

    this.totalAttempts = this.words.length;
    this.checkAnswer();
  }

  private checkAnswer(): void {
    const wordInputsContainer = document.getElementById('wordInputs');
    if (!wordInputsContainer) return;

    let correctWords = 0;
    let correctPositions = 0;

    this.words.forEach((correctWord, index) => {
      const playerWord = this.playerWords[index] || '';
      const inputWrapper = wordInputsContainer.children[index] as HTMLElement;
      const input = inputWrapper?.querySelector('.word-input') as HTMLInputElement;
      
      if (!input) return;

      const isExactMatch = playerWord === correctWord.toLowerCase();
      const isClose = this.isWordSimilar(playerWord, correctWord.toLowerCase());

      if (isExactMatch) {
        correctWords++;
        correctPositions++;
        input.classList.add('correct');
        this.correctAttempts++;
      } else if (isClose) {
        input.classList.add('partial');
        correctWords += 0.5;
        this.correctAttempts += 0.5;
        this.mistakes += 0.5;
      } else {
        input.classList.add('incorrect');
        this.mistakes++;
      }

      // Show correct answer
      const feedback = document.createElement('div');
      feedback.className = 'word-feedback';
      feedback.textContent = correctWord;
      inputWrapper.appendChild(feedback);
      
      input.disabled = true;
    });

    // Show summary
    this.showSummary(correctWords, correctPositions);

    setTimeout(() => {
      this.endGame();
    }, 3000);
  }

  private isWordSimilar(word1: string, word2: string): boolean {
    if (word1 === word2) return true;
    
    // Levenshtein distance for typos
    const distance = this.levenshteinDistance(word1, word2);
    const maxLength = Math.max(word1.length, word2.length);
    const similarity = 1 - distance / maxLength;
    
    return similarity >= 0.75; // 75% similar
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  private showSummary(correctWords: number, correctPositions: number): void {
    const inputSection = document.getElementById('inputSection');
    if (!inputSection) return;

    const summary = document.createElement('div');
    summary.className = 'summary-box';
    summary.innerHTML = `
      <h4>${this.t('games.wordTrail.results')}</h4>
      <p>${this.t('games.wordTrail.correctWords')}: ${correctWords}/${this.words.length}</p>
      <p>${this.t('games.wordTrail.correctOrder')}: ${correctPositions}/${this.words.length}</p>
    `;
    
    inputSection.appendChild(summary);
  }

  private endGame(): void {
    this.completeGame();
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  destroy(): void {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.replaceWith(submitBtn.cloneNode(true));
  }

  private addGameStyles(): void {
    if (document.getElementById('word-trail-styles')) return;

    const style = document.createElement('style');
    style.id = 'word-trail-styles';
    style.textContent = `
      .word-trail-game {
        padding: 2rem;
        text-align: center;
        max-width: 700px;
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
      }

      .word-display {
        min-height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 2rem 0;
      }

      .word-text {
        font-size: 3rem;
        font-weight: 700;
        color: var(--primary);
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
        margin-bottom: 1rem;
      }

      .word-text.show {
        opacity: 1;
        transform: scale(1);
      }

      .word-counter {
        font-size: 1.25rem;
        color: var(--text-secondary);
        font-weight: 600;
      }

      .input-section {
        margin-top: 2rem;
      }

      .input-instructions {
        font-size: 1.125rem;
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
      }

      #wordInputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        max-height: 400px;
        overflow-y: auto;
        padding: 0.5rem;
      }

      .word-input-wrapper {
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 0.75rem;
        align-items: center;
        position: relative;
      }

      .word-label {
        font-weight: 600;
        color: var(--text-secondary);
        text-align: right;
      }

      .word-input {
        padding: 0.75rem 1rem;
        font-size: 1.125rem;
        border: 2px solid var(--border);
        border-radius: var(--radius-md);
        transition: all 0.3s ease;
      }

      .word-input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
      }

      .word-input:disabled {
        background: var(--bg-secondary);
        cursor: not-allowed;
      }

      .word-input.correct {
        border-color: #10b981;
        background: linear-gradient(135deg, #d1fae5, #a7f3d0);
      }

      .word-input.partial {
        border-color: #f59e0b;
        background: linear-gradient(135deg, #fef3c7, #fde68a);
      }

      .word-input.incorrect {
        border-color: #ef4444;
        background: linear-gradient(135deg, #fee2e2, #fecaca);
      }

      .word-feedback {
        grid-column: 2;
        text-align: left;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--primary);
        margin-top: 0.25rem;
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

      .summary-box {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border: 3px solid var(--primary);
        border-radius: var(--radius-lg);
      }

      .summary-box h4 {
        font-size: 1.25rem;
        color: var(--primary);
        margin-bottom: 1rem;
      }

      .summary-box p {
        font-size: 1.125rem;
        color: var(--text-primary);
        margin: 0.5rem 0;
      }

      @media (max-width: 768px) {
        .word-trail-game {
          padding: 1rem;
        }

        .word-text {
          font-size: 2rem;
        }

        .word-input-wrapper {
          grid-template-columns: 30px 1fr;
        }

        .word-input {
          font-size: 1rem;
          padding: 0.5rem 0.75rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

