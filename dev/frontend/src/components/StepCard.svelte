<script lang="ts">
  import type { Step } from '../lib/api'
  import StatusBadge from './StatusBadge.svelte'
  import Icon from './Icon.svelte'
  let { step, index }: { step: Step; index: number } = $props()
</script>

<a href={`#krok/${step.id}`} class="step-card" aria-label={`${step.title} – podrobnosti`}>
  <span class:done={step.completed_at !== null} class="step-number"
    >{#if step.completed_at}<Icon name="check" size={19} />{:else}{String(index + 1).padStart(
        2,
        '0',
      )}{/if}</span
  >
  <div class="step-body">
    <h3>{step.title}</h3>
    <StatusBadge status={step.status} />{#if step.completed_at && step.status !== 'completed'}<small
        >Máte aj záznam o splnení</small
      >{/if}
  </div>
  <Icon name="arrow" size={19} />
</a>
