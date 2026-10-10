<script lang="ts">
  import Icon from './Icon.svelte'
  let { full = false }: { full?: boolean } = $props()
</script>

<section class="contact-card" aria-labelledby={full ? 'contact-full' : 'contact-title'}>
  <div class="icon-tile"><Icon name="help" /></div>
  <h2 id={full ? 'contact-full' : 'contact-title'}>Nie ste si istí?</h2>
  <p>S otázkami o príprave vám pomôže vaše pracovisko.</p>
  {#if full}
    <h3>Modelové endoskopické pracovisko</h3>
    <p>Ukážková adresa: Ukážková 12, Košice, prízemie.</p>
    <dl class="contact-details">
      <div>
        <dt>Telefón</dt>
        <dd>V ukážke nie je dostupný</dd>
      </div>
      <div>
        <dt>Dostupnosť</dt>
        <dd>Po – Pi, 8:00 – 14:00 <span class="muted">(fiktívne hodiny)</span></dd>
      </div>
    </dl>
    <p class="notice">
      Kontakt použite z vlastnej pozvánky alebo pôvodných pokynov. Táto ukážka nie je spojená so
      skutočným pracoviskom a neobsahuje overený postup mimo jeho dostupnosti.
    </p>
  {:else}
    <a href="#pokyny" class="text-link">Kontakt a pokyny <Icon name="arrow" size={18} /></a>
    <small>Modelové pracovisko · fiktívna ukážka</small>
  {/if}
</section>
