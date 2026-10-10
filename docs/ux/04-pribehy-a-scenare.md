# Príbehy a scenáre použitia

Pracovné scenáre pre autorizovaný lokálny experiment Axum/Svelte, 10. 10. 2026. Vychádzajú z úloh 02–03; neboli overené s pacientmi. Medicínske pokyny poskytuje pracovisko. Ukážka obsahuje iba fiktívne organizačné úlohy.

## Príbehy

| ID | Príbeh | Opora |
| --- | --- | --- |
| PP01 | Ako pacient chcem rozumieť plánu a zaznamenávať prípravu, aby som vedel, čo ešte treba urobiť pred vyšetrením. | D01/D03/D08; N01/N03/N05/N10/N13–N15; A01/A02/A08. |
| PP02 | Ako pacient so zmeneným termínom chcem vedieť, ktoré pokyny stále platia, aby som pokračoval podľa aktuálneho plánu. | D02/D03/D05; N12/N16–N18; A06/A07. |
| PP03 | Ako pacient, ktorý nemohol dodržať pokyn alebo mu nerozumie, chcem opísať problém a nájsť pomoc, aby som poznal ďalší postup. | D05/D07; N07/N09/N13; A04/A06/A08. |

## SC01 – Bežná príprava (PP01)

**Spúšťač:** pacient otvorí plán po prijatí termínu a pokynov. **Začiatok:** termín potvrdený, plán v1 aktuálny, príprava nezačala, dva organizačné kroky aktuálne, ostatné naplánované, bez záznamov a problémov. Ukážkový čas je pevne 12. 10. 2026 o 9:00 na Slovensku. Časy nie sú klinický režim.

1. Pacient zistí termín, čas príchodu a pôvod pokynov → systém ukáže tieto údaje a najbližší krok (PP01.1).
2. Pacient otvorí krok a prečíta pokyn → systém ukáže text, zdroj, čas a aktuálny stav (PP01.2).
3. Po vykonaní zaznamená splnenie → server uloží záznam; systém ukáže pokrok a nasledujúci krok (PP01.3).
4. Pacient sa vráti po prerušení → systém načíta jeho záznamy zo servera (PP01.4).
5. Po zaznamenaní všetkých príslušných krokov → systém uvedie „Všetky kroky označené ako splnené“, bez tvrdenia o klinickej pripravenosti (PP01.5).

**SC01-A – oprava:** pri PP01.3 pacient zistí nechcené označenie → opraví záznam → systém zachová históriu a obnoví príslušný časový stav. Nevyzve na opakovanie medicínskeho úkonu (N15).

**SC01-B – chýbajúce potvrdenie:** pacient otvorí plán po termíne kroku bez záznamu → „Po termíne – nepotvrdené“, „Nemáme potvrdenie tohto kroku“ → pacient zaznamená skutočné vykonanie alebo prejde do SC03. Samotný čas nevytvorí problém ani automatické splnenie (N14).

**Výsledok:** pacient vidí svoj pokrok a ďalší krok; história korekcií zostáva dostupná. Krok, ktorý sa ho netýka, nie je v menovateli pokroku.

## SC02 – Zmena termínu počas prípravy (PP02, hlavný neštandardný scenár)

**Spúšťač:** pracovisko oznámi potvrdený nový termín; v experimente ide o výslovne simulovanú udalosť. **Začiatok:** príprava začala, aspoň jeden krok je zaznamenaný ako splnený, plán v1 je aktuálny. Pripomienky môžu byť zapnuté.

1. Pacient uvedie, že príprava už začala → systém eviduje túto skutočnosť oddelene od prečítania dokumentu (PP02.1).
2. Pracovisko oznámi zmenu → systém ukáže pôvodný a nový termín, zdroj oznámenia a dotknuté kroky (PP02.2).
3. Pacient si prečíta dopad → systém zachová históriu, nastaví „Treba overiť“, pozastaví platnosť plánu a deaktivuje staré pripomienky (PP02.3).
4. Pacient potvrdí prečítanie → oznámenie je prečítané, ale medicínske pokyny nie sú potvrdené (PP02.4).
5. Pacient vyhľadá kontakt → systém vysvetlí, že ďalší individuálny postup poskytne pracovisko (PP02.5).

**Obnova:** návrat na prehľad alebo opätovné načítanie zachová zmenu, históriu a čakanie. Oprava záznamu neodstráni potrebu overenia.

**Výsledok:** „Čaká na potvrdenie pracoviskom“ s kontaktom. Je to zámerný platný výsledok, nie predstierané medicínske vyriešenie. Experiment nemá schválené individuálne pokyny a neumožní po začatí prípravy automatické potvrdenie nového režimu.

### SC02-A – Žiadosť o zmenu

Pacient vysvetlí dôvod → ukážka uloží požiadavku s pravdivým označením neodoslania → potvrdený termín zostáva. Pacient môže požiadavku zrušiť. Až samostatná simulovaná udalosť pracoviska zmení termín. Rozpracovaný formulár možno zrušiť; neúspešné uloženie zachová dôvod.

### SC02-B – Zmena pred prípravou

Príprava nezačala → pracovisko oznámi nový termín → plán čaká na potvrdenie a staré pripomienky sú neaktívne → samostatná simulácia potvrdenia pokynov vytvorí v2 organizačného plánu → pôvodné pokyny a história zostávajú dostupné. Nové pripomienky sa viažu výlučne na potvrdenú v2. Aktualizácia je iba ukážkou organizačných termínov, nie posunom dávkovania či lačnenia.

## SC03 – Skutočne oznámený problém (PP03)

**Spúšťač:** pacient oznámi konkrétnu neistotu alebo nedodržanie pokynu. **Začiatok:** platný krok, s možným záznamom o splnení; žiadny problém nevzniká len uplynutím času.

1. Pacient vyberie súvisiaci krok → systém ho predvyplní pri prechode z detailu (PP03.1).
2. Pacient uvedie opis a čas udalosti → systém overí povinné údaje a pri chybe zachová vstup (PP03.2).
3. Pacient uloží opis → server ho priradí ku kroku; rozhranie uvedie „Uložené iba v ukážke · otvorené“ (PP03.3).
4. Pacient vyhľadá kontakt → systém ukáže hranice fiktívneho pracoviska a odkáže na kontakt vo vlastnej pozvánke (PP03.4).
5. Pacient neskôr zaznamená splnenie → problém zostáva otvorený aj pri kompletných záznamoch (PP03.5).

**Obnova:** nedostupné API alebo konflikt verzie zachová opis; pacient načíta aktuálny plán, skontroluje uložené problémy a prípadne zopakuje akciu. Uloženie, kontakt ani pokus o telefonát problém nevyriešia.

**Výsledok:** dohľadateľný otvorený problém so súvisiacim krokom a cestou k vysvetleniu; bez tvrdenia o odoslaní, prijatí alebo klinickej odpovedi.
