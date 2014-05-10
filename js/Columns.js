/** @jsx React.DOM **/
var React = require('./react');

var Columns = React.createClass({
  getInitialState: function() {
    this._staggering = [];
    for (var i = 0; i < 10; i++) {
      this._staggering[i] = Math.round(Math.random() * 160);
    }
    return {width: document.body.clientWidth};
  },

  getDefaultProps: function() {
    return {
      column: 222,
      margins: 40,
      maxColumns: 4
    }
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.updateWidth);
    window.addEventListener('orientationchange', this.updateWidth);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateWidth);
    window.removeEventListener('orientationchange', this.updateWidth);
  },

  updateWidth: function() {
    if (!this.isMounted()) debugger;
    this.setState({width: document.body.clientWidth});
  },

  getNumberOfColumns: function() {
    return Math.min(this.props.maxColumns, Math.floor((this.state.width - 2 * this.props.margins) / this.props.column));
  },

  render: function() {
    var perCol = this.props.children.length / this.getNumberOfColumns();
    var cols = [];
    var batch = [];
    var column = 0;

    React.Children.forEach(this.props.children, function(child, i) {
      var currentCol = Math.floor(i / perCol);
      if (currentCol > column) {
        cols.push(
          <div className="ib top" style={{marginTop: this._staggering[i]}} key={column}>
            {batch}
          </div>
        );
        batch = [];
        column = currentCol;
      }
      batch.push(React.addons.cloneWithProps(child));
    }, this);

    cols.push(
      <div className="ib top" style={{marginTop: this._staggering[column]}} key={column}>
        {batch}
      </div>
    );

    return this.transferPropsTo(<div>{cols}</div>);
  }
});

module.exports = Columns;