import * as React from 'react';
import Helmet from 'react-helmet';
import {View} from 'glamor/jsxstyle';

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
        <script async src="https://www.google-analytics.com/analytics.js" />
      </View>
    );
  }
}

window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

ga('create', 'UA-1809956-1', 'auto');
ga('set', 'transport', 'beacon');
ga('send', 'pageview');

export default DefaultLayout;
