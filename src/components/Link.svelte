<script lang="ts">
  export let href: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let disabled = false;
</script>

<a {href} {rel} class={$$props.class} class:disabled><slot /></a>

<style>
  a {
    color: var(--linkColor);
    line-height: 14px;
    transition: 0.5s color;
    text-decoration: none;
  }

  a:hover {
    color: var(--hoverLinkColor);
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
