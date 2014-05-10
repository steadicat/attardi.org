/** @jsx React.DOM **/
var React = require('./react');

var CardText = React.createClass({

  getDefaultProps: function() {
    return {space: ' '};
  },

  getInitialState: function() {
    return {answer: this.props.answers.length - 1, opacity: 0};
  },

  start: function() {
    if (this._interval) return;
    this.next();
    this._interval = setInterval(this.next, 600);
  },

  stop: function() {
    this._interval && clearInterval(this._interval);
    this._interval = null;
  },

  next: function() {
    if (this.state.opacity === 0) {
      var index = (this.state.answer + 1) % this.props.answers.length;
      this.setState({
        answer: index,
        opacity: 1
      });
      this.props.onLinkChange && this.props.onLinkChange(this.getAnswerLink(this.props.answers[index]));
    } else {
      this.setState({opacity: 0});
    }
  },

  componentDidMount: function() {
    if (this.props.autoStart) this.start();
  },

  componentWillUnmount: function() {
    this._interval && clearInterval(this._interval);
  },

  longestAnswer: function() {
    var longest = '';
    for (var i = 0, l = this.props.answers.length; i < l; i++) {
      if (this.props.answers[i].length > longest.length) {
        longest = this.props.answers[i];
      }
    }
    return this.getAnswer(longest);
  },

  getSpace: function() {
    return this.props.space === '\n' ? <br/> : this.props.space;
  },

  getAnswer: function(answer) {
    return (answer instanceof Array) ? answer[0] : answer;
  },

  getAnswerLink: function(answer) {
    return (answer instanceof Array) ? answer[1] : null;
  },

  render: function() {
    return (
      <div className={this.props.className}>
        {this.props.question}
        {this.getSpace()}
        <span className={'bb trans ' + this.props.color + '-border bb'}>
          {this.longestAnswer(this.props.answers)}
        </span>
        {this.props.answers.map(function(answer, i) {
          return (
            <div key={i} className="abs top-left trans">
              {this.props.question}
              {this.getSpace()}
              <span className={'bb ' + this.props.color + '-border bb'}>
                {this.getAnswer(answer)}
              </span>
            </div>
          );
        }.bind(this))}
        <div className="abs top-left">
          <span className="">{this.props.question}</span>
          {this.getSpace()}
          {this.renderAnswer(this.props.answers[this.state.answer])}
        </div>
      </div>
    );
  },

  renderAnswer:function(answer) {
    return (
      <span className="t-opacity" style={{opacity: this.state.opacity}}>{this.getAnswer(answer)}.</span>
    );
  }

});

module.exports = CardText;