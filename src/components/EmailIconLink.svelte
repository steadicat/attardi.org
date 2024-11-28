<script lang="ts">
  import IconLink from './IconLink.svelte';
  import {email} from './email';
</script>

<IconLink
  disabled={!$email}
  href={$email ? `mailto:${$email}` : undefined}
  class={$$props.class}
  label="Email"
>
  <slot />
</IconLink>
