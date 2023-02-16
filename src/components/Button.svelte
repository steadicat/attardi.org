<script lang="ts">
  export let href: string | undefined;
  export let disabled = false;
</script>

<a {href} class="sansBold m" class:disabled>
  <slot />
</a>

<style>
  a {
    color: var(--white);
    background: var(--linkColor);
    transition: 0.5s background;
    text-decoration: none;
    border-radius: 3px;
    padding: calc(var(--unit) / 2) var(--unit) calc(var(--unit) / 2) calc(var(--unit));
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: var(--unit);
  }

  a:hover {
    background: var(--hoverLinkColor);
  }

  a:active {
    background: var(--activeLinkColor);
    transition-duration: 0.1s;
  }

  a.disabled {
    background: var(--grayDisabled);
  }

  a.disabled:hover {
    background: var(--grayDisabled);
  }

  a.disabled:active {
    background: var(--grayDisabled);
  }
</style>
