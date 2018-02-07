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
} from '../design/text';
import {linkColor, hoverLinkColor, activeLinkColor, grayBackground, gray} from '../design/colors';
import {unit, maxColumn} from '../design/layout';
import {Subtitle, Title, DateView, Link, Button, Heading} from '../components/text';

const commonStyle = {
  '& a': {
    ...sansBold,
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
  ...serifS,
  ...commonStyle,
  '& h3': {...sansBoldM, marginTop: unit * 2, marginBottom: unit / 2},
  '& h4': {...sansBoldS, marginTop: unit, marginBottom: unit / 2},
  '& h5': {...sansBoldXS, marginTop: 0, marginBottom: unit / 4},
  '& strong': sansBold,
  '& code': monoXS,
  '& p>.caps': serifCaps,
  '& h3>.caps, h4>.caps': sansBoldCaps,
  '& blockquote>p>.caps': sansCaps,
  '& p': {margin: 0},
  '& p + p': {
    textIndent: '28px',
  },

  '& blockquote': {
    ...sansXS,
    marginTop: unit / 2,
    background: grayBackground,
    borderLeft: `3px solid ${gray}`,
    padding: [unit * 0.75, unit, unit * 0.75, unit].map(x => `${x}px`).join(' '),
    color: gray,
    margin: [unit, 0].map(x => `${x}px`).join(' '),
  },
  '& blockquote h4': {
    margin: 0,
    color: gray,
  },
});

const tableOfContentsStyle = css({
  ...commonStyle,
  padding: unit,
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
  <div>
    <View
      width={sidebarWidth}
      position="fixed"
      left={`calc((100% - ${maxColumn}px - ${sidebarWidth}px) / 6)`}
      bottom={0}
      {...tableOfContentsStyle}
      dangerouslySetInnerHTML={{
        __html: tableOfContents,
      }}
      onClick={onTOCClick}
      media={['(max-width: 959px)', {display: 'none'}]}
    />
    <View media={['(min-width: 960px)', {position: 'relative', left: sidebarWidth / 2}]}>
      <Heading marginTop={unit}>
        <Link to="/">Stefano J. Attardi</Link>
      </Heading>
      <Title marginTop={unit}>{title}</Title>
      <DateView date={date} />
      <Body
        {...markdownStyle}
        dangerouslySetInnerHTML={{
          __html: html.replace(/[A-Z]{2,10}/g, '<span class="caps">$&</span>'),
        }}
      />
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
  </div>
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
