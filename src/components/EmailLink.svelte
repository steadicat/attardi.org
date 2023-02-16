<script lang="ts">
  import Link from './Link.svelte';
  import {email} from './email';
</script>

<Link disabled={!$email} href={$email ? `mailto:${$email}` : undefined}>Email</Link>
