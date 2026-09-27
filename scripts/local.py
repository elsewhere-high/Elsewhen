"""Manage only this checkout's local API and frontend processes."""
from __future__ import annotations

import json
import os
from pathlib import Path
import shutil
import signal
import socket
import subprocess
import sys
import time
from urllib.error import URLError
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
RUN = ROOT / ".run"
STATE = RUN / "processes.json"


def identity(pid: int) -> str:
    result = subprocess.run(["ps", "-p", str(pid), "-o", "lstart=", "-o", "command="], capture_output=True, text=True)
    return result.stdout.strip() if result.returncode == 0 else ""


def read_state() -> list[dict]:
    return json.loads(STATE.read_text()) if STATE.exists() else []


def owned(record: dict) -> bool:
    current = identity(record["pid"])
    return bool(current and current == record["identity"] and str(ROOT) in current)


def stop(records: list[dict] | None = None) -> None:
    targets = read_state() if records is None else records
    for record in targets:
        if owned(record):
            try:
                os.killpg(record["pid"], signal.SIGTERM)
            except ProcessLookupError:
                pass
    deadline = time.monotonic() + 15
    while any(owned(record) for record in targets):
        if time.monotonic() >= deadline:
            raise RuntimeError("Services are still stopping. Retry ./stop.sh before restarting.")
        time.sleep(0.1)
    if records is None:
        STATE.unlink(missing_ok=True)


def wait_ready(url: str, process: subprocess.Popen, timeout: int) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f"Service exited; inspect {RUN}")
        try:
            with urlopen(url, timeout=2) as response:
                if response.status == 200:
                    return
        except (OSError, URLError):
            pass
        time.sleep(0.4)
    raise RuntimeError(f"Service did not become ready at {url}; inspect {RUN}")


def start() -> None:
    if any(owned(record) for record in read_state()):
        raise RuntimeError("This Elsewhen checkout already has services running. Use ./stop.sh first.")
    for port in (8317, 4317):
        with socket.socket() as probe:
            probe.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                probe.bind(("127.0.0.1", port))
            except OSError as error:
                raise RuntimeError(f"Port {port} is in use. Stop its owner before starting Elsewhen.") from error
    RUN.mkdir(exist_ok=True)
    pnpm = shutil.which("pnpm")
    if not pnpm:
        raise RuntimeError("pnpm is required; run ./setup.sh first.")
    mode = "start" if os.environ.get("ELSEWHEN_MODE") == "production" else "dev"
    specifications = [
        ("backend", [sys.executable, "-m", "uvicorn", "app.main:app", "--app-dir", str(ROOT / "backend"), "--host", "127.0.0.1", "--port", "8317"], ROOT / "backend", "http://127.0.0.1:8317/health"),
        ("frontend", [pnpm, "--dir", str(ROOT / "frontend"), mode], ROOT / "frontend", "http://127.0.0.1:4317"),
    ]
    records = []
    try:
        for name, command, cwd, url in specifications:
            environment = os.environ.copy()
            environment["NEXT_TELEMETRY_DISABLED"] = "1"
            with (RUN / f"{name}.log").open("ab") as log:
                process = subprocess.Popen(command, cwd=cwd, env=environment, stdin=subprocess.DEVNULL, stdout=log, stderr=log, start_new_session=True)
            time.sleep(0.15)
            record = {"name": name, "pid": process.pid, "identity": identity(process.pid)}
            records.append(record)
            STATE.write_text(json.dumps(records, indent=2) + "\n")
            wait_ready(url, process, 120)
            record["identity"] = identity(process.pid)
            STATE.write_text(json.dumps(records, indent=2) + "\n")
    except Exception:
        stop(records)
        STATE.unlink(missing_ok=True)
        raise
    print("Elsewhen: http://127.0.0.1:4317")
    print("API docs: http://127.0.0.1:8317/docs")
    print(f"Logs: {RUN}")
    print("Stop: ./stop.sh")


if __name__ == "__main__":
    if not os.environ.get("CONDA_PREFIX"):
        raise SystemExit("Run this script through the Elsewhen Conda environment.")
    try:
        command = sys.argv[1] if len(sys.argv) > 1 else "status"
        if command == "start":
            start()
        elif command == "stop":
            stop()
        elif command == "status":
            for record in read_state():
                print(record["name"], "running" if owned(record) else "stopped")
        else:
            raise SystemExit("Usage: local.py start|stop|status")
    except RuntimeError as error:
        raise SystemExit(str(error)) from error
