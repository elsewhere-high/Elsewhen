#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"
conda run --no-capture-output -n elsewhen python scripts/local.py stop
docker compose stop postgres
echo "Elsewhen stopped. Game data remains in the Elsewhen PostgreSQL volume."
