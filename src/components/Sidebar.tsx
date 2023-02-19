'use client';

import {css} from '@linaria/core';
import * as React from 'react';

import {Link} from '@/components/text';
import {activeLinkColor, gray, hoverLinkColor, linkColor, textColor} from '@/design/colors';
import {maxColumn, unit} from '@/design/layout';
import {sansBoldCaps, sansBoldS, sansBoldXS, sansCaps, sansXS} from '@/design/text';

const sidebarWidth = unit * 14;

const commonStyle = {
  '& a': {
    ...sansBoldS,
    color: linkColor,
    textDecoration: 'none',
    transition: '0.5s color, border-color',
  },
  '& a:hover': {
    color: hoverLinkColor,
  },
  '& a:active': {
    color: activeLinkColor,
    transitionDuration: '0.1s',
  },
};

const tableOfContentsStyle = css`
  position: sticky;
  top: 0;
  max-height: 100vh;
  margin-left: calc((100vw - ${maxColumn}px - ${sidebarWidth}px) / 4);
  margin-right: calc((100vw - ${maxColumn}px - ${sidebarWidth}px) / -4);
  box-sizing: border-box;
  width: ${sidebarWidth}px;
  overflow: auto;
  flex-shrink: 0;
  padding: ${unit}px;

  @media (max-width: 959px) {
    display: none;
  }

  ${commonStyle};
  & a {
    ${sansBoldXS};
  }

  & p {
    margin: 0;
  }

  & ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding-left: ${unit}px;
  }

  & > div > ul {
    padding-left: 0;
  }

  & > div > ul > li {
    margin-bottom: ${unit / 2}px;
  }

  & > div a {
    ${sansXS};
    color: ${gray};
    text-decoration: none;
    transition: 0.5s color, border-color;

    &.active {
      ${sansBoldXS}
    }

    &.active::before {
      content: '▸';
      position: absolute;
      left: 0;
    }
  }

  & .caps {
    ${sansCaps}
  }

  & a.active .caps {
    ${sansBoldCaps};
  }

  &.is-scrolled .show {
    opacity: 1;
  }
`;

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

const Sidebar = React.memo(function Sidebar({
  title,
  tableOfContents,
}: {
  title: string;
  tableOfContents: string;
}) {
  return (
    <div id="sidebar" className={tableOfContentsStyle} onClick={onLinkClick}>
      <Link
        to="/"
        className={`${css`
          ${sansBoldXS}
          opacity: 0.01;
          transition: 0.6s opacity;
          transform: translateZ(0);
        `} show`}>
        Stefano J. Attardi
      </Link>
      <Link
        href="#top"
        className={`${css`
          ${sansBoldXS}
          color: ${textColor};
          opacity: 0.01;
          transition: 0.6s opacity;
          transform: translateZ(0);
          margin-bottom: ${unit}px;
          display: block;
        `} show`}>
        {title}
      </Link>
      <div
        dangerouslySetInnerHTML={{
          __html: tableOfContents, //.replace(/[A-Z]{2,8}/g, '<span className="caps">$&</span>'),
        }}
      />
    </div>
  );
});

export default Sidebar;
