#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"
docker compose -f compose.test.yaml up --detach --wait postgres-test
trap 'docker compose -f "$ROOT_DIR/compose.test.yaml" stop postgres-test' EXIT
export TEST_DATABASE_URL='postgresql://elsewhen_test:elsewhen_test@127.0.0.1:55438/elsewhen_test?sslmode=disable'
export DATABASE_URL="$TEST_DATABASE_URL"
cd backend
conda run --no-capture-output -n elsewhen python -m pytest -q
cd ../frontend
pnpm lint
pnpm typecheck
pnpm test:exploration
pnpm test:inspector
pnpm build
