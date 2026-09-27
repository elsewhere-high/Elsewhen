#!/usr/bin/env bash
# Python runs exclusively in the Elsewhen Conda environment.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"
for task_tool in conda pnpm docker; do
    command -v "$task_tool" >/dev/null || { echo "Missing $task_tool. See README.md." >&2; exit 1; }
done
[ -d frontend/node_modules ] || { echo "Run ./setup.sh first." >&2; exit 1; }
[ -f backend/.env ] || cp backend/.env.example backend/.env
[ -f frontend/.env.local ] || cp frontend/.env.local.example frontend/.env.local
docker compose up --detach --wait postgres
conda run --no-capture-output -n elsewhen python scripts/local.py start
