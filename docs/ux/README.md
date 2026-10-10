# Príprava pacienta na odborné vyšetrenie

Podklady k [cvičeniu 2 – Výskum UX](https://kurzy.kpi.fei.tuke.sk/ux/labs/02.html) a [cvičeniu 3 – Konceptuálny model](https://kurzy.kpi.fei.tuke.sk/ux/labs/03.html). Vypracované po slovensky, podľa témy v koreňovom README. Dátum rešerše: **7. 10. 2026**.

Rozhranie má sprevádzať pacienta prípravou, upozorniť na chýbajúce kroky a pomôcť pri zmene termínu alebo nesplnení pokynov. Konkrétnym pracovným príkladom je kolonoskopia. Zúženie je návrhové rozhodnutie pre tento projekt; širšia téma zostáva zachovaná.

## Obsah

| Súbor | Obsah |
| --- | --- |
| [02-vyskum-ux.md](02-vyskum-ux.md) | Problém, doména, používatelia, báza znalostí, závery, pracovná persona, pojmy a mapa domény. |
| [02-analyza-rieseni.md](02-analyza-rieseni.md) | Porovnanie štyroch existujúcich riešení, spôsob skúmania a dôsledky pre návrh. |
| [03-konceptualny-model.md](03-konceptualny-model.md) | Pojmy, vlastnosti, vzťahy, používateľské akcie a správanie pri zmene alebo probléme. |
| [zdroje.md](zdroje.md) | Zdroje S01–S08 a odkazy na zadania. |
| [overenie-a-ai.md](overenie-a-ai.md) | Otvorené predpoklady, plán rozhovorov a deklarácia použitia AI. |
| [04-pribehy-a-scenare.md](04-pribehy-a-scenare.md) | PP01–PP03, bežná príprava, zmena termínu, problém a obnova po chybách. |
| [05-papierovy-prototyp.md](05-papierovy-prototyp.md) | Návod na ručné kresby a dve alternatívy; skutočné kresby chýbajú. |
| [06-07-digitalny-prototyp.md](06-07-digitalny-prototyp.md) | Špecifikácia a kontrolný zoznam; Figma artefakty chýbajú. |
| [08-testovanie.md](08-testovanie.md) | Plán a prázdny protokol pre päť účastníkov; testovanie ešte neprebehlo. |
| [09-implementacia.md](09-implementacia.md) | Predbežný Axum/Svelte experiment, sledovateľnosť, kontroly a otvorené závislosti. |
| [diagrams/mapa-domeny.svg](diagrams/mapa-domeny.svg) | Vizuálna mapa domény; zdroj v súbore `.mmd`. |
| [diagrams/konceptualny-model.svg](diagrams/konceptualny-model.svg) | Vizuálny konceptuálny model; zdroj v súbore `.mmd`. |
| [assets/nhs-priprava.png](assets/nhs-priprava.png) | Skutočná snímka NHS dodaná používateľom. |

## Ako čítať podklady

- **Dôkaz Dxx**: informácia z konkrétneho dohľadaného zdroja alebo pozorovanie verejnej stránky.
- **Predpoklad Axx**: pracovná hypotéza o používateľovi alebo prevádzke; vyžaduje overenie.
- **Návrhové rozhodnutie Nxx**: navrhovaná vlastnosť riešenia; nejde o výsledok testovania.

Zatiaľ bola vykonaná dokumentačná rešerš a analýza verejného obsahu. Rozhovory, pozorovanie pacientov ani používateľské testovanie neprebehli. Klinický obsah pre konkrétneho pacienta musí poskytnúť jeho pracovisko. Zahraničné zdroje slúžia na pochopenie domény a porovnanie; ich dávkovanie či časové režimy sa nepreberajú ako slovenský liečebný postup.

## Pokrytie úloh

| Úloha | Miesto vypracovania |
| --- | --- |
| 2 / 1.1: téma, cieľ, hranice, zainteresované strany, otázky | Výskum, časti 1–3. |
| 2 / 2.1 a 2.2: skupiny používateľov a profil primárneho používateľa | Výskum, časti 4 a 7. |
| 2 / 3.1 a 3.2: zdroje, dôsledky, pojmy a vzťahy | Výskum, časti 5 a 8; register zdrojov. |
| 2 / 4.1: existujúce riešenia | Samostatná analýza riešení. |
| 2 / 5.1: mapa domény | Výskum, časť 8; diagram SVG a Mermaid. |
| 2 / 6.1: stručné povinné závery | Výskum, časť 6; analýza, záverečná tabuľka. |
| 3 / 1.1–2.2: zdroje, pojmy, vlastnosti, vzťahy, akcie | Konceptuálny model, časti 1–4. |
| 3 / 3.1: kontrola modelu | Konceptuálny model, časť 6. |
| 3 / 4.1: umiestnenie vo FigJam a označenie predpokladov | Podklady pripravené lokálne; prenos do FigJam je opísaný nižšie. |

## Prenos do FigJam

1. Vytvorte sekcie **Výskum UX**, **Analýza existujúcich riešení**, **Mapa domény** a **Konceptuálny model**.
2. Preneste príslušné texty a tabuľky. Označenia D, A a N zachovajte aj pri jednotlivých kartách.
3. SVG použite ako vizuálny podklad. Na úpravy vytvorte vo FigJam vlastné Shape, Text a Connector podľa SVG a tabuliek; import obrázka sám nevytvorí natívne editovateľný model.
4. Vložte NHS snímku k analýze. Pri ostatných riešeniach sú uvedené konkrétne časti vhodné na ďalšie snímky; tie nie sú súčasťou tohto balíka.
5. Ku kartám modelu pridajte odkazy na výskumné sekcie cez **Copy link to section** a odkazy zo zoznamu zdrojov.

FigJam projekt nebol vytvorený ani upravený. Tieto súbory sú lokálne podklady, nie odovzdaná práca v Moodle. Príbehy a scenáre boli doplnené 10. 10. 2026; ručne nakreslený papierový prototyp a skutočné Figma artefakty zostávajú nepriložené.

## Aktualizácia implementácie · 10. 10. 2026

Používateľ autorizoval predbežnú lokálnu implementáciu v `dev/`. Rozhranie Pokojne pokrýva PP01–PP03 a samostatné ukážkové scenáre. Rozhodnutia pokračujú N19–N23; pôvodné D01–D09, A01–A08 a N01–N18 zostali zachované. [Spustenie a testy](../../dev/README.md).

Úlohy 04–08 majú pripravené podklady; nie sú tým automaticky dokončené. Ľudské testovanie, klinická validácia, Figma export, video a odovzdanie neprebehli. Svelte sa líši od kurzom požadovaného Reactu; akceptovanie na hodnotenie zostáva nepotvrdené. Skutočné výsledky automatických kontrol sú v úlohe 09.
