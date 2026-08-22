#!/usr/bin/env bash
# Deploy LOG dashboard on test.amline.ir (212.80.24.56, Traefik)
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE="${LOG_IMAGE:-ghcr.io/amline-it/log-dashboard:staging}"

echo "==> Pulling ${IMAGE}"
docker pull "${IMAGE}"

echo "==> Starting with Traefik labels for test.amline.ir"
docker compose -f deploy/docker-compose.test-amline.ir.yml up -d

echo "==> Health check (local)"
sleep 3
docker exec amline-log-dashboard-test wget -qO- http://127.0.0.1:43123/inquiries/analytics >/dev/null

echo "OK — verify: https://test.amline.ir/inquiries/analytics"
