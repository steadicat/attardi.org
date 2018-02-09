import * as React from 'react';
import {View} from 'glamor/jsxstyle';
import {css} from 'glamor';
import {
  sans,
  sansBold,
  sansBoldXL,
  sansBoldL,
  sansBoldM,
  sansBoldS,
  sansBoldXS,
  sansXS,
  monoXS,
  serifCaps,
  sansBoldCaps,
  sansCaps,
  serifS,
  sansRegular,
  mono,
  monoS,
} from '../design/text';
import {
  linkColor,
  hoverLinkColor,
  activeLinkColor,
  grayBackground,
  gray,
  darkerGrayBackground,
} from '../design/colors';
import {unit, maxColumn} from '../design/layout';
import {Subtitle, Title, DateView, Link, Button, Heading} from '../components/text';

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

const markdownStyle = css({
  paddingTop: unit * 2,
  ...serifS,
  ...commonStyle,
  '& h3': {...sansBoldL, marginTop: unit * 2, marginBottom: unit / 2},
  '& h4': {...sansBoldM, marginTop: unit * 2, marginBottom: unit / 2},
  '& h3 + h4': {marginTop: unit / 2},
  '& h5': {...sansBoldXS, marginTop: 0, marginBottom: unit / 4},
  '& strong': sansBold,
  '& pre[class*="language"], code': {...monoXS, fontVariantLigatures: 'none'},
  '& p>code': {
    ...monoS,
    background: darkerGrayBackground,
    borderRadius: 3,
    fontVariantLigatures: 'none',
    paddingLeft: 2,
    paddingRight: 2,
  },
  '& p>.caps': serifCaps,
  '& h3>.caps, h4>.caps, h5>.caps, a>.caps': sansBoldCaps,
  '& blockquote>p>.caps': sansCaps,
  '& p': {margin: 0},
  '& p + p': {
    textIndent: unit * 1.5,
  },
  '& blockquote': {
    ...sansXS,
    marginTop: unit / 2,
    background: grayBackground,
    borderLeft: `3px solid ${gray}`,
    padding: [unit * 0.75, unit, unit * 0.75, unit].map(x => `${x}px`).join(' '),
    color: gray,
    margin: [unit, 0].map(x => `${x}px`).join(' '),
    '& h4': {
      margin: 0,
      color: gray,
    },
    '& a': {
      ...sansXS,
      '& .caps': {
        fontWeight: 'normal',
      },
    },
    '& p + p': {
      textIndent: unit,
    },
    '& p>code': monoXS,
    '& pre': {
      background: darkerGrayBackground,
      marginBottom: 0,
      color: gray,
      ...monoXS,
      lineHeight: '14px',
      '& .token.symbol': {
        color: '#f08d49',
      },
    },
  },
  '& .gatsby-resp-image-wrapper': {
    marginTop: unit * 2,
    marginBottom: unit / 2,
  },
  '& figcaption': {
    fontStyle: 'normal',
    ...sansBoldXS,
    display: 'block',
    textAlign: 'center',
    marginBottom: unit * 2,
    textIndent: 0,
    '& a': {
      ...sansBoldXS,
    },
  },
});

const tableOfContentsStyle = css({
  ...commonStyle,
  '& ul': {margin: 0, padding: 0, listStyleType: 'none', paddingLeft: unit},
  '& a.active::before': {content: '▸', position: 'absolute', left: 0},
  '&>ul': {paddingLeft: 0},
  '&>ul>li': {marginBottom: unit / 2},
  '& p': {margin: 0},
  '& a': {
    ...sansXS,
    color: gray,
    textDecoration: 'none',
    transition: '0.5s color, border-color',
  },
  '& a.active': {
    ...sansBoldXS,
  },
  '& .caps': sansCaps,
});

function onTOCClick(event: React.MouseEvent<HTMLAnchorElement>) {
  try {
    const id = event.target.href.split('#')[1];
    const el = document.getElementById(id);
    el && el.scrollIntoView({behavior: 'smooth', block: 'start'});
    event.preventDefault();
  } catch (err) {
    console.warn(err);
  }
}

const sidebarWidth = unit * 12;
let activeHeaderLink: Element | null = null;

function setActiveHeaderId(id: string) {
  const active = document.querySelector(`[href="${window.location.pathname}#${id}"]`);
  if (!active) return;
  activeHeaderLink && (activeHeaderLink.className = '');
  active.className = 'active';
  activeHeaderLink = active;
}

class Body extends React.Component {
  observer: IntersectionObserver | null = null;
  previousHeaderIDs: {[id: string]: string} = {};

  ref = el => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (!el) {
      this.observer && this.observer.disconnect();
      return;
    }
    const headers = el.querySelectorAll('h3, h4');
    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.intersectionRatio === 1 && entry.boundingClientRect.top > 100) {
            setActiveHeaderId(entry.target.id);
          } else if (
            entry.intersectionRatio < 1 &&
            entry.boundingClientRect.top > 100 &&
            activeHeaderLink
          ) {
            const id = this.previousHeaderIDs[entry.target.id];
            id && setActiveHeaderId(id);
          }
        }
      },
      {threshold: 1, rootMargin: '0px 0px -66% 0px'},
    );
    let lastID = null;
    for (let i = 0; i < headers.length; i++) {
      this.previousHeaderIDs[headers[i].id] = lastID;
      this.observer.observe(headers[i]);
      lastID = headers[i].id;
    }
  };

  render() {
    return <div {...this.props} ref={this.ref} />;
  }
}

const ArticlePage = ({
  data: {markdownRemark: {frontmatter: {title, date}, html, tableOfContents}},
}: ArticlePageProps) => (
  <View
    media={[
      '(min-width: 960px)',
      {
        display: 'flex',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingBottom: 4 * unit,
      },
    ]}>
    <View
      position="sticky"
      top={0}
      maxHeight="100vh"
      marginLeft={`calc((100vw - ${maxColumn}px - ${sidebarWidth}px) / 4)`}
      marginRight={`calc((100vw - ${maxColumn}px - ${sidebarWidth}px) / -4)`}
      boxSizing="border-box"
      width={sidebarWidth}
      overflow="auto"
      flexShrink={0}
      marginTop={540}
      padding={unit}
      {...tableOfContentsStyle}
      dangerouslySetInnerHTML={{
        __html: tableOfContents.replace(/[A-Z]{2,8}/g, '<span class="caps">$&</span>'),
      }}
      media={['(max-width: 959px)', {display: 'none'}]}
      onClick={onTOCClick}
    />
    <View
      media={[
        '(min-width: 960px)',
        {maxWidth: maxColumn, marginLeft: 'auto', marginRight: 'auto'},
      ]}>
      <Heading marginTop={unit}>
        <Link to="/">Stefano J. Attardi</Link>
      </Heading>
      <Title marginTop={unit}>{title}</Title>
      <DateView date={date} />
      <Body {...markdownStyle} dangerouslySetInnerHTML={{__html: html}} />
      <View marginTop={unit * 4}>
        <Heading>
          <Link to="/">Stefano J. Attardi</Link>
        </Heading>
        <Subtitle>
          UI Engineering and Design consultant, specializing in React and React performance.
          Consulting as <Link href="https://rationalcreation.com/">Rational Creation</Link>.
        </Subtitle>
        <Button href="/email">Get in Touch</Button>
      </View>
    </View>
  </View>
);

export default ArticlePage;

export const pageQuery = graphql`
  query ArticlePageQuery($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        title
        date
      }
      html
      tableOfContents
    }
  }
`;

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema

interface ArticlePageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
      };
      html: string;
      tableOfContents: string;
    };
  };
}
