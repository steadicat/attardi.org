<script lang="ts">
  import type {MarkdownHeading} from 'astro';
  import {onMount} from 'svelte';

  export let title: string;
  export let headings: MarkdownHeading[];

  let activeHeaderID: string | null = null;

  function onLinkClick(event: MouseEvent | KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.altKey) return;
    try {
      let target = event.target as HTMLAnchorElement;
      if (!target.href) target = target.parentNode as HTMLAnchorElement;
      if (!target.href) return;
      const id = target.href.split('#')[1];
      if (!id) return;
      const el = document.getElementById(id);
      el && el.scrollIntoView({behavior: 'smooth', block: 'start'});
      if (id === 'top') {
        history.replaceState(null, '', `${window.location.pathname}`);
      } else {
        history.replaceState(null, '', `${window.location.pathname}#${id}`);
      }
      event.preventDefault();
    } catch (err) {
      console.warn(err);
    }
  }

  let headerPositions: [string, number][] = [];
  let resizeTimeout = -1;
  let scrollTimeout = -1;

  function onScroll() {
    scrollTimeout && cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      const scroll = window.scrollY + window.innerHeight / 3;
      let lastID: string | null = null;
      for (const [id, position] of headerPositions) {
        if (position > scroll) {
          activeHeaderID = lastID;
          return;
        }
        lastID = id;
      }
      activeHeaderID = lastID;
    });
  }

  function onResize() {
    resizeTimeout && cancelAnimationFrame(resizeTimeout);
    resizeTimeout = requestAnimationFrame(() => {
      const headers = document.querySelectorAll<HTMLElement>('.markdown > h3, .markdown > h4');
      headerPositions = [];
      for (const header of headers) {
        headerPositions.push([header.id, header.offsetTop]);
      }
      onScroll();
    });
  }

  onMount(onResize);
</script>

<svelte:window on:scroll={onScroll} on:resize={onResize} />

<nav
  id="sidebar"
  class:is-scrolled={activeHeaderID !== null}
  on:click={onLinkClick}
  on:keypress={onLinkClick}
>
  <a href="/" class="home-link show">Stefano J. Attardi</a>
  <a href="#top" class="heading-link show">
    {title}
  </a>
  <ul>
    {#each headings as { slug, text, depth }}
      {#if depth < 5}
        <li class:is-nested={depth > 3}>
          <a href={`#${slug}`} class:is-active={slug === activeHeaderID}>{text}</a>
        </li>
      {/if}
    {/each}
  </ul>
  <!-- .replace(/[A-Z]{2,8}/g, '<span className="caps">$&</span>'), -->
</nav>

<style>
  #sidebar {
    position: sticky;
    top: 48px;
    max-height: calc(100vh - 96px);
    width: var(--sidebarWidth);
    overflow: auto;
    padding-right: var(--unit);
    font-size: 12px;
    line-height: var(--lineHeight);
    scrollbar-width: thin;
    scrollbar-color: #333 transparent;
  }

  @media (max-width: 1199px) {
    #sidebar {
      display: none;
    }
  }

  a {
    color: var(--gray);
    text-decoration: none;
    font: inherit;
    transition: color 0.15s ease;
  }

  a:hover,
  a.is-active {
    color: var(--accentColor);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    margin-top: 12px;
  }

  li.is-nested {
    padding-left: var(--unit);
  }

  .home-link,
  .heading-link {
    display: block;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .heading-link {
    margin: var(--unit) 0 32px;
    color: var(--textColor);
  }

  .is-scrolled > .show,
  .show:focus-visible {
    opacity: 1;
  }
</style>
