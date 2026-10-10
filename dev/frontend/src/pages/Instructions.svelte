<script lang="ts">
  import type { Plan } from '../lib/api'
  import { dateTime } from '../lib/api'
  import ContactPanel from '../components/ContactPanel.svelte'
  let { plan }: { plan: Plan } = $props()
</script>

<div class="page-heading">
  <p class="eyebrow">Zdroj informácií a pomoc</p>
  <h1 tabindex="-1">Pokyny a kontakt</h1>
  <p>Skutočné pokyny musí poskytnúť vaše pracovisko.</p>
</div>
<div class="dashboard-grid">
  <div class="stack">
    <div class="notice">
      <strong>Toto sú výlučne ukážkové pokyny.</strong> Neobsahujú medicínsky režim. Nepoužívajte ich
      ako návod na skutočnú prípravu.
    </div>
    {#each [...plan.instructions].reverse() as instruction}<section class="surface detail-card">
        <span class="badge planned"
          >Verzia {instruction.version}{instruction.version === plan.plan_version
            ? ' · zobrazený plán'
            : ' · archív'}</span
        >
        <h2>Pôvodné pokyny v{instruction.version}</h2>
        <p class="small">{instruction.source}<br />Vydané: {dateTime(instruction.issued_at)}</p>
        <p class="instruction-text">{instruction.text}</p>
        {#if plan.validity !== 'current' && instruction.version === plan.plan_version}<p
            class="notice"
          >
            Tieto pokyny čakajú na overenie pre nový termín.
          </p>{/if}
      </section>{/each}
    <section class="surface detail-card">
      <h2>Čo znamenajú vaše záznamy</h2>
      <p>
        „Označené ako splnené“ je váš záznam o vykonaní. Nepotvrdzuje zdravotnú pripravenosť na
        vyšetrenie. Otvorené problémy a pokyny, ktoré treba overiť, zostávajú viditeľné samostatne.
      </p>
      <a href="#problem" class="button secondary">Nerozumiem pokynu</a>
    </section>
  </div>
  <aside><ContactPanel full /></aside>
</div>
