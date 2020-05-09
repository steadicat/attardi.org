import * as React from 'react';
import {graphql} from 'gatsby';
import {View} from 'glamor/jsxstyle';
import {Title, Subtitle, Link, Heading, Subheading, DateView, Button} from '../components/text';
import {accentColor, gray} from '../design/colors';
import {sansXS, sansCaps, sansM, sansBoldS} from '../design/text';
import {unit} from '../design/layout';
import Layout from '../components/Layout';

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
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
  location: {pathname: string};
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
  <View
    component="span"
    border={`1px solid ${accentColor}`}
    color={accentColor}
    {...sansXS}
    borderRadius={3}
    padding="0px 4px 1px 5px"
    verticalAlign="middle">
    <View component="span" {...sansCaps}>
      NEW
    </View>
  </View>
);

const ProjectRow = (url: string, title: string, description: string, isNew = false) => [
  <Subheading key={url} media={['(max-width: 480px)', {marginTop: unit}]}>
    <Link href={url}>{title}</Link> {isNew && <NewTag />}
  </Subheading>,
  <View key={`${url}2`} color={gray} {...sansM}>
    {description}
  </View>,
];

const IndexPage = ({
  data: {
    allMarkdownRemark: {edges},
  },
  location,
}: IndexPageProps) => (
  <Layout location={location}>
    <div>
      <View paddingTop={unit * 2} paddingBottom={unit * 2}>
        <Title>Stefano J. Attardi</Title>
        <Subtitle marginTop={unit} marginBottom={unit}>
          UI Engineering and Design consultant, specializing in React and React performance.
          Consulting as <Link href="https://rationalcreation.com/">Rational Creation</Link>.
        </Subtitle>
        <Button href="/email">Get in Touch</Button>
      </View>
      <Heading marginTop={unit}>Articles</Heading>
      {edges.map(({node: {frontmatter: {title, date}, fields: {slug}}}, i) => [
        <Heading key={`${i}0`} marginTop={unit} marginBottom={unit / 4}>
          <Link to={slug}>{title}</Link>{' '}
          {Date.now() - new Date(date).valueOf() < 7 * 24 * 60 * 60 * 1000 && <NewTag />}
        </Heading>,
        <DateView key={`${i}1`} date={date} />,
      ])}
      <View
        display="grid"
        css={{
          gridTemplateColumns: '1fr 2fr',
          gridGap: unit,
        }}
        media={['(max-width: 480px)', {display: 'block'}]}>
        <Heading gridColumn="1/3" marginTop={unit * 2}>
          Projects
        </Heading>
        {ProjectRow(
          'https://itunes.apple.com/app/movement-watch-tracker/id1329445157',
          'Movement',
          'iOS app to set and track mechanical watches.',
          true
        )}
        {ProjectRow(
          'https://pdfbymail.com/',
          'Send PDF by Mail',
          'Web app to instantly send a physical letter anywhere in the world.'
        )}
        {ProjectRow(
          'https://thecapturedproject.com/',
          'Captured',
          'People in prison drawing people who should be.'
        )}
        {ProjectRow(
          'https://swarmation.com/',
          'Swarmation',
          'An in-browser real-time multiplayer game, winner of the 2010 Node.js Knockout.'
        )}
        {ProjectRow(
          'https://justpickthis.com/',
          'Just Pick This',
          'A minimal product review site.'
        )}
        {ProjectRow(
          'https://napkincalc.appspot.com/',
          'Napkin',
          'Experimental spreadsheet-as-documents web app.'
        )}
        <Heading gridColumn="1/3" marginTop={unit * 2}>
          Code
        </Heading>
        {ProjectRow(
          'https://github.com/steadicat/grindelwald',
          'Grindelwald',
          'Tiny functional reactive programming library with dark magic.'
        )}
        {ProjectRow(
          'https://github.com/steadicat/react-rebound',
          'React Rebound',
          'High-performance spring-based animations for React.'
        )}
        {ProjectRow(
          'https://github.com/steadicat/vectorinox',
          'Vectorinox',
          'A swiss-army knife for converting and processing SVG files.'
        )}
      </View>
      <View display="flex" justifyContent="space-around" marginTop={unit * 4}>
        <View {...sansBoldS}>
          <Link href="/email">Email</Link>
        </View>
        <View {...sansBoldS}>
          <Link href="https://twitter.com/steadicat">Twitter</Link>
        </View>
        <View {...sansBoldS}>
          <Link href="https://github.com/steadicat">GitHub</Link>
        </View>
      </View>
    </div>
  </Layout>
);

export default IndexPage;
