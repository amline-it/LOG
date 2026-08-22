#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

if [[ ! -d node_modules ]]; then
  bash .cursor/scripts/cloud-agent-install.sh
fi

echo "LOG monitoring environment ready (dev server runs in terminals)"
