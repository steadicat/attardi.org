import React from 'react';
import {Inline} from 'stylistic-elements';
import * as Colors from './Colors';

/* global setInterval, clearInterval, window */

const HasTouch = (typeof window === 'undefined' ? false : ('ontouchstart' in window));

export default class CardText extends React.Component {
  static defaultProps = {
    space: ' ',
  }

  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answers.length - 1,
      opacity: 0,
    };
  }

  componentDidMount() {
    if (this.props.autoStart || HasTouch) this.start();
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  start = () => {
    if (this.interval) return;
    this.next();
    this.interval = setInterval(this.next, 700);
  }

  stop = () => {
    this.interval && clearInterval(this.interval);
    this.interval = null;
    this.setState({opacity: 0});
    this.props.onLinkChange && this.props.onLinkChange(null);
  }

  next = () => {
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

  longestAnswer = () =>  {
    let longest = '';
    for (let i = 0, l = this.props.answers.length; i < l; i++) {
      if (this.props.answers[i].length > longest.length) {
        longest = this.props.answers[i];
      }
    }
    return this.getAnswer(longest);
  }

  getSpace = () => {
    return this.props.space === '\n' ? <br/> : this.props.space;
  }

  getAnswer(answer) {
    return (answer instanceof Array) ? answer[0] : answer;
  }

  getAnswerLink(answer) {
    return (answer instanceof Array) ? answer[1] : null;
  }

  renderAnswer = (answer, i) => {
    return (
      <Inline
        key={i}
        position="absolute"
        display="block"
        top={0}
        left={0}
        color={Colors.trans}>
        {this.props.question}
        {this.getSpace()}
        {this.getAnswer(answer)}
        .
      </Inline>
    );
  }

  render() {
    const {question, color, answers, space, autoStart, ...props} = this.props;
    autoStart;
    space;
    return (
      <Inline color={Colors[color]} {...props}>
        {question}
        {this.getSpace()}
        <Inline
          color={Colors.trans}
          borderBottomStyle="solid"
          borderBottomWidth={2}
          borderBottomColor={Colors[color]}>
          {this.longestAnswer(answers)}.
        </Inline>
        {answers.map(this.renderAnswer)}
        <Inline position="absolute" top={0} left={0}>
          <Inline color={Colors.trans}>{question}</Inline>
          {this.getSpace()}
          <Inline
            transition="opacity 0.6s"
            opacity={this.state.opacity}>
            {this.getAnswer(answers[this.state.answer])}.
          </Inline>
        </Inline>
      </Inline>
    );
  }

}
