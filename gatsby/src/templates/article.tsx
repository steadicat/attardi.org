import * as React from 'react';
import {View} from 'glamor/jsxstyle';
import {css} from 'glamor';
import {
  sansBold,
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
  monoS,
} from '../design/text';
import {
  linkColor,
  hoverLinkColor,
  activeLinkColor,
  grayBackground,
  gray,
  darkerGrayBackground,
  textColor,
} from '../design/colors';
import {unit, maxColumn} from '../design/layout';
import {Subtitle, Title, DateView, Link, Button, Heading} from '../components/text';

import * as webIcon from '../images/icons/web.svg';
import * as wikipediaIcon from '../images/icons/wikipedia.svg';
import * as mailIcon from '../images/icons/mail.svg';
import * as twitterIcon from '../images/icons/twitter.svg';
import * as githubIcon from '../images/icons/github.svg';
import * as appstoreIcon from '../images/icons/appstore.svg';

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
  '& .gatsby-highlight, code': monoXS,
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
    '& .gatsby-highlight': {
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
  '& a[href]': {
    background: `no-repeat url(${webIcon}) 0px 3px`,
    paddingLeft: 18,
  },

  '& blockquote a[href], & figcaption a[href]': {
    backgroundSize: '12px 12px',
    paddingLeft: 14,
    backgroundPosition: '0 1px',
  },

  '& a.anchor, & blockquote a.anchor, & figcaption a.anchor, & .prevNext a': {
    padding: 0,
    background: 'none',
  },

  '& a[title=Wikipedia]': {
    backgroundImage: `url(${wikipediaIcon})`,
  },

  '& a[title=Email]': {
    backgroundImage: `url(${mailIcon})`,
  },

  '& a[title=Twitter]': {
    backgroundImage: `url(${twitterIcon})`,
  },

  '& a[title=GitHub]': {
    backgroundImage: `url(${githubIcon})`,
  },

  '& a[title="App Store"]': {
    backgroundImage: `url(${appstoreIcon})`,
  },

  '& .prevNext': {
    display: 'flex',
    marginTop: -unit / 4,
    marginBottom: unit / 4,
    '& a': {
      flex: 1,
      textAlign: 'center',
      ...sansXS,
      lineHeight: `${unit * 2}px`,
    },
  },
  '@media(min-width: 960px)': {
    '& .prevNext': {display: 'none'},
  },
});

const tableOfContentsStyle = css({
  ...commonStyle,
  '& a': sansBoldXS,
  '& p': {margin: 0},
  '& ul': {margin: 0, padding: 0, listStyleType: 'none', paddingLeft: unit},
  '&>div>ul': {paddingLeft: 0},
  '&>div>ul>li': {marginBottom: unit / 2},
  '&>div a': {
    ...sansXS,
    color: gray,
    textDecoration: 'none',
    transition: '0.5s color, border-color',
    '&.active': sansBoldXS,
    '&.active::before': {content: '▸', position: 'absolute', left: 0},
  },
  '& .caps': sansCaps,
  '& a.active .caps': sansBoldCaps,
  '&.isScrolled .show': {opacity: 1},
});

function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
  try {
    let target = event.nativeEvent.target as
      | HTMLAnchorElement
      | {parentNode: HTMLAnchorElement; href: undefined};
    if (!target.href) target = target.parentNode;
    if (!target.href) return;
    const id = target.href.split('#')[1];
    const el = document.getElementById(id);
    el && el.scrollIntoView({behavior: 'smooth', block: 'start'});
    event.preventDefault();
  } catch (err) {
    console.warn(err);
  }
}

const sidebarWidth = unit * 14;
let activeHeaderID: string | null = null;
let activeHeaderLink: Element | null = null;

function setActiveHeaderId(id: string | null) {
  if (activeHeaderID === id) return;
  activeHeaderID = id;
  activeHeaderLink && (activeHeaderLink.className = '');
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.className = id ? 'isScrolled' : '';
  }
  if (!id) return;
  const active = document.querySelector(`[href="${window.location.pathname}#${id}"]`);
  if (!active) return;
  active.className = 'active';
  activeHeaderLink = active;
}

class Body extends React.Component<{dangerouslySetInnerHTML: {__html: string}}> {
  el: HTMLDivElement | null = null;
  headerPositions: Array<[string, number]> = [];

  shouldComponentUpdate() {
    return false;
  }

  ref = (el: HTMLDivElement | null) => {
    this.el = el;
    if (!el) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      return;
    }
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.addPrevNextLinks(el);
  };

  resizeTimeout: number | null = null;

  onResize = () => {
    this.resizeTimeout && cancelAnimationFrame(this.resizeTimeout);
    this.resizeTimeout = requestAnimationFrame(() => {
      if (!this.el) return;
      const headers = this.el.querySelectorAll<HTMLElement>('h3, h4');
      this.headerPositions = [];
      for (let i = 0; i < headers.length; i++) {
        this.headerPositions.push([headers[i].id, headers[i].offsetTop]);
      }
      this.onScroll();
    });
  };

  scrollTimeout: number | null = null;

  onScroll = () => {
    this.scrollTimeout && cancelAnimationFrame(this.scrollTimeout);
    this.scrollTimeout = requestAnimationFrame(() => {
      const scroll = window.scrollY + window.innerHeight / 3;
      let lastID: string | null = null;
      for (const [id, position] of this.headerPositions) {
        if (position > scroll) {
          setActiveHeaderId(lastID);
          return;
        }
        lastID = id;
      }
      setActiveHeaderId(lastID);
    });
  };

  addPrevNextLinks(el: HTMLElement) {
    const headers = el.querySelectorAll<HTMLElement>('h3, h4');
    for (let i = 0; i < headers.length; i++) {
      if (headers[i + 1] === headers[i].nextElementSibling) continue;
      const links = document.createElement('div');
      links.className = 'prevNext';
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
  }

  render() {
    return <div ref={this.ref} {...this.props} />;
  }
}

const Sidebar = ({title, tableOfContents}) => (
  <View
    id="sidebar"
    position="sticky"
    top={0}
    maxHeight="100vh"
    marginLeft={`calc((100vw - ${maxColumn}px - ${sidebarWidth}px) / 4)`}
    marginRight={`calc((100vw - ${maxColumn}px - ${sidebarWidth}px) / -4)`}
    boxSizing="border-box"
    width={sidebarWidth}
    overflow="auto"
    flexShrink={0}
    marginTop={555}
    padding={unit}
    {...tableOfContentsStyle}
    media={['(max-width: 959px)', {display: 'none'}]}
    onClick={onLinkClick}>
    <Link
      to="/"
      {...sansBoldXS}
      opacity={0.01}
      className="show"
      transition="0.6s opacity"
      transform="translateZ(0)">
      Stefano J. Attardi
    </Link>
    <Link
      href="#top"
      {...sansBoldXS}
      color={textColor}
      marginBottom={unit}
      display="block"
      opacity={0.01}
      className="show"
      transition="0.6s opacity"
      transform="translateZ(0)">
      {title}
    </Link>
    <div
      dangerouslySetInnerHTML={{
        __html: tableOfContents.replace(/[A-Z]{2,8}/g, '<span class="caps">$&</span>'),
      }}
    />
  </View>
);

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
    <Sidebar title={title} tableOfContents={tableOfContents} />
    <View
      media={[
        '(min-width: 960px)',
        {maxWidth: maxColumn, marginLeft: 'auto', marginRight: 'auto'},
      ]}>
      <Heading marginTop={unit}>
        <Link to="/">Stefano J. Attardi</Link>
      </Heading>
      <Title id="top" marginTop={unit}>
        {title}
      </Title>
      <DateView date={date} />
      <Body dangerouslySetInnerHTML={{__html: html}} {...markdownStyle} onClick={onLinkClick} />
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
