# Elsewhen development

- All Python commands run through the `elsewhen` Conda environment. Do not use system Python or create a project `.venv`.
- Read the installed Next.js documentation before changing framework-specific APIs.
- Preserve role privacy, seat-token authorization, server-validated actions, replay immutability and explicit opt-ins for model, image and voice services.
- Run `./check.sh` for applicable changes. The database suite requires an explicit `TEST_DATABASE_URL` naming a dedicated `_test` database; never use gameplay data.
- Keep the README and architecture/API notes consistent with the implementation. Credentials, databases, process state, caches and build output remain untracked.
- Do not add a remote or publish the application without an explicit request.
