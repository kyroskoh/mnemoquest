# 🚀 Deployment Guide for MnemoQuest

This guide explains how to deploy MnemoQuest to various platforms.

🎮 **[Live Demo →](https://kyroskoh.github.io/mnemoquest/)** (Deployed on GitHub Pages)

## 📦 Build the Project

Before deploying, build the production version:

```bash
npm install
npm run build
```

This creates optimized files in the `dist` directory.

---

## 🌐 Netlify Deployment (Recommended)

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Option 2: Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Build settings are automatically detected from `netlify.toml`
5. Click "Deploy site"

Your site will be live at: `https://your-site-name.netlify.app`

---

## 🐙 GitHub Pages Deployment

### Automatic Deployment (via GitHub Actions)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/mnemoquest.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to your repository Settings
   - Navigate to "Pages"
   - Select "GitHub Actions" as the source

3. The GitHub Action (`.github/workflows/deploy.yml`) will automatically build and deploy on every push to `main`

Your site will be live at: `https://yourusername.github.io/mnemoquest/`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Install gh-pages:
```bash
npm install -g gh-pages
```

3. Deploy:
```bash
gh-pages -d dist
```

---

## ☁️ Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Create a new project
3. Connect your Git repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
5. Deploy

Your site will be live at: `https://mnemoquest.pages.dev`

---

## 🔧 Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or use the Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel automatically detects Vite settings
4. Deploy

Your site will be live at: `https://mnemoquest.vercel.app`

---

## 🖥️ Virtualmin / Custom Server Deployment

If you have your own server running Virtualmin with subdomain capabilities:

### Prerequisites
- Access to Virtualmin control panel
- SSH access to your server (recommended)
- Domain with DNS management

### Step 1: Build the Project Locally

```bash
npm install
npm run build
```

This creates the `dist` folder with all production files.

### Step 2: Create Subdomain in Virtualmin

1. **Login to Virtualmin** control panel
2. Navigate to **Create Virtual Server** (or **Sub-Server** if adding to existing domain)
3. Configure subdomain:
   - **Domain name**: `mnemoquest.yourdomain.com` (or any subdomain you prefer)
   - **Server type**: Select "Sub-server" if adding to existing domain
   - **Home directory**: Note this path (e.g., `/home/username/domains/mnemoquest.yourdomain.com/public_html`)
4. Click **Create Server**

### Step 3: Upload Files

**Option A: Using FTP/SFTP (Easy)**

1. Use an FTP client (FileZilla, WinSCP, Cyberduck)
2. Connect to your server:
   - **Host**: `yourdomain.com` or server IP
   - **Username**: Your Virtualmin username
   - **Password**: Your password
   - **Port**: 22 (SFTP) or 21 (FTP)
3. Navigate to subdomain's public_html folder:
   ```
   /home/username/domains/mnemoquest.yourdomain.com/public_html/
   ```
4. Upload ALL contents from your local `dist` folder
   - Upload `index.html`
   - Upload `robots.txt`
   - Upload `assets` folder with all files

**Option B: Using SSH/SCP (Recommended)**

From your local machine:

```bash
# Compress the dist folder
cd MnemoQuest
tar -czf dist.tar.gz -C dist .

# Upload to server
scp dist.tar.gz username@yourdomain.com:/home/username/

# SSH into server
ssh username@yourdomain.com

# Extract to subdomain directory
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/
tar -xzf ~/dist.tar.gz
rm ~/dist.tar.gz

# Set correct permissions
chmod -R 755 .
chown -R username:username .
```

**Option C: Using Git (Advanced)**

1. Set up Git repository on your server
2. Push your project to the server
3. SSH into server and build there:

```bash
ssh username@yourdomain.com
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/

# Clone your repository
git clone https://github.com/yourusername/mnemoquest.git temp
mv temp/* .
mv temp/.* . 2>/dev/null || true
rm -rf temp

# Install and build
npm install
npm run build

# Move built files to web root
rm -rf assets index.html robots.txt 2>/dev/null
mv dist/* .
rm -rf dist
```

### Step 4: Configure Web Server

Virtualmin typically uses Apache. Create/edit `.htaccess` file in your public_html:

```bash
# SSH into server
ssh username@yourdomain.com
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/

# Create .htaccess file
nano .htaccess
```

Add this content:

```apache
# Enable mod_rewrite
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle SPA routing (send all requests to index.html)
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Set cache headers for static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

Save and exit (Ctrl+X, then Y, then Enter in nano).

### Step 5: Configure SSL/HTTPS (Recommended)

In Virtualmin:

1. Go to **Server Configuration** → **SSL Certificate**
2. Choose one of:
   - **Let's Encrypt**: Free SSL (recommended)
     - Click "Let's Encrypt" tab
     - Check "Request Certificate"
     - Click "Request Certificate"
   - **Upload Certificate**: If you have your own
3. Enable **SSL Website Enabled**: Set to "Yes"

Or via command line (Let's Encrypt):

```bash
# SSH into server
ssh username@yourdomain.com

# Request certificate using Virtualmin's certbot
sudo /usr/share/webmin/virtual-server/letsencrypt.sh \
  --domain mnemoquest.yourdomain.com
```

### Step 6: Test Your Deployment

1. Visit: `https://mnemoquest.yourdomain.com`
2. Test all three games
3. Check browser console for any errors (F12)
4. Test on mobile device

### Updating Your Site

When you make changes:

```bash
# Local machine
npm run build

# Upload via SCP
cd MnemoQuest
tar -czf dist.tar.gz -C dist .
scp dist.tar.gz username@yourdomain.com:/home/username/

# Server
ssh username@yourdomain.com
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/
tar -xzf ~/dist.tar.gz
rm ~/dist.tar.gz
```

### Troubleshooting

**Issue**: 404 errors on page refresh
- **Solution**: Ensure `.htaccess` mod_rewrite rules are correct
- Check Apache has mod_rewrite enabled: `sudo a2enmod rewrite`

**Issue**: Permission denied errors
- **Solution**: Fix permissions:
  ```bash
  chmod -R 755 /home/username/domains/mnemoquest.yourdomain.com/public_html/
  ```

**Issue**: CSS/JS files not loading
- **Solution**: Check file paths are relative (they should be with base: './' in vite.config.js)
- Clear browser cache (Ctrl+Shift+R)

**Issue**: SSL certificate errors
- **Solution**: Verify SSL is properly installed in Virtualmin
- Check certificate includes subdomain
- Wait a few minutes for DNS propagation

### Performance Optimization

For better performance on your Virtualmin server:

1. **Enable Caching** in Virtualmin:
   - Server Configuration → Website Options
   - Enable "Browser caching"

2. **Enable Compression**:
   - Already handled by `.htaccess` if mod_deflate is enabled

3. **Set up CloudFlare** (optional):
   - Point your subdomain to CloudFlare
   - Enable CloudFlare's CDN and caching
   - Keep origin server as your Virtualmin server

### Quick Deploy Script

Create a deployment script `deploy.sh`:

```bash
#!/bin/bash
# deploy.sh - Quick deployment script

SERVER="username@yourdomain.com"
REMOTE_PATH="/home/username/domains/mnemoquest.yourdomain.com/public_html"

echo "🏗️  Building project..."
npm run build

echo "📦 Creating archive..."
tar -czf dist.tar.gz -C dist .

echo "⬆️  Uploading to server..."
scp dist.tar.gz $SERVER:/tmp/

echo "🚀 Deploying on server..."
ssh $SERVER << 'ENDSSH'
cd '$REMOTE_PATH'
tar -xzf /tmp/dist.tar.gz
rm /tmp/dist.tar.gz
chmod -R 755 .
echo "✅ Deployment complete!"
ENDSSH

rm dist.tar.gz
echo "🎉 Done! Visit https://mnemoquest.yourdomain.com"
```

Make it executable and use:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🌍 Custom Domain Setup

### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions

### For GitHub Pages:
1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS with your domain provider:
   - Add A records pointing to GitHub's IPs
   - Or add a CNAME record pointing to `yourusername.github.io`

### For Cloudflare Pages:
1. Go to Custom domains
2. Add your domain
3. Follow DNS configuration (automatic if using Cloudflare DNS)

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Test all three games thoroughly
- [ ] Verify progress saves to LocalStorage
- [ ] Check responsive design on mobile devices
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify all badges unlock correctly
- [ ] Test color-blind mode
- [ ] Check that settings persist
- [ ] Ensure sound effects work (when implemented)
- [ ] Verify charts display correctly
- [ ] Test daily streak calculation
- [ ] Check for console errors

---

## 🐛 Troubleshooting

### Build Errors

**Issue**: TypeScript compilation errors
- **Solution**: Run `npm install` and ensure all dependencies are installed

**Issue**: Vite build fails
- **Solution**: Clear cache with `rm -rf node_modules .vite dist` and reinstall

### Deployment Issues

**Issue**: Site loads but shows blank page
- **Solution**: Check browser console for errors. Ensure `base` in `vite.config.js` is set correctly

**Issue**: 404 errors on page refresh
- **Solution**: Ensure your hosting platform is configured for SPA routing (check `netlify.toml`)

**Issue**: Assets not loading
- **Solution**: Verify the `base` path in `vite.config.js` matches your deployment URL

---

## 📊 Post-Deployment

### Analytics (Optional)

Add analytics to track usage:

1. Google Analytics
2. Plausible Analytics
3. Umami Analytics

### Performance Monitoring

Use tools like:
- Lighthouse (built into Chrome DevTools)
- WebPageTest
- GTmetrix

### User Feedback

Consider adding:
- Feedback form
- Bug report mechanism
- Contact information

---

## 🔄 Updating Your Deployment

To update your live site:

1. Make changes to your code
2. Test locally with `npm run dev`
3. Commit and push to your repository
4. Automatic deployments will handle the rest!

Or for manual deployments:
```bash
npm run build
netlify deploy --prod
# or
gh-pages -d dist
# or
vercel --prod
```

---

**Happy Deploying! 🚀**

