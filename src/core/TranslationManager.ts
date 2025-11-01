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
    };
    sequenceSparks: {
      name: string;
      description: string;
      skill: string;
    };
    cardMatch: {
      name: string;
      description: string;
      skill: string;
    };
    playNow: string;
  };
  
  // Tutorial
  tutorial: {
    skip: string;
    back: string;
    next: string;
    startPlaying: string;
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
  };
  
  // Results
  results: {
    gameComplete: string;
    xpGained: string;
    playAgain: string;
    backToDashboard: string;
  };
  
  // Progress
  progress: {
    title: string;
    accuracyTrend: string;
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
}

export class TranslationManager {
  private currentLanguage: SupportedLanguage = 'en';
  private translations: Map<SupportedLanguage, Translation> = new Map();
  private fallbackLanguage: SupportedLanguage = 'en';

  constructor() {
    this.loadTranslations();
  }

  private async loadTranslations(): Promise<void> {
    // Dynamically import translation files
    try {
      const en = (await import('../translations/en.js')).default;
      this.translations.set('en', en);
      
      // Other languages will be loaded on demand
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  async setLanguage(language: SupportedLanguage): Promise<void> {
    if (!this.translations.has(language)) {
      await this.loadLanguageFile(language);
    }
    
    this.currentLanguage = language;
    document.documentElement.lang = language;
    
    // Store preference
    localStorage.setItem('mnemoquest_language', language);
  }

  private async loadLanguageFile(language: SupportedLanguage): Promise<void> {
    try {
      const translation = (await import(`../translations/${language}.js`)).default;
      this.translations.set(language, translation);
    } catch (error) {
      console.warn(`Failed to load ${language} translations, using fallback`);
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
      return key;
    }

    // Navigate nested object path (e.g., "nav.home")
    const keys = key.split('.');
    let value: any = translation;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
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

