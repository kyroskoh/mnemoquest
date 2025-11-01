# 🖥️ Virtualmin Quick Setup Guide

This guide will help you deploy MnemoQuest to your Virtualmin server with a subdomain.

## 📋 Prerequisites

- ✅ Virtualmin control panel access
- ✅ SSH access to your server
- ✅ Domain name with DNS control
- ✅ Basic command line knowledge

---

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Deployment Script

Edit the deployment script for your OS:

**Linux/Mac**: `deploy-virtualmin.sh`
**Windows**: `deploy-virtualmin.bat`

Change these lines at the top:
```bash
SERVER_USER="your_username"      # Your SSH username
SERVER_HOST="yourdomain.com"     # Your domain
SUBDOMAIN="mnemoquest"           # Subdomain name
```

Example:
```bash
SERVER_USER="john"
SERVER_HOST="example.com"
SUBDOMAIN="brain-game"
# Will deploy to: https://brain-game.example.com
```

### Step 2: Create Subdomain in Virtualmin

1. Login to Virtualmin control panel
2. Click **Create Virtual Server**
3. Select **Sub-server** (under existing domain)
4. Enter subdomain: `mnemoquest` (or your chosen name)
5. Click **Create Server**

Your subdomain will be created at:
```
/home/your_username/domains/mnemoquest.yourdomain.com/public_html/
```

### Step 3: Deploy!

**Linux/Mac:**
```bash
chmod +x deploy-virtualmin.sh
./deploy-virtualmin.sh
```

**Windows:**
```cmd
deploy-virtualmin.bat
```

That's it! Visit `https://mnemoquest.yourdomain.com`

---

## 🔒 Enable HTTPS/SSL (Recommended)

### Option 1: Using Virtualmin Panel

1. In Virtualmin, select your subdomain
2. Go to **Server Configuration** → **SSL Certificate**
3. Click **Let's Encrypt** tab
4. Click **Request Certificate**
5. Wait for certificate to be issued
6. Enable **SSL Website Enabled**

### Option 2: Using Command Line

```bash
ssh your_username@yourdomain.com

# Request Let's Encrypt certificate
sudo /usr/share/webmin/virtual-server/letsencrypt.sh \
  --domain mnemoquest.yourdomain.com
```

---

## 🔧 Manual Upload (Alternative Method)

If the deployment script doesn't work, you can upload manually:

### Using FileZilla or WinSCP

1. Build the project:
   ```bash
   npm run build
   ```

2. Connect to your server via SFTP:
   - Host: `yourdomain.com`
   - Username: Your Virtualmin username
   - Password: Your password
   - Port: 22

3. Navigate to:
   ```
   /home/username/domains/mnemoquest.yourdomain.com/public_html/
   ```

4. Upload ALL files from your local `dist` folder:
   - `index.html`
   - `robots.txt`
   - `assets/` folder (with all contents)

5. Set permissions (in SSH):
   ```bash
   chmod -R 755 /home/username/domains/mnemoquest.yourdomain.com/public_html/
   ```

---

## 📝 Create .htaccess File

After uploading files, create `.htaccess` in the public_html folder:

### Via SSH:
```bash
ssh your_username@yourdomain.com
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/
nano .htaccess
```

### Via FTP:
Create a new file named `.htaccess` on your local computer with this content:

```apache
# Enable mod_rewrite for SPA routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
</IfModule>
```

Upload it to the public_html folder.

---

## 🔄 Updating Your Site

When you make changes to MnemoQuest:

### Using Deployment Script:
```bash
# Just run the script again!
./deploy-virtualmin.sh
```

### Manual Update:
1. Run `npm run build` locally
2. Upload new files via FTP/SFTP
3. Replace all files in public_html

**Note**: The script creates automatic backups before each deployment!

---

## 🐛 Troubleshooting

### Problem: "Permission denied" errors

**Solution:**
```bash
ssh your_username@yourdomain.com
chmod -R 755 /home/username/domains/mnemoquest.yourdomain.com/public_html/
```

### Problem: 404 errors when refreshing pages

**Solution:** Ensure `.htaccess` file exists with the mod_rewrite rules shown above.

### Problem: CSS/JS files not loading

**Solution:**
1. Check that `assets` folder was uploaded
2. Clear browser cache (Ctrl + Shift + R)
3. Verify file permissions are 644 for files, 755 for folders

### Problem: SSL certificate not working

**Solution:**
1. Wait 5-10 minutes for DNS propagation
2. Check certificate was issued in Virtualmin
3. Verify subdomain DNS is pointing to your server
4. Try forcing HTTPS:

```apache
# Add to .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Problem: Deployment script can't connect

**Solution:**
1. Verify SSH access works:
   ```bash
   ssh your_username@yourdomain.com
   ```
2. Check firewall allows SSH (port 22)
3. Verify server hostname is correct

---

## 📊 Checking Your Deployment

### Via Browser:
1. Visit: `https://mnemoquest.yourdomain.com`
2. Open DevTools (F12) → Console
3. Check for any errors
4. Test all three games

### Via SSH:
```bash
ssh your_username@yourdomain.com
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/
ls -lah

# Should see:
# - index.html
# - robots.txt
# - assets/ folder
# - .htaccess
```

### Check File Sizes:
```bash
# Total size should be about 300KB
du -sh /home/username/domains/mnemoquest.yourdomain.com/public_html/
```

---

## 🎯 Performance Tips

### 1. Enable OpCache (PHP sites only)
In Virtualmin: Server Configuration → PHP Options → Enable OpCache

### 2. Enable Browser Caching
Already handled by the `.htaccess` file!

### 3. Use CloudFlare (Optional)
1. Sign up at cloudflare.com
2. Point your subdomain through CloudFlare
3. Enable caching and minification
4. Your origin remains your Virtualmin server

### 4. Monitor Performance
Use these tools:
- Google Lighthouse (in Chrome DevTools)
- GTmetrix (gtmetrix.com)
- WebPageTest (webpagetest.org)

---

## 📦 Backup Management

The deployment script creates automatic backups:

### View Backups:
```bash
ssh your_username@yourdomain.com
ls -lh ~/backup_mnemoquest_*
```

### Restore from Backup:
```bash
ssh your_username@yourdomain.com
cd /home/username/domains/mnemoquest.yourdomain.com/public_html/

# Restore specific backup
tar -xzf ~/backup_mnemoquest_20241101_143000.tar.gz
```

### Cleanup Old Backups:
```bash
# Keep only last 5 backups
cd ~
ls -t backup_mnemoquest_* | tail -n +6 | xargs rm -f
```

---

## 🎨 Custom Domain vs Subdomain

### Using Subdomain (Current Setup):
- URL: `https://mnemoquest.yourdomain.com`
- Easy to set up
- Good for testing or secondary projects

### Using Full Domain:
- URL: `https://mnemoquest.com`
- Requires separate domain purchase
- Point DNS to your Virtualmin server
- Create as main virtual server (not sub-server)

---

## 📞 Getting Help

### Check Logs:
```bash
# Apache error log
sudo tail -f /var/log/apache2/error.log

# Virtualmin-specific logs
sudo tail -f /var/webmin/miniserv.error
```

### Common Virtualmin Locations:
- Control Panel: Usually at `https://yourdomain.com:10000`
- Default web root: `/home/username/public_html/`
- Apache config: `/etc/apache2/sites-available/`

### Need More Help?
1. Check `DEPLOYMENT.md` for detailed instructions
2. Virtualmin documentation: https://www.virtualmin.com/documentation
3. Check your server's Apache/Nginx error logs

---

## ✅ Pre-Flight Checklist

Before deploying, ensure:

- [ ] Node.js and npm installed locally
- [ ] Project builds successfully (`npm run build`)
- [ ] SSH access to server works
- [ ] Subdomain created in Virtualmin
- [ ] Deployment script configured with correct paths
- [ ] .htaccess file ready (for Apache)
- [ ] SSL certificate plan (Let's Encrypt recommended)

---

## 🎉 Success!

Once deployed, you should have:

✅ MnemoQuest running on your subdomain
✅ HTTPS/SSL enabled
✅ Automatic backups before each deploy
✅ Fast page loads with caching
✅ Clean URLs with mod_rewrite

**Enjoy your memory training game!** 🧠🎮

---

**Quick Reference:**

```bash
# Deploy command
./deploy-virtualmin.sh

# Test locally first
npm run dev

# Build production
npm run build

# SSH to server
ssh username@yourdomain.com

# Check deployment
curl https://mnemoquest.yourdomain.com
```

