import { StorageManager } from './StorageManager';

interface TutorialStep {
  title: string;
  description: string;
  targetElement?: string;
}

export class TutorialManager {
  private readonly TUTORIAL_KEY = 'mnemoquest_tutorials_completed';
  private currentOverlay: HTMLElement | null = null;

  constructor(_storageManager: StorageManager) {
    this.addTutorialStyles();
  }

  shouldShowTutorial(gameType: string): boolean {
    const completed = this.getCompletedTutorials();
    return !completed.includes(gameType);
  }

  showGameTutorial(gameType: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.shouldShowTutorial(gameType)) {
        resolve();
        return;
      }

      const steps = this.getTutorialSteps(gameType);
      this.showTutorialOverlay(gameType, steps, resolve);
    });
  }

  private getTutorialSteps(gameType: string): TutorialStep[] {
    switch (gameType) {
      case 'memory-grid':
        return [
          {
            title: '🎯 Welcome to Memory Grid!',
            description: 'Test your spatial memory by remembering where symbols appear on a grid.'
          },
          {
            title: 'How to Play',
            description: '1. Watch carefully as symbols appear on the grid\n2. Memorize their positions\n3. When the grid clears, click on the cells that had symbols\n4. Complete 5 rounds to finish the game'
          },
          {
            title: 'Tips',
            description: '• The grid will only show for a few seconds - focus!\n• As you improve, the difficulty will increase\n• Try to visualize patterns or create mental associations'
          }
        ];

      case 'sequence-sparks':
        return [
          {
            title: '✨ Welcome to Sequence Sparks!',
            description: 'Train your working memory by repeating sequences of flashing lights.'
          },
          {
            title: 'How to Play',
            description: '1. Watch the colored buttons light up in sequence\n2. Wait for the sequence to finish\n3. Click the buttons in the same order\n4. The sequence gets longer each round'
          },
          {
            title: 'Tips',
            description: '• Focus on one button at a time\n• Try saying colors out loud to reinforce memory\n• Create a rhythm or pattern in your mind'
          }
        ];

      case 'card-match':
        return [
          {
            title: '🎴 Welcome to Card Match!',
            description: 'Challenge your visual memory by matching pairs of cards before time runs out.'
          },
          {
            title: 'How to Play',
            description: '1. Click on cards to flip them over\n2. Try to find matching pairs\n3. Remember where each symbol is located\n4. Match all pairs before the timer expires'
          },
          {
            title: 'Tips',
            description: '• Start by flipping cards systematically\n• Pay attention to symbol locations\n• Work quickly but accurately to save time'
          }
        ];

      default:
        return [];
    }
  }

  private showTutorialOverlay(gameType: string, steps: TutorialStep[], onComplete: () => void): void {
    let currentStep = 0;

    const showStep = () => {
      if (currentStep >= steps.length) {
        this.markTutorialComplete(gameType);
        this.closeTutorialOverlay();
        onComplete();
        return;
      }

      const step = steps[currentStep];
      
      if (this.currentOverlay) {
        this.currentOverlay.remove();
      }

      this.currentOverlay = document.createElement('div');
      this.currentOverlay.className = 'tutorial-overlay';
      this.currentOverlay.innerHTML = `
        <div class="tutorial-content">
          <div class="tutorial-header">
            <h2>${step.title}</h2>
            <button class="tutorial-skip" id="tutorialSkip">Skip Tutorial</button>
          </div>
          <div class="tutorial-body">
            <p>${step.description.replace(/\n/g, '<br>')}</p>
          </div>
          <div class="tutorial-footer">
            <div class="tutorial-progress">
              ${steps.map((_, i) => `<div class="progress-dot ${i === currentStep ? 'active' : i < currentStep ? 'complete' : ''}"></div>`).join('')}
            </div>
            <div class="tutorial-buttons">
              ${currentStep > 0 ? '<button class="tutorial-btn secondary" id="tutorialBack">Back</button>' : ''}
              <button class="tutorial-btn primary" id="tutorialNext">
                ${currentStep === steps.length - 1 ? 'Start Playing!' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(this.currentOverlay);

      // Add event listeners
      document.getElementById('tutorialNext')?.addEventListener('click', () => {
        currentStep++;
        showStep();
      });

      document.getElementById('tutorialBack')?.addEventListener('click', () => {
        currentStep--;
        showStep();
      });

      document.getElementById('tutorialSkip')?.addEventListener('click', () => {
        this.markTutorialComplete(gameType);
        this.closeTutorialOverlay();
        onComplete();
      });
    };

    showStep();
  }

  private closeTutorialOverlay(): void {
    if (this.currentOverlay) {
      this.currentOverlay.remove();
      this.currentOverlay = null;
    }
  }

  private markTutorialComplete(gameType: string): void {
    const completed = this.getCompletedTutorials();
    if (!completed.includes(gameType)) {
      completed.push(gameType);
      localStorage.setItem(this.TUTORIAL_KEY, JSON.stringify(completed));
    }
  }

  private getCompletedTutorials(): string[] {
    const data = localStorage.getItem(this.TUTORIAL_KEY);
    return data ? JSON.parse(data) : [];
  }

  resetTutorials(): void {
    localStorage.removeItem(this.TUTORIAL_KEY);
  }

  private addTutorialStyles(): void {
    if (document.getElementById('tutorial-styles')) return;

    const style = document.createElement('style');
    style.id = 'tutorial-styles';
    style.textContent = `
      .tutorial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }

      .tutorial-content {
        background: var(--bg-card);
        border-radius: var(--radius-xl);
        max-width: 600px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s ease;
      }

      .tutorial-header {
        padding: 2rem 2rem 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 2px solid var(--border);
      }

      .tutorial-header h2 {
        font-size: 1.75rem;
        color: var(--primary);
        margin: 0;
      }

      .tutorial-skip {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-size: 0.875rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: var(--transition);
      }

      .tutorial-skip:hover {
        color: var(--primary);
      }

      .tutorial-body {
        padding: 2rem;
      }

      .tutorial-body p {
        font-size: 1.125rem;
        line-height: 1.8;
        color: var(--text-primary);
        margin: 0;
      }

      .tutorial-footer {
        padding: 1rem 2rem 2rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .tutorial-progress {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
      }

      .tutorial-progress .progress-dot {
        width: 12px;
        height: 12px;
        background: var(--border);
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .tutorial-progress .progress-dot.active {
        background: var(--primary);
        transform: scale(1.5);
      }

      .tutorial-progress .progress-dot.complete {
        background: var(--secondary);
      }

      .tutorial-buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }

      .tutorial-btn {
        padding: 0.75rem 2rem;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
      }

      .tutorial-btn.primary {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
      }

      .tutorial-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
      }

      .tutorial-btn.secondary {
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 2px solid var(--border);
      }

      .tutorial-btn.secondary:hover {
        background: var(--border);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .tutorial-content {
          width: 95%;
        }

        .tutorial-header,
        .tutorial-body,
        .tutorial-footer {
          padding: 1.5rem;
        }

        .tutorial-header h2 {
          font-size: 1.5rem;
        }

        .tutorial-body p {
          font-size: 1rem;
        }

        .tutorial-buttons {
          flex-direction: column;
        }

        .tutorial-btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

