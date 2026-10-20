const messages: Record<string, { en: string; de: string }> = {
  'Ovládanie ukážky': { en: 'Demo controls', de: 'Demo-Steuerung' },
  'Pre prezentáciu a skúšanie scenárov': {
    en: 'For presentations and trying scenarios',
    de: 'Für Präsentationen und zum Testen von Szenarien',
  },
  'Fiktívne udalosti pracoviska. Reset vymaže záznamy celej lokálnej ukážky. Údaje sú spoločné pre otvorené karty a po reštarte servera sa obnovia.':
    {
      en: 'Simulated clinic events. Reset clears all records in this local demo. Data is shared across open tabs and resets when the server restarts.',
      de: 'Simulierte Ereignisse der Einrichtung. Das Zurücksetzen löscht alle Einträge dieser lokalen Demo. Die Daten werden von allen geöffneten Tabs gemeinsam verwendet und beim Neustart des Servers zurückgesetzt.',
    },
  'Ukážkový čas:': { en: 'Demo time:', de: 'Demo-Zeit:' },
  Scenár: { en: 'Scenario', de: 'Szenario' },
  'Bežná príprava': { en: 'Routine preparation', de: 'Reguläre Vorbereitung' },
  'Chýbajúce potvrdenie': { en: 'Missing confirmation', de: 'Fehlende Bestätigung' },
  'Oznámený problém': { en: 'Reported problem', de: 'Gemeldetes Problem' },
  'Zmena pred prípravou': { en: 'Change before preparation', de: 'Änderung vor der Vorbereitung' },
  'Zmena počas prípravy': {
    en: 'Change during preparation',
    de: 'Änderung während der Vorbereitung',
  },
  'Obnoviť scenár': { en: 'Reset scenario', de: 'Szenario zurücksetzen' },
  'Posunúť čas o deň': { en: 'Advance time by one day', de: 'Zeit um einen Tag vorstellen' },
  'Simulovať nový termín': { en: 'Simulate a new appointment', de: 'Neuen Termin simulieren' },
  'Simulovať potvrdenie plánu': {
    en: 'Simulate plan confirmation',
    de: 'Planbestätigung simulieren',
  },
  'Po začatí prípravy ukážka zostáva na overenie. Individuálne pokyny nemáme; nový medicínsky režim sa nevytvorí.':
    {
      en: 'Once preparation has started, the demo remains pending verification. No individual instructions are available; a new medical regimen will not be created.',
      de: 'Nach Beginn der Vorbereitung bleibt die Demo zur Überprüfung ausstehend. Individuelle Anweisungen liegen nicht vor; es wird kein neuer medizinischer Ablauf erstellt.',
    },
  '{title} – podrobnosti': { en: '{title} – details', de: '{title} – Details' },
  'Máte aj záznam o splnení': {
    en: 'You also have a completion record',
    de: 'Es liegt auch ein Erledigungsvermerk vor',
  },
  'Potvrdený termín v ukážke': { en: 'Confirmed demo appointment', de: 'Bestätigter Demo-Termin' },
  'Váš termín · ukážka': { en: 'Your appointment · demo', de: 'Ihr Termin · Demo' },
  Kolonoskopia: { en: 'Colonoscopy', de: 'Koloskopie' },
  o: { en: 'at', de: 'um' },
  'Príchod na pracovisko': { en: 'Arrival at the clinic', de: 'Ankunft in der Einrichtung' },
  Podrobnosti: { en: 'Details', de: 'Details' },
  'Nie ste si istí?': { en: 'Unsure?', de: 'Sind Sie unsicher?' },
  'S otázkami o príprave vám pomôže vaše pracovisko.': {
    en: 'Your clinic can help with questions about preparation.',
    de: 'Ihre Einrichtung hilft Ihnen bei Fragen zur Vorbereitung.',
  },
  'Modelové endoskopické pracovisko': {
    en: 'Example endoscopy clinic',
    de: 'Beispiel einer Endoskopie-Einrichtung',
  },
  'Ukážková adresa: Ukážková 12, Košice, prízemie.': {
    en: 'Example address: Ukážková 12, Košice, ground floor.',
    de: 'Beispieladresse: Ukážková 12, Košice, Erdgeschoss.',
  },
  Telefón: { en: 'Phone', de: 'Telefon' },
  'V ukážke nie je dostupný': {
    en: 'Not available in the demo',
    de: 'In der Demo nicht verfügbar',
  },
  Dostupnosť: { en: 'Opening hours', de: 'Erreichbarkeit' },
  'Po – Pi, 8:00 – 14:00': { en: 'Mon – Fri, 8:00 – 14:00', de: 'Mo – Fr, 8:00 – 14:00' },
  '(fiktívne hodiny)': { en: '(fictional hours)', de: '(fiktive Zeiten)' },
  'Kontakt použite z vlastnej pozvánky alebo pôvodných pokynov. Táto ukážka nie je spojená so skutočným pracoviskom a neobsahuje overený postup mimo jeho dostupnosti.':
    {
      en: 'Use the contact details from your own appointment letter or original instructions. This demo is not connected to a real clinic and does not provide a verified procedure for when it is unavailable.',
      de: 'Verwenden Sie die Kontaktdaten aus Ihrer eigenen Einladung oder den ursprünglichen Anweisungen. Diese Demo ist mit keiner echten Einrichtung verbunden und enthält kein geprüftes Vorgehen für Zeiten außerhalb ihrer Erreichbarkeit.',
    },
  'Kontakt a pokyny': { en: 'Contact and instructions', de: 'Kontakt und Anweisungen' },
  'Modelové pracovisko · fiktívna ukážka': {
    en: 'Example clinic · fictional demo',
    de: 'Beispieleinrichtung · fiktive Demo',
  },
  Naplánované: { en: 'Planned', de: 'Geplant' },
  'Treba urobiť': { en: 'To do', de: 'Zu erledigen' },
  'Označené ako splnené': { en: 'Marked as completed', de: 'Als erledigt markiert' },
  'Po termíne – nepotvrdené': {
    en: 'Past due – unconfirmed',
    de: 'Überfällig – unbestätigt',
  },
  'Problém oznámený': { en: 'Problem reported', de: 'Problem gemeldet' },
  'Treba overiť': { en: 'Needs verification', de: 'Überprüfung erforderlich' },
  'Netýka sa vás': { en: 'Not applicable to you', de: 'Trifft auf Sie nicht zu' },
}

export default messages
