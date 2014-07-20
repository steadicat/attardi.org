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

var NotFound = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <Page title="Not found" module="notfound">
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
});

if (typeof document !== 'undefined') {
  var component = React.renderComponent(NotFound({js: '/js/notfound.js'}), document);
  setTimeout(function() {
   if (document.referrer) {
     answers.splice(1, 0, ['where you came from', document.referrer]);
     component.setProps({answers: answers});
   }
  }, 0);
}

module.exports = NotFound;
