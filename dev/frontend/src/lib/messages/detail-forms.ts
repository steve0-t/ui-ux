const messages: Record<string, { en: string; de: string }> = {
  'Pomoc s prípravou': {
    en: 'Help with preparation',
    de: 'Hilfe bei der Vorbereitung',
  },
  'Mám problém': {
    en: 'I have a problem',
    de: 'Ich habe ein Problem',
  },
  'Zapíšte, čo sa stalo. S ďalším postupom vám pomôže vaše pracovisko.': {
    en: 'Record what happened. Your clinic can help you with the next steps.',
    de: 'Notieren Sie, was passiert ist. Ihre Einrichtung hilft Ihnen beim weiteren Vorgehen.',
  },
  'Opísať problém': {
    en: 'Describe a problem',
    de: 'Problem beschreiben',
  },
  'Opis sa uloží iba v ukážke. Neodosiela sa zdravotníkovi. Používajte fiktívne údaje.': {
    en: 'The description is saved only in this demo. It is not sent to a healthcare professional. Use fictional information.',
    de: 'Die Beschreibung wird nur in dieser Demo gespeichert. Sie wird nicht an medizinisches Personal gesendet. Verwenden Sie fiktive Angaben.',
  },
  'Ktorého kroku sa to týka?': {
    en: 'Which step does this relate to?',
    de: 'Welchen Schritt betrifft das?',
  },
  'Vyberte krok': {
    en: 'Select a step',
    de: 'Schritt auswählen',
  },
  'Čo sa stalo alebo čomu nerozumiete?': {
    en: 'What happened, or what do you not understand?',
    de: 'Was ist passiert oder was ist unklar?',
  },
  'Napríklad: Sprievod v dohodnutom čase nemôže prísť.': {
    en: 'For example: My companion cannot come at the agreed time.',
    de: 'Zum Beispiel: Meine Begleitperson kann zur vereinbarten Zeit nicht kommen.',
  },
  'Kedy sa to stalo?': {
    en: 'When did it happen?',
    de: 'Wann ist das passiert?',
  },
  '(čas na Slovensku)': {
    en: '(Slovak local time)',
    de: '(Ortszeit in der Slowakei)',
  },
  'Ukážkový čas: {time}. Použite čas v posledných 30 dňoch tejto ukážky.': {
    en: 'Demo time: {time}. Use a time within the last 30 days of this demo.',
    de: 'Demozeit: {time}. Wählen Sie einen Zeitpunkt innerhalb der letzten 30 Tage dieser Demo.',
  },
  'Zadajte jednoznačný platný miestny čas. Pri prechode na zimný čas zvoľte čas mimo opakovanej hodiny.':
    {
      en: 'Enter a valid, unambiguous local time. When daylight saving time ends, choose a time outside the repeated hour.',
      de: 'Geben Sie eine gültige, eindeutige Ortszeit ein. Wählen Sie bei der Umstellung auf Winterzeit eine Uhrzeit außerhalb der doppelt vorkommenden Stunde.',
    },
  'Uložiť problém v ukážke': {
    en: 'Save problem in demo',
    de: 'Problem in der Demo speichern',
  },
  'Späť na prehľad': {
    en: 'Back to overview',
    de: 'Zurück zur Übersicht',
  },
  'Problém bol uložený iba v ukážke. Pracovisku sa neodoslal a zostáva otvorený.': {
    en: 'The problem was saved only in the demo. It was not sent to the clinic and remains open.',
    de: 'Das Problem wurde nur in der Demo gespeichert. Es wurde nicht an die Einrichtung gesendet und bleibt offen.',
  },
  'Vaše otvorené problémy': {
    en: 'Your open problems',
    de: 'Ihre offenen Probleme',
  },
  'Uložené iba v ukážke · otvorené': {
    en: 'Saved only in demo · open',
    de: 'Nur in der Demo gespeichert · offen',
  },
  'Udalosť: {time}': {
    en: 'Occurred: {time}',
    de: 'Zeitpunkt: {time}',
  },
  'Pracovisko tento opis nedostalo. Kontaktujte ho cez údaje v pozvánke; samotný pokus o kontakt problém nevyrieši.':
    {
      en: 'The clinic has not received this description. Contact it using the details in your invitation; trying to make contact alone does not resolve the problem.',
      de: 'Die Einrichtung hat diese Beschreibung nicht erhalten. Nutzen Sie die Kontaktdaten in Ihrer Einladung. Ein Kontaktversuch allein löst das Problem nicht.',
    },
  'Pozrieť súvisiaci krok →': {
    en: 'View related step →',
    de: 'Zugehörigen Schritt ansehen →',
  },
  'Zatiaľ ste nezaznamenali žiadny problém.': {
    en: 'You have not recorded any problems yet.',
    de: 'Sie haben noch kein Problem erfasst.',
  },
  'Zdroj informácií a pomoc': {
    en: 'Information source and help',
    de: 'Informationsquelle und Hilfe',
  },
  'Pokyny a kontakt': {
    en: 'Instructions and contact',
    de: 'Anweisungen und Kontakt',
  },
  'Skutočné pokyny musí poskytnúť vaše pracovisko.': {
    en: 'Your clinic must provide the actual instructions.',
    de: 'Die tatsächlichen Anweisungen muss Ihre Einrichtung bereitstellen.',
  },
  'Toto sú výlučne ukážkové pokyny.': {
    en: 'These instructions are for demonstration only.',
    de: 'Diese Anweisungen dienen ausschließlich der Demonstration.',
  },
  'Neobsahujú medicínsky režim. Nepoužívajte ich ako návod na skutočnú prípravu.': {
    en: 'They do not include a medical regimen. Do not use them as a guide for actual preparation.',
    de: 'Sie enthalten keinen medizinischen Vorbereitungsplan. Verwenden Sie sie nicht als Anleitung für eine tatsächliche Vorbereitung.',
  },
  'Verzia {version}': {
    en: 'Version {version}',
    de: 'Version {version}',
  },
  ' · zobrazený plán': {
    en: ' · displayed plan',
    de: ' · angezeigter Plan',
  },
  ' · archív': {
    en: ' · archive',
    de: ' · Archiv',
  },
  'Pôvodné pokyny v{version}': {
    en: 'Original instructions v{version}',
    de: 'Ursprüngliche Anweisungen v{version}',
  },
  'Vydané: {time}': {
    en: 'Issued: {time}',
    de: 'Ausgestellt: {time}',
  },
  'Tieto pokyny čakajú na overenie pre nový termín.': {
    en: 'These instructions are awaiting verification for the new appointment.',
    de: 'Diese Anweisungen müssen für den neuen Termin noch überprüft werden.',
  },
  'Čo znamenajú vaše záznamy': {
    en: 'What your records mean',
    de: 'Was Ihre Einträge bedeuten',
  },
  '„Označené ako splnené“ je váš záznam o vykonaní. Nepotvrdzuje zdravotnú pripravenosť na vyšetrenie. Otvorené problémy a pokyny, ktoré treba overiť, zostávajú viditeľné samostatne.':
    {
      en: '“Marked as completed” is your record that you performed a step. It does not confirm medical readiness for the examination. Open problems and instructions requiring verification remain visible separately.',
      de: '„Als erledigt markiert“ ist Ihr Eintrag zur Durchführung eines Schrittes. Er bestätigt nicht Ihre medizinische Bereitschaft für die Untersuchung. Offene Probleme und zu überprüfende Anweisungen bleiben gesondert sichtbar.',
    },
  'Nerozumiem pokynu': {
    en: 'I do not understand an instruction',
    de: 'Ich verstehe eine Anweisung nicht',
  },
  '← Späť na celý plán': {
    en: '← Back to full plan',
    de: '← Zurück zum gesamten Plan',
  },
  'Pokyn · ukážková verzia {version}': {
    en: 'Instruction · demo version {version}',
    de: 'Anweisung · Demoversion {version}',
  },
  'Začiatok organizačného kroku': {
    en: 'Start of organisational step',
    de: 'Beginn des organisatorischen Schrittes',
  },
  'Plánovaný koniec': {
    en: 'Planned end',
    de: 'Geplantes Ende',
  },
  'Ukážkové časy organizačných úloh nie sú časovaním medicínskej prípravy.': {
    en: 'The demo times for organisational tasks are not a schedule for medical preparation.',
    de: 'Die Demozeiten für organisatorische Aufgaben sind kein Zeitplan für die medizinische Vorbereitung.',
  },
  'Pôvodné pokyny a zdroj': {
    en: 'Original instructions and source',
    de: 'Ursprüngliche Anweisungen und Quelle',
  },
  'Nemáme potvrdenie tohto kroku. Samotné uplynutie času neznamená, že ste pokyn nedodržali.': {
    en: 'We have no confirmation for this step. The passage of time alone does not mean you did not follow the instruction.',
    de: 'Für diesen Schritt liegt keine Bestätigung vor. Das Verstreichen der Zeit allein bedeutet nicht, dass Sie die Anweisung nicht befolgt haben.',
  },
  'Platnosť treba overiť.': {
    en: 'Validity needs to be verified.',
    de: 'Die Gültigkeit muss überprüft werden.',
  },
  'Pôvodné časy nie sú náhradným plánom. Vyjasnite si ďalší postup s pracoviskom.': {
    en: 'The original times are not a replacement plan. Clarify the next steps with your clinic.',
    de: 'Die ursprünglichen Zeiten sind kein Ersatzplan. Klären Sie das weitere Vorgehen mit Ihrer Einrichtung.',
  },
  'Splnenie zaznamenané: {time}.': {
    en: 'Completion recorded: {time}.',
    de: 'Erledigung erfasst: {time}.',
  },
  'Ak ste krok označili omylom, opravte iba záznam. Oprava nie je pokynom na opakovanie medicínskeho úkonu.':
    {
      en: 'If you marked the step by mistake, correct only the record. A correction is not an instruction to repeat a medical procedure.',
      de: 'Wenn Sie den Schritt versehentlich markiert haben, korrigieren Sie nur den Eintrag. Die Korrektur ist keine Anweisung, eine medizinische Maßnahme zu wiederholen.',
    },
  'Ku kroku máte otvorený problém. Záznam o splnení ho nevyrieši.': {
    en: 'You have an open problem for this step. Recording completion does not resolve it.',
    de: 'Zu diesem Schritt gibt es ein offenes Problem. Ein Erledigungsvermerk löst es nicht.',
  },
  'Pozrieť problém': {
    en: 'View problem',
    de: 'Problem ansehen',
  },
  'Označenie je opravené. Medicínsky úkon neopakujte iba kvôli oprave záznamu.': {
    en: 'The marking has been corrected. Do not repeat a medical procedure just to correct a record.',
    de: 'Die Markierung wurde korrigiert. Wiederholen Sie keine medizinische Maßnahme nur wegen der Korrektur eines Eintrags.',
  },
  'Splnenie kroku je zaznamenané.': {
    en: 'The completion of the step has been recorded.',
    de: 'Die Erledigung des Schrittes wurde erfasst.',
  },
  'Opraviť označenie': {
    en: 'Correct marking',
    de: 'Markierung korrigieren',
  },
  'Označiť ako splnené': {
    en: 'Mark as completed',
    de: 'Als erledigt markieren',
  },
  'Pokračovať na ďalší krok →': {
    en: 'Continue to next step →',
    de: 'Weiter zum nächsten Schritt →',
  },
  'História záznamov tohto kroku': {
    en: 'Record history for this step',
    de: 'Verlauf der Einträge zu diesem Schritt',
  },
  'Označené ako splnené': {
    en: 'Marked as completed',
    de: 'Als erledigt markiert',
  },
  'Označenie opravené': {
    en: 'Marking corrected',
    de: 'Markierung korrigiert',
  },
  'plán v{version}': {
    en: 'plan v{version}',
    de: 'Plan v{version}',
  },
  'Zatiaľ bez záznamu.': {
    en: 'No records yet.',
    de: 'Noch keine Einträge.',
  },
  'Podľa vašich potrieb': {
    en: 'To suit your needs',
    de: 'Nach Ihren Bedürfnissen',
  },
  Pripomienky: {
    en: 'Reminders',
    de: 'Erinnerungen',
  },
  'Pripomienky sú dobrovoľné. Svoje nastavenie môžete kedykoľvek zmeniť.': {
    en: 'Reminders are optional. You can change your settings at any time.',
    de: 'Erinnerungen sind freiwillig. Sie können Ihre Einstellungen jederzeit ändern.',
  },
  'Nastavenie pripomienok': {
    en: 'Reminder settings',
    de: 'Erinnerungseinstellungen',
  },
  'Ukladá sa iba ukážkové nastavenie. Žiadne SMS ani e-maily sa neposielajú a kontaktné údaje nezbierame.':
    {
      en: 'Only demo settings are saved. No text messages or emails are sent, and we do not collect contact details.',
      de: 'Es werden nur Demoeinstellungen gespeichert. Es werden keine SMS oder E-Mails gesendet und keine Kontaktdaten erfasst.',
    },
  'Nastavenie pripomienok je uložené v ukážke. Žiadne správy sa neposielajú.': {
    en: 'Reminder settings are saved in the demo. No messages are sent.',
    de: 'Die Erinnerungseinstellungen wurden in der Demo gespeichert. Es werden keine Nachrichten gesendet.',
  },
  'Chcem pripomienky k plánu': {
    en: 'I would like reminders for my plan',
    de: 'Ich möchte Erinnerungen zu meinem Plan',
  },
  'Spôsob pripomenutia': {
    en: 'Reminder method',
    de: 'Art der Erinnerung',
  },
  'E-mail · ukážka': {
    en: 'Email · demo',
    de: 'E-Mail · Demo',
  },
  'SMS · ukážka': {
    en: 'Text message · demo',
    de: 'SMS · Demo',
  },
  'Predstih pred organizačným krokom': {
    en: 'Advance notice before an organisational step',
    de: 'Vorlaufzeit vor einem organisatorischen Schritt',
  },
  '30 minút': {
    en: '30 minutes',
    de: '30 Minuten',
  },
  '1 hodina': {
    en: '1 hour',
    de: '1 Stunde',
  },
  '1 deň': {
    en: '1 day',
    de: '1 Tag',
  },
  'Uložiť nastavenie': {
    en: 'Save settings',
    de: 'Einstellungen speichern',
  },
  'Uložené nastavenie: {state}.': {
    en: 'Saved setting: {state}.',
    de: 'Gespeicherte Einstellung: {state}.',
  },
  zapnuté: {
    en: 'on',
    de: 'aktiviert',
  },
  vypnuté: {
    en: 'off',
    de: 'deaktiviert',
  },
  'Pripomienky v aktuálnom pláne': {
    en: 'Reminders in the current plan',
    de: 'Erinnerungen im aktuellen Plan',
  },
  'Staré pripomienky sú neaktívne. Nové môžu vzniknúť až po potvrdení aktuálneho plánu.': {
    en: 'Old reminders are inactive. New ones can only be created after the current plan is confirmed.',
    de: 'Alte Erinnerungen sind inaktiv. Neue können erst erstellt werden, wenn der aktuelle Plan bestätigt wurde.',
  },
  '{time} · plán v{version} · bez odosielania': {
    en: '{time} · plan v{version} · not sent',
    de: '{time} · Plan v{version} · ohne Versand',
  },
  'Nie sú tu aktívne pripomienky. Vznikajú iba pre budúce, nepotvrdené kroky aktuálneho plánu so zapnutým nastavením.':
    {
      en: 'There are no active reminders. They are created only for future, unconfirmed steps in the current plan when reminders are enabled.',
      de: 'Es gibt keine aktiven Erinnerungen. Sie werden nur für zukünftige, noch nicht bestätigte Schritte im aktuellen Plan erstellt, wenn Erinnerungen aktiviert sind.',
    },
  'Externý kalendár nie je pripojený. Ak ste si pridali vlastné upozornenia inde, pri zmene termínu ich skontrolujte sami.':
    {
      en: 'No external calendar is connected. If you added your own alerts elsewhere, check them yourself when the appointment changes.',
      de: 'Es ist kein externer Kalender verbunden. Wenn Sie eigene Erinnerungen an anderer Stelle angelegt haben, überprüfen Sie diese bei einer Terminänderung selbst.',
    },
}

export default messages
