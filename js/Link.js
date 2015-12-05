import React from 'react';
import {Inline} from 'stylistic-elements';
import * as Colors from './Colors';

export default function Link(props) {
  return (
    <Inline
      tag="a"
      textDecoration="none"
      color={Colors.lightGray}
      borderBottomStyle="solid"
      borderBottomWidth={1}
      borderBottomColor={Colors.lightGray}
      {...props}
    />
  );
}
