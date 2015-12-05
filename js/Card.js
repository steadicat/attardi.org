import React from 'react';
import {Inline} from 'stylistic-elements';
import CardText from './CardText';
import * as Spacing from './Spacing';
import * as Colors from './Colors';
import * as Type from './Type';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {link: null};
  }

  onMouseEnter = () => {
    this.refs.text.start();
    this.props.onHover && this.props.onHover(this.props.question);
  }

  onMouseLeave = () => {
    this.refs.text.stop();
  }

  onLinkChange = (link) => {
    this.setState({link});
  }

  getLink = () => {
    if (!this.state.link) return null;
    return this.state.link.replace(/^(http(s)?\:\/\/(www\.)?)|(mailto\:)/g, '');
  }

  render() {
    const {question, answers, space, color, ...props} = this.props;
    return (
      <Inline
        tag="a"
        href={this.state.link}
        border="none"
        display="block"
        marginLeft={Spacing.s}
        marginRight={Spacing.s}
        borderRadius={5}
        position="relative"
        width={210}
        height={240}
        textAlign="left"
        textDecoration="none"
        color={Colors[this.state.link ? 'white' : color]}
        borderStyle="solid"
        borderWidth={2}
        borderColor={Colors[this.state.link ? 'white' : color]}
        backgroundColor={Colors[this.state.link ? color : 'white']}
        cursor={this.state.link ? 'pointer' : 'arrow'}
        marginBottom={10}
        {...Type.m}
        {...Type.antialiased}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        {...props}>
        <Inline
          {...Type.s}
          padding={Spacing.m}
          display={this.state.link ? 'block' : 'none'}>
          {this.getLink()}
        </Inline>
        <CardText
          ref="text"
          color={this.state.link ? 'white' : color}
          question={question}
          answers={answers}
          space={space}
          position="absolute"
          bottom={0}
          left={0}
          margin={Spacing.m}
          onLinkChange={this.onLinkChange}
        />
      </Inline>
    );
  }

}
