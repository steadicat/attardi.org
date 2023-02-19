'use client';

import React from 'react';

import type {ReactNode} from 'react';

let activeHeaderID: string | null = null;
let activeHeaderLink: Element | null = null;

// eslint-disable-next-line react-memo/require-memo
function setActiveHeaderId(id: string | null) {
  if (activeHeaderID === id) return;
  activeHeaderID = id;
  activeHeaderLink && (activeHeaderLink.className = '');
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.className = id ? 'is-scrolled' : '';
  }
  if (!id) return;
  const active = document.querySelector(`[href="#${id}"]`);
  if (!active) return;
  active.className = 'active';
  activeHeaderLink = active;
}

// eslint-disable-next-line react-memo/require-memo
function onLinkClick(event: React.MouseEvent<unknown>) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.altKey) return;
  try {
    let target = event.nativeEvent.target as HTMLAnchorElement;
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

const ClickHandler = React.memo(function ClickHandler({children}: {children: ReactNode}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const headerPositions = React.useRef<[string, number][]>([]);
  const resizeTimeout = React.useRef<number | null>(null);
  const scrollTimeout = React.useRef<number | null>(null);

  const onScroll = React.useCallback(() => {
    scrollTimeout.current && cancelAnimationFrame(scrollTimeout.current);
    scrollTimeout.current = requestAnimationFrame(() => {
      const scroll = window.scrollY + window.innerHeight / 3;
      let lastID: string | null = null;
      for (const [id, position] of headerPositions.current) {
        if (position > scroll) {
          setActiveHeaderId(lastID);
          return;
        }
        lastID = id;
      }
      setActiveHeaderId(lastID);
    });
  }, []);

  const onResize = React.useCallback(() => {
    resizeTimeout.current && cancelAnimationFrame(resizeTimeout.current);
    resizeTimeout.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const headers = ref.current.querySelectorAll<HTMLElement>('h3, h4');
      headerPositions.current = [];
      for (let i = 0; i < headers.length; i++) {
        headerPositions.current.push([headers[i].id, headers[i].offsetTop]);
      }
      onScroll();
    });
  }, [onScroll]);

  const addPrevNextLinks = React.useCallback((el: HTMLElement) => {
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
        links.appendChild(previousLink);
      }
      const next = headers[i + 1];
      if (next) {
        const nextLink = document.createElement('a');
        nextLink.href = `#${next.id}`;
        nextLink.innerText = '▽ Next';
        links.appendChild(nextLink);
      }
      headers[i].insertAdjacentElement('afterend', links);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onResize();
    // TODO
    // ref.current && addPrevNextLinks(ref.current);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [onResize, onScroll]);

  return (
    <div ref={ref} onClick={onLinkClick}>
      {children}
    </div>
  );
});

export default ClickHandler;
