import { BaseGame } from './BaseGame';

interface PathStep {
  row: number;
  col: number;
  direction?: string;
}

export class PatternPathGame extends BaseGame {
  private gridSize: number = 5;
  private path: PathStep[] = [];
  private playerPath: PathStep[] = [];
  private pathLength: number = 4;
  private displayTime: number = 3000;
  private gameState: 'showing' | 'recalling' | 'complete' = 'showing';
  private round: number = 0;
  private maxRounds: number = 5;

  start(): void {
    // Calculate difficulty
    this.gridSize = Math.min(10, Math.max(5, Math.floor(5 + this.difficulty * 0.5)));
    this.pathLength = Math.min(15, Math.max(4, Math.floor(4 + this.difficulty * 1.1)));
    this.displayTime = Math.max(1200, 3000 - (this.difficulty * 180));
    
    this.initializeGame();
    this.startRound();
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="pattern-path-game">
        <div class="game-instructions">
          <h3>${this.t('games.patternPath.name')}</h3>
          <p id="instructionText">${this.t('games.patternPath.instructions')}</p>
          <div class="round-indicator">${this.t('gameUI.round')} <span id="roundNumber">1</span>/${this.maxRounds}</div>
        </div>
        <div class="path-grid-container" id="pathGridContainer"></div>
        <div class="game-controls" id="gameControls">
          <button class="control-btn" id="clearBtn" style="display: none;">${this.t('games.patternPath.clear')}</button>
          <button class="control-btn" id="submitBtn" style="display: none;">${this.t('games.patternPath.submit')}</button>
        </div>
      </div>
    `;

    this.addGameStyles();
  }

  private startRound(): void {
    this.round++;
    this.totalAttempts++;
    this.playerPath = [];

    const roundEl = document.getElementById('roundNumber');
    if (roundEl) roundEl.textContent = this.round.toString();

    this.generatePath();
    this.renderGrid();
    this.showPath();
  }

  private generatePath(): void {
    this.path = [];
    
    // Random starting position
    const startRow = Math.floor(Math.random() * this.gridSize);
    const startCol = Math.floor(Math.random() * this.gridSize);
    
    this.path.push({ row: startRow, col: startCol });

    // Generate path with valid moves (no diagonals, no repeats)
    for (let i = 1; i < this.pathLength; i++) {
      const lastStep = this.path[this.path.length - 1];
      const possibleMoves: PathStep[] = [];

      // Check all 4 directions
      const directions = [
        { row: lastStep.row - 1, col: lastStep.col, dir: '↑' }, // Up
        { row: lastStep.row + 1, col: lastStep.col, dir: '↓' }, // Down
        { row: lastStep.row, col: lastStep.col - 1, dir: '←' }, // Left
        { row: lastStep.row, col: lastStep.col + 1, dir: '→' }  // Right
      ];

      for (const dir of directions) {
        // Check if move is valid (within grid and not visited)
        if (
          dir.row >= 0 && dir.row < this.gridSize &&
          dir.col >= 0 && dir.col < this.gridSize &&
          !this.path.some(p => p.row === dir.row && p.col === dir.col)
        ) {
          possibleMoves.push({ row: dir.row, col: dir.col, direction: dir.dir });
        }
      }

      if (possibleMoves.length === 0) {
        // Dead end, regenerate from scratch
        this.generatePath();
        return;
      }

      // Pick random valid move
      const nextMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      this.path.push(nextMove);
    }
  }

  private renderGrid(): void {
    const container = document.getElementById('pathGridContainer');
    if (!container) return;

    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'path-cell';
        cell.dataset.row = row.toString();
        cell.dataset.col = col.toString();

        if (this.gameState === 'recalling') {
          cell.addEventListener('click', () => this.handleCellClick(row, col));
        }

        container.appendChild(cell);
      }
    }
  }

  private async showPath(): Promise<void> {
    this.gameState = 'showing';
    const instructionEl = document.getElementById('instructionText');
    
    if (instructionEl) {
      instructionEl.textContent = this.t('games.patternPath.watch');
    }

    const container = document.getElementById('pathGridContainer');
    if (!container) return;

    // Show path step by step
    for (let i = 0; i < this.path.length; i++) {
      const step = this.path[i];
      const cell = this.getCellElement(step.row, step.col);
      
      if (cell) {
        cell.classList.add('path-active');
        cell.textContent = (i + 1).toString();
        
        // Add direction arrow
        if (step.direction) {
          const arrow = document.createElement('span');
          arrow.className = 'direction-arrow';
          arrow.textContent = step.direction;
          cell.appendChild(arrow);
        }
      }

      await this.wait(this.displayTime / this.path.length);
    }

    // Keep path visible for a moment
    await this.wait(1000);

    // Hide path
    this.hidePath();
    this.enableRecall();
  }

  private hidePath(): void {
    const container = document.getElementById('pathGridContainer');
    if (!container) return;

    const cells = container.querySelectorAll('.path-cell');
    cells.forEach(cell => {
      cell.classList.remove('path-active');
      cell.textContent = '';
    });
  }

  private enableRecall(): void {
    this.gameState = 'recalling';
    const instructionEl = document.getElementById('instructionText');
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (instructionEl) {
      instructionEl.textContent = this.t('games.patternPath.recall');
    }

    if (clearBtn) {
      clearBtn.style.display = 'inline-block';
      clearBtn.onclick = () => this.clearPath();
    }

    if (submitBtn) {
      submitBtn.style.display = 'inline-block';
      submitBtn.onclick = () => this.submitPath();
    }

    this.renderGrid();
  }

  private handleCellClick(row: number, col: number): void {
    if (this.gameState !== 'recalling') return;

    const cell = this.getCellElement(row, col);
    if (!cell) return;

    // Check if already in path
    const alreadySelected = this.playerPath.some(p => p.row === row && p.col === col);
    if (alreadySelected) return;

    // Check if adjacent to last cell (or is first cell)
    if (this.playerPath.length > 0) {
      const lastStep = this.playerPath[this.playerPath.length - 1];
      const isAdjacent = 
        (Math.abs(row - lastStep.row) === 1 && col === lastStep.col) ||
        (Math.abs(col - lastStep.col) === 1 && row === lastStep.row);
      
      if (!isAdjacent) {
        this.showError(cell);
        return;
      }
    }

    // Add to path
    this.playerPath.push({ row, col });
    cell.classList.add('player-selected');
    cell.textContent = this.playerPath.length.toString();
  }

  private showError(cell: HTMLElement): void {
    cell.classList.add('error-flash');
    setTimeout(() => {
      cell.classList.remove('error-flash');
    }, 500);
  }

  private clearPath(): void {
    this.playerPath = [];
    const container = document.getElementById('pathGridContainer');
    if (!container) return;

    const cells = container.querySelectorAll('.path-cell');
    cells.forEach(cell => {
      cell.classList.remove('player-selected');
      cell.textContent = '';
    });
  }

  private submitPath(): void {
    if (this.playerPath.length === 0) {
      return;
    }

    this.checkPath();
  }

  private checkPath(): void {
    const container = document.getElementById('pathGridContainer');
    if (!container) return;

    let correctSteps = 0;
    const minLength = Math.min(this.path.length, this.playerPath.length);

    // Check each step
    for (let i = 0; i < this.path.length; i++) {
      const correctStep = this.path[i];
      const playerStep = this.playerPath[i];
      const cell = this.getCellElement(correctStep.row, correctStep.col);
      
      if (!cell) continue;

      cell.classList.add('correct-path');
      cell.textContent = (i + 1).toString();

      if (playerStep && correctStep.row === playerStep.row && correctStep.col === playerStep.col) {
        correctSteps++;
        cell.classList.add('player-correct');
      }
    }

    // Mark player's wrong cells
    this.playerPath.forEach((playerStep, index) => {
      const correctStep = this.path[index];
      if (!correctStep || playerStep.row !== correctStep.row || playerStep.col !== correctStep.col) {
        const cell = this.getCellElement(playerStep.row, playerStep.col);
        if (cell) {
          cell.classList.add('player-incorrect');
        }
      }
    });

    // Calculate score
    const accuracy = correctSteps / this.path.length;
    
    if (accuracy === 1) {
      this.correctAttempts++;
    } else if (accuracy >= 0.5) {
      this.correctAttempts += accuracy;
      this.mistakes += (1 - accuracy);
    } else {
      this.mistakes++;
    }

    // Hide buttons
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'none';

    setTimeout(() => {
      if (this.round >= this.maxRounds) {
        this.endGame();
      } else {
        this.startRound();
      }
    }, 2500);
  }

  private getCellElement(row: number, col: number): HTMLElement | null {
    return document.querySelector(`.path-cell[data-row="${row}"][data-col="${col}"]`);
  }

  private endGame(): void {
    this.gameState = 'complete';
    this.completeGame();
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  destroy(): void {
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (clearBtn) clearBtn.replaceWith(clearBtn.cloneNode(true));
    if (submitBtn) submitBtn.replaceWith(submitBtn.cloneNode(true));
  }

  private addGameStyles(): void {
    if (document.getElementById('pattern-path-styles')) return;

    const style = document.createElement('style');
    style.id = 'pattern-path-styles';
    style.textContent = `
      .pattern-path-game {
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
        margin-bottom: 0.5rem;
      }

      .round-indicator {
        font-size: 1rem;
        font-weight: 600;
        color: var(--primary);
        margin-top: 0.5rem;
      }

      .path-grid-container {
        display: grid;
        gap: 0.5rem;
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-lg);
      }

      .path-cell {
        aspect-ratio: 1;
        background: white;
        border: 2px solid var(--border);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }

      .path-cell:hover {
        transform: scale(1.05);
        border-color: var(--primary-light);
      }

      .path-cell.path-active {
        background: linear-gradient(135deg, var(--primary-light), var(--primary));
        border-color: var(--primary-dark);
        color: white;
        animation: pathPulse 0.5s ease;
      }

      .path-cell.player-selected {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        border-color: #1d4ed8;
        color: white;
      }

      .path-cell.correct-path {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #047857;
        color: white;
      }

      .path-cell.player-correct {
        background: linear-gradient(135deg, #10b981, #059669);
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
      }

      .path-cell.player-incorrect {
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border-color: #b91c1c;
        color: white;
        animation: shake 0.5s ease;
      }

      .path-cell.error-flash {
        animation: errorFlash 0.5s ease;
      }

      .direction-arrow {
        position: absolute;
        top: 2px;
        right: 4px;
        font-size: 0.875rem;
        opacity: 0.8;
      }

      .game-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
      }

      .control-btn {
        padding: 0.75rem 2rem;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
      }

      .control-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
      }

      #clearBtn {
        background: linear-gradient(135deg, #6b7280, #4b5563);
      }

      @keyframes pathPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      @keyframes errorFlash {
        0%, 100% { background: white; }
        50% { background: #fee2e2; }
      }

      @media (max-width: 768px) {
        .pattern-path-game {
          padding: 1rem;
        }

        .path-grid-container {
          gap: 0.25rem;
          padding: 0.5rem;
        }

        .path-cell {
          font-size: 1rem;
        }

        .direction-arrow {
          font-size: 0.75rem;
        }

        .control-btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

