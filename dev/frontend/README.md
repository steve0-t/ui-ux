# Pokojne · Svelte frontend

Slovenské rozhranie pre lokálny experiment prípravy pacienta. Používa Svelte 5, TypeScript a Vite; autoritatívny stav poskytuje Axum.

Inštalácia, spustenie oboch služieb, API, browser testy a obmedzenia sú v [dev/README.md](../README.md).

- `src/pages/`: prehľad, plán, detail kroku, termín, problémy, pokyny/kontakt, pripomienky.
- `src/components/`: spoločné karty, stavy a samostatné ovládanie ukážky.
- `src/lib/api.ts`: typy, runtime validácia odpovede, klient a explicitné slovenské časové pásmo.
- `tests/journeys.spec.ts`: skutočné frontend/API cesty pre desktop a mobil, chyby, klávesnica a automatické kontroly prístupnosti.

Rozpracované formuláre zostávajú po chybe uloženia zachované. Obnovenie celej stránky načíta prijatý stav z Axum; rozpracovaný, ešte neuložený text sa neukladá do úložiska prehliadača.
