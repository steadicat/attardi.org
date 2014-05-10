/** @jsx React.DOM **/
var React = require('./react');
var CardText = require('./CardText');

var Card = React.createClass({

  onMouseEnter: function() {
    this.refs.text.start();
  },

  onMouseLeave: function() {
    this.refs.text.stop();
  },

  getInitialState: function() {
    return {link: null};
  },

  onLinkChange: function(link) {
    this.setState({link: link});
  },

  render: function() {
    return (
      <a
        href={this.state.link}
        className={'block mhs pointer rounded rel text-m ba card left ' + this.props.color + ' ' + this.props.color + '-border'}
        style={{marginBottom: 10}}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
          <CardText
            ref="text"
            color={this.props.color}
            question={this.props.question}
            answers={this.props.answers}
            space={this.props.space}
            className="abs bottom-left left mam"
            onLinkChange={this.onLinkChange}
          />
      </a>
    )
  }

});

module.exports = Card;