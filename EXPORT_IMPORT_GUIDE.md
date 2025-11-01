# 📦 Export/Import Guide

## Quick Start

### For Regular Users
1. Go to **Settings**
2. Scroll to **"📦 Data Management"**
3. Click **"💾 Export Progress"** to backup
4. Click **"📂 Import Progress"** to restore

### For Developers
1. Type `showdev` anywhere in the app
2. Go to **Settings** → scroll to **"🔧 Developer Mode"**
3. Use the developer controls as needed
4. Or use console commands (see below)

---

### 🔒 Encrypted Export/Import

Located in **Settings > Data Management**:

#### Export Progress
- Click **"💾 Export Progress"** button
- Downloads a `.mqsave` file (encrypted)
- Filename format: `mnemoquest-backup-YYYY-MM-DD.mqsave`
- **Protected**: Data is encrypted to prevent casual tampering
- **Contents**: All progress, achievements, settings, and game statistics

#### Import Progress
- Click **"📂 Import Progress"** button
- Select a `.mqsave` file
- Automatically decrypts and validates the data
- Shows success/error notifications
- **Automatic reload**: Page refreshes to apply changes

### ✨ Features
- ✅ **Encrypted data**: XOR encryption + Base64 encoding
- ✅ **Validation**: Checks data integrity before import
- ✅ **Toast notifications**: Visual feedback for all operations
- ✅ **Automatic backup naming**: Includes date in filename
- ✅ **Cross-device sync**: Export on one device, import on another

---

## Developer Features

### 🔓 Secret Developer Mode

**Activate**: Type `showdev` anywhere in the app (no input field needed!)

Once activated, you'll see:
- ✅ Success notification: "🔧 Developer Mode Enabled!"
- ✅ New "Developer Mode" section in Settings
- ✅ Console message confirming activation

**What You Get:**
- 📋 **Export to Console** - View unencrypted data in browser console
- 📄 **Download JSON** - Download editable JSON file
- 📥 **Import JSON** - Import unencrypted JSON data
- ⚡ **Set Max Level** - Instantly unlock level 100 + all badges
- 🔒 **Disable Developer Mode** - Turn it off when done

**Persistence**: Developer mode stays active across page reloads until you manually disable it.

**To Disable**: Click the "🔒 Disable Developer Mode" button, or clear localStorage.

---

### 🔧 Console Tools

Three powerful developer functions are exposed to the browser console:

#### 1. Export Unencrypted Data (Console)
```javascript
window.mnemoDevExport()
```
- Prints **unencrypted JSON** to console
- Use for debugging or support
- Copy/paste the output

#### 2. Download Unencrypted JSON
```javascript
window.mnemoDevDownload()
```
- Downloads a `.json` file (unencrypted)
- Human-readable format
- Easy to edit in any text editor

#### 3. Import Unencrypted JSON
```javascript
const jsonData = `{ "version": "1.0", ... }`;
window.mnemoDevImport(jsonData)
```
- Import raw JSON data
- Automatically reloads page on success
- Use for testing or restoring edited data

### 🎨 Console Output

When you open the browser console, you'll see:

```
🧠 MnemoQuest Developer Tools
Available commands:
  window.mnemoDevExport()     - Export unencrypted data to console
  window.mnemoDevImport(data) - Import unencrypted JSON data
  window.mnemoDevDownload()   - Download unencrypted JSON file
⚠️  These functions are for developers only!
```

---

## Data Format

### Exported Data Structure
```json
{
  "version": "1.0",
  "timestamp": "2024-11-01T12:00:00.000Z",
  "progress": {
    "totalXP": 1250,
    "level": 10,
    "gamesPlayed": 45,
    "dailyStreak": 7,
    "lastPlayDate": "2024-11-01",
    "highScores": {
      "memory-grid": 850,
      "sequence-sparks": 920,
      "card-match": 780
    },
    "gameStats": { /* ... */ },
    "badges": ["first_game", "ten_games", "streak_3"],
    "recentScores": [ /* ... */ ]
  },
  "settings": {
    "soundEnabled": true,
    "colorBlindMode": false,
    "animationsEnabled": true,
    "language": "en"
  }
}
```

---

## Security

### Encryption Method
- **Algorithm**: XOR cipher with fixed key
- **Encoding**: Base64 for transport
- **Purpose**: Prevent casual editing, not cryptographic security
- **Trade-off**: Easy to reverse-engineer but good enough for game saves

### Why Not Stronger Encryption?
- Browser-based games can't hide encryption keys
- Any encryption in JavaScript can be reversed
- Current approach balances:
  - ✅ Prevents accidental corruption
  - ✅ Stops casual cheating
  - ✅ Fast encryption/decryption
  - ✅ No external dependencies

---

## Use Cases

### For Users
1. **Backup before reset**: Export before using "Reset All Progress"
2. **Device migration**: Move progress to new computer/browser
3. **Browser data loss**: Recover if LocalStorage is cleared
4. **Multiple browsers**: Sync progress across browsers

### For Developers
1. **Testing**: Create specific game states
2. **Debugging**: Examine exact user data
3. **Support**: Help users with corrupted data
4. **Development**: Quick state switching

---

## Troubleshooting

### Import Fails
- ❌ **Error: "Invalid data format"**
  - File is corrupted or wrong format
  - Try exporting again from original source

- ❌ **Error: "Invalid encrypted data"**
  - File is not properly encrypted
  - Ensure you're using the correct `.mqsave` file

- ❌ **Error: "Invalid progress data"**
  - Data structure is incomplete
  - Check that all required fields exist

### Export Not Working
- Check browser console for errors
- Ensure pop-ups are not blocked
- Try using `window.mnemoDevDownload()` instead

---

## Examples

### Example 1: Manual Backup
```javascript
// 1. Export to console
const data = window.mnemoDevExport();

// 2. Copy the output and save to a text file
// 3. Later, restore with:
window.mnemoDevImport(data);
```

### Example 2: Quick Testing
```javascript
// Export current state
const backup = window.mnemoDevExport();

// Test something...

// Restore original state
window.mnemoDevImport(backup);
```

### Example 3: Give User Max Level
```javascript
// 1. Export
const data = window.mnemoDevExport();

// 2. Parse JSON
const parsed = JSON.parse(data);

// 3. Modify
parsed.progress.totalXP = 100000;
parsed.progress.level = 100;
parsed.progress.badges = ["first_game", "ten_games", "fifty_games", "century", "streak_30", "level_10", "perfectionist"];

// 4. Import
window.mnemoDevImport(JSON.stringify(parsed, null, 2));
```

---

## Best Practices

### For Users
✅ Export regularly (weekly/monthly)
✅ Store backups in cloud storage (Google Drive, Dropbox)
✅ Test imports in incognito window first
❌ Don't edit `.mqsave` files manually

### For Developers
✅ Use descriptive variable names when testing
✅ Keep backups before major state changes
✅ Validate data structure before import
✅ Use console export for quick debugging
❌ Don't expose unencrypted exports in production UI

---

## Technical Details

### File Extensions
- `.mqsave` - Encrypted user export (default)
- `.json` - Unencrypted developer export

### LocalStorage Keys
- `mnemoquest_progress` - Game progress data
- `mnemoquest_settings` - User settings

### Validation Checks
1. Version field exists
2. Progress and settings objects present
3. Required numeric fields are numbers
4. Badges array exists
5. Timestamp is valid ISO string

---

## Future Enhancements

Potential features for future versions:
- [ ] Cloud sync (Google Drive, Firebase)
- [ ] Auto-backup on level up
- [ ] Export individual game statistics
- [ ] Import with merge options
- [ ] Version migration system
- [ ] Compressed exports for larger saves
- [ ] QR code export/import for mobile

---

## Credits

**Developer**: Kyros Koh  
**Email**: me@kyroskoh.com  
**GitHub**: github.com/kyroskoh/mnemoquest

**License**: MIT

---

## Changelog

### Version 1.0 (November 2024)
- ✨ Initial export/import system
- 🔒 XOR encryption for user exports
- 🔧 Developer console tools
- 🔓 Secret code developer mode (`showdev`)
- ⚡ Quick max level feature for testing
- 📦 Auto-download functionality
- ✅ Data validation on import
- 🎨 Toast notifications
- 💾 Persistent developer mode state

