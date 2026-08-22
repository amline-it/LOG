#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

if [[ -f .venv/bin/activate ]]; then
  source .venv/bin/activate
fi

if [[ -f backend/main.py ]]; then
  cd backend
  exec uvicorn main:app --host 0.0.0.0 --port 8100 --reload
fi

if [[ -f backend/app/main.py ]]; then
  cd backend
  exec uvicorn app.main:app --host 0.0.0.0 --port 8100 --reload
fi

echo "API entrypoint not found. Adjust .cursor/scripts/run-api.sh after checkout."
sleep infinity
