<script lang="ts">
  import { onMount } from 'svelte'

  let checking = $state(false)
  let message = $state('Spojenie zatiaľ nebolo overené.')

  async function checkConnection() {
    checking = true
    message = 'Overujem spojenie…'
    try {
      const response = await fetch('/api/health', { signal: AbortSignal.timeout(5000) })
      if (!response.ok) throw new Error('API request failed')
      const result = await response.json()
      if (result.status !== 'ok' || result.service !== 'patient-preparation-api') {
        throw new Error('Unexpected API response')
      }
      message = 'Backend je dostupný.'
    } catch {
      message = 'Backend nie je dostupný. Spustite Axum server a skúste to znova.'
    } finally {
      checking = false
    }
  }

  onMount(() => { void checkConnection() })
</script>

<main>
  <p>Vývojové prostredie</p>
  <h1>Príprava pacienta na vyšetrenie</h1>
  <p>Základ projektu Svelte + Axum. Pacientské scenáre ešte nie sú implementované.</p>
  <section aria-labelledby="connection-title">
    <h2 id="connection-title">Spojenie s API</h2>
    <p role="status">{message}</p>
    <button onclick={checkConnection} disabled={checking}>
      {checking ? 'Overujem…' : 'Overiť spojenie'}
    </button>
  </section>
</main>
