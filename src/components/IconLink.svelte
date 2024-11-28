<script lang="ts">
  export let href: string;
  export let rel: string | undefined = undefined;
  export let disabled: boolean = false;
  export let label: string = '';

  let className: string | undefined = undefined;
  export {className as class};
</script>

<a
  {href}
  {rel}
  class:disabled
  class={className}
  aria-disabled={disabled}
  on:click|preventDefault={disabled ? () => {} : undefined}
  ><slot />
  {#if label && !disabled}
    <span class="label" aria-hidden="true">
      {#each label.split('') as char, i}
        <span class="char" style={`--index: ${i}`}>
          {char}
        </span>
      {/each}
    </span>
  {/if}
</a>

<style>
  a {
    color: var(--linkColor);
    line-height: 14px;
    transition: 0.5s color;
    text-decoration: none;
    position: relative;
    display: inline-flex;
    padding: var(--unit);
    flex-direction: column;
    align-items: center;
  }

  a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--hoverBackground);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }

  a:not(.disabled):hover::before {
    opacity: 1;
  }

  a:not(.disabled):active {
    color: var(--activeLinkColor);
    transition-duration: 0.1s;
  }

  a.disabled {
    opacity: 0.2;
  }

  .label {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 4px;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    display: flex;
  }

  a:hover .label {
    opacity: 1;
    visibility: visible;
  }

  .char {
    opacity: 0;
    transform: rotate(-45deg) translateY(10px);
    transition: all 0.3s ease;
    display: inline-block;
    transition-delay: calc(var(--index) * 0.05s);
  }

  .char:nth-child(even) {
    transform: rotate(45deg) translateY(-10px);
  }

  a:hover .char {
    opacity: 1;
    transform: rotate(0) translateY(0);
  }

  a:hover .char:nth-child(even) {
    transform: rotate(0) translateY(0);
  }
</style>
