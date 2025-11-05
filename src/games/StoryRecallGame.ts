import { BaseGame } from './BaseGame';
// Import TypeScript type definition (all language files share the same interface)
// Actual story data is loaded dynamically based on user's language in initializeStoryDatabase()
import type { StoryData } from '../data/storyRecall/en';

interface UserAnswer {
  questionIndex: number;
  selectedAnswer: number;
  correct: boolean;
}

export class StoryRecallGame extends BaseGame {
  private currentStory: StoryData | null = null;
  private userAnswers: UserAnswer[] = [];
  private currentQuestionIndex: number = 0;
  private displayTime: number = 10000; // ms to display story
  private storyDatabase: StoryData[] = [];

  async start(): Promise<void> {
    this.calculateDifficultyParameters();
    await this.initializeStoryDatabase();
    this.selectStory();
    this.initializeGame();
    this.showStory();
  }

  private calculateDifficultyParameters(): void {
    // Difficulty 1-3: Easy stories
    // Difficulty 4-7: Medium stories
    // Difficulty 8+: Hard stories
    
    if (this.difficulty <= 3) {
      this.displayTime = 15000; // 15 seconds
    } else if (this.difficulty <= 7) {
      this.displayTime = 12000; // 12 seconds
    } else {
      this.displayTime = 10000; // 10 seconds
    }
  }

  private async initializeStoryDatabase(): Promise<void> {
    // Get current language from translationManager
    const currentLang = this.translationManager.getCurrentLanguage();
    
    try {
      // Dynamically import stories based on language
      const storiesModule = await import(`../data/storyRecall/${currentLang}.ts`);
      this.storyDatabase = storiesModule.stories;
    } catch (error) {
      console.error(`Failed to load stories for language ${currentLang}, falling back to English`, error);
      // Fallback to English if language not found
      const storiesModule = await import('../data/storyRecall/en.ts');
      this.storyDatabase = storiesModule.stories;
    }
  }

  private selectStory(): void {
    let targetDifficulty: 'easy' | 'medium' | 'hard';
    
    if (this.difficulty <= 3) {
      targetDifficulty = 'easy';
    } else if (this.difficulty <= 7) {
      targetDifficulty = 'medium';
    } else {
      targetDifficulty = 'hard';
    }

    const stories = this.storyDatabase.filter(s => s.difficulty === targetDifficulty);
    this.currentStory = stories[Math.floor(Math.random() * stories.length)];
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="story-recall-game">
        <div class="game-header">
          <h3>${this.t('games.storyRecall.name')}</h3>
        </div>
        
        <div class="story-screen" id="storyScreen">
          <div class="timer-display" id="timerDisplay">${Math.floor(this.displayTime / 1000)}</div>
          <div class="story-content" id="storyContent"></div>
        </div>

        <div class="question-screen" id="questionScreen" style="display: none;">
          <div class="question-progress">
            <span>${this.t('games.storyRecall.question')} <span id="questionNumber">1</span>/<span id="totalQuestions">0</span></span>
          </div>
          
          <div class="question-box">
            <h4 id="questionText"></h4>
            <div class="options-container" id="optionsContainer"></div>
          </div>
        </div>
      </div>
    `;

    this.addGameStyles();
  }

  private showStory(): void {
    const storyContent = document.getElementById('storyContent');
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (storyContent && this.currentStory) {
      storyContent.textContent = this.currentStory.text;
    }

    // Countdown timer
    let remaining = Math.floor(this.displayTime / 1000);
    if (timerDisplay) timerDisplay.textContent = remaining.toString();

    const countdownInterval = setInterval(() => {
      remaining--;
      if (timerDisplay) {
        timerDisplay.textContent = remaining.toString();
        if (remaining <= 3) {
          timerDisplay.style.color = '#ef4444';
        }
      }

      if (remaining <= 0) {
        clearInterval(countdownInterval);
        this.startQuestions();
      }
    }, 1000);

    // Dispatch first interaction
    window.dispatchEvent(new CustomEvent('gameFirstInteraction'));
  }

  private startQuestions(): void {
    const storyScreen = document.getElementById('storyScreen');
    const questionScreen = document.getElementById('questionScreen');
    
    if (storyScreen) storyScreen.style.display = 'none';
    if (questionScreen) questionScreen.style.display = 'block';

    const totalQuestions = document.getElementById('totalQuestions');
    if (totalQuestions && this.currentStory) {
      totalQuestions.textContent = this.currentStory.questions.length.toString();
    }

    this.showQuestion();
  }

  private showQuestion(): void {
    if (!this.currentStory) return;

    if (this.currentQuestionIndex >= this.currentStory.questions.length) {
      this.endGame();
      return;
    }

    const question = this.currentStory.questions[this.currentQuestionIndex];
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');

    if (questionNumber) questionNumber.textContent = (this.currentQuestionIndex + 1).toString();
    if (questionText) questionText.textContent = question.question;
    
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      
      question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => this.selectAnswer(index));
        optionsContainer.appendChild(button);
      });
    }

    this.totalAttempts++;
  }

  private selectAnswer(selectedIndex: number): void {
    if (!this.currentStory) return;

    const question = this.currentStory.questions[this.currentQuestionIndex];
    const correct = selectedIndex === question.correctAnswer;

    this.userAnswers.push({
      questionIndex: this.currentQuestionIndex,
      selectedAnswer: selectedIndex,
      correct
    });

    if (correct) {
      this.correctAttempts++;
    } else {
      this.mistakes++;
    }

    // Visual feedback
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, idx) => {
      const button = btn as HTMLButtonElement;
      button.disabled = true;
      
      if (idx === question.correctAnswer) {
        button.style.background = '#10b981';
        button.style.color = 'white';
      } else if (idx === selectedIndex && !correct) {
        button.style.background = '#ef4444';
        button.style.color = 'white';
      }
    });

    // Move to next question after delay
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.showQuestion();
    }, 1500);
  }

  private endGame(): void {
    this.completeGame();
  }

  destroy(): void {
    // Cleanup if needed
  }

  private addGameStyles(): void {
    if (document.getElementById('story-recall-styles')) return;

    const style = document.createElement('style');
    style.id = 'story-recall-styles';
    style.textContent = `
      .story-recall-game {
        max-width: 900px;
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
      }

      .story-screen {
        background: var(--bg-card);
        padding: 3rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px var(--shadow);
        position: relative;
      }

      .timer-display {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary);
        background: var(--bg-secondary);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        min-width: 60px;
        text-align: center;
      }

      .story-content {
        font-size: 1.25rem;
        line-height: 1.8;
        color: var(--text-primary);
        text-align: justify;
        padding-right: 100px; /* Space for timer */
        padding-top: 0.5rem;
      }

      .question-screen {
        background: var(--bg-card);
        padding: 2rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px var(--shadow);
      }

      .question-progress {
        text-align: center;
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .question-box {
        max-width: 700px;
        margin: 0 auto;
      }

      .question-box h4 {
        font-size: 1.5rem;
        color: var(--primary);
        margin-bottom: 2rem;
        text-align: center;
      }

      .options-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .option-btn {
        padding: 1.25rem;
        background: var(--bg-secondary);
        border: 2px solid var(--border);
        border-radius: var(--radius-md);
        font-size: 1.1rem;
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
      }

      .option-btn:hover:not(:disabled) {
        background: var(--primary-light);
        border-color: var(--primary);
        transform: translateX(5px);
      }

      .option-btn:disabled {
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .story-recall-game {
          padding: 1rem;
        }

        .story-screen {
          padding: 2rem 1.5rem;
        }

        .story-content {
          font-size: 1.1rem;
          padding-right: 80px; /* Adjusted for smaller timer on mobile */
        }

        .timer-display {
          font-size: 1.5rem;
          min-width: 50px;
          padding: 0.4rem 0.8rem;
        }

        .question-box h4 {
          font-size: 1.2rem;
        }

        .option-btn {
          padding: 1rem;
          font-size: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

