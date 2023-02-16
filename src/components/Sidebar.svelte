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

<div
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
</div>

<style>
  #sidebar {
    position: sticky;
    top: 0;
    max-height: 100vh;
    margin-left: calc((100vw - var(--maxColumn) - var(--sidebarWidth)) / 4);
    margin-right: calc((100vw - var(--maxColumn) - var(--sidebarWidth)) / -4);
    box-sizing: border-box;
    width: var(--sidebarWidth);
    overflow: auto;
    flex-shrink: 0;
    padding: var(--unit);
  }

  @media (max-width: 959px) {
    #sidebar {
      display: none;
    }
  }

  a {
    font-family: var(--sans);
    font-weight: 400;
    font-size: 12px;
    line-height: var(--unit);
    text-decoration: none;
    transition: 0.5s color;
    color: var(--linkColor);
  }

  a:hover {
    color: var(--hoverLinkColor);
  }

  a:active {
    color: var(--activeLinkColor);
    transition-duration: 0.1s;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  li {
    margin-top: 9px;
  }
  li.is-nested {
    margin-top: 0;
    padding-left: var(--unit);
  }

  li > a {
    font-weight: 300;
    color: var(--gray);
    transition: 0.5s color;
    -webkit-transition: 0.5s color;
    -moz-transition: 0.5s color;
  }

  a.is-active {
    font-family: var(--sans);
    font-weight: 400;
    font-size: 12px;
    line-height: var(--unit);
  }

  a.is-active::before {
    content: '▸';
    position: absolute;
    left: 0;
  }

  .caps {
    font-family: var(--sans);
    font-weight: 400;
    font-size: 78%;
    letter-spacing: 1px;
    padding-left: 1px;
    padding-right: 1px;
    line-height: 1;
  }

  a.is-active .caps {
    font-family: var(--sans);
    font-weight: 400;
    font-size: 78%;
    letter-spacing: 1px;
    padding-left: 1px;
    padding-right: 1px;
    line-height: 1;
  }

  .home-link {
    opacity: 0.01;
    transition: 0.6s opacity;
    transform: translateZ(0);
  }

  .heading-link {
    color: var(--textColor);
    opacity: 0.01;
    transition: 0.6s opacity;
    transform: translateZ(0);
    margin-bottom: var(--unit);
    display: block;
  }

  .is-scrolled > .show {
    opacity: 1;
  }
</style>
