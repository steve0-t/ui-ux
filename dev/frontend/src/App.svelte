<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { ApiError, fetchPlan, type Plan, type PatientAction, type DemoAction } from './lib/api'
  import Icon from './components/Icon.svelte'
  import DemoPanel from './components/DemoPanel.svelte'
  import Overview from './pages/Overview.svelte'
  import PlanPage from './pages/Plan.svelte'
  import StepDetail from './pages/StepDetail.svelte'
  import Appointment from './pages/Appointment.svelte'
  import Problems from './pages/Problems.svelte'
  import Instructions from './pages/Instructions.svelte'
  import Reminders from './pages/Reminders.svelte'

  let plan = $state<Plan | null>(null)
  let route = $state('prehlad')
  let busy = $state(false)
  let error = $state('')
  let message = $state('')
  let needsReload = $state(false)
  let errorElement: HTMLDivElement | undefined = $state()
  const nav = [
    { id: 'prehlad', label: 'Prehľad', icon: 'home' },
    { id: 'plan', label: 'Plán prípravy', icon: 'list' },
    { id: 'termin', label: 'Termín vyšetrenia', icon: 'calendar' },
    { id: 'pokyny', label: 'Pokyny a kontakt', icon: 'book' },
    { id: 'pripomienky', label: 'Pripomienky', icon: 'bell' },
  ]
  const page = $derived(route.split('/')[0])
  const item = $derived(route.split('/')[1] ?? '')
  const selectedStep = $derived(plan?.steps.find((s) => s.id === item))

  async function showError(value: unknown) {
    error = value instanceof Error ? value.message : 'Údaje nie sú dostupné. Skúste to znova.'
    needsReload =
      !(value instanceof ApiError) ||
      value.status === 0 ||
      value.status === 409 ||
      value.status >= 500
    await tick()
    errorElement?.focus()
  }
  async function reload() {
    if (busy) return
    busy = true
    message = ''
    try {
      plan = await fetchPlan()
      error = ''
      needsReload = false
      message = 'Aktuálny plán bol načítaný.'
    } catch (value) {
      await showError(value)
    } finally {
      busy = false
    }
  }
  async function send(action: PatientAction | DemoAction, success: string, demo = false) {
    if (!plan || busy || needsReload) return false
    busy = true
    error = ''
    message = ''
    try {
      plan = await fetchPlan(demo ? '/api/demo' : '/api/actions', {
        revision: plan.revision,
        ...action,
      })
      message = success
      return true
    } catch (value) {
      await showError(value)
      return false
    } finally {
      busy = false
    }
  }
  const mutate = (action: PatientAction, success: string) => send(action, success)
  const simulate = async (action: DemoAction) => {
    const accepted = await send(
      action,
      'Ukážkový scenár bol aktualizovaný. Nejde o udalosť skutočného pracoviska.',
      true,
    )
    if (accepted && action.type === 'reset') window.location.hash = 'prehlad'
    return accepted
  }
  onMount(() => {
    const navigate = async (focus: boolean) => {
      route = window.location.hash.slice(1) || 'prehlad'
      if (focus) {
        await tick()
        document.querySelector<HTMLElement>('h1')?.focus()
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
    const listener = () => {
      void navigate(true)
    }
    void navigate(false)
    window.addEventListener('hashchange', listener)
    void reload()
    return () => window.removeEventListener('hashchange', listener)
  })
</script>

<svelte:head
  ><title
    >{nav.find((n) => n.id === page)?.label ??
      (page === 'problem' ? 'Mám problém' : 'Krok prípravy')} · Pokojne</title
  ><meta
    name="description"
    content="Ukážkový sprievodca prípravou na vyšetrenie. Plán, záznamy krokov a pomoc pri zmene termínu."
  /></svelte:head
>
<a
  href="#main"
  class="skip-link"
  onclick={(e) => {
    e.preventDefault()
    document.getElementById('main')?.focus()
  }}>Preskočiť na obsah</a
>
<div class="app-shell">
  <header class="site-header">
    <div class="header-main">
      <a href="#prehlad" class="brand" aria-label="Pokojne – prehľad"
        ><span class="brand-mark"
          ><svg viewBox="0 0 30 30" fill="none" aria-hidden="true"
            ><path
              d="M7 20V10a3 3 0 0 1 3-3h7a6 6 0 0 1 0 12h-4"
              stroke="currentColor"
              stroke-width="3.2"
              stroke-linecap="round"
            /><path
              d="m13 14 3 3 5-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg
          ></span
        >pokojne<span class="brand-period">.</span></a
      >
      <span class="brand-subtitle">Váš sprievodca prípravou</span>
      <span class="demo-badge"><span></span> Ukážka s fiktívnymi údajmi</span>
    </div>
    <div class="navigation-bar">
      <nav aria-label="Hlavná navigácia">
        {#each nav as link}<a
            href={`#${link.id}`}
            class:active={page === link.id || (page === 'krok' && link.id === 'plan')}
            aria-current={page === link.id || (page === 'krok' && link.id === 'plan')
              ? 'page'
              : undefined}><Icon name={link.icon} /><span>{link.label}</span></a
          >{/each}
      </nav>
      <a href="#problem" class="nav-help" class:active={page === 'problem'}
        ><Icon name="help" /> Mám problém {#if plan?.problems.length}<span class="count"
            >{plan.problems.length}</span
          >{/if}</a
      >
    </div>
  </header>
  <div class="main-shell">
    <main id="main" tabindex="-1">
      <div class="demo-disclaimer">
        <Icon name="shield" size={16} />
        <span
          >Táto ukážka nenahrádza pokyny vášho pracoviska. Správy ani pripomienky sa neodosielajú.</span
        >
      </div>
      {#if error}<div class="notice error" role="alert" tabindex="-1" bind:this={errorElement}>
          <strong>{error}</strong>{#if plan}<p>
              Zobrazený plán je posledná prijatá verzia. Rozpracované polia zostávajú zachované.
            </p>{/if}<button class="secondary" disabled={busy} onclick={reload}
            >Načítať aktuálny plán</button
          >
        </div>{/if}
      <div class="save-status" role="status" aria-live="polite">
        {busy ? 'Načítavam alebo ukladám údaje…' : message}
      </div>
      {#if plan}
        {#if page === 'prehlad'}<Overview {plan} />
        {:else if page === 'plan'}<PlanPage {plan} />
        {:else if page === 'krok' && selectedStep}<StepDetail
            {plan}
            step={selectedStep}
            busy={busy || needsReload}
            {mutate}
          />
        {:else if page === 'termin'}<Appointment {plan} busy={busy || needsReload} {mutate} />
        {:else if page === 'problem'}{#key item}<Problems
              {plan}
              initialStep={item}
              busy={busy || needsReload}
              {mutate}
            />{/key}
        {:else if page === 'pokyny'}<Instructions {plan} />
        {:else if page === 'pripomienky'}<Reminders {plan} busy={busy || needsReload} {mutate} />
        {:else}<div class="page-heading">
            <h1 tabindex="-1">Táto stránka sa nenašla</h1>
            <a href="#prehlad">Späť na prehľad</a>
          </div>{/if}
        <DemoPanel {plan} busy={busy || needsReload} {simulate} />
      {:else if !error}<div class="loading surface">
          <h1 tabindex="-1">Načítavam váš plán…</h1>
          <p>O chvíľu uvidíte termín a kroky prípravy.</p>
        </div>
      {:else}<h1 tabindex="-1">Plán zatiaľ nie je dostupný</h1>
        <p>Skúste načítať aktuálny plán pomocou tlačidla vyššie.</p>{/if}
      <footer class="page-footer">
        <span><strong>pokojne.</strong> Malé kroky. Jasnejší ďalší postup.</span>
        <span>Školský prototyp · 2026</span>
        <a href="#pokyny">Pôvod pokynov a kontakt</a>
      </footer>
    </main>
  </div>
</div>
