# 🌍 Translation Guidelines for MnemoQuest

**Version**: 1.0  
**Last Updated**: November 2025  
**Applies to**: All future game implementations

---

## 📋 Translation Requirements Checklist

When implementing **ANY new game** in MnemoQuest, you **MUST** translate all of the following:

### ✅ 1. Game UI Elements (Translation Files)
**Location**: `src/translations/{language}.ts`

**Required for each game:**
- [ ] Game name (`games.{gameName}.name`)
- [ ] Game description (`games.{gameName}.description`)
- [ ] Skill type (`games.{gameName}.skill`)
- [ ] All in-game instructions
- [ ] All button labels
- [ ] All status messages
- [ ] All feedback text
- [ ] All numeric labels (score, level, round, etc.)

### ✅ 2. Game Tutorials (Translation Files)
**Location**: `src/translations/{language}.ts` under `tutorial.{gameName}`

**Required for each game:**
- [ ] Welcome message (`welcome`)
- [ ] Introduction/overview (`intro`)
- [ ] Step-by-step instructions (`steps`)
- [ ] Tips and strategies (`tips`)

**Format**:
```typescript
{gameName}: {
  welcome: string;    // "Welcome to {Game Name}!"
  intro: string;      // 1-2 sentence overview
  steps: string;      // Numbered list with \n separators
  tips: string;       // Bulleted list with \n separators
}
```

### ✅ 3. Game Content (If Applicable)
**Location**: `src/data/{gameName}/{language}.ts`

Some games have **narrative content** that must be fully translated:

#### Story-Based Games:
- [ ] Story text
- [ ] Questions
- [ ] Answer options
- [ ] All narrative elements

**Example**: Story Recall game has 5 stories × 23 questions × 92 options all translated

#### Other Content Types:
- [ ] Word lists (Word Trail)
- [ ] Scenarios or descriptions
- [ ] Character names (if relevant to gameplay)
- [ ] Any text displayed during gameplay

---

## 🗂️ File Structure

### 1. UI & Tutorial Translations
```
src/translations/
├── en.ts  (English - Base language)
├── es.ts  (Spanish)
├── zh.ts  (Chinese)
├── fr.ts  (French)
├── de.ts  (German)
├── ja.ts  (Japanese)
├── ko.ts  (Korean)
└── pt.ts  (Portuguese)
```

### 2. Game Content (if needed)
```
src/data/{gameName}/
├── en.ts  (English - Base content)
├── es.ts  (Spanish)
├── zh.ts  (Chinese)
├── fr.ts  (French)
├── de.ts  (German)
├── ja.ts  (Japanese)
├── ko.ts  (Korean)
└── pt.ts  (Portuguese)
```

---

## 🎯 Supported Languages

MnemoQuest supports **8 languages**. All content must be translated for:

1. **🇺🇸 English (en)** - Base language
2. **🇪🇸 Spanish (es)** - Latin American Spanish
3. **🇨🇳 Chinese (zh)** - Simplified Chinese
4. **🇫🇷 French (fr)** - Standard French
5. **🇩🇪 German (de)** - Standard German
6. **🇯🇵 Japanese (ja)** - Polite form (です/ます)
7. **🇰🇷 Korean (ko)** - Formal form (합니다/습니다)
8. **🇧🇷 Portuguese (pt)** - Brazilian Portuguese

---

## 📝 Translation Quality Standards

### General Guidelines:
1. **Use formal/polite forms** appropriate for each language
2. **Cultural appropriateness** - adapt idioms and examples
3. **Consistent terminology** - use established game terms
4. **Technical accuracy** - preserve meaning for instructions
5. **Natural language** - translate meaning, not word-for-word

### Specific Language Notes:

#### Spanish (es):
- Use Latin American Spanish
- Formal "usted" form where appropriate
- Include accents and ñ

#### Chinese (zh):
- Use Simplified Chinese characters
- Formal/respectful tone
- Cultural adaptation of examples

#### French (fr):
- Standard French (not Quebec French)
- Formal "vous" form
- Include all accents (é, è, ê, ë, etc.)

#### German (de):
- Standard High German
- Formal "Sie" form
- Capitalize nouns
- Use ß where appropriate

#### Japanese (ja):
- Use polite form (です/ます体)
- Include kanji with appropriate readings
- Cultural sensitivity in examples

#### Korean (ko):
- Use formal speech level (합니다/습니다)
- Include appropriate particles
- Cultural adaptation

#### Portuguese (pt):
- Brazilian Portuguese
- Formal "você" form
- Include accents (á, â, ã, é, etc.)

---

## 🔧 Implementation Steps

### For UI & Tutorial Translations:

1. **Update TranslationManager Interface**
   ```typescript
   // src/core/TranslationManager.ts
   games: {
     {gameName}: {
       name: string;
       description: string;
       skill: string;
       // ... other game-specific keys
     };
   };
   
   tutorial: {
     {gameName}: {
       welcome: string;
       intro: string;
       steps: string;
       tips: string;
     };
   };
   ```

2. **Add Translations to All 8 Files**
   - Start with English (base)
   - Translate to remaining 7 languages
   - Test each language in the app

3. **Use in Game Code**
   ```typescript
   this.t('games.{gameName}.name')
   this.t('tutorial.{gameName}.welcome')
   ```

### For Game Content Translations:

1. **Create Data Directory**
   ```bash
   mkdir src/data/{gameName}
   ```

2. **Create Interface File** (en.ts)
   ```typescript
   export interface {ContentType} {
     // Define your data structure
   }
   
   export const data: {ContentType}[] = [
     // English content
   ];
   ```

3. **Create Language Files**
   - Copy interface to all language files
   - Translate content
   - Maintain same structure

4. **Dynamic Import in Game**
   ```typescript
   const currentLang = this.translationManager.getCurrentLanguage();
   const dataModule = await import(`../data/{gameName}/${currentLang}.ts`);
   this.gameData = dataModule.data;
   ```

---

## ✅ Pre-Release Checklist

Before marking a game as "complete", verify:

- [ ] All 8 translation files have game UI keys
- [ ] All 8 translation files have tutorial content
- [ ] If game has content, all 8 content files exist
- [ ] All translations reviewed for quality
- [ ] Game tested in all 8 languages
- [ ] No English fallbacks in non-English modes
- [ ] All text displays correctly (no overflow)
- [ ] Special characters display properly

---

## 🚫 Common Mistakes to Avoid

### ❌ Don't:
- Forget tutorial translations (very common!)
- Use machine translation without review
- Hard-code strings in game files
- Create only English content
- Skip testing in other languages
- Use informal language (except where appropriate)
- Ignore cultural context

### ✅ Do:
- Plan translations from the start
- Review all translations for quality
- Test each language in the app
- Use consistent terminology
- Consider cultural differences
- Maintain professional tone
- Document any translation decisions

---

## 📖 Translation Resources

### Tools:
- **DeepL** - High-quality translations
- **Google Translate** - Quick reference
- **Native speakers** - Best for review

### Reference Materials:
- Existing translations in the project
- Gaming terminology glossaries
- Language style guides

---

## 🔄 Translation Updates

When updating existing games:

1. Update English first (source of truth)
2. Update all other languages
3. Mark changes in CHANGELOG.md
4. Test updated translations
5. Deploy all languages together

---

## 📊 Translation Tracking

### Current Status:

| Component | Languages | Status |
|-----------|-----------|--------|
| Core UI | 8/8 | ✅ Complete |
| Phase 1-4 Games | 8/8 | ✅ Complete |
| Phase 5 Games UI | 8/8 | ✅ Complete |
| Phase 5 Games Tutorials | 8/8 | ✅ Complete |
| Phase 5 Game Content | 8/8 | ✅ Complete |

**Total Translation Lines**: ~6,000+ across all languages

---

## 🎯 Future Phases

When implementing Phase 6+ games, follow this document to ensure:
- ✅ Complete translation coverage from day one
- ✅ Professional quality in all languages
- ✅ Cultural appropriateness
- ✅ Consistent user experience globally

---

**Remember**: A game is not "complete" until it's fully translated in all 8 languages!

**Questions?** Refer to existing translations as templates.

**Developer**: Kyros Koh  
**Contact**: me@kyroskoh.com  
**Last Review**: Phase 5 Implementation

---

*"True global accessibility means content in every language, not just UI labels."*

