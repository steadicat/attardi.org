<script lang="ts">
  export let href: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let disabled = false;
</script>

<a {href} {rel} class={$$props.class} class:disabled><slot /></a>

<style>
  a {
    color: var(--linkColor);
    line-height: inherit;
    transition: color 0.15s ease;
    text-decoration: none;
  }

  a:hover {
    color: var(--hoverLinkColor);
    text-decoration: underline;
  }

  a:active {
    color: var(--activeLinkColor);
    transition-duration: 0.1s;
  }

  a.disabled {
    color: var(--grayDisabled);
  }

  a.disabled:hover {
    color: var(--grayDisabled);
  }

  a.disabled:active {
    color: var(--grayDisabled);
  }
</style>
