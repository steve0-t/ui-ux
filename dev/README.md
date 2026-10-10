# Lokálny vývoj · Axum + Svelte

Funkčný predbežný experiment **Pokojne**, nie finálna odovzdávka podľa React zadania. Backend je v `backend/`, frontend v `frontend/`. Aplikácia používa iba fiktívne údaje, neodosiela správy a nemá integráciu so zdravotníckym pracoviskom.

## Prostredie a spustenie

Z koreňa projektu: `nix develop`. Alternatíva: Rust s podporou edition 2024, Cargo, rustfmt, Clippy a Node.js 24 s npm. Zachované sú npm aj oba existujúce lockfiles.

```sh
# Prvý terminál
cd dev/backend
cargo run --locked
```

```sh
# Druhý terminál
cd dev/frontend
npm ci
npm run dev
```

Rozhranie: http://127.0.0.1:5173. Axum: http://127.0.0.1:3000. Vite proxy sprostredkuje `/api`, takže netreba CORS. Oba procesy počúvajú len na loopback a zastavia sa cez Ctrl+C.

Produkčný build možno lokálne prezrieť cez `npm run build` a `npm run preview` (port 4173); Axum nechajte spustený. Aj preview proxy smeruje na port 3000. Nasadenie potrebuje spoločný origin s reverse proxy pre `/api`; nie je nakonfigurované ani publikované. Samotné otvorenie `dist/index.html` cez `file://` nestačí.

## Model a ukážkové dáta

- Axum vlastní termín, požiadavku, verzie pokynov, platnosť plánu, kroky, históriu, problémy, pripomienky a revíziu celého stavu. Prehliadač vlastní navigáciu a rozpracované formuláre.
- Stav je v pamäti jedného procesu a je spoločný pre všetky otvorené karty. Obnovenie stránky ho načíta z API. Reštart servera alebo explicitný reset obnoví fiktívne dáta; žiadne migrácie ani databáza nie sú potrebné.
- Ukážkové hodiny začínajú 12. 10. 2026 o 07:00 UTC (09:00 Europe/Bratislava) a samy neplynú. Deň posúva iba simulátor. V API sú RFC 3339 časy; zobrazenie vždy používa Europe/Bratislava, bez ohľadu na časové pásmo prehliadača. Formulár problému odmietne neexistujúci alebo nejednoznačný čas pri prechode letného času.
- Scenáre `normal`, `missing`, `problem`, `change_before`, `change_during` sa dajú obnoviť cez oddelený panel „Ovládanie ukážky“. Simulácia nového termínu posúva čas o sedem 24-hodinových dní; nie je to skutočná rezervácia.
- Po zmene počas prípravy zostáva plán na overenie: bez schválených individuálnych pokynov sa nový klinický režim nevytvára. Pred začatím prípravy možno samostatne simulovať potvrdenie organizačného plánu.
- Pri zmene sa staré pripomienky deaktivujú. Nové sa môžu objaviť iba v potvrdenej verzii, pre budúce organizačné kroky a zapnuté preferencie. Nikdy sa neposielajú; externé kalendáre nie sú pripojené.
- Plán je lokálna ukážka bez autentifikácie. Ovládanie simulácie je oddelené od pacientskych operácií, ale API nie je určené na verejné nasadenie so skutočnými údajmi.

## JSON API

| Metóda a cesta | Výsledok |
| --- | --- |
| `GET /api/health` | Stav služby. |
| `GET /api/plan` | Celý aktuálny plán vrátane revízie a serverom odvodených stavov. |
| `POST /api/actions` | Pacientska zmena, po prijatí vráti celý aktuálny plán. |
| `POST /api/demo` | Výslovne simulovaná udalosť alebo reset, vráti celý plán. |

Každý POST obsahuje `revision` z posledného GET a diskriminátor `type`. Príklad:

```json
{"revision":1,"type":"completion","step_id":"instructions","completed":true}
```

Pacientske typy a polia:

| Typ | Ďalšie polia |
| --- | --- |
| `completion` | `step_id`, `completed` (boolean; false opraví záznam) |
| `report_problem` | `step_id`, `description` (5–2000 znakov), `occurred_at` (RFC 3339, posledných 30 demo dní, nie budúcnosť) |
| `request_change` | `reason` (5–1000 znakov) |
| `cancel_request` | Žiadne; zruší iba čakajúcu ukážkovú požiadavku. |
| `acknowledge_change` | Žiadne; nemení platnosť plánu. |
| `start_preparation` | Žiadne; eviduje začatie oddelene od logistických krokov. |
| `reminders` | `enabled`, `channel` (`email`/`sms`), `minutes_before` (30/60/1440) |

Simulačné typy: `reset` s poľom `scenario`, `advance_time`, `confirm_appointment`, `confirm_plan`. Úplné typy sú v `backend/src/domain.rs` a `frontend/src/lib/api.ts`.

Chyby majú JSON `{ "message": "…" }`: 400 nesprávny formát, 409 konflikt revízie, 422 neplatný doménový prechod, 500 nedostupný stav. Zmeny sa najprv aplikujú na kópiu; odmietnutá operácia nemení stav. Revízia rastie aj pri resete a bráni prijatiu starého opakovaného POST. Formuláre počas uloženia blokujú ďalšie odoslanie. Pri nejasnom výsledku alebo konflikte treba načítať plán a skontrolovať záznam pred opakovaním. Runtime kontrola API overí všetky polia používané rozhraním.

## Overenie

```sh
cd dev/backend
cargo fmt --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked
```

```sh
cd dev/frontend
npm run check
npm run format:check
npm run build
```

Browser testy používajú skutočný backend a produkčný preview cez proxy. Test runner ich spustí sám, ak už nebežia. Pracujú s jedným zdieľaným demo stavom a resetujú ho; nepoužívajte ich súbežne s vlastnou prezentáciou.

```sh
cd dev/frontend
npx playwright install chromium
npm run test:e2e
```

Na NixOS použite namiesto sťahovaného binárneho Chromium systémovú verziu:

```sh
# V shelli, ktorý obsahuje chromium:
export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="$(command -v chromium)"
npm run test:e2e
```

Možno dodať aj absolútnu cestu k nainštalovanému Chromium. Táto premenná mení len browser testy. Snímky a traces sa ukladajú do ignorovaného `frontend/test-results/`; po každom behu sa nahradia. Testy potrebujú oprávnenie spustiť browser a počúvať/komunikovať na localhost.

Fonty Manrope a DM Sans (SIL Open Font License, licencie v balíkoch Fontsource) sa obsluhujú lokálne z buildu. Produkt nevyžaduje Google Fonts ani externé obrázky. Ikony sú vlastné malé SVG komponenty. Formátovanie: `npm run format`.

Skutočné výsledky a limity kontrol: [implementačné poznámky](../docs/ux/09-implementacia.md). Automatické testy nie sú používateľským výskumom, klinickou validáciou ani úplným auditom prístupnosti.
