/** @jsx React.DOM **/
var React = require('../react');
var Page = require('../Page');
var Card = require('../Card');
var Columns = require('../Columns');
var CardText = require('../CardText');
var Facts = require('../Facts');

var Index = React.createClass({
  render: function() {
    return (
      <Page title="Stefano J. Attardi: I am a web [developer, designer]" module="index" description="I am Stefano J. Attardi, a web developer and designer currently working at Storehouse. Previously at Facebook. Winner of the first Node.js Knockout with Swarmation.com.">
        <div className="center">
          <div className="pic mbm mth" />
          <h1 className="text-xl tight mbm">Stefano J. Attardi</h1>
          <h2 className="mbh purple text-m">
            <div className="ib rel">
              <CardText color="purple" space={'\xa0'} question={'I\xa0am\xa0a\xa0web'} answers={['developer', 'designer']} autoStart={true} />
            </div>
          </h2>
          <Columns>
            {Facts.map(function(fact, i) {
              return (
                <Card
                  key={i}
                  color={fact.color}
                  question={fact.question}
                  space={fact.space}
                  answers={fact.answers}
                />
              );
            })}
          </Columns>
          <div className="mvh pth">
            <a href="https://www.storehouse.co/jobs" className="teal teal-border ba ib rounded pvm phl hover-teal-bg hover-white">
              Come work with me
            </a>
          </div>
          <div className="text-s pah mbh light-gray loose ib" style={{maxWidth: 400}}>
            Site built with {' '}
            <a href="http://facebook.github.io/react/">React.js</a>,
            packaged with <a href="http://gulpjs.com/">Gulp</a>, {' '}
            and hosted on <a href="http://aws.amazon.com/">S3+CloudFront</a>.
            DNS provided by <a href="https://www.cloudflare.com/">CloudFlare</a>.
            The typeface used is <a href="http://www.google.com/fonts/specimen/Questrial">Questrial</a>, by <a href="https://dribbble.com/JoePrince">Joe Prince</a>.
          </div>
        </div>
      </Page>
    );
  }
});

if (typeof document !== 'undefined') {
  React.renderComponent(Index(null), document);
}

module.exports = Index;
