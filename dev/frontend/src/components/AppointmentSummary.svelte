<script lang="ts">
  import type { Plan } from '../lib/api'
  import { day, time } from '../lib/api'
  import Icon from './Icon.svelte'
  let { plan }: { plan: Plan } = $props()
</script>

<section class="appointment-strip" aria-label="Potvrdený termín v ukážke">
  <div class="appointment-main">
    <div class="icon-tile"><Icon name="calendar" size={25} /></div>
    <div>
      <p class="eyebrow">Váš termín · ukážka</p>
      <h2>Kolonoskopia</h2>
      <p>{day(plan.appointment.at)} o <strong>{time(plan.appointment.at)}</strong></p>
    </div>
  </div>
  <div class="arrival">
    <span class="muted">Príchod na pracovisko</span><strong>{time(plan.appointment.arrival)}</strong
    >
  </div>
  <a class="text-link" href="#termin">Podrobnosti <Icon name="arrow" size={18} /></a>
</section>
