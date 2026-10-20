// Translations of the fictional API fixtures and its known error messages.
// Keep the original source text aligned with backend/src/domain.rs and main.rs.
const messages: Record<string, { en: string; de: string }> = {
  'Prečítať pokyny pracoviska': {
    en: 'Read the clinic’s instructions',
    de: 'Hinweise der Einrichtung lesen',
  },
  'Otvorte ukážkové pôvodné pokyny a prečítajte si ich. V skutočnej príprave používajte dokument od svojho pracoviska. Ak niečomu nerozumiete, vyžiadajte si vysvetlenie.':
    {
      en: 'Open and read the original demo instructions. For actual preparation, use the document from your clinic. Ask for clarification if anything is unclear.',
      de: 'Öffnen und lesen Sie die ursprünglichen Demo-Hinweise. Verwenden Sie für die tatsächliche Vorbereitung das Dokument Ihrer Einrichtung. Bitten Sie bei Unklarheiten um eine Erklärung.',
    },
  Orientácia: { en: 'Getting started', de: 'Orientierung' },
  'Overiť individuálne pokyny': {
    en: 'Clarify your individual instructions',
    de: 'Individuelle Hinweise klären',
  },
  'S pracoviskom si vyjasnite pokyny k liekom a príprave. Táto ukážka neobsahuje dávky ani medicínsky časový režim. Označenie znamená iba záznam, že ste si pokyny vyjasnili.':
    {
      en: 'Clarify medication and preparation instructions with your clinic. This demo does not include doses or a medical schedule. Marking this step only records that you have clarified the instructions.',
      de: 'Klären Sie mit Ihrer Einrichtung die Hinweise zu Medikamenten und Vorbereitung. Diese Demo enthält keine Dosierungen oder medizinischen Zeitpläne. Die Markierung hält lediglich fest, dass Sie die Hinweise geklärt haben.',
    },
  'Pokyny pracoviska': { en: 'Clinic instructions', de: 'Hinweise der Einrichtung' },
  'Dohodnúť sprievod a odvoz': {
    en: 'Arrange a companion and transport',
    de: 'Begleitung und Abholung organisieren',
  },
  'V tomto fiktívnom pláne je požadovaný sprievod a odvoz. Dohodnite si s blízkou osobou miesto a čas. Pri zmene termínu dohodu znovu overte.':
    {
      en: 'This fictional plan requires a companion and transport. Agree on a time and place with someone close to you. Reconfirm the arrangement if the appointment changes.',
      de: 'Dieser fiktive Plan erfordert eine Begleitung und Abholung. Vereinbaren Sie mit einer nahestehenden Person Ort und Zeit. Bestätigen Sie die Absprache bei einer Terminänderung erneut.',
    },
  'Organizácia návštevy': { en: 'Visit arrangements', de: 'Organisation des Besuchs' },
  'Pripraviť doklady a dokumenty': {
    en: 'Prepare identification and documents',
    de: 'Ausweise und Unterlagen vorbereiten',
  },
  'Ukážkový zoznam: doklad totožnosti, preukaz poistenca a dokumenty uvedené v pozvánke. Skutočný zoznam určuje vaše pracovisko.':
    {
      en: 'Example list: identification, health insurance card and the documents listed in your invitation. Your clinic determines the actual list.',
      de: 'Beispielliste: Ausweis, Versichertenkarte und die in der Einladung genannten Unterlagen. Die tatsächliche Liste legt Ihre Einrichtung fest.',
    },
  'Pred návštevou': { en: 'Before your visit', de: 'Vor dem Besuch' },
  'Overiť miesto a čas príchodu': {
    en: 'Check the location and arrival time',
    de: 'Ort und Ankunftszeit prüfen',
  },
  'Skontrolujte miesto návštevy a samostatný čas príchodu uvedený pri termíne. Tento krok zaznamenáva kontrolu údajov, nie príchod na vyšetrenie.':
    {
      en: 'Check the visit location and the separate arrival time shown with your appointment. This step records that you have checked the details, not that you have arrived for the examination.',
      de: 'Prüfen Sie den Besuchsort und die beim Termin gesondert angegebene Ankunftszeit. Dieser Schritt hält die Überprüfung der Angaben fest, nicht Ihre Ankunft zur Untersuchung.',
    },
  'Vytlačiť kópiu plánu': { en: 'Print a copy of the plan', de: 'Eine Kopie des Plans ausdrucken' },
  'Tento ukážkový plán nevyžaduje tlačenú kópiu.': {
    en: 'This demo plan does not require a printed copy.',
    de: 'Für diesen Demo-Plan ist keine gedruckte Kopie erforderlich.',
  },
  Voliteľné: { en: 'Optional', de: 'Optional' },
  'Podľa ukážkových pokynov tlačená kópia nie je potrebná.': {
    en: 'The demo instructions do not require a printed copy.',
    de: 'Laut den Demo-Hinweisen ist keine gedruckte Kopie erforderlich.',
  },
  'Modelové endoskopické pracovisko · fiktívna ukážka': {
    en: 'Example endoscopy clinic · fictional demo',
    de: 'Beispiel-Endoskopieeinrichtung · fiktive Demo',
  },
  'Ukážka pokynov v1. Prečítajte si pozvánku, vyjasnite si individuálne pokyny s pracoviskom, dohodnite sprievod a odvoz, pripravte doklady a overte čas príchodu. Medicínske pokyny, dávky ani časovanie prípravkov nie sú súčasťou tejto ukážky. Tento text nie je návodom na skutočnú prípravu.':
    {
      en: 'Demo instructions v1. Read your invitation, clarify individual instructions with the clinic, arrange a companion and transport, prepare your documents and check the arrival time. Medical instructions, doses and preparation-product schedules are not part of this demo. This text is not a guide for actual preparation.',
      de: 'Demo-Hinweise v1. Lesen Sie Ihre Einladung, klären Sie individuelle Hinweise mit der Einrichtung, organisieren Sie Begleitung und Abholung, bereiten Sie Unterlagen vor und prüfen Sie die Ankunftszeit. Medizinische Hinweise, Dosierungen und Einnahmezeiten für Präparate sind nicht Teil dieser Demo. Dieser Text ist keine Anleitung für die tatsächliche Vorbereitung.',
    },
  'Simulované potvrdenie modelového pracoviska': {
    en: 'Simulated confirmation from the example clinic',
    de: 'Simulierte Bestätigung der Beispieleinrichtung',
  },
  'Ukážková aktualizácia: nový termín je uvedený v prehľade. Overenie individuálnych pokynov, dohoda sprievodu, doklady a kontrola príchodu majú aktualizované organizačné termíny. Prečítanie pôvodného dokumentu zostáva zaznamenané. Žiadny medicínsky režim nebol vytvorený. Pred skutočnou prípravou potrebujete pokyny svojho pracoviska.':
    {
      en: 'Demo update: the new appointment is shown in the overview. The administrative deadlines for clarifying individual instructions, arranging a companion, preparing documents and checking arrival have been updated. Reading the original document remains recorded. No medical regimen has been created. You need your clinic’s instructions before actual preparation.',
      de: 'Demo-Aktualisierung: Der neue Termin steht in der Übersicht. Die organisatorischen Fristen für die Klärung individueller Hinweise, die Begleitung, Unterlagen und die Prüfung der Ankunft wurden aktualisiert. Das Lesen des ursprünglichen Dokuments bleibt vermerkt. Es wurde kein medizinischer Ablauf erstellt. Für die tatsächliche Vorbereitung benötigen Sie die Hinweise Ihrer Einrichtung.',
    },
  'Krok sa nenašiel.': {
    en: 'The step could not be found.',
    de: 'Der Schritt wurde nicht gefunden.',
  },
  'Tento krok sa vás netýka.': {
    en: 'This step does not apply to you.',
    de: 'Dieser Schritt betrifft Sie nicht.',
  },
  'Platnosť kroku musí najprv overiť pracovisko.': {
    en: 'The clinic must first verify that this step is valid.',
    de: 'Die Einrichtung muss zunächst die Gültigkeit dieses Schritts prüfen.',
  },
  'Záznam už má tento stav. Načítajte aktuálny plán.': {
    en: 'The record already has this status. Load the current plan.',
    de: 'Der Eintrag hat bereits diesen Status. Laden Sie den aktuellen Plan.',
  },
  'Vyberte platný krok prípravy.': {
    en: 'Select a valid preparation step.',
    de: 'Wählen Sie einen gültigen Vorbereitungsschritt.',
  },
  'Opíšte problém v rozsahu 5 až 2 000 znakov.': {
    en: 'Describe the problem using 5 to 2,000 characters.',
    de: 'Beschreiben Sie das Problem mit 5 bis 2.000 Zeichen.',
  },
  'Zadajte čas v posledných 30 dňoch, najneskôr po ukážkový čas.': {
    en: 'Enter a time within the last 30 days, no later than the demo time.',
    de: 'Geben Sie einen Zeitpunkt innerhalb der letzten 30 Tage ein, spätestens bis zur Demo-Zeit.',
  },
  'Požiadavka je už uložená.': {
    en: 'The request has already been saved.',
    de: 'Die Anfrage wurde bereits gespeichert.',
  },
  'Najprv treba vyjasniť otvorenú zmenu s pracoviskom.': {
    en: 'First clarify the pending change with the clinic.',
    de: 'Klären Sie zunächst die offene Änderung mit der Einrichtung.',
  },
  'Uveďte dôvod v rozsahu 5 až 1 000 znakov.': {
    en: 'Give a reason using 5 to 1,000 characters.',
    de: 'Geben Sie einen Grund mit 5 bis 1.000 Zeichen an.',
  },
  'Nie je tu čakajúca požiadavka.': {
    en: 'There is no pending request.',
    de: 'Es liegt keine ausstehende Anfrage vor.',
  },
  'Nie je tu oznámená zmena.': {
    en: 'No change has been announced.',
    de: 'Es wurde keine Änderung mitgeteilt.',
  },
  'Plán čaká na overenie pracoviskom.': {
    en: 'The plan is awaiting verification by the clinic.',
    de: 'Der Plan wartet auf Prüfung durch die Einrichtung.',
  },
  'Vyberte ponúkaný predstih pripomienky.': {
    en: 'Select one of the available reminder intervals.',
    de: 'Wählen Sie eine der angebotenen Vorlaufzeiten für Erinnerungen.',
  },
  'Pred ďalšou zmenou treba potvrdiť platnosť plánu.': {
    en: 'The plan’s validity must be confirmed before another change.',
    de: 'Vor einer weiteren Änderung muss die Gültigkeit des Plans bestätigt werden.',
  },
  'Ukážkový čas už dosiahol deň vyšetrenia. Obnovte scenár.': {
    en: 'The demo time has reached the examination day. Reset the scenario.',
    de: 'Die Demo-Zeit hat den Untersuchungstag erreicht. Setzen Sie das Szenario zurück.',
  },
  'Najprv simulujte oznámenie nového termínu.': {
    en: 'First simulate the announcement of a new appointment.',
    de: 'Simulieren Sie zunächst die Mitteilung eines neuen Termins.',
  },
  'Plán už je potvrdený.': {
    en: 'The plan has already been confirmed.',
    de: 'Der Plan wurde bereits bestätigt.',
  },
  'Po začatí prípravy ukážka nemá individuálne schválené pokyny. Plán zostáva na overenie; použite kontakt.':
    {
      en: 'Once preparation has started, this demo has no individually approved instructions. The plan still needs verification; use the contact information.',
      de: 'Nach Beginn der Vorbereitung enthält diese Demo keine individuell genehmigten Hinweise. Der Plan muss weiterhin geprüft werden; nutzen Sie die Kontaktangaben.',
    },
  'Údaje nemajú očakávaný formát. Skontrolujte vyplnené polia.': {
    en: 'The data is not in the expected format. Check the completed fields.',
    de: 'Die Daten haben nicht das erwartete Format. Prüfen Sie die ausgefüllten Felder.',
  },
  'Plán je dočasne nedostupný.': {
    en: 'The plan is temporarily unavailable.',
    de: 'Der Plan ist vorübergehend nicht verfügbar.',
  },
  'Plán sa medzičasom zmenil. Načítajte aktuálny plán a skontrolujte záznam pred ďalším pokusom.': {
    en: 'The plan has changed in the meantime. Load the current plan and check the record before trying again.',
    de: 'Der Plan wurde inzwischen geändert. Laden Sie den aktuellen Plan und prüfen Sie den Eintrag, bevor Sie es erneut versuchen.',
  },
  'Spojenie sa nepodarilo. Výsledok uloženia nevieme potvrdiť. Načítajte aktuálny plán a skontrolujte ho pred ďalším pokusom.':
    {
      en: 'The connection failed. We cannot confirm whether saving succeeded. Load the current plan and check it before trying again.',
      de: 'Die Verbindung ist fehlgeschlagen. Wir können nicht bestätigen, ob die Daten gespeichert wurden. Laden und prüfen Sie den aktuellen Plan, bevor Sie es erneut versuchen.',
    },
  'Odpoveď sa nedá prečítať. Načítajte aktuálny plán a skúste to znova.': {
    en: 'The response could not be read. Load the current plan and try again.',
    de: 'Die Antwort konnte nicht gelesen werden. Laden Sie den aktuellen Plan und versuchen Sie es erneut.',
  },
  'Údaje sa nepodarilo uložiť. Skontrolujte plán a skúste to znova.': {
    en: 'The data could not be saved. Check the plan and try again.',
    de: 'Die Daten konnten nicht gespeichert werden. Prüfen Sie den Plan und versuchen Sie es erneut.',
  },
  'Prijatý plán nemá očakávaný formát. Načítajte ho znova; vaše rozpracované údaje zostávajú zachované.':
    {
      en: 'The received plan is not in the expected format. Load it again; your unfinished entries are preserved.',
      de: 'Der empfangene Plan hat nicht das erwartete Format. Laden Sie ihn erneut; Ihre bisherigen Eingaben bleiben erhalten.',
    },
}

export default messages
