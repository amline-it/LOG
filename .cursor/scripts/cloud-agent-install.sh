#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

if [[ -f backend/requirements.txt ]]; then
  python3 -m venv .venv
  # shellcheck disable=SC1091
  source .venv/bin/activate
  pip install -U pip wheel
  pip install -r backend/requirements.txt
fi

if [[ -f backend/pyproject.toml ]]; then
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -U pip wheel
  pip install -e backend
fi

if [[ -f admin/package.json ]]; then
  cd admin
  npm ci
  cd "$ROOT"
fi

if [[ -f frontend/apps/admin/package.json ]]; then
  cd frontend/apps/admin
  npm ci
  cd "$ROOT"
fi

if [[ -f package.json && ! -f admin/package.json ]]; then
  npm ci
fi

echo "Install complete."
