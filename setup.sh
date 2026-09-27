#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"
for task_tool in conda pnpm; do
    command -v "$task_tool" >/dev/null || { echo "Install $task_tool before setup." >&2; exit 1; }
done
if ! conda run -n elsewhen python -c 'import sys; assert sys.version_info >= (3, 12)' >/dev/null 2>&1; then
    conda env create -f environment.yml
fi
conda run --no-capture-output -n elsewhen python -m pip install 'uv==0.12.19'
ELSEWHEN_ENV_PREFIX="$(conda run --no-capture-output -n elsewhen python -c 'import sys; print(sys.prefix)')"
[ -x "$ELSEWHEN_ENV_PREFIX/bin/python" ] || { echo "Cannot locate the Elsewhen Conda environment." >&2; exit 1; }
cd "$ROOT_DIR/backend"
UV_PROJECT_ENVIRONMENT="$ELSEWHEN_ENV_PREFIX" conda run --no-capture-output -n elsewhen uv sync --frozen --inexact
cd "$ROOT_DIR/frontend"
pnpm install --frozen-lockfile
cd "$ROOT_DIR"
[ -f backend/.env ] || cp backend/.env.example backend/.env
[ -f frontend/.env.local ] || cp frontend/.env.local.example frontend/.env.local
echo "Elsewhen is ready. Run ./start.sh"
