import {css} from '@linaria/core';
import fs from 'fs';
import path from 'path';
import * as React from 'react';

import {EmailButton} from '@/components/Email';
import {DateView, Heading, Link, Subtitle, Title} from '@/components/text';
import {
  activeLinkColor,
  darkerGrayBackground,
  gray,
  grayBackground,
  hoverLinkColor,
  linkColor,
  textColor,
} from '@/design/colors';
import {maxColumn, unit} from '@/design/layout';
import {
  monoS,
  monoXS,
  sansBoldCaps,
  sansBoldL,
  sansBoldM,
  sansBoldS,
  sansBoldXS,
  sansCaps,
  sansM,
  sansXS,
  serifCaps,
  serifM,
  serifS,
} from '@/design/text';

import ClickHandler from './ClickHandler';
import Sidebar from './Sidebar';

import type {Metadata} from 'next';

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

const markdownStyle = css`
  padding-top: ${unit * 2}px;
  ${serifS}
  ${commonStyle};

  & h3 {
    margin-top: ${unit * 2}px;
    margin-bottom: ${unit / 2}px;
    ${sansBoldL};
  }

  & h4 {
    margin-top: ${unit * 2}px;
    margin-bottom: ${unit / 2}px;
    ${sansBoldM};
  }

  & h3 + h4 {
    margin-top: ${unit / 2}px;
  }

  & h5 {
    margin-top: 0;
    margin-bottom: ${unit / 4}px;
    ${sansBoldXS};
  }

  & strong {
    ${sansBoldS}
  }

  & .gatsby-highlight,
  code {
    ${monoXS};
  }

  & p > code,
  & li > code {
    ${monoS};
    background: ${darkerGrayBackground};
    border-radius: 3px;
    font-variant-ligatures: none;
    padding-left: 2px;
    padding-right: 2px;
  }

  & p > .caps {
    ${serifCaps}
  }

  & h3 > .caps,
  h4 > .caps,
  h5 > .caps,
  a > .caps {
    ${sansBoldCaps}
  }

  & blockquote > p > .caps {
    ${sansCaps}
  }

  & p {
    margin: 0;
  }

  & p + p {
    margin-top: ${unit}px;
  }

  & blockquote {
    background: ${grayBackground};
    border-left: 3px solid ${gray};
    padding: ${unit * 0.75}px ${unit}px ${unit * 0.75}px ${unit}px;
    color: ${gray};
    margin: ${unit}px 0;
    ${sansXS};

    & h4 {
      margin: 0;
      color: ${gray};
    }

    & a {
      ${sansXS};

      & .caps {
        font-weight: normal;
      }
    }

    & p > code {
      ${monoXS};
    }

    & .gatsby-highlight {
      color: ${gray};
      background: ${darkerGrayBackground};
      margin-bottom: 0;
      line-height: 14px;

      ${monoXS};

      & .token.symbol {
        color: #f08d49;
      }
    }
  }

  & .gatsby-resp-image-wrapper {
    margin-top: ${unit * 2}px;
    margin-bottom: ${unit / 2}px;
  }

  & figcaption {
    ${sansBoldXS};
    font-style: normal;
    display: block;
    text-align: center;
    margin-bottom: ${unit * 2}px;
    text-indent: 0;

    & a {
      ${sansBoldXS};
    }
  }

  & a[href] {
    /* TODO */
    background: no-repeat url('../../images/icons/web.svg') 0 3px;
    padding-left: 18px;
  }

  & blockquote a[href],
  & figcaption a[href] {
    background-size: 12px 12px;
    padding-left: 14px;
    background-position: 0 1px;
  }

  & a.anchor,
  & blockquote a.anchor,
  & figcaption a.anchor,
  & .prev-next a {
    padding: 0;
    background: none;
  }

  & a[title='Wikipedia'] {
    background-image: url('../../images/icons/wikipedia.svg');
  }

  & a[title='Email'] {
    background-image: url('../../images/icons/mail.svg');
  }

  & a[title='Twitter'] {
    background-image: url('../../images/icons/twitter.svg');
  }

  & a[title='GitHub'] {
    background-image: url('../../images/icons/github.svg');
  }

  & a[title='App Store'] {
    background-image: url('../../images/icons/appstore.svg');
  }

  & .prev-next {
    display: flex;
    margin-top: ${-unit / 4}px;
    margin-bottom: ${unit / 4}px;

    & a {
      flex: 1;
      text-align: center;
      ${sansXS};
      line-height: ${unit * 2}px;
    }
  }

  @media (min-width: 960px) {
    & .prev-next {
      display: none;
    }
  }

  & a.anchor,
  & blockquote a.anchor {
    opacity: 0.3;
    padding: 4px;
    top: 50%;
    transform: translateY(-50%);
    padding-right: ${20 - 12}px;
    margin-left: -20px;

    & > svg {
      display: block;
      width: 12px;
      height: 12px;
    }
  }

  & .thanks {
    font-style: italic;
    color: ${gray};
  }

  & blockquote.quote {
    font-style: italic;
    ${serifM};
    color: ${textColor};
    background: transparent;
    padding-top: 0;
    padding-bottom: 0;
    border-color: ${linkColor};
  }

  & ol,
  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: ${unit}px;
    margin-bottom: ${unit}px;

    & > li {
      counter-increment: counter;
      margin-left: ${unit * 2}px;
      position: relative;
    }

    & > li::before {
      content: counter(counter) '.';
      width: ${unit * 2}px;
      position: absolute;
      left: ${-unit * 2.5}px;
      top: 6px;
      text-align: right;
      ${sansXS};
    }
  }

  & ul > li::before {
    content: '‣';
    top: -1px;
    ${sansM};
  }
`;

export async function generateMetadata({
  params: {slug},
}: {
  params: {slug: string};
}): Promise<Metadata> {
  const {date, description, featuredImage, title} = (await import(`../articles/${slug}.mdx`)) as {
    default: () => JSX.Element;
    date: string;
    description: string;
    featuredImage?: string;
    title: string;
  };

  return {
    title: `${title} - Stefano J. Attardi`,
    description,
    openGraph: {
      type: 'article',
      description,
      images: featuredImage ? [{url: `https://attardi.org${featuredImage}`}] : [],
    },
    twitter: {
      site: '@steadicat',
      card: 'summary_large_image',
      title: `${title} - Stefano J. Attardi`,
      description,
      images: featuredImage ? [{url: `https://attardi.org${featuredImage}`}] : [],
    },
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/app/articles');
  const files = fs.readdirSync(dir, {withFileTypes: true});

  return files.map((file) => ({
    slug: file.name.replace(/.mdx?$/, ''),
  }));
}

const ArticlePage = React.memo(function ArticlePage({params: {slug}}: {params: {slug: string}}) {
  const tableOfContents = '';
  const {
    default: Article,
    date: dateString,
    title,
  } = React.use<{
    default: () => JSX.Element;
    date: string;
    description: string;
    featuredImage?: string;
    title: string;
  }>(import(`../articles/${slug}.mdx`));

  const date = new Date(dateString);

  return (
    <div
      className={css`
        @media (min-width: 960px) {
          display: flex;
          align-items: flex-start;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding-bottom: ${4 * unit}px;
        }
      `}>
      <Sidebar title={title} tableOfContents={tableOfContents} />
      <div
        className={css`
          @media (min-width: 960px) {
            max-width: ${maxColumn}px;
            margin-left: auto;
            margin-right: auto;
          }
        `}>
        <Heading
          className={css`
            margin-top: ${unit}px;
          `}>
          {React.useMemo(
            () => (
              <Link to="/">Stefano J. Attardi</Link>
            ),
            []
          )}
        </Heading>
        <Title
          id="top"
          className={css`
            margin-top: ${unit}px;
          `}>
          {title}
        </Title>
        <DateView date={date} />
        <ClickHandler>
          {React.useMemo(
            () => (
              <div className={markdownStyle}>
                <Article />
              </div>
            ),
            [Article]
          )}
        </ClickHandler>
        <div
          className={css`
            margin-top: ${unit * 4}px;
          `}>
          <Heading>
            {React.useMemo(
              () => (
                <Link to="/">Stefano J. Attardi</Link>
              ),
              []
            )}
          </Heading>
          <Subtitle>Engineering Manager at Coinbase.</Subtitle>
          <EmailButton />
        </div>
      </div>
    </div>
  );
});

export default ArticlePage;
