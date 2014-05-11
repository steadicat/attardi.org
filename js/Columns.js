/** @jsx React.DOM **/
var React = require('./react');

var Columns = React.createClass({
  getInitialState: function() {
    this._staggering = [60, 0, 80, 40];
    return {width: 1000};
  },

  getDefaultProps: function() {
    return {
      column: 222,
      margins: 40,
      maxColumns: 4
    }
  },

  componentDidMount: function() {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', this.updateWidth);
    window.addEventListener('orientationchange', this.updateWidth);
    setTimeout(this.updateWidth, 0);
  },

  componentWillUnmount: function() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.updateWidth);
    window.removeEventListener('orientationchange', this.updateWidth);
  },

  updateWidth: function() {
    this.setState({width: this.getWidth()});
  },

  getWidth: function() {
    return typeof document === 'undefined' ? 1000 : document.body.clientWidth;
  },

  getNumberOfColumns: function() {
    return Math.min(this.props.maxColumns, Math.floor((this.state.width - 2 * this.props.margins) / this.props.column));
  },

  render: function() {
    var n = this.getNumberOfColumns();
    var cols = [];

    React.Children.forEach(this.props.children, function(child, i) {
      var col = i % n;
      cols[col] || (cols[col] = []);
      cols[col].push(React.addons.cloneWithProps(child, {key: i}));
    }, this);

    var els = [];
    for (var i = 0; i < n; i++) {
      els.push(
        <div className="ib top" style={{marginTop: this._staggering[i]}} key={i}>
          {cols[i]}
        </div>
      );
    }

    return this.transferPropsTo(<div>{els}</div>);
  }
});

module.exports = Columns;
