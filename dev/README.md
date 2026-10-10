# Development workspace

Two services share this directory: `backend/` (Rust + Axum) and `frontend/` (Svelte + TypeScript + Vite). This is a runnable development scaffold, not the completed patient interface. The course React deviation remains documented in [AGENT.md](../AGENT.md).

## Setup

From the repository root, enter the Nix shell:

```sh
nix develop
```

With direnv, reload the existing `.envrc` after the flake changes. Alternatively, use a recent Rust toolchain and Node.js 24 with npm installed directly.

Install frontend dependencies once:

```sh
cd dev/frontend
npm ci
```

## Run

In one terminal, from the repository root:

```sh
cd dev/backend
cargo run
```

In another terminal, also inside the Nix shell:

```sh
cd dev/frontend
npm run dev
```

Open http://127.0.0.1:5173. The starter checks `GET /api/health`, which Vite proxies to Axum at http://127.0.0.1:3000. The backend responds with `{"status":"ok","service":"patient-preparation-api"}`. Both services bind to loopback; Ctrl+C stops each service. No database, credentials, or patient data are needed.

## Verify

From `dev/backend`:

```sh
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo test
```

From `dev/frontend`:

```sh
npm run check
npm run build
npm run preview
```

Preview runs at http://127.0.0.1:4173 and also proxies `/api`; keep Axum running. The Vite proxy is a development/preview configuration. Production hosting will need a shared-origin API/static setup or an explicitly configured reverse proxy.

`Cargo.lock` and `package-lock.json` are tracked for reproducible dependency resolution. `target/`, `node_modules/`, and `dist/` are ignored. Backend tests currently have no domain cases because only the health endpoint exists.

## Next implementation work

Follow the research and scenarios in `docs/ux/` and `AGENT.md`. Add domain transitions and API validation in Axum, and patient views/components plus a typed API client in Svelte. Keep demonstration clinic events separate from patient actions. The starter has no persistence or real clinic integration.
