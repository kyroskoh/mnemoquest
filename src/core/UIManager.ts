import { StorageManager } from './StorageManager';
import { TranslationManager } from './TranslationManager';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export class UIManager {
  private storageManager: StorageManager;
  private translationManager: TranslationManager | null = null;
  private accuracyChart: Chart | null = null;
  private performanceChart: Chart | null = null;

  constructor(storageManager: StorageManager, translationManager?: TranslationManager) {
    this.storageManager = storageManager;
    this.translationManager = translationManager || null;
  }
  
  setTranslationManager(translationManager: TranslationManager): void {
    this.translationManager = translationManager;
  }
  
  private t(key: string): string {
    return this.translationManager?.t(key) || key;
  }

  showView(viewName: string): void {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));

    // Show selected view
    const targetView = document.getElementById(`${viewName}View`);
    if (targetView) {
      targetView.classList.add('active');
      
      // Update view-specific content
      if (viewName === 'progress') {
        this.updateProgressView();
      } else if (viewName === 'dashboard') {
        this.updateDashboard();
      }
    }
  }

  updateDashboard(): void {
    const progress = this.storageManager.loadProgress();
    
    // Update stats
    const totalScore = document.getElementById('totalScore');
    const dailyStreak = document.getElementById('dailyStreak');
    const avgAccuracy = document.getElementById('avgAccuracy');
    const gamesPlayed = document.getElementById('gamesPlayed');

    if (totalScore) totalScore.textContent = progress.totalXP.toString();
    if (dailyStreak) dailyStreak.textContent = progress.dailyStreak.toString();
    if (avgAccuracy) avgAccuracy.textContent = `${this.storageManager.calculateAverageAccuracy(progress)}%`;
    if (gamesPlayed) gamesPlayed.textContent = progress.gamesPlayed.toString();
  }

  // Refresh all translatable elements (call when language changes)
  refreshTranslations(): void {
    // Refresh charts if they exist (will use new translations)
    this.updateProgressView();
  }

  private updateProgressView(): void {
    this.createAccuracyChart();
    this.createPerformanceChart();
    this.updateBadges();
  }

  private createAccuracyChart(): void {
    const canvas = document.getElementById('accuracyChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Destroy existing chart
    if (this.accuracyChart) {
      this.accuracyChart.destroy();
    }

    const progress = this.storageManager.loadProgress();
    const recentScores = progress.recentScores.slice(0, 10).reverse();

    const labels = recentScores.map((_, index) => `${this.t('progress.game')} ${index + 1}`);
    const data = recentScores.map(score => score.accuracy);

    this.accuracyChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: this.t('progress.accuracyLabel'),
          data,
          borderColor: '#0d9488',
          backgroundColor: 'rgba(13, 148, 136, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: this.t('progress.accuracyTrend'),
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`
            }
          }
        }
      }
    });
  }

  private createPerformanceChart(): void {
    const canvas = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Destroy existing chart
    if (this.performanceChart) {
      this.performanceChart.destroy();
    }

    const progress = this.storageManager.loadProgress();
    const gameTypes = Object.keys(progress.gameStats);

    const labels = gameTypes.map(type => this.formatGameType(type));
    const data = gameTypes.map(type => progress.gameStats[type].played);

    this.performanceChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Games Played',
          data,
          backgroundColor: [
            'rgba(13, 148, 136, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ],
          borderColor: [
            '#0d9488',
            '#3b82f6',
            '#f59e0b'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: this.t('progress.gamesByType'),
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  private updateBadges(): void {
    const container = document.getElementById('badgesContainer');
    if (!container) return;

    const progress = this.storageManager.loadProgress();
    const badgeData = this.getBadgeData();

    container.innerHTML = '';

    // Show all possible badges (earned and locked)
    Object.entries(badgeData).forEach(([id, badge]) => {
      const earned = progress.badges.includes(id);
      const badgeEl = document.createElement('div');
      badgeEl.className = `badge ${earned ? 'earned' : 'locked'}`;
      badgeEl.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.description}</div>
      `;
      container.appendChild(badgeEl);
    });
  }

  private getBadgeData(): Record<string, { icon: string; name: string; description: string }> {
    return {
      first_game: { icon: '🎮', name: this.t('badges.firstSteps.name'), description: this.t('badges.firstSteps.description') },
      ten_games: { icon: '🎯', name: this.t('badges.dedicated.name'), description: this.t('badges.dedicated.description') },
      fifty_games: { icon: '⭐', name: this.t('badges.committed.name'), description: this.t('badges.committed.description') },
      century: { icon: '💯', name: this.t('badges.centurion.name'), description: this.t('badges.centurion.description') },
      streak_3: { icon: '🔥', name: this.t('badges.streak3.name'), description: this.t('badges.streak3.description') },
      streak_7: { icon: '🔥🔥', name: this.t('badges.streak7.name'), description: this.t('badges.streak7.description') },
      streak_30: { icon: '🔥🔥🔥', name: this.t('badges.streak30.name'), description: this.t('badges.streak30.description') },
      level_5: { icon: '📈', name: this.t('badges.level5.name'), description: this.t('badges.level5.description') },
      level_10: { icon: '🚀', name: this.t('badges.level10.name'), description: this.t('badges.level10.description') },
      accurate: { icon: '🎓', name: this.t('badges.sharpMind.name'), description: this.t('badges.sharpMind.description') },
      perfectionist: { icon: '💎', name: this.t('badges.perfectionist.name'), description: this.t('badges.perfectionist.description') }
    };
  }

  private formatGameType(type: string): string {
    const translationKeys: Record<string, string> = {
      'memory-grid': 'games.memoryGrid.name',
      'sequence-sparks': 'games.sequenceSparks.name',
      'card-match': 'games.cardMatch.name',
      'number-recall': 'games.numberRecall.name',
      'flash-count': 'games.flashCount.name',
      'word-trail': 'games.wordTrail.name',
      'pattern-path': 'games.patternPath.name',
      'n-back': 'games.nBack.name',
      'story-recall': 'games.storyRecall.name',
      'change-detection': 'games.changeDetection.name',
      'color-sequence': 'games.colorSequence.name'
    };
    
    const key = translationKeys[type];
    return key ? this.t(key) : type;
  }

  showResultScreen(gameType: string, score: number, accuracy: number, time: number): void {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    const xpGained = score;
    const progress = this.storageManager.loadProgress();
    const levelProgress = this.storageManager.getLevelProgress(progress.totalXP);

    container.innerHTML = `
      <div class="result-screen">
        <h2 class="result-title">Game Complete! 🎉</h2>
        <div class="result-stats">
          <div class="result-stat">
            <div class="result-stat-label">${this.t('results.score')}</div>
            <div class="result-stat-value">${score}</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">${this.t('results.accuracy')}</div>
            <div class="result-stat-value">${accuracy}%</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">${this.t('results.time')}</div>
            <div class="result-stat-value">${time}s</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">${this.t('results.xpGained')}</div>
            <div class="result-stat-value">+${xpGained}</div>
          </div>
        </div>
        <div class="result-progress">
          <div class="result-level">${this.t('results.level')} ${progress.level}</div>
          <div class="result-xp-bar">
            <div class="result-xp-fill" style="width: ${levelProgress.percentage}%"></div>
          </div>
          <div class="result-xp-text">${levelProgress.currentLevelXP}/${levelProgress.xpForNextLevel} XP</div>
        </div>
        <div class="result-actions">
          <button class="result-btn primary" id="playAgainBtn">${this.t('results.playAgain')}</button>
          <button class="result-btn secondary" id="backToDashboardBtn">${this.t('results.backToDashboard')}</button>
        </div>
      </div>
    `;

    // Add result screen styles
    this.addResultStyles();

    // Set up button handlers
    document.getElementById('playAgainBtn')?.addEventListener('click', () => {
      // Trigger game restart - will be handled by GameManager
      const event = new CustomEvent('playAgain', { detail: { gameType } });
      window.dispatchEvent(event);
    });

    document.getElementById('backToDashboardBtn')?.addEventListener('click', () => {
      this.showView('dashboard');
      this.updateDashboard();
    });
  }

  private addResultStyles(): void {
    // Check if styles already exist
    if (document.getElementById('result-styles')) return;

    const style = document.createElement('style');
    style.id = 'result-styles';
    style.textContent = `
      .result-screen {
        text-align: center;
        padding: 2rem;
        max-width: 600px;
        margin: 0 auto;
      }

      .result-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 2rem;
      }

      .result-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .result-stat {
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        border: 2px solid var(--border);
      }

      .result-stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      .result-stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary);
      }

      .result-progress {
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        margin-bottom: 2rem;
      }

      .result-level {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .result-xp-bar {
        height: 20px;
        background: var(--border);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 0.5rem;
      }

      .result-xp-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        transition: width 0.5s ease;
      }

      .result-xp-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .result-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      .result-btn {
        padding: 0.75rem 2rem;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
      }

      .result-btn.primary {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
      }

      .result-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
      }

      .result-btn.secondary {
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 2px solid var(--border);
      }

      .result-btn.secondary:hover {
        background: var(--border);
      }

      .badge {
        background: var(--bg-card);
        padding: 1rem;
        border-radius: var(--radius-md);
        text-align: center;
        transition: var(--transition);
        border: 2px solid var(--border);
      }

      .badge.earned {
        border-color: var(--primary);
        box-shadow: 0 0 20px rgba(13, 148, 136, 0.2);
      }

      .badge.locked {
        opacity: 0.5;
        filter: grayscale(100%);
      }

      .badge-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .badge-name {
        font-weight: 600;
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }

      .badge-desc {
        font-size: 0.75rem;
        color: var(--text-secondary);
      }

      @media (max-width: 768px) {
        .result-stats {
          grid-template-columns: 1fr;
        }
        
        .result-actions {
          flex-direction: column;
        }
        
        .result-btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

