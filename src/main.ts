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
    
    // Set up secret developer mode
    this.setupSecretCode();
    
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
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Mobile menu toggle
    navToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navLinks?.classList.toggle('active');
      mobileOverlay?.classList.toggle('active');
    });

    // Close mobile menu when a nav button is clicked
    const closeMenu = () => {
      navToggle?.classList.remove('active');
      navLinks?.classList.remove('active');
      mobileOverlay?.classList.remove('active');
    };

    // Close menu when clicking on overlay
    mobileOverlay?.addEventListener('click', closeMenu);

    homeBtn?.addEventListener('click', () => {
      this.uiManager.showView('dashboard');
      closeMenu();
    });
    progressBtn?.addEventListener('click', () => {
      this.uiManager.showView('progress');
      closeMenu();
    });
    settingsBtn?.addEventListener('click', () => {
      this.uiManager.showView('settings');
      closeMenu();
    });
    aboutBtn?.addEventListener('click', () => {
      this.uiManager.showView('about');
      closeMenu();
    });
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
    const exportBtn = document.getElementById('exportDataBtn');
    const importBtn = document.getElementById('importDataBtn');
    const importFileInput = document.getElementById('importFileInput') as HTMLInputElement;

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

    // Export data
    exportBtn?.addEventListener('click', () => {
      try {
        this.storageManager.downloadExport(true); // Encrypted
        this.showNotification('✅ Progress exported successfully!', 'success');
      } catch (error) {
        console.error('Export error:', error);
        this.showNotification('❌ Failed to export progress', 'error');
      }
    });

    // Import data
    importBtn?.addEventListener('click', () => {
      importFileInput?.click();
    });

    importFileInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result as string;
          const isEncrypted = file.name.endsWith('.mqsave');
          const result = this.storageManager.importData(data, isEncrypted);
          
          if (result.success) {
            this.showNotification(`✅ ${result.message}`, 'success');
            this.uiManager.updateDashboard();
            // Reload the page to ensure all UI is updated
            setTimeout(() => location.reload(), 1500);
          } else {
            this.showNotification(`❌ ${result.message}`, 'error');
          }
        } catch (error) {
          console.error('Import error:', error);
          this.showNotification('❌ Invalid backup file', 'error');
        }
      };
      reader.readAsText(file);
      
      // Reset input so same file can be selected again
      (e.target as HTMLInputElement).value = '';
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

  /**
   * Show notification toast message
   */
  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: var(--radius-md);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
      font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Setup secret code listener for developer mode
   */
  private setupSecretCode(): void {
    const SECRET_CODE = 'showdev';
    let keyBuffer = '';
    let devMode = localStorage.getItem('mnemo_dev_mode') === 'true';

    // Apply developer mode UI if already enabled
    if (devMode) {
      this.enableDeveloperMode();
    }

    // Listen for secret code
    document.addEventListener('keypress', (e) => {
      keyBuffer += e.key.toLowerCase();
      
      // Keep only last 7 characters
      if (keyBuffer.length > SECRET_CODE.length) {
        keyBuffer = keyBuffer.slice(-SECRET_CODE.length);
      }

      // Check if secret code matches
      if (keyBuffer === SECRET_CODE) {
        if (!devMode) {
          devMode = true;
          localStorage.setItem('mnemo_dev_mode', 'true');
          this.enableDeveloperMode();
          this.showNotification('🔧 Developer Mode Enabled!', 'success');
          console.log('%c🔓 Developer Mode Activated!', 'color: #10b981; font-weight: bold; font-size: 16px;');
        }
        keyBuffer = ''; // Reset buffer
      }
    });
  }

  /**
   * Enable developer mode UI elements
   */
  private enableDeveloperMode(): void {
    // Create developer controls section if not exists
    const settingsView = document.getElementById('settingsView');
    if (!settingsView) return;

    // Check if already exists
    if (document.getElementById('devModeSection')) return;

    const devSection = document.createElement('div');
    devSection.id = 'devModeSection';
    devSection.innerHTML = `
      <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: #10b981;">🔧 Developer Mode</h3>
      <div class="setting-item">
        <button class="secondary-btn" id="devExportConsoleBtn">📋 Export to Console</button>
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Export unencrypted data to browser console</p>
      </div>
      <div class="setting-item">
        <button class="secondary-btn" id="devDownloadJsonBtn">📄 Download JSON</button>
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Download unencrypted JSON file</p>
      </div>
      <div class="setting-item">
        <button class="secondary-btn" id="devImportJsonBtn">📥 Import JSON</button>
        <input type="file" id="devImportFileInput" accept=".json" style="display: none;">
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Import unencrypted JSON data</p>
      </div>
      <div class="setting-item">
        <button class="secondary-btn" id="devMaxLevelBtn">⚡ Set Max Level</button>
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">Instantly reach level 100 with all badges</p>
      </div>
      <div class="setting-item">
        <button class="danger-btn" id="devDisableBtn">🔒 Disable Developer Mode</button>
      </div>
    `;

    // Insert before the danger zone section
    const dangerZone = settingsView.querySelector('h3[style*="color: #ef4444"]');
    if (dangerZone) {
      dangerZone.parentElement?.insertBefore(devSection, dangerZone);
    } else {
      const settingsContainer = settingsView.querySelector('.settings-container');
      settingsContainer?.appendChild(devSection);
    }

    // Setup event listeners
    this.setupDeveloperControls();
  }

  /**
   * Setup developer control event listeners
   */
  private setupDeveloperControls(): void {
    const devExportConsoleBtn = document.getElementById('devExportConsoleBtn');
    const devDownloadJsonBtn = document.getElementById('devDownloadJsonBtn');
    const devImportJsonBtn = document.getElementById('devImportJsonBtn');
    const devImportFileInput = document.getElementById('devImportFileInput') as HTMLInputElement;
    const devMaxLevelBtn = document.getElementById('devMaxLevelBtn');
    const devDisableBtn = document.getElementById('devDisableBtn');

    // Export to console
    devExportConsoleBtn?.addEventListener('click', () => {
      window.mnemoDevExport();
      this.showNotification('✅ Data exported to console', 'success');
    });

    // Download JSON
    devDownloadJsonBtn?.addEventListener('click', () => {
      window.mnemoDevDownload();
      this.showNotification('✅ JSON file downloaded', 'success');
    });

    // Import JSON
    devImportJsonBtn?.addEventListener('click', () => {
      devImportFileInput?.click();
    });

    devImportFileInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result as string;
          const result = window.mnemoDevImport(data);
          
          if (result.success) {
            this.showNotification(`✅ ${result.message}`, 'success');
          } else {
            this.showNotification(`❌ ${result.message}`, 'error');
          }
        } catch (error) {
          console.error('Import error:', error);
          this.showNotification('❌ Invalid JSON file', 'error');
        }
      };
      reader.readAsText(file);
      
      (e.target as HTMLInputElement).value = '';
    });

    // Set max level
    devMaxLevelBtn?.addEventListener('click', () => {
      if (confirm('Set player to max level (100) with all badges and 100,000 XP?')) {
        const progress = this.storageManager.loadProgress();
        progress.totalXP = 100000;
        progress.level = 100;
        progress.gamesPlayed = 500;
        progress.dailyStreak = 365;
        progress.badges = ['first_game', 'ten_games', 'fifty_games', 'century', 'streak_3', 'streak_7', 'streak_30', 'level_5', 'level_10', 'accurate', 'perfectionist'];
        
        this.storageManager.saveProgress(progress);
        this.uiManager.updateDashboard();
        this.showNotification('⚡ Max level unlocked!', 'success');
      }
    });

    // Disable developer mode
    devDisableBtn?.addEventListener('click', () => {
      if (confirm('Disable developer mode? (Type "showdev" again to re-enable)')) {
        localStorage.removeItem('mnemo_dev_mode');
        document.getElementById('devModeSection')?.remove();
        this.showNotification('🔒 Developer mode disabled', 'success');
        console.log('%c🔒 Developer Mode Deactivated', 'color: #ef4444; font-weight: bold;');
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
    if (gameCards[3]) {
      gameCards[3].querySelector('h3')!.textContent = t('games.numberRecall.name');
      gameCards[3].querySelector('p')!.textContent = t('games.numberRecall.description');
      gameCards[3].querySelector('.skill-tag')!.textContent = t('games.numberRecall.skill');
      gameCards[3].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[4]) {
      gameCards[4].querySelector('h3')!.textContent = t('games.flashCount.name');
      gameCards[4].querySelector('p')!.textContent = t('games.flashCount.description');
      gameCards[4].querySelector('.skill-tag')!.textContent = t('games.flashCount.skill');
      gameCards[4].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[5]) {
      gameCards[5].querySelector('h3')!.textContent = t('games.wordTrail.name');
      gameCards[5].querySelector('p')!.textContent = t('games.wordTrail.description');
      gameCards[5].querySelector('.skill-tag')!.textContent = t('games.wordTrail.skill');
      gameCards[5].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[6]) {
      gameCards[6].querySelector('h3')!.textContent = t('games.patternPath.name');
      gameCards[6].querySelector('p')!.textContent = t('games.patternPath.description');
      gameCards[6].querySelector('.skill-tag')!.textContent = t('games.patternPath.skill');
      gameCards[6].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[7]) {
      gameCards[7].querySelector('h3')!.textContent = t('games.nBack.name');
      gameCards[7].querySelector('p')!.textContent = t('games.nBack.description');
      gameCards[7].querySelector('.skill-tag')!.textContent = t('games.nBack.skill');
      gameCards[7].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[8]) {
      gameCards[8].querySelector('h3')!.textContent = t('games.storyRecall.name');
      gameCards[8].querySelector('p')!.textContent = t('games.storyRecall.description');
      gameCards[8].querySelector('.skill-tag')!.textContent = t('games.storyRecall.skill');
      gameCards[8].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[9]) {
      gameCards[9].querySelector('h3')!.textContent = t('games.changeDetection.name');
      gameCards[9].querySelector('p')!.textContent = t('games.changeDetection.description');
      gameCards[9].querySelector('.skill-tag')!.textContent = t('games.changeDetection.skill');
      gameCards[9].querySelector('.play-btn')!.textContent = t('games.playNow');
    }
    if (gameCards[10]) {
      gameCards[10].querySelector('h3')!.textContent = t('games.colorSequence.name');
      gameCards[10].querySelector('p')!.textContent = t('games.colorSequence.description');
      gameCards[10].querySelector('.skill-tag')!.textContent = t('games.colorSequence.skill');
      gameCards[10].querySelector('.play-btn')!.textContent = t('games.playNow');
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

    // Data Management section
    const dataManagementHeading = document.getElementById('dataManagementHeading');
    if (dataManagementHeading) {
      dataManagementHeading.textContent = t('settings.dataManagement');
    }

    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
      exportDataBtn.textContent = t('settings.exportProgress');
    }

    const exportDataDesc = document.getElementById('exportDataDesc');
    if (exportDataDesc) {
      exportDataDesc.textContent = t('settings.exportProgressDesc');
    }

    const importDataBtn = document.getElementById('importDataBtn');
    if (importDataBtn) {
      importDataBtn.textContent = t('settings.importProgress');
    }

    const importDataDesc = document.getElementById('importDataDesc');
    if (importDataDesc) {
      importDataDesc.textContent = t('settings.importProgressDesc');
    }

    // Danger Zone section
    const dangerZoneHeading = document.getElementById('dangerZoneHeading');
    if (dangerZoneHeading) {
      dangerZoneHeading.textContent = t('settings.dangerZone');
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

// Initialize app
const app = new MnemoQuest();

// Expose developer functions to window object for console access
declare global {
  interface Window {
    mnemoDevExport: () => string;
    mnemoDevImport: (data: string) => { success: boolean; message: string };
    mnemoDevDownload: () => void;
  }
}

// Developer tools (accessible via browser console)
window.mnemoDevExport = () => {
  console.log('%c🔧 Developer Export', 'color: #10b981; font-weight: bold; font-size: 14px;');
  console.log('%cThis exports UNENCRYPTED data for debugging.', 'color: #f59e0b;');
  console.log('%cUsers cannot access this function easily.', 'color: #f59e0b;');
  return (app as any).storageManager.devExportData();
};

window.mnemoDevImport = (data: string) => {
  console.log('%c🔧 Developer Import', 'color: #10b981; font-weight: bold; font-size: 14px;');
  console.log('%cImporting UNENCRYPTED data...', 'color: #f59e0b;');
  const result = (app as any).storageManager.devImportData(data);
  if (result.success) {
    console.log('%c✅ Import successful! Reloading page...', 'color: #10b981;');
    setTimeout(() => location.reload(), 1000);
  }
  return result;
};

window.mnemoDevDownload = () => {
  console.log('%c🔧 Developer Download', 'color: #10b981; font-weight: bold; font-size: 14px;');
  console.log('%cDownloading UNENCRYPTED JSON file...', 'color: #f59e0b;');
  (app as any).storageManager.downloadExport(false);
};

console.log('%c🧠 MnemoQuest Developer Tools', 'color: #0d9488; font-weight: bold; font-size: 16px;');
console.log('%cAvailable commands:', 'color: #0d9488; font-weight: bold;');
console.log('%c  window.mnemoDevExport()', 'color: #10b981;', '- Export unencrypted data to console');
console.log('%c  window.mnemoDevImport(data)', 'color: #10b981;', '- Import unencrypted JSON data');
console.log('%c  window.mnemoDevDownload()', 'color: #10b981;', '- Download unencrypted JSON file');
console.log('%c⚠️  These functions are for developers only!', 'color: #f59e0b; font-weight: bold;');

