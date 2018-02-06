import * as React from 'react';
import Link from 'gatsby-link';

const ArticlePage = ({
  data: {markdownRemark: {frontmatter: {title, date}, html}},
}: ArticlePageProps) => (
  <div>
    <h4>
      <Link to="/">Stefano J. Attardi</Link>
    </h4>
    <h1>{title}</h1>
    <h5>{date}</h5>
    <div
      dangerouslySetInnerHTML={{
        __html: html.replace(/[A-Z]{2,10}/g, '<span class="caps">$&</span>'),
      }}
    />
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
