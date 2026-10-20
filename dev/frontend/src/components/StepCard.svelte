<script lang="ts">
  import type { Step } from '../lib/api'
  import StatusBadge from './StatusBadge.svelte'
  import Icon from './Icon.svelte'
  import { time } from '../lib/api'
  import { t, locale } from '../lib/i18n'
  let { step, index }: { step: Step; index: number } = $props()
</script>

<a
  href={`#krok/${step.id}`}
  class="step-card"
  aria-label={$t('{title} – podrobnosti', { title: $t(step.title) })}
>
  <span class:done={step.completed_at !== null} class="step-number"
    >{#if step.completed_at}<Icon name="check" size={19} />{:else}{String(index + 1).padStart(
        2,
        '0',
      )}{/if}</span
  >
  <div class="step-body">
    <h3>{$t(step.title)}</h3>
    <StatusBadge status={step.status} />{#if step.completed_at && step.status !== 'completed'}<small
        >{$t('Máte aj záznam o splnení')}</small
      >{/if}
  </div>
  {#if step.applicable && !step.needs_verification}
    <span class="step-time"><Icon name="clock" size={14} />{time(step.due_at, $locale)}</span>
  {/if}
  <Icon name="arrow" size={19} />
</a>
