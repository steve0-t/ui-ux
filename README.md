# Pokojne · Príprava na vyšetrenie

Funkčný lokálny školský prototyp pre dospelého pacienta, ktorý sa doma pripravuje na plánovanú ambulantnú kolonoskopiu. Ukáže ďalší krok, zaznamená splnenie a jeho opravu, rozlíši chýbajúce potvrdenie od oznámeného problému a reaguje na zmenu termínu.

**Rust + Axum** poskytuje autoritatívny plán a overuje zmeny. **Svelte + TypeScript + Vite** zobrazuje rozhranie v slovenčine, angličtine a nemčine. Jazyk sa vyberá v hlavičke a prehliadač si ho pamätá. Údaje, pracovisko, organizačné časy a potvrdenia sú výlučne fiktívne. Aplikácia neposiela správy ani pripomienky a neobsahuje klinické dávkovanie alebo časový režim prípravkov.

## Spustenie

Vstúpte do `nix develop` alebo použite Rust/Cargo a Node.js 24 s npm. V dvoch termináloch spustite:

```sh
# Terminál 1
cd dev/backend
cargo run --locked
```

```sh
# Terminál 2
cd dev/frontend
npm ci
npm run dev
```

Otvorte **http://127.0.0.1:5173**. API beží na `127.0.0.1:3000`; Vite sprostredkuje `/api`. Stav zostáva po obnovení stránky, ale reštart servera alebo obnovenie scenára vymaže ukážkové záznamy.

Panel **Ovládanie ukážky** na konci stránky umožňuje bežnú prípravu, chýbajúce potvrdenie, problém a zmenu pred alebo počas prípravy. Hodiny ukážky sú riadené týmto panelom; aktuálny deň počítača nemá vplyv na oneskorenie krokov.

## Dokumentácia a overenie

- [Vývoj, API, testy a obmedzenia](dev/README.md)
- [UX dokumentácia a stav jednotlivých fáz](docs/ux/README.md)
- [Príbehy a scenáre PP01–PP03](docs/ux/04-pribehy-a-scenare.md)
- [Implementácia, väzby na návrh a skutočné výsledky kontrol](docs/ux/09-implementacia.md)

## Stav školského zadania

Ide o používateľom autorizovaný **predbežný Axum/Svelte experiment**. [Cvičenie 09](https://kurzy.kpi.fei.tuke.sk/ux/labs/09.html) vyžaduje React a vstup z testovaného prototypu. Akceptovanie alternatívneho stacku na hodnotenie zostáva nepotvrdené. Chýbajú skutočné ručné kresby, FigJam/Figma artefakty, testovaný prototyp v1.1, testovanie s piatimi účastníkmi a odovzdávacie odkazy/video. Táto aplikácia nie je export z Figma Make ani tvrdenie o splnení odovzdávky.

Pôvodné zadanie a rešerš: [Výskum UX](https://kurzy.kpi.fei.tuke.sk/ux/labs/02.html), [Konceptuálny model](https://kurzy.kpi.fei.tuke.sk/ux/labs/03.html).
