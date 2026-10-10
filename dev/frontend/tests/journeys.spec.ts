import { test, expect, type Page, type APIRequestContext } from '@playwright/test'

async function reset(request: APIRequestContext, scenario = 'normal') {
  const state = await (await request.get('/api/plan')).json()
  const response = await request.post('/api/demo', {
    data: { revision: state.revision, type: 'reset', scenario },
  })
  expect(response.ok()).toBeTruthy()
}
async function state(request: APIRequestContext) {
  return (await request.get('/api/plan')).json()
}
async function navigate(page: Page, hash: string, title: string | RegExp) {
  await page.goto(`/#${hash}`)
  await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible()
}
async function simulate(page: Page, label: string) {
  const panel = page.locator('.demo-panel')
  if ((await panel.getAttribute('open')) === null) await panel.locator('summary').click()
  await panel.getByRole('button', { name: label, exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Ukážkový scenár bol aktualizovaný')
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
}

test.beforeEach(async ({ request }) => {
  await reset(request)
})

test('PP01: normal preparation, correction, reload and completion', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vaša príprava, prehľadne.')
  await noOverflow(page)
  await page.getByRole('link', { name: 'Otvoriť krok', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Prečítať pokyny pracoviska')
  await page.getByRole('button', { name: 'Označiť ako splnené', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Opraviť označenie' })).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: 'Opraviť označenie' }).click()
  await expect(page.getByRole('status')).toContainText('Označenie je opravené')
  await page.getByRole('button', { name: 'Označiť ako splnené', exact: true }).click()
  for (const title of [
    'Overiť individuálne pokyny',
    'Dohodnúť sprievod a odvoz',
    'Pripraviť doklady a dokumenty',
    'Overiť miesto a čas príchodu',
  ]) {
    await page.getByRole('link', { name: 'Pokračovať na ďalší krok' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await page.getByRole('button', { name: 'Označiť ako splnené', exact: true }).click()
    await expect(page.getByRole('status')).toContainText('Splnenie kroku je zaznamenané')
    await noOverflow(page)
  }
  await page.getByRole('link', { name: 'Prehľad', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'Všetky kroky označené ako splnené' }),
  ).toBeVisible()
  expect((await state(request)).completed_count).toBe(5)
  expect(errors).toEqual([])
})

test('PP02: request, confirmed change, acknowledgement, verified new plan', async ({
  page,
  request,
}) => {
  await navigate(page, 'pripomienky', 'Pripomienky')
  await page.getByLabel('Chcem pripomienky k plánu').check()
  await page.getByRole('button', { name: 'Uložiť nastavenie' }).click()
  await expect(page.getByRole('status')).toContainText('Nastavenie pripomienok je uložené')
  const original = await state(request)
  expect(original.reminders.some((r: { active: boolean }) => r.active)).toBe(true)
  await page.getByRole('link', { name: 'Termín vyšetrenia', exact: true }).click()
  await page.getByRole('button', { name: 'Požiadať o zmenu', exact: true }).click()
  await page.getByLabel('Prečo potrebujete zmenu?').fill('V tomto čase nemôžem prísť.')
  await page.getByRole('button', { name: 'Uložiť požiadavku v ukážke' }).click()
  await expect(page.getByRole('status')).toContainText('Pôvodný termín stále platí')
  expect((await state(request)).appointment).toEqual(original.appointment)
  await simulate(page, 'Simulovať nový termín')
  await expect(page.getByRole('heading', { name: 'Čo sa zmenilo' })).toBeVisible()
  await page.getByRole('button', { name: 'Rozumiem zmene termínu' }).click()
  await expect(page.getByRole('status')).toContainText('Prečítanie zmeny je zaznamenané')
  expect((await state(request)).validity).toBe('awaiting_confirmation')
  await page.reload()
  expect((await state(request)).reminders.every((r: { active: boolean }) => !r.active)).toBe(true)
  await simulate(page, 'Simulovať potvrdenie plánu')
  const result = await state(request)
  expect(result.validity).toBe('current')
  expect(result.plan_version).toBe(2)
  expect(
    result.reminders
      .filter((r: { active: boolean }) => r.active)
      .every((r: { plan_version: number }) => r.plan_version === 2),
  ).toBe(true)
  await page.getByRole('link', { name: 'Pokyny a kontakt', exact: true }).first().click()
  await expect(page.getByRole('heading', { name: 'Pôvodné pokyny v1' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Pôvodné pokyny v2' })).toBeVisible()
  await noOverflow(page)
})

test('PP02: change during preparation retains history and waits for workplace', async ({
  page,
  request,
}) => {
  await navigate(page, 'krok/medicines', 'Overiť individuálne pokyny')
  await page.getByRole('button', { name: 'Označiť ako splnené', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('Splnenie kroku')
  await page.getByRole('link', { name: 'Termín vyšetrenia', exact: true }).click()
  await page.getByRole('button', { name: 'Prípravu som už začal/a' }).click()
  await expect(page.getByRole('status')).toContainText('Začiatok prípravy')
  const before = await state(request)
  await simulate(page, 'Simulovať nový termín')
  await expect(page.getByRole('button', { name: 'Simulovať potvrdenie plánu' })).toBeDisabled()
  await page.getByRole('button', { name: 'Rozumiem zmene termínu' }).click()
  await navigate(page, 'krok/medicines', 'Overiť individuálne pokyny')
  await expect(page.getByText('Treba overiť', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Opraviť označenie' })).toBeVisible()
  const after = await state(request)
  expect(after.history).toEqual(before.history)
  expect(after.steps[1].due_at).toBe(before.steps[1].due_at)
  await navigate(page, 'prehlad', 'Vaša príprava, prehľadne.')
  await expect(page.getByRole('heading', { name: 'Najprv overte aktuálne pokyny.' })).toBeVisible()
  await noOverflow(page)
})

test('PP03: overdue is unconfirmed; reporting preserves open issue after completion', async ({
  page,
  request,
}) => {
  await reset(request, 'missing')
  await navigate(page, 'krok/instructions', 'Prečítať pokyny pracoviska')
  await expect(page.getByText('Po termíne – nepotvrdené', { exact: true })).toBeVisible()
  expect((await state(request)).problems).toHaveLength(0)
  await page.getByRole('link', { name: 'Mám problém', exact: true }).last().click()
  await page.getByLabel('Čo sa stalo alebo čomu nerozumiete?').fill('Nerozumiem pokynu v pozvánke.')
  await page.getByRole('button', { name: 'Uložiť problém v ukážke' }).click()
  await expect(page.getByText('Uložené iba v ukážke · otvorené')).toBeVisible()
  await page.getByRole('link', { name: 'Pozrieť súvisiaci krok' }).click()
  await page.getByRole('button', { name: 'Označiť ako splnené', exact: true }).click()
  await expect(page.getByText('Problém oznámený', { exact: true })).toBeVisible()
  expect((await state(request)).problems).toHaveLength(1)
  await page.getByRole('link', { name: 'Prehľad', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Váš problém zostáva otvorený.' })).toBeVisible()
})

test('API failure preserves form input and offers successful retry after reload', async ({
  page,
  request,
}) => {
  await navigate(page, 'problem/transport', 'Mám problém')
  const description = page.getByLabel('Čo sa stalo alebo čomu nerozumiete?')
  await description.fill('Môj sprievod nemôže prísť.')
  await page.route('**/api/actions', (route) => route.abort())
  await page.getByRole('button', { name: 'Uložiť problém v ukážke' }).click()
  await expect(page.getByRole('alert')).toContainText('Spojenie sa nepodarilo')
  await expect(description).toHaveValue('Môj sprievod nemôže prísť.')
  expect((await state(request)).problems).toHaveLength(0)
  await page.unroute('**/api/actions')
  await page.getByRole('button', { name: 'Načítať aktuálny plán' }).click()
  await expect(page.getByRole('status')).toContainText('Aktuálny plán bol načítaný')
  await expect(description).toHaveValue('Môj sprievod nemôže prísť.')
  await page.getByRole('button', { name: 'Uložiť problém v ukážke' }).click()
  await expect(page.getByRole('status')).toContainText('Problém bol uložený')
  expect((await state(request)).problems).toHaveLength(1)
})

test('malformed response is not accepted as success', async ({ page }) => {
  await page.route('**/api/plan', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"steps":null}' }),
  )
  await page.goto('/')
  await expect(page.getByRole('alert')).toContainText('nemá očakávaný formát')
  await expect(page.getByRole('heading', { name: 'Vaša príprava, prehľadne.' })).toHaveCount(0)
  await page.unroute('**/api/plan')
  await page.getByRole('button', { name: 'Načítať aktuálny plán' }).click()
  await expect(page.getByRole('heading', { name: 'Vaša príprava, prehľadne.' })).toBeVisible()
})

test('stale tab conflicts preserve draft and do not duplicate problem reports', async ({
  page,
  request,
}) => {
  await navigate(page, 'problem/transport', 'Mám problém')
  await page.getByLabel('Čo sa stalo alebo čomu nerozumiete?').fill('Potrebujem vyjasniť dopravu.')
  const before = await state(request)
  await request.post('/api/actions', {
    data: {
      revision: before.revision,
      type: 'completion',
      step_id: 'instructions',
      completed: true,
    },
  })
  await page.getByRole('button', { name: 'Uložiť problém v ukážke' }).click()
  await expect(page.getByRole('alert')).toContainText('Plán sa medzičasom zmenil')
  await page.getByRole('button', { name: 'Načítať aktuálny plán' }).click()
  await expect(page.getByRole('status')).toContainText('Aktuálny plán bol načítaný')
  await expect(page.getByLabel('Čo sa stalo alebo čomu nerozumiete?')).toHaveValue(
    'Potrebujem vyjasniť dopravu.',
  )
  await page.getByRole('button', { name: 'Uložiť problém v ukážke' }).click()
  await expect(page.getByRole('status')).toContainText('Problém bol uložený')
  expect((await state(request)).problems).toHaveLength(1)
})

test('keyboard navigation, focus and all pages fit the viewport', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Vaša príprava, prehľadne.' })).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Preskočiť na obsah' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  // From main, tab through actual links until the primary next action is reached.
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    if (
      await page
        .getByRole('link', { name: 'Otvoriť krok', exact: true })
        .evaluate((el) => el === document.activeElement)
    )
      break
  }
  await expect(page.getByRole('link', { name: 'Otvoriť krok', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await page.keyboard.press('Tab') // original instructions link
  await page.keyboard.press('Tab') // complete
  await expect(page.getByRole('button', { name: 'Označiť ako splnené', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText('Splnenie kroku')
  for (const [hash, title] of [
    ['plan', 'Plán prípravy'],
    ['termin', 'Termín vyšetrenia'],
    ['pokyny', 'Pokyny a kontakt'],
    ['pripomienky', 'Pripomienky'],
    ['problem', 'Mám problém'],
    ['prehlad', 'Vaša príprava, prehľadne.'],
  ]) {
    await navigate(page, hash!, title!)
    await noOverflow(page)
  }
  await page.screenshot({ path: testInfo.outputPath('overview.png'), fullPage: true })
})

test('PP02 and PP03 can be followed using only the keyboard', async ({ page, request }) => {
  await reset(request, 'change_during')
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Najprv overte aktuálne pokyny.' })).toBeVisible()
  async function tabTo(target: ReturnType<Page['getByRole']>) {
    for (let i = 0; i < 80; i++) {
      if (await target.evaluate((el) => el === document.activeElement)) return
      await page.keyboard.press('Tab')
    }
    await expect(target).toBeFocused()
  }
  await tabTo(page.getByRole('link', { name: 'Termín vyšetrenia', exact: true }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await tabTo(page.getByRole('button', { name: 'Rozumiem zmene termínu' }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText('Prečítanie zmeny je zaznamenané')
  expect((await state(request)).validity).toBe('awaiting_confirmation')
  await tabTo(page.getByRole('link', { name: 'Mám problém', exact: true }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mám problém')
  await tabTo(page.getByLabel('Ktorého kroku sa to týka?'))
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Escape')
  await tabTo(page.getByLabel('Čo sa stalo alebo čomu nerozumiete?'))
  await page.keyboard.type('Potrebujem vysvetlit zmenu pokynov.')
  await expect(page.getByLabel('Čo sa stalo alebo čomu nerozumiete?')).toHaveValue(
    'Potrebujem vysvetlit zmenu pokynov.',
  )
  await tabTo(page.getByRole('button', { name: 'Uložiť problém v ukážke' }))
  await page.keyboard.press('Enter')
  await expect(page.getByText('Uložené iba v ukážke · otvorené')).toBeVisible()
  await tabTo(page.getByRole('link', { name: 'Pokyny a kontakt', exact: true }))
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pokyny a kontakt')
  await expect(page.getByText('V ukážke nie je dostupný', { exact: true })).toBeVisible()
})

test('key views have no axe WCAG A/AA violations', async ({ page, request }) => {
  const { default: AxeBuilder } = await import('@axe-core/playwright')
  for (const hash of [
    'prehlad',
    'plan',
    'krok/instructions',
    'termin',
    'problem/transport',
    'pokyny',
    'pripomienky',
  ]) {
    await page.goto(`/#${hash}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(
      results.violations,
      JSON.stringify(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
        null,
        2,
      ),
    ).toEqual([])
  }
  await reset(request, 'change_during')
  await page.goto('/#termin')
  // A hash-only navigation retains the SPA snapshot; reload after the external fixture reset.
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Čo sa zmenilo' })).toBeVisible()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
})
