import { BaseGame } from './BaseGame';

interface Card {
  id: number;
  symbol: string;
  matched: boolean;
  flipped: boolean;
}

export class CardMatchGame extends BaseGame {
  private cards: Card[] = [];
  private flippedCards: number[] = [];
  private pairsFound: number = 0;
  private totalPairs: number = 6;
  private canFlip: boolean = true;
  private timeLimit: number = 60;
  private timeRemaining: number = 60;
  private timerInterval: number | null = null;

  start(): void {
    // Calculate pairs based on difficulty (4 to 12 pairs)
    this.totalPairs = Math.min(12, Math.max(4, Math.floor(3 + this.difficulty * 0.8)));
    this.timeLimit = Math.max(30, 60 - (this.difficulty * 3));
    this.timeRemaining = this.timeLimit;
    
    this.initializeGame();
    this.generateCards();
    this.renderCards();
    this.startTimer();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="card-match-game">
        <div class="game-instructions">
          <h3>${this.t('games.cardMatch.name')}</h3>
          <div class="game-stats">
            <div class="stat">
              <span class="stat-label">${this.t('gameUI.pairsFound')}:</span>
              <span class="stat-value" id="pairsFound">0/${this.totalPairs}</span>
            </div>
            <div class="stat">
              <span class="stat-label">${this.t('gameUI.time')}:</span>
              <span class="stat-value" id="timeRemaining">${this.timeLimit}s</span>
            </div>
            <div class="stat">
              <span class="stat-label">${this.t('gameUI.mistakes')}:</span>
              <span class="stat-value" id="mistakeCount">0</span>
            </div>
          </div>
        </div>
        <div class="cards-container" id="cardsContainer"></div>
      </div>
    `;

    this.addGameStyles();
  }

  private generateCards(): void {
    const symbols = ['🎯', '⭐', '💎', '🎨', '🔥', '✨', '🎭', '🎪', '🎸', '🎮', '🎲', '🎰'];
    const selectedSymbols = symbols.slice(0, this.totalPairs);

    this.cards = [];
    let id = 0;

    // Create pairs
    selectedSymbols.forEach(symbol => {
      this.cards.push({ id: id++, symbol, matched: false, flipped: false });
      this.cards.push({ id: id++, symbol, matched: false, flipped: false });
    });

    // Shuffle cards
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  private renderCards(): void {
    const container = document.getElementById('cardsContainer');
    if (!container) return;

    container.innerHTML = '';
    
    // Adjust grid columns based on number of cards
    const totalCards = this.cards.length;
    let columns = 4;
    if (totalCards <= 16) columns = 4;
    else if (totalCards <= 20) columns = 5;
    else columns = 6;

    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    this.cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.dataset.id = card.id.toString();

      if (card.flipped || card.matched) {
        cardEl.classList.add('flipped');
        if (card.matched) {
          cardEl.classList.add('matched');
        }
      }

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">${card.symbol}</div>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(card.id));
      container.appendChild(cardEl);
    });
  }

  private handleCardClick(cardId: number): void {
    if (!this.canFlip) return;

    const card = this.cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    // Flip card
    card.flipped = true;
    this.flippedCards.push(cardId);
    this.renderCards();

    if (this.flippedCards.length === 2) {
      this.canFlip = false;
      this.totalAttempts++;
      this.checkMatch();
    }
  }

  private checkMatch(): void {
    const [id1, id2] = this.flippedCards;
    const card1 = this.cards.find(c => c.id === id1);
    const card2 = this.cards.find(c => c.id === id2);

    if (!card1 || !card2) return;

    setTimeout(() => {
      if (card1.symbol === card2.symbol) {
        // Match found!
        card1.matched = true;
        card2.matched = true;
        this.pairsFound++;
        this.correctAttempts++;
        this.updateStats();

        if (this.pairsFound === this.totalPairs) {
          this.endGame(true);
        }
      } else {
        // No match
        card1.flipped = false;
        card2.flipped = false;
        this.mistakes++;
        this.updateStats();
      }

      this.flippedCards = [];
      this.canFlip = true;
      this.renderCards();
    }, 800);
  }

  private startTimer(): void {
    this.timerInterval = window.setInterval(() => {
      this.timeRemaining--;
      this.updateStats();

      if (this.timeRemaining <= 0) {
        this.endGame(false);
      }
    }, 1000);
  }

  private updateStats(): void {
    const pairsEl = document.getElementById('pairsFound');
    const timeEl = document.getElementById('timeRemaining');
    const mistakesEl = document.getElementById('mistakeCount');

    if (pairsEl) pairsEl.textContent = `${this.pairsFound}/${this.totalPairs}`;
    if (timeEl) {
      timeEl.textContent = `${this.timeRemaining}s`;
      if (this.timeRemaining <= 10) {
        timeEl.style.color = '#ef4444';
      }
    }
    if (mistakesEl) mistakesEl.textContent = this.mistakes.toString();
  }

  private endGame(won: boolean): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // If won, use actual attempts, otherwise give partial credit
    if (!won) {
      // Give credit for pairs found
      this.correctAttempts = this.pairsFound;
      this.totalAttempts = this.totalPairs;
    } else {
      this.totalAttempts = this.totalPairs;
      this.correctAttempts = this.pairsFound;
    }

    this.completeGame();
  }

  destroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.replaceWith(card.cloneNode(true));
    });
  }

  private addGameStyles(): void {
    if (document.getElementById('card-match-styles')) return;

    const style = document.createElement('style');
    style.id = 'card-match-styles';
    style.textContent = `
      .card-match-game {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .game-stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 1rem;
      }

      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
      }

      .cards-container {
        display: grid;
        gap: 0.75rem;
        margin-top: 2rem;
      }

      .card {
        aspect-ratio: 3/4;
        perspective: 1000px;
        cursor: pointer;
        min-width: 60px;
        min-height: 80px;
      }

      .card-inner {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }

      .card.flipped .card-inner {
        transform: rotateY(180deg);
      }

      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-md);
        font-size: 2.5rem;
        font-weight: 700;
      }

      .card-front {
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        color: white;
        border: 3px solid var(--primary-dark);
      }

      .card-back {
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        border: 3px solid var(--border);
        transform: rotateY(180deg);
      }

      .card.matched .card-back {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #047857;
        animation: matchPulse 0.5s ease;
      }

      .card:not(.flipped):not(.matched):hover .card-inner {
        transform: scale(1.05);
      }

      @keyframes matchPulse {
        0%, 100% { transform: rotateY(180deg) scale(1); }
        50% { transform: rotateY(180deg) scale(1.15); }
      }

      @media (max-width: 768px) {
        .card-match-game {
          padding: 1rem;
        }

        .game-stats {
          flex-direction: row;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stat {
          flex: 1;
          min-width: 100px;
        }

        .stat-label {
          font-size: 0.75rem;
        }

        .stat-value {
          font-size: 1.25rem;
        }

        .cards-container {
          gap: 0.5rem;
          margin-top: 1rem;
        }

        /* Force 3 columns on mobile for larger, easier-to-tap cards */
        .cards-container {
          grid-template-columns: repeat(3, 1fr) !important;
        }

        .card {
          min-width: 70px;
          min-height: 94px;
          /* Ensure touch targets are at least 44x44px */
          touch-action: manipulation;
        }

        .card-front,
        .card-back {
          font-size: 2rem;
        }
      }

      /* Extra small devices (phones in portrait) */
      @media (max-width: 480px) {
        .card-match-game {
          padding: 0.5rem;
        }

        .cards-container {
          gap: 0.4rem;
          margin-top: 0.75rem;
        }

        .card {
          min-width: 80px;
          min-height: 107px;
        }

        .card-front,
        .card-back {
          font-size: 2.5rem;
          border-width: 2px;
        }

        .stat-label {
          font-size: 0.7rem;
        }

        .stat-value {
          font-size: 1.1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

