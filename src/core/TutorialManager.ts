import { StorageManager } from './StorageManager';
import { TranslationManager } from './TranslationManager';

interface TutorialStep {
  title: string;
  description: string;
  targetElement?: string;
}

export class TutorialManager {
  private readonly TUTORIAL_KEY = 'mnemoquest_tutorials_completed';
  private currentOverlay: HTMLElement | null = null;
  private translationManager: TranslationManager;

  constructor(_storageManager: StorageManager, translationManager: TranslationManager) {
    this.translationManager = translationManager;
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
    const t = (key: string) => this.translationManager.t(key);
    
    switch (gameType) {
      case 'memory-grid':
        return [
          {
            title: `🎯 ${t('tutorial.memoryGrid.welcome')}`,
            description: t('tutorial.memoryGrid.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.memoryGrid.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.memoryGrid.tips')
          }
        ];

      case 'sequence-sparks':
        return [
          {
            title: `✨ ${t('tutorial.sequenceSparks.welcome')}`,
            description: t('tutorial.sequenceSparks.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.sequenceSparks.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.sequenceSparks.tips')
          }
        ];

      case 'card-match':
        return [
          {
            title: `🎴 ${t('tutorial.cardMatch.welcome')}`,
            description: t('tutorial.cardMatch.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.cardMatch.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.cardMatch.tips')
          }
        ];

      case 'number-recall':
        return [
          {
            title: `🔢 ${t('tutorial.numberRecall.welcome')}`,
            description: t('tutorial.numberRecall.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.numberRecall.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.numberRecall.tips')
          }
        ];

      case 'flash-count':
        return [
          {
            title: `⚡ ${t('tutorial.flashCount.welcome')}`,
            description: t('tutorial.flashCount.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.flashCount.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.flashCount.tips')
          }
        ];

      case 'word-trail':
        return [
          {
            title: `📝 ${t('tutorial.wordTrail.welcome')}`,
            description: t('tutorial.wordTrail.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.wordTrail.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.wordTrail.tips')
          }
        ];

      case 'pattern-path':
        return [
          {
            title: `🧩 ${t('tutorial.patternPath.welcome')}`,
            description: t('tutorial.patternPath.intro')
          },
          {
            title: t('tutorial.howToPlay'),
            description: t('tutorial.patternPath.steps')
          },
          {
            title: t('tutorial.tips'),
            description: t('tutorial.patternPath.tips')
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

      const t = (key: string) => this.translationManager.t(key);
      
      this.currentOverlay = document.createElement('div');
      this.currentOverlay.className = 'tutorial-overlay';
      this.currentOverlay.innerHTML = `
        <div class="tutorial-content">
          <div class="tutorial-header">
            <h2>${step.title}</h2>
            <button class="tutorial-skip" id="tutorialSkip">${t('tutorial.skip')}</button>
          </div>
          <div class="tutorial-body">
            <p>${step.description.replace(/\n/g, '<br>')}</p>
          </div>
          <div class="tutorial-footer">
            <div class="tutorial-progress">
              ${steps.map((_, i) => `<div class="progress-dot ${i === currentStep ? 'active' : i < currentStep ? 'complete' : ''}"></div>`).join('')}
            </div>
            <div class="tutorial-buttons">
              ${currentStep > 0 ? `<button class="tutorial-btn secondary" id="tutorialBack">${t('tutorial.back')}</button>` : ''}
              <button class="tutorial-btn primary" id="tutorialNext">
                ${currentStep === steps.length - 1 ? t('tutorial.startPlaying') : t('tutorial.next')}
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

