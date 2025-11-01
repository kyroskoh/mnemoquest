# 🧠 MnemoQuest - Memory Skill Training Web Game

MnemoQuest is a browser-based cognitive training game that helps users enhance memory, focus, and recall speed through science-inspired mini-games.

## ✨ Features

### 🎮 Three Core Mini-Games
- **Memory Grid**: Recall positions of symbols in a grid (Spatial recall)
- **Sequence Sparks**: Remember and repeat light sequences (Working memory)
- **Card Match**: Match pairs under time pressure (Visual memory)

### 📊 Progress Tracking
- Track your XP and level progression
- Monitor accuracy trends over time
- View game-specific statistics
- Earn badges for achievements
- Maintain daily streaks

### ⚙️ Adaptive Difficulty
- Automatic difficulty adjustment based on your performance
- Custom algorithm: `difficulty = base_level + (success_rate × multiplier) - (mistakes × decay)`
- Scales grid size, sequence length, visibility duration, and more

### 🎨 Modern UI/UX
- Clean, calm interface with teal/blue/cream theme
- Smooth animations and transitions
- Responsive design (works on desktop and mobile)
- Color-blind accessibility mode
- Sound effects toggle
- **Multi-language support** (English, Spanish, Chinese, French + more)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd MnemoQuest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Building for Production

### Using npm:
```bash
npm run build
```

### Using Grunt (recommended for CI/CD):
```bash
# Install Grunt CLI (one-time, optional for local use)
npm install -g grunt-cli

# Build (with grunt-cli installed)
grunt build

# Or use npm scripts (works without grunt-cli)
npm run grunt:build
npm run grunt:deploy
```

The production-ready files will be in the `dist` directory.

See [GRUNT_GUIDE.md](GRUNT_GUIDE.md) for detailed Grunt usage.

## 📦 Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **Build Tool**: Vite
- **Game Engine**: Custom modular architecture
- **Charts**: Chart.js
- **Audio**: Howler.js (ready for integration)
- **Storage**: LocalStorage (with Firebase sync ready for Phase 3)

## 🎯 Roadmap

- [x] Phase 1: Core Build (3 mini-games, localStorage)
- [x] Phase 2: Analytics & UI Polish (progress dashboard, badges)
- [ ] Phase 3: Cloud Sync (Firebase auth, online save)
- [ ] Phase 4: Expansion (More mini-games + leaderboard)
- [ ] Phase 5: PWA Deployment (Offline support)

## 🧠 Game Mechanics

### Memory Grid
- Grid size scales from 3×3 to 6×6 based on difficulty
- Symbol visibility duration: 3s to 0.8s
- 5 rounds per game session

### Sequence Sparks
- Sequence length: 3 to 12 elements
- Flash duration adapts to performance
- Simon-style gameplay with 4 colored buttons

### Card Match
- Card pairs: 4 to 12 based on difficulty
- Time limit: 60s to 30s
- Match all pairs before time runs out

## 📊 Progress & Rewards

- **XP System**: Earn points for each completed challenge
- **Levels**: 100 XP per level
- **Daily Streaks**: Bonus multipliers for consecutive play days
- **Badges**: Unlock achievements for milestones

## 🎨 Accessibility & Localization

### Accessibility
- Color-blind friendly mode
- Keyboard navigation support (coming soon)
- Clear visual feedback
- Adjustable animations

### Languages Supported
- 🇺🇸 English
- 🇪🇸 Spanish (Español)
- 🇨🇳 Chinese (中文)
- 🇫🇷 French (Français)
- More languages coming soon!

Want to contribute a translation? See [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md)

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 👤 Author

**Kyros Koh**
- 📧 Email: [me@kyroskoh.com](mailto:me@kyroskoh.com)
- 🐙 GitHub: [github.com/kyroskoh](https://github.com/kyroskoh)
- 💼 Repository: [github.com/kyroskoh/mnemoquest](https://github.com/kyroskoh/mnemoquest)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the repository for details.

---

**Enjoy training your memory! 🧠✨**

