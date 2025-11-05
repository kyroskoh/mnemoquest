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
  private canFlip: boolean = false; // Start as false during preview
  private timeLimit: number = 60;
  private timeRemaining: number = 60;
  private timerInterval: number | null = null;
  private memorizeTime: number = 5; // Seconds to memorize cards
  private gamePhase: 'memorize' | 'play' = 'memorize';
  private gameEnded: boolean = false;

  start(): void {
    // Reset game state
    this.gameEnded = false;
    this.pairsFound = 0;
    this.mistakes = 0;
    this.flippedCards = [];
    
    // Progressive difficulty: start with 3 pairs, add 1 pair per difficulty level
    // Difficulty 1: 3 pairs (6 cards)
    // Difficulty 2: 4 pairs (8 cards)
    // Difficulty 3: 5 pairs (10 cards)
    // ...
    // Difficulty 20: 22 pairs (44 cards)
    // Difficulty 30: 32 pairs (64 cards)
    // No maximum limit - scales indefinitely!
    this.totalPairs = Math.floor(Math.max(3, 2 + this.difficulty));
    
    // Memorization time - CHALLENGING MODE!
    // Time decreases per card as difficulty increases - true memory challenge
    // Difficulty 1: 3 pairs (6 cards) - ~3 seconds (0.5 sec/card)
    // Difficulty 5: 7 pairs (14 cards) - ~5 seconds (0.36 sec/card)
    // Difficulty 10: 12 pairs (24 cards) - ~7 seconds (0.29 sec/card)
    // Difficulty 20: 22 pairs (44 cards) - ~10 seconds (0.23 sec/card)
    // Difficulty 30: 32 pairs (64 cards) - ~13 seconds (0.20 sec/card)
    // Difficulty 50: 52 pairs (104 cards) - ~16 seconds (0.15 sec/card)
    const baseTime = 1; // Minimal base time
    const timePerPair = Math.max(0.15, 0.6 - (this.difficulty * 0.02)); // Time per pair decreases significantly
    // Small scroll bonus only for very large grids (20+ pairs)
    const scrollBonus = this.totalPairs > 20 ? Math.floor((this.totalPairs - 20) * 0.05) : 0;
    this.memorizeTime = Math.max(2, Math.floor(baseTime + (this.totalPairs * timePerPair) + scrollBonus));
    
    // Time limit for finding all pairs (after memorization) - CHALLENGING!
    // Less time forces players to remember accurately
    this.timeLimit = Math.floor(Math.max(25, 35 + (this.totalPairs * 2) - (this.difficulty * 1.2)));
    this.timeRemaining = this.memorizeTime;
    
    this.initializeGame();
    this.generateCards();
    this.startMemorizePhase();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="card-match-game">
        <div class="game-instructions">
          <h3>${this.t('games.cardMatch.name')}</h3>
          <div class="phase-indicator" id="phaseIndicator">
            <span class="phase-label">${this.t('games.cardMatch.memorizePhase')}</span>
            <div class="countdown-display" id="countdownDisplay">
              <div class="countdown-number">${this.memorizeTime}</div>
              <div class="countdown-text">${this.t('games.cardMatch.cardsFlipIn')}</div>
            </div>
          </div>
          <div class="game-stats">
            <div class="stat">
              <span class="stat-label">${this.t('gameUI.pairsFound')}:</span>
              <span class="stat-value" id="pairsFound">0/${this.totalPairs}</span>
            </div>
            <div class="stat">
              <span class="stat-label">${this.t('gameUI.time')}:</span>
              <span class="stat-value" id="timeRemaining">${this.memorizeTime}s</span>
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
    // Expanded emoji library with multiple categories
    const allSymbols = [
      // Animals
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
      '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺',
      '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐢', '🐙', '🦑', '🦀',
      // Nature & Plants
      '🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌵', '🌲', '🌳', '🍀', '🍁', '🍂',
      '🍃', '🌾', '🌿', '☘️', '🌴', '🌱', '🌊', '🔥', '⚡', '⭐', '✨', '🌙',
      '☀️', '🌈', '☁️', '⛅', '🌤️', '🌪️', '❄️', '☃️', '⛄',
      // Food
      '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭',
      '🍍', '🥥', '🥝', '🍅', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥒', '🥬',
      '🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🍩', '🍪', '🎂', '🍰', '🧁', '🍦',
      // Objects
      '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓',
      '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿',
      '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎺', '🎻', '🥁', '🎲', '🎮', '🎰',
      '🧩', '🎪', '🎢', '🎡', '🎠', '🎨', '🖼️', '🎭', '🎬', '🎤', '🎧', '🎼',
      // Symbols
      '💎', '💍', '👑', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫',
      '🎟️', '🎁', '🎀', '🎊', '🎉', '🎈', '🎆', '🎇', '🧨', '✨', '🎃', '🎄',
      '🎋', '🎍', '🎑', '🧧', '🎏', '🔮', '🪄', '🧿', '🎐', '💝', '💖', '💗'
    ];

    // Shuffle the entire pool and select random symbols
    const shuffled = [...allSymbols].sort(() => Math.random() - 0.5);
    const selectedSymbols = shuffled.slice(0, this.totalPairs);

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

  private startMemorizePhase(): void {
    this.gamePhase = 'memorize';
    this.canFlip = false;
    
    // Show all cards during memorize phase
    this.cards.forEach(card => {
      card.flipped = true;
    });
    
    this.renderCards();
    
    // Add scroll hint if container is scrollable
    setTimeout(() => {
      const container = document.getElementById('cardsContainer');
      if (container && container.scrollHeight > container.clientHeight) {
        // Container is scrollable - show hint
        this.showScrollHint();
      }
    }, 100);
    
    // Start countdown timer for memorization
    this.timeRemaining = this.memorizeTime;
    this.timerInterval = window.setInterval(() => {
      // Check if game has ended
      if (this.gameEnded || !this.timerInterval) return;
      
      this.timeRemaining--;
      this.updateStats();

      if (this.timeRemaining <= 0) {
        this.startPlayPhase();
      }
    }, 1000);
  }

  private showScrollHint(): void {
    const phaseIndicator = document.getElementById('phaseIndicator');
    if (phaseIndicator) {
      const label = phaseIndicator.querySelector('.phase-label');
      if (label) {
        label.textContent = this.t('games.cardMatch.memorizePhase') + ' 👆👇';
        // Remove hint after 3 seconds
        setTimeout(() => {
          if (this.gamePhase === 'memorize') {
            label.textContent = this.t('games.cardMatch.memorizePhase');
          }
        }, 3000);
      }
    }
  }

  private startPlayPhase(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    
    this.gamePhase = 'play';
    this.canFlip = true;
    
    // Hide all cards
    this.cards.forEach(card => {
      if (!card.matched) {
        card.flipped = false;
      }
    });
    
    this.renderCards();
    
    // Update phase indicator and hide countdown
    const phaseIndicator = document.getElementById('phaseIndicator');
    const countdownDisplay = document.getElementById('countdownDisplay');
    if (phaseIndicator) {
      phaseIndicator.querySelector('.phase-label')!.textContent = this.t('games.cardMatch.playPhase');
    }
    if (countdownDisplay) {
      countdownDisplay.style.display = 'none';
    }
    
    // Start play timer
    this.timeRemaining = this.timeLimit;
    this.updateStats();
    this.timerInterval = window.setInterval(() => {
      // Check if game has ended
      if (this.gameEnded || !this.timerInterval) return;
      
      this.timeRemaining--;
      this.updateStats();

      if (this.timeRemaining <= 0) {
        this.endGame(false);
      }
    }, 1000);
    
    // Notify GameManager that game has started
    window.dispatchEvent(new CustomEvent('gameFirstInteraction'));
  }

  private renderCards(): void {
    const container = document.getElementById('cardsContainer');
    if (!container) return;

    container.innerHTML = '';
    
    // Dynamic grid columns based on number of cards - scales infinitely!
    const totalCards = this.cards.length;
    let columns = 4;
    
    // Desktop: scale columns based on card count
    if (totalCards <= 12) columns = 4;
    else if (totalCards <= 20) columns = 5;
    else if (totalCards <= 30) columns = 6;
    else if (totalCards <= 42) columns = 7;
    else if (totalCards <= 56) columns = 8;
    else if (totalCards <= 72) columns = 9;
    else columns = 10; // For 72+ cards

    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.dataset.columns = columns.toString(); // Store for CSS media queries

    this.cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.dataset.id = card.id.toString();

      // During memorize phase, show all cards
      // During play phase, show only flipped or matched cards
      if (this.gamePhase === 'memorize' || card.flipped || card.matched) {
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
    // Only allow clicks during play phase and if game hasn't ended
    if (!this.canFlip || this.gamePhase !== 'play' || this.gameEnded || !this.timerInterval) return;

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
          // All pairs found! Stop timer and end game
          this.gameEnded = true;
          if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
          }
          // Give a moment to see the final match before ending
          setTimeout(() => {
            this.endGame(true);
          }, 500);
        } else {
          // Continue playing
          this.flippedCards = [];
          this.canFlip = true;
          this.renderCards();
        }
      } else {
        // No match
        card1.flipped = false;
        card2.flipped = false;
        this.mistakes++;
        this.updateStats();
        this.flippedCards = [];
        this.canFlip = true;
        this.renderCards();
      }
    }, 800);
  }

  private updateStats(): void {
    const pairsEl = document.getElementById('pairsFound');
    const timeEl = document.getElementById('timeRemaining');
    const mistakesEl = document.getElementById('mistakeCount');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const countdownNumber = document.querySelector('.countdown-number');

    if (pairsEl) pairsEl.textContent = `${this.pairsFound}/${this.totalPairs}`;
    if (timeEl) {
      timeEl.textContent = `${this.timeRemaining}s`;
      // Warning color kicks in at 30% of time remaining or 5 seconds, whichever is less
      const warningThreshold = this.gamePhase === 'memorize' 
        ? Math.max(1, Math.floor(this.memorizeTime * 0.3))
        : Math.max(5, Math.floor(this.timeLimit * 0.3));
      if (this.timeRemaining <= warningThreshold) {
        timeEl.style.color = '#ef4444';
      }
    }
    if (mistakesEl) mistakesEl.textContent = this.mistakes.toString();

    // Update countdown display during memorize phase
    if (this.gamePhase === 'memorize' && countdownDisplay && countdownNumber) {
      countdownNumber.textContent = this.timeRemaining.toString();
      
      // Add urgency classes based on time remaining
      if (this.timeRemaining <= 1) {
        countdownNumber.className = 'countdown-number countdown-critical';
      } else if (this.timeRemaining <= 2) {
        countdownNumber.className = 'countdown-number countdown-warning';
      } else {
        countdownNumber.className = 'countdown-number';
      }
    }
  }

  private endGame(won: boolean): void {
    // Mark game as ended to stop all timers
    this.gameEnded = true;
    
    // Clear timer if it's still running
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    // Prevent any further interaction
    this.canFlip = false;

    // totalAttempts is already tracked correctly (each card flip = 1 attempt)
    // correctAttempts is already tracked correctly (each successful match = 1)
    // mistakes is already tracked correctly (each wrong match = 1)
    
    // If time ran out, give partial credit
    if (!won) {
      // Player didn't finish, but we have accurate stats already
      // totalAttempts = actual flips made
      // correctAttempts = pairs found
      // This will naturally give a lower success rate
    }

    // Complete the game and progress to next level
    this.completeGame();
  }

  destroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
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
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .phase-indicator {
        text-align: center;
        padding: 1rem;
        margin: 1rem 0;
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        border-radius: var(--radius-lg);
        animation: pulseFade 2s ease-in-out infinite;
        position: relative;
      }

      .phase-label {
        font-size: 1.25rem;
        font-weight: 600;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        display: block;
        margin-bottom: 0.5rem;
      }

      .countdown-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.75rem;
        gap: 0.25rem;
      }

      .countdown-number {
        font-size: 4rem;
        font-weight: 800;
        color: white;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        line-height: 1;
        animation: countdownPulse 1s ease-in-out infinite;
        font-family: 'Arial Black', sans-serif;
        min-width: 80px;
        transition: all 0.3s ease;
      }

      .countdown-number.countdown-warning {
        color: #fbbf24;
        animation: countdownWarning 0.5s ease-in-out infinite;
      }

      .countdown-number.countdown-critical {
        color: #ef4444;
        animation: countdownCritical 0.3s ease-in-out infinite;
      }

      .countdown-text {
        font-size: 0.875rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      @keyframes pulseFade {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.9; transform: scale(1.02); }
      }

      @keyframes countdownPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      @keyframes countdownWarning {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }

      @keyframes countdownCritical {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(-5deg); }
        75% { transform: scale(1.2) rotate(5deg); }
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
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.5rem;
        scrollbar-width: thin;
        scrollbar-color: var(--primary) #e2e8f0;
        position: relative;
        border-radius: var(--radius-md);
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
      }

      /* Scroll indicator shadow for better UX */
      .cards-container::before {
        content: '';
        position: sticky;
        top: -0.5rem;
        left: 0;
        right: 0;
        height: 20px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.9), transparent);
        z-index: 1;
        pointer-events: none;
        display: none;
      }

      .cards-container::after {
        content: '';
        position: sticky;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        height: 20px;
        background: linear-gradient(to top, rgba(255,255,255,0.9), transparent);
        z-index: 1;
        pointer-events: none;
        display: none;
      }

      .cards-container::-webkit-scrollbar {
        width: 10px;
      }

      .cards-container::-webkit-scrollbar-track {
        background: #e2e8f0;
        border-radius: 5px;
        margin: 0.5rem 0;
      }

      .cards-container::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 5px;
        border: 2px solid #e2e8f0;
      }

      .cards-container::-webkit-scrollbar-thumb:hover {
        background: var(--primary-dark);
      }

      .card {
        aspect-ratio: 3/4;
        perspective: 1000px;
        cursor: pointer;
        min-width: 50px;
        min-height: 67px;
        max-width: 120px;
        max-height: 160px;
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
          max-height: 65vh; /* Slightly shorter on tablets for better visibility */
        }

        .cards-container::-webkit-scrollbar {
          width: 8px;
        }

        /* Dynamic columns on tablet based on card count */
        .cards-container[data-columns="4"],
        .cards-container[data-columns="5"] {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        
        .cards-container[data-columns="6"],
        .cards-container[data-columns="7"] {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        
        .cards-container[data-columns="8"],
        .cards-container[data-columns="9"],
        .cards-container[data-columns="10"] {
          grid-template-columns: repeat(5, 1fr) !important;
        }

        .card {
          min-width: 55px;
          min-height: 73px;
          max-width: 100px;
          max-height: 133px;
          /* Ensure touch targets are at least 44x44px */
          touch-action: manipulation;
        }

        .card-front,
        .card-back {
          font-size: 1.75rem;
        }
      }

      /* Extra small devices (phones in portrait) */
      @media (max-width: 480px) {
        .card-match-game {
          padding: 0.5rem;
        }

        .cards-container {
          gap: 0.35rem;
          margin-top: 0.75rem;
          max-height: 60vh; /* More room for stats and instructions on mobile */
        }

        .cards-container::-webkit-scrollbar {
          width: 6px;
        }

        .cards-container::-webkit-scrollbar-track {
          background: #e2e8f0;
          border-radius: 3px;
        }

        .cards-container::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 3px;
          border: 1px solid #e2e8f0;
        }

        /* Dynamic columns on mobile based on card count */
        .cards-container[data-columns="4"] {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        
        .cards-container[data-columns="5"],
        .cards-container[data-columns="6"] {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        
        .cards-container[data-columns="7"],
        .cards-container[data-columns="8"],
        .cards-container[data-columns="9"],
        .cards-container[data-columns="10"] {
          grid-template-columns: repeat(5, 1fr) !important;
        }

        .card {
          min-width: 50px;
          min-height: 67px;
          max-width: 85px;
          max-height: 113px;
        }

        .card-front,
        .card-back {
          font-size: 1.5rem;
          border-width: 2px;
        }

        .stat-label {
          font-size: 0.7rem;
        }

        .stat-value {
          font-size: 1.1rem;
        }

        .phase-label {
          font-size: 1rem;
        }

        .phase-indicator {
          padding: 0.75rem;
          margin: 0.5rem 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

