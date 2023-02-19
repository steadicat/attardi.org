import {css} from '@linaria/core';
import * as React from 'react';

import {ProtectedEmailProvider} from '@/components/ProtectedEmail';
import {textColor, white} from '@/design/colors';

import './global.css';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      className={css`
        max-width: 612px;
        padding: 18px;
        margin: 18px auto;
        margin-bottom: 72px;
        background: ${white};
        color: ${textColor};
      `}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="//fonts.googleapis.com/css2?family=PT+Mono&family=Rubik:wght@300;400;500;600&family=Zilla+Slab:ital,wght@0,400;0,500;1,400&display=block"
          rel="stylesheet"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* TODO */}
        {/* <meta name="og:url" content={`https://attardi.org${location.pathname}`} />
        <meta property="og:site_name" content="attardi.org" />
        <meta name="og:type" content="website" />
        <meta
          name="og:description"
          content="Engineering Manager at Coinbase. Former UI engineer and designer, specializing in React and React performance. Previously at Facebook and Storehouse. Winner of the first Node.js Knockout with Swarmation.com."
        /> */}
      </head>
      <body>
        <ProtectedEmailProvider siteKey={'0x4AAAAAAACiX56uiMszpvqE'} endpoint="/email">
          {/* TODO */}
          {React.useMemo(
            () => (
              <>
                <div
                  className="cf-turnstile"
                  data-sitekey={'0x4AAAAAAACiX56uiMszpvqE'}
                  data-callback="protectedEmailCallback"
                />
                {children}
              </>
            ),
            []
          )}
        </ProtectedEmailProvider>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "0ecb6fcc2dcb47f59f6847ba5798e7a2"}'
        />
      </body>
    </html>
  );
}
