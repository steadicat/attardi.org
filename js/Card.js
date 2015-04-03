import React from 'react';
import CardText from './CardText';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {link: null};
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.getColorClass = this.getColorClass.bind(this);
    this.getBackgroundClass = this.getBackgroundClass.bind(this);
    this.getLink = this.getLink.bind(this);
  }

  onMouseEnter() {
    this.refs.text.start();
  }

  onMouseLeave() {
    this.refs.text.stop();
  }

  onLinkChange(link) {
    this.setState({link: link});
  }

  getColorClass() {
    return this.state.link ? 'white' : this.props.color;
  }

  getBackgroundClass() {
    return this.state.link ? this.props.color : 'white';
  }

  getLink() {
    if (!this.state.link) return null;
    return this.state.link.replace(/^(http(s)?\:\/\/(www\.)?)|(mailto\:)/g, '');
  }

  render() {
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

}

