import * as React from 'react';
import {Helmet} from 'react-helmet';
import {View} from 'glamor/jsxstyle';

import '../design/prism.css';
import {textColor} from '../design/colors';
import {unit, mobileMargin, maxColumn} from '../design/layout';

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string;
  };
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = React.memo(({children, location}) => (
  <View
    maxWidth={maxColumn}
    padding={mobileMargin}
    margin={`${unit}px auto`}
    marginBottom={unit * 4}
    color={textColor}>
    <Helmet
      titleTemplate="%s - Stefano J. Attardi"
      defaultTitle="Stefano J. Attardi: UI Engineering and Design consultant">
      <meta
        name="description"
        content="UI Engineering and Design consultant, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com."
      />
      <meta
        name="og:description"
        content="UI Engineering and Design consultant, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com."
      />
      <link
        href="//fonts.googleapis.com/css?family=Zilla+Slab:400,400i,500|Rubik:600,500,400,300|PT+Mono:400"
        rel="stylesheet"
      />
      <meta property="og:site_name" content="attardi.org" />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={`https://attardi.org${location.pathname}`} />
    </Helmet>
    {children}
    <script async src="https://www.google-analytics.com/analytics.js" />
  </View>
));

if (typeof window !== 'undefined') {
  window.ga = window.ga || ((...args: unknown[]) => (ga.q = ga.q || []).push(args));

  ga('create', 'UA-1809956-1', 'auto');
  ga('set', 'transport', 'beacon');
  ga('send', 'pageview');
}

export default Layout;