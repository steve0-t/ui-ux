# Pokojne — súhrn práce vo Figme a kontrola výsledku

Dátum: 21. 10. 2026

## Výsledné artefakty

- [FigJam — výskum a koncept](https://www.figma.com/board/awjuMK3x9hMBJ59kd6fr9p?node-id=2-7)
- [Figma Design — editovateľné obrazovky](https://www.figma.com/design/70m01PLUYYHWTzvwp3waQb?node-id=6-31)
- [Spustiť klikateľný prototyp](https://www.figma.com/proto/70m01PLUYYHWTzvwp3waQb?node-id=6-31&starting-point-node-id=6%3A31&scaling=scale-down)

Výsledok je návrhový prototyp v slovenčine pre prípravu pacienta na odborné vyšetrenie. Obsahuje 34 mobilných obrazovkových stavov a úvodný rozcestník. Ukážkové organizačné úlohy a pracovisko sú fiktívne. Výsledok nie je klinicky overenou aplikáciou.

## Vstupné podklady

Spracovaných bolo šesť priložených súborov: `README.md`, `02-vyskum-ux.md`, `02-analyza-rieseni.md`, `03-konceptualny-model.md`, `04-pribehy-a-scenare.md` a `zdroje.md`.

README odkazuje aj na ďalšie dokumenty, diagramy, snímku NHS a implementáciu, ktoré neboli medzi prílohami. Ich obsah nebol domyslený ani označený za overený. Verejné zdroje boli prenesené podľa dodaných podkladov; táto kontrola nepredstavuje novú rešerš ich aktuálnosti.

## Čo bolo vytvorené

### FigJam

- Usporiadané zadanie, cieľ, hranice riešenia, používatelia a závery výskumu.
- Prenesené porovnanie štyroch existujúcich riešení a dôsledky pre návrh.
- Zachované rozlíšenie dôkazov Dxx, predpokladov Axx a návrhových rozhodnutí Nxx.
- Spracované príbehy PP01–PP03 a scenáre SC01–SC03 vrátane chýb a obnovy.
- Vytvorená natívne editovateľná mapa domény a konceptuálny model: spolu 20 tvarov a 24 spojení.
- Doplnené tabuľky pojmov, pravidiel a zdrojov S01–S08, pracovná persona a otvorené predpoklady.
- Popísané dve alternatívy zaznamenania splnenia a opravy. Voľba alternatívy A je označená ako nové rozhodnutie N24, nie ako výsledok používateľského testu.
- Pridaná deklarácia použitia AI a odkazy medzi podkladmi a prototypom.

### Figma Design

Obrazovky používajú komponenty Simple Design System, typografiu Inter, opakovateľnú hlavičku a navigáciu. Sú zostavené z editovateľných vrstiev; dlhší obsah je rolovateľný.

| Tok | Počet stavov | Pokrytie |
| --- | ---: | --- |
| SC01 / PP01 — bežná príprava | 13 | Prehľad, detail, pokrok 0/4 až 4/4, oprava záznamu, chýbajúce potvrdenie po termíne, pôvodné pokyny, zapnutie/vypnutie pripomienky. |
| SC02 / PP02 — zmena termínu | 10 | Starý a nový termín, začatie prípravy, čakanie na pracovisko, žiadosť o zmenu, neúspešné uloženie, zrušenie žiadosti a samostatná ukážka potvrdenej v2. |
| SC03 / PP03 — problém | 11 | Prázdny a vyplnený formulár, validačná chyba, chyba uloženia, otvorený problém, kontakt a pokračovanie až po 4/4 bez automatického vyriešenia problému. |

Rozcestník uvádza pevné počiatočné stavy scenárov, pripravené vstupy formulárov a hranice ukážky. Doplnkové chybové stavy a udalosť potvrdenia pracoviskom sa dajú spustiť samostatne.

## Posledné požadované úpravy

1. Odstránená celá sekcia **06 · Papierový prototyp** vrátane jej upozornení.
2. Nasledujúce sekcie prečíslované na **06 · Dve alternatívy interakcie** a **07 · Deklarácia použitia AI**.
3. Uzavretá medzera po odstránenej sekcii, zmenšená hlavná sekcia a posunutý blok prototypu. Hlavná časť má teraz sedem sekcií.
4. Pri kontrole nájdený a opravený návrat zo spoločnej obrazovky pokynov: pôvodná navigácia na úvodný plán mohla po zmene termínu zobraziť počiatočný stav. Ovládanie sa teraz volá **Späť** a používa návrat na predchádzajúcu obrazovku.

Odstránenie sekcie neznamená, že ručné kresby vznikli alebo že prípadná požiadavka kurzu bola splnená. Ostatné pravdivé poznámky o chýbajúcich podkladoch zostali zachované.

## Overenie výsledku

| Kontrola | Výsledok |
| --- | --- |
| Odstránenie sekcie | Potvrdené; pôvodná sekcia už neexistuje. |
| Rozloženie FigJam | Žiadne zistené presahy obsahu kontrolovaných sekcií; upravená hlavná časť vizuálne skontrolovaná. |
| Počet obrazoviek | 34 mobilných stavov + 1 rozcestník. |
| Navigačné prechody na obrazovky | 198 po zmene jedného prechodu na akciu Späť. |
| Dosiahnuteľnosť | Všetkých 35 obrazoviek dosiahnuteľných z rozcestníka podľa grafu prechodov. |
| Neplatné ciele navigácie | Žiadne zistené. |
| Vizuálna kontrola | Pri tvorbe kontrolované reprezentatívne stavy; po poslednej úprave znovu skontrolovaná hlavná časť FigJam a obrazovka pokynov. |

Kontrola grafu nepotvrdzuje správnosť každej kombinácie stavov ani použiteľnosť s pacientmi. Nebol vykonaný kompletný ručný prechod všetkými vetvami v prezentačnom režime ani používateľský test.

## Čo ešte chýba alebo potrebuje dopracovanie

| Priorita | Zistenie | Ďalší krok |
| --- | --- | --- |
| Vysoká pred testovaním | Prototyp má pevné scenáre, nie spoločný dátový stav. Prechod do problémového toku z rôznych stupňov pokroku nie je dôkazom zachovania predchádzajúcich záznamov. | Prejsť kombinované cesty a doplniť kontextové varianty alebo stavové premenné; pre technické overenie použiť implementáciu. |
| Vysoká pre PP02 | Obrazovka potvrdeného plánu v2 vysvetľuje zmenu, ale chýba samostatný detail dokumentu v2 a konkrétny úplný zoznam aktualizovaných organizačných krokov. Spoločné Pokyny zobrazujú v1. | Doplniť jasný výber aktuálnej a historickej verzie a detail organizačnej v2. |
| Vysoká pre overenie návrhu | Rozhovory s pacientmi, používateľské testovanie a klinická validácia neprebehli. | Pripraviť úlohy a kritériá úspechu, vykonať testy a zaznamenať skutočné výsledky. Klinický obsah a proces potvrdiť s pracoviskom. |
| Stredná | Alternatívy A/B sú textovo porovnané, ale chýba dvojica vizuálne rozpracovaných interakčných tokov na porovnanie. | Vytvoriť porovnateľné obrazovky oboch alternatív a overiť ich s používateľmi. |
| Stredná | A08 sa používa v príbehoch, no v dodaných prílohách nemá dostupnú definíciu. README spomína N19–N23 bez priložených definícií. | Doplniť pôvodné definície a zosúladiť sledovateľnosť; nevymýšľať ich dodatočne ako pôvodné rozhodnutia. |
| Stredná | Formuláre používajú pripravený opis a čas. Chybové stavy sú ukážkové; serverové uloženie, obnovenie po zatvorení a konflikt verzií sa neoverujú. | Pri testoch jasne vysvetliť obmedzenia. PP01.4 a technickú obnovu overiť vo funkčnej implementácii. |
| Pred reálnym použitím | Kontakt, dostupnosť pomoci, individuálne klinické pokyny a externé upozornenia nie sú implementované ani overené. | Získať podklady a potvrdený postup od konkrétneho pracoviska. |
| Pred odovzdaním | Chýba dodaná snímka NHS a ďalšie podklady uvádzané v README. Prístup hodnotiteľa, názov FigJam podľa pravidiel kurzu a úplnosť odovzdania nie sú potvrdené. | Priložiť chýbajúce dôkazy a skontrolovať názvy, oprávnenia a aktuálny kontrolný zoznam zadania. |
| Dokumentácia | Pôvodné README stále tvrdí, že FigJam a Figma artefakty neboli vytvorené. V tejto úlohe nebolo prepísané. | Pri začlenení výsledku do projektu aktualizovať README odkazmi z tohto súhrnu a oddeliť dokončený návrh od neuskutočneného testovania. |

Papierový prototyp bol na výslovnú žiadosť odstránený z hlavnej časti boardu. Ak ho zadanie naďalej vyžaduje, jeho doloženie zostáva samostatnou úlohou.

## Odporúčané poradie pokračovania

1. Doplniť aktuálne pokyny v2 a preveriť zachovanie stavu medzi scenármi.
2. Vizuálne rozpracovať alternatívu B a vykonať ručný prechod prototypom.
3. Doplniť chýbajúce definície, prílohy a aktualizovať projektové README.
4. Vykonať používateľské testovanie; klinický obsah overovať s pracoviskom.
5. Skontrolovať prístup hodnotiteľa a náležitosti odovzdania.
