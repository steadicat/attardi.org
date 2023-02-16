import {css} from '@linaria/core';
import NextLink from 'next/link';
import * as React from 'react';

import {
  activeLinkColor,
  gray,
  grayDisabled,
  hoverLinkColor,
  linkColor,
  white,
} from '@/design/colors';
import {unit} from '@/design/layout';
import {sansBoldL, sansBoldM, sansBoldXL, sansM, sansXS} from '@/design/text';

export const Title = React.memo(function Title({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h1
      id={id}
      className={`${css`
        ${sansBoldXL};
      `} ${className}`}>
      {children}
    </h1>
  );
});

export const Subtitle = React.memo(function Subtitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`${css`
        ${sansM};
      `} ${className}`}>
      {children}
    </h2>
  );
});

export const Heading = React.memo(function Heading({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`${css`
        ${sansBoldL};
      `} ${className}`}>
      {children}
    </h2>
  );
});

export const Subheading = React.memo(function Subheading({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`${css`
        ${sansBoldM}
      `} ${className}`}>
      {children}
    </h3>
  );
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Setember',
  'October',
  'November',
  'December',
];

function format(date: Date) {
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()},  ${date.getUTCFullYear()}`;
}

export const DateView = React.memo(function DateView({date}: {date: Date}) {
  return (
    <h3
      className={css`
        ${sansXS};
        font-size: 16px;
        margin-bottom: 0;
        color: ${gray};
        margin-top: ${unit / 2};
      `}>
      {format(date)}
    </h3>
  );
});

export const Link = React.memo(function Link({
  children,
  to,
  href,
  disabled = false,
  className = '',
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
  rel?: string;
  disabled?: boolean;
  className?: string;
}) {
  const Component = to ? NextLink : 'a';

  return (
    <Component
      data-disabled={disabled || undefined}
      className={`${css`
        color: ${linkColor};

        &:hover {
          color: ${hoverLinkColor};
        }

        &:active {
          color: ${activeLinkColor};
          transition-duration: 0.1s;
        }

        &[data-disabled] {
          color: ${grayDisabled};

          &:hover {
            color: ${grayDisabled};
          }

          &:active {
            color: ${grayDisabled};
          }
        }

        line-height: 14px;
        transition: 0.5s color;
        text-decoration: none;
      `} ${className}`}
      href={to ?? href ?? ''}>
      {children}
    </Component>
  );
});

export const Button = React.memo(function Button({
  children,
  to,
  href,
  disabled = false,
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
  disabled?: boolean;
}) {
  const Component = to ? NextLink : 'a';
  return (
    <Component
      href={to ?? href ?? ''}
      data-disabled={disabled}
      className={css`
        color: ${white};
        background: ${linkColor};

        &:hover {
          background: ${hoverLinkColor};
        }

        &:active {
          background: ${activeLinkColor};
          transition-duration: 0.1s;
        }

        &[data-disabled] {
          background: ${grayDisabled};

          &:hover {
            background: ${grayDisabled};
          }

          &:active {
            background: ${grayDisabled};
          }
        }

        transition: 0.5s background;
        text-decoration: none;
        border-radius: 3px;
        padding: ${unit / 2}px ${unit}px ${unit / 2}px ${unit}px;
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        margin-top: ${unit}px;
        ${sansBoldM}
      `}>
      {children}
    </Component>
  );
});
