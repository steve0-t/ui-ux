import { test, expect } from '@playwright/test'

test.beforeEach(async ({ request }) => {
  const plan = await (await request.get('/api/plan')).json()
  const response = await request.post('/api/demo', {
    data: { revision: plan.revision, type: 'reset', scenario: 'normal' },
  })
  expect(response.ok()).toBeTruthy()
})

for (const language of [
  {
    code: 'en',
    overview: 'Your preparation, made clear.',
    plan: 'Preparation plan',
    step: 'Read the clinic’s instructions',
    complete: 'Mark as completed',
    completed: 'The completion of the step has been recorded.',
    appointment: 'Examination appointment',
    instructions: 'Instructions and contact',
    instructionVersion: 'Original instructions v1',
    reminders: 'Reminders',
    problem: 'I have a problem',
    saveProblem: 'Save problem in demo',
    savedProblem: 'Saved only in demo · open',
    failure: 'The connection failed.',
    reload: 'Load current plan',
    dateLocale: 'en-GB',
    instructionText: 'Open and read the original demo instructions.',
    originalText: 'Demo instructions v1.',
    conflict: 'The plan has changed in the meantime.',
  },
  {
    code: 'de',
    overview: 'Ihre Vorbereitung, übersichtlich.',
    plan: 'Vorbereitungsplan',
    step: 'Hinweise der Einrichtung lesen',
    complete: 'Als erledigt markieren',
    completed: 'Die Erledigung des Schrittes wurde erfasst.',
    appointment: 'Untersuchungstermin',
    instructions: 'Anweisungen und Kontakt',
    instructionVersion: 'Ursprüngliche Anweisungen v1',
    reminders: 'Erinnerungen',
    problem: 'Ich habe ein Problem',
    saveProblem: 'Problem in der Demo speichern',
    savedProblem: 'Nur in der Demo gespeichert · offen',
    failure: 'Die Verbindung ist fehlgeschlagen.',
    reload: 'Aktuellen Plan laden',
    dateLocale: 'de-DE',
    instructionText: 'Öffnen und lesen Sie die ursprünglichen Demo-Hinweise.',
    originalText: 'Demo-Hinweise v1.',
    conflict: 'Der Plan wurde inzwischen geändert.',
  },
]) {
  test(`${language.code}: translated journeys, dates, persistence and error recovery`, async ({
    page,
    request,
  }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveText('Vaša príprava, prehľadne.')
    const initial = await (await request.get('/api/plan')).json()
    await page.locator('#site-language').selectOption(language.code)
    await expect(page.locator('html')).toHaveAttribute('lang', language.code)
    await expect(page.locator('h1')).toHaveText(language.overview)
    expect(await (await request.get('/api/plan')).json()).toEqual(initial)

    for (const [hash, title] of [
      ['plan', language.plan],
      ['krok/instructions', language.step],
      ['termin', language.appointment],
      ['pokyny', language.instructions],
      ['pripomienky', language.reminders],
      ['problem/transport', language.problem],
    ]) {
      await page.evaluate((hash) => {
        window.location.hash = hash
      }, hash!)
      await expect(page.locator('h1')).toHaveText(title!)
      if (!hash!.startsWith('krok/')) await expect(page).toHaveTitle(`${title} · Pokojne`)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      if (hash === 'krok/instructions') {
        await expect(page.locator('.instruction-text')).toContainText(language.instructionText)
        await page.getByRole('button', { name: language.complete, exact: true }).click()
        await expect(page.getByRole('status')).toHaveText(language.completed)
      }
      if (hash === 'termin') {
        const expectedDate = await page.evaluate(
          ({ at, dateLocale }) =>
            new Intl.DateTimeFormat(dateLocale, {
              timeZone: 'Europe/Bratislava',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(at)),
          { at: initial.appointment.at, dateLocale: language.dateLocale },
        )
        await expect(page.locator('.large-date')).toHaveText(expectedDate)
      }
      if (hash === 'pokyny') {
        await expect(page.getByRole('heading', { name: language.instructionVersion })).toBeVisible()
        await expect(page.locator('.instruction-text')).toContainText(language.originalText)
      }
    }

    const draft = 'Fictional note: Sprievod nemôže prísť. Begleitung fehlt.'
    await page.locator('#problem-description').fill(draft)
    // Switching language updates this form in place, preserving every draft field.
    await page.locator('#site-language').selectOption('sk')
    await expect(page.locator('#problem-description')).toHaveValue(draft)
    await expect(page.locator('#problem-step')).toHaveValue('transport')
    await page.locator('#site-language').selectOption(language.code)

    await page.route('**/api/actions', (route) => route.abort())
    await page.getByRole('button', { name: language.saveProblem }).click()
    await expect(page.getByRole('alert')).toContainText(language.failure)
    await expect(page.locator('#problem-description')).toHaveValue(draft)
    await page.unroute('**/api/actions')
    await page.getByRole('button', { name: language.reload }).click()
    await expect(page.getByRole('button', { name: language.saveProblem })).toBeEnabled()

    // A real server conflict must also be translated without losing the draft.
    const current = await (await request.get('/api/plan')).json()
    await request.post('/api/actions', {
      data: {
        revision: current.revision,
        type: 'completion',
        step_id: 'documents',
        completed: true,
      },
    })
    await page.getByRole('button', { name: language.saveProblem }).click()
    await expect(page.getByRole('alert')).toContainText(language.conflict)
    await expect(page.locator('#problem-description')).toHaveValue(draft)
    await page.getByRole('button', { name: language.reload }).click()
    await expect(page.getByRole('button', { name: language.saveProblem })).toBeEnabled()
    await page.getByRole('button', { name: language.saveProblem }).click()
    await expect(page.getByText(language.savedProblem, { exact: true })).toBeVisible()
    await expect(page.locator('.problem-record .preserve-lines')).toHaveText(draft)
    await page.reload()
    await expect(page.locator('#site-language')).toHaveValue(language.code)
    await expect(page.locator('html')).toHaveAttribute('lang', language.code)
    await expect(page.locator('h1')).toHaveText(language.problem)
    await expect(page.locator('.problem-record .preserve-lines')).toHaveText(draft)
    const { default: AxeBuilder } = await import('@axe-core/playwright')
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([])
  })
}

test('unsupported preference and unavailable storage keep language selection usable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('pokojne-language', 'unsupported')
    } catch {
      /* Storage may be disabled. */
    }
  })
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Vaša príprava, prehľadne.')
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk')
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage disabled', 'SecurityError')
      },
    })
  })
  await page.reload()
  await page.locator('#site-language').selectOption('de')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.locator('h1')).toHaveText('Ihre Vorbereitung, übersichtlich.')
})

test('translated navigation remains reachable at tablet widths', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Vaša príprava, prehľadne.')
  for (const code of ['en', 'de']) {
    await page.locator('#site-language').selectOption(code)
    for (const width of [768, 1024]) {
      await page.setViewportSize({ width, height: 1000 })
      const links = page.getByRole('navigation').getByRole('link')
      for (let index = 0; index < 5; index++) {
        const link = links.nth(index)
        const href = await link.getAttribute('href')
        await link.click({ timeout: 3000 })
        await expect(page).toHaveURL(new RegExp(`${href}$`))
      }
      await links.first().click()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      await page.screenshot({ path: testInfo.outputPath(`${code}-${width}.png`), fullPage: true })
    }
  }
})
