# Pokojne · Svelte frontend

A Slovak, English, and German interface for the local patient-preparation experiment. It uses Svelte 5, TypeScript, and Vite; Axum provides the authoritative state. The language selector in the header remembers the choice in the browser, with Slovak as the default.

Installation, startup instructions for both services, the API, browser tests, and limitations are documented in [dev/README.md](../README.md).

- `src/pages/`: overview, plan, step details, appointment, problems, instructions/contact, and reminders.
- `src/components/`: shared cards, statuses, and separate demo controls.
- `src/lib/api.ts`: types, runtime response validation, API client, and an explicit Slovak time zone.
- `src/lib/i18n.ts`, `src/lib/messages/`: reactive language selection, Slovak source keys, and translations of the interface and known API content/errors; date formatting keeps the Europe/Bratislava time zone. When adding text, add both translations to the appropriate catalog and use `$t('Slovenský text')` in the template (the key is the original Slovak text). Insert dynamic values through named `{name}` parameters. User-entered text is rendered directly.
- `tests/journeys.spec.ts`: real frontend/API journeys for desktop and mobile, errors, keyboard navigation, and automated accessibility checks.
- `tests/languages.spec.ts`: English and German journeys, dates, metadata, errors, preservation of user-entered text, and behavior when browser storage is unavailable.

Unfinished forms are preserved after a save error. Reloading the entire page fetches the accepted state from Axum; unfinished text that has not been saved is not stored in browser storage.

## Visual style

The interface uses green accents, dark blue headings, light surfaces, and horizontal navigation. Its visual inspiration comes from the public websites of [Dôvera](https://www.dovera.sk/) and [MetLife Slovensko](https://www.metlife.sk/). It keeps its own Pokojne brand; the preparation illustration is a custom SVG component, `PreparationIllustration.svelte`. Both fonts and the illustration are served locally. On mobile, the decorative illustration is hidden, navigation scrolls horizontally, and cards stack vertically.
