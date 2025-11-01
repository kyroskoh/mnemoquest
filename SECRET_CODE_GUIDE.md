# 🔓 Secret Developer Mode Guide

## Activation

Simply type: **`showdev`** anywhere in the app (no input field required!)

- Works on any page (Dashboard, Progress, Settings, About)
- Case-insensitive
- No special key combinations needed
- Just start typing!

## What Happens

### Visual Feedback
1. ✅ Green toast notification: "🔧 Developer Mode Enabled!"
2. 🎨 Console message with styling
3. 🔧 New section appears in Settings

### New UI Section
Go to **Settings** and scroll down to see:

```
🔧 Developer Mode
├── 📋 Export to Console
│   └── View unencrypted data in browser console
├── 📄 Download JSON
│   └── Download human-readable JSON file
├── 📥 Import JSON
│   └── Import unencrypted JSON data
├── ⚡ Set Max Level
│   └── Instantly reach level 100 with all badges
└── 🔒 Disable Developer Mode
    └── Turn off developer features
```

## Features

### 1. Export to Console (📋)
- Prints unencrypted JSON to browser console
- Perfect for quick debugging
- Copy-paste friendly format

**Usage:**
```javascript
// Click button or:
window.mnemoDevExport()
```

### 2. Download JSON (📄)
- Downloads `.json` file
- Human-readable format
- Easy to edit in text editors

**File format:** `mnemoquest-backup-YYYY-MM-DD.json`

### 3. Import JSON (📥)
- Upload `.json` files
- Validates before importing
- Automatic page reload on success

### 4. Set Max Level (⚡)
Perfect for testing or demonstrations!

**What it does:**
- Sets XP to 100,000
- Sets level to 100
- Adds 500 games played
- Sets daily streak to 365
- Unlocks all badges:
  - First Steps
  - Dedicated (10 games)
  - Committed (50 games)
  - Centurion (100 games)
  - 3-Day Streak
  - Week Warrior
  - Monthly Master
  - Level 5
  - Level 10
  - Sharp Mind
  - Perfectionist

### 5. Disable Developer Mode (🔒)
- Removes all developer UI
- Clears localStorage flag
- Type `showdev` again to re-enable

## Persistence

✅ **Developer mode persists across:**
- Page refreshes
- Browser restarts
- Navigation between pages

❌ **Developer mode is cleared when:**
- You click "Disable Developer Mode"
- LocalStorage is cleared
- Browser data is wiped

**Storage Key:** `mnemo_dev_mode`

## Console Commands

Even without UI, you can always use console commands:

```javascript
// Export
window.mnemoDevExport()

// Download
window.mnemoDevDownload()

// Import
window.mnemoDevImport(jsonString)
```

These work regardless of developer mode status!

## Technical Details

### How It Works

```typescript
// 1. Keypress listener captures all typing
document.addEventListener('keypress', (e) => {
  keyBuffer += e.key.toLowerCase();
  // Keep last 7 characters
  if (keyBuffer === 'showdev') {
    // Activate!
  }
});

// 2. Store in localStorage
localStorage.setItem('mnemo_dev_mode', 'true');

// 3. Inject UI on settings page
const devSection = document.createElement('div');
devSection.innerHTML = `...developer controls...`;
```

### Security Considerations

⚠️ **Not cryptographically secure:**
- Secret code is visible in minified source
- Anyone can find it with basic JavaScript knowledge
- Designed for convenience, not security

✅ **Good enough for:**
- Game development
- Testing and debugging
- User support scenarios
- Demo purposes

❌ **Not suitable for:**
- Sensitive data protection
- Production security features
- User authentication

## Use Cases

### For Developers
1. **Testing**: Quickly set max level to test high-level features
2. **Debugging**: Export data to see exact state
3. **Support**: Help users by examining their data
4. **Development**: Rapid state switching

### For Power Users
1. **Backup**: Export readable JSON backups
2. **Edit**: Manually adjust progression
3. **Transfer**: Move data between browsers
4. **Recovery**: Fix corrupted data

### For Testers
1. **QA**: Test all badge unlock scenarios
2. **UI**: Check high-level UI displays
3. **Performance**: Test with max data
4. **Regression**: Verify import/export workflows

## Examples

### Example 1: Quick Max Level
```javascript
// 1. Type "showdev"
// 2. Go to Settings
// 3. Click "⚡ Set Max Level"
// 4. Confirm
// ✅ Done! Level 100 with all badges
```

### Example 2: Backup & Edit
```javascript
// 1. Type "showdev"
// 2. Click "📄 Download JSON"
// 3. Open file in text editor
// 4. Edit values (e.g., totalXP: 5000)
// 5. Click "📥 Import JSON"
// 6. Select edited file
// ✅ Custom state loaded!
```

### Example 3: Quick Debug
```javascript
// 1. Type "showdev"
// 2. Click "📋 Export to Console"
// 3. Check console (F12)
// 4. Copy JSON output
// 5. Share with developer
// ✅ Perfect for bug reports!
```

## Troubleshooting

### Secret Code Not Working
- ✅ Make sure you're typing in the app window
- ✅ Not in an input field (dashboard, not settings input)
- ✅ Try typing slower: `s-h-o-w-d-e-v`
- ✅ Check if already enabled (look in Settings)

### Developer Section Not Showing
- ✅ Navigate to Settings page
- ✅ Scroll down past "Data Management"
- ✅ Should appear before "Danger Zone"
- ✅ Try typing `showdev` again

### Buttons Not Working
- ✅ Check browser console for errors
- ✅ Ensure pop-ups are not blocked
- ✅ Try refreshing the page
- ✅ Clear browser cache

## Tips & Tricks

### Tip 1: Keyboard Shortcut
Create a bookmarklet for instant activation:
```javascript
javascript:(function(){localStorage.setItem('mnemo_dev_mode','true');location.reload();})()
```

### Tip 2: Quick Toggle
```javascript
// In console:
localStorage.setItem('mnemo_dev_mode', 'true');  // Enable
localStorage.removeItem('mnemo_dev_mode');        // Disable
location.reload();                                // Apply
```

### Tip 3: Check Status
```javascript
// In console:
console.log(localStorage.getItem('mnemo_dev_mode')); // null or 'true'
```

### Tip 4: Mass Testing
```javascript
// Set specific state for testing
const data = window.mnemoDevExport();
const parsed = JSON.parse(data);

// Modify as needed
parsed.progress.level = 50;
parsed.progress.totalXP = 10000;

// Import back
window.mnemoDevImport(JSON.stringify(parsed, null, 2));
```

## FAQ

**Q: Can users accidentally enable this?**
A: Unlikely. They'd need to type "showdev" without any prompting.

**Q: Is it safe to share the code?**
A: Yes! It's client-side only and doesn't affect other users.

**Q: Can I change the secret code?**
A: Yes! Edit the `SECRET_CODE` constant in `main.ts`.

**Q: Does it work on mobile?**
A: Typing on mobile keyboards works! Virtual keyboards included.

**Q: Can I have multiple secret codes?**
A: Yes! Add more checks in the `setupSecretCode()` function.

**Q: Does it interfere with normal typing?**
A: No! It only listens for the exact sequence "showdev".

**Q: Can I automate activation?**
A: Yes! Use localStorage or bookmarklets as shown above.

---

## Related Documentation

- 📦 [Export/Import Guide](EXPORT_IMPORT_GUIDE.md) - Full export/import documentation
- 🤝 [Contributing Guide](CONTRIBUTING.md) - Development guidelines
- 📖 [README](README.md) - Project overview

---

**Developer**: Kyros Koh  
**Contact**: me@kyroskoh.com  
**GitHub**: github.com/kyroskoh/mnemoquest

**Happy Debugging! 🐛✨**

