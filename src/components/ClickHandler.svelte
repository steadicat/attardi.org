<script lang="ts">
  import {onMount} from 'svelte';

  let element;

  const addPrevNextLinks = (el: HTMLElement) => {
    const headers = el.querySelectorAll<HTMLElement>('h3, h4');
    for (let i = 0; i < headers.length; i++) {
      if (headers[i + 1] === headers[i].nextElementSibling) continue;
      const links = document.createElement('div');
      links.className = 'prev-next';
      let previous = headers[i - 1];
      if (previous === headers[i].previousElementSibling) previous = headers[i - 2];
      if (previous) {
        const previousLink = document.createElement('a');
        previousLink.href = `#${previous.id}`;
        previousLink.innerText = '△ Previous';
        previousLink.addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById(previous.id).scrollIntoView({behavior: 'smooth', block: 'start'});
          history.replaceState(null, '', `${window.location.pathname}#${previous.id}`);
        });
        links.appendChild(previousLink);
      }
      const next = headers[i + 1];
      if (next) {
        const nextLink = document.createElement('a');
        nextLink.href = `#${next.id}`;
        nextLink.innerText = '▽ Next';
        nextLink.addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById(next.id).scrollIntoView({behavior: 'smooth', block: 'start'});
          history.replaceState(null, '', `${window.location.pathname}#${next.id}`);
        });
        links.appendChild(nextLink);
      }
      headers[i].insertAdjacentElement('afterend', links);
    }
  };

  onMount(() => {
    element && addPrevNextLinks(element);
  });
</script>

<div bind:this={element}><slot /></div>
