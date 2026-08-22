# Amline Inquiry Monitoring

داشبورد مانیتورینگ حرفه‌ای برای سرویس‌های استعلام Amline — شامل شاهکار، کد پستی، احراز هویت، KYC و سایر سرویس‌های فعال.

## قابلیت‌ها

- **ماتریس سرویس × سازمان**: برای هر سرویس، سازمان‌های ارائه‌دهنده، Primary/Fallback، وضعیت فعال/غیرفعال
- **اولویت پاسخ‌دهی**: ترتیب اولویت سازمان‌های فعال
- **KPI و breakdown**: موفق، ناموفق، timeout، بدون نتیجه
- **عملکرد سازمان‌ها**: نرخ موفقیت، میانگین زمان پاسخ، progress bar
- **نمودارها**: روند، توزیع وضعیت، مقایسه provider، ساعت اوج
- **آخرین خطاها**: لیست realtime خطاهای اخیر

## اجرا

```bash
npm install
npm run dev -- --port 43123 --hostname 0.0.0.0
```

- Dashboard: `http://127.0.0.1:43123/inquiries/analytics`
- API: `http://127.0.0.1:43123/api/monitoring`

## اتصال به backend واقعی

API فعلی mock است. برای اتصال به `amline-repo`:

1. `VITE_API_BASE_URL` یا `NEXT_PUBLIC_API_BASE_URL` را به `http://127.0.0.1:8100` تنظیم کنید
2. endpointهای `/admin/inquiries/analytics/*` را map کنید
3. mock store در `src/lib/data/monitoring-store.ts` را با fetch واقعی جایگزین کنید

## ساختار

```
src/
  app/
    api/monitoring/route.ts
    inquiries/analytics/page.tsx
  components/monitoring/
  lib/
    data/monitoring-store.ts
    types/monitoring.ts
```

## Repository

- **هدف:** `amline-it/LOG` (GitHub یا Origin)
- **دامنه:** `https://s.amline.ir/inquiries/analytics`

## Deploy روی s.amline.ir

```bash
git clone git@github.com:amline-it/LOG.git /opt/amline-log
cd /opt/amline-log
docker compose up -d --build
sudo cp deploy/nginx-s.amline.ir.conf /etc/nginx/sites-available/s.amline.ir
sudo ln -sf /etc/nginx/sites-available/s.amline.ir /etc/nginx/sites-enabled/s.amline.ir
sudo nginx -t && sudo systemctl reload nginx
```

GitHub Actions: secrets `DEPLOY_HOST`, `DEPLOY_USER`, `SSH_PRIVATE_KEY`

## نکته Cloud Agent

repo اصلی `amline-production` در این محیط در دسترس نبود؛ این slice مستقل برای نمایش UI و مدل داده Service Sources ساخته شده و آماده اتصال به backend واقعی است.
