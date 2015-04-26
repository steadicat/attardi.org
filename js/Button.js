import React from 'react';
import merge from './merge';
import Style from './Style';

const defaultStyle = merge(Style.noUnderline, Style.teal, Style.tealBorder, Style.ba, Style.ib, Style.rounded, Style.pvm, Style.phh, Style.hoverTealBg, Style.hoverWhite);
const hoverStyle = merge(defaultStyle, Style.tealBg, Style.white);

export default class Button extends React.Component {
  displayName() {
    return 'Button';
  }

  constructor(props) {
    super(props);
    this.state = {hover: false};
    this.onMouseEnter = () => this.setState({hover: true});
    this.onMouseLeave = () => this.setState({hover: false});
  }

  render() {
    const {style, children, ...props} = this.props;
    style; // Ignored!
    return (
      <a
        {...props}
        style={this.state.hover ? hoverStyle : defaultStyle}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {children}
      </a>
    );
  }

}

Button.propTypes = {
  style: React.PropTypes.object,
  children: React.PropTypes.any,
};
