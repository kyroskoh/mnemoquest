# Contributing to MnemoQuest 🎮

Thank you for your interest in contributing to MnemoQuest! This document provides guidelines for contributing to the project.

## 👋 Getting Started

1. **Fork the repository**
   - Visit [github.com/kyroskoh/mnemoquest](https://github.com/kyroskoh/mnemoquest)
   - Click the "Fork" button

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mnemoquest.git
   cd mnemoquest
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 🎯 Ways to Contribute

### 🐛 Bug Reports
- Use the GitHub issue tracker
- Include steps to reproduce
- Describe expected vs actual behavior
- Include browser/OS information
- Add screenshots if applicable

### ✨ Feature Requests
- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Consider cognitive science backing (if applicable)

### 💻 Code Contributions
- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting

### 📚 Documentation
- Fix typos or unclear explanations
- Add examples or tutorials
- Improve existing documentation
- Translate to other languages

### 🎮 New Games
- Review `FUTURE_GAMES_PLAN.md`
- Propose games that train specific cognitive skills
- Include scientific research if available
- Follow the game design principles

---

## 📝 Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Maintain consistent code style
   - Add/update tests if applicable

3. **Test your changes**
   ```bash
   npm run dev     # Test locally
   npm run build   # Ensure it builds
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

   **Commit Message Format**:
   ```
   type(scope): brief description

   Detailed explanation if needed

   Examples:
   - feat(games): add Number Recall game
   - fix(storage): correct daily streak calculation
   - docs(readme): update installation instructions
   - style(ui): improve mobile responsiveness
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template
   - Link related issues

---

## 🎨 Code Style Guidelines

### TypeScript
```typescript
// Use strict typing
function calculateScore(attempts: number, mistakes: number): number {
  // Clear variable names
  const baseScore = attempts * 10;
  const penalty = mistakes * 5;
  return Math.max(0, baseScore - penalty);
}

// Use interfaces for data structures
interface GameResult {
  score: number;
  accuracy: number;
  time: number;
}

// Prefer const over let
const MAX_ATTEMPTS = 5;
```

### CSS
```css
/* Follow existing naming conventions */
.game-card {
  /* Use CSS variables */
  background: var(--bg-card);
  color: var(--text-primary);
  
  /* Consistent spacing */
  padding: var(--spacing-md);
  
  /* Smooth transitions */
  transition: var(--transition);
}
```

### File Organization
```
src/
├── core/          # Core systems
├── games/         # Game implementations
├── styles/        # CSS files
└── utils/         # Helper functions (if needed)
```

---

## 🧪 Testing Guidelines

Before submitting:

### ✅ Functional Testing
- [ ] All games are playable
- [ ] Progress saves correctly
- [ ] Settings persist
- [ ] Buttons and interactions work
- [ ] No console errors

### ✅ Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if possible)

### ✅ Responsive Testing
- [ ] Desktop (1920×1080)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)

### ✅ Accessibility
- [ ] Color contrast sufficient
- [ ] Buttons clearly labeled
- [ ] Keyboard navigation works

---

## 🎮 Adding a New Game

Follow this checklist:

1. **Review `FUTURE_GAMES_PLAN.md`**
   - Check if game is already planned
   - Understand the cognitive skill focus

2. **Create game file**
   ```typescript
   // src/games/YourGame.ts
   import { BaseGame } from './BaseGame';
   
   export class YourGame extends BaseGame {
     start(): void {
       // Game initialization
     }
     
     destroy(): void {
       // Cleanup
     }
   }
   ```

3. **Register in GameManager**
   ```typescript
   // src/core/GameManager.ts
   case 'your-game':
     this.currentGame = new YourGame(container, difficulty, this.onGameComplete.bind(this));
     break;
   ```

4. **Add to dashboard**
   ```html
   <!-- index.html -->
   <div class="game-card" data-game="your-game">
     <div class="game-icon">🎯</div>
     <h3>Your Game</h3>
     <p>Description</p>
     <span class="skill-tag">Skill Focus</span>
     <button class="play-btn">Play Now</button>
   </div>
   ```

5. **Create tutorial**
   ```typescript
   // src/core/TutorialManager.ts
   case 'your-game':
     return [
       { title: 'Welcome', description: '...' },
       { title: 'How to Play', description: '...' },
       { title: 'Tips', description: '...' }
     ];
   ```

6. **Update documentation**
   - [ ] Add to README.md
   - [ ] Update FUTURE_GAMES_PLAN.md status
   - [ ] Document in PROJECT_STRUCTURE.md

---

## 📊 Performance Guidelines

### Keep it Fast
- Minimize asset sizes
- Optimize images
- Use efficient algorithms
- Avoid memory leaks

### Best Practices
```typescript
// Clean up event listeners
destroy(): void {
  this.elements.forEach(el => {
    el.replaceWith(el.cloneNode(true));
  });
}

// Use requestAnimationFrame for animations
updateAnimation(): void {
  requestAnimationFrame(() => this.updateAnimation());
}
```

---

## 🔬 Scientific Rigor

When adding cognitive training games:

### ✅ Research-Backed
- Cite scientific papers if available
- Explain the cognitive benefit
- Use established paradigms when possible

### ✅ Valid Difficulty Scaling
- Ensure difficulty actually increases challenge
- Test that it adapts appropriately
- Avoid frustration (too hard) or boredom (too easy)

### ✅ Meaningful Metrics
- Track relevant performance data
- Use standard measures (accuracy, reaction time)
- Provide useful feedback to users

---

## 🐛 Bug Fix Guidelines

### Issue Investigation
1. Reproduce the bug consistently
2. Check browser console for errors
3. Identify root cause
4. Verify fix doesn't break other features

### Bug Fix PR Template
```markdown
## Bug Description
Brief description of the bug

## Root Cause
What was causing the issue

## Solution
How you fixed it

## Testing
How you verified the fix

## Related Issues
Closes #123
```

---

## 📞 Communication

### Questions?
- 📧 Email: [me@kyroskoh.com](mailto:me@kyroskoh.com)
- 🐙 GitHub Issues: For bug reports and feature requests
- 💬 Discussions: For general questions and ideas

### Response Time
- Bug reports: Within 48 hours
- Feature requests: Within 1 week
- Pull requests: Within 1 week

---

## ⚖️ Code of Conduct

### Be Respectful
- Treat everyone with respect
- Welcome diverse perspectives
- Be constructive in criticism
- Help others learn and grow

### Be Professional
- Keep discussions on-topic
- Avoid offensive language
- Credit others' work
- Respect maintainers' decisions

---

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Credited in commit history

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ✨ Thank You!

Every contribution, no matter how small, makes MnemoQuest better. Thank you for helping improve cognitive training for everyone! 🧠

---

**Project Maintainer**: Kyros Koh  
**Contact**: me@kyroskoh.com  
**Repository**: [github.com/kyroskoh/mnemoquest](https://github.com/kyroskoh/mnemoquest)

