#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

if [[ -f admin/package.json ]]; then
  cd admin
  exec npm run dev -- --port 3001 --hostname 0.0.0.0
fi

if [[ -f frontend/apps/admin/package.json ]]; then
  cd frontend/apps/admin
  exec npm run dev -- --port 3001 --hostname 0.0.0.0
fi

if [[ -f package.json ]]; then
  exec npm run dev -- --port 43123 --hostname 0.0.0.0
fi

echo "Admin entrypoint not found. Adjust .cursor/scripts/run-admin.sh after checkout."
sleep infinity
