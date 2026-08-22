#!/usr/bin/env bash
set -e

# Backend (اگر پوشه backend هست)
if [ -f backend/requirements.txt ]; then
  pip install -r backend/requirements.txt
fi

# Admin UI (اگر پوشه admin-ui هست)
if [ -f admin-ui/package.json ]; then
  cd admin-ui
  npm ci
  cp -n .env.staging.example .env.staging 2>/dev/null || true
  cd ..
fi

echo "Install done"
