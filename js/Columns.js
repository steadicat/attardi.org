import React from 'react';
import cloneWithProps from 'react-clonewithprops';

export default class Columns extends React.Component {

  constructor(props) {
    super(props);
    this._staggering = [60, 0, 80, 40];
    this.state = {width: 1000};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.getNumberOfColumns = this.getNumberOfColumns.bind(this);
  }

  componentDidMount() {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', this.updateWidth);
    window.addEventListener('orientationchange', this.updateWidth);
    setTimeout(this.updateWidth, 0);
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.updateWidth);
    window.removeEventListener('orientationchange', this.updateWidth);
  }

  updateWidth() {
    this.setState({width: this.getWidth()});
  }

  getWidth() {
    return typeof document === 'undefined' ? 1000 : document.body.clientWidth;
  }

  getNumberOfColumns() {
    return Math.min(this.props.maxColumns, Math.floor((this.state.width - 2 * this.props.margins) / this.props.column));
  }

  render() {
    const n = this.getNumberOfColumns();
    const cols = [];

    React.Children.forEach(this.props.children, function(child, i) {
      let col = i % n;
      col = Math.floor((n - 1) / 2) + Math.round(col / 2) * (col % 2 == 0 ? -1 : 1);
      cols[col] || (cols[col] = []);
      cols[col].push(cloneWithProps(child, {key: i}));
    }, this);

    const els = [];
    for (const i = 0; i < n; i++) {
      els.push(
        <div className="ib top" style={{marginTop: this._staggering[i]}} key={i}>
          {cols[i]}
        </div>
      );
    }

    return <div {...this.props}>{els}</div>;
  }
}

Columns.defaultProps = {
  column: 222,
  margins: 40,
  maxColumns: 4
};
