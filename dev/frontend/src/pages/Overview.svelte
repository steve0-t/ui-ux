<script lang="ts">
  import type { Plan } from '../lib/api'
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
    <p class="eyebrow"><span></span> Krok za krokom k vyšetreniu</p>
    <h1 tabindex="-1">Vaša príprava,{' '}<br /><span>prehľadne.</span></h1>
    <p>Všetko potrebné na jednom mieste.<br />Začnite tým, čo je teraz dôležité.</p>
    <a href="#plan" class="text-link">Pozrieť môj plán prípravy <Icon name="arrow" size={18} /></a>
  </div>
  <PreparationIllustration />
</div>
<AppointmentSummary {plan} />
{#if plan.change && !plan.change.acknowledged}<a href="#termin" class="notice notice-link"
    ><strong>V ukážke sa zmenil termín vyšetrenia.</strong> Pozrite si pôvodný a nový termín aj
    dotknuté kroky. <Icon name="arrow" size={18} /></a
  >{/if}
<div class="dashboard-grid">
  <div>
    <section class="next-card" aria-labelledby="next-title">
      <div class="next-label"><span class="pulse-dot"></span>Váš ďalší krok</div>
      {#if plan.validity !== 'current'}
        <h2 id="next-title">Najprv overte aktuálne pokyny.</h2>
        <p>
          Plán čaká na potvrdenie pracoviskom. Vaše doterajšie záznamy sú zachované; dotknuté kroky
          treba overiť.
        </p>
        <a class="button light" href="#termin"
          >Pozrieť zmenu termínu <Icon name="arrow" size={19} /></a
        >
      {:else if plan.problems.length > 0}
        <h2 id="next-title">Váš problém zostáva otvorený.</h2>
        <p>Opis je uložený iba v ukážke. Pre ďalší postup použite kontakt zo svojej pozvánky.</p>
        <a class="button light" href="#problem"
          >Pozrieť problém a kontakt <Icon name="arrow" size={19} /></a
        >
      {:else if next}
        <h2 id="next-title">{next.title}</h2>
        <p>
          {next.status === 'unconfirmed'
            ? 'Nemáme potvrdenie tohto kroku. Doplňte, čo ste skutočne vykonali, alebo opíšte problém.'
            : next.status === 'planned'
              ? 'Tento krok je naplánovaný na neskôr. Zatiaľ si môžete prečítať jeho pokyny.'
              : 'Prečítajte si pokyn. Po vykonaní kroku si môžete zaznamenať jeho splnenie.'}
        </p>
        <a class="button light" href={`#krok/${next.id}`}
          >Otvoriť krok <Icon name="arrow" size={19} /></a
        >
      {:else}<h2 id="next-title">Všetky kroky označené ako splnené</h2>
        <p>
          Ide o vaše záznamy, nie o schválenie prípravy zdravotníkom. Pred návštevou si skontrolujte
          termín a pokyny.
        </p>
        <a class="button light" href="#termin"
          >Skontrolovať návštevu <Icon name="arrow" size={19} /></a
        >{/if}
    </section>
    <section class="overview-steps" aria-labelledby="overview-steps">
      <div class="section-title">
        <h2 id="overview-steps"><Icon name="list" size={21} /> Váš plán prípravy</h2>
        <a href="#plan" class="text-link">Celý plán <Icon name="arrow" size={17} /></a>
      </div>
      {#each plan.steps.filter((s) => s.applicable).slice(0, 3) as step, index}<StepCard
          {step}
          {index}
        />{/each}
    </section>
    <a class="problem-shortcut" href="#problem"
      ><Icon name="help" /><span
        ><strong>Nedarí sa vám dodržať pokyn?</strong><span
          >Opíšte problém a nájdite kontakt na pracovisko.</span
        ></span
      ><Icon name="arrow" size={19} /></a
    >
  </div>
  <aside class="side-stack">
    <section class="progress-card">
      <div class="section-title">
        <h2>Váš pokrok</h2>
        <Icon name="list" />
      </div>
      <p class="progress-number">{plan.completed_count}<span> / {plan.applicable_count}</span></p>
      <p>krokov označených ako splnené</p>
      <progress
        max={plan.applicable_count}
        value={plan.completed_count}
        aria-label="Kroky označené ako splnené"
      ></progress>
      <p class="small">
        {allDone ? 'Všetky kroky označené ako splnené.' : 'Záznamy môžete kedykoľvek opraviť.'} Nejde
        o schválenie prípravy zdravotníkom.
      </p>
      {#if plan.problems.length}<a href="#problem" class="issue-link"
          >Otvorené problémy: {plan.problems.length}</a
        >{/if}
      {#if plan.validity !== 'current'}<p class="issue-link">Platnosť plánu treba overiť.</p>{/if}
    </section>
    <ContactPanel />
    <div class="source-note">
      <Icon name="shield" size={19} />
      <p>
        Pokyny v{plan.plan_version} · {plan.validity === 'current'
          ? 'aktuálne v ukážke'
          : 'čakajú na overenie'}<br /><a href="#pokyny">Pôvod a predchádzajúce verzie</a>
      </p>
    </div>
  </aside>
</div>
