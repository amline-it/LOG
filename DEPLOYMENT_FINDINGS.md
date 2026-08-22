# LOG Dashboard Deployment Exploration Report

**Date:** Saturday, Aug 22, 2026
**Agent:** Cloud Computer Use Agent

## Summary

Explored the deployment environment for the LOG monitoring dashboard on https://s.amline.ir. The dashboard is **NOT currently deployed** at the target path `/inquiries/analytics`. 

## Key Findings

### 1. ParminCloud Panel
- **URL:** http://46.38.149.24:8080/login
- **Status:** Accessible (returns 200 OK)
- **Server:** nginx
- **Login Required:** Yes
- **Saved Credentials:** None found in browser
- **Screenshot:** Available at `/tmp/computer-use/a76bf.webp`

#### Panel Details:
- Persian interface
- Title: "ورود کارشناسان" (Expert Login)
- Description: "پنل مدیریت سیستم وام ظهیر عذر" (Panel management system loan...)
- Fields: Username (نام کاربری), Password (رمز عبور)
- Login button: "ورود به پنل" (Enter Panel)

### 2. Current Staging Site
- **URL:** https://s.amline.ir
- **Status:** Accessible
- **Content:** Amline real estate/property contracts platform (سامانه قرارداد آنلاین املاک)
- **Target Path:** https://s.amline.ir/inquiries/analytics
- **Status:** **404 Not Found** - Dashboard NOT deployed
- **Screenshot:** Available at `/tmp/computer-use/f6bd5.webp`

### 3. SSH Access
- **Port 22:** BLOCKED (Connection timeout)
- **Status:** SSH is not accessible from external network
- **Note:** According to DEPLOY.md, SSH port is closed in ParminCloud firewall

### 4. API Endpoints Tested
- `/api` - 404 Not Found
- `/dashboard` - 404 Not Found
- `/` - Redirects to `/login`

### 5. Network Information
From Network tab inspection:
- Panel uses HTTPS redirects
- No exposed API endpoints without authentication
- Server running nginx

## Deployment Requirements

Based on DEPLOY.md and exploration:

### Manual Deployment Options:

#### Option 1: Via ParminCloud Panel (REQUIRES LOGIN)
1. Login to http://46.38.149.24:8080/login
2. Create new Docker service with:
   - Git: https://github.com/amline-it/LOG (branch: main)
   - OR Image: `ghcr.io/amline-it/log-dashboard:latest`
3. Configure:
   - Container port: 43123
   - Domain: s.amline.ir
   - Path: /inquiries/analytics
4. Setup nginx reverse proxy (config in `deploy/nginx-s.amline.ir.conf`)

#### Option 2: Via SSH (REQUIRES PORT OPENING)
Currently blocked. Would require:
1. Opening SSH port (22) in ParminCloud firewall
2. Adding deploy SSH key to authorized_keys
3. Running: `bash deploy/deploy.sh`

#### Option 3: GitHub Actions (REQUIRES SSH + CONFIG)
Configured but disabled. Would require:
1. SSH access enabled
2. Set `ENABLE_SSH_DEPLOY=true` in GitHub repo variables
3. Push to main branch

### Blockers

**Critical Blocker:** No panel credentials available
- Cannot login to ParminCloud panel
- Cannot deploy via UI
- Cannot enable SSH access

**Secondary Blocker:** SSH port blocked
- Cannot deploy via command line
- Cannot use automated GitHub Actions

## Docker Configuration

Application details from repo:
- **Image:** `ghcr.io/amline-it/log-dashboard:latest`
- **Port:** 43123
- **Base Path:** `/inquiries/analytics`
- **Dockerfile:** Present in repo
- **docker-compose.yml:** Present in repo

## Nginx Configuration

Target nginx config (`deploy/nginx-s.amline.ir.conf`):
```nginx
server {
    listen 80;
    server_name s.amline.ir;
    
    location / {
        proxy_pass http://127.0.0.1:43123;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Screenshots

1. **ParminCloud Login Page:** `/tmp/computer-use/a76bf.webp`
2. **s.amline.ir Main Page:** `/tmp/computer-use/af08e.webp`
3. **Target Path 404 Error:** `/tmp/computer-use/f6bd5.webp`
4. **Network Tab Analysis:** `/tmp/computer-use/321b3.webp`

## Next Steps

To proceed with deployment, one of the following is required:

1. **Get ParminCloud Panel Credentials**
   - Contact system administrator for login credentials
   - Login and deploy via web UI

2. **Enable SSH Access**
   - Open port 22 in ParminCloud firewall
   - Add deploy SSH key to server
   - Deploy via command line

3. **Alternative Deployment Method**
   - If ParminCloud has API, obtain API credentials
   - Explore alternative deployment panels/tools

## Technical Details

- **Server IP:** 46.38.149.24
- **Panel Port:** 8080 (HTTP)
- **SSH Port:** 22 (BLOCKED)
- **App Port:** 43123 (internal)
- **Domain:** s.amline.ir
- **GitHub Repo:** https://github.com/amline-it/LOG
- **Branch:** main
- **Docker Registry:** ghcr.io

