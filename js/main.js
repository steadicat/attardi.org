/** @jsx React.DOM **/
var React = require('./react');
var Card = require('./Card');
var Columns = require('./Columns');
var CardText = require('./CardText');

var facts = [
  {color: 'blue', question: 'In the past I worked at', answers: [
    'Facebook',
    'Cloudant'
  ]},
  {color: 'green', question: 'I speak', space: '\n', answers: [
    'English fluently',
    'Italian natively',
    'French adequately',
    'German vaguely',
    'Chinese increasingly'
  ]},
  {color: 'orange', question: 'I studied', answers: [
    'Computer Science',
    'Graphic Design',
    'Interaction Design',
    'Strategic Design'
  ]},
  {color: 'purple', question: 'I\u2019ve lived in', answers: [
    'Helsinki',
    'Milan',
    'Boston',
    'Pisa',
    'San\xa0Francisco',
    'Cologne'
  ]},
  {color: 'gray', question: 'I work on', answers: [
    ['Storehouse', 'https://www.storehouse.co/'],
    ['Swarmation', 'http://www.swarmation.com/'],
  ]},
  {color: 'teal', question: 'I am an amateur bar', space: null, answers: [
    'ista', 'itone', 'tender'
  ]},
  {color: 'green', question: 'I get excited about', space: '\n', answers: [
    'site speed',
    'React.js',
    'DNS',
    'design polish',
    'dev tools',
    'design tools',
    'branding',
    'devops',
    'espresso',
    'cats',
    'singing'
  ]},
  {color: 'blue', question: 'You can reach me on', space: '\n', answers: [
    ['Facebook', 'https://www.facebook.com/attardi'],
    ['Twitter', 'https://www.twitter.com/steadicat'],
    ['Github', 'https://github.com/steadicat'],
    ['Email', 'mailto:hi@attardi.org']
  ]},
];

var Home = React.createClass({
  render: function() {
    return (
      <div className="center">
        <div className="pic mbm mth" />
        <h1 className="text-xl tight mbm">Stefano J. Attardi</h1>
        <h2 className="mbh purple text-l">
          <div className="ib rel">
            <CardText color="purple" space={'\xa0'} question={'I\xa0am\xa0a\xa0web'} answers={['developer', 'designer']} autoStart={true} />
          </div>
        </h2>
        <Columns>
          {facts.map(function(fact, i) {
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
        <div className="mvh pvh">
          <a href="https://www.storehouse.co/jobs" className="teal teal-border ba ib rounded pvm phl">
            Come work with me
          </a>
        </div>
      </div>
    );
  }
});

React.renderComponent(<Home />, document.body);
