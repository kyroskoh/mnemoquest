import { BaseGame } from './BaseGame';

interface GridCell {
  index: number;
  hasSymbol: boolean;
  symbol: string;
}

export class MemoryGridGame extends BaseGame {
  private gridSize: number = 3;
  private cells: GridCell[] = [];
  private symbolPositions: number[] = [];
  private gameState: 'showing' | 'recalling' | 'complete' = 'showing';
  private round: number = 0;
  private maxRounds: number = 5;

  start(): void {
    this.gridSize = Math.min(6, Math.max(3, Math.floor(2 + this.difficulty * 0.4)));
    this.initializeGame();
    this.startRound();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="memory-grid-game">
        <div class="game-instructions">
          <h3>${this.t('gameUI.round')} <span id="roundNumber">1</span>/${this.maxRounds}</h3>
          <p id="instructionText">${this.t('games.memoryGrid.instructions')}</p>
          <div class="game-stats">
            <div class="stat-item">
              <span class="stat-label">${this.t('gameUI.accuracy')}:</span>
              <span class="stat-value" id="accuracyDisplay">100%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">${this.t('gameUI.mistakes')}:</span>
              <span class="stat-value" id="mistakesDisplay">0</span>
            </div>
          </div>
        </div>
        <div class="grid-container" id="gridContainer"></div>
        <div class="game-controls" id="gameControls">
          <button class="game-btn" id="readyBtn" style="display: none.">${this.t('gameUI.ready')}</button>
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

    // Generate grid
    this.generateGrid();

    // Show symbols
    this.showSymbols();
  }

  private generateGrid(): void {
    const totalCells = this.gridSize * this.gridSize;
    this.cells = [];

    // Determine how many symbols to show (2-4 symbols depending on grid size)
    const numSymbols = Math.min(totalCells - 1, Math.max(2, Math.floor(this.gridSize * 0.8)));
    
    // Generate random positions for symbols
    this.symbolPositions = [];
    const symbols = ['🌟', '💎', '🎯', '⭐', '🔥', '✨', '💫', '🎨'];
    
    while (this.symbolPositions.length < numSymbols) {
      const pos = Math.floor(Math.random() * totalCells);
      if (!this.symbolPositions.includes(pos)) {
        this.symbolPositions.push(pos);
      }
    }

    // Create cells
    for (let i = 0; i < totalCells; i++) {
      const hasSymbol = this.symbolPositions.includes(i);
      this.cells.push({
        index: i,
        hasSymbol,
        symbol: hasSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : ''
      });
    }

    this.renderGrid();
  }

  private renderGrid(): void {
    const container = document.getElementById('gridContainer');
    if (!container) return;

    // Set grid template columns only if not already set or if it changed
    const expectedTemplate = `repeat(${this.gridSize}, 1fr)`;
    if (container.style.gridTemplateColumns !== expectedTemplate) {
      container.style.gridTemplateColumns = expectedTemplate;
    }
    
    container.innerHTML = '';

    this.cells.forEach((cell, index) => {
      const cellEl = document.createElement('div');
      cellEl.className = 'grid-cell';
      cellEl.dataset.index = index.toString();
      
      if (this.gameState === 'showing' && cell.hasSymbol) {
        cellEl.classList.add('has-symbol');
        cellEl.textContent = cell.symbol;
      }

      if (this.gameState === 'recalling') {
        cellEl.addEventListener('click', () => this.handleCellClick(index));
      }

      container.appendChild(cellEl);
    });
  }

  private showSymbols(): void {
    this.gameState = 'showing';
    const instructionEl = document.getElementById('instructionText');
    
    if (instructionEl) {
      instructionEl.textContent = this.t('games.memoryGrid.instructions');
    }

    this.renderGrid();

    // Calculate visibility duration based on difficulty (3s to 1s)
    const duration = Math.max(1000, 3000 - (this.difficulty * 200));

    setTimeout(() => {
      this.hideSymbols();
    }, duration);
  }

  private hideSymbols(): void {
    this.gameState = 'recalling';
    const instructionEl = document.getElementById('instructionText');
    
    if (instructionEl) {
      instructionEl.textContent = this.t('games.memoryGrid.recall');
    }

    this.renderGrid();
  }

  private handleCellClick(index: number): void {
    if (this.gameState !== 'recalling') return;

    const cellEl = document.querySelector(`.grid-cell[data-index="${index}"]`);
    if (!cellEl) return;

    // Check if already clicked
    if (cellEl.classList.contains('clicked')) return;

    cellEl.classList.add('clicked');

    const cell = this.cells[index];
    
    if (cell.hasSymbol) {
      cellEl.classList.add('correct');
      cellEl.textContent = cell.symbol;
      this.correctAttempts++;
    } else {
      cellEl.classList.add('incorrect');
      cellEl.textContent = '❌';
      this.mistakes++;
    }

    // Update stats display
    this.updateStatsDisplay();

    // Check if all symbols found
    const clickedSymbols = document.querySelectorAll('.grid-cell.correct').length;
    if (clickedSymbols === this.symbolPositions.length) {
      setTimeout(() => {
        this.nextRound();
      }, 1000);
    }
  }

  private updateStatsDisplay(): void {
    const totalClicks = this.correctAttempts + this.mistakes;
    const accuracy = totalClicks > 0 
      ? Math.round((this.correctAttempts / totalClicks) * 100)
      : 100;
    
    const accuracyEl = document.getElementById('accuracyDisplay');
    const mistakesEl = document.getElementById('mistakesDisplay');
    
    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
    if (mistakesEl) mistakesEl.textContent = this.mistakes.toString();
  }

  private nextRound(): void {
    if (this.round >= this.maxRounds) {
      this.endGame();
    } else {
      this.startRound();
    }
  }

  private endGame(): void {
    this.gameState = 'complete';
    this.completeGame();
  }

  destroy(): void {
    // Clean up event listeners
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      cell.replaceWith(cell.cloneNode(true));
    });
  }

  private addGameStyles(): void {
    if (document.getElementById('memory-grid-styles')) return;

    const style = document.createElement('style');
    style.id = 'memory-grid-styles';
    style.textContent = `
      .memory-grid-game {
        padding: 2rem;
        text-align: center;
      }

      .game-instructions {
        margin-bottom: 2rem;
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

      .game-stats {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin-top: 1rem;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-lg);
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-weight: 500;
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
      }

      .grid-container {
        display: grid;
        gap: 0.75rem;
        max-width: 500px;
        margin: 0 auto;
        padding: 1rem;
      }

      .grid-cell {
        aspect-ratio: 1;
        background: var(--bg-secondary);
        border: 3px solid var(--border);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        user-select: none;
      }

      .grid-cell:hover {
        transform: scale(1.05);
        border-color: var(--primary-light);
      }

      .grid-cell.has-symbol {
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        border-color: var(--primary);
        animation: pulse 0.5s ease;
      }

      .grid-cell.clicked {
        cursor: not-allowed;
      }

      .grid-cell.correct {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #059669;
        animation: bounce 0.5s ease;
      }

      .grid-cell.incorrect {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border-color: #dc2626;
        animation: shake 0.5s ease;
      }

      .game-controls {
        margin-top: 2rem;
      }

      .game-btn {
        padding: 1rem 2rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1.125rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
      }

      .game-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
    `;
    document.head.appendChild(style);
  }
}

