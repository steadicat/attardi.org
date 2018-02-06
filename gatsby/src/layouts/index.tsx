import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.css';

import 'prismjs/themes/prism-tomorrow.css';

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string;
  };
  children: any;
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
  public render() {
    return (
      <div>
        <Helmet
          title="Rational Creation Blog"
          meta={[
            {name: 'description', content: 'Sample'},
            {name: 'keywords', content: 'sample, something'},
          ]}>
          <link
            href="//fonts.googleapis.com/css?family=Zilla+Slab:400,400i,500|Rubik:600,500,400,300|Space+Mono:400"
            rel="stylesheet"
          />
        </Helmet>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
          }}>
          {this.props.children()}
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
