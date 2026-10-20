<script lang="ts">
  import { statusLabels, type Status } from '../lib/api'
  import { t } from '../lib/i18n'
  let { status }: { status: Status } = $props()
</script>

<span class="badge {status}"
  ><span aria-hidden="true" class="status-dot"></span>{$t(statusLabels[status])}</span
>
