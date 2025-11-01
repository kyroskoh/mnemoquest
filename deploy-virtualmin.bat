@echo off
REM ##############################################
REM MnemoQuest - Virtualmin Deployment Script (Windows)
REM 
REM Quick deployment to your Virtualmin server from Windows
REM ##############################################

REM ===== CONFIGURATION =====
REM CHANGE THESE TO MATCH YOUR SERVER SETUP

set SERVER_USER=your_username
set SERVER_HOST=yourdomain.com
set SUBDOMAIN=mnemoquest
set REMOTE_PATH=/home/%SERVER_USER%/domains/%SUBDOMAIN%.%SERVER_HOST%/public_html

REM ===== END CONFIGURATION =====

echo ==========================================
echo   MnemoQuest - Virtualmin Deploy (Windows)
echo ==========================================
echo.

REM Check if configuration is still default
if "%SERVER_USER%"=="your_username" (
    echo [ERROR] Please edit this script and update the configuration section!
    echo.
    echo Edit the following variables at the top of deploy-virtualmin.bat:
    echo   - SERVER_USER (your SSH username^)
    echo   - SERVER_HOST (your domain or server IP^)
    echo   - SUBDOMAIN (subdomain for MnemoQuest^)
    echo.
    pause
    exit /b 1
)

REM Step 1: Build
echo [1/4] Building project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo [OK] Build complete!
echo.

REM Step 2: Create archive (requires tar on Windows - available in Windows 10+)
echo [2/4] Creating deployment archive...
tar -czf dist.tar.gz -C dist .
if errorlevel 1 (
    echo [ERROR] Archive creation failed!
    echo NOTE: This requires tar on Windows (available in Windows 10+^)
    echo Alternative: Use WinSCP or FileZilla to manually upload the 'dist' folder
    pause
    exit /b 1
)
echo [OK] Archive created!
echo.

REM Step 3: Upload (requires scp - comes with OpenSSH on Windows 10+)
echo [3/4] Uploading to %SERVER_HOST%...
scp dist.tar.gz %SERVER_USER%@%SERVER_HOST%:/tmp/
if errorlevel 1 (
    echo [ERROR] Upload failed!
    echo NOTE: This requires OpenSSH on Windows
    echo Alternative: Use WinSCP or FileZilla to manually upload
    pause
    exit /b 1
)
echo [OK] Upload complete!
echo.

REM Step 4: Deploy on server
echo [4/4] Deploying on server...
ssh %SERVER_USER%@%SERVER_HOST% "cd %REMOTE_PATH% && tar -xzf /tmp/dist.tar.gz && rm /tmp/dist.tar.gz && chmod -R 755 . && echo '[OK] Server deployment complete!'"
if errorlevel 1 (
    echo [ERROR] Deployment on server failed!
    pause
    exit /b 1
)
echo.

REM Cleanup
del dist.tar.gz

REM Success message
echo ==========================================
echo   Deployment Successful!
echo ==========================================
echo.
echo Your MnemoQuest game is now live at:
echo https://%SUBDOMAIN%.%SERVER_HOST%
echo.
echo Next steps:
echo   1. Visit your site and test all games
echo   2. Check SSL certificate is working
echo   3. Test on mobile devices
echo.
pause

