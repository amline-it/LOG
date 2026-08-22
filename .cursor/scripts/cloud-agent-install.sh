#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

if [[ ! -f package.json ]]; then
  echo "package.json not found in $(pwd)"
  exit 1
fi

npm ci

echo "Install done"
