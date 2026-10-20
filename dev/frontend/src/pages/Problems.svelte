<script lang="ts">
  import { untrack } from 'svelte'
  import type { Plan, Mutate } from '../lib/api'
  import { dateTime, localInput, fromLocalInput } from '../lib/api'
  import { t, locale } from '../lib/i18n'
  import ContactPanel from '../components/ContactPanel.svelte'
  let {
    plan,
    initialStep = '',
    busy,
    mutate,
  }: { plan: Plan; initialStep?: string; busy: boolean; mutate: Mutate } = $props()
  let stepId = $state(untrack(() => initialStep))
  let description = $state('')
  let occurred = $state(untrack(() => localInput(plan.now)))
  let localError = $state('')
  async function submit(event: SubmitEvent) {
    event.preventDefault()
    localError = ''
    const occurredAt = fromLocalInput(occurred)
    if (!occurredAt) {
      localError =
        'Zadajte jednoznačný platný miestny čas. Pri prechode na zimný čas zvoľte čas mimo opakovanej hodiny.'
      return
    }
    if (
      await mutate(
        { type: 'report_problem', step_id: stepId, description, occurred_at: occurredAt },
        'Problém bol uložený iba v ukážke. Pracovisku sa neodoslal a zostáva otvorený.',
      )
    ) {
      description = ''
    }
  }
</script>

<div class="page-heading">
  <p class="eyebrow">{$t('Pomoc s prípravou')}</p>
  <h1 tabindex="-1">{$t('Mám problém')}</h1>
  <p>{$t('Zapíšte, čo sa stalo. S ďalším postupom vám pomôže vaše pracovisko.')}</p>
</div>
<div class="dashboard-grid">
  <div class="stack">
    <section class="surface detail-card">
      <h2>{$t('Opísať problém')}</h2>
      <p class="notice">
        {$t('Opis sa uloží iba v ukážke. Neodosiela sa zdravotníkovi. Používajte fiktívne údaje.')}
      </p>
      <form onsubmit={submit}>
        <label for="problem-step">{$t('Ktorého kroku sa to týka?')}</label><select
          id="problem-step"
          bind:value={stepId}
          required
          ><option value="" disabled>{$t('Vyberte krok')}</option
          >{#each plan.steps.filter((s) => s.applicable) as step}<option value={step.id}
              >{$t(step.title)}</option
            >{/each}</select
        >
        <label for="problem-description">{$t('Čo sa stalo alebo čomu nerozumiete?')}</label
        ><textarea
          id="problem-description"
          bind:value={description}
          required
          minlength="5"
          maxlength="2000"
          rows="5"
          placeholder={$t('Napríklad: Sprievod v dohodnutom čase nemôže prísť.')}></textarea>
        <label for="problem-time"
          >{$t('Kedy sa to stalo?')} <span class="muted">{$t('(čas na Slovensku)')}</span></label
        ><input
          id="problem-time"
          type="datetime-local"
          bind:value={occurred}
          required
          max={localInput(plan.now)}
          aria-describedby="demo-time-help"
        />
        <p id="demo-time-help" class="small">
          {$t('Ukážkový čas: {time}. Použite čas v posledných 30 dňoch tejto ukážky.', {
            time: dateTime(plan.now, $locale),
          })}
        </p>
        {#if localError}<p role="alert" class="notice error">{$t(localError)}</p>{/if}
        <div class="actions">
          <button disabled={busy}>{$t('Uložiť problém v ukážke')}</button><a
            href="#prehlad"
            class="button secondary">{$t('Späť na prehľad')}</a
          >
        </div>
      </form>
    </section>
    <section class="surface detail-card">
      <h2>{$t('Vaše otvorené problémy')} <span class="count">{plan.problems.length}</span></h2>
      {#each plan.problems as problem}<article class="problem-record">
          <span class="badge problem">{$t('Uložené iba v ukážke · otvorené')}</span>
          <h3>{$t(plan.steps.find((s) => s.id === problem.step_id)?.title ?? '')}</h3>
          <p class="preserve-lines">{problem.description}</p>
          <p class="small">
            {$t('Udalosť: {time}', { time: dateTime(problem.occurred_at, $locale) })}
          </p>
          <p>
            {$t(
              'Pracovisko tento opis nedostalo. Kontaktujte ho cez údaje v pozvánke; samotný pokus o kontakt problém nevyrieši.',
            )}
          </p>
          <a href={`#krok/${problem.step_id}`}>{$t('Pozrieť súvisiaci krok →')}</a>
        </article>{:else}<p>{$t('Zatiaľ ste nezaznamenali žiadny problém.')}</p>{/each}
    </section>
  </div>
  <aside><ContactPanel full /></aside>
</div>
