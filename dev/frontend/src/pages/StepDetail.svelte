<script lang="ts">
  import type { Plan, Step, Mutate } from '../lib/api'
  import { dateTime } from '../lib/api'
  import StatusBadge from '../components/StatusBadge.svelte'
  import ContactPanel from '../components/ContactPanel.svelte'
  let { plan, step, busy, mutate }: { plan: Plan; step: Step; busy: boolean; mutate: Mutate } =
    $props()
</script>

<a href="#plan" class="back-link">← Späť na celý plán</a>
<div class="page-heading">
  <p class="eyebrow">{step.category}</p>
  <h1 tabindex="-1">{step.title}</h1>
  <StatusBadge status={step.status} />
</div>
<div class="dashboard-grid">
  <section class="surface detail-card">
    <p class="eyebrow">Pokyn · ukážková verzia {plan.plan_version}</p>
    <p class="instruction-text">{step.instruction}</p>
    <dl class="detail-list">
      <div>
        <dt>Začiatok organizačného kroku</dt>
        <dd>{dateTime(step.due_at)}</dd>
      </div>
      <div>
        <dt>Plánovaný koniec</dt>
        <dd>{dateTime(step.deadline)}</dd>
      </div>
    </dl>
    <p class="small">
      Ukážkové časy organizačných úloh nie sú časovaním medicínskej prípravy. <a href="#pokyny"
        >Pôvodné pokyny a zdroj</a
      >
    </p>
    {#if !step.applicable}<p class="notice">{step.exclusion}</p>{/if}
    {#if step.status === 'unconfirmed'}<p class="notice">
        Nemáme potvrdenie tohto kroku. Samotné uplynutie času neznamená, že ste pokyn nedodržali.
      </p>{/if}
    {#if step.needs_verification || plan.validity !== 'current'}<p class="notice">
        <strong>Platnosť treba overiť.</strong> Pôvodné časy nie sú náhradným plánom. Vyjasnite si ďalší
        postup s pracoviskom.
      </p>{/if}
    {#if step.completed_at}<p class="success-note">
        Splnenie zaznamenané: {dateTime(step.completed_at)}.
      </p>
      <p>
        Ak ste krok označili omylom, opravte iba záznam. Oprava nie je pokynom na opakovanie
        medicínskeho úkonu.
      </p>{/if}
    {#if plan.problems.some((p) => p.step_id === step.id)}<p class="notice">
        Ku kroku máte otvorený problém. Záznam o splnení ho nevyrieši. <a href="#problem"
          >Pozrieť problém</a
        >
      </p>{/if}
    <div class="actions">
      {#if step.applicable}<button
          disabled={busy ||
            (!step.completed_at && (step.needs_verification || plan.validity !== 'current'))}
          onclick={() =>
            mutate(
              { type: 'completion', step_id: step.id, completed: !step.completed_at },
              step.completed_at
                ? 'Označenie je opravené. Medicínsky úkon neopakujte iba kvôli oprave záznamu.'
                : 'Splnenie kroku je zaznamenané.',
            )}
          class:secondary={!!step.completed_at}
          >{step.completed_at ? 'Opraviť označenie' : 'Označiť ako splnené'}</button
        ><a href={`#problem/${step.id}`} class="button secondary">Mám problém</a>{/if}
    </div>
    {#if step.completed_at && plan.next_step_id}<a
        class="text-link spaced"
        href={`#krok/${plan.next_step_id}`}>Pokračovať na ďalší krok →</a
      >{/if}
    <details class="history">
      <summary>História záznamov tohto kroku</summary
      >{#each plan.history.filter((h) => h.step_id === step.id) as item}<p>
          {item.completed ? 'Označené ako splnené' : 'Označenie opravené'} · {dateTime(item.at)} · plán
          v{item.plan_version}
        </p>{:else}<p>Zatiaľ bez záznamu.</p>{/each}
    </details>
  </section>
  <aside><ContactPanel /></aside>
</div>
