# Pokojne · Svelte frontend

Rozhranie v slovenčine, angličtine a nemčine pre lokálny experiment prípravy pacienta. Používa Svelte 5, TypeScript a Vite; autoritatívny stav poskytuje Axum. Prepínač v hlavičke uchová voľbu jazyka v prehliadači, pričom predvolená zostáva slovenčina.

Inštalácia, spustenie oboch služieb, API, browser testy a obmedzenia sú v [dev/README.md](../README.md).

- `src/pages/`: prehľad, plán, detail kroku, termín, problémy, pokyny/kontakt, pripomienky.
- `src/components/`: spoločné karty, stavy a samostatné ovládanie ukážky.
- `src/lib/api.ts`: typy, runtime validácia odpovede, klient a explicitné slovenské časové pásmo.
- `src/lib/i18n.ts`, `src/lib/messages/`: reaktívny jazyk, slovenské zdrojové kľúče, preklady rozhrania a známeho obsahu/chýb API; formátovanie dátumov zostáva v Europe/Bratislava. Pri novom texte doplňte oba preklady v príslušnom katalógu a v šablóne použite `$t('Slovenský text')`; dynamické hodnoty vkladajte cez pomenované `{name}` parametre. Vlastný používateľský text sa vykresľuje priamo.
- `tests/journeys.spec.ts`: skutočné frontend/API cesty pre desktop a mobil, chyby, klávesnica a automatické kontroly prístupnosti.
- `tests/languages.spec.ts`: anglické a nemecké cesty, dátumy, metadáta, chyby, nezmenený používateľský text a správanie pri nedostupnom úložisku.

Rozpracované formuláre zostávajú po chybe uloženia zachované. Obnovenie celej stránky načíta prijatý stav z Axum; rozpracovaný, ešte neuložený text sa neukladá do úložiska prehliadača.

## Vizuálny štýl

Rozhranie používa zelené akcenty, tmavomodré nadpisy, svetlé plochy a vodorovnú navigáciu. Vizuálnou inšpiráciou sú verejné stránky [Dôvery](https://www.dovera.sk/) a [MetLife Slovensko](https://www.metlife.sk/). Zachováva vlastnú značku Pokojne; ilustrácia prípravy je vlastný SVG komponent `PreparationIllustration.svelte`. Fonty aj ilustrácia sa poskytujú lokálne. Na mobile sa dekoratívna ilustrácia skrýva, navigácia sa dá vodorovne posúvať a karty sa skladajú pod seba.
