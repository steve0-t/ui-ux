# Local development · Axum + Svelte

**Pokojne** is a functional provisional experiment, not the final submission required by the React assignment. The backend is in `backend/`, and the frontend is in `frontend/`. The application uses only fictional data, does not send messages, and has no integration with a healthcare clinic.

## Environment and startup

From the project root, run `nix develop`. Alternatively, use Rust with edition 2024 support, Cargo, rustfmt, Clippy, and Node.js 24 with npm. The project retains npm and both existing lockfiles.

```sh
# First terminal
cd dev/backend
cargo run --locked
```

```sh
# Second terminal
cd dev/frontend
npm ci
npm run dev
```

Interface: http://127.0.0.1:5173. Axum: http://127.0.0.1:3000. Vite proxies `/api`, so CORS is not needed. Both processes listen only on loopback and can be stopped with Ctrl+C.

To preview the production build locally, run `npm run build` and `npm run preview` (port 4173); keep Axum running. The preview proxy also forwards to port 3000. Deployment requires a shared origin with a reverse proxy for `/api`; it has not been configured or published. Simply opening `dist/index.html` through `file://` is not sufficient.

## Model and demo data

- Axum owns the appointment, change request, instruction versions, plan validity, steps, history, problems, reminders, and the revision of the entire state. The browser owns navigation and unfinished forms.
- The interface language (Slovak, English, or German) can be changed in the header without reloading the page or losing unfinished form entries. Slovak is the default; the choice is stored in `localStorage` under `pokojne-language`. If storage is unavailable, switching still works for the current page. Language selection does not change the shared Axum state. Dates use the selected language, while the time zone remains Europe/Bratislava.
- State is held in the memory of a single process and shared across all open tabs. Reloading the page fetches it from the API. Restarting the server or explicitly resetting a scenario restores the fictional data; no migrations or database are needed.
- The demo clock starts on 12 October 2026 at 07:00 UTC (09:00 Europe/Bratislava) and does not advance automatically. Only the simulator advances the day. The API uses RFC 3339 timestamps; the display always uses Europe/Bratislava, regardless of the browser's time zone. The problem form rejects nonexistent or ambiguous local times during daylight-saving transitions.
- The `normal`, `missing`, `problem`, `change_before`, and `change_during` scenarios can be reset through the separate **Demo controls** panel. Simulating a new appointment moves it forward by seven 24-hour days; this is not a real booking.
- After an appointment change during preparation, the plan still needs verification: no new clinical regimen is created without approved individual instructions. Before preparation starts, confirmation of the administrative plan can be simulated separately.
- Appointment changes deactivate old reminders. New ones can appear only for a confirmed plan version, for future administrative steps, and when reminders are enabled. They are never sent; external calendars are not connected.
- The plan is a local demo without authentication. Simulation controls are separate from patient operations, but the API is not intended for public deployment with real data.

## JSON API

| Method and path | Result |
| --- | --- |
| `GET /api/health` | Service status. |
| `GET /api/plan` | The complete current plan, including its revision and server-derived statuses. |
| `POST /api/actions` | A patient action; returns the complete current plan when accepted. |
| `POST /api/demo` | An explicitly simulated event or reset; returns the complete plan. |

Each POST includes the `revision` from the latest GET and a `type` discriminator. Example:

```json
{"revision":1,"type":"completion","step_id":"instructions","completed":true}
```

Patient action types and fields:

| Type | Additional fields |
| --- | --- |
| `completion` | `step_id`, `completed` (boolean; false corrects the record) |
| `report_problem` | `step_id`, `description` (5–2000 characters), `occurred_at` (RFC 3339, within the last 30 demo days, not in the future) |
| `request_change` | `reason` (5–1000 characters) |
| `cancel_request` | None; cancels only a pending demo request. |
| `acknowledge_change` | None; does not change plan validity. |
| `start_preparation` | None; records the start of preparation separately from logistical steps. |
| `reminders` | `enabled`, `channel` (`email`/`sms`), `minutes_before` (30/60/1440) |

Simulation types: `reset` with a `scenario` field, `advance_time`, `confirm_appointment`, and `confirm_plan`. Complete types are defined in `backend/src/domain.rs` and `frontend/src/lib/api.ts`.

Errors return JSON `{ "message": "…" }`: 400 for an invalid format, 409 for a revision conflict, 422 for an invalid domain transition, and 500 for unavailable state. Changes are first applied to a copy; a rejected operation does not modify state. The revision increases even on reset, preventing stale repeated POSTs from being accepted. Forms block further submissions while saving. If the outcome is unclear or a conflict occurs, reload the plan and inspect the record before retrying. Runtime API validation checks every field used by the interface.

## Verification

```sh
cd dev/backend
cargo fmt --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked
```

```sh
cd dev/frontend
npm run check
npm run format:check
npm run build
```

Browser tests use the real backend and production preview through the proxy. The test runner starts both services if they are not already running. Tests use and reset a single shared demo state; do not run them during your own presentation.

```sh
cd dev/frontend
npx playwright install chromium
npm run test:e2e
```

On NixOS, use the system Chromium instead of the downloaded binary:

```sh
# In a shell with chromium available:
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="$(command -v chromium)"
npm run test:e2e
```

You can also provide an absolute path to an installed Chromium executable. This variable affects only browser tests. Screenshots and traces are saved in the ignored `frontend/test-results/` directory and replaced after each run. Tests require permission to launch a browser and listen and communicate on localhost.

Manrope and DM Sans fonts (SIL Open Font License, with licenses in the Fontsource packages) are served locally from the build. The product does not require Google Fonts or external images. Icons are small custom SVG components. To format the frontend, run `npm run format`.

Translations are in `frontend/src/lib/messages/`; reactive language selection and `{name}` interpolation are in `frontend/src/lib/i18n.ts`. The original Slovak text serves as both the key and the fallback. When changing known API text, update `messages/domain.ts` as well; the backend continues to provide the original data. Problem descriptions and change-request reasons are not translated, including the sample description in the `problem` scenario. The `languages.spec.ts` tests cover both new languages, preservation of form input, a real API conflict, error recovery, the saved preference, and unavailable browser storage.

For actual verification results and limitations, see the [implementation notes](../docs/ux/09-implementacia.md). Automated tests are not user research, clinical validation, or a complete accessibility audit.
