/** @jsx React.DOM **/
var React = require('../react');
var Page = require('../Page');
var Card = require('../Card');

var Error = React.createClass({
  render: function() {
    return (
      <Page title="Error" module="error">
        <div className="center mah pah">
          <Card
            className="ib"
            color={'gray'}
            question={'Something went wrong. Try going back'}
            space={'\n'}
            answers={[
              ['to the homepage', '/'],
              (typeof document !== 'undefined') ? ['where you came from', document.referrer] : null,
              ['to my Facebook', 'https://www.facebook.com/attardi'],
              ['to my Twitter', 'https://www.twitter.com/steadicat'],
              ['to Hacker News', 'https://news.ycombinator.com/'],
              ['to Swarmation', 'http://www.swarmation.com/'],
              ['to Google', 'http://www.google.com/']
            ].filter(function(x) { return x !== null })}
          />
        </div>
      </Page>
    );
  }
});

if (typeof document !== 'undefined') {
  React.renderComponent(Error(null), document);
}

module.exports = Error;
