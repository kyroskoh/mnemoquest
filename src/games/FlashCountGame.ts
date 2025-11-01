import { BaseGame } from './BaseGame';

interface FlashObject {
  id: number;
  x: number;
  y: number;
  size: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  color: string;
}

export class FlashCountGame extends BaseGame {
  private objects: FlashObject[] = [];
  private objectCount: number = 5;
  private displayTime: number = 500;
  private categories: number = 1;
  private targetShape: string = '';
  private targetColor: string = '';
  private correctCount: number = 0;
  private round: number = 0;
  private maxRounds: number = 5;

  private shapes = ['circle', 'square', 'triangle', 'star'] as const;
  private colors = [
    { name: 'red', hex: '#ef4444' },
    { name: 'blue', hex: '#3b82f6' },
    { name: 'green', hex: '#10b981' },
    { name: 'yellow', hex: '#f59e0b' },
    { name: 'purple', hex: '#a855f7' },
    { name: 'orange', hex: '#f97316' }
  ];

  start(): void {
    // Calculate difficulty
    this.objectCount = Math.min(20, Math.max(3, Math.floor(3 + this.difficulty * 1.7)));
    
    // Flash display time - longer for easier levels, shorter for harder
    // Easy (0-5): 3000-2000ms
    // Medium (5-10): 2000-1000ms  
    // Hard (10-15): 1000-500ms
    // Very Hard (15+): 500-300ms
    if (this.difficulty <= 5) {
      this.displayTime = Math.max(2000, 3000 - (this.difficulty * 200));
    } else if (this.difficulty <= 10) {
      this.displayTime = Math.max(1000, 2000 - ((this.difficulty - 5) * 200));
    } else if (this.difficulty <= 15) {
      this.displayTime = Math.max(500, 1000 - ((this.difficulty - 10) * 100));
    } else {
      this.displayTime = Math.max(300, 500 - ((this.difficulty - 15) * 20));
    }
    
    this.categories = Math.min(4, Math.max(1, Math.floor(1 + this.difficulty * 0.3)));
    
    this.initializeGame();
    this.startRound();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="flash-count-game">
        <div class="game-instructions">
          <h3>${this.t('games.flashCount.name')}</h3>
          <p>${this.t('games.flashCount.instructions')}</p>
          <div class="round-indicator">${this.t('gameUI.round')} <span id="roundNumber">1</span>/${this.maxRounds}</div>
        </div>
        <div class="flash-container" id="flashContainer"></div>
        <div class="question-section" id="questionSection" style="display: none;">
          <p class="question-text" id="questionText"></p>
          <div class="answer-buttons" id="answerButtons"></div>
        </div>
      </div>
    `;

    this.addGameStyles();
  }

  private startRound(): void {
    this.round++;
    this.totalAttempts++;

    const roundEl = document.getElementById('roundNumber');
    if (roundEl) roundEl.textContent = this.round.toString();

    this.generateObjects();
    this.flashObjects();
  }

  private generateObjects(): void {
    this.objects = [];
    const container = document.getElementById('flashContainer');
    if (!container) return;

    const availableShapes = this.shapes.slice(0, Math.min(this.shapes.length, this.categories + 1));
    const availableColors = this.colors.slice(0, Math.min(this.colors.length, this.categories + 1));

    // Select random target
    this.targetShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
    this.targetColor = availableColors[Math.floor(Math.random() * availableColors.length)].name;
    this.correctCount = 0;

    for (let i = 0; i < this.objectCount; i++) {
      const shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
      const color = availableColors[Math.floor(Math.random() * availableColors.length)];
      
      // Count matches
      if (shape === this.targetShape && color.name === this.targetColor) {
        this.correctCount++;
      }

      this.objects.push({
        id: i,
        x: Math.random() * 80 + 10, // 10-90% of container width
        y: Math.random() * 80 + 10, // 10-90% of container height
        size: Math.random() * 30 + 40, // 40-70px
        shape,
        color: color.hex
      });
    }

    // Ensure at least 1 target object exists
    if (this.correctCount === 0) {
      const randomIndex = Math.floor(Math.random() * this.objects.length);
      this.objects[randomIndex].shape = this.targetShape as any;
      this.objects[randomIndex].color = availableColors.find(c => c.name === this.targetColor)!.hex;
      this.correctCount = 1;
    }
  }

  private async flashObjects(): Promise<void> {
    const container = document.getElementById('flashContainer');
    if (!container) return;

    container.innerHTML = '';

    // Render all objects
    this.objects.forEach(obj => {
      const objEl = document.createElement('div');
      objEl.className = `flash-object ${obj.shape}`;
      objEl.style.left = `${obj.x}%`;
      objEl.style.top = `${obj.y}%`;
      objEl.style.width = `${obj.size}px`;
      objEl.style.height = `${obj.size}px`;
      objEl.style.background = obj.color;

      if (obj.shape === 'triangle') {
        objEl.style.background = 'transparent';
        objEl.style.borderBottom = `${obj.size}px solid ${obj.color}`;
        objEl.style.borderLeft = `${obj.size / 2}px solid transparent`;
        objEl.style.borderRight = `${obj.size / 2}px solid transparent`;
        objEl.style.width = '0';
        objEl.style.height = '0';
      } else if (obj.shape === 'star') {
        objEl.textContent = '★';
        objEl.style.color = obj.color;
        objEl.style.background = 'transparent';
        objEl.style.fontSize = `${obj.size}px`;
        objEl.style.lineHeight = `${obj.size}px`;
      }

      container.appendChild(objEl);
    });

    container.classList.add('show');

    // Wait for display time
    await this.wait(this.displayTime);

    // Hide objects
    container.classList.remove('show');
    container.innerHTML = '';

    await this.wait(300);

    this.showQuestion();
  }

  private showQuestion(): void {
    const questionSection = document.getElementById('questionSection');
    const questionText = document.getElementById('questionText');
    const answerButtons = document.getElementById('answerButtons');

    if (!questionSection || !questionText || !answerButtons) return;

    questionSection.style.display = 'block';

    // Translate shape and color
    const shapeKey = `games.flashCount.shapes.${this.targetShape}`;
    const colorKey = `games.flashCount.colors.${this.targetColor}`;
    
    questionText.textContent = this.t('games.flashCount.question')
      .replace('{color}', this.t(colorKey))
      .replace('{shape}', this.t(shapeKey));

    // Generate answer options
    const correctAnswer = this.correctCount;
    const options = this.generateOptions(correctAnswer);

    answerButtons.innerHTML = '';
    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = option.toString();
      btn.addEventListener('click', () => this.checkAnswer(option));
      answerButtons.appendChild(btn);
    });
  }

  private generateOptions(correct: number): number[] {
    const options = new Set<number>();
    options.add(correct);

    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const option = Math.max(0, correct + offset);
      if (option !== correct || options.size === 0) {
        options.add(option);
      }
    }

    return Array.from(options).sort((a, b) => a - b);
  }

  private checkAnswer(selected: number): void {
    const answerButtons = document.getElementById('answerButtons');
    if (!answerButtons) return;

    const buttons = answerButtons.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
      const btnElement = btn as HTMLButtonElement;
      btnElement.disabled = true;
      
      const value = parseInt(btnElement.textContent || '0');
      if (value === this.correctCount) {
        btnElement.classList.add('correct');
      } else if (value === selected) {
        btnElement.classList.add('incorrect');
      }
    });

    if (selected === this.correctCount) {
      this.correctAttempts++;
    } else {
      this.mistakes++;
    }

    setTimeout(() => {
      if (this.round >= this.maxRounds) {
        this.endGame();
      } else {
        this.resetRound();
        this.startRound();
      }
    }, 1500);
  }

  private resetRound(): void {
    const questionSection = document.getElementById('questionSection');
    if (questionSection) {
      questionSection.style.display = 'none';
    }
  }

  private endGame(): void {
    this.completeGame();
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  destroy(): void {
    const container = document.getElementById('flashContainer');
    if (container) {
      container.innerHTML = '';
    }
  }

  private addGameStyles(): void {
    if (document.getElementById('flash-count-styles')) return;

    const style = document.createElement('style');
    style.id = 'flash-count-styles';
    style.textContent = `
      .flash-count-game {
        padding: 2rem;
        text-align: center;
        max-width: 800px;
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
        margin-bottom: 1rem;
      }

      .round-indicator {
        font-size: 1rem;
        font-weight: 600;
        color: var(--primary);
      }

      .flash-container {
        position: relative;
        width: 100%;
        height: 400px;
        background: var(--bg-secondary);
        border: 3px solid var(--border);
        border-radius: var(--radius-lg);
        margin: 2rem 0;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .flash-container.show {
        opacity: 1;
      }

      .flash-object {
        position: absolute;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        pointer-events: none;
      }

      .flash-object.square {
        border-radius: 8px;
      }

      .flash-object.triangle {
        border-radius: 0;
      }

      .flash-object.star {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }

      .question-section {
        margin-top: 2rem;
      }

      .question-text {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }

      .answer-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto;
      }

      .answer-btn {
        padding: 1.5rem;
        font-size: 1.5rem;
        font-weight: 700;
        background: var(--bg-secondary);
        border: 3px solid var(--border);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .answer-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        border-color: var(--primary);
        box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
      }

      .answer-btn:disabled {
        cursor: not-allowed;
      }

      .answer-btn.correct {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #059669;
        color: white;
        animation: correctPulse 0.5s ease;
      }

      .answer-btn.incorrect {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border-color: #dc2626;
        color: white;
        animation: shake 0.5s ease;
      }

      @keyframes correctPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      @media (max-width: 768px) {
        .flash-count-game {
          padding: 1rem;
        }

        .flash-container {
          height: 300px;
        }

        .question-text {
          font-size: 1.25rem;
        }

        .answer-buttons {
          grid-template-columns: repeat(2, 1fr);
        }

        .answer-btn {
          padding: 1rem;
          font-size: 1.25rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

