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

    const labels = recentScores.map((_, index) => `Game ${index + 1}`);
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
      first_game: { icon: '🎮', name: 'First Steps', description: 'Complete your first game' },
      ten_games: { icon: '🎯', name: 'Dedicated', description: 'Play 10 games' },
      fifty_games: { icon: '⭐', name: 'Committed', description: 'Play 50 games' },
      century: { icon: '💯', name: 'Centurion', description: 'Play 100 games' },
      streak_3: { icon: '🔥', name: '3-Day Streak', description: 'Play 3 days in a row' },
      streak_7: { icon: '🔥🔥', name: 'Week Warrior', description: 'Play 7 days in a row' },
      streak_30: { icon: '🔥🔥🔥', name: 'Monthly Master', description: 'Play 30 days in a row' },
      level_5: { icon: '📈', name: 'Level 5', description: 'Reach level 5' },
      level_10: { icon: '🚀', name: 'Level 10', description: 'Reach level 10' },
      accurate: { icon: '🎓', name: 'Sharp Mind', description: '80% avg accuracy (10+ games)' },
      perfectionist: { icon: '💎', name: 'Perfectionist', description: '95% avg accuracy (20+ games)' }
    };
  }

  private formatGameType(type: string): string {
    const names: Record<string, string> = {
      'memory-grid': 'Memory Grid',
      'sequence-sparks': 'Sequence Sparks',
      'card-match': 'Card Match'
    };
    return names[type] || type;
  }

  showResultScreen(gameType: string, score: number, accuracy: number, time: number): void {
    const container = document.getElementById('gameContainer');
    if (!container) return;

    const xpGained = score;
    const progress = this.storageManager.loadProgress();

    container.innerHTML = `
      <div class="result-screen">
        <h2 class="result-title">Game Complete! 🎉</h2>
        <div class="result-stats">
          <div class="result-stat">
            <div class="result-stat-label">Score</div>
            <div class="result-stat-value">${score}</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">Accuracy</div>
            <div class="result-stat-value">${accuracy}%</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">Time</div>
            <div class="result-stat-value">${time}s</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-label">XP Gained</div>
            <div class="result-stat-value">+${xpGained}</div>
          </div>
        </div>
        <div class="result-progress">
          <div class="result-level">Level ${progress.level}</div>
          <div class="result-xp-bar">
            <div class="result-xp-fill" style="width: ${(progress.totalXP % 100)}%"></div>
          </div>
          <div class="result-xp-text">${progress.totalXP % 100}/100 XP</div>
        </div>
        <div class="result-actions">
          <button class="result-btn primary" id="playAgainBtn">Play Again</button>
          <button class="result-btn secondary" id="backToDashboardBtn">Back to Dashboard</button>
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

