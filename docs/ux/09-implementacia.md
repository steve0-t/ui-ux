# Predbežná implementácia · Pokojne

Dátum: **10. 10. 2026**. Používateľ po prečítaní AGENT.md výslovne autorizoval implementáciu. Výsledok je lokálny experiment Rust/Axum + Svelte/TypeScript, nie odovzdaný finálny projekt.

## Vstup a pôvod

Boli prečítané úlohy 02/03, analýza riešení, register zdrojov/predpokladov a oba Mermaid diagramy. Pri štarte existoval čistý Git checkout so scaffoldom, Node/npm a Rust nástrojmi; aplikácia obsahovala iba overenie health endpointu. Existujúce výskumné dokumenty a diagramy zostali zachované.

Kontrola [cvičenia 02](https://kurzy.kpi.fei.tuke.sk/ux/labs/02.html) potvrdila pokrytie lokálneho vymedzenia problému, používateľov, záverov rešerše a dôsledkov analýzy. Chýba preukázaný prenos do FigJam a tri konkurenčné snímky. [Cvičenie 03](https://kurzy.kpi.fei.tuke.sk/ux/labs/03.html) považuje konceptuálny model za pracovný podklad. Neboli doplnené fiktívne rozhovory ani pozorovania.

[Cvičenie 09](https://kurzy.kpi.fei.tuke.sk/ux/labs/09.html) požaduje vstup z testovaného prototypu a React. Tieto predpoklady nie sú splnené; prijatie Axum/Svelte na hodnotenie zostáva otvorené. Neexistuje Figma Make export, testovaný v1.1 ani naviazaný Figma dizajn. Zdroj je priamo implementovaný cez Codex. Generovaná Figma baseline preto nie je tvrdená ani vytvorená.

## Rozhodnutia

- **N19:** kontextové oznámenie v prehľade so samostatným porovnaním zmeny; alternatívy a hypotézy sú v úlohe 05.
- **N20:** jedna autoritatívna doménová vrstva v Axum, revízie a atomické mutácie. N12–N18 sa rozhodujú na serveri; frontend iba vykresľuje výsledok. Opora N12–N18, A06/A07.
- **N21:** pevné ovládateľné hodiny a výslovne fiktívne organizačné pokyny. Klinický obsah chýba; kontakt je vysvetlená cesta k údajom z vlastnej pozvánky, nie vymyslené funkčné číslo. Opora N04/N05/N09/N17, A05/A06.
- **N22:** samostatné verzie pokynov, história, problémy a pripomienky; oprava ani kompletný pokrok nevymažú otvorené problémy. Opora N13–N18.
- **N23:** predbežná vizuálna téma Pokojne: svetlé pozadie, tmavozelený ďalší krok, textové stavy, lokálne fonty Manrope/DM Sans a konzistentné formuláre. Ide o vlastné komponenty experimentu, nie o implementáciu Figma Simple Design System ani výskumom potvrdený finálny dizajn. Predpísané Figma fázy a výber existujúceho finálneho dizajnového jazyka zostávajú na vykonanie.

## Sledovateľnosť

| Východisko → rozhodnutie | Scenár | Obrazovka / stav | Overenie |
| --- | --- | --- | --- |
| D01/D03/D08 → N03/N05/N10 | PP01.1–4 | Prehľad, plán, detail, nasledujúci krok | Browser bežná príprava a reload. |
| D08/A08 → N13/N15/N22 | SC01-A, PP01.5 | Oprava, história, celkový pokrok | Rust korekcia; browser celý postup. |
| A01/A08 → N14 | SC01-B | Po termíne – nepotvrdené | Rust čas vs. problém; browser hlásenie. |
| D05/D07/A06 → N07/N09/N22 | PP03.1–5 | Opis, čas, uložené iba v ukážke, otvorený problém, kontakt | Rust problém pri kompletnom pokroku; browser zachovanie vstupu/retry. |
| A06 → N12/N19/N20 | SC02-A, PP02.2/4 | Uložená požiadavka, porovnanie, prečítanie | Rust odlíšenie žiadosti, oznámenia a platnosti; browser potvrdenie. |
| D02/D03/D05/A06 → N16/N17/N21 | SC02/SC02-B | Pred začatím potvrdená v2; počas prípravy čakanie a história | Rust zakázaný automatický režim; browser oba varianty. |
| D09/A07 → N11/N18/N22 | PP02.3 | Predvoľby, neaktívne staré pripomienky | Rust + browser neobnovenie na reload. |
| A02/A08 → N10/N20/N23 | Všetky cesty | Klávesnica, textové stavy, responzívnosť, chyby | Svelte check; Playwright desktop/mobil; axe. |

## Rozsah a hranice správania

Implementované sú prehľad, časové skupiny krokov, detaily a oprava, história, formulár problému so súvisiacim krokom a miestnym časom, žiadosť/zrušenie zmeny, porovnanie termínov, prečítanie oznámenia, oddelený začiatok prípravy, zdroj/archív pokynov, kontakt a voliteľné predvoľby pripomienok.

Ukladanie problémov a žiadostí má status iba ukážkového uloženia; odoslanie, prijatie a vyriešenie pracoviskom nie sú implementované ani tvrdené. Po zmene počas prípravy je čakanie s kontaktom zámerný výsledok; simulátor neponúkne klinické potvrdenie. Pacientské formuláre ani prečítanie zmeny nemôžu aktivovať neoverený plán.

Údaje sú spoločné v pamäti lokálneho servera; reštart/reset ich zmaže. Nie je tu databáza, autentifikácia, reálne notifikácie, kalendár, medicínske schvaľovanie, backend pre personál ani verejné nasadenie. Podrobnosti API, prostredia a obnovy: [dev/README.md](../../dev/README.md).

## Skutočne vykonané kontroly

| Kontrola | Skutočný výsledok |
| --- | --- |
| `cargo test --offline` | 7/7 prešlo: korekcie a čas, otvorené problémy, žiadosť vs. potvrdenie, história počas zmeny, neaktuálne pripomienky, atomické chyby/konflikty, reset/formát. |
| `cargo fmt --check` | Prešlo. |
| `cargo clippy --all-targets --offline -- -D warnings` | Prešlo. |
| `npm run check` | Svelte/TypeScript: 0 chýb, 0 upozornení. |
| `npm run format:check` | Prešlo pre zdroje, testy a konfiguráciu Playwright. |
| `npm run build` | Produkčný Vite build prešiel; fonty sú lokálne súčasti buildu. |
| Playwright, skutočné Axum + preview API | Posledný celý beh: 18/18 prípadov ciest, obnovy, klávesnice a responzívnosti prešlo. Dve axe kontroly sa vtedy zastavili na chybnej príprave scenára v teste. |
| Opravené axe testy, cielený opakovaný beh | 2/2 prešlo po explicitnom obnovení stránky po externom resete. Sedem bežných obrazoviek a zmena počas prípravy: žiadne axe porušenia v zapnutých pravidlách WCAG 2 A/AA a 2.1 AA. Spolu všetkých 20 browser prípadov prešlo v uvedených behoch; nejde o tvrdenie o jednom celom zelenom behu. |
| Vizuálna kontrola | Skutočné snímky prehľadu na desktop a mobil boli otvorené a skontrolované. Automatické kontroly nezistili pretečenie šírky na kontrolovaných stránkach. |
| Dokumentácia | Lokálne odkazy v 14 Markdown súboroch bez chýbajúcich cieľov; `git diff --check` bez chýb. |

Použité prostredie browser kontrol: Chromium 149, desktop 1440 × 1100 a emulácia mobilu 375 × 812. Prvé axe kontroly našli nedostatočný kontrast sekundárnych textov; farby boli stmavené a textové stavy zväčšené. Klávesnicová cesta zahŕňa preskočenie navigácie, detail a splnenie, prečítanie zmeny, výber kroku, opis problému a kontakt. Oprava testu po externom resete bola potrebná, pretože samotná zmena hash navigácie zámerne nenačítava nový serverový snapshot.

Pozorovania nie sú testovaním s účastníkmi. Žiadna klinická validácia ani úplný audit WCAG neprebehli. Browser testy používajú Chromium a mobilnú emuláciu, nie reálne iOS/Safari zariadenie.

## Zostávajúce ľudské a kurzové závislosti

Skutočné kresby a fotografie; FigJam a Figma artefakty v predpísanom systéme; päť účastníkov a súhlasy; skutočné pozorovania/zmeny a testovaný v1.1; schválenie alternatívneho stacku; lokálne pracovisko a klinické pokyny; osobná reflexia študenta; oddelené nahrávky testovania a prezentačné video; reálny školský Git/video odkaz a odovzdanie. Nebol vykonaný push, publikovanie, kontaktovanie účastníkov ani odovzdanie.
