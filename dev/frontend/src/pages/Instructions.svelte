<script lang="ts">
  import type { Plan } from '../lib/api'
  import { dateTime } from '../lib/api'
  import { t, locale } from '../lib/i18n'
  import ContactPanel from '../components/ContactPanel.svelte'
  let { plan }: { plan: Plan } = $props()
</script>

<div class="page-heading">
  <p class="eyebrow">{$t('Zdroj informácií a pomoc')}</p>
  <h1 tabindex="-1">{$t('Pokyny a kontakt')}</h1>
  <p>{$t('Skutočné pokyny musí poskytnúť vaše pracovisko.')}</p>
</div>
<div class="dashboard-grid">
  <div class="stack">
    <div class="notice">
      <strong>{$t('Toto sú výlučne ukážkové pokyny.')}</strong>
      {$t('Neobsahujú medicínsky režim. Nepoužívajte ich ako návod na skutočnú prípravu.')}
    </div>
    {#each [...plan.instructions].reverse() as instruction}<section class="surface detail-card">
        <span class="badge planned"
          >{$t('Verzia {version}', { version: instruction.version })}{instruction.version ===
          plan.plan_version
            ? $t(' · zobrazený plán')
            : $t(' · archív')}</span
        >
        <h2>{$t('Pôvodné pokyny v{version}', { version: instruction.version })}</h2>
        <p class="small">
          {$t(instruction.source)}<br />{$t('Vydané: {time}', {
            time: dateTime(instruction.issued_at, $locale),
          })}
        </p>
        <p class="instruction-text">{$t(instruction.text)}</p>
        {#if plan.validity !== 'current' && instruction.version === plan.plan_version}<p
            class="notice"
          >
            {$t('Tieto pokyny čakajú na overenie pre nový termín.')}
          </p>{/if}
      </section>{/each}
    <section class="surface detail-card">
      <h2>{$t('Čo znamenajú vaše záznamy')}</h2>
      <p>
        {$t(
          '„Označené ako splnené“ je váš záznam o vykonaní. Nepotvrdzuje zdravotnú pripravenosť na vyšetrenie. Otvorené problémy a pokyny, ktoré treba overiť, zostávajú viditeľné samostatne.',
        )}
      </p>
      <a href="#problem" class="button secondary">{$t('Nerozumiem pokynu')}</a>
    </section>
  </div>
  <aside><ContactPanel full /></aside>
</div>
