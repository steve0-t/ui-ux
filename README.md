# Pokojne · Preparing for an examination

A functional local coursework prototype for an adult patient preparing at home for a scheduled outpatient colonoscopy. It shows the next step, records completion and corrections, distinguishes missing confirmation from a reported problem, and responds to appointment changes.

**Rust + Axum** provides the authoritative plan and validates changes. **Svelte + TypeScript + Vite** displays the interface in Slovak, English, and German. Select a language in the header; the browser remembers your choice. All data, clinic details, administrative schedules, and confirmations are fictional. The application does not send messages or reminders and contains no clinical dosages or preparation-product schedules.

## Getting started

Run `nix develop`, or use Rust/Cargo and Node.js 24 with npm. Start the services in two terminals:

```sh
# Terminal 1
cd dev/backend
cargo run --locked
```

```sh
# Terminal 2
cd dev/frontend
npm ci
npm run dev
```

Open **http://127.0.0.1:5173**. The API runs at `127.0.0.1:3000`; Vite proxies `/api`. State survives page reloads, but restarting the server or resetting a scenario clears the demo records.

The **Demo controls** panel at the bottom of the page provides scenarios for routine preparation, missing confirmation, a reported problem, and appointment changes before or during preparation. This panel controls the demo clock; the computer's current date does not affect whether steps are overdue.

## Documentation and verification

- [Development, API, tests, and limitations](dev/README.md)
- [UX documentation and progress by stage](docs/ux/README.md)
- [Stories and scenarios PP01–PP03](docs/ux/04-pribehy-a-scenare.md)
- [Implementation, design traceability, and actual verification results](docs/ux/09-implementacia.md)

## Coursework status

This is a user-authorized **provisional Axum/Svelte experiment**. [Lab 09](https://kurzy.kpi.fei.tuke.sk/ux/labs/09.html) requires React and input from a tested prototype. Acceptance of the alternative stack for grading remains unconfirmed. Actual hand drawings, FigJam/Figma artifacts, a tested v1.1 prototype, testing with five participants, and submission links/video are still missing. This application is not a Figma Make export and does not claim to meet the submission requirements.

Original assignment and research: [UX research](https://kurzy.kpi.fei.tuke.sk/ux/labs/02.html), [Conceptual model](https://kurzy.kpi.fei.tuke.sk/ux/labs/03.html).
