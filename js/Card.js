import React from "react";
import CardText from "./CardText";

const Card = React.createClass({

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

  getColorClass: function() {
    return this.state.link ? 'white' : this.props.color;
  },

  getBackgroundClass: function() {
    return this.state.link ? this.props.color : 'white';
  },

  getLink: function() {
    if (!this.state.link) return null;
    return this.state.link.replace(/^(http(s)?\:\/\/(www\.)?)|(mailto\:)/g, '');
  },

  render: function() {
    const {className, style, ...props} = this.props;
    return (
      <a
        {...props}
        href={this.state.link}
        className={`${className} block mhs rounded rel text-m ba card left ${this.getColorClass()} ${this.getColorClass()}-border ${this.getBackgroundClass()}-bg ${this.state.link ? 'pointer' : 'default'}`}
        style={Object.assign({}, {marginBottom: 10}, style)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
          <span key="link" className={'block text-s pam' + (this.state.link ? '' : ' off')}>{this.getLink()}</span>
          <CardText
            ref="text"
            color={this.getColorClass()}
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

export default Card;
