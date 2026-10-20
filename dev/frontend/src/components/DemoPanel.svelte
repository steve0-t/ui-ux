<script lang="ts">
  import type { Plan, Simulate, DemoAction } from '../lib/api'
  import { dateTime } from '../lib/api'
  import { t, locale } from '../lib/i18n'
  let { plan, busy, simulate }: { plan: Plan; busy: boolean; simulate: Simulate } = $props()
  let scenario = $state('normal')
</script>

<details class="demo-panel">
  <summary
    >{$t('Ovládanie ukážky')} <span>{$t('Pre prezentáciu a skúšanie scenárov')}</span></summary
  >
  <div class="demo-content">
    <p>
      {$t(
        'Fiktívne udalosti pracoviska. Reset vymaže záznamy celej lokálnej ukážky. Údaje sú spoločné pre otvorené karty a po reštarte servera sa obnovia.',
      )}
    </p>
    <p><strong>{$t('Ukážkový čas:')}</strong> {dateTime(plan.now, $locale)} · Europe/Bratislava</p>
    <div class="demo-controls">
      <label for="demo-scenario"
        >{$t('Scenár')}<select id="demo-scenario" bind:value={scenario}
          ><option value="normal">{$t('Bežná príprava')}</option><option value="missing"
            >{$t('Chýbajúce potvrdenie')}</option
          ><option value="problem">{$t('Oznámený problém')}</option><option value="change_before"
            >{$t('Zmena pred prípravou')}</option
          ><option value="change_during">{$t('Zmena počas prípravy')}</option></select
        ></label
      >
      <button
        class="secondary"
        disabled={busy}
        onclick={() => simulate({ type: 'reset', scenario } as DemoAction)}
        >{$t('Obnoviť scenár')}</button
      >
      <button class="secondary" disabled={busy} onclick={() => simulate({ type: 'advance_time' })}
        >{$t('Posunúť čas o deň')}</button
      >
    </div>
    <div class="actions">
      <button
        class="secondary"
        disabled={busy || plan.validity !== 'current'}
        onclick={() => simulate({ type: 'confirm_appointment' })}
        >{$t('Simulovať nový termín')}</button
      ><button
        class="secondary"
        disabled={busy || plan.validity === 'current' || plan.started}
        onclick={() => simulate({ type: 'confirm_plan' })}
        >{$t('Simulovať potvrdenie plánu')}</button
      >
    </div>
    {#if plan.started && plan.validity !== 'current'}<p>
        {$t(
          'Po začatí prípravy ukážka zostáva na overenie. Individuálne pokyny nemáme; nový medicínsky režim sa nevytvorí.',
        )}
      </p>{/if}
  </div>
</details>
