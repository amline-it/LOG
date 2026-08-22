# Staging: s.amline.ir/inquiries/analytics

`s.amline.ir` is already the Amline marketing **staging** site (`amline-build-sha: 4592865-staging`).
LOG dashboard deploys as a **separate container** behind nginx path prefix.

## Target URLs

- https://s.amline.ir/inquiries/analytics
- https://s.amline.ir/api/monitoring

## ParminCloud Panel (required)

1. Login: http://46.38.149.24:8080/login
2. Add Docker service:
   - Image: `ghcr.io/amline-it/log-dashboard:staging` (or `:latest`)
   - Internal port: `43123`
   - Do **not** bind public port 443 — use nginx path routing below

## Nginx (path-based on existing s.amline.ir site)

Use `deploy/nginx-s.amline.ir-staging.conf`:

```nginx
location /inquiries/ {
    proxy_pass http://127.0.0.1:43123/inquiries/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /api/monitoring {
    proxy_pass http://127.0.0.1:43123/api/monitoring;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Reload nginx after edit.

## Git / CI

- Repo: https://github.com/amline-it/LOG
- Branch: `staging` (staging deploys)
- Image tags: `ghcr.io/amline-it/log-dashboard:staging`

## Blockers (Cloud Agent)

- SSH port 22 on `46.38.149.24` is closed externally
- ParminCloud panel credentials required for automated deploy
