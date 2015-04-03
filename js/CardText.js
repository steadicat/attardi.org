import React from "react";
const HasTouch = (typeof window === 'undefined' ? false : ('ontouchstart' in window));

export default class CardText extends React.Component {

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
        opacity: 1
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
    for (const i = 0, l = this.props.answers.length; i < l; i++) {
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
    return (
      <span className={this.props.className}>
        {this.props.question}
        {this.getSpace()}
        <span className={'bb trans ' + this.props.color + '-border bb'}>
          {this.longestAnswer(this.props.answers)}
        </span>
        {this.props.answers.map(function(answer, i) {
          return (
            <span key={i} className="abs block top-left trans">
              {this.props.question}
              {this.getSpace()}
              <span className={'bb ' + this.props.color + '-border bb'}>
                {this.getAnswer(answer)}
              </span>
            </span>
          );
        }.bind(this))}
        <span className="abs top-left">
          <span className="trans">{this.props.question}</span>
          {this.getSpace()}
          {this.renderAnswer(this.props.answers[this.state.answer])}
        </span>
      </span>
    );
  }

  renderAnswer(answer) {
    return (
      <span className="t-opacity" style={{opacity: this.state.opacity}}>{this.getAnswer(answer)}.</span>
    );
  }

}

CardText.defaultProps = {space: ' '};


