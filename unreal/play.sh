#!/usr/bin/env bash
set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENGINE_ROOT="${UNREAL_ENGINE_ROOT:?Set UNREAL_ENGINE_ROOT to your Unreal Engine installation}"
PROJECT_FILE="$PROJECT_ROOT/unreal/Elsewhen/Elsewhen.uproject"
if ! curl --fail --silent --max-time 3 http://127.0.0.1:8317/health >/dev/null; then
  echo "Start the local backend first; using the project Conda environment." >&2
  exit 1
fi
bash "$ENGINE_ROOT/Engine/Build/BatchFiles/Mac/Build.sh" ElsewhenEditor Mac Development "$PROJECT_FILE" -WaitMutex
exec "$ENGINE_ROOT/Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor" "$PROJECT_FILE" -game -windowed -ResX=1440 -ResY=900
