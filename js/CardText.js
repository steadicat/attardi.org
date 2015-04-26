import React from 'react';
import Style from './Style';
import merge from './merge';

const HasTouch = (typeof window === 'undefined' ? false : ('ontouchstart' in window));

export default class CardText extends React.Component {
  displayName() {
    return 'CardText';
  }

  constructor(props) {
    super(props);
    this.state = {answer: this.props.answers.length - 1, opacity: 0};
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.next = this.next.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.longestAnswer = this.longestAnswer.bind(this);
    this.getSpace = this.getSpace.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
  }

  start() {
    if (this._interval) return;
    this.next();
    this._interval = setInterval(this.next, 600);
  }

  stop() {
    this._interval && clearInterval(this._interval);
    this._interval = null;
    this.setState({opacity: 0});
    this.props.onLinkChange && this.props.onLinkChange(null);
  }

  next() {
    if (this.state.opacity === 0) {
      const index = (this.state.answer + 1) % this.props.answers.length;
      this.setState({
        answer: index,
        opacity: 1,
      });
      this.props.onLinkChange && this.props.onLinkChange(this.getAnswerLink(this.props.answers[index]));
    } else {
      this.setState({opacity: 0});
    }
  }

  componentDidMount() {
    if (this.props.autoStart || HasTouch) this.start();
  }

  componentWillUnmount() {
    this._interval && clearInterval(this._interval);
  }

  longestAnswer() {
    let longest = '';
    for (let i = 0, l = this.props.answers.length; i < l; i++) {
      if (this.props.answers[i].length > longest.length) {
        longest = this.props.answers[i];
      }
    }
    return this.getAnswer(longest);
  }

  getSpace() {
    return this.props.space === '\n' ? <br/> : this.props.space;
  }

  getAnswer(answer) {
    return (answer instanceof Array) ? answer[0] : answer;
  }

  getAnswerLink(answer) {
    return (answer instanceof Array) ? answer[1] : null;
  }

  render() {
    const {question, color, answers, space, autoStart, style, ...props} = this.props;
    autoStart;
    space;
    return (
      <span {...props} style={style}>
        {question}
        {this.getSpace()}
        <span style={merge(
          Style.trans,
          Style[`${color}Border`],
          Style.bb
        )}>
          {this.longestAnswer(answers)}.
        </span>
        {answers.map(function(answer, i) {
          return (
            <span key={i} style={merge(Style.abs, Style.block, Style.topLeft, Style.trans)}>
              <span style={Style.trans}>{question}</span>
              {this.getSpace()}
              <span style={merge(
                Style[`${color}Border`],
                Style.bb
              )}>
                {this.getAnswer(answer)}.
              </span>
            </span>
          );
        }.bind(this))}
        <span style={merge(Style.abs, Style.topLeft)}>
          <span style={Style.trans}>{question}</span>
          {this.getSpace()}
          {this.renderAnswer(answers[this.state.answer])}
        </span>
      </span>
    );
  }

  renderAnswer(answer) {
    return (
      <span style={merge(Style.tOpacity, {opacity: this.state.opacity})}>{this.getAnswer(answer)}.</span>
    );
  }

}

CardText.defaultProps = {space: ' '};

CardText.propTypes = {
  space: React.PropTypes.string,
  answers: React.PropTypes.array,
  autoStart: React.PropTypes.bool,
  style: React.PropTypes.object,
  color: React.PropTypes.string,
  question: React.PropTypes.string,
  onLinkChange: React.PropTypes.func,
};
