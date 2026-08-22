# Deploy LOG Dashboard on s.amline.ir

## وضعیت فعلی

- **Repo:** https://github.com/amline-it/LOG
- **Image:** `ghcr.io/amline-it/log-dashboard:latest`
- **Target domain:** https://s.amline.ir/inquiries/analytics
- **Server IP:** `46.38.149.24` (ParminCloud)
- **Panel:** http://46.38.149.24:8080/login

## SSH (خودکار — فعلاً غیرفعال)

پورت **22** روی سرور از بیرون بسته است (timeout). برای فعال‌سازی deploy خودکار GitHub Actions:

1. پورت SSH را در فایروال ParminCloud باز کنید **یا** پورت SSH را به Actions secrets اضافه کنید (`DEPLOY_PORT`)
2. کلید عمومی deploy را به `authorized_keys` سرور اضافه کنید:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICGZAooR3CbC9UByRlk6xmdByta8yRz7t++Vh+ZGIGAg amline-log-deploy
```

3. در GitHub repo → Settings → Variables → `ENABLE_SSH_DEPLOY` = `true`

Secrets از قبل تنظیم شده: `DEPLOY_HOST`, `DEPLOY_USER`, `SSH_PRIVATE_KEY`

## Deploy دستی از ParminCloud Panel

1. ورود به http://46.38.149.24:8080/login
2. ساخت سرویس Docker جدید از یکی از روش‌ها:
   - **Git:** `https://github.com/amline-it/LOG` (branch: `main`)
   - **Image:** `ghcr.io/amline-it/log-dashboard:latest`
3. پورت container: `43123`
4. دامنه: `s.amline.ir`
5. Nginx reverse proxy (نمونه در `deploy/nginx-s.amline.ir.conf`):

```nginx
location / {
    proxy_pass http://127.0.0.1:43123;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Deploy دستی روی سرور (وقتی SSH باز است)

```bash
git clone https://github.com/amline-it/LOG.git /opt/amline-log
cd /opt/amline-log
docker compose up -d --build
bash deploy/deploy.sh
```

## CI/CD

هر push به `main`:
- Docker image → `ghcr.io/amline-it/log-dashboard:latest`
- SSH deploy فقط اگر `ENABLE_SSH_DEPLOY=true`
