import { BaseGame } from './BaseGame';

interface GameObject {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'star';
  color: string;
  x: number;
  y: number;
  size: number;
}

interface Round {
  objects: GameObject[];
  changedObjectId: number;
  changeType: 'color' | 'position' | 'size' | 'removed';
}

export class ChangeDetectionGame extends BaseGame {
  private currentRound: Round | null = null;
  private objectCount: number = 4;
  private viewingTime: number = 3000; // ms
  private blankTime: number = 500; // ms
  private totalRounds: number = 10;
  private currentRoundNumber: number = 0;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private gamePhase: 'viewing' | 'blank' | 'changed' = 'viewing';
  
  private colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  private canvasSize = 500;

  start(): void {
    this.calculateDifficulty();
    this.initializeGame();
    this.startNextRound();
  }

  private calculateDifficulty(): void {
    // Difficulty 1-3: 3-4 objects, easy changes
    // Difficulty 4-7: 5-7 objects, medium changes
    // Difficulty 8+: 8-12 objects, subtle changes
    
    if (this.difficulty <= 3) {
      this.objectCount = 3 + Math.floor(this.difficulty * 0.3);
      this.viewingTime = 3500;
      this.totalRounds = 8;
    } else if (this.difficulty <= 7) {
      this.objectCount = 5 + Math.floor((this.difficulty - 4) * 0.5);
      this.viewingTime = 3000;
      this.totalRounds = 10;
    } else {
      this.objectCount = 8 + Math.floor((this.difficulty - 8) * 0.4);
      this.viewingTime = 2500;
      this.totalRounds = 12;
    }

    this.objectCount = Math.min(this.objectCount, 15);
  }

  private initializeGame(): void {
    this.container.innerHTML = `
      <div class="change-detection-game">
        <div class="game-header">
          <h3>${this.t('games.changeDetection.name')}</h3>
        </div>

        <div class="instructions-panel">
          <p>${this.t('games.changeDetection.instructions')}</p>
          <div class="round-counter">
            ${this.t('games.changeDetection.round')}: <span id="roundNumber">1</span>/${this.totalRounds}
          </div>
        </div>

        <div class="canvas-container">
          <canvas id="gameCanvas" width="${this.canvasSize}" height="${this.canvasSize}"></canvas>
          <div class="phase-message" id="phaseMessage"></div>
        </div>

        <div class="stats-panel">
          <div class="stat">
            <span class="stat-label">${this.t('gameUI.score')}:</span>
            <span class="stat-value" id="scoreDisplay">0/${this.totalRounds}</span>
          </div>
          <div class="stat">
            <span class="stat-label">${this.t('gameUI.accuracy')}:</span>
            <span class="stat-value" id="accuracyDisplay">-</span>
          </div>
        </div>
      </div>
    `;

    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext('2d') ?? null;

    if (this.canvas) {
      this.canvas.addEventListener('click', this.handleCanvasClick);
    }

    this.addGameStyles();
  }

  private startNextRound(): void {
    if (this.currentRoundNumber >= this.totalRounds) {
      this.endGame();
      return;
    }

    if (this.currentRoundNumber === 0) {
      window.dispatchEvent(new CustomEvent('gameFirstInteraction'));
    }

    this.currentRoundNumber++;
    this.updateRoundDisplay();
    
    this.currentRound = this.generateRound();
    this.totalAttempts++;
    
    // Show original scene
    this.gamePhase = 'viewing';
    this.updatePhaseMessage(this.t('games.changeDetection.memorize'));
    this.drawScene(this.currentRound.objects);

    // After viewing time, show blank screen
    setTimeout(() => {
      this.gamePhase = 'blank';
      this.clearCanvas();
      this.updatePhaseMessage('');

      // After blank time, show changed scene
      setTimeout(() => {
        this.gamePhase = 'changed';
        this.updatePhaseMessage(this.t('games.changeDetection.findChange'));
        const changedObjects = this.applyChange(this.currentRound!);
        this.drawScene(changedObjects);
      }, this.blankTime);
    }, this.viewingTime);
  }

  private generateRound(): Round {
    const objects: GameObject[] = [];
    const padding = 50;
    
    for (let i = 0; i < this.objectCount; i++) {
      const obj: GameObject = {
        id: i,
        type: this.getRandomType(),
        color: this.getRandomColor(),
        x: padding + Math.random() * (this.canvasSize - 2 * padding),
        y: padding + Math.random() * (this.canvasSize - 2 * padding),
        size: 40 + Math.random() * 30
      };
      objects.push(obj);
    }

    const changedObjectId = Math.floor(Math.random() * this.objectCount);
    const changeTypes: Array<'color' | 'position' | 'size'> = ['color', 'position', 'size'];
    const changeType = changeTypes[Math.floor(Math.random() * changeTypes.length)];

    return {
      objects,
      changedObjectId,
      changeType
    };
  }

  private getRandomType(): 'circle' | 'square' | 'triangle' | 'star' {
    const types: Array<'circle' | 'square' | 'triangle' | 'star'> = ['circle', 'square', 'triangle', 'star'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private applyChange(round: Round): GameObject[] {
    const changedObjects = JSON.parse(JSON.stringify(round.objects)) as GameObject[];
    const objToChange = changedObjects[round.changedObjectId];

    switch (round.changeType) {
      case 'color':
        let newColor: string;
        do {
          newColor = this.getRandomColor();
        } while (newColor === objToChange.color);
        objToChange.color = newColor;
        break;
        
      case 'position':
        objToChange.x = 50 + Math.random() * (this.canvasSize - 100);
        objToChange.y = 50 + Math.random() * (this.canvasSize - 100);
        break;
        
      case 'size':
        objToChange.size = objToChange.size > 50 ? objToChange.size * 0.6 : objToChange.size * 1.5;
        break;
    }

    return changedObjects;
  }

  private drawScene(objects: GameObject[]): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = '#f8fafc';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw objects
    objects.forEach(obj => {
      this.drawObject(obj);
    });
  }

  private drawObject(obj: GameObject): void {
    if (!this.ctx) return;

    this.ctx.fillStyle = obj.color;
    this.ctx.strokeStyle = '#1e293b';
    this.ctx.lineWidth = 2;

    this.ctx.save();
    this.ctx.translate(obj.x, obj.y);

    switch (obj.type) {
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(0, 0, obj.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        break;
        
      case 'square':
        this.ctx.fillRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
        this.ctx.strokeRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
        break;
        
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(0, -obj.size / 2);
        this.ctx.lineTo(obj.size / 2, obj.size / 2);
        this.ctx.lineTo(-obj.size / 2, obj.size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        break;
        
      case 'star':
        this.drawStar(obj.size / 2);
        break;
    }

    this.ctx.restore();
  }

  private drawStar(radius: number): void {
    if (!this.ctx) return;

    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius * 0.5;

    this.ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private clearCanvas(): void {
    if (!this.ctx || !this.canvas) return;
    this.ctx.fillStyle = '#f8fafc';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private isPointInObject(clickX: number, clickY: number, obj: GameObject): boolean {
    const dx = clickX - obj.x;
    const dy = clickY - obj.y;

    switch (obj.type) {
      case 'circle':
        // Distance-based detection for circles
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= obj.size / 2;

      case 'square':
        // Bounding box detection for squares
        return Math.abs(dx) <= obj.size / 2 && Math.abs(dy) <= obj.size / 2;

      case 'triangle':
        // Point-in-triangle detection using barycentric coordinates
        const x1 = 0, y1 = -obj.size / 2;
        const x2 = obj.size / 2, y2 = obj.size / 2;
        const x3 = -obj.size / 2, y3 = obj.size / 2;
        
        const area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
        const s = Math.abs((x1 - x3) * (dy - y3) - (dx - x3) * (y1 - y3));
        const t = Math.abs((dx - x1) * (y2 - y1) - (x2 - x1) * (dy - y1));
        
        return s + t <= area;

      case 'star':
        // Distance-based detection with slightly larger radius for star
        const starDistance = Math.sqrt(dx * dx + dy * dy);
        return starDistance <= obj.size / 2 * 1.2;

      default:
        return false;
    }
  }

  private handleCanvasClick = (event: MouseEvent): void => {
    if (this.gamePhase !== 'changed' || !this.currentRound || !this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Scale to canvas coordinates
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const canvasX = clickX * scaleX;
    const canvasY = clickY * scaleY;

    // Check which object was clicked
    const changedObjects = this.applyChange(this.currentRound);
    let clickedObjectId = -1;

    for (let i = changedObjects.length - 1; i >= 0; i--) {
      const obj = changedObjects[i];
      
      if (this.isPointInObject(canvasX, canvasY, obj)) {
        clickedObjectId = obj.id;
        break;
      }
    }

    if (clickedObjectId === -1) return;

    const correct = clickedObjectId === this.currentRound.changedObjectId;

    if (correct) {
      this.correctAttempts++;
      this.showFeedback(true, canvasX, canvasY);
    } else {
      this.mistakes++;
      this.showFeedback(false, canvasX, canvasY);
    }

    this.updateStats();

    setTimeout(() => {
      this.startNextRound();
    }, 1500);
  };

  private showFeedback(correct: boolean, x: number, y: number): void {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.strokeStyle = correct ? '#10b981' : '#ef4444';
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 50, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private updatePhaseMessage(message: string): void {
    const phaseMessage = document.getElementById('phaseMessage');
    if (phaseMessage) {
      phaseMessage.textContent = message;
    }
  }

  private updateRoundDisplay(): void {
    const roundNumber = document.getElementById('roundNumber');
    if (roundNumber) {
      roundNumber.textContent = this.currentRoundNumber.toString();
    }
  }

  private updateStats(): void {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const accuracyDisplay = document.getElementById('accuracyDisplay');

    if (scoreDisplay) {
      scoreDisplay.textContent = `${this.correctAttempts}/${this.totalRounds}`;
    }

    if (accuracyDisplay) {
      const accuracy = this.totalAttempts > 0 
        ? Math.round((this.correctAttempts / this.totalAttempts) * 100)
        : 0;
      accuracyDisplay.textContent = `${accuracy}%`;
    }
  }

  private endGame(): void {
    if (this.canvas) {
      this.canvas.removeEventListener('click', this.handleCanvasClick);
    }
    
    this.completeGame();
  }

  destroy(): void {
    if (this.canvas) {
      this.canvas.removeEventListener('click', this.handleCanvasClick);
    }
  }

  private addGameStyles(): void {
    if (document.getElementById('change-detection-styles')) return;

    const style = document.createElement('style');
    style.id = 'change-detection-styles';
    style.textContent = `
      .change-detection-game {
        max-width: 700px;
        margin: 0 auto;
        padding: 2rem;
      }

      .game-header {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .game-header h3 {
        font-size: 2rem;
        color: var(--text-primary);
      }

      .instructions-panel {
        background: var(--bg-card);
        padding: 1rem;
        border-radius: var(--radius-md);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .instructions-panel p {
        color: var(--text-secondary);
        margin-bottom: 0.75rem;
      }

      .round-counter {
        font-weight: 600;
        color: var(--primary);
        font-size: 1.1rem;
      }

      .canvas-container {
        position: relative;
        background: var(--bg-card);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px var(--shadow);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      #gameCanvas {
        border: 3px solid var(--border);
        border-radius: var(--radius-md);
        cursor: pointer;
        max-width: 100%;
        height: auto;
      }

      .phase-message {
        margin-top: 1rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--primary);
        min-height: 30px;
        text-align: center;
      }

      .stats-panel {
        display: flex;
        justify-content: center;
        gap: 3rem;
        margin-top: 1.5rem;
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

      @media (max-width: 768px) {
        .change-detection-game {
          padding: 1rem;
        }

        #gameCanvas {
          width: 100%;
          height: auto;
        }

        .stats-panel {
          gap: 2rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

