import React from 'react';
import {Inline} from 'stylistic-elements';
import * as Colors from './Colors';
import * as Spacing from './Spacing';

export default class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  onMouseEnter = () => this.setState({hover: true})
  onMouseLeave = () => this.setState({hover: false})

  render() {
    return (
      <Inline
        tag="a"
        textDecoration="none"
        color={this.state.hover ? Colors.white : Colors.teal}
        backgroundColor={this.state.hover ? Colors.teal : Colors.white}
        borderColor={Colors.teal}
        borderStyle="solid"
        borderWidth={2}
        display="inline-block"
        borderRadius={5}
        paddingTop={Spacing.m}
        paddingBottom={Spacing.m}
        paddingLeft={Spacing.h}
        paddingRight={Spacing.h}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        {...this.props}
      />
    );
  }

}
