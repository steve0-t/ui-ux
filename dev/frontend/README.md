# Pokojne · Svelte frontend

Slovenské rozhranie pre lokálny experiment prípravy pacienta. Používa Svelte 5, TypeScript a Vite; autoritatívny stav poskytuje Axum.

Inštalácia, spustenie oboch služieb, API, browser testy a obmedzenia sú v [dev/README.md](../README.md).

- `src/pages/`: prehľad, plán, detail kroku, termín, problémy, pokyny/kontakt, pripomienky.
- `src/components/`: spoločné karty, stavy a samostatné ovládanie ukážky.
- `src/lib/api.ts`: typy, runtime validácia odpovede, klient a explicitné slovenské časové pásmo.
- `tests/journeys.spec.ts`: skutočné frontend/API cesty pre desktop a mobil, chyby, klávesnica a automatické kontroly prístupnosti.

Rozpracované formuláre zostávajú po chybe uloženia zachované. Obnovenie celej stránky načíta prijatý stav z Axum; rozpracovaný, ešte neuložený text sa neukladá do úložiska prehliadača.

## Vizuálny štýl

Rozhranie používa zelené akcenty, tmavomodré nadpisy, svetlé plochy a vodorovnú navigáciu. Vizuálnou inšpiráciou sú verejné stránky [Dôvery](https://www.dovera.sk/) a [MetLife Slovensko](https://www.metlife.sk/). Zachováva vlastnú značku Pokojne; ilustrácia prípravy je vlastný SVG komponent `PreparationIllustration.svelte`. Fonty aj ilustrácia sa poskytujú lokálne. Na mobile sa dekoratívna ilustrácia skrýva, navigácia sa dá vodorovne posúvať a karty sa skladajú pod seba.
