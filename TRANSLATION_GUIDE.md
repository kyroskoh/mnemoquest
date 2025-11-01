# 🌍 Translation Guide for MnemoQuest

This guide explains how to add new language translations to MnemoQuest.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Supported Languages](#supported-languages)
3. [Adding a New Language](#adding-a-new-language)
4. [Translation Guidelines](#translation-guidelines)
5. [Testing Translations](#testing-translations)
6. [Contributing Translations](#contributing-translations)

---

## 🌐 Overview

MnemoQuest uses a custom internationalization (i18n) system that:
- Supports multiple languages
- Loads translations on demand
- Stores user language preference
- Falls back to English if translation is missing
- Detects browser language automatically (optional)

### Current Implementation:

**Supported Languages** (4 complete):
- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇨🇳 Chinese (zh)
- 🇫🇷 French (fr)

**Partially Supported** (ready for translation):
- 🇩🇪 German (de)
- 🇯🇵 Japanese (ja)
- 🇰🇷 Korean (ko)
- 🇧🇷 Portuguese (pt)

---

## 🎯 Adding a New Language

### Step 1: Create Translation File

Create a new file in `src/translations/` directory:

```typescript
// src/translations/[code].ts
import { Translation } from '../core/TranslationManager';

const [code]: Translation = {
  nav: {
    home: 'Your Translation',
    progress: 'Your Translation',
    settings: 'Your Translation',
    about: 'Your Translation'
  },
  // ... copy full structure from en.ts
};

export default [code];
```

### Step 2: Update TranslationManager

Add your language to the supported languages type:

```typescript
// src/core/TranslationManager.ts
export type SupportedLanguage = 'en' | 'es' | 'zh' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'YOUR_CODE';
```

Add to `getAvailableLanguages()` method:

```typescript
getAvailableLanguages(): Array<{ code: SupportedLanguage; name: string; nativeName: string }> {
  return [
    // ... existing languages
    { code: 'YOUR_CODE', name: 'English Name', nativeName: 'Native Name' }
  ];
}
```

### Step 3: Test Your Translation

1. Build the project:
```bash
npm run build
```

2. Run development server:
```bash
npm run dev
```

3. Go to Settings → Language
4. Select your new language
5. Navigate through all pages to verify translations

---

## 📖 Translation Structure

### Complete Translation Object:

```typescript
{
  // Navigation (4 keys)
  nav: {
    home: string;
    progress: string;
    settings: string;
    about: string;
  },
  
  // Dashboard (7 keys)
  dashboard: {
    welcome: string;
    subtitle: string;
    totalXP: string;
    dayStreak: string;
    avgAccuracy: string;
    gamesPlayed: string;
    chooseChallenge: string;
  },
  
  // Games (13 keys)
  games: {
    memoryGrid: {
      name: string;
      description: string;
      skill: string;
    },
    sequenceSparks: {
      name: string;
      description: string;
      skill: string;
    },
    cardMatch: {
      name: string;
      description: string;
      skill: string;
    },
    playNow: string;
  },
  
  // Tutorial (4 keys)
  tutorial: {
    skip: string;
    back: string;
    next: string;
    startPlaying: string;
  },
  
  // Game UI (8 keys)
  gameUI: {
    backToDashboard: string;
    level: string;
    round: string;
    time: string;
    score: string;
    accuracy: string;
    mistakes: string;
    pairsFound: string;
  },
  
  // Results (4 keys)
  results: {
    gameComplete: string;
    xpGained: string;
    playAgain: string;
    backToDashboard: string;
  },
  
  // Progress (4 keys)
  progress: {
    title: string;
    accuracyTrend: string;
    gamesByType: string;
    achievements: string;
  },
  
  // Settings (8 keys)
  settings: {
    title: string;
    soundEffects: string;
    colorBlindMode: string;
    animations: string;
    language: string;
    resetProgress: string;
    resetConfirm: string;
    resetSuccess: string;
  },
  
  // About (12 keys)
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
  },
  
  // Common (6 keys)
  common: {
    loading: string;
    error: string;
    ok: string;
    cancel: string;
    yes: string;
    no: string;
  }
}
```

**Total Keys**: ~73 strings to translate

---

## ✍️ Translation Guidelines

### General Principles:

1. **Natural Language**
   - Translate meaning, not word-for-word
   - Use natural phrases in your language
   - Consider cultural context

2. **Consistency**
   - Use consistent terminology throughout
   - Keep the same tone (friendly, encouraging)
   - Match formality level

3. **Length Considerations**
   - Some languages are longer/shorter than English
   - Button text should stay concise
   - Navigation items should be short (1-2 words)

4. **Placeholders**
   - Emojis (🧠, 🎮, etc.) can stay as-is
   - Variable placeholders like `{variable}` must remain unchanged
   - HTML entities should not be modified

### Specific Guidelines by Section:

#### Navigation
```typescript
nav: {
  home: 'Home',        // Keep it short (1 word if possible)
  progress: 'Progress', // Generic term for tracking
  settings: 'Settings', // Standard term for configuration
  about: 'About'       // Brief, 1 word
}
```

#### Dashboard
```typescript
dashboard: {
  welcome: 'Welcome...',           // Warm, inviting greeting
  subtitle: 'Enhance your...',     // Descriptive, motivational
  totalXP: 'Total XP',             // "XP" can stay in English or adapt
  dayStreak: 'Day Streak',         // Consecutive days concept
  avgAccuracy: 'Avg Accuracy',     // Can abbreviate "Average"
  gamesPlayed: 'Games Played',     // Past tense, completed games
  chooseChallenge: 'Choose Your Challenge' // Action-oriented
}
```

#### Game Names
```typescript
games: {
  memoryGrid: {
    name: 'Memory Grid',                    // Simple, descriptive
    description: 'Recall positions...',     // What player does
    skill: 'Spatial Recall'                 // Cognitive skill name
  }
}
```

**Note**: Game names should be:
- Memorable
- Clear about gameplay
- Not too long (2-3 words max)

#### Tutorial
```typescript
tutorial: {
  skip: 'Skip Tutorial',      // Allow user to bypass
  back: 'Back',               // Navigate backward
  next: 'Next',               // Move forward
  startPlaying: 'Start Playing!' // Exciting, action verb
}
```

#### Settings
```typescript
settings: {
  soundEffects: '🔊 Sound Effects',        // Keep emoji
  colorBlindMode: '🎨 Color-Blind Mode',   // Accessibility term
  animations: '✨ Animations',             // Visual effects
  language: '🌍 Language',                 // Your language name
  resetProgress: 'Reset All Progress',     // Destructive action
  resetConfirm: 'Are you sure...?',        // Warning message
  resetSuccess: 'Progress reset!'          // Confirmation
}
```

---

## 🔍 Testing Checklist

When testing your translation:

### Visual Check:
- [ ] All navigation items fit in navbar
- [ ] Game cards text doesn't overflow
- [ ] Settings labels align properly
- [ ] Long words don't break layout
- [ ] Mobile view looks correct

### Functional Check:
- [ ] Language selector shows correct name
- [ ] Language persists after page refresh
- [ ] All pages have translations
- [ ] Tutorial text is translated
- [ ] Result screen shows translated text
- [ ] Confirmation dialogs are translated

### Content Check:
- [ ] No English text remains (except "XP")
- [ ] Grammar is correct
- [ ] Tone is consistent
- [ ] Special characters display correctly
- [ ] Emojis are preserved

---

## 🎯 Common Translation Challenges

### Challenge 1: Gendered Languages

Some languages (Spanish, French, German) have gendered nouns:

**Solution**: Use neutral terms or the most common gender
```typescript
// Spanish example
'Welcome' → 'Bienvenido/a' or just 'Bienvenido'
```

### Challenge 2: Plural Forms

Languages have different plural rules:

**Solution**: Use forms that work for both singular/plural
```typescript
// English: "1 game" vs "2 games"
// Some languages need more forms
```

### Challenge 3: Text Length

Some languages are much longer than English:

**Solution**: 
- Use abbreviations where acceptable
- Prioritize clarity over brevity
- Test on small screens

### Challenge 4: Cultural References

Some phrases don't translate directly:

**Solution**: Use equivalent concepts in your culture
```typescript
// "Memory Master" → Equivalent achievement name
// "Day Streak" → Concept of consecutive days
```

---

## 🚀 Quick Start Example: German

### 1. Create file: `src/translations/de.ts`

```typescript
import { Translation } from '../core/TranslationManager';

const de: Translation = {
  nav: {
    home: 'Startseite',
    progress: 'Fortschritt',
    settings: 'Einstellungen',
    about: 'Über'
  },
  
  dashboard: {
    welcome: 'Willkommen zu Ihrer Gedächtnistraining-Reise',
    subtitle: 'Verbessern Sie Ihre kognitiven Fähigkeiten durch unterhaltsame, wissenschaftlich fundierte Mini-Spiele',
    totalXP: 'Gesamt-EP',
    dayStreak: 'Tages-Serie',
    avgAccuracy: 'Durchschn. Genauigkeit',
    gamesPlayed: 'Gespielte Spiele',
    chooseChallenge: 'Wählen Sie Ihre Herausforderung'
  },
  
  // ... continue with all sections
};

export default de;
```

### 2. Update TranslationManager.ts

```typescript
export type SupportedLanguage = 'en' | 'es' | 'zh' | 'fr' | 'de' | ...

getAvailableLanguages() {
  return [
    // ... existing
    { code: 'de', name: 'German', nativeName: 'Deutsch' }
  ];
}
```

### 3. Test!

```bash
npm run dev
```

---

## 🤝 Contributing Your Translation

### Via GitHub:

1. **Fork the repository**
2. **Create translation file** (`src/translations/[code].ts`)
3. **Update TranslationManager** (add language code)
4. **Test thoroughly**
5. **Submit Pull Request** with:
   - Translation file
   - Updated TranslationManager.ts
   - Screenshots of UI in your language
   - Description of any challenges faced

### Translation PR Template:

```markdown
## New Language Translation: [Language Name]

**Language Code**: [code]  
**Native Speakers**: [Yes/No - Are you a native speaker?]  
**Completion**: [100% / Partial]

### Changes:
- Added `src/translations/[code].ts`
- Updated `TranslationManager.ts`
- Tested on [browsers/devices]

### Screenshots:
[Attach screenshots showing translated UI]

### Notes:
- [Any special considerations]
- [Terms that were challenging to translate]
- [Suggestions for improvement]
```

---

## 📊 Translation Progress

### Fully Translated (100%):
- ✅ English (en) - 73/73 keys
- ✅ Spanish (es) - 73/73 keys
- ✅ Chinese (zh) - 73/73 keys
- ✅ French (fr) - 73/73 keys

### Needs Translation (0%):
- ⏳ German (de) - 0/73 keys
- ⏳ Japanese (ja) - 0/73 keys
- ⏳ Korean (ko) - 0/73 keys
- ⏳ Portuguese (pt) - 0/73 keys

### Want to Add Your Language?

We welcome translations in:
- Arabic (ar)
- Russian (ru)
- Italian (it)
- Dutch (nl)
- Hindi (hi)
- And many more!

---

## 🛠️ Technical Details

### How Translations Work:

1. **TranslationManager** loads language files dynamically
2. **t(key)** method retrieves translated strings
3. **tf(key, params)** formats strings with variables
4. **Language preference** stored in localStorage
5. **Falls back to English** if translation missing

### Usage in Code:

```typescript
// Simple translation
const text = translationManager.t('nav.home');

// With parameters
const text = translationManager.tf('common.error', { 
  error: 'Network Error' 
});
```

### File Structure:

```
src/
├── core/
│   └── TranslationManager.ts    # Translation system
├── translations/
│   ├── en.ts                     # English (default)
│   ├── es.ts                     # Spanish
│   ├── zh.ts                     # Chinese
│   ├── fr.ts                     # French
│   └── [code].ts                 # Your language
└── main.ts                        # Integration
```

---

## ❓ FAQ

**Q: Can I translate only part of the app?**
A: Yes, but please mark it as "Partial" in your PR. Untranslated keys will fall back to English.

**Q: Should I translate "XP" (experience points)?**
A: You can keep "XP" or use your language's gaming terminology equivalent.

**Q: What about right-to-left (RTL) languages?**
A: Currently not fully supported, but we're working on it! Feel free to contribute RTL support.

**Q: Can I update an existing translation?**
A: Absolutely! Submit a PR with improvements.

**Q: How do I test on mobile?**
A: Run `npm run dev` and access from your mobile device on the same network.

---

## 📞 Need Help?

- 📧 Email: me@kyroskoh.com
- 🐙 GitHub Issues: [Report translation issues](https://github.com/kyroskoh/mnemoquest/issues)
- 💬 Discussions: Ask questions about translation

---

## 🎉 Thank You!

Translation contributors help make MnemoQuest accessible to millions of users worldwide. Your contribution matters! 🌍

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Maintainer**: Kyros Koh (me@kyroskoh.com)

