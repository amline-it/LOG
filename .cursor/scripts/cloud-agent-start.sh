#!/usr/bin/env bash
if [ -d admin-ui ]; then
  cd admin-ui
  npm run dev:staging -- --host 0.0.0.0 --port 3001
fi
