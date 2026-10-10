<script lang="ts">
  import type { Plan, Simulate, DemoAction } from '../lib/api'
  import { dateTime } from '../lib/api'
  let { plan, busy, simulate }: { plan: Plan; busy: boolean; simulate: Simulate } = $props()
  let scenario = $state('normal')
</script>

<details class="demo-panel">
  <summary>Ovládanie ukážky <span>Pre prezentáciu a skúšanie scenárov</span></summary>
  <div class="demo-content">
    <p>
      Fiktívne udalosti pracoviska. Reset vymaže záznamy celej lokálnej ukážky. Údaje sú spoločné
      pre otvorené karty a po reštarte servera sa obnovia.
    </p>
    <p><strong>Ukážkový čas:</strong> {dateTime(plan.now)} · Europe/Bratislava</p>
    <div class="demo-controls">
      <label for="demo-scenario"
        >Scenár<select id="demo-scenario" bind:value={scenario}
          ><option value="normal">Bežná príprava</option><option value="missing"
            >Chýbajúce potvrdenie</option
          ><option value="problem">Oznámený problém</option><option value="change_before"
            >Zmena pred prípravou</option
          ><option value="change_during">Zmena počas prípravy</option></select
        ></label
      >
      <button
        class="secondary"
        disabled={busy}
        onclick={() => simulate({ type: 'reset', scenario } as DemoAction)}>Obnoviť scenár</button
      >
      <button class="secondary" disabled={busy} onclick={() => simulate({ type: 'advance_time' })}
        >Posunúť čas o deň</button
      >
    </div>
    <div class="actions">
      <button
        class="secondary"
        disabled={busy || plan.validity !== 'current'}
        onclick={() => simulate({ type: 'confirm_appointment' })}>Simulovať nový termín</button
      ><button
        class="secondary"
        disabled={busy || plan.validity === 'current' || plan.started}
        onclick={() => simulate({ type: 'confirm_plan' })}>Simulovať potvrdenie plánu</button
      >
    </div>
    {#if plan.started && plan.validity !== 'current'}<p>
        Po začatí prípravy ukážka zostáva na overenie. Individuálne pokyny nemáme; nový medicínsky
        režim sa nevytvorí.
      </p>{/if}
  </div>
</details>
