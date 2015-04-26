import 'babel/polyfill';
import React from 'react';
import Page from '../Page';
import Card from '../Card';
import Style from '../Style';
import merge from '../merge';

const answers = [
  ['to the homepage', 'http://attardi.org'],
  ['to my Facebook', 'https://www.facebook.com/attardi'],
  ['to my Twitter', 'https://www.twitter.com/steadicat'],
  ['to Hacker News', 'https://news.ycombinator.com'],
  ['to Swarmation', 'http://www.swarmation.com'],
  ['to Google', 'http://www.google.com'],
];

const style = merge(Style.center, Style.mah, Style.pah);

export default class Error {
  displayName() {
    return 'Error';
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
            answers={this.props.answers || answers}
          />
        </div>
      </Page>
    );
  }
}

if (typeof document !== 'undefined') {
  const component = React.render(<Error js="/js/error.js" />, document);
  setTimeout(function() {
    if (document.referrer) {
      answers.splice(1, 0, ['where you came from', document.referrer]);
      component.setProps({answers});
    }
  }, 0);
}

Error.propTypes = {
  answers: React.PropTypes.array,
};

