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
} from '../design/text';
import {linkColor, hoverLinkColor, activeLinkColor, grayBackground, gray} from '../design/colors';
import {unit} from '../design/layout';
import {Subtitle, Title, Date, Link, Button, Heading} from '../components/text';

const markdownStyle = css({
  ...serifS,
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

const ArticlePage = ({
  data: {markdownRemark: {frontmatter: {title, date}, html}},
}: ArticlePageProps) => (
  <div>
    <Heading>
      <Link to="/">Stefano J. Attardi</Link>
    </Heading>
    <Title>{title}</Title>
    <Date>{date}</Date>
    <div
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
    };
  };
}
