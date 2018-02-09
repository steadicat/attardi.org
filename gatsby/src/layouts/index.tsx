import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import {View} from 'glamor/jsxstyle';

import './index.css';
import './prism.css';
import {textColor} from '../design/colors';
import {unit, mobileMargin, maxColumn} from '../design/layout';

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string;
  };
  children: any;
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
  public render() {
    return (
      <View
        maxWidth={maxColumn}
        padding={mobileMargin}
        margin={`${unit}px auto`}
        marginBottom={unit * 4}
        color={textColor}>
        <Helmet
          title="Stefano J. Attardi"
          meta={[
            {name: 'description', content: 'Sample'},
            {name: 'keywords', content: 'sample, something'},
          ]}>
          <link
            href="//fonts.googleapis.com/css?family=Zilla+Slab:400,400i,500|Rubik:600,500,400,300|PT+Mono:400"
            rel="stylesheet"
          />
        </Helmet>
        {this.props.children()}
      </View>
    );
  }
}

export default DefaultLayout;
