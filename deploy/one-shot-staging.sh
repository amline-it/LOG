#!/usr/bin/env bash
# Run on s.amline.ir server (ParminCloud console or SSH) as root.
# Brings up LOG dashboard on 127.0.0.1:43123 — nginx path routing still required.
set -euo pipefail

IMAGE="${LOG_IMAGE:-ghcr.io/amline-it/log-dashboard:staging}"
CONTAINER="${LOG_CONTAINER:-amline-log-dashboard}"
PORT="${LOG_PORT:-43123}"

echo "==> Pulling ${IMAGE}"
docker pull "${IMAGE}"

echo "==> Replacing container ${CONTAINER}"
docker rm -f "${CONTAINER}" 2>/dev/null || true
docker run -d \
  --name "${CONTAINER}" \
  --restart unless-stopped \
  -p "127.0.0.1:${PORT}:${PORT}" \
  -e NODE_ENV=production \
  -e PORT="${PORT}" \
  -e HOSTNAME=0.0.0.0 \
  "${IMAGE}"

echo "==> Health check"
curl -fsS "http://127.0.0.1:${PORT}/inquiries/analytics" >/dev/null
echo "OK — container listening on 127.0.0.1:${PORT}"
echo ""
echo "Add nginx blocks from deploy/nginx-s.amline.ir-staging.conf and reload nginx."
