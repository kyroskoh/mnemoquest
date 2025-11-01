# 🔨 Grunt Task Runner Guide for MnemoQuest

This guide explains how to use Grunt for building and deploying MnemoQuest.

## 📋 Table of Contents

1. [What is Grunt?](#what-is-grunt)
2. [Installation](#installation)
3. [Available Tasks](#available-tasks)
4. [Usage Examples](#usage-examples)
5. [GitHub Actions Integration](#github-actions-integration)
6. [Customizing Tasks](#customizing-tasks)

---

## 🔧 What is Grunt?

Grunt is a JavaScript task runner that automates repetitive tasks like:
- Building and compiling code
- Running tests
- Cleaning directories
- Deployment preparation

MnemoQuest uses Grunt to:
- ✅ Streamline the build process
- ✅ Integrate with CI/CD (GitHub Actions)
- ✅ Provide consistent task execution
- ✅ Enable easy deployment workflows

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Install Grunt CLI Globally

```bash
npm install -g grunt-cli
```

### Install Project Dependencies

```bash
npm install
```

This installs:
- `grunt` - Task runner core
- `grunt-contrib-clean` - Clean directories
- `grunt-shell` - Execute shell commands
- `load-grunt-tasks` - Auto-load grunt plugins
- `time-grunt` - Display task execution time

---

## 🎯 Available Tasks

### Primary Tasks

| Task | Command | Description |
|------|---------|-------------|
| **Build** | `grunt build` | Build project for production |
| **Dev** | `grunt dev` | Start development server |
| **Preview** | `grunt preview` | Preview production build |
| **Test** | `grunt test` | Run tests (placeholder) |
| **Deploy** | `grunt deploy` | Build and prepare for deployment |
| **CI** | `grunt ci` | Build for CI/CD (GitHub Actions) |
| **Clean** | `grunt clean-all` | Remove all generated files |
| **Install** | `grunt install` | Install npm dependencies |

### Task Details

#### `grunt build`

Builds the project for production deployment.

**What it does:**
1. Cleans `dist` directory
2. Compiles TypeScript
3. Runs Vite build
4. Generates optimized production files

**Output:**
- `dist/` - Production-ready files

**Usage:**
```bash
grunt build
```

**Expected output:**
```
Running "clean:dist" (clean) task
>> 3 paths cleaned.

Running "shell:typescript" (shell) task

Running "shell:viteBuild" (shell) task
vite v5.4.21 building for production...
✓ built in 1.63s

Done.
```

---

#### `grunt dev`

Starts the Vite development server.

**What it does:**
1. Launches Vite dev server on port 3000
2. Enables hot module replacement
3. Opens browser automatically

**Usage:**
```bash
grunt dev
```

**When to use:**
- Local development
- Testing changes in real-time
- Debugging

---

#### `grunt preview`

Previews the production build locally.

**What it does:**
1. Serves the `dist` folder
2. Simulates production environment
3. Tests optimized build

**Usage:**
```bash
grunt build    # Build first
grunt preview  # Then preview
```

---

#### `grunt test`

Runs the test suite (currently placeholder).

**What it does:**
- Placeholder for future test integration
- Can be expanded with Jest, Mocha, etc.

**Usage:**
```bash
grunt test
```

**Future enhancements:**
```javascript
// In Gruntfile.js
shell: {
  test: {
    command: 'jest --coverage'
  }
}
```

---

#### `grunt deploy`

Builds and prepares for deployment.

**What it does:**
1. Cleans dist directory
2. Compiles TypeScript
3. Runs Vite build
4. Shows git status
5. Displays deployment instructions

**Usage:**
```bash
grunt deploy
```

**Output:**
```
Preparing deployment...
✓ Build complete!
✓ Deploy the dist/ folder
```

**Next steps:**
- Upload `dist/` to hosting
- Or commit and push for auto-deployment

---

#### `grunt ci`

Special task for CI/CD environments.

**What it does:**
1. Clean build (no cache)
2. Compile TypeScript
3. Build for production
4. Optimized for GitHub Actions

**Usage:**
```bash
grunt ci
```

**Used in:**
- GitHub Actions workflows
- Automated deployments
- CI/CD pipelines

---

#### `grunt clean-all`

Removes all generated files.

**What it does:**
1. Deletes `dist` directory
2. Removes `.tmp` files
3. Cleans build artifacts

**Usage:**
```bash
grunt clean-all
```

**When to use:**
- Before fresh build
- Troubleshooting build issues
- Cleanup before commit

---

## 💡 Usage Examples

### Development Workflow

```bash
# 1. Install dependencies
npm install

# 2. Start development
grunt dev

# 3. Make changes...
# (Hot reload automatically updates)

# 4. Build for production
grunt build

# 5. Preview production build
grunt preview
```

---

### Deployment Workflow

```bash
# 1. Clean previous build
grunt clean-all

# 2. Build and prepare deployment
grunt deploy

# 3. Deploy dist/ folder
# Option A: Manual upload via FTP/SFTP
# Option B: Git commit and push (triggers GitHub Actions)
# Option C: Use deployment script

git add dist
git commit -m "Production build"
git push origin main
```

---

### Quick Commands

```bash
# Clean and rebuild
grunt clean-all && grunt build

# Build and preview in one go
grunt build && grunt preview

# Check build is working
grunt ci && ls -lh dist/
```

---

## 🚀 GitHub Actions Integration

### Workflow File: `.github/workflows/deploy.yml`

The GitHub Actions workflow now uses Grunt:

```yaml
- name: Install Grunt CLI
  run: npm install -g grunt-cli

- name: Build with Grunt
  run: grunt ci
```

### How It Works

1. **Push to main branch** triggers workflow
2. **GitHub Actions runner** checks out code
3. **Install dependencies** with npm ci
4. **Install Grunt CLI** globally
5. **Run `grunt ci`** to build
6. **Deploy to GitHub Pages**

### Manual Trigger

You can also trigger deployment manually:

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to GitHub Pages"
4. Click "Run workflow"

---

### Test Workflow: `.github/workflows/test.yml`

Automatically tests builds on pull requests:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]

steps:
  - name: Run Grunt CI build
    run: grunt ci
  
  - name: Run tests
    run: grunt test
```

**Triggers on:**
- Pull requests to `main`
- Pushes to `develop`

**Tests:**
- Build on Node.js 18 and 20
- Verify dist output
- Run test suite

---

## 🛠️ Customizing Tasks

### Adding New Tasks

Edit `Gruntfile.js` to add custom tasks:

#### Example: Add Linting

```javascript
// In Gruntfile.js

// 1. Install ESLint
// npm install --save-dev grunt-eslint

// 2. Add to shell config
shell: {
  lint: {
    command: 'eslint src/**/*.ts',
    options: {
      stdout: true,
      stderr: true
    }
  }
}

// 3. Register task
grunt.registerTask('lint', 'Run ESLint', [
  'shell:lint'
]);
```

Usage:
```bash
grunt lint
```

---

#### Example: Add Minification

```javascript
// Install dependencies
// npm install --save-dev grunt-contrib-uglify

// Configure
uglify: {
  options: {
    compress: true
  },
  dist: {
    files: {
      'dist/app.min.js': ['dist/app.js']
    }
  }
}

// Add to build task
grunt.registerTask('build', [
  'clean:dist',
  'shell:typescript',
  'shell:viteBuild',
  'uglify:dist'  // Add minification
]);
```

---

#### Example: Add Deployment to Specific Server

```javascript
shell: {
  deployVirtualmin: {
    command: './deploy-virtualmin.sh',
    options: {
      stdout: true,
      stderr: true
    }
  }
}

grunt.registerTask('deploy:virtualmin', 'Deploy to Virtualmin server', [
  'build',
  'shell:deployVirtualmin'
]);
```

Usage:
```bash
grunt deploy:virtualmin
```

---

### Modifying Existing Tasks

#### Change Build Output

```javascript
shell: {
  viteBuild: {
    command: 'vite build --mode production --outDir build',
    options: {
      stdout: true
    }
  }
}
```

#### Add Pre/Post Build Steps

```javascript
grunt.registerTask('build', [
  'clean:dist',
  'notify:buildStart',  // Add notification
  'shell:typescript',
  'shell:viteBuild',
  'compress:dist',      // Add compression
  'notify:buildEnd'     // Completion notification
]);
```

---

## 📊 Task Execution Time

Grunt automatically displays how long each task takes:

```
Execution Time (2024-11-01 12:00:00 UTC)
loading tasks     250ms  ▇▇▇▇▇▇ 15%
clean:dist        100ms  ▇▇ 6%
shell:typescript  500ms  ▇▇▇▇▇▇▇▇▇▇▇▇ 30%
shell:viteBuild   800ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 48%
Total 1.65s
```

This helps identify bottlenecks and optimize build times.

---

## 🐛 Troubleshooting

### Issue: `grunt: command not found`

**Solution:** Install Grunt CLI globally
```bash
npm install -g grunt-cli
```

---

### Issue: `Cannot find module 'grunt'`

**Solution:** Install project dependencies
```bash
npm install
```

---

### Issue: Build fails with TypeScript errors

**Solution:** Check TypeScript configuration
```bash
# Check for errors
tsc --noEmit

# Or run directly
grunt shell:typescript
```

---

### Issue: Vite build fails

**Solution:** Verify Vite configuration
```bash
# Test Vite build directly
vite build

# Check for missing dependencies
npm install
```

---

### Issue: Permission denied on scripts

**Solution:** Make scripts executable
```bash
chmod +x deploy-virtualmin.sh
```

---

## 📝 Best Practices

### 1. Use Specific Tasks

```bash
# Good: Specific task
grunt build

# Avoid: Generic task
npm run build
```

### 2. Clean Before Important Builds

```bash
# Always clean before deployment
grunt clean-all && grunt deploy
```

### 3. Test Locally Before CI

```bash
# Simulate CI environment
grunt ci
```

### 4. Use Time Reports

```bash
# Analyze build performance
grunt build --verbose
```

### 5. Document Custom Tasks

```javascript
grunt.registerTask('custom', 'Description of what it does', function() {
  grunt.log.writeln('Custom task explanation...');
  // Task implementation
});
```

---

## 🔄 npm vs Grunt Commands

| npm Command | Grunt Equivalent | Notes |
|-------------|------------------|-------|
| `npm run dev` | `grunt dev` | Development server |
| `npm run build` | `grunt build` | Production build |
| `npm run preview` | `grunt preview` | Preview build |
| N/A | `grunt deploy` | Grunt-specific |
| N/A | `grunt ci` | CI/CD optimized |

**Why use Grunt?**
- More control over task execution
- Better CI/CD integration
- Task composition and sequencing
- Time tracking and reporting
- Extensible with plugins

---

## 📚 Additional Resources

### Official Documentation
- [Grunt.js](https://gruntjs.com/)
- [Getting Started](https://gruntjs.com/getting-started)
- [Sample Gruntfile](https://gruntjs.com/sample-gruntfile)

### Grunt Plugins
- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
- [grunt-shell](https://github.com/sindresorhus/grunt-shell)
- [All Grunt Plugins](https://gruntjs.com/plugins)

### Related Guides
- `DEPLOYMENT.md` - Deployment instructions
- `BUILD_COMPLETE.md` - Build overview
- `CONTRIBUTING.md` - Contribution guidelines

---

## 🎯 Quick Reference

```bash
# Installation
npm install -g grunt-cli
npm install

# Common tasks
grunt              # Show available tasks
grunt build        # Production build
grunt dev          # Development server
grunt deploy       # Build + prepare deployment
grunt ci           # CI/CD build
grunt clean-all    # Clean everything

# Testing
grunt test         # Run tests

# Help
grunt --help       # Show all options
grunt build --verbose  # Verbose output
```

---

## ✅ Checklist for New Developers

- [ ] Install Node.js (v16+)
- [ ] Install Grunt CLI: `npm install -g grunt-cli`
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Test build: `grunt build`
- [ ] Start development: `grunt dev`
- [ ] Read `Gruntfile.js` to understand tasks

---

## 💬 Questions?

- 📧 Email: me@kyroskoh.com
- 🐙 GitHub Issues: Report problems
- 💬 Discussions: Ask questions

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Maintainer**: Kyros Koh

---

*Grunt makes automation simple. Build, test, deploy - all with consistent, repeatable commands.* 🔨

