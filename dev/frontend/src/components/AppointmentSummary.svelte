<script lang="ts">
  import type { Plan } from '../lib/api'
  import { day, time } from '../lib/api'
  import Icon from './Icon.svelte'
  import { t, locale } from '../lib/i18n'
  let { plan }: { plan: Plan } = $props()
</script>

<section class="appointment-strip" aria-label={$t('Potvrdený termín v ukážke')}>
  <div class="appointment-main">
    <div class="icon-tile"><Icon name="calendar" size={25} /></div>
    <div>
      <p class="eyebrow">{$t('Váš termín · ukážka')}</p>
      <h2>{$t('Kolonoskopia')}</h2>
      <p>
        {day(plan.appointment.at, $locale)}
        {$t('o')} <strong>{time(plan.appointment.at, $locale)}</strong>
      </p>
    </div>
  </div>
  <div class="arrival">
    <span class="muted">{$t('Príchod na pracovisko')}</span><strong
      >{time(plan.appointment.arrival, $locale)}</strong
    >
  </div>
  <a class="text-link" href="#termin">{$t('Podrobnosti')} <Icon name="arrow" size={18} /></a>
</section>
