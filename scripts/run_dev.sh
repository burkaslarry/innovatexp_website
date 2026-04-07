#!/usr/bin/env bash
# Run a production build (same as Vercel) then start the dev server on :3000.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> npm run build (deploy parity / catch errors early)"
npm run build

echo "==> Free port 3000 (if anything is listening)"
if lsof -ti :3000 >/dev/null 2>&1; then
  lsof -ti :3000 | xargs kill -9 2>/dev/null || true
  echo "    Killed process(es) on :3000"
else
  echo "    Nothing on :3000"
fi

echo "==> npm run dev (http://localhost:3000)"
exec npm run dev
