# Podklad na prvý digitálny prototyp

**Stav:** špecifikácia a lokálny experiment. Figma Design súbor, prototyp, Simple Design System komponenty, papierový vstup a reálny zdieľaný odkaz zatiaľ chýbajú. Experiment nie je Figma export ani otestovaný v1.1 prototyp. Pre úlohy 06–08 sa má použiť Simple Design System podľa AGENT.md.

| View / stav | Komponenty a varianty na vytvorenie vo Figme | Pokrytie |
| --- | --- | --- |
| Prehľad | Termín, platnosť, ďalší krok, pokrok, otvorené problémy, kontakt | PP01.1/4/5; PP02.3; PP03.5 |
| Plán a detail | Časové skupiny, karta kroku, textový stav, história, splnenie/oprava | PP01.2/3; SC01-A/B |
| Termín | Potvrdený termín, formulár/draft/uložená požiadavka, pôvodný/nový termín, dotknuté kroky, prečítanie | PP02.1–5; SC02-A/B |
| Problém | Výber kroku, opis, čas, validácia, zachované údaje, otvorený záznam, kontakt | PP03.1–5 |
| Pokyny a kontakt | Verzia, zdroj, archív, kontakt, hranice ukážky | N04/N05/N09 |
| Pripomienky | Vypnuté/zapnuté, kanál, predstih, neaktívne po zmene | N11/N18 |
| Chyby | Načítavanie, nedostupné API, nesprávny formát, konflikt, opätovné načítanie | Obnova SC01–SC03 |

## Pracovný návrh interakcií

Prechod z prehľadu otvorí detail najbližšieho kroku; späť vedie na celý plán. Po zázname je dostupný ďalší krok. Problém z detailu predvyplní súvisiaci krok. Zmena z prehľadu vedie na porovnanie a čakanie. „Rozumiem zmene termínu“ mení iba prečítanie, nikdy platnosť. Kontakt je dostupný aj v problémových stavoch. Simulačné ovládanie nie je pacientskym schvaľovaním.

Pripraviť komponenty `AppointmentSummary`, `StepCard`, `StatusBadge`, `ContactPanel`, tlačidlá, formulárové polia a oznamy. Zachovať varianty všetkých siedmich stavov z úlohy 03. Názvy z implementácie slúžia len ako mapovanie, nie dôkaz existujúcich Figma komponentov.

## Kontrola pred testovaním Figma prototypu

- [ ] Prenesené skutočné papierové podklady a zdôvodnené zmeny.
- [ ] Výlučne Simple Design System pre prvý digitálny prototyp.
- [ ] SC01 a SC02 majú počiatočný stav, dokončiteľné prechody, späť a opravu.
- [ ] SC01-B nerozhoduje o nesplnení len z času.
- [ ] PP03 má validáciu, zachované údaje a kontakt.
- [ ] Žiadny slepý prechod a žiadne predstierané medicínske schválenie.
- [ ] Pripravený skutočný odkaz, overené oprávnenia a obnovenie scenárov.

**Skutočné odkazy na Figma Design a live prototyp:** zatiaľ nepriložené. Automatické testy lokálnej aplikácie sa evidujú v úlohe 09, nie ako dokončenie tejto kontroly.
