import './styles/main.css';
import { GameManager } from './core/GameManager';
import { StorageManager } from './core/StorageManager';
import { UIManager } from './core/UIManager';
import { SoundManager } from './core/SoundManager';

class MnemoQuest {
  private gameManager: GameManager;
  private storageManager: StorageManager;
  private uiManager: UIManager;
  private soundManager: SoundManager;

  constructor() {
    this.storageManager = new StorageManager();
    this.soundManager = new SoundManager(this.storageManager.getSettings().soundEnabled);
    this.uiManager = new UIManager(this.storageManager);
    this.gameManager = new GameManager(this.storageManager, this.uiManager);
    
    this.init();
  }

  private init(): void {
    console.log('🧠 MnemoQuest initialized!');
    
    // Load saved progress
    this.loadProgress();
    
    // Set up navigation
    this.setupNavigation();
    
    // Set up game selection
    this.setupGameSelection();
    
    // Set up settings
    this.setupSettings();
    
    // Update dashboard
    this.uiManager.updateDashboard();
  }

  private loadProgress(): void {
    const progress = this.storageManager.loadProgress();
    console.log('Progress loaded:', progress);
  }

  private setupNavigation(): void {
    const homeBtn = document.getElementById('homeBtn');
    const progressBtn = document.getElementById('progressBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const backBtn = document.getElementById('backBtn');

    homeBtn?.addEventListener('click', () => this.uiManager.showView('dashboard'));
    progressBtn?.addEventListener('click', () => this.uiManager.showView('progress'));
    settingsBtn?.addEventListener('click', () => this.uiManager.showView('settings'));
    aboutBtn?.addEventListener('click', () => this.uiManager.showView('about'));
    backBtn?.addEventListener('click', () => {
      this.gameManager.exitGame();
      this.uiManager.showView('dashboard');
    });
  }

  private setupGameSelection(): void {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
      const playBtn = card.querySelector('.play-btn');
      const gameType = card.getAttribute('data-game');
      
      playBtn?.addEventListener('click', () => {
        if (gameType) {
          this.startGame(gameType);
        }
      });
    });
  }

  private setupSettings(): void {
    const soundToggle = document.getElementById('soundToggle') as HTMLInputElement;
    const colorBlindMode = document.getElementById('colorBlindMode') as HTMLInputElement;
    const animationsToggle = document.getElementById('animationsToggle') as HTMLInputElement;
    const resetBtn = document.getElementById('resetProgressBtn');

    // Load settings
    const settings = this.storageManager.getSettings();
    if (soundToggle) soundToggle.checked = settings.soundEnabled;
    if (colorBlindMode) colorBlindMode.checked = settings.colorBlindMode;
    if (animationsToggle) animationsToggle.checked = settings.animationsEnabled;

    // Save settings on change
    soundToggle?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked;
      this.storageManager.updateSettings({ soundEnabled: enabled });
      this.soundManager.setEnabled(enabled);
    });

    colorBlindMode?.addEventListener('change', (e) => {
      this.storageManager.updateSettings({ colorBlindMode: (e.target as HTMLInputElement).checked });
      document.body.classList.toggle('colorblind-mode', (e.target as HTMLInputElement).checked);
    });

    animationsToggle?.addEventListener('change', (e) => {
      this.storageManager.updateSettings({ animationsEnabled: (e.target as HTMLInputElement).checked });
      document.body.classList.toggle('no-animations', !(e.target as HTMLInputElement).checked);
    });

    resetBtn?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        this.storageManager.resetProgress();
        this.uiManager.updateDashboard();
        alert('Progress reset successfully!');
      }
    });
  }

  private async startGame(gameType: string): Promise<void> {
    this.uiManager.showView('game');
    await this.gameManager.startGame(gameType);
  }
}

// Initialize the app
new MnemoQuest();

