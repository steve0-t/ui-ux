<script lang="ts">
  import { untrack } from 'svelte'
  import type { Plan, Mutate } from '../lib/api'
  import { dateTime } from '../lib/api'
  import { t, locale } from '../lib/i18n'
  let { plan, busy, mutate }: { plan: Plan; busy: boolean; mutate: Mutate } = $props()
  let enabled = $state(untrack(() => plan.preferences.enabled))
  let channel = $state(untrack(() => plan.preferences.channel))
  let minutes = $state(untrack(() => plan.preferences.minutes_before))
</script>

<div class="page-heading">
  <p class="eyebrow">{$t('Podľa vašich potrieb')}</p>
  <h1 tabindex="-1">{$t('Pripomienky')}</h1>
  <p>{$t('Pripomienky sú dobrovoľné. Svoje nastavenie môžete kedykoľvek zmeniť.')}</p>
</div>
<div class="reading-width stack">
  <section class="surface detail-card">
    <h2>{$t('Nastavenie pripomienok')}</h2>
    <p class="notice">
      {$t(
        'Ukladá sa iba ukážkové nastavenie. Žiadne SMS ani e-maily sa neposielajú a kontaktné údaje nezbierame.',
      )}
    </p>
    <form
      onsubmit={(e) => {
        e.preventDefault()
        void mutate(
          { type: 'reminders', enabled, channel, minutes_before: minutes },
          'Nastavenie pripomienok je uložené v ukážke. Žiadne správy sa neposielajú.',
        )
      }}
    >
      <label class="checkbox-label"
        ><input type="checkbox" bind:checked={enabled} /> {$t('Chcem pripomienky k plánu')}</label
      >
      <label for="reminder-channel">{$t('Spôsob pripomenutia')}</label><select
        id="reminder-channel"
        bind:value={channel}
        disabled={!enabled}
        ><option value="email">{$t('E-mail · ukážka')}</option><option value="sms"
          >{$t('SMS · ukážka')}</option
        ></select
      >
      <label for="reminder-time">{$t('Predstih pred organizačným krokom')}</label><select
        id="reminder-time"
        bind:value={minutes}
        disabled={!enabled}
        ><option value={30}>{$t('30 minút')}</option><option value={60}>{$t('1 hodina')}</option
        ><option value={1440}>{$t('1 deň')}</option></select
      >
      <button class="spaced" disabled={busy}>{$t('Uložiť nastavenie')}</button>
    </form>
    <p class="small">
      {$t('Uložené nastavenie: {state}.', {
        state: $t(plan.preferences.enabled ? 'zapnuté' : 'vypnuté'),
      })}
    </p>
  </section>
  <section class="surface detail-card">
    <h2>{$t('Pripomienky v aktuálnom pláne')}</h2>
    {#if plan.validity !== 'current'}<p class="notice">
        {$t('Staré pripomienky sú neaktívne. Nové môžu vzniknúť až po potvrdení aktuálneho plánu.')}
      </p>{/if}
    {#each plan.reminders.filter((r) => r.active) as reminder}<p>
        <strong>{$t(plan.steps.find((s) => s.id === reminder.step_id)?.title ?? '')}</strong><br
        />{$t('{time} · plán v{version} · bez odosielania', {
          time: dateTime(reminder.at, $locale),
          version: reminder.plan_version,
        })}
      </p>{:else}<p>
        {$t(
          'Nie sú tu aktívne pripomienky. Vznikajú iba pre budúce, nepotvrdené kroky aktuálneho plánu so zapnutým nastavením.',
        )}
      </p>{/each}
    <p class="small">
      {$t(
        'Externý kalendár nie je pripojený. Ak ste si pridali vlastné upozornenia inde, pri zmene termínu ich skontrolujte sami.',
      )}
    </p>
  </section>
</div>
