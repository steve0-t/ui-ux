<script lang="ts">
  import type { Plan, Mutate } from '../lib/api'
  import { dateTime } from '../lib/api'
  import { t, locale } from '../lib/i18n'
  import ContactPanel from '../components/ContactPanel.svelte'
  import Icon from '../components/Icon.svelte'
  let { plan, busy, mutate }: { plan: Plan; busy: boolean; mutate: Mutate } = $props()
  let reason = $state('')
  let editing = $state(false)
  async function requestChange(event: SubmitEvent) {
    event.preventDefault()
    if (
      await mutate(
        { type: 'request_change', reason },
        'Požiadavka je uložená iba v ukážke. Pôvodný termín stále platí.',
      )
    ) {
      editing = false
      reason = ''
    }
  }
</script>

<div class="page-heading">
  <p class="eyebrow">{$t('Vaša návšteva')}</p>
  <h1 tabindex="-1">{$t('Termín vyšetrenia')}</h1>
  <p>{$t('Požiadavka na zmenu a potvrdený nový termín sú dva odlišné kroky.')}</p>
</div>
<div class="dashboard-grid">
  <div class="stack">
    <section class="surface detail-card">
      <span class="badge completed">{$t('Potvrdený termín · ukážka')}</span>
      <h2>{$t('Kolonoskopia')}</h2>
      <p class="large-date">{dateTime(plan.appointment.at, $locale)}</p>
      <p><strong>{$t('Príchod:')}</strong> {dateTime(plan.appointment.arrival, $locale)}</p>
      <p>
        <Icon name="pin" size={18} />
        {$t('Modelové endoskopické pracovisko')}<br />{$t(
          'Ukážková 12, Košice · prízemie · fiktívna adresa',
        )}
      </p>
      <a href="#pokyny" class="text-link">{$t('Pokyny a kontakt →')}</a>
    </section>
    {#if plan.change}
      <section class="surface detail-card" aria-labelledby="change-title">
        <p class="eyebrow">{$t('Simulované oznámenie pracoviska')}</p>
        <h2 id="change-title">{$t('Čo sa zmenilo')}</h2>
        <div class="date-comparison">
          <div>
            <span>{$t('Pôvodný termín')}</span><strong
              >{dateTime(plan.change.previous.at, $locale)}</strong
            ><small>{$t('Príchod')} {dateTime(plan.change.previous.arrival, $locale)}</small>
          </div>
          <div>
            <span>{$t('Nový termín')}</span><strong
              >{dateTime(plan.change.current.at, $locale)}</strong
            ><small>{$t('Príchod')} {dateTime(plan.change.current.arrival, $locale)}</small>
          </div>
        </div>
        <h3>
          {$t(
            plan.validity === 'current'
              ? 'Organizačné časy boli aktualizované'
              : 'Tieto kroky treba overiť',
          )}
        </h3>
        <ul>
          {#each plan.change.affected_steps as id}<li>
              {$t(plan.steps.find((s) => s.id === id)?.title ?? '')}
            </li>{/each}
        </ul>
        <p>
          {$t(
            'Prečítanie pôvodných pokynov a história vašich záznamov zostávajú zachované. Staré pripomienky boli deaktivované.',
          )}
        </p>
        {#if plan.validity !== 'current'}<div class="notice">
            <strong>{$t('Čaká na potvrdenie pracoviskom.')}</strong>
            <p>
              {$t(
                plan.change.during_preparation
                  ? 'Príprava už začala. Ukážka neposúva medicínske pokyny ani nevytvára náhradný režim. Potrebujete individuálny postup od pracoviska.'
                  : 'Nový termín je oznámený, ale platnosť pokynov pre tento termín ešte musí potvrdiť pracovisko.',
              )}
            </p>
            <a href="#pokyny">{$t('Ako kontaktovať pracovisko →')}</a>
          </div>{:else}<p class="success-note">
            {$t('Platnosť organizačného plánu v{version} bola potvrdená simulovanou udalosťou.', {
              version: plan.plan_version,
            })}
            <a href="#plan">{$t('Pozrieť aktuálne časy')}</a>
          </p>{/if}
        {#if !plan.change.acknowledged}<button
            disabled={busy}
            onclick={() =>
              mutate(
                { type: 'acknowledge_change' },
                'Prečítanie zmeny je zaznamenané. Tým sa nepotvrdzuje medicínsky postup.',
              )}>{$t('Rozumiem zmene termínu')}</button
          >{:else}<p class="success-note">{$t('Prečítanie zmeny je zaznamenané.')}</p>{/if}
        <p class="small">{$t('Potvrdenie prečítania neznamená schválenie pokynov.')}</p>
      </section>
    {/if}
    <section class="surface detail-card">
      <h2>{$t('Potrebujete iný termín?')}</h2>
      {#if plan.change_request?.status === 'saved_demo'}<p class="notice">
          {$t(
            'Požiadavka je uložená iba v ukážke, pracovisku sa neodoslala. Zatiaľ platí pôvodný termín. Použite kontakt zo svojej pozvánky.',
          )}
        </p>
        <p><strong>{$t('Váš dôvod:')}</strong> {plan.change_request.reason}</p>
        <button
          class="secondary"
          disabled={busy}
          onclick={() =>
            mutate(
              { type: 'cancel_request' },
              'Ukážková požiadavka bola zrušená. Termín sa nezmenil.',
            )}>{$t('Zrušiť ukážkovú požiadavku')}</button
        >
      {:else if editing}<form onsubmit={requestChange}>
          <label for="change-reason">{$t('Prečo potrebujete zmenu?')}</label><textarea
            id="change-reason"
            bind:value={reason}
            required
            minlength="5"
            maxlength="1000"
            rows="4"
            placeholder={$t('Uveďte dôvod bez osobných údajov.')}></textarea>
          <p id="change-note" class="small">
            {$t('Požiadavka sa uloží iba v tejto ukážke. Skutočný termín dohodnite s pracoviskom.')}
          </p>
          <div class="actions">
            <button disabled={busy} aria-describedby="change-note"
              >{$t('Uložiť požiadavku v ukážke')}</button
            ><button
              type="button"
              class="secondary"
              disabled={busy}
              onclick={() => {
                editing = false
                reason = ''
              }}>{$t('Zrušiť')}</button
            >
          </div>
        </form>
      {:else}<p>
          {$t(
            'Zmena vyžaduje potvrdenie pracoviska. Pri zmene počas prípravy treba overiť aj ďalšie pokyny.',
          )}
        </p>
        {#if plan.change_request?.status === 'cancelled'}<p>
            {$t('Predchádzajúca ukážková požiadavka bola zrušená.')}
          </p>{/if}<button
          class="secondary"
          disabled={busy || plan.validity !== 'current'}
          onclick={() => (editing = true)}>{$t('Požiadať o zmenu')}</button
        >{/if}
    </section>
    <section class="surface detail-card">
      <h2>{$t('Začiatok prípravy')}</h2>
      <p>
        {$t(
          'Tento údaj pomáha rozlíšiť zmenu termínu pred prípravou a počas nej. Prečítanie dokumentu samo osebe neznamená začatie prípravy.',
        )}
      </p>
      {#if plan.started}<p class="success-note">
          {$t('Zaznamenali ste, že príprava už začala.')}
        </p>{:else}<button
          class="secondary"
          disabled={busy || plan.validity !== 'current'}
          onclick={() => mutate({ type: 'start_preparation' }, 'Začiatok prípravy je zaznamenaný.')}
          >{$t('Prípravu som už začal/a')}</button
        >{/if}
      <p class="small">{$t('Je to údaj pre ukážku, nie pokyn začať medicínsku prípravu.')}</p>
    </section>
  </div>
  <aside><ContactPanel /></aside>
</div>
