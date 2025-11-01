import './styles/main.css';
import { GameManager } from './core/GameManager';
import { StorageManager } from './core/StorageManager';
import { UIManager } from './core/UIManager';
import { SoundManager } from './core/SoundManager';
import { TranslationManager, SupportedLanguage } from './core/TranslationManager';

class MnemoQuest {
  private gameManager: GameManager;
  private storageManager: StorageManager;
  private uiManager: UIManager;
  private soundManager: SoundManager;
  private translationManager: TranslationManager;

  constructor() {
    this.storageManager = new StorageManager();
    this.soundManager = new SoundManager(this.storageManager.getSettings().soundEnabled);
    this.translationManager = new TranslationManager();
    this.uiManager = new UIManager(this.storageManager);
    this.gameManager = new GameManager(this.storageManager, this.uiManager);
    
    this.init();
  }

  private async init(): Promise<void> {
    console.log('🧠 MnemoQuest initialized!');
    
    // Load saved language
    const savedLang = this.storageManager.getSettings().language as SupportedLanguage;
    await this.translationManager.setLanguage(savedLang || 'en');
    
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
    
    // Apply translations
    this.applyTranslations();
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
    const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
    const resetBtn = document.getElementById('resetProgressBtn');

    // Load settings
    const settings = this.storageManager.getSettings();
    if (soundToggle) soundToggle.checked = settings.soundEnabled;
    if (colorBlindMode) colorBlindMode.checked = settings.colorBlindMode;
    if (animationsToggle) animationsToggle.checked = settings.animationsEnabled;
    
    // Populate language selector
    if (languageSelect) {
      const languages = this.translationManager.getAvailableLanguages();
      languageSelect.innerHTML = languages.map(lang => 
        `<option value="${lang.code}" ${settings.language === lang.code ? 'selected' : ''}>
          ${lang.nativeName} (${lang.name})
        </option>`
      ).join('');
    }

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

    languageSelect?.addEventListener('change', async (e) => {
      const lang = (e.target as HTMLSelectElement).value as SupportedLanguage;
      await this.translationManager.setLanguage(lang);
      this.storageManager.updateSettings({ language: lang });
      this.applyTranslations();
      this.uiManager.updateDashboard();
    });

    resetBtn?.addEventListener('click', () => {
      const confirmMsg = this.translationManager.t('settings.resetConfirm');
      const successMsg = this.translationManager.t('settings.resetSuccess');
      
      if (confirm(confirmMsg)) {
        this.storageManager.resetProgress();
        this.uiManager.updateDashboard();
        alert(successMsg);
      }
    });
  }

  private applyTranslations(): void {
    const t = (key: string) => this.translationManager.t(key);

    // Navigation
    const homeBtn = document.getElementById('homeBtn');
    const progressBtn = document.getElementById('progressBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const aboutBtn = document.getElementById('aboutBtn');

    if (homeBtn) homeBtn.textContent = t('nav.home');
    if (progressBtn) progressBtn.textContent = t('nav.progress');
    if (settingsBtn) settingsBtn.textContent = t('nav.settings');
    if (aboutBtn) aboutBtn.textContent = t('nav.about');

    // Dashboard
    document.querySelector('.hero h2')!.textContent = t('dashboard.welcome');
    document.querySelector('.hero p')!.textContent = t('dashboard.subtitle');

    // Stats labels
    const statLabels = document.querySelectorAll('.stat-content p');
    if (statLabels[0]) statLabels[0].textContent = t('dashboard.totalXP');
    if (statLabels[1]) statLabels[1].textContent = t('dashboard.dayStreak');
    if (statLabels[2]) statLabels[2].textContent = t('dashboard.avgAccuracy');
    if (statLabels[3]) statLabels[3].textContent = t('dashboard.gamesPlayed');

    // Game cards
    document.querySelector('.game-modules h2')!.textContent = t('dashboard.chooseChallenge');
    
    const gameCards = document.querySelectorAll('.game-card');
    if (gameCards[0]) {
      gameCards[0].querySelector('h3')!.textContent = t('games.memoryGrid.name');
      gameCards[0].querySelector('p')!.textContent = t('games.memoryGrid.description');
      gameCards[0].querySelector('.skill-tag')!.textContent = t('games.memoryGrid.skill');
      gameCards[0].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[1]) {
      gameCards[1].querySelector('h3')!.textContent = t('games.sequenceSparks.name');
      gameCards[1].querySelector('p')!.textContent = t('games.sequenceSparks.description');
      gameCards[1].querySelector('.skill-tag')!.textContent = t('games.sequenceSparks.skill');
      gameCards[1].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[2]) {
      gameCards[2].querySelector('h3')!.textContent = t('games.cardMatch.name');
      gameCards[2].querySelector('p')!.textContent = t('games.cardMatch.description');
      gameCards[2].querySelector('.skill-tag')!.textContent = t('games.cardMatch.skill');
      gameCards[2].querySelector('.play-btn')!.textContent = t('games.playNow');
    }

    // Game view
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.textContent = `← ${t('gameUI.backToDashboard')}`;

    // Progress view
    const progressTitle = document.querySelector('#progressView h2');
    if (progressTitle) progressTitle.textContent = t('progress.title');

    // Settings view
    const settingsTitle = document.querySelector('#settingsView h2');
    if (settingsTitle) settingsTitle.textContent = t('settings.title');

    const settingLabels = document.querySelectorAll('.setting-item label span');
    if (settingLabels[0]) settingLabels[0].textContent = t('settings.soundEffects');
    if (settingLabels[1]) settingLabels[1].textContent = t('settings.colorBlindMode');
    if (settingLabels[2]) settingLabels[2].textContent = t('settings.animations');
    if (settingLabels[3]) settingLabels[3].textContent = t('settings.language');

    const resetBtn = document.getElementById('resetProgressBtn');
    if (resetBtn) resetBtn.textContent = t('settings.resetProgress');

    // About view
    const aboutTitle = document.querySelector('#aboutView h2');
    if (aboutTitle) aboutTitle.textContent = t('about.title');

    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      const paragraphs = aboutContent.querySelectorAll('p');
      if (paragraphs[0]) paragraphs[0].textContent = t('about.description');
      
      const headings = aboutContent.querySelectorAll('h3');
      if (headings[0]) headings[0].textContent = t('about.howItWorks');
      if (headings[1]) headings[1].textContent = t('about.benefits');
      if (headings[2]) headings[2].textContent = t('about.developer');
      
      if (paragraphs[1]) paragraphs[1].textContent = t('about.howItWorksText');
      
      const listItems = aboutContent.querySelectorAll('ul li');
      if (listItems[0]) listItems[0].textContent = t('about.benefit1');
      if (listItems[1]) listItems[1].textContent = t('about.benefit2');
      if (listItems[2]) listItems[2].textContent = t('about.benefit3');
      if (listItems[3]) listItems[3].textContent = t('about.benefit4');
    }
  }

  private async startGame(gameType: string): Promise<void> {
    this.uiManager.showView('game');
    await this.gameManager.startGame(gameType);
  }
}

// Initialize the app
new MnemoQuest();

