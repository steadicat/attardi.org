<script lang="ts">
  import Button from './Button.svelte';
  import {email} from './email';
</script>

<Button disabled={!$email} href={$email ? `mailto:${$email}` : undefined}>Get in Touch</Button>
