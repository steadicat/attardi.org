import React from 'react';
import CardText from './CardText';
import Style from './Style';
import merge from './merge';

const cardTextStyle = merge(Style.abs, Style.bottomLeft, Style.left, Style.mam);

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {link: null};
    this._styles = {link: {}, noLink: {}};
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.getColorClass = this.getColorClass.bind(this);
    this.getBackgroundClass = this.getBackgroundClass.bind(this);
    this.getLink = this.getLink.bind(this);
    this.getStyle = this.getStyle.bind(this);
  }

  onMouseEnter() {
    this.refs.text.start();
    this.props.onHover && this.props.onHover();
  }

  onMouseLeave() {
    this.refs.text.stop();
  }

  onLinkChange(link) {
    this.setState({link});
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

  getStyle() {
    let style = this._styles[this.state.link ? 'link' : 'noLink'][this.getColorClass()];
    if (style) return style;
    style = merge(
      Style.noBorder,
      Style.block,
      Style.mhs,
      Style.rounded,
      Style.rel,
      Style.textM,
      Style.card,
      Style.left,
      Style.noUnderline,
      Style[this.getColorClass()],
      Style[`${this.getColorClass()}Border`],
      Style[`${this.getBackgroundClass()}Bg`],
      Style[this.state.link ? 'pointer' : 'arrow'],
      Style.ba,
      {marginBottom: 10}
    );
    this._styles[this.state.link ? 'link' : 'noLink'][this.getColorClass()] = style;
    return style;
  }

  render() {
    const {question, answers, space, style, ...props} = this.props;
    style;
    return (
      <a
        {...props}
        href={this.state.link}
        style={this.getStyle()}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <span key="link" style={merge(Style.block, Style.textS, Style.pam, this.state.link ? {} : Style.off)}>{this.getLink()}</span>
        <CardText
          ref="text"
          color={this.getColorClass()}
          question={question}
          answers={answers}
          space={space}
          style={cardTextStyle}
          onLinkChange={this.onLinkChange}
        />
      </a>
    );
  }

}

Card.propTypes = {
  space: React.PropTypes.string,
  color: React.PropTypes.string,
  question: React.PropTypes.string,
  answers: React.PropTypes.array,
  style: React.PropTypes.object,
};
