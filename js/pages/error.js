import React from 'react';
import Page from '../Page';
import Card from '../Card';
import Style from '../Style';
import merge from '../merge';

const ANSWERS = [
  ['to the homepage', 'http://attardi.org'],
  ['to my Facebook', 'https://www.facebook.com/attardi'],
  ['to my Twitter', 'https://www.twitter.com/steadicat'],
  ['to Hacker News', 'https://news.ycombinator.com'],
  ['to Swarmation', 'http://www.swarmation.com'],
  ['to Google', 'http://www.google.com'],
];

const style = merge(Style.center, Style.mah, Style.pah);

export default class Error extends React.Component {
  constructor() {
    super();
    this.state = {answers: ANSWERS};
  }

  componentWillMount() {
    if ((typeof document !== 'undefined') && document.referrer) {
      const answers = this.state.answers.splice(1, 0, ['where you came from', document.referrer]);
      this.setState({answers});
    }
  }

  render() {
    return (
      <Page {...this.props} title="Error" module="error">
        <div style={style}>
          <Card
            style={Style.ib}
            color={'gray'}
            question={'Something went wrong. Try going back'}
            space={'\n'}
            answers={this.state.answers}
          />
        </div>
      </Page>
    );
  }
}

