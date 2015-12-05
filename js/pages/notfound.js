import React from 'react';
import {Block} from 'stylistic-elements';
import * as Spacing from '../Spacing';
import Page from '../Page';
import Card from '../Card';

const ANSWERS = [
  ['to the homepage', 'https://attardi.org'],
  ['to my Facebook', 'https://www.facebook.com/attardi'],
  ['to my Twitter', 'https://www.twitter.com/steadicat'],
  ['to Hacker News', 'https://news.ycombinator.com'],
  ['to Swarmation', 'http://www.swarmation.com'],
  ['to Google', 'http://www.google.com'],
];

export default class NotFound extends React.Component {

  constructor() {
    super();
    this.state = {answers: []};
  }

  componentWillMount() {
    /* global document */
    if (typeof document !== 'undefined' && document.referrer) {
      this.setState({answers: ['where you came from', document.referrer]});
    }
  }

  render() {
    return (
      <Page title="Not found" {...this.props}>
        <Block textAlign="center" margin={Spacing.h} padding={Spacing.h}>
          <Card
            color={'orange'}
            question={'This page does not exist. Go back'}
            space={'\n'}
            answers={[...this.state.answers, ...ANSWERS]}
            display="inline-block"
          />
        </Block>
      </Page>
    );
  }
}
