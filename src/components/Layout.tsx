import * as React from 'react';
import {Helmet} from 'react-helmet';
import {View} from 'glamor/jsxstyle';

import '../design/prism.css';
import {textColor} from '../design/colors';
import {unit, mobileMargin, maxColumn} from '../design/layout';
import {ProtectedEmailProvider} from '../protectedEmail';

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
      defaultTitle="Stefano J. Attardi: Engineering Manager">
      <meta
        name="description"
        content="Engineering Manager at Coinbase. Former UI engineer and designer, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com."
      />
      <meta
        name="og:description"
        content="Engineering Manager at Coinbase. Former UI engineer and designer, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com."
      />
      <link
        href="//fonts.googleapis.com/css2?family=PT+Mono&family=Rubik:wght@300;400;500;600&family=Zilla+Slab:ital,wght@0,400;0,500;1,400&display=block"
        rel="stylesheet"
      />
      <meta property="og:site_name" content="attardi.org" />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={`https://attardi.org${location.pathname}`} />
    </Helmet>
    <ProtectedEmailProvider siteKey="0x4AAAAAAACiX56uiMszpvqE" endpoint="/email">
      {children}
    </ProtectedEmailProvider>
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "0ecb6fcc2dcb47f59f6847ba5798e7a2"}'
    />
  </View>
));

export default Layout;
