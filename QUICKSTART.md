# 🚀 Quick Start Guide - MnemoQuest

Get MnemoQuest running in just a few minutes!

## 📋 Prerequisites

Make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

Check your installation:
```bash
node --version
npm --version
```

---

## ⚡ Installation Steps

### 1. Navigate to the project directory

```bash
cd MnemoQuest
```

### 2. Install dependencies

```bash
npm install
```

This will install:
- Vite (build tool)
- TypeScript
- Chart.js (for analytics)
- Howler.js (for sound effects)
- Phaser (game engine, if needed)

### 3. Start the development server

```bash
npm run dev
```

You should see output like:
```
VITE v5.0.10  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 4. Open in your browser

Visit: **http://localhost:3000**

🎉 **MnemoQuest is now running!**

---

## 🎮 Testing the Games

### Memory Grid
1. Click "Play Now" on the Memory Grid card
2. Watch the tutorial (first time only)
3. Memorize symbol positions
4. Click the cells that had symbols

### Sequence Sparks
1. Click "Play Now" on Sequence Sparks
2. Watch the colored buttons light up
3. Repeat the sequence by clicking the buttons

### Card Match
1. Click "Play Now" on Card Match
2. Flip cards to find matching pairs
3. Complete before time runs out

---

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 📊 Features to Test

### ✅ Core Gameplay
- [ ] Play all three games
- [ ] Complete at least one round of each
- [ ] Check if difficulty increases

### ✅ Progress Tracking
- [ ] View dashboard statistics
- [ ] Check Progress page for charts
- [ ] Play multiple days to test streak

### ✅ Settings
- [ ] Toggle sound effects
- [ ] Enable color-blind mode
- [ ] Disable animations

### ✅ Badges & Rewards
- [ ] Earn your first badge (complete 1 game)
- [ ] Check badges in Progress view

---

## 🐛 Troubleshooting

### Port 3000 is already in use

Change the port in `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to any available port
  open: true
}
```

### Dependencies won't install

Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Browser shows blank page

1. Check the browser console (F12) for errors
2. Ensure all dependencies installed correctly
3. Try hard refresh (Ctrl + Shift + R or Cmd + Shift + R)

### TypeScript errors

Make sure TypeScript is installed:
```bash
npm install -D typescript
```

---

## 📱 Mobile Testing

To test on mobile devices:

1. Find your local IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Start dev server with host flag:
```bash
npm run dev -- --host
```

3. Access from mobile browser:
```
http://YOUR_IP_ADDRESS:3000
```

---

## 🎨 Customization Tips

### Change Color Theme

Edit `src/styles/main.css`:
```css
:root {
  --primary: #0d9488;      /* Teal - Change this! */
  --secondary: #3b82f6;    /* Blue - Change this! */
  --accent: #f59e0b;       /* Orange - Change this! */
}
```

### Adjust Difficulty

Edit `src/core/DifficultyManager.ts`:
```typescript
private readonly SUCCESS_MULTIPLIER = 0.5;  // Increase = harder
private readonly MISTAKE_DECAY = 0.3;       // Increase = more forgiving
```

### Change Game Duration

Edit individual game files in `src/games/`:
- `MemoryGridGame.ts`: Change `maxRounds`
- `CardMatchGame.ts`: Change `timeLimit`
- `SequenceSparksGame.ts`: Change `maxRounds`

---

## 🚀 Ready for Production?

When you're ready to deploy:

1. Build the project:
```bash
npm run build
```

2. Test the production build:
```bash
npm run preview
```

3. Deploy to your favorite platform:
   - **Netlify**: Drag & drop the `dist` folder
   - **GitHub Pages**: See `DEPLOYMENT.md`
   - **Vercel**: Run `vercel` command

---

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- Review the [PRD](../Downloads/MnemoQuest_PRD.md) for planned features

---

## 💡 Tips for Development

1. **Hot Module Replacement**: Changes auto-reload in the browser
2. **Console Logs**: Check browser console for game events
3. **LocalStorage**: View in DevTools → Application → Local Storage
4. **Test Thoroughly**: Try all games multiple times before deploying

---

## 🆘 Need Help?

- Check browser console for errors (F12)
- Verify all files are in correct directories
- Ensure Node.js and npm are up to date
- Try deleting `node_modules` and running `npm install` again

---

**Happy Gaming! 🎮🧠**

Start playing and improve your memory skills today!

