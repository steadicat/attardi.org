import * as React from 'react';
import Link from 'gatsby-link';

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            title: string;
            date: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
}

const NewTag = () => (
  <span
    style={{
      border: '1px solid #ffcc00',
      color: '#ffcc00',
      fontWeight: 400,
      borderRadius: 3,
      padding: '3px 6px 1px',
      fontSize: 10,
      verticalAlign: 'middle',
    }}>
    NEW
  </span>
);

const ProjectRow = (url, title, description, isNew = false) => [
  <div style={{textAlign: 'right'}}>
    <a href={url}>{title}</a>
  </div>,
  <div>
    {isNew && <NewTag />} {description}
  </div>,
];

const IndexPage = ({data: {allMarkdownRemark: {edges}}}: IndexPageProps) => (
  <div>
    <h1>Stefano J. Attardi</h1>
    <h4>
      UI Engineering and Design consultant. I specialize in React and React performance. I consult
      as <a href="https://rationalcreation.com/">Rational Creation LLC</a>.
    </h4>
    <h3>Articles</h3>
    {edges.map(({node: {frontmatter: {title, date}, fields: {slug}}}, i) => (
      <div key={i}>
        <h3 style={{marginBottom: 0}}>
          <Link to={slug}>{title}</Link> <NewTag />
        </h3>
        <h5>{date}</h5>
      </div>
    ))}
    <div
      className="dim sans"
      style={{display: 'grid', gridTemplateColumns: 'auto auto', gridGap: 20}}>
      <h3 style={{gridColumn: '1/3', color: '#333'}}>Projects</h3>
      {ProjectRow('', 'Movement', 'iOS app to set and track mechanical watches.', true)}
      {ProjectRow(
        'https://pdfbymail.com/',
        'Send PDF by Mail',
        'Web app to instantly send a physical letter anywhere in the world.',
      )}
      {ProjectRow(
        'https://thecapturedproject.com/',
        'Captured',
        'People in prison drawing people who should be.',
      )}
      {ProjectRow(
        'https://swarmation.com/',
        'Swarmation',
        'A multiplayer browser-based game, winner of the 2010 Node.js Knockout.',
      )}
      {ProjectRow('https://justpickthis.com/', 'Just Pick This', 'A minimal product review site.')}
      {ProjectRow(
        'https://napkincalc.appspot.com/',
        'Napkin',
        'Experimental spreadsheet-as-documents web app.',
      )}
      <h3 style={{gridColumn: '1/3', color: '#333'}}>Code</h3>
      {ProjectRow(
        'https://github.com/steadicat/grindelwald',
        'Grindelwald',
        'Tiny functional reactive programming library with dark magic.',
      )}
      {ProjectRow(
        'https://github.com/steadicat/react-rebound',
        'React Rebound',
        'High-performance spring-based animations for React.',
      )}
      {ProjectRow(
        'https://github.com/steadicat/vectorinox',
        'Vectorinox',
        'A swiss-army knife for converting and processing SVG files.',
      )}
    </div>
  </div>
);

export default IndexPage;
