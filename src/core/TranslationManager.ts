export type SupportedLanguage = 'en' | 'es' | 'zh' | 'fr' | 'de' | 'ja' | 'ko' | 'pt';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    progress: string;
    settings: string;
    about: string;
  };
  
  // Dashboard
  dashboard: {
    welcome: string;
    subtitle: string;
    totalXP: string;
    dayStreak: string;
    avgAccuracy: string;
    gamesPlayed: string;
    chooseChallenge: string;
  };
  
  // Games
  games: {
    memoryGrid: {
      name: string;
      description: string;
      skill: string;
      instructions: string;
      recall: string;
    };
    sequenceSparks: {
      name: string;
      description: string;
      skill: string;
      instructions: string;
      watch: string;
      repeat: string;
      wrong: string;
    };
    cardMatch: {
      name: string;
      description: string;
      skill: string;
      instructions: string;
    };
    playNow: string;
  };
  
  // Tutorial
  tutorial: {
    skip: string;
    back: string;
    next: string;
    startPlaying: string;
    howToPlay: string;
    tips: string;
    memoryGrid: {
      welcome: string;
      intro: string;
      steps: string;
      tips: string;
    };
    sequenceSparks: {
      welcome: string;
      intro: string;
      steps: string;
      tips: string;
    };
    cardMatch: {
      welcome: string;
      intro: string;
      steps: string;
      tips: string;
    };
  };
  
  // Game UI
  gameUI: {
    backToDashboard: string;
    level: string;
    round: string;
    time: string;
    score: string;
    accuracy: string;
    mistakes: string;
    pairsFound: string;
    ready: string;
  };
  
  // Results
  results: {
    gameComplete: string;
    score: string;
    accuracy: string;
    time: string;
    xpGained: string;
    level: string;
    playAgain: string;
    backToDashboard: string;
  };
  
  // Progress
  progress: {
    title: string;
    yourProgress: string;
    recentGames: string;
    accuracyLabel: string;
    accuracyTrend: string;
    gamesPlayedLabel: string;
    gamesByType: string;
    achievements: string;
  };
  
  // Settings
  settings: {
    title: string;
    soundEffects: string;
    colorBlindMode: string;
    animations: string;
    language: string;
    applyLanguage: string;
    resetProgress: string;
    resetConfirm: string;
    resetSuccess: string;
  };
  
  // About
  about: {
    title: string;
    description: string;
    howItWorks: string;
    howItWorksText: string;
    benefits: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    developer: string;
    version: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    ok: string;
    cancel: string;
    yes: string;
    no: string;
  };
  
  // Badges
  badges: {
    firstSteps: { name: string; description: string; };
    dedicated: { name: string; description: string; };
    committed: { name: string; description: string; };
    centurion: { name: string; description: string; };
    streak3: { name: string; description: string; };
    streak7: { name: string; description: string; };
    streak30: { name: string; description: string; };
    level5: { name: string; description: string; };
    level10: { name: string; description: string; };
    sharpMind: { name: string; description: string; };
    perfectionist: { name: string; description: string; };
  };
}

export class TranslationManager {
  private currentLanguage: SupportedLanguage = 'en';
  private translations: Map<SupportedLanguage, Translation> = new Map();
  private fallbackLanguage: SupportedLanguage = 'en';

  constructor() {
    // Load English immediately (synchronously)
    this.loadEnglish();
  }

  private loadEnglish(): void {
    // Import English immediately since it's the default
    import('../translations/en').then(module => {
      this.translations.set('en', module.default);
      console.log('✅ English translations loaded');
    }).catch(error => {
      console.error('Failed to load English translations:', error);
    });
  }

  async setLanguage(language: SupportedLanguage): Promise<void> {
    // Load language if not already loaded
    if (!this.translations.has(language)) {
      await this.loadLanguageFile(language);
    }
    
    // Wait a bit to ensure translations are fully loaded
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.currentLanguage = language;
    document.documentElement.lang = language;
    
    // Store preference
    localStorage.setItem('mnemoquest_language', language);
    
    console.log(`✅ Language set to: ${language}`);
  }

  private async loadLanguageFile(language: SupportedLanguage): Promise<void> {
    try {
      console.log(`Loading translation file for: ${language}`);
      
      let translation: Translation;
      
      // Use explicit imports instead of template literals for Vite compatibility
      switch (language) {
        case 'en':
          translation = (await import('../translations/en')).default;
          break;
        case 'es':
          translation = (await import('../translations/es')).default;
          break;
        case 'zh':
          translation = (await import('../translations/zh')).default;
          break;
        case 'fr':
          translation = (await import('../translations/fr')).default;
          break;
        case 'de':
          translation = (await import('../translations/de')).default;
          break;
        case 'ja':
          translation = (await import('../translations/ja')).default;
          break;
        case 'ko':
          translation = (await import('../translations/ko')).default;
          break;
        case 'pt':
          translation = (await import('../translations/pt')).default;
          break;
        default:
          throw new Error(`Unsupported language: ${language}`);
      }
      
      this.translations.set(language, translation);
      console.log(`✅ Successfully loaded ${language} translations`);
      console.log(`Available languages:`, Array.from(this.translations.keys()));
    } catch (error) {
      console.error(`Failed to load ${language} translations:`, error);
      console.warn(`Using fallback language`);
    }
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  getAvailableLanguages(): Array<{ code: SupportedLanguage; name: string; nativeName: string }> {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' }
    ];
  }

  t(key: string): string {
    const translation = this.translations.get(this.currentLanguage) || 
                       this.translations.get(this.fallbackLanguage);
    
    if (!translation) {
      console.warn(`No translation found for language: ${this.currentLanguage}, available:`, Array.from(this.translations.keys()));
      return key;
    }

    // Navigate nested object path (e.g., "nav.home")
    const keys = key.split('.');
    let value: any = translation;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key} for language: ${this.currentLanguage}`);
        return key;
      }
    }
    
    return value;
  }

  // Helper method for formatted strings
  tf(key: string, params: Record<string, string | number>): string {
    let text = this.t(key);
    
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
    
    return text;
  }

  async detectBrowserLanguage(): Promise<void> {
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    const supported = this.getAvailableLanguages().map(l => l.code);
    
    if (supported.includes(browserLang)) {
      await this.setLanguage(browserLang);
    }
  }

  loadSavedLanguage(): SupportedLanguage {
    const saved = localStorage.getItem('mnemoquest_language') as SupportedLanguage;
    if (saved && this.getAvailableLanguages().some(l => l.code === saved)) {
      this.currentLanguage = saved;
      return saved;
    }
    return 'en';
  }
}

