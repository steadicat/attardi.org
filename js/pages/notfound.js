require('babel/polyfill');
import React from "react";
import Page from "../Page";
import Card from "../Card";

const answers = [
  ['to the homepage', 'http://attardi.org'],
  ['to my Facebook', 'https://www.facebook.com/attardi'],
  ['to my Twitter', 'https://www.twitter.com/steadicat'],
  ['to Hacker News', 'https://news.ycombinator.com'],
  ['to Swarmation', 'http://www.swarmation.com'],
  ['to Google', 'http://www.google.com']
];

export default class NotFound extends React.Component {

  render() {
    return (
      <Page {...this.props} title="Not found" module="notfound">
        <div className="center mah pah">
          <Card
            className="ib"
            color={'orange'}
            question={'This page does not exist. Go back'}
            space={'\n'}
            answers={this.props.answers || answers}
          />
        </div>
      </Page>
    );
  }

}

if (typeof document !== 'undefined') {
  const component = React.render(<NotFound js="/js/notfound.js" />, document);
  setTimeout(function() {
   if (document.referrer) {
     answers.splice(1, 0, ['where you came from', document.referrer]);
     component.setProps({answers: answers});
   }
  }, 0);
}

