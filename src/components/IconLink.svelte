<script lang="ts">
  export let href: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let disabled: boolean = false;
  export let label: string = '';

  let className: string | undefined = undefined;
  export {className as class};
</script>

<a
  href={disabled ? undefined : href}
  {rel}
  class:disabled
  class={className}
  aria-disabled={disabled || undefined}
  aria-label={label || undefined}
  title={label || undefined}
>
  <slot />
</a>

<style>
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    color: var(--gray);
    text-decoration: none;
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  a:not(.disabled):hover,
  a:not(.disabled):focus-visible {
    color: var(--hoverLinkColor);
    background-color: var(--hoverBackground);
  }

  a:not(.disabled):active {
    color: var(--activeLinkColor);
  }

  a.disabled {
    color: var(--grayDisabled);
    cursor: default;
  }
</style>
