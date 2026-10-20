<script lang="ts">
  import type { Plan } from '../lib/api'
  import { t } from '../lib/i18n'
  import AppointmentSummary from '../components/AppointmentSummary.svelte'
  import ContactPanel from '../components/ContactPanel.svelte'
  import StepCard from '../components/StepCard.svelte'
  import Icon from '../components/Icon.svelte'
  import PreparationIllustration from '../components/PreparationIllustration.svelte'
  let { plan }: { plan: Plan } = $props()
  const next = $derived(plan.steps.find((s) => s.id === plan.next_step_id))
  const allDone = $derived(plan.completed_count === plan.applicable_count)
</script>

<div class="page-heading overview-heading">
  <div class="hero-copy">
    <p class="eyebrow"><span></span> {$t('Krok za krokom k vyšetreniu')}</p>
    <h1 tabindex="-1">{$t('Vaša príprava,')}{' '}<br /><span>{$t('prehľadne.')}</span></h1>
    <p>{$t('Všetko potrebné na jednom mieste.')}<br />{$t('Začnite tým, čo je teraz dôležité.')}</p>
    <a href="#plan" class="text-link"
      >{$t('Pozrieť môj plán prípravy')} <Icon name="arrow" size={18} /></a
    >
  </div>
  <PreparationIllustration />
</div>
<AppointmentSummary {plan} />
{#if plan.change && !plan.change.acknowledged}<a href="#termin" class="notice notice-link"
    ><strong>{$t('V ukážke sa zmenil termín vyšetrenia.')}</strong>
    {$t('Pozrite si pôvodný a nový termín aj dotknuté kroky.')}
    <Icon name="arrow" size={18} /></a
  >{/if}
<div class="dashboard-grid">
  <div>
    <section class="next-card" aria-labelledby="next-title">
      <div class="next-label"><span class="pulse-dot"></span>{$t('Váš ďalší krok')}</div>
      {#if plan.validity !== 'current'}
        <h2 id="next-title">{$t('Najprv overte aktuálne pokyny.')}</h2>
        <p>
          {$t(
            'Plán čaká na potvrdenie pracoviskom. Vaše doterajšie záznamy sú zachované; dotknuté kroky treba overiť.',
          )}
        </p>
        <a class="button light" href="#termin"
          >{$t('Pozrieť zmenu termínu')} <Icon name="arrow" size={19} /></a
        >
      {:else if plan.problems.length > 0}
        <h2 id="next-title">{$t('Váš problém zostáva otvorený.')}</h2>
        <p>
          {$t('Opis je uložený iba v ukážke. Pre ďalší postup použite kontakt zo svojej pozvánky.')}
        </p>
        <a class="button light" href="#problem"
          >{$t('Pozrieť problém a kontakt')} <Icon name="arrow" size={19} /></a
        >
      {:else if next}
        <h2 id="next-title">{$t(next.title)}</h2>
        <p>
          {$t(
            next.status === 'unconfirmed'
              ? 'Nemáme potvrdenie tohto kroku. Doplňte, čo ste skutočne vykonali, alebo opíšte problém.'
              : next.status === 'planned'
                ? 'Tento krok je naplánovaný na neskôr. Zatiaľ si môžete prečítať jeho pokyny.'
                : 'Prečítajte si pokyn. Po vykonaní kroku si môžete zaznamenať jeho splnenie.',
          )}
        </p>
        <a class="button light" href={`#krok/${next.id}`}
          >{$t('Otvoriť krok')} <Icon name="arrow" size={19} /></a
        >
      {:else}<h2 id="next-title">{$t('Všetky kroky označené ako splnené')}</h2>
        <p>
          {$t(
            'Ide o vaše záznamy, nie o schválenie prípravy zdravotníkom. Pred návštevou si skontrolujte termín a pokyny.',
          )}
        </p>
        <a class="button light" href="#termin"
          >{$t('Skontrolovať návštevu')} <Icon name="arrow" size={19} /></a
        >{/if}
    </section>
    <section class="overview-steps" aria-labelledby="overview-steps">
      <div class="section-title">
        <h2 id="overview-steps"><Icon name="list" size={21} /> {$t('Váš plán prípravy')}</h2>
        <a href="#plan" class="text-link">{$t('Celý plán')} <Icon name="arrow" size={17} /></a>
      </div>
      {#each plan.steps.filter((s) => s.applicable).slice(0, 3) as step, index}<StepCard
          {step}
          {index}
        />{/each}
    </section>
    <a class="problem-shortcut" href="#problem"
      ><Icon name="help" /><span
        ><strong>{$t('Nedarí sa vám dodržať pokyn?')}</strong><span
          >{$t('Opíšte problém a nájdite kontakt na pracovisko.')}</span
        ></span
      ><Icon name="arrow" size={19} /></a
    >
  </div>
  <aside class="side-stack">
    <section class="progress-card">
      <div class="section-title">
        <h2>{$t('Váš pokrok')}</h2>
        <Icon name="list" />
      </div>
      <p class="progress-number">{plan.completed_count}<span> / {plan.applicable_count}</span></p>
      <p>{$t('krokov označených ako splnené')}</p>
      <progress
        max={plan.applicable_count}
        value={plan.completed_count}
        aria-label={$t('Kroky označené ako splnené')}
      ></progress>
      <p class="small">
        {$t(allDone ? 'Všetky kroky označené ako splnené.' : 'Záznamy môžete kedykoľvek opraviť.')}
        {$t('Nejde o schválenie prípravy zdravotníkom.')}
      </p>
      {#if plan.problems.length}<a href="#problem" class="issue-link"
          >{$t('Otvorené problémy: {count}', { count: plan.problems.length })}</a
        >{/if}
      {#if plan.validity !== 'current'}<p class="issue-link">
          {$t('Platnosť plánu treba overiť.')}
        </p>{/if}
    </section>
    <ContactPanel />
    <div class="source-note">
      <Icon name="shield" size={19} />
      <p>
        {$t('Pokyny v{version}', { version: plan.plan_version })} · {$t(
          plan.validity === 'current' ? 'aktuálne v ukážke' : 'čakajú na overenie',
        )}<br /><a href="#pokyny">{$t('Pôvod a predchádzajúce verzie')}</a>
      </p>
    </div>
  </aside>
</div>
