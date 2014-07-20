/** @jsx React.DOM **/
var React = require('../react');
var Page = require('../Page');
var Card = require('../Card');

var answers = [
  ['to the homepage', 'http://attardi.org'],
  ['to my Facebook', 'https://www.facebook.com/attardi'],
  ['to my Twitter', 'https://www.twitter.com/steadicat'],
  ['to Hacker News', 'https://news.ycombinator.com'],
  ['to Swarmation', 'http://www.swarmation.com'],
  ['to Google', 'http://www.google.com']
];

var Error = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <Page title="Error" module="error">
        <div className="center mah pah">
          <Card
            className="ib"
            color={'gray'}
            question={'Something went wrong. Try going back'}
            space={'\n'}
            answers={this.props.answers || answers}
          />
        </div>
      </Page>
    );
  }
});

if (typeof document !== 'undefined') {
  var component = React.renderComponent(Error({js: '/js/error.js'}), document);
  setTimeout(function() {
   if (document.referrer) {
     answers.splice(1, 0, ['where you came from', document.referrer]);
     component.setProps({answers: answers});
   }
  }, 0);
}

module.exports = Error;
