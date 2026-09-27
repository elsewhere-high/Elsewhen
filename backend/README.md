# Elsewhen backend

FastAPI, LangGraph and MCP implement the council, private agent minds, validated actions, live streams, replays, tournaments and forest dialogue. PostgreSQL stores game state and checkpoints.

Use the `elsewhen` Conda environment. From the project root, `./setup.sh` installs the locked dependencies and `./start.sh` starts the local application. The API listens on `http://127.0.0.1:8317`; interactive API documentation is at `/docs`.

Run `./check.sh` from the project root for verification against a dedicated test database. Never run the database suite against gameplay data: its fixture truncates game and checkpoint tables. `TEST_DATABASE_URL` must name a separate database ending in `_test`.

See the root README and `docs/development.md` for configuration and architecture. Licensed under AGPL-3.0-only; Copyright (C) 2026 Ustinian5.
