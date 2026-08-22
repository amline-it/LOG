# دیپلوی LOG روی s.amline.ir (ParminCloud)

## سرور

| مورد | مقدار |
|------|--------|
| **دامنه** | `s.amline.ir` |
| **IP** | `46.38.149.24` |
| **هاست** | ParminCloud |
| **پنل** | http://46.38.149.24:8080/login |
| **Registry** | `hub.cr.parmincloud.ir` |

سایت marketing املاین از **GitLab CI** به registry پارمین push می‌شود و ParminCloud آن را سرو می‌کند — همان الگو برای LOG dashboard.

## مسیر دیپلوی (پنل ParminCloud)

### ۱. سرویس Docker

- **Image:** `ghcr.io/amline-it/log-dashboard:staging`
- **Port داخلی:** `43123`
- **Bind:** فقط `127.0.0.1:43123`

### ۲. Nginx path routing

از `deploy/nginx-s.amline.ir-staging.conf` داخل server block `s.amline.ir` استفاده کنید، سپس nginx reload.

### ۳. تأیید

- https://s.amline.ir/inquiries/analytics
- https://s.amline.ir/api/monitoring

## one-shot

```bash
bash deploy/one-shot-staging.sh
```
