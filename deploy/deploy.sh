#!/usr/bin/env bash
set -euo pipefail

# Deploy Amline LOG monitoring dashboard to s.amline.ir
# Required env vars on the server (or export before running):
#   DEPLOY_DIR (default: /opt/amline-log)
#   REPO_URL (default: git@github.com:amline-it/LOG.git)

DEPLOY_DIR="${DEPLOY_DIR:-/opt/amline-log}"
REPO_URL="${REPO_URL:-git@github.com:amline-it/LOG.git}"
COMPOSE="docker compose"

echo "==> Deploying LOG dashboard to ${DEPLOY_DIR}"

if ! command -v docker >/dev/null; then
  echo "Docker is required on the server."
  exit 1
fi

if [[ ! -d "${DEPLOY_DIR}/.git" ]]; then
  git clone "${REPO_URL}" "${DEPLOY_DIR}"
fi

cd "${DEPLOY_DIR}"
git fetch origin main
git checkout main
git pull origin main

${COMPOSE} build --pull
${COMPOSE} up -d

echo "==> App running on http://127.0.0.1:43123"
echo "==> Configure nginx with deploy/nginx-s.amline.ir.conf and reload nginx"

if [[ -f deploy/nginx-s.amline.ir.conf ]]; then
  echo "Suggested nginx install:"
  echo "  sudo cp deploy/nginx-s.amline.ir.conf /etc/nginx/sites-available/s.amline.ir"
  echo "  sudo ln -sf /etc/nginx/sites-available/s.amline.ir /etc/nginx/sites-enabled/s.amline.ir"
  echo "  sudo nginx -t && sudo systemctl reload nginx"
fi

curl -fsS http://127.0.0.1:43123/inquiries/analytics >/dev/null && echo "Health check OK"
