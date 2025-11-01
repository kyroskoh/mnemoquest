# 📁 MnemoQuest Project Structure

This document provides an overview of the MnemoQuest project structure and architecture.

## 🏗️ Directory Structure

```
MnemoQuest/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── dist/                       # Production build output (generated)
├── node_modules/              # Dependencies (generated)
├── public/
│   └── robots.txt             # SEO configuration
├── src/
│   ├── core/                  # Core game systems
│   │   ├── DifficultyManager.ts    # Adaptive difficulty algorithm
│   │   ├── GameManager.ts          # Game orchestration & lifecycle
│   │   ├── SoundManager.ts         # Audio system with Howler.js
│   │   ├── StorageManager.ts       # LocalStorage persistence
│   │   ├── TutorialManager.ts      # First-time tutorial system
│   │   └── UIManager.ts            # UI updates & Chart.js integration
│   ├── games/                 # Individual game implementations
│   │   ├── BaseGame.ts             # Abstract game class
│   │   ├── CardMatchGame.ts        # Card matching game
│   │   ├── MemoryGridGame.ts       # Spatial memory grid
│   │   └── SequenceSparksGame.ts   # Sequential memory game
│   ├── styles/
│   │   └── main.css                # Global styles and theme
│   └── main.ts                     # Application entry point
├── .gitignore                 # Git ignore rules
├── DEPLOYMENT.md              # Detailed deployment instructions
├── index.html                 # Main HTML entry point
├── netlify.toml               # Netlify configuration
├── package.json               # Project dependencies & scripts
├── PROJECT_STRUCTURE.md       # This file
├── QUICKSTART.md              # Quick start guide
├── README.md                  # Project overview & documentation
├── tsconfig.json              # TypeScript configuration
└── vite.config.js             # Vite build configuration
```

---

## 🎯 Core Architecture

### Main Application Flow

```
index.html
    ↓
main.ts (MnemoQuest class)
    ↓
├── StorageManager ──→ LocalStorage
├── SoundManager ──→ Howler.js
├── UIManager ──→ Chart.js + DOM
└── GameManager
        ↓
    ├── DifficultyManager
    ├── TutorialManager
    └── Individual Games
            ├── MemoryGridGame
            ├── SequenceSparksGame
            └── CardMatchGame
```

---

## 📦 Core Modules

### StorageManager (`src/core/StorageManager.ts`)
**Purpose**: Manages all data persistence using LocalStorage

**Key Features:**
- Save/load game progress
- Track XP, levels, streaks
- Store high scores per game
- Manage user settings
- Badge system
- Recent scores history (last 20)

**Data Structures:**
```typescript
GameProgress {
  totalXP: number
  level: number
  gamesPlayed: number
  dailyStreak: number
  highScores: { [gameType]: score }
  gameStats: { [gameType]: { played, accuracy, difficulty } }
  badges: string[]
  recentScores: Array<{ gameType, score, accuracy, date }>
}

Settings {
  soundEnabled: boolean
  colorBlindMode: boolean
  animationsEnabled: boolean
}
```

---

### GameManager (`src/core/GameManager.ts`)
**Purpose**: Orchestrates game lifecycle and state

**Responsibilities:**
- Start/stop games
- Manage game timer
- Handle game completion
- Calculate results
- Update difficulty after each game
- Save game results

**Flow:**
1. Show tutorial (first-time only)
2. Initialize selected game with difficulty
3. Track time and performance
4. Calculate results
5. Update difficulty
6. Save to storage
7. Show result screen

---

### DifficultyManager (`src/core/DifficultyManager.ts`)
**Purpose**: Adaptive difficulty scaling

**Algorithm** (from PRD):
```typescript
newDifficulty = currentDifficulty + 
                (successRate × 0.5) - 
                (mistakes × 0.3)
```

**Difficulty Range:** 1.0 to 10.0

**Scaling Parameters:**
- Grid size: 3×3 to 6×6
- Sequence length: 3 to 12
- Visibility duration: 3000ms to 800ms
- Card pairs: 4 to 12
- Time limit: 60s to 30s

---

### UIManager (`src/core/UIManager.ts`)
**Purpose**: Handle all UI updates and view transitions

**Features:**
- View navigation (dashboard, game, progress, settings, about)
- Dashboard statistics display
- Chart.js integration for progress graphs
- Badge display system
- Result screen rendering
- Dynamic content updates

**Charts:**
1. **Accuracy Trend**: Line chart of recent game accuracy
2. **Performance Chart**: Bar chart of games played by type

---

### SoundManager (`src/core/SoundManager.ts`)
**Purpose**: Audio feedback system using Howler.js

**Sound Effects:**
- `success` - Correct answer
- `error` - Wrong answer
- `click` - UI interaction
- `complete` - Game completion

**Features:**
- Toggle sound on/off
- Volume control
- Respects user settings

---

### TutorialManager (`src/core/TutorialManager.ts`)
**Purpose**: First-time user guidance

**Features:**
- Show tutorial on first play of each game
- Multi-step tutorial overlays
- Progress indicators
- Skip functionality
- Persistent completion tracking

**Tutorial Structure:**
1. Welcome & game introduction
2. How to play (detailed instructions)
3. Tips & strategies

---

## 🎮 Game Implementations

### Base Game Class (`src/games/BaseGame.ts`)
**Abstract class** that all games extend

**Required Methods:**
- `start()` - Initialize and start the game
- `destroy()` - Clean up event listeners

**Tracking:**
- `totalAttempts` - Total number of attempts
- `correctAttempts` - Successful attempts
- `mistakes` - Error count

**Result Calculation:**
```typescript
accuracy = (correctAttempts / totalAttempts) × 100
successRate = correctAttempts / totalAttempts
score = (correctAttempts × 10) + (difficulty × 5)
```

---

### Memory Grid Game (`src/games/MemoryGridGame.ts`)
**Goal**: Remember positions of symbols in a grid

**Mechanics:**
- Display grid with highlighted symbols
- Hide symbols after duration
- Player clicks cells that had symbols
- 5 rounds per game

**Difficulty Scaling:**
- Grid size increases (3×3 → 6×6)
- Number of symbols increases
- Display duration decreases

---

### Sequence Sparks Game (`src/games/SequenceSparksGame.ts`)
**Goal**: Repeat sequences of colored buttons

**Mechanics:**
- 4 colored buttons flash in sequence
- Player repeats the sequence
- Sequence length increases each round
- 5 rounds per game

**Difficulty Scaling:**
- Sequence length increases (3 → 12)
- Flash duration decreases
- Gap between flashes decreases

---

### Card Match Game (`src/games/CardMatchGame.ts`)
**Goal**: Match all pairs before time runs out

**Mechanics:**
- Grid of face-down cards
- Flip two cards at a time
- Match all pairs to win
- Time limit countdown

**Difficulty Scaling:**
- Number of pairs increases (4 → 12)
- Time limit decreases (60s → 30s)
- Grid layout adapts to card count

---

## 🎨 Styling System

### CSS Architecture (`src/styles/main.css`)

**Design System:**
- **Colors**: Teal/Blue/Cream palette
- **Typography**: Inter font family
- **Spacing**: Consistent scale (xs → xl)
- **Borders**: Rounded corners
- **Animations**: Smooth transitions

**Responsive Breakpoints:**
- Desktop: > 768px
- Mobile: ≤ 768px

**Themes:**
- Default theme
- Color-blind mode (alternative palette)
- No-animations mode (accessibility)

---

## 🔧 Configuration Files

### package.json
**Scripts:**
- `dev` - Development server with hot reload
- `build` - Production build (TypeScript + Vite)
- `preview` - Preview production build

**Dependencies:**
- `phaser` - Game engine library
- `chart.js` - Data visualization
- `howler` - Audio engine

**Dev Dependencies:**
- `vite` - Build tool
- `typescript` - Type checking

---

### tsconfig.json
**TypeScript Configuration:**
- Target: ES2020
- Strict mode enabled
- Module: ESNext
- Bundler mode for Vite compatibility

---

### vite.config.js
**Build Configuration:**
- Base path: `./` (relative for deployment flexibility)
- Output: `dist/`
- Minify: esbuild
- Dev server: Port 3000 with auto-open

---

## 🚀 Deployment Targets

### Supported Platforms
1. **Netlify** (Recommended)
   - Auto-deploy from Git
   - Custom domains
   - HTTPS included

2. **GitHub Pages**
   - GitHub Actions workflow included
   - Free hosting for public repos

3. **Cloudflare Pages**
   - Fast global CDN
   - Free tier available

4. **Vercel**
   - Automatic detection
   - Preview deployments

---

## 📊 Data Flow

### Game Session Flow

```
1. User clicks "Play Now"
   ↓
2. GameManager.startGame(gameType)
   ↓
3. TutorialManager checks if first time
   ↓
4. Create game instance with current difficulty
   ↓
5. Game.start() - Begin gameplay
   ↓
6. User plays game
   ↓
7. Game.completeGame() - Calculate results
   ↓
8. GameManager.onGameComplete()
   ↓
9. DifficultyManager updates difficulty
   ↓
10. StorageManager saves results
   ↓
11. UIManager shows result screen
   ↓
12. Update dashboard statistics
```

### Storage Flow

```
Game Result
   ↓
StorageManager.addGameResult()
   ↓
├── Update totalXP
├── Update gamesPlayed
├── Update gameStats
├── Check high score
├── Add to recentScores
├── Calculate daily streak
├── Calculate level
├── Check and award badges
   ↓
Save to localStorage
   ↓
Persist across sessions
```

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] All three games playable
- [ ] Progress saves correctly
- [ ] Difficulty adapts to performance
- [ ] Charts display data
- [ ] Badges unlock properly
- [ ] Settings persist
- [ ] Tutorial shows on first play
- [ ] Daily streak calculates correctly

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Responsive Testing
- [ ] Desktop (1920×1080)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)

### Accessibility Testing
- [ ] Color-blind mode works
- [ ] Animations can be disabled
- [ ] Text is readable
- [ ] Contrast ratios meet WCAG standards

---

## 🔄 Development Workflow

### Local Development
```bash
npm install        # Install dependencies
npm run dev       # Start dev server
# Make changes...
npm run build     # Test production build
npm run preview   # Preview production
```

### Git Workflow
```bash
git add .
git commit -m "Description"
git push origin main
# Automatic deployment triggers
```

---

## 📈 Future Enhancements

### Phase 3 (Planned)
- Firebase Authentication
- Cloud Firestore for cross-device sync
- Online leaderboards

### Phase 4 (Planned)
- Additional mini-games:
  - Word Trail
  - Pattern Path
  - Number Recall
- Multiplayer mode

### Phase 5 (Planned)
- PWA features
- Offline support
- Install to home screen
- Push notifications for reminders

---

## 🐛 Common Issues & Solutions

### Issue: Port 3000 in use
**Solution**: Change port in `vite.config.js`

### Issue: Build fails
**Solution**: Delete `node_modules` and `dist`, run `npm install`

### Issue: TypeScript errors
**Solution**: Check `tsconfig.json` and ensure strict mode is compatible

### Issue: LocalStorage not saving
**Solution**: Check browser privacy settings, ensure cookies enabled

---

## 📝 Code Style Guidelines

### TypeScript
- Use strict typing
- No `any` types
- Prefer interfaces for data structures
- Use private/public modifiers explicitly

### Naming Conventions
- Classes: PascalCase (`GameManager`)
- Methods: camelCase (`startGame`)
- Constants: UPPER_SNAKE_CASE (`MAX_DIFFICULTY`)
- Files: PascalCase for classes (`GameManager.ts`)

### Comments
- Document public APIs
- Explain complex algorithms
- Add TODO for future enhancements

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready

