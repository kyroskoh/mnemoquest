#!/bin/bash

##############################################
# MnemoQuest - Virtualmin Deployment Script
# 
# Quick deployment to your Virtualmin server
##############################################

# ===== CONFIGURATION =====
# CHANGE THESE TO MATCH YOUR SERVER SETUP

SERVER_USER="your_username"                    # Your SSH username
SERVER_HOST="yourdomain.com"                   # Your domain or server IP
SUBDOMAIN="mnemoquest"                         # Subdomain name
REMOTE_PATH="/home/${SERVER_USER}/domains/${SUBDOMAIN}.${SERVER_HOST}/public_html"

# ===== END CONFIGURATION =====

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Error handling
set -e
trap 'echo -e "${RED}❌ Deployment failed!${NC}"; exit 1' ERR

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🧠 MnemoQuest - Virtualmin Deploy   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if configuration is still default
if [ "$SERVER_USER" = "your_username" ] || [ "$SERVER_HOST" = "yourdomain.com" ]; then
    echo -e "${RED}⚠️  Please edit this script and update the configuration section!${NC}"
    echo ""
    echo "Edit the following variables at the top of deploy-virtualmin.sh:"
    echo "  - SERVER_USER (your SSH username)"
    echo "  - SERVER_HOST (your domain or server IP)"
    echo "  - SUBDOMAIN (subdomain for MnemoQuest)"
    echo ""
    exit 1
fi

# Step 1: Build
echo -e "${YELLOW}[1/5]${NC} 🏗️  Building project..."
npm run build
echo -e "${GREEN}✓${NC} Build complete!"
echo ""

# Step 2: Create archive
echo -e "${YELLOW}[2/5]${NC} 📦 Creating deployment archive..."
tar -czf dist.tar.gz -C dist .
echo -e "${GREEN}✓${NC} Archive created!"
echo ""

# Step 3: Upload
echo -e "${YELLOW}[3/5]${NC} ⬆️  Uploading to ${SERVER_HOST}..."
scp -q dist.tar.gz ${SERVER_USER}@${SERVER_HOST}:/tmp/
echo -e "${GREEN}✓${NC} Upload complete!"
echo ""

# Step 4: Deploy on server
echo -e "${YELLOW}[4/5]${NC} 🚀 Deploying on server..."
ssh ${SERVER_USER}@${SERVER_HOST} << ENDSSH
    set -e
    
    # Create backup of current deployment
    if [ -d "${REMOTE_PATH}" ] && [ "\$(ls -A ${REMOTE_PATH})" ]; then
        BACKUP_DATE=\$(date +%Y%m%d_%H%M%S)
        echo "   Creating backup: backup_\${BACKUP_DATE}.tar.gz"
        cd ${REMOTE_PATH}
        tar -czf ~/backup_mnemoquest_\${BACKUP_DATE}.tar.gz . 2>/dev/null || true
    fi
    
    # Extract new files
    echo "   Extracting files..."
    cd ${REMOTE_PATH}
    tar -xzf /tmp/dist.tar.gz
    rm /tmp/dist.tar.gz
    
    # Set permissions
    echo "   Setting permissions..."
    chmod -R 755 .
    find . -type f -exec chmod 644 {} \;
    
    echo "   ✅ Server deployment complete!"
ENDSSH

echo -e "${GREEN}✓${NC} Server deployment complete!"
echo ""

# Step 5: Cleanup
echo -e "${YELLOW}[5/5]${NC} 🧹 Cleaning up..."
rm dist.tar.gz
echo -e "${GREEN}✓${NC} Cleanup complete!"
echo ""

# Success message
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     🎉 Deployment Successful! 🎉      ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "Your MnemoQuest game is now live at:"
echo -e "${BLUE}https://${SUBDOMAIN}.${SERVER_HOST}${NC}"
echo ""
echo -e "Next steps:"
echo -e "  1. Visit your site and test all games"
echo -e "  2. Check SSL certificate is working"
echo -e "  3. Test on mobile devices"
echo ""
echo -e "Need to rollback? SSH to your server and check for backups:"
echo -e "  ssh ${SERVER_USER}@${SERVER_HOST}"
echo -e "  ls -lh ~/backup_mnemoquest_*"
echo ""

