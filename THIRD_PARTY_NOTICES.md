# Third-party software and assets

Dependency licenses remain governed by their respective packages. Exact dependencies are recorded in backend/pyproject.toml, backend/uv.lock, backend/requirements.lock, frontend/package.json, and frontend/pnpm-lock.yaml.

## Human head scan

“INFINITE, 3D Head Scan” by Lee Perry-Smith, based on work at Triplegangers, is licensed under Creative Commons Attribution 3.0 Unported.
Source: https://github.com/mrdoob/three.js/tree/r185/examples/models/gltf/LeePerrySmith
Files: frontend/public/exploration/watchman/head.glb, skin.jpg, normal.jpg. The original license is preserved in frontend/public/exploration/watchman/LICENSE.txt. The runtime trims the shoulders, scales the face, and adjusts the material tint.

## Creature recordings

“Monster snarls” by Darsycho is released under CC0.
Source: https://opengameart.org/content/monster-snarls
License: https://creativecommons.org/publicdomain/zero/1.0/
Files: frontend/public/exploration/audio/attack.mp3 and growl.mp3. Clips are trimmed, high-pass filtered, faded, limited, and encoded as MP3; runtime playback changes pitch and spatial position.

## Forest models and textures

Poly Haven assets boulder_01, fern_02, gothic_statue, and island_tree_01 are CC0. The source URLs, format metadata, and checksums are retained in unreal/SourceAssets/*/provenance.json. The imported Unreal resources derive from these local sources.

## Optional model and speech services

OpenAI, Anthropic, Gemini, and Ollama integrations use the operator's configured credentials and service terms. Model calls receive only the configured seat's permitted context. Optional voice and transcription use the configured speech provider. Mock gameplay makes no model-provider request.
