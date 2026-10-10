<script lang="ts">
  import { statusLabels, type Status } from '../lib/api'
  let { status }: { status: Status } = $props()
</script>

<span class="badge {status}"
  ><span aria-hidden="true" class="status-dot"></span>{statusLabels[status]}</span
>
