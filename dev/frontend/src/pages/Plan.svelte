<script lang="ts">
  import type { Plan } from '../lib/api'
  import { day } from '../lib/api'
  import StepCard from '../components/StepCard.svelte'
  let { plan }: { plan: Plan } = $props()
  const groups = $derived([
    ...new Set(plan.steps.filter((s) => s.applicable).map((s) => day(s.due_at))),
  ])
</script>

<div class="page-heading">
  <p class="eyebrow">Čo, kedy a podľa ktorých pokynov</p>
  <h1 tabindex="-1">Plán prípravy</h1>
  <p>Vyberte krok, prečítajte pokyn a zaznamenajte skutočný stav.</p>
</div>
{#if plan.validity !== 'current'}<div class="notice">
    <strong>Čaká na potvrdenie pracoviskom.</strong> Zobrazené časy sú z pôvodného plánu a nie sú
    novým pokynom. <a href="#termin">Pozrieť zmenu a ďalší postup</a>
  </div>{/if}
<div class="reading-width">
  {#each groups as group}<section class="plan-group">
      <h2>{group}</h2>
      {#each plan.steps.filter((s) => s.applicable && day(s.due_at) === group) as step}<StepCard
          {step}
          index={plan.steps.indexOf(step)}
        />{/each}
    </section>{/each}
  <section class="plan-group">
    <h2>Podľa podmienok vášho plánu</h2>
    {#each plan.steps.filter((s) => !s.applicable) as step}<StepCard
        {step}
        index={plan.steps.indexOf(step)}
      />{/each}
  </section>
</div>
