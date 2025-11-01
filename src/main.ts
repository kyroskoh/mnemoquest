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
    this.uiManager = new UIManager(this.storageManager, this.translationManager);
    this.gameManager = new GameManager(this.storageManager, this.uiManager, this.translationManager);
    
    this.init();
  }

  private async init(): Promise<void> {
    console.log('🧠 MnemoQuest initialized!');
    
    // Load saved language and wait for translations to load
    const savedLang = this.storageManager.getSettings().language as SupportedLanguage || 'en';
    await this.translationManager.setLanguage(savedLang);
    
    // Wait a bit for DOM to be ready
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Apply translations first (before other setup)
    this.applyTranslations();
    
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
    const languageSelect = document.getElementById('languageSelect') as HTMLSelectElement;
    const applyLanguageBtn = document.getElementById('applyLanguageBtn');
    const resetBtn = document.getElementById('resetProgressBtn');

    // Store pending language selection
    let pendingLanguage: SupportedLanguage | null = null;

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

    // Store selected language (don't apply yet)
    languageSelect?.addEventListener('change', (e) => {
      const lang = (e.target as HTMLSelectElement).value as SupportedLanguage;
      const currentLang = this.translationManager.getCurrentLanguage();
      
      if (lang !== currentLang) {
        pendingLanguage = lang;
        // Highlight the apply button
        if (applyLanguageBtn) {
          applyLanguageBtn.style.animation = 'pulse 1s ease-in-out';
          setTimeout(() => {
            if (applyLanguageBtn) applyLanguageBtn.style.animation = '';
          }, 1000);
        }
      } else {
        pendingLanguage = null;
      }
    });

    // Apply language when button is clicked
    applyLanguageBtn?.addEventListener('click', async () => {
      if (!pendingLanguage) {
        console.log('No language change pending');
        return;
      }

      console.log(`🌍 Applying language change to: ${pendingLanguage}`);
      
      // Disable button during loading
      if (applyLanguageBtn) {
        (applyLanguageBtn as HTMLButtonElement).disabled = true;
        applyLanguageBtn.textContent = 'Loading...';
      }
      
      try {
        // Set the new language and wait for it to load
        await this.translationManager.setLanguage(pendingLanguage);
        
        // Save the preference
        this.storageManager.updateSettings({ language: pendingLanguage });
        
        // Wait a bit more to ensure translations are loaded
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Re-apply translations to entire UI
        this.applyTranslations();
        
        // Update dashboard with translated text
        this.uiManager.updateDashboard();
        
        console.log('✅ Language changed successfully');
        pendingLanguage = null;
      } catch (error) {
        console.error('Failed to apply language:', error);
      } finally {
        // Re-enable button
        if (applyLanguageBtn) {
          (applyLanguageBtn as HTMLButtonElement).disabled = false;
          applyLanguageBtn.textContent = this.translationManager.t('settings.applyLanguage');
        }
      }
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

    console.log('🌍 Applying translations...');

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
    const heroTitle = document.querySelector('.hero h2');
    const heroSubtitle = document.querySelector('.hero p');
    
    if (heroTitle) heroTitle.textContent = t('dashboard.welcome');
    if (heroSubtitle) heroSubtitle.textContent = t('dashboard.subtitle');

    // Stats labels
    const statLabels = document.querySelectorAll('.stat-content p');
    if (statLabels[0]) statLabels[0].textContent = t('dashboard.totalXP');
    if (statLabels[1]) statLabels[1].textContent = t('dashboard.dayStreak');
    if (statLabels[2]) statLabels[2].textContent = t('dashboard.avgAccuracy');
    if (statLabels[3]) statLabels[3].textContent = t('dashboard.gamesPlayed');

    // Game cards
    const gameModulesTitle = document.querySelector('.game-modules h2');
    if (gameModulesTitle) gameModulesTitle.textContent = t('dashboard.chooseChallenge');
    
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
    if (settingsTitle) {
      const translatedTitle = t('settings.title');
      console.log(`Settings title: "${translatedTitle}"`);
      settingsTitle.textContent = translatedTitle;
    }

    const settingLabels = document.querySelectorAll('.setting-item label span');
    console.log(`Found ${settingLabels.length} setting labels`);
    
    if (settingLabels[0]) {
      const translated = t('settings.soundEffects');
      console.log(`Sound Effects: "${translated}"`);
      settingLabels[0].textContent = translated;
    }
    if (settingLabels[1]) {
      const translated = t('settings.colorBlindMode');
      console.log(`Color-Blind Mode: "${translated}"`);
      settingLabels[1].textContent = translated;
    }
    if (settingLabels[2]) {
      const translated = t('settings.animations');
      console.log(`Animations: "${translated}"`);
      settingLabels[2].textContent = translated;
    }
    if (settingLabels[3]) {
      const translated = t('settings.language');
      console.log(`Language: "${translated}"`);
      settingLabels[3].textContent = translated;
    }

    const applyLanguageBtn = document.getElementById('applyLanguageBtn');
    if (applyLanguageBtn) {
      const translated = t('settings.applyLanguage');
      console.log(`Apply language button: "${translated}"`);
      applyLanguageBtn.textContent = translated;
    }

    const resetBtn = document.getElementById('resetProgressBtn');
    if (resetBtn) {
      const translated = t('settings.resetProgress');
      console.log(`Reset button: "${translated}"`);
      resetBtn.textContent = translated;
    }

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
    
    console.log('✅ Translations applied successfully');
  }

  private async startGame(gameType: string): Promise<void> {
    this.uiManager.showView('game');
    await this.gameManager.startGame(gameType);
  }
}

// Initialize the app
new MnemoQuest();

