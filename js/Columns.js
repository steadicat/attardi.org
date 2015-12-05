import React from 'react';
import {Block, InlineBlock} from 'stylistic-elements';

/* global window, document, setTimeout */

export default class Columns extends React.Component {
  static defaultProps = {
    column: 222,
    margins: 40,
    maxColumns: 4,
  }

  constructor(props) {
    super(props);
    this.staggering = [60, 0, 80, 40];
    this.state = {width: 1000};
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

  updateWidth = () => {
    this.setState({width: this.getWidth()});
  }

  getWidth() {
    return typeof document === 'undefined' ? 1000 : document.body.clientWidth;
  }

  getNumberOfColumns = () => {
    return Math.min(this.props.maxColumns, Math.floor((this.state.width - 2 * this.props.margins) / this.props.column));
  }

  render() {
    const n = this.getNumberOfColumns();
    const cols = [];

    React.Children.forEach(this.props.children, function(child, i) {
      let col = i % n;
      col = Math.floor((n - 1) / 2) + Math.round(col / 2) * (col % 2 === 0 ? -1 : 1);
      cols[col] || (cols[col] = []);
      cols[col].push(React.cloneElement(child, {key: i}));
    }, this);

    const els = [];
    for (let i = 0; i < n; i++) {
      els.push(
        <InlineBlock verticalAlign="top" marginTop={this.staggering[i]} key={i}>
          {cols[i]}
        </InlineBlock>
      );
    }

    return <Block {...this.props}>{els}</Block>;
  }
}
